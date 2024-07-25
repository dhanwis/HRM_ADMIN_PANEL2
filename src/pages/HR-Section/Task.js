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

  //Team lead data fetching for assign task
  useEffect(() => {
    let fetchTeamLead = async () => {
      try {
        let response = await axios.get(`${baseUrl}/Teamlead/`, {
          headers: { Authorization: `Token ${token}` },
        });

        console.log("all teamleads", response.data);

        if (response.status === 200) {
          setTeamLeads(response.data);

          let x = response.data?.forEach((item) => {
            if (item.startDate) {
              item.startDate = moment(item.startDate, "YYYY-MM-DD");
            }
            if (item.endDate) {
              item.endDate = moment(item.endDate, "YYYY-MM-DD");
            }
          });
          setSubmittedData(x);
        }
      } catch (error) {
        console.error("Error due to", error);
      }
    };

    fetchTeamLead();
  }, [token]);

  // All Task listing
  useEffect(() => {
    let fetchTeamLead = async () => {
      try {
        let response = await axios.get(`${baseUrlHr}/teamleadassign/`, {
          headers: { Authorization: `Token ${token}` },
        });

        console.log("fetchtem", response);

        if (response.status === 200) {
          setSubmittedData(response.data);
        }
        console.log("All task ", response);
      } catch (error) {
        console.error("Error due to", error);
      }
    };

    fetchTeamLead();
  }, [token]);

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const deleteRecord = async (key) => {
    try {
      let x = await axios.delete(`${baseUrlHr}/teamleadassign/${key}`, {
        headers: { Authorization: `Token ${token}` },
      });

      if (x.status === 200) {
        setSubmittedData((prevData) =>
          prevData.filter((item) => item.id !== key)
        );
        setEditingKey(null);
      }
    } catch (error) {
      console.error(
        "Error deleting record:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const onFinish = async (formValues) => {
    try {
      const values = await form.validateFields();

      // Convert the date format
      if (values.startdate) {
        const startdate = new Date(values.startdate);
        values.startdate = startdate.toISOString().split("T")[0]; // YYYY-MM-DD
      }

      if (values.enddate) {
        const enddate = new Date(values.enddate);
        values.enddate = enddate.toISOString().split("T")[0]; // YYYY-MM-DD
      }

      const response = await axios.post(
        `${baseUrlHr}/teamleadassign/`,
        values,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
        }
      );

      if (response.status === 201) {
        console.log("response data", response.data);
        message.success("Task created successfully!");

        // Ensure submittedData is updated correctly as an array
        setSubmittedData((prevData) => [...prevData, response.data]);
        form.resetFields();
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

  const edit = async (key) => {
    let x = await axios.patch(
      `${baseUrlHr}/teamleadupdate/${key}`,
      {},
      {
        headers: { Authorization: `Token ${token}` },
      }
    );

    if (x.status === 200) {
      setEditingKey(key);
      submittedData.find((record) => record.user === key);

      // Convert date strings to moment objects before setting form fields
      const initialValues = { ...x.data };
      initialValues.startdate = moment(x.data.startdate);
      initialValues.enddate = moment(x.data.enddate);

      form.setFieldsValue(initialValues);
    }
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

  const cancel = () => {
    setEditingKey(null);
    form.resetFields();
  };

  const columns = [
    {
      title: "TeamLead",
      dataIndex: "user",
      key: "username",
    },
    {
      title: "Task Title",
      dataIndex: "tasktitle",
      key: "taskTitle",
    },
    {
      title: "Start Date",
      dataIndex: "startdate",
      key: "startDate",
      render: (text, record) => {
        return <span>{moment(record.startDate).format("YYYY-MM-DD")}</span>;
      },
    },
    {
      title: "End Date",
      dataIndex: "enddate",
      key: "endDate",
      render: (text, record) => {
        return <span>{moment(record.endDate).format("YYYY-MM-DD")}</span>;
      },
    },
    {
      title: "Task Description",
      dataIndex: "task_description",
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
            <Button type="link" onClick={() => edit(record.id)}>
              Edit
            </Button>
            <Popconfirm
              title="Sure to delete?"
              onConfirm={() => deleteRecord(record.id)}
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
                <Option value={name.id} key={index}>
                  {name.username}
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
