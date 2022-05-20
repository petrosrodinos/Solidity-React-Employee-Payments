import { useState, useCallback } from "react";
import { ethers } from "ethers";
import AutoPay from "../artifacts/contracts/AutoPay.sol/AutoPay.json";

interface State {
  account: string;
  contract: ethers.Contract | null;
}

export const useAuth = () => {
  const [state, setState] = useState<State>({ account: "", contract: null });
  const address = "0xd8704E5Fa2382f4eD1acFe89A442AD6aDE6c040e";
  //const address = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

  const connect = useCallback(async () => {
    if (typeof window.ethereum !== "undefined") {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(address || "", AutoPay.abi, signer);
      setState({ account: accounts[0], contract });
    } else {
      console.log("No web3");
    }
  }, []);

  return { account: state?.account, contract: state?.contract, connect };
};
