import WalletConnection from "./WalletConnection";

const AppBar = () =>{


    return (
        <nav className=" w-full flex justify-between items-center px-12 py-4 bg-muted rounded-b-xl border-b-[1px]">
        <p>Token Program</p>
        <WalletConnection />
        </nav>
    )
}


export default AppBar;