import React, { useState, useEffect } from "react";
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
  Select,
} from "antd";
import axios from "axios";
import moment from "moment";
import projectbg from "../../assets/images/vectorteam5.png";
import { baseUrl, baseUrlHr } from "../../url";

const { Title } = Typography;
const { Option } = Select;

function Giveproject() {
  const [projectDetails, setProjectDetails] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [form] = Form.useForm();
  const [editingRow, setEditingRow] = useState(null);

  const token = localStorage.getItem("authToken");

  useEffect(() => {
    // Fetch employees from the staff database
    axios
      .get(`${baseUrl}/Staff/`, {
        headers: { Authorization: `Token ${token}` },
      })
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          setEmployees(response.data);
        }
      })
      .catch((error) => {
        console.error("There was an error fetching the employees!", error);
      });

    // Fetch project details from the backend
    axios
      .get(`${baseUrlHr}/projectassign/`, {
        headers: { Authorization: `Token ${token}` },
      })
      .then((response) => {
        const fetchedData = response.data.map((item) => ({
          ...item,
          status: item.status || "Pending", // Default status to "Pending" if not provided
        }));
        console.log("project", fetchedData);
        setProjectDetails(fetchedData);
      })
      .catch((error) => {
        console.error(
          "There was an error fetching the customer details!",
          error
        );
      });
  }, [token]);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    console.log("hai");
    form
      .validateFields()
      .then((values) => {
        if (editingRow) {
          const updatedData = projectDetails.map((item) =>
            item.id === editingRow.id ? { ...item, ...values } : item
          );
          setProjectDetails(updatedData);
          setEditingRow(null);
        } else {
          const newProject = {
            id: projectDetails.length + 1,
            ...values,
            projectdate: moment(values.projectDate).format('YYYY-MM-DD'),
            deadline: moment(values.deadline).format('YYYY-MM-DD'),
            status: "Pending", // Set default status to "Pending"
          };
          axios
            .post(`${baseUrlHr}/projectassign/`, newProject, {
              headers: { Authorization: `Token ${token}` },
            })
            .then((res) => {
              console.log(res);
              if (res.status === 201) {
                setProjectDetails([...projectDetails, res.data]);
              }
            });
        }
        setIsModalVisible(false);
        form.resetFields();
      })
      .catch((errorInfo) => {
        console.log("Validate Failed:", errorInfo);
      });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const handleDelete = () => {
    const filteredData = projectDetails.filter(
      (item) => !selectedRowKeys.includes(item.id)
    );
    setProjectDetails(filteredData);
    setSelectedRowKeys([]);
  };

  // const handleEdit = (record) => {
  //   setEditingRow(record);
  //   form.setFieldsValue({
  //     ...record,
  //     projectDate: moment(record.projectDate),
  //     deadline: moment(record.deadline),
  //   });
  //   showModal();
  // };

  const rowSelection = {
    selectedRowKeys,
    onChange: (selectedKeys) => {
      setSelectedRowKeys(selectedKeys);
    },
  };

  const columns = [
    {
      title: "Project Name",
      dataIndex: "projectname",
      key: "projectName",
      editable: true,
    },

    {
      title: "Employee Name",
      dataIndex: "employeename",
      key: "employeeName",
      editable: true,
    },
    {
      title: "Project Date",
      dataIndex: "projectdate",
      key: "projectDate",
      render: (text) => moment(text).format("LL"),
    },
    {
      title: "Deadline",
      dataIndex: "deadline",
      key: "deadline",
      render: (text) => moment(text).format("LL"),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (text) => text,
    },
    // {
    //   title: "Action",
    //   key: "action",
    //   render: (text, record) => (
    //     <Button type="primary" onClick={() => handleEdit(record)}>
    //       Edit
    //     </Button>
    //   ),
    // },
  ];

  return (
    <div style={{ backgroundImage: `url(${projectbg})`, height: "800px" }}>
      <div className="customer-details" style={{ paddingTop: "50px" }}>
        <Title level={5}>Assign Project</Title>
        <Row justify="space-between" align="middle">
          <Col>
            <Button
              type="primary"
              onClick={showModal}
              style={{ marginBottom: 16 }}
            >
              Assign project
            </Button>
          </Col>
          <Col>
            <Button
              type="danger"
              onClick={handleDelete}
              style={{ marginBottom: 16, marginLeft: 16 }}
            >
              Delete Selected
            </Button>
          </Col>
        </Row>
        <Modal
          title={editingRow ? "Edit Customer" : "Add Customer"}
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <Form form={form} layout="vertical">
            <Form.Item
              name="projectname"
              label="Project Name"
              rules={[
                { required: true, message: "Please enter project name" },
                {
                  min: 3,
                  message: "Project name must be at least 3 characters",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="employeename"
              label="Employee Name"
              rules={[
                { required: true, message: "Please select employee name" },
              ]}
            >
              <Select placeholder="Select an employee">
                {employees.map((employee) => (
                  <Option key={employee.id} value={employee.username}>
                    {employee.username}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              name="projectdate"
              label="Project Date"
              rules={[
                { required: true, message: "Please select project date" },
              ]}
            >
              <DatePicker />
            </Form.Item>
            <Form.Item
              name="deadline"
              label="Deadline"
              rules={[
                { required: true, message: "Please select deadline" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (
                      !value ||
                      moment(value).isAfter(getFieldValue("projectDate"))
                    ) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error("Deadline should be after project date")
                    );
                  },
                }),
              ]}
            >
              <DatePicker />
            </Form.Item>
          </Form>
        </Modal>
        <div style={{ overflowX: "auto" }}>
          <Table
            dataSource={projectDetails}
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
    </div>
  );
}

export default Giveproject;
