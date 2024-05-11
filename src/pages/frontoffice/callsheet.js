import React, { useState, useEffect } from "react";
import { Table, Typography, Button, Modal, Form, Input } from "antd";
import { PhoneOutlined, DownloadOutlined } from '@ant-design/icons'; // Import the PhoneOutlined and DownloadOutlined icons
import moment from "moment";

const { Title } = Typography;

function CallSheet() {
  const [calls, setCalls] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingCall, setEditingCall] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    const storedData = localStorage.getItem("calls");
    if (storedData) {
      setCalls(JSON.parse(storedData));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("calls", JSON.stringify(calls));
  }, [calls]);

  const showModal = () => {
    setIsModalVisible(true);
    setEditingCall(null);
    form.resetFields();
  };

  const handleOk = () => {
    form.validateFields().then((values) => {
      const newCall = {
        id: editingCall ? editingCall.id : calls.length + 1,
        companyName: values.companyName,
        customerName: values.customerName,
        projectName: values.projectName,
        phoneNumber: values.phoneNumber,
        date: moment().format("YYYY-MM-DD"),
      };
      if (editingCall) {
        const editedCalls = calls.map((call) => (call.id === editingCall.id ? newCall : call));
        setCalls(editedCalls);
      } else {
        setCalls([...calls, newCall]);
      }
      setIsModalVisible(false);
      form.resetFields();
    });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const handleEdit = () => {
    const editingCall = calls.find((call) => call.id === selectedRowKeys[0]);
    if (editingCall) {
      setEditingCall(editingCall);
      setIsModalVisible(true);
      form.setFieldsValue({
        companyName: editingCall.companyName,
        customerName: editingCall.customerName,
        projectName: editingCall.projectName,
        phoneNumber: editingCall.phoneNumber,
      });
    }
  };

  const handleDelete = () => {
    const filteredData = calls.filter((call) => !selectedRowKeys.includes(call.id));
    setCalls(filteredData);
    setSelectedRowKeys([]);
  };

  const handleDownload = () => {
    const filename = "calls_data.csv";
    const csvData = convertToCSV(calls);
    const blob = new Blob([csvData], { type: "text/csv" });
    if (window.navigator.msSaveBlob) {
      // For IE 10+
      window.navigator.msSaveBlob(blob, filename);
    } else {
      const link = document.createElement("a");
      if (link.download !== undefined) {
        // For other browsers
        const url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", filename);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    }
  };

  const convertToCSV = (data) => {
    const header = Object.keys(data[0]).join(",");
    const rows = data.map((row) => Object.values(row).join(","));
    return `${header}\n${rows.join("\n")}`;
  };

  const onSelectChange = (selectedKeys) => {
    setSelectedRowKeys(selectedKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const columns = [
    {
      title: "Company Name",
      dataIndex: "companyName",
      key: "companyName",
    },
    {
      title: "Customer Name",
      dataIndex: "customerName",
      key: "customerName",
    },
    {
      title: "Project Name",
      dataIndex: "projectName",
      key: "projectName",
    },
    {
      title: "Phone Number",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (text) => moment(text).format("YYYY-MM-DD"),
    },
  ];

  return (
    <div className="call-sheet"style={{paddingTop:"50px"}}>
      <Title level={5}>Call Sheet</Title>
      <Button type="primary" icon={<PhoneOutlined />} onClick={showModal} style={{ marginBottom: 16 }}>
        Add Call
      </Button>
      <Button type="primary" icon={<DownloadOutlined />} onClick={handleDownload} style={{ marginBottom: 16, marginLeft: 16 }}>
        Download Calls
      </Button>
      {selectedRowKeys.length === 1 && (
        <Button type="primary" onClick={handleEdit} style={{ marginBottom: 16, marginLeft: 16 }}>
          Edit
        </Button>
      )}
      {selectedRowKeys.length > 0 && (
        <Button type="danger" onClick={handleDelete} style={{ marginBottom: 16, marginLeft: 16 }}>
          Delete Selected
        </Button>
      )}
      <Modal title={editingCall ? "Edit Call" : "Add Call"} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <Form form={form} layout="vertical">
          <Form.Item name="companyName" label="Company Name" rules={[{ required: true, message: "Please enter company name" }]}>
            <Input />
          </Form.Item>
          <Form.Item name="customerName" label="Customer Name" rules={[{ required: true, message: "Please enter customer name" }]}>
            <Input />
          </Form.Item>
          <Form.Item name="projectName" label="Project Name" rules={[{ required: true, message: "Please enter project name" }]}>
            <Input />
          </Form.Item>
          <Form.Item name="phoneNumber" label="Phone Number" rules={[{ required: true, message: "Please enter phone number" }]}>
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
  );
}

export default CallSheet;
