import { Modal } from "antd";

interface IModalProps {
  visible: boolean;
  confirmLoading: boolean;
  modalText: string;
  handleOk: () => void;
  handleCancel: () => void;
}

const ConfirmModal: React.FC<IModalProps> = ({
  visible,
  confirmLoading,
  modalText,
  handleOk,
  handleCancel,
}) => {
  return (
    <>
      <Modal
        title="Confirm"
        visible={visible}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <p>{modalText}</p>
      </Modal>
    </>
  );
};

export default ConfirmModal;
