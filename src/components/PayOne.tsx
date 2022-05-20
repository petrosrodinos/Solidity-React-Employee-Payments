import { Modal, Input } from "antd";
import { FaEthereum } from "react-icons/fa";
import { useState } from "react";

interface IModalProps {
  visible: boolean;
  confirmLoading: boolean;
  handleOk: (amount: string) => void;
  handleCancel: () => void;
}

const PayOne: React.FC<IModalProps> = ({
  visible,
  confirmLoading,
  handleOk,
  handleCancel,
}) => {
  const [amount, setAmount] = useState<string>("");
  return (
    <>
      <Modal
        title="Send Amount"
        visible={visible}
        onOk={() => {
          if (!amount) return;
          handleOk(amount);
        }}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <Input
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          size="large"
          placeholder="Amount (eth)"
          prefix={<FaEthereum style={{ color: "teal" }} />}
        />
      </Modal>
    </>
  );
};

export default PayOne;
