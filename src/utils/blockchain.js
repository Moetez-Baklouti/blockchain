import { ethers } from "ethers";
import Auth from "../../artifacts/contracts/Auth.sol/Auth.json";

export async function getUserRole(userAddress) {
    
  const contractAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const contract = new ethers.Contract(contractAddress, Auth.abi, provider);

  try {
    const userRole = await contract.getUserRole(userAddress);
    return userRole;
  } catch (error) {
    console.error("Error fetching user role:", error);
    throw error;
  }
}

export async function switchNetwork() {
  try {
    await ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: "31337" }],
    });
  } catch (switchError) {
    // This error code indicates that the chain has not been added to MetaMask.
    if (switchError.code === 4902) {
      try {
        await ethereum.request({
          method: "wallet_addEthereumChain",
          params: [
            {
              chainId: "31337",
              chainName: "localhost",
              rpcUrls: ["http://localhost:8545"],
            },
          ],
        });
      } catch (addError) {
        // handle "add" error
      }
    }
    // handle other "switch" errors
  }
}
