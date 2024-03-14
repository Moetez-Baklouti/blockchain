import { ethers } from "ethers";
import Auth from "../../artifacts/contracts/Auth.sol/Auth.json";
import Exp from "../../artifacts/contracts/Expedition.sol/Expedition.json";


const ExpeditionAddress = "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0";

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

export async function addExpedition(ref, date) {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const contract = new ethers.Contract(ExpeditionAddress, Exp.abi, provider.getSigner());

  try {
    const transaction = await contract.storeFormData(ref, date);
    await transaction.wait();
  } catch (error) {
    console.error("Error fetching user role:", error);
    throw error;
  }
}

export async function getLatestReference() {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const contract = new ethers.Contract(ExpeditionAddress, Exp.abi, provider.getSigner());

  try {
    const reference = await contract.getLatestReference();
    console.log(reference)
    return reference;
  } catch (error) {
    console.error("Error fetching user role:", error);
    throw error;
  }
}

export async function listAllExpedition() {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const contract = new ethers.Contract(ExpeditionAddress, Exp.abi, provider.getSigner());

  try {
    const formdata = await contract.listAllFormData();
    return(formdata);
  } catch (error) {
    console.error("Error fetching user role:", error);
    throw error;
  }
}

export async function getFormDataByReference(ref) {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const contract = new ethers.Contract(ExpeditionAddress, Exp.abi, provider.getSigner());

  try {
    const formdata = await contract.getFormDataByReference(ref);
    return(formdata);
  } catch (error) {
    console.error("Error fetching user role:", error);
    throw error;
  }
}




