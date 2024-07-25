import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Table, Typography, Button, Modal, Form, Input, message } from "antd";
import { PhoneOutlined, DownloadOutlined } from "@ant-design/icons";
import moment from "moment";
import bg from "../../assets/images/bgvector.png";
import axios from "axios";
import { baseUrlHr } from "../../url";

const { Title } = Typography;

function CallSheet({ onConfirm }) {
  const [calls, setCalls] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingCall, setEditingCall] = useState(null);
  const [form] = Form.useForm();

  const n = useHistory();

  const token = localStorage.getItem("authToken");

  useEffect(() => {
    let fetchCalls = async () => {
      let x = await axios.get(`${baseUrlHr}/frontoffice/callsheet/`, {
        headers: { Authorization: `Token ${token}` },
      });

      if (x.status === 200) {
        console.log(x.data);
        setCalls(x.data);
      }
    };

    fetchCalls();
  }, [token]);

  useEffect(() => {
    localStorage.setItem("calls", JSON.stringify(calls));
  }, [calls]);

  const showModal = () => {
    setIsModalVisible(true);
    setEditingCall(null);
    form.resetFields();
  };

  const handleOk = async () => {
    form.validateFields().then((values) => {
      const newCall = {
        id: editingCall ? editingCall.id : calls.length + 1,
        company_name: values.companyName,
        customer_name: values.customerName,
        project_name: values.projectName,
        phone_number: values.phoneNumber,
        date: moment().format("YYYY-MM-DD"),
      };

      axios
        .post(`${baseUrlHr}/frontoffice/callsheet/`, newCall, {
          headers: { Authorization: `Token ${token}` },
        })
        .then((res) => {
          if (res.status === 201) {
            setCalls([res.data]);
          }
        });

      setIsModalVisible(false);
      form.resetFields();
    });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  // const handleEdit = () => {
  //   const editingCall = calls.find((call) => call.id === selectedRowKeys[0]);
  //   if (editingCall) {
  //     setEditingCall(editingCall);
  //     setIsModalVisible(true);
  //     form.setFieldsValue({
  //       companyName: editingCall.companyName,
  //       customerName: editingCall.customerName,
  //       projectName: editingCall.projectName,
  //       phoneNumber: editingCall.phoneNumber,
  //     });
  //   }
  // };

  // const handleDelete = () => {
  //   const filteredData = calls.filter(
  //     (call) => !selectedRowKeys.includes(call.id)
  //   );
  //   setCalls(filteredData);
  //   setSelectedRowKeys([]);
  // };

  // const handleDownload = () => {
  //   const filename = "calls_data.csv";
  //   const csvData = convertToCSV(calls);
  //   const blob = new Blob([csvData], { type: "text/csv" });
  //   if (window.navigator.msSaveBlob) {
  //     window.navigator.msSaveBlob(blob, filename);
  //   } else {
  //     const link = document.createElement("a");
  //     if (link.download !== undefined) {
  //       const url = URL.createObjectURL(blob);
  //       link.setAttribute("href", url);
  //       link.setAttribute("download", filename);
  //       document.body.appendChild(link);
  //       link.click();
  //       document.body.removeChild(link);
  //     }
  //   }
  // };

  // const convertToCSV = (data) => {
  //   const header = Object.keys(data[0]).join(",");
  //   const rows = data.map((row) => Object.values(row).join(","));
  //   return `${header}\n${rows.join("\n")}`;
  // };

  const onSelectChange = (selectedKeys) => {
    setSelectedRowKeys(selectedKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const handleConfirm = (record) => {
    onConfirm(record);
    setCalls(calls.filter((call) => call.id !== record.id));
    message.success(`Confirmed call with ${record.customerName}`);
    n.push("/frontoffice/Customerdetails");
  };

  const columns = [
    {
      title: "Company Name",
      dataIndex: "company_name ",
      key: "companyName",
    },
    {
      title: "Customer Name",
      dataIndex: "customer_name",
      key: "customerName",
    },
    {
      title: "Project Name",
      dataIndex: "project_name",
      key: "projectName",
    },
    {
      title: "Phone Number",
      dataIndex: "phone_number",
      key: "phoneNumber",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (text) => moment(text).format("YYYY-MM-DD"),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Button type="primary" onClick={() => handleConfirm(record)}>
          Confirm
        </Button>
      ),
    },
  ];

  return (
    <div style={{ backgroundImage: `url(${bg})`, height: "800px" }}>
      <div className="call-sheet" style={{ paddingTop: "50px" }}>
        <Title level={5}>Call Sheet</Title>
        <Button
          type="primary"
          icon={<PhoneOutlined />}
          onClick={showModal}
          style={{ marginBottom: 16 }}
        >
          Add Call
        </Button>
        {/* <Button
          type="primary"
          icon={<DownloadOutlined />}
          onClick={handleDownload}
          style={{ marginBottom: 16, marginLeft: 16 }}
        >
          Download Calls
        </Button> */}
        {/* {selectedRowKeys.length === 1 && (
          <Button
            type="primary"
            onClick={handleEdit}
            style={{ marginBottom: 16, marginLeft: 16 }}
          >
            Edit
          </Button>
        )} */}
        {/* {selectedRowKeys.length > 0 && (
          <Button
            type="danger"
            onClick={handleDelete}
            style={{ marginBottom: 16, marginLeft: 16 }}
          >
            Delete Selected
          </Button>
        )} */}
        <Modal
          title={editingCall ? "Edit Call" : "Add Call"}
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <Form form={form} layout="vertical">
            <Form.Item
              name="companyName"
              label="Company Name"
              rules={[{ required: true, message: "Please enter company name" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="customerName"
              label="Customer Name"
              rules={[
                { required: true, message: "Please enter customer name" },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="projectName"
              label="Project Name"
              rules={[{ required: true, message: "Please enter project name" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="phoneNumber"
              label="Phone Number"
              rules={[{ required: true, message: "Please enter phone number" }]}
            >
              <Input />
            </Form.Item>
          </Form>
        </Modal>
        <Table
          dataSource={calls}
          columns={columns}
          pagination={false}
          rowKey="id"
          rowSelection={{
            type: "checkbox",
            ...rowSelection,
          }}
        />
      </div>
    </div>
  );
}

export default CallSheet;
