"use client";

import CreateMint from "@/components/CreateMint";
import { Button } from "@/components/ui/button";
import WalletConnection from "@/components/WalletConnection";
import Image from "next/image";
import { useContext } from "react";
import { AccountContext } from "@/contexts/AccountInfoProvider";

export default function Home() {
  const account = useContext(AccountContext);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {account?.accountDetails.isConnected ? (
        <div>
          <CreateMint />
        </div>
      ) : (
        <p>Connect to wallet</p>
      )}
    </main>
  );
}
