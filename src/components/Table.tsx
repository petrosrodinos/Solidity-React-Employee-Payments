import { Table, Space, Tooltip, Button } from "antd";
import { RiSendPlaneFill } from "react-icons/ri";
import { FaEthereum } from "react-icons/fa";
import React, { useEffect, useState } from "react";
import { useContract } from "../hooks/contractHook";
import ConfirmModal from "./Modal";
import PayOne from "./PayOne";

const UserTable = () => {
  const [show, setShow] = useState(false);
  const [payOneModal, setPayOneModal] = useState(false);
  const [text, setText] = useState("");
  const [handler, setHandler] = useState<any>(() => {});
  const [id, setId] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState(null);
  const { getEmployes, payOne, payAll, sendMoney, loading, error } =
    useContract();

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Phone",
      dataIndex: "phone",
    },
    {
      title: "Salary",
      dataIndex: "salary",
    },
    {
      title: "Address",
      dataIndex: "address",
    },
    {
      title: "Action",
      key: "action",
      render: (text: string, record: { key: string; name: string }) => (
        <Space size="middle">
          <a>
            <Tooltip placement="topLeft" title="Pay employee based on salary">
              <FaEthereum
                style={{ color: "teal", fontSize: 25 }}
                onClick={() => {
                  setId(record.key);
                  setText("Confirm payment to " + record.name + "?");
                  setPayOneModal(true);
                }}
              />
            </Tooltip>
          </a>
          <a>
            <Tooltip placement="topLeft" title="Send specific ammount">
              <RiSendPlaneFill
                onClick={() => {
                  setId(record.key);
                  setShowModal(true);
                }}
                style={{ color: "teal", fontSize: 25 }}
              />
            </Tooltip>
          </a>
        </Space>
      ),
    },
  ];

  useEffect(() => {
    (async () => {
      if (data) return;
      const employes = await getEmployes();
      if (!employes) return;
      console.log("employes: ", employes);
      setData(employes);
    })();
  }, [getEmployes]);

  const payEmployes = async () => {
    console.log("pay all");
    await payAll();
    setShow(false);
  };

  const payOneEmployee = async () => {
    await payOne(id);
    setPayOneModal(false);
  };

  const sendAmount = async (amount: string) => {
    await sendMoney(id, amount);
    setShowModal(false);
  };

  return (
    <div>
      <ConfirmModal
        visible={show}
        modalText={text}
        handleOk={handler}
        confirmLoading={loading}
        handleCancel={() => setShow(false)}
      />
      <PayOne
        visible={showModal}
        handleOk={sendAmount}
        confirmLoading={loading}
        handleCancel={() => setShowModal(false)}
      />
      <ConfirmModal
        modalText={text}
        visible={payOneModal}
        handleOk={payOneEmployee}
        confirmLoading={loading}
        handleCancel={() => setPayOneModal(false)}
      />
      <Table columns={columns} dataSource={data || []} size="large" />
      {data && (
        <Button
          onClick={() => {
            setHandler(() => payEmployes);
            setText("Confirm to pay all employees?");
            setShow(true);
          }}
          type="primary"
          htmlType="submit"
          style={{ backgroundColor: "teal", borderColor: "teal" }}
        >
          Pay All
        </Button>
      )}
    </div>
  );
};

export default UserTable;
