"use client";


import { PublicKey } from "@solana/web3.js";
import { createContext, useState } from "react";

interface AccountDetailsType {
  publicKey: PublicKey | undefined;
  isConnected: boolean;
}

interface AccountDetailsContextType {
  accountDetails: AccountDetailsType;

  setAccountDetails: React.Dispatch<React.SetStateAction<AccountDetailsType>>;
}

export const AccountContext = createContext<AccountDetailsContextType | undefined>(
  undefined
);

const AccountDetailsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [accountDetails, setAccountDetails] = useState<AccountDetailsType>({
    publicKey: undefined,
    isConnected: false,
  });

  return (
    <AccountContext.Provider value={{ accountDetails, setAccountDetails }}>
      {children}
    </AccountContext.Provider>
  );
};


export default AccountDetailsProvider;
