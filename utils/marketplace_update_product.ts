// Transfer funds from one USDT holder to another
import { Account, connect, ConnectConfig, Contract, InMemorySigner, keyStores, Signer, WalletConnection } from "near-api-js";
import * as cla from "command-line-args";
import config from "./config";
import { join } from "path";
const ATTACHED_GAS = "300000000000000";
const YOCTO_NEAR = "1000000000000000000000000";

console.log(config);

async function execute() {
    const options = cla([
        {
            name: "contractName", alias: "c", type: String, defaultValue: "marketplace.test.near",
        },
        {
            name: "accountName", alias: "a", type: String, defaultValue: "fabrics-delivery.test.near",
        },
        {
            name: "productId", type: String, defaultValue: null,
        },
        {
            name: "description", type: String, defaultValue: null, 
        },
    ]);

    try {
        console.log(options);
        await run(options);
    }
    catch (error) {
        console.error(error as any);
    }

}

async function initContract(contractName: string, account: Account) {
    return new Contract(
        account, // the account object that is connecting
        contractName,
        {
            // name of contract you're connecting to
            viewMethods: [], // view methods do not change state but usually return a value
            changeMethods: ["update_product"], // change methods modify state
        }
    );
}

async function run(options: cla.CommandLineOptions) {
    const near = await connect(config);
    const account = await near.account(options.accountName);
    console.log(await account.getAccountBalance())
    const contract: any = await initContract(options.contractName, account);
    console.log("contract", { contract }, contract.update_product);
    const response = await contract.update_product({ args: { 
        product_id: options.productId,
        store_account_id: options.accountName,
        description: options.description
     }, meta: "update_product" });
    console.log("response", { response });
}

execute();