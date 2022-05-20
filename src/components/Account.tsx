import { Statistic, Row, Col, Button, message } from "antd";
import { RiLuggageDepositLine, RiRefund2Line } from "react-icons/ri";
import { useContract } from "../hooks/contractHook";
import { useEffect, useState } from "react";
import PayOne from "./PayOne";
import ConfirmModal from "./Modal";

interface IAccountProps {
  balance: string | undefined;
  count: string;
}

const Account = () => {
  const [show, setShow] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const {
    getEmployeeCount,
    getBalance,
    depositMoney,
    withdrawMoney,
    loading,
    error,
  } = useContract();
  const [state, setState] = useState<IAccountProps>({
    balance: "0",
    count: "0",
  });

  const withdraw = async () => {
    await withdrawMoney();
    setShowModal(false);
  };

  useEffect(() => {
    (async () => {
      const count = await getEmployeeCount();
      const balance = await getBalance();
      setState({ count, balance });
    })();
  }, []);

  const getUserBalance = async () => {
    const balance = await getBalance();
    setState({ ...state, balance });
  };

  useEffect(() => {
    if (!error) return;
    message.error(error);
  }, [error]);

  const depositHandler = async (amount: string) => {
    await depositMoney(amount);
    getUserBalance();
    setShow(false);
  };

  return (
    <>
      <ConfirmModal
        confirmLoading={loading}
        visible={showModal}
        modalText="Are you sure you want to withdraw money?"
        handleOk={withdraw}
        handleCancel={() => setShowModal(false)}
      />
      <PayOne
        visible={show}
        handleOk={depositHandler}
        confirmLoading={loading}
        handleCancel={() => setShow(false)}
      />
      <Row gutter={16} style={{ marginLeft: 300 }}>
        <Col span={12}>
          <Statistic title="Account Balance (eth)" value={state.balance} />
          <Button
            loading={loading}
            onClick={() => setShow(true)}
            icon={<RiLuggageDepositLine />}
            style={{
              marginTop: 16,
              backgroundColor: "teal",
              borderColor: "teal",
            }}
            type="primary"
          >
            Deposit
          </Button>
          <Button
            onClick={() => setShowModal(true)}
            icon={<RiRefund2Line />}
            style={{ marginLeft: 16 }}
            type="primary"
            danger
            ghost
          >
            Withdraw
          </Button>
        </Col>
        <Col span={12}>
          <Statistic title="Total Employes" value={state.count} />
        </Col>
      </Row>
    </>
  );
};

export default Account;
