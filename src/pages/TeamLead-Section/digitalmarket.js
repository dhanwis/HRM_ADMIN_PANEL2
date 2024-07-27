import { Fragment, useEffect, useState } from "react";
import {
  Table,
  Typography,
  Input,
  DatePicker,
  Button,
  Modal,
  Form,
  Row,
  Col,
  message,
} from "antd";
import moment from "moment";
import vector1 from "../../assets/images/vectorteam5.png";
import axios from "axios";
import { baseUrlHr } from "../../url";

const { Title } = Typography;

function DigitalMarketingTable() {
  const [digital, setDigital] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [, setCurrentRecord] = useState(null);
  const [form] = Form.useForm();

  const token = localStorage.getItem("authToken");

  useEffect(() => {
    // Fetch employees from the staff database
    axios
      .get(`${baseUrlHr}/teamlead/digitalmarketcreate/`, {
        headers: { Authorization: `Token ${token}` },
      })
      .then((response) => {
        if (response.status === 200) {
          console.log(response.data);
          setDigital(response.data);
        }
      })
      .catch((error) => {
        console.error("There was an error fetching the employees!", error);
      });
  }, [token]);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();

      // Check and format the dates
      if (values.start_date && values.end_date) {
        values.start_date = moment(values.start_date).format("YYYY-MM-DD");
        values.end_date = moment(values.end_date).format("YYYY-MM-DD");
      }

      // Make the API call
      const response = await axios.post(
        `${baseUrlHr}/teamlead/digitalmarketcreate/`,
        values,
        { headers: { Authorization: `Token ${token}` } }
      );

      // Handle the response
      if (response.status === 201) {
        setDigital([...digital, response.data]);
      }

      // Reset form and state
      setIsModalVisible(false);
      form.resetFields();
      setEditMode(false);
      setCurrentRecord(null);
    } catch (error) {
      message.error("Please check the form fields and try again.");
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
    setEditMode(false);
    setCurrentRecord(null);
  };

  const handleEdit = (record) => {
    setEditMode(true);
    setCurrentRecord(record);
    form.setFieldsValue({
      ...record,
      startdate: moment(record.startdate),
      enddate: moment(record.enddate),
    });
    showModal();
  };

  const handleDelete = async (id) => {
    let y = await axios.delete(
      `${baseUrlHr}/teamlead/digitalmarketdelete/${id}/`,
      { headers: { Authorization: `Token ${token}` } }
    );

    if (y.status === 200) {
      const filteredData = digital.filter((item) => item.id !== id);
      setDigital(filteredData);
      setSelectedRowKeys([]);
    }
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: (selectedKeys) => {
      setSelectedRowKeys(selectedKeys);
    },
  };

  const columns = [
    {
      title: "Client Name",
      dataIndex: "client_name",
      key: "clientname",
    },
    {
      title: "Customer ID",
      dataIndex: "customer_id",
      key: "customerid",
    },
    {
      title: "Post",
      dataIndex: "post",
      key: "post",
    },
    {
      title: "Firm Name",
      dataIndex: "Firm_name",
      key: "firmname",
    },
    {
      title: "Start Date",
      dataIndex: "start_date ",
      key: "startdate",
      render: (text) => moment(text).format("YYYY-MM-DD"),
    },
    {
      title: "Location",
      dataIndex: "location",
      key: "location",
    },
    {
      title: "End Date",
      dataIndex: "end_date",
      key: "enddate",
      render: (text) => moment(text).format("YYYY-MM-DD"),
    },
    {
      title: "Amount Spend",
      dataIndex: "amount_spend",
      key: "amountspend",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Fragment>
          {/* <Button
            type="primary"
            size="small"
            onClick={() => handleEdit(record)}
          >
            Edit
          </Button> */}
          <Button
            type="primary"
            size="small"
            onClick={() => handleDelete(record.id)}
          >
            Delete
          </Button>
        </Fragment>
      ),
    },
  ];

  return (
    <div
      style={{
        backgroundImage: `url(${vector1})`,
        width: "100%",
        height: "730px",
      }}
    >
      <div style={{ padding: "50px" }}>
        <Title level={5}>Digital Marketing Table</Title>
        <Row justify="space-between" align="middle">
          <Col>
            <Button
              type="primary"
              onClick={showModal}
              style={{ marginBottom: 16 }}
            >
              Add Customer
            </Button>
          </Col>
        </Row>
        <Modal
          title={editMode ? "Edit Customer" : "Add Customer"}
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <Form form={form} layout="vertical">
            <Form.Item
              name="client_name"
              label="Client Name"
              rules={[
                { required: true, message: "Please enter client name" },
                {
                  min: 4,
                  message: "Client name must be at least 4 characters",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="customer_id"
              label="Customer ID"
              rules={[
                { required: true, message: "Please enter customer ID" },
                {
                  pattern: /^\d{3,}$/,
                  message: "Customer ID must be numeric and at least 3 digits",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="post"
              label="Post"
              rules={[{ required: true, message: "Please enter post" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="Firm_name"
              label="Firm Name"
              rules={[
                { required: true, message: "Please enter firm name" },
                { min: 4, message: "Firm name must be at least 4 characters" },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="start_date"
              label="Start Date"
              rules={[
                { required: true, message: "Please select start date" },
                {
                  validator: (_, value) =>
                    value && value.isBefore(moment().startOf("day"))
                      ? Promise.reject(
                          new Error("Start date cannot be in the past")
                        )
                      : Promise.resolve(),
                },
              ]}
            >
              <DatePicker />
            </Form.Item>
            <Form.Item
              name="location"
              label="Location"
              rules={[{ required: true, message: "Please enter location" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="end_date"
              label="End Date"
              rules={[
                { required: true, message: "Please select end date" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (
                      !value ||
                      !getFieldValue("startdate") ||
                      value.isAfter(getFieldValue("startdate"))
                    ) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error("End date must be after start date")
                    );
                  },
                }),
              ]}
            >
              <DatePicker />
            </Form.Item>
            <Form.Item
              name="amount_spend"
              label="Amount Spend"
              rules={[
                { required: true, message: "Please enter amount spend" },
                { pattern: /^\d+$/, message: "Amount spend must be numeric" },
              ]}
            >
              <Input />
            </Form.Item>
          </Form>
        </Modal>
        <div style={{ overflowX: "auto" }}>
          <Table
            dataSource={digital}
            columns={columns}
            pagination={false}
            rowSelection={{ type: "checkbox", ...rowSelection }}
            rowKey="id"
          />
        </div>
      </div>
    </div>
  );
}

export default DigitalMarketingTable;
