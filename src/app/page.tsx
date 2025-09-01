//import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

import HeroComponent from "@/components/hero";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <HeroComponent />
    </div>
  );
}
