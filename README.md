# Smart Finance Platform

Full Stack AI Finance Platform built with Next.js, Supabase, Tailwind, Prisma, Inngest, ArcJet, and Shadcn UI.

## Project Overview

This platform provides:
- Profile management with secure authentication and 2FA
- Dashboard with charts, metrics, and notifications
- Expense management (budgets, AI insights, receipt scanning)
- Smart transaction management (categorization, recurring, bulk actions)

## Collaboration & Branching Workflow

This project uses a **feature-branch workflow** for collaborative development:

1. **Each contributor works in a separate branch** for their assigned module (see below).
2. **Modules are developed in `modules/<module-name>/` folders** and merged via pull requests (PRs).
3. **After all PRs are merged**, the maintainer moves files from `modules/` into the main project structure and removes the `modules/` folder.

### Module Assignments

| Module                  | Contributor                | Branch Name                      |
|-------------------------|----------------------------|----------------------------------|
| Profile Management      | Ahrar                      | feature/profile-management       |
| Dashboard & Notifications | Shawon                   | feature/dashboard-notifications  |
| Expense Management      | MD. AL- AHMAID HOSSAIN     | feature/expense-management       |
| Transactions            | Sowmik                     | feature/transactions             |

### Integration Steps

1. Each contributor creates a branch from `main` and commits only their module files.
2. Open a PR to `main`.
3. Maintainer reviews, tests, and merges each PR.
4. After all merges, maintainer moves files from `modules/` to the main structure and deletes `modules/`.
5. Final testing and deployment.

## Environment Setup

Create a `.env` file with the following variables:

```
DATABASE_URL=""
DIRECT_URL=""

NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=""
CLERK_SECRET_KEY=""

NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard

GEMINI_API_KEY=""
RESEND_API_KEY=""
ARCJET_KEY=""
```

