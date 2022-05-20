import { useEffect, useState } from "react";
import { FaEthereum } from "react-icons/fa";
import { useContract } from "../hooks/contractHook";

const RightMenu = () => {
  const [balance, setBalance] = useState<string | undefined>("0");
  const { getBalance } = useContract();

  useEffect(() => {
    (async () => {
      const balance = await getBalance();
      setBalance(balance);
    })();
  }, [getBalance]);

  return (
    <div className="logo">
      <a>
        {`Balance: ${typeof balance == "undefined" ? "-" : balance}`}
        <FaEthereum style={{ fontSize: 20, color: "teal" }} />
      </a>
    </div>
  );
};
export default RightMenu;
