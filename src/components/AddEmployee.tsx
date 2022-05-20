import { Form, Input, Button, message } from "antd";
import { useContract } from "../hooks/contractHook";
import { useEffect } from "react";

const AddEmployee = () => {
  const { addEmployee, loading, error } = useContract();

  const onFinish = async (values: any) => {
    const res = await addEmployee(values);
    console.log("res: ", res);
    if (!res) return;
    message.success("Employee added successfully");
  };

  useEffect(() => {
    if (!error) return;
    message.error(error);
  }, [error]);

  return (
    <Form
      style={{ marginRight: 300 }}
      name="basic"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      onFinish={onFinish}
      autoComplete="off"
    >
      <Form.Item
        label="Full Name"
        name="name"
        rules={[
          {
            required: true,
            message: "Please input name",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Phone"
        name="phone"
        rules={[
          {
            required: true,
            message: "Please input phone",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Salary (eth)"
        name="salary"
        rules={[
          {
            required: true,
            message: "Please input salary",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Address"
        name="address"
        rules={[
          {
            required: true,
            message: "Please input address",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button
          loading={loading}
          type="primary"
          htmlType="submit"
          style={{ backgroundColor: "teal", borderColor: "teal" }}
        >
          Add
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AddEmployee;
