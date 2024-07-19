import React, { useState, useEffect } from "react";
import {
  Form,
  Input,
  Radio,
  Button,
  Table,
  Space,
  Modal,
  Select,
  DatePicker,
} from "antd";
import "antd/dist/antd.css"; // Import Ant Design styles
import moment from "moment";
import vector from "../../assets/images/vectorhr.png";
import axios from "axios";
import { baseUrlHr } from "../../url";

const JobForm = () => {
  const [form] = Form.useForm();
  const [workLocation, setWorkLocation] = useState("Work from Home");
  const [jobData, setJobData] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);

  const token = localStorage.getItem("authToken");

  useEffect(() => {
    if (jobData.length === 0) {
      let fetchJobs = async () => {
        let response = await axios.get(`${baseUrlHr}/hr/jobapply/`, {
          headers: { Authorization: `Token ${token}` },
        });

        if (response.status === 200) {
          setJobData(response.data);
        }
      };

      fetchJobs();
    }
  }, [jobData.length, token]);

  const columns = [
    {
      title: "Company Name",
      dataIndex: "company_name",
      key: "companyName",
    },
    {
      title: "Job Title",
      dataIndex: "job_title",
      key: "jobTitle",
    },
    {
      title: "Salary",
      dataIndex: "salary",
      key: "salary",
    },
    {
      title: "Mode of working",
      dataIndex: "mode_of_work",
      key: "workLocation",
    },
    {
      title: "Location",
      dataIndex: "location",
      key: "location",
    },
    {
      title: "Experience",
      dataIndex: "experience",
      key: "experience",
    },
    {
      title: "Last Date",
      dataIndex: "last_date",
      key: "lastDate",
      render: (text, record) => {
        return <span>{moment(record.lastDate).format("YYYY-MM-DD")}</span>;
      },
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <Button onClick={() => handleEdit(record)}>Edit</Button>
          <Button onClick={() => handleDelete(record)}>Delete</Button>
        </Space>
      ),
    },
  ];

  const handleEdit = (record) => {
    setSelectedJob(record);
    setIsModalVisible(true);
    form.setFieldsValue({ ...record, lastDate: moment(record.lastDate) });
  };

  const handleDelete = async (record) => {
    // let res = await axios.delete();

    // if (res.status === 200) {
    //   setJobData(jobData.filter((job) => job !== record));
    // }
    setJobData(jobData.filter((job) => job !== record));
  };

  // const onFinish = (values) => {
  //   console.log("Received values:", values);
  //   if (selectedJob) {
  //     const updatedJobs = jobData.map((job) =>
  //       job === selectedJob ? values : job
  //     );
  //     setJobData(updatedJobs);
  //     setSelectedJob(null);
  //   } else {
  //     setJobData([...jobData, values]);
  //   }
  //   form.resetFields();
  //   setIsModalVisible(false);
  // };

  const onFinish = async (values) => {
    console.log("Received values:", values);
    if (selectedJob) {
      const updatedJobs = jobData.map((job) =>
        job === selectedJob ? values : job
      );
      setJobData(updatedJobs);
      setSelectedJob(null);
    } else {
      if (values.last_date) {
        const date = new Date(values.last_date);
        const formattedDate = date.toISOString().split("T")[0]; //converts to  YYYY-MM-DD format
        values.last_date = formattedDate;
      }

      let x = await axios.post(`${baseUrlHr}/hr/jobapply/`, values, {
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "application/json",
        },
      });

      console.log("x", x);

      if (x.status === 201) {
        setJobData([...jobData, x.data]);
      }
    }
    form.resetFields();
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    form.resetFields();
    setIsModalVisible(false);
  };

  return (
    <div
      style={{
        marginTop: "100px",
        marginBottom: "500px",
        backgroundImage: `url(${vector})`,
        height: "800px",
      }}
    >
      <Form form={form} onFinish={onFinish} layout="vertical">
        <Form.Item
          label="Company Name"
          name="company_name"
          rules={[{ required: true, message: "Please input company name" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Job Title"
          name="job_title"
          rules={[{ required: true, message: "Please input job title" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Salary"
          name="salary"
          rules={[
            { required: true, message: "Please input salary" },
            { pattern: /^\d+$/, message: "Salary must be a number" },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Mode of working"
          name="mode_of_work"
          initialValue="Work from Home"
        >
          <Radio.Group onChange={(e) => setWorkLocation(e.target.value)}>
            <Radio value="Work from Home">Work from Home</Radio>
            <Radio value="Work from Office">Work from Office</Radio>
          </Radio.Group>
        </Form.Item>
        {workLocation === "Work from Office" && (
          <Form.Item
            label="Location"
            name="location"
            rules={[{ required: true, message: "Please input location" }]}
          >
            <Input />
          </Form.Item>
        )}
        <Form.Item
          name="experience"
          label="Experience"
          rules={[{ required: true, message: "Please input the experience!" }]}
        >
          <Select>
            <Select.Option value="0 year">0 year</Select.Option>
            <Select.Option value="1 year">1 year</Select.Option>
            <Select.Option value="2 years">2 years</Select.Option>
            <Select.Option value="more than 2 years">
              More than 2 years
            </Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          label="Last Date"
          name="last_date"
          rules={[{ required: true, message: "Please select last date" }]}
        >
          <DatePicker style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            {selectedJob ? "Update" : "Apply"}
          </Button>
        </Form.Item>
      </Form>
      <Table
        columns={columns}
        dataSource={jobData}
        rowKey={(record) => record.companyName + record.jobTitle}
      />
      <Modal
        title="Edit Job"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form form={form} onFinish={onFinish} layout="vertical">
          <Form.Item
            label="Company Name"
            name="companyName"
            rules={[{ required: true, message: "Please input company name" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Job Title"
            name="jobTitle"
            rules={[{ required: true, message: "Please input job title" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Salary"
            name="salary"
            rules={[
              { required: true, message: "Please input salary" },
              { pattern: /^\d+$/, message: "Salary must be a number" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="Mode of working" name="workLocation">
            <Radio.Group onChange={(e) => setWorkLocation(e.target.value)}>
              <Radio value="Work from Home">Work from Home</Radio>
              <Radio value="Work from Office">Work from Office</Radio>
            </Radio.Group>
          </Form.Item>
          {workLocation === "Work from Office" && (
            <Form.Item
              label="Location"
              name="location"
              rules={[{ required: true, message: "Please input location" }]}
            >
              <Input />
            </Form.Item>
          )}
          <Form.Item
            name="experience"
            label="Experience"
            rules={[
              { required: true, message: "Please input the experience!" },
            ]}
          >
            <Select>
              <Select.Option value="0 year">0 year</Select.Option>
              <Select.Option value="1 year">1 year</Select.Option>
              <Select.Option value="2 years">2 years</Select.Option>
              <Select.Option value="more than 2 years">
                More than 2 years
              </Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="Last Date"
            name="lastDate"
            rules={[{ required: true, message: "Please select last date" }]}
          >
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Update
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default JobForm;
