//import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

import HeroPage from "@/components/hero";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <HeroPage />
    </div>
  );
}
