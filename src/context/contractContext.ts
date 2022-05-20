import { createContext } from "react";
import { ethers } from "ethers";

interface IContractContext {
  contract: ethers.Contract | null;
  account: string;
  connect?: () => void;
}

export const ContractContext = createContext<IContractContext>({
  account: "",
  connect: () => {},
  contract: null,
});
