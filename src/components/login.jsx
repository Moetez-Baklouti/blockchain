"use client";
import { useState } from "react";
import { Wallet } from "lucide-react";
import { Button } from "./ui/button";
import { getUserRole } from "@/utils/blockchain";

function Login() {
  const [walletAddress, setWalletAddress] = useState("");
  const [acteur, setActeur] = useState(-1);
  const acteurs = [
    "Acteur 1",
    "Acteur 2",
    "Acteur 3",
    "Acteur 4"
  ]

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
          <Button className="w-300" onClick={connectWallet}>
            <Wallet className="mr-2 h-4 w-4" />
            Connect Wallet
          </Button>
        ) : (
          <Button><Wallet className="mr-2 h-4 w-4" /><span className="truncate w-200">{walletAddress}</span></Button>
        )}
      </header>
      <div>
        {acteur !== -1 && <p>Vous êtes {acteurs[acteur]}</p>}
      </div>
    </div>
  );
}

export default Login;
