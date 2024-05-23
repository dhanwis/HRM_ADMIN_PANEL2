import { useState, useEffect } from "react";
import { Table, Typography, Input, DatePicker, Button, Modal, Form, Row, Col, Select } from "antd";
import moment from "moment";

const { Title } = Typography;
const { Option } = Select;

function StudentTasks() {
  const [taskDetails, setTaskDetails] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [students] = useState([
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Smith' }
  ]);
  const [guides] = useState([
    { id: 1, name: 'Dr. Brown' },
    { id: 2, name: 'Prof. Green' }
  ]);
  const [editTaskId, setEditTaskId] = useState(null); // Track the id of the task being edited
  const [form] = Form.useForm();

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    form.validateFields().then((values) => {
      const updatedTask = {
        id: editTaskId,
        studentName: values.studentName,
        taskName: values.taskName,
        taskDetails: values.taskDetails,
        guideName: values.guideName,
        startDate: moment(values.startDate),
        endDate: moment(values.endDate),
      };
      if (editTaskId !== null) {
        // If an edit is being performed, update the task
        const updatedTaskList = taskDetails.map(task => (task.id === editTaskId ? updatedTask : task));
        setTaskDetails(updatedTaskList);
      } else {
        // Otherwise, add a new task
        setTaskDetails([...taskDetails, updatedTask]);
      }
      setIsModalVisible(false);
      setEditTaskId(null); // Reset the editTaskId after editing
      form.resetFields();
    });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setEditTaskId(null); // Reset the editTaskId if editing is canceled
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
      startDate: moment(record.startDate),
      endDate: moment(record.endDate),
    });
    showModal();
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
      title: "Start Date",
      dataIndex: "startDate",
      key: "startDate",
      render: (text, record) => moment(text).format("LL"),
    },
    {
      title: "End Date",
      dataIndex: "endDate",
      key: "endDate",
      render: (text, record) => moment(text).format("LL"),
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
          <Form.Item name="studentName" label="Student Name" rules={[{ required: true, message: "Please select student name" }]}>
            <Select>
              {students.map(student => (
                <Option key={student.id} value={student.name}>{student.name}</Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="taskName" label="Task Name" rules={[{ required: true, message: "Please enter task name" }]}>
            <Input />
          </Form.Item>
          <Form.Item name="taskDetails" label="Task Details" rules={[{ required: true, message: "Please enter task details" }]}>
            <Input />
          </Form.Item>
          <Form.Item name="guideName" label="Guide Name" rules={[{ required: true, message: "Please select guide name" }]}>
            <Select>
              {guides.map(guide => (
                <Option key={guide.id} value={guide.name}>{guide.name}</Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="startDate" label="Start Date" rules={[{ required: true, message: "Please select start date" }]}>
            <DatePicker />
          </Form.Item>
          <Form.Item name="endDate" label="End Date" rules={[{ required: true, message: "Please select end date" }]}>
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
  );
}

export default StudentTasks;

