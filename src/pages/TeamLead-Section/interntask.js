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
import moment from "moment";
import axios from "axios";
import internbgg from "../../assets/images/vectorteam5.png";
import { baseUrl, baseUrlHr } from "../../url";
import "./interntask.css";

const { Title } = Typography;
const { Option } = Select;

function StudentTasks() {
  const [taskDetails, setTaskDetails] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [guides, setGuides] = useState([]);
  const [timeSlots, setTimeSlots] = useState([]);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [editTaskId, setEditTaskId] = useState(null);
  const [form] = Form.useForm();

  const token = localStorage.getItem("authToken");

  useEffect(() => {
    // Fetch employees from the staff database
    axios
      .get(`${baseUrl}/Staff/`, {
        headers: { Authorization: `Token ${token}` },
      })
      .then((response) => {
        if (response.status === 200) {
          setGuides(response.data);
        }
      })
      .catch((error) => {
        console.error("There was an error fetching the employees!", error);
      });
  }, [token]);

  useEffect(() => {
    // Setting students
    axios
      .get(`${baseUrl}/intern-reg/`)
      .then((response) => {
        if (response.status === 200) {
          setStudents(response.data);
        }
      })
      .catch((error) => {
        console.error("There was an error fetching the employees!", error);
      });

    // Fetching tasks
    axios
      .get(`${baseUrlHr}/studentassign/`, {
        headers: { Authorization: `Token ${token}` },
      })
      .then((response) => {
        if (response.status === 200) {
          setTaskDetails(response.data); // Directly set the response data
          console.log("Tasks", response.data); // Verify the fetched data
        }
      })
      .catch((error) => {
        console.error("There was an error fetching the tasks!", error);
      });
  }, []);

  // useEffect(() => {
  //   // Filter students based on the selected time slot
  //   if (selectedTimeSlot) {
  //     const filtered = students.filter(
  //       (student) => student.company.bs === selectedTimeSlot
  //     ); // Adjust according to your API response structure
  //     setFilteredStudents(filtered);
  //   } else {
  //     setFilteredStudents(students);
  //   }
  // }, [selectedTimeSlot, students]);

  const showModal = () => {
    setIsModalVisible(true);
  };

  // function getStudentIdByName(name) {
  //   const student = students.find((student) => student.name === name);
  //   return student ? student.id : null;
  // }

  const handleOk = () => {
    form.validateFields().then((values) => {
      console.log("val", values);
      const newTask = {
        id: editTaskId !== null ? editTaskId : taskDetails.length + 1,
        student_name: values.student_name,
        task_name: values.task_name,
        task_details: values.task_details,
        guide_name: values.guide_name,
        time_slot: values.time_slot,
        start_date: moment(values.start_date).format("YYYY-MM-DD"), // Corrected format
        end_date: moment(values.end_date).format("YYYY-MM-DD"), // Corrected format
        status: "Pending",
      };

      axios
        .post(`${baseUrlHr}/studentassign/`, newTask, {
          headers: { Authorization: `Token ${token}` },
        })
        .then((res) => {
          if (res.status === 201) {
            if (editTaskId !== null) {
              const updatedTaskList = taskDetails.map((task) =>
                task.id === editTaskId ? res.data : task
              );
              setTaskDetails(updatedTaskList);
            } else {
              setTaskDetails([...taskDetails, res.data]);
            }
          }
        });

      setIsModalVisible(false);
      setEditTaskId(null);
      form.resetFields();
    });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setEditTaskId(null);
    form.resetFields();
  };

  const handleDelete = async (id) => {
    console.log("id", id);
    let res = await axios.delete(`${baseUrlHr}/studentassigndelete/${id}/`, {
      headers: { Authorization: `Token ${token}` },
    });

    if (res.status === 200) {
      console.log(res.data);
      const filteredData = taskDetails.filter((item) => item.id !== id);
      setTaskDetails(filteredData);
    }
  };

  // const handleEdit = (record) => {
  //   setEditTaskId(record.id);
  //   form.setFieldsValue({
  //     student_name: record.student_name,
  //     task_name: record.task_name,
  //     task_details: record.task_details,
  //     guide_name: record.guide_name,
  //     time_slot: record.time_slot,
  //     start_date: moment(record.start_date),
  //     end_date: moment(record.end_date),
  //   });
  //   showModal();
  // };

  const updateStatus = (record, newStatus) => {
    const updatedTaskList = taskDetails.map((task) =>
      task.id === record.id ? { ...task, status: newStatus } : task
    );
    setTaskDetails(updatedTaskList);
  };

  // const rowSelection = {
  //   selectedRowKeys,
  //   onChange: (selectedKeys) => {
  //     setSelectedRowKeys(selectedKeys);
  //   },
  // };

  // console.log('rowselect',rowSelection)

  const columns = [
    {
      title: "Student Name",
      dataIndex: "student_name",
      key: "studentName",
    },
    {
      title: "Task Name",
      dataIndex: "task_name",
      key: "taskName",
    },
    {
      title: "Task Details",
      dataIndex: "task_details",
      key: "taskDetails",
    },
    {
      title: "Guide Name",
      dataIndex: "guide_name",
      key: "guideName",
    },
    {
      title: "Time Slot",
      dataIndex: "time_slot",
      key: "timeSlot",
    },
    {
      title: "Start Date",
      dataIndex: "start_date",
      key: "startDate",
      render: (text) => moment(text).format("YYYY-MM-DD"),
    },
    {
      title: "End Date",
      dataIndex: "end_date",
      key: "endDate",
      render: (text) => moment(text).format("YYYY-MM-DD"),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (text, record) => (
        <Select value={text} onChange={(value) => updateStatus(record, value)}>
          <Option value="Pending">Pending</Option>
          <Option value="In Progress">In Progress</Option>
          <Option value="Finished">Finished</Option>
        </Select>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <React.Fragment>
          {/* <Button type="link" onClick={() => handleEdit(record)}>
            Edit
          </Button> */}

          <Button
            type="primary"
            className="ant-btn-primary"
            onClick={() => handleDelete(record.id)}
          >
            Delete
          </Button>
        </React.Fragment>
      ),
    },
  ];

  return (
    <div style={{ backgroundImage: `url(${internbgg})`, height: "800px" }}>
      <div className="task-details" style={{ paddingTop: "50px" }}>
        <Title level={5}>Assign Task</Title>
        <Row justify="space-between" align="middle">
          <Col>
            <Button
              type="primary"
              onClick={showModal}
              style={{ marginBottom: 16 }}
            >
              Assign Task
            </Button>
          </Col>
          {/* <Col>
            <Button
              type="danger"
              onClick={() => handleDelete}
              style={{ marginBottom: 16, marginLeft: 16 }}
            >
              Delete Selected
            </Button>
          </Col> */}
        </Row>
        <Modal
          title={editTaskId !== null ? "Edit Task" : "Add Task"}
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <Form form={form} layout="vertical">
            {/* <Form.Item
              name="timeSlot"
              label="Time Slot"
              rules={[{ required: true, message: "Please select a time slot" }]}
            >
              <Select onChange={(value) => setSelectedTimeSlot(value)}>
                {timeSlots.map((slot) => (
                  <Option key={slot.id} value={slot.title}>
                    {slot.title}
                  </Option> // Adjust according to your API response structure
                ))}
              </Select>
            </Form.Item> */}
            <Form.Item
              name="time_slot"
              label="Time Slot"
              rules={[{ required: true, message: "Please enter time slot" }]}
            >
              <Input type="time" />
            </Form.Item>
            <Form.Item
              name="student_name"
              label="Student Name"
              rules={[
                { required: true, message: "Please select student name" },
              ]}
            >
              <Select>
                {students?.map((student) => (
                  <Option key={student.id} value={student.username}>
                    {student.username}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              name="task_name"
              label="Task Name"
              rules={[
                { required: true, message: "Please enter task name" },
                { min: 3, message: "Task name must be at least 3 characters" },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="task_details"
              label="Task Details"
              rules={[
                { required: true, message: "Please enter task details" },
                {
                  min: 8,
                  message: "Task details must be at least 8 characters",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="guide_name"
              label="Guide Name"
              rules={[{ required: true, message: "Please select guide name" }]}
            >
              <Select>
                {guides.map((guide) => (
                  <Option key={guide.id} value={guide.username}>
                    {guide.username}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              name="start_date"
              label="Start Date"
              rules={[
                { required: true, message: "Please select start date" },
                {
                  validator: (rule, value) =>
                    value && value.isBefore(moment(), "day")
                      ? Promise.reject("Start date must be today or later")
                      : Promise.resolve(),
                },
              ]}
            >
              <DatePicker />
            </Form.Item>
            <Form.Item
              name="end_date"
              label="End Date"
              rules={[
                { required: true, message: "Please select end date" },
                {
                  validator: (rule, value) =>
                    value && value.isBefore(moment(), "day")
                      ? Promise.reject("End date must be today or later")
                      : Promise.resolve(),
                },
              ]}
            >
              <DatePicker />
            </Form.Item>
          </Form>
        </Modal>
        <div style={{ overflowX: "auto" }}>
          <Table
            dataSource={taskDetails}
            columns={columns}
            pagination={false}
            rowKey="id"
            // rowSelection={{
            //   type: "checkbox",
            //   ...rowSelection,
            // }}
          />
        </div>
      </div>
    </div>
  );
}

export default StudentTasks;
