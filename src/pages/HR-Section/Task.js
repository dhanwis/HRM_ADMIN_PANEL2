import React, { useState, useEffect } from "react";
import {
  Form,
  Input,
  Button,
  DatePicker,
  Table,
  message,
  Popconfirm,
  Select,
} from "antd";
import moment from "moment";
import vector from "../../assets/images/vectorhr.png";
import axios from "axios";
import { baseUrl, baseUrlHr } from "../../url";

const { Option } = Select;

const Taskform = () => {
  const [form] = Form.useForm();
  const [submittedData, setSubmittedData] = useState([]);
  const [TeamLeads, setTeamLeads] = useState([]);

  const [editingKey, setEditingKey] = useState(null);
  const token = localStorage.getItem("authToken");

  console.log(token)

  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("submittedData")) || [];

    // Convert date strings back to moment objects
    savedData.forEach((item) => {
      if (item.startDate) {
        item.startDate = moment(item.startDate, "YYYY-MM-DD");
      }
      if (item.endDate) {
        item.endDate = moment(item.endDate, "YYYY-MM-DD");
      }
    });
    setSubmittedData(savedData);
  }, []);

  useEffect(() => {
    let fetchTeamLead = async () => {
      try {
        let response = await axios.get(`${baseUrl}/Teamlead/`, {
          headers: { Authorization: `Token ${token}` },
        });

        if (response.status === 200) {
          setTeamLeads(response.data.map((user) => user.username));
        }
        console.log("here the response ", response);
      } catch (error) {
        console.error("Error due to", error);
      }
    };

    fetchTeamLead();
  }, [token]);

  const onFinish = async (values) => {
    // console.log("vale", values);
    // const key = Date.now();
    // const newData = {
    //   ...values,
    //   key,
    //   startDate: moment(values.startDate).format("YYYY-MM-DD"), // Convert moment object to string
    //   endDate: moment(values.endDate).format("YYYY-MM-DD"), // Convert moment object to string
    // };
    // setSubmittedData([...submittedData, newData]);
    // form.resetFields();
    // const updatedData = [...submittedData, newData];
    // localStorage.setItem("submittedData", JSON.stringify(updatedData));
    // console.log("Updated Data:", updatedData);

    try {
      const values = await form.validateFields();

      console.log("values", values);

      // Convert the date format
      if (values.startdate || values.enddate) {
        const startdate = new Date(values.startdate);
        const formattedDate1 = startdate.toISOString().split("T")[0]; // YYYY-MM-DD
        values.startdate = formattedDate1;

        const enddate = new Date(values.enddate);
        const formattedDate2 = enddate.toISOString().split("T")[0]; // YYYY-MM-DD
        values.enddate = formattedDate2;
      }

      const response = await axios.post(`${baseUrlHr}/teamleadassign/`, values, {
        headers: {
          "Content-Type": "application/json", // Ensure this header is set for FormData
          Authorization: `Token ${token}`,
        },
      });

      console.log("response", response);

      if (response.status === 201) {
        // onCreate(response.data.user);
        console.log("response data", response.data);
        message.success("Task created successfully!");
      } else {
        message.error("Failed to create user. Please try again later.");
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        console.error("Validation error:", error.response.data.message);
        message.error(
          error.response.data.message || "Validation error occurred."
        );
      } else {
        console.error("Submission error:", error);
        message.error("An error occurred while submitting the form.");
      }
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const deleteRecord = (key) => {
    const newData = submittedData.filter((item) => item.key !== key);
    setSubmittedData(newData);
    setEditingKey(null);
    localStorage.setItem("submittedData", JSON.stringify(newData));
  };

  const edit = (key) => {
    setEditingKey(key);
    const recordToEdit = submittedData.find((record) => record.key === key);

    // Convert date strings to moment objects before setting form fields
    const initialValues = { ...recordToEdit };
    initialValues.startDate = moment(recordToEdit.startDate);
    initialValues.endDate = moment(recordToEdit.endDate);

    form.setFieldsValue(initialValues);
  };

  const save = async (key) => {
    try {
      const row = await form.validateFields();
      const newData = [...submittedData];
      const index = newData.findIndex((item) => key === item.key);

      if (index > -1) {
        newData[index] = { ...newData[index], ...row };
        newData[index].startDate = moment(newData[index].startDate).format(
          "YYYY-MM-DD"
        );
        newData[index].endDate = moment(newData[index].endDate).format(
          "YYYY-MM-DD"
        );
        setSubmittedData(newData);
        setEditingKey(null);
        localStorage.setItem("submittedData", JSON.stringify(newData));
        console.log("Updated Data:", newData);
      }
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };

  console.log("teams", TeamLeads);

  const cancel = () => {
    setEditingKey(null);
    form.resetFields();
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Task Title",
      dataIndex: "taskTitle",
      key: "taskTitle",
    },
    {
      title: "Start Date",
      dataIndex: "startDate",
      key: "startDate",
      render: (text, record) => {
        return <span>{moment(record.startDate).format("YYYY-MM-DD")}</span>;
      },
    },
    {
      title: "End Date",
      dataIndex: "endDate",
      key: "endDate",
      render: (text, record) => {
        return <span>{moment(record.endDate).format("YYYY-MM-DD")}</span>;
      },
    },
    {
      title: "Task Description",
      dataIndex: "taskDescription",
      key: "taskDescription",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      render: (_, record) => {
        const editable = record.key === editingKey;
        return editable ? (
          <span>
            <Button
              type="primary"
              onClick={() => save(record.key)}
              style={{ marginRight: 8 }}
            >
              Save
            </Button>
            <Button onClick={cancel}>Cancel</Button>
          </span>
        ) : (
          <span>
            <Button type="link" onClick={() => edit(record.key)}>
              Edit
            </Button>
            <Popconfirm
              title="Sure to delete?"
              onConfirm={() => deleteRecord(record.key)}
            >
              <Button type="link">Delete</Button>
            </Popconfirm>
          </span>
        );
      },
    },
  ];

  return (
    <div
      style={{
        marginTop: "100px",
        backgroundImage: `url(${vector})`,
        height: "800px",
      }}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        {/* <h2>Task Information</h2> */}
        <Form.Item
          label="Name"
          name="user"
          rules={[{ required: true, message: "Please enter name" }]}
        >
          <Select placeholder="Select name">
            {TeamLeads &&
              TeamLeads.map((name, index) => (
                <Option value={`${name}`} key={index}>
                  {name}
                </Option>
              ))}
          </Select>
        </Form.Item>
        <Form.Item
          label="Task Title"
          name="tasktitle"
          rules={[{ required: true, message: "Please enter task title" }]}
          labelCol={{ span: 24 }} // Adjust the span value as needed
          wrapperCol={{ span: 24 }} // Adjust the span value as needed
        >
          <Input placeholder="Task Title" />
        </Form.Item>
        <Form.Item
          label="Start Date"
          name="startdate"
          rules={[{ required: true, message: "Please select start date" }]}
        >
          <DatePicker style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item
          label="End Date"
          name="enddate"
          rules={[{ required: true, message: "Please select end date" }]}
        >
          <DatePicker style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item
          label="Task Description"
          name="task_description"
          rules={[{ required: true, message: "Please enter task description" }]}
        >
          <Input.TextArea placeholder="Task Description" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
      <div>
        {/* <h2>Submitted Task Information</h2> */}
        <Table dataSource={submittedData} columns={columns} />
      </div>
    </div>
  );
};

export default Taskform;
