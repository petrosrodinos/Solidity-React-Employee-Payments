import { useState, useCallback } from "react";
import { ethers } from "ethers";
import AutoPay from "../artifacts/contracts/AutoPay.sol/AutoPay.json";

interface State {
  account: string;
  contract: ethers.Contract | null;
}

export const useAuth = () => {
  const [state, setState] = useState<State>({ account: "", contract: null });
  const address = "0xAf1C7B497A8fDD1A7738d81b5668e6C5C40600E0";

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
