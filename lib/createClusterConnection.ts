import {Connection,clusterApiUrl} from "@solana/web3.js";


export async function createClusterConnection(){


    const connection = new Connection(clusterApiUrl("devnet"));

    console.log("connected");

    return connection;

}