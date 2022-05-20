import { useEffect, FC, useState } from "react";
import { useAuth } from "./hooks/authHook";
import { ContractContext } from "./context/contractContext";
import "./App.css";
import AppBar from "./components/AppBar";
import Menu from "./components/Menu";
import { Modal } from "antd";

const App: FC = () => {
  const { account, contract, connect } = useAuth();
  const [isModalVisible, setIsModalVisible] = useState(true);
  useEffect(() => {
    connect();
  }, []);

  return (
    <>
      <Modal
        title="Connect"
        visible={isModalVisible}
        onOk={() => {
          setIsModalVisible(false);
        }}
      >
        <p>Please connect your wallet to Rinkeby test network</p>
      </Modal>
      <ContractContext.Provider
        value={{ account: account, contract: contract }}
      >
        <AppBar />
        <Menu />
      </ContractContext.Provider>
    </>
  );
};

export default App;
