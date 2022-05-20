import React, { useContext, useState } from "react";
import { ContractContext } from "../context/contractContext";
import { ethers } from "ethers";

export const useContract = () => {
  const [error, setError] = useState<null | string>(null);
  const [loading, setLoading] = useState(false);
  const { contract, account } = useContext(ContractContext);

  const getBalance = async () => {
    if (!contract) return;
    try {
      const balance = await contract.getBalance();
      const formated = ethers.utils.formatEther(balance);
      return formated;
    } catch (e) {
      console.log(e);
      setError("Error getting balance");
      return "-";
    }
  };

  const getEmployeeCount = async () => {
    if (!contract) return;
    const count = await contract.getEmployeeCount();
    return count.toString();
  };

  const depositMoney = async (value: string) => {
    if (!contract) return;
    try {
      setLoading(true);
      await contract.depositMoney(account, {
        value: ethers.utils.parseEther(value),
        gasLimit: 3000000,
      });
      setLoading(false);
    } catch (e) {
      console.log(e);
      setError("Error depositing money");
      setLoading(false);
    }
  };

  const withdrawMoney = async () => {
    if (!contract) return;
    try {
      setLoading(true);
      const s = await contract.withdrawBalance();
      console.log("success: ", s);
      setLoading(false);
    } catch (e: any) {
      console.log("errorr: ", e);
      setLoading(false);
      setError("Error withdrawing money,not enough balance");
    }
  };
  //
  const addEmployee = async (info: any) => {
    setError(null);
    if (!contract) return;
    try {
      setLoading(true);
      await contract.addEmployee(
        info.name,
        info.phone,
        info.address,
        ethers.utils.parseEther(info.salary.toString())
      );
      setLoading(false);
      return true;
    } catch (e) {
      console.log(e);
      setLoading(false);
      setError("Error adding employee");
      return false;
    }
  };

  const getEmployes = async () => {
    if (!contract) return;
    try {
      const employes = await contract.getEmployes();
      if (!employes) return [];
      const formatted = employes.map((e: any) => {
        return {
          key: e.id.toNumber(),
          name: e.name,
          phone: e.phone,
          salary: ethers.utils.formatEther(e.salary),
          address: e.employeeAddress,
        };
      });
      return formatted;
    } catch (e) {
      console.log(e);
      setLoading(false);
      setError("Error getting employees");
    }
  };

  const payOne = async (id: string) => {
    if (!contract) return;
    try {
      setLoading(true);
      await contract.payOne(Number(id));
      setLoading(false);
    } catch (e) {
      console.log(e);
      setLoading(false);
      setError("Error paying one");
    }
  };

  const payAll = async () => {
    if (!contract) return;
    try {
      setLoading(true);
      await contract.payAll();
      setLoading(false);
    } catch (e) {
      console.log(e);
      setLoading(false);
      setError("Error paying employes");
    }
  };

  const sendMoney = async (id: string, amount: string) => {
    if (!contract) return;
    try {
      setLoading(true);
      await contract.sendMoney(id, ethers.utils.parseEther(amount));
      setLoading(false);
    } catch (e) {
      console.log(e);
      setLoading(false);
      setError("Error sending money");
    }
  };

  return {
    getBalance,
    getEmployeeCount,
    depositMoney,
    withdrawMoney,
    addEmployee,
    getEmployes,
    payOne,
    payAll,
    sendMoney,
    error,
    loading,
  };
};
