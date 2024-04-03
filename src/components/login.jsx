"use client";
import { useState } from "react";
import { Wallet } from "lucide-react";
import { Button } from "./ui/button";
import { getUserRole } from "@/utils/blockchain";
import Expedition from "./forms/expedition";
import Acteur2 from "./forms/acteur2";

function Login() {
  const [walletAddress, setWalletAddress] = useState("");
  const [acteur, setActeur] = useState(-1);

  async function requestAccount() {
    // ❌ Check if Meta Mask Extension exists
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });

        setWalletAddress(accounts[0]);
        return accounts[0];
      } catch (error) {
        console.log("Error connecting...");
      }
    } else {
      alert("Meta Mask not detected");
    }
  }

  async function connectWallet() {
    if (typeof window.ethereum !== "undefined") {
      const wallet = await requestAccount();
      const role = await getUserRole(wallet);
      setActeur(role);
    }
  }

  return (
    <div>
      <header>
        {walletAddress === "" ? (
          <Button onClick={connectWallet}>
            <Wallet className="mr-2 h-4 w-4" />
            Connect Wallet
          </Button>
        ) : (
          <Button><Wallet className="mr-2 h-4 w-4" /><span className="truncate w-200">{walletAddress}</span></Button>
        )}
      </header>
      <div>
        {acteur !== -1 && (
          <div>
            {acteur === 0 && <Expedition />}
            {acteur === 1 && <Acteur2/>}
            {acteur === 2 && <div>HTML for Acteur 3</div>}
            {acteur === 3 && <div>HTML for Acteur 4</div>}
          </div>
        )}
      </div>
    </div>
  );
}

export default Login;
