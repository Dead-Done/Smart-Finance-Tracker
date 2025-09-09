"use client";

import { useState, useEffect } from "react";
import { Pencil, Check, X } from "lucide-react";
import useFetch from "@/hooks/use-fetch";
import { toast } from "sonner";
import { formatCurrency } from "@/lib/currency";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { updateBudget } from "@/actions/budget";

export function BudgetProgress({ initialBudget, currentExpenses }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newBudget, setNewBudget] = useState(
    initialBudget?.amount?.toString() || ""
  );

  const {
    loading: isLoading,
    fn: updateBudgetFn,
    data: updatedBudget,
    error,
  } = useFetch(updateBudget);

  const percentUsed = initialBudget
    ? (currentExpenses / initialBudget.amount) * 100
    : 0;

  const handleUpdateBudget = async () => {
    const amount = parseFloat(newBudget);

    if (isNaN(amount) || amount <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }

    await updateBudgetFn(amount);
  };

  const handleCancel = () => {
    setNewBudget(initialBudget?.amount?.toString() || "");
    setIsEditing(false);
  };

  useEffect(() => {
    if (updatedBudget?.success) {
      setIsEditing(false);
      toast.success("Budget updated successfully");
    }
  }, [updatedBudget]);

  useEffect(() => {
    if (error) {
      toast.error(error.message || "Failed to update budget");
    }
  }, [error]);

  // Budget warning notifications
  useEffect(() => {
    if (initialBudget && percentUsed > 0) {
      if (percentUsed >= 100) {
        toast.error(`🚨 Budget exceeded! You've spent ${formatCurrency(currentExpenses)} of ${formatCurrency(initialBudget.amount)}`);
      } else if (percentUsed >= 90) {
        toast.warning(`⚠️ You're at ${percentUsed.toFixed(1)}% of your budget. Only ${formatCurrency(initialBudget.amount - currentExpenses)} remaining!`);
      } else if (percentUsed >= 75) {
        toast.warning(`💡 You've used ${percentUsed.toFixed(1)}% of your budget. ${formatCurrency(initialBudget.amount - currentExpenses)} left to spend.`);
      }
    }
  }, [percentUsed, currentExpenses, initialBudget]);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex-1">
          <CardTitle className="text-sm font-medium">
            Monthly Budget (Default Account)
          </CardTitle>
          <div className="flex items-center gap-2 mt-1">
            {isEditing ? (
              <div className="flex items-center gap-2">
                <Input
                  type="number"
                  value={newBudget}
                  onChange={(e) => setNewBudget(e.target.value)}
                  className="w-32"
                  placeholder="Enter amount"
                  autoFocus
                  disabled={isLoading}
                />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleUpdateBudget}
                  disabled={isLoading}
                >
                  <Check className="h-4 w-4 text-green-500" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleCancel}
                  disabled={isLoading}
                >
                  <X className="h-4 w-4 text-red-500" />
                </Button>
              </div>
            ) : (
              <>
                <CardDescription>
                  {initialBudget
                    ? `${formatCurrency(currentExpenses)} of ${formatCurrency(initialBudget.amount)} spent`
                    : "No budget set"}
                </CardDescription>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsEditing(true)}
                  className="h-6 w-6"
                >
                  <Pencil className="h-3 w-3" />
                </Button>
              </>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {initialBudget && (
          <div className="space-y-3">
            {/* Budget Warning Banner */}
            {percentUsed >= 100 && (
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3">
                <div className="flex items-center gap-2">
                  <span className="text-red-600 dark:text-red-400">🚨</span>
                  <div className="flex-1">
                    <h4 className="text-sm font-medium text-red-800 dark:text-red-200">Budget Exceeded!</h4>
                    <p className="text-xs text-red-600 dark:text-red-400">
                      You've overspent by {formatCurrency(currentExpenses - initialBudget.amount)}
                    </p>
                  </div>
                </div>
              </div>
            )}
            
            {percentUsed >= 90 && percentUsed < 100 && (
              <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg p-3">
                <div className="flex items-center gap-2">
                  <span className="text-orange-600 dark:text-orange-400">⚠️</span>
                  <div className="flex-1">
                    <h4 className="text-sm font-medium text-orange-800 dark:text-orange-200">Budget Alert!</h4>
                    <p className="text-xs text-orange-600 dark:text-orange-400">
                      Only {formatCurrency(initialBudget.amount - currentExpenses)} remaining ({(100 - percentUsed).toFixed(1)}% left)
                    </p>
                  </div>
                </div>
              </div>
            )}

            {percentUsed >= 75 && percentUsed < 90 && (
              <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-3">
                <div className="flex items-center gap-2">
                  <span className="text-yellow-600 dark:text-yellow-400">💡</span>
                  <div className="flex-1">
                    <h4 className="text-sm font-medium text-yellow-800 dark:text-yellow-200">Budget Warning</h4>
                    <p className="text-xs text-yellow-600 dark:text-yellow-400">
                      You've used {percentUsed.toFixed(1)}% of your budget. Consider tracking expenses carefully.
                    </p>
                  </div>
                </div>
              </div>
            )}

            <Progress
              value={percentUsed}
              extraStyles={`${
                // add to Progress component
                percentUsed >= 90
                  ? "bg-red-500"
                  : percentUsed >= 75
                    ? "bg-yellow-500"
                    : "bg-green-500"
              }`}
            />
            <p className="text-xs text-muted-foreground text-right">
              {percentUsed.toFixed(1)}% used
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
