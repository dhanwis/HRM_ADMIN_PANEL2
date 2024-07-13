import { useState, useEffect } from "react";
import { Table, Typography, Input, DatePicker, Button, Modal, Form, Row, Col, Select } from "antd";
import moment from "moment";
import axios from 'axios';
import internbgg from "../../assets/images/vectorteam5.png"

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

  useEffect(() => {
    // Fetch students from the backend
    axios.get('https://jsonplaceholder.typicode.com/users')  // Replace with your API endpoint for fetching students
      .then(response => {
        setStudents(response.data);
      })
      .catch(error => {
        console.error('Error fetching students:', error);
      });

    // Fetch guides from the backend
    axios.get('https://jsonplaceholder.typicode.com/users')  // Replace with your API endpoint for fetching guides
      .then(response => {
        setGuides(response.data);
      })
      .catch(error => {
        console.error('Error fetching guides:', error);
      });

    // Fetch available time slots from the backend
    axios.get('https://fakestoreapi.com/products')  // Replace with your API endpoint for fetching time slots
      .then(response => {
        setTimeSlots(response.data);
      })
      .catch(error => {
        console.error('Error fetching time slots:', error);
      });
  }, []);

  useEffect(() => {
    // Filter students based on the selected time slot
    if (selectedTimeSlot) {
      const filtered = students.filter(student => student.company.bs === selectedTimeSlot); // Adjust according to your API response structure
      setFilteredStudents(filtered);
    } else {
      setFilteredStudents(students);
    }
  }, [selectedTimeSlot, students]);

  const showModal = () => {
    setIsModalVisible(true);
  };

  function getStudentIdByName(name) {
  const student = students.find(student => student.name === name);
  return student ? student.id : null;
}


// const handleSelectID = (e)=>{
//  setSelectId(e)
// }


  const handleOk = () => {
    form.validateFields().then((values) => {
      const newTask = {
        id: editTaskId !== null ? editTaskId : taskDetails.length + 1,
        studentName: values.studentName,
        taskName: values.taskName,
        taskDetails: values.taskDetails,
        guideName: values.guideName,
        timeSlot: values.timeSlot,
        startDate: moment(values.startDate),
        endDate: moment(values.endDate),
        status: "Pending",
      };

 

axios.post("http://127.0.0.1:8000/hr/studentassign/listcreate/",newTask).then((res)=>{console.log(res.data);})
      
      if (editTaskId !== null) {
        const updatedTaskList = taskDetails.map(task => (task.id === editTaskId ? newTask : task));
        setTaskDetails(updatedTaskList);
      } else {
        setTaskDetails([...taskDetails, newTask]);
      }

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

  const handleDelete = () => {
    const filteredData = taskDetails.filter((item) => !selectedRowKeys.includes(item.id));
    setTaskDetails(filteredData);
    setSelectedRowKeys([]);
  };

  const handleEdit = (record) => {
    setEditTaskId(record.id);
    form.setFieldsValue({
      studentName: record.studentName,
      taskName: record.taskName,
      taskDetails: record.taskDetails,
      guideName: record.guideName,
      timeSlot: record.timeSlot,
      startDate: moment(record.startDate),
      endDate: moment(record.endDate),
    });
    showModal();
  };

  const updateStatus = (record, newStatus) => {
    const updatedTaskList = taskDetails.map(task =>
      task.id === record.id ? { ...task, status: newStatus } : task
    );
    setTaskDetails(updatedTaskList);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: (selectedKeys) => {
      setSelectedRowKeys(selectedKeys);
    },
  };

  const columns = [
    {
      title: "Student Name",
      dataIndex: "studentName",
      key: "studentName",
    },
    {
      title: "Task Name",
      dataIndex: "taskName",
      key: "taskName",
    },
    {
      title: "Task Details",
      dataIndex: "taskDetails",
      key: "taskDetails",
    },
    {
      title: "Guide Name",
      dataIndex: "guideName",
      key: "guideName",
    },
    {
      title: "Time Slot",
      dataIndex: "timeSlot",
      key: "timeSlot",
    },
    {
      title: "Start Date",
      dataIndex: "startDate",
      key: "startDate",
      render: (text) => moment(text).format("YYYY-MM-DD"),
    },
    {
      title: "End Date",
      dataIndex: "endDate",
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
        <Button type="link" onClick={() => handleEdit(record)}>Edit</Button>
      ),
    },
  ];

  return (
    <div style={{backgroundImage:`url(${internbgg})`, height:"800px"}}>
    <div className="task-details" style={{ paddingTop: "50px" }}>
      <Title level={5}>Assign Task</Title>
      <Row justify="space-between" align="middle">
        <Col>
          <Button type="primary" onClick={showModal} style={{ marginBottom: 16 }}>
            Assign Task
          </Button>
        </Col>
        <Col>
          <Button type="danger" onClick={handleDelete} style={{ marginBottom: 16, marginLeft: 16 }}>
            Delete Selected
          </Button>
        </Col>
      </Row>
      <Modal title={editTaskId !== null ? "Edit Task" : "Add Task"} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <Form form={form} layout="vertical">
          <Form.Item 
            name="timeSlot" 
            label="Time Slot" 
            rules={[{ required: true, message: "Please select a time slot" }]}
          >
            <Select onChange={value => setSelectedTimeSlot(value)}>
              {timeSlots.map(slot => (
                <Option key={slot.id} value={slot.title}>{slot.title}</Option> // Adjust according to your API response structure
              ))}
            </Select>
          </Form.Item>
          <Form.Item 
            name="studentName" 
            label="Student Name" 
            rules={[{ required: true, message: "Please select student name" }]}
          >
            <Select>
              {filteredStudents.map(student => (
                <Option key={student.id} value={student.name}>{student.name}</Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item 
            name="taskName" 
            label="Task Name" 
            rules={[{ required: true, message: "Please enter task name" }, { min: 3, message: "Task name must be at least 3 characters" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item 
            name="taskDetails" 
            label="Task Details" 
            rules={[{ required: true, message: "Please enter task details" }, { min: 8, message: "Task details must be at least 8 characters" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item 
            name="guideName" 
            label="Guide Name" 
            rules={[{ required: true, message: "Please select guide name" }]}
          >
            <Select>
              {guides.map(guide => (
                <Option key={guide.id} value={guide.name}>{guide.name}</Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item 
            name="startDate" 
            label="Start Date" 
            rules={[{ required: true, message: "Please select start date" }, { validator: (rule, value) => value && value.isBefore(moment(), 'day') ? Promise.reject('Start date must be today or later') : Promise.resolve() }]}
          >
            <DatePicker />
          </Form.Item>
          <Form.Item 
            name="endDate" 
            label="End Date" 
            rules={[{ required: true, message: "Please select end date" }, { validator: (rule, value) => value && value.isBefore(moment(), 'day') ? Promise.reject('End date must be today or later') : Promise.resolve() }]}
          >
            <DatePicker />
          </Form.Item>
        </Form>
      </Modal>
      <div style={{ overflowX: 'auto' }}>
        <Table
          dataSource={taskDetails}
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

export default StudentTasks;
