"use client";

import usePhantomProvider from "@/hooks/usePhantomProvider";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { AccountContext } from "@/contexts/AccountInfoProvider";
import { useContext } from "react";
import { PublicKey } from "@solana/web3.js";

export default function WalletConnection() {
  const phantom = usePhantomProvider();
  const account = useContext(AccountContext);
 

  const connectPhantomWallet = async () => {
    try {
      const response = await phantom?.connect();
      console.log(response?.publicKey.toString());

      if (response && phantom) {
        account?.setAccountDetails({
          publicKey: response?.publicKey,
          isConnected: phantom?.isConnected || false,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const disconnectPhantomWallet = async () => {
    try {
      await phantom?.disconnect();

      if (!phantom?.isConnected) {
        account?.setAccountDetails({
          publicKey: undefined,
          isConnected: false,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (!phantom) {
    return <Link href="https://phantom.app/">connect to phantom</Link>;
  }

  return (
    <>
      {account?.accountDetails.isConnected ? (
        <Button onClick={disconnectPhantomWallet}>Disconnect</Button>
      ) : (
        <Button onClick={connectPhantomWallet}>Connect</Button>
      )}
    </>
  );
}
