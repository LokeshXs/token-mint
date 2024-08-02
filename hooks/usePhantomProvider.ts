import { PhantomProvider } from "@/types";
import { useEffect, useState } from "react";

export default function usePhantomProvider() {
  const [phantom, setPhantom] = useState<PhantomProvider | undefined>();

  useEffect(() => {
    if ("phantom" in window) {
      // @ts-ignore
      const provider = window.phantom?.solana;

      if (provider?.isPhantom) {
        setPhantom(provider);
      }
    }else{
        setPhantom(undefined)
    }
  }, []);



  return phantom;
}
