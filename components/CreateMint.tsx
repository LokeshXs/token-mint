"use client";

import { Button } from "./ui/button";
import { useContext, useState } from "react";
import { AccountContext } from "@/contexts/AccountInfoProvider";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { createClusterConnection } from "@/lib/createClusterConnection";
import usePhantomProvider from "@/hooks/usePhantomProvider";
import web3 from "@solana/web3.js";
import { createMintTransaction } from "@/lib/createMintTransaction";

const formSchema = z.object({
  precision: z.number().min(1).max(4),
});

export default function CreateMint() {
  const account = useContext(AccountContext);
  const phantom = usePhantomProvider();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      precision: undefined,
    },
  });

  const returnSignedTxn = async (transaction: web3.Transaction) => {
    try {
      const response = await phantom?.signTransaction(transaction);
      return response;
    } catch (err) {
      console.log(err);
      return null;
    }
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {

    const publicKey = account?.accountDetails.publicKey!;
    const precision = values.precision;
    const connection = await createClusterConnection();

    const transaction = await createMintTransaction(
      connection,
      precision,
      publicKey
    );

    if (transaction) {
      const signedTransaction = await returnSignedTxn(transaction);

      try {
        const signature = await connection.sendRawTransaction(
          signedTransaction?.serialize()!
        );
      } catch (err) {
        console.log(err);
      }
      console.log(signedTransaction);
      // console.log(signature);
    }
  }



  return (
    <>
      {/* <Button onClick={() => createMint()}>Create Mint</Button> */}
      <Dialog>
        <DialogTrigger className=" bg-primary text-primary-foreground px-4 py-2 rounded-lg">Create Mint</DialogTrigger>
        <DialogContent>
          <DialogHeader className=" flex flex-col gap-8">
            <DialogTitle className=" text-center">
              Specify a decimal precesion for your token
            </DialogTitle>
            <DialogDescription>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className=" flex flex-col gap-4"
                >
                  <FormField
                    control={form.control}
                    name="precision"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Precesion</FormLabel>

                        <FormControl>
                          <Input
                            placeholder="precesion..."
                            {...field}
                            type="number"
                            onChange={(e) => {
                              form.setValue(
                                "precision",
                                Number(e.target.value)
                              );
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit">Process to create mint</Button>
                </form>
              </Form>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
}
