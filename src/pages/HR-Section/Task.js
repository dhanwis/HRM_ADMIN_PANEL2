
// import React, { useState } from "react";
// import { Form, Input, Button, DatePicker, Radio } from "antd";

// const Taskform = () => {
//   const [form] = Form.useForm();
//   const [internshipType, setInternshipType] = useState(null);

//   const onFinish = (values) => {
//     console.log("Success:", values);
//   };

//   const onFinishFailed = (errorInfo) => {
//     console.log("Failed:", errorInfo);
//   };

//   const validateName = (_, value) => {
//     if (!value || /^[a-zA-Z\s]*$/.test(value)) {
//       return Promise.resolve();
//     }
//     return Promise.reject(new Error("Please enter only letters"));
//   };

//   const handleInternshipTypeChange = (e) => {
//     setInternshipType(e.target.value);
//   };

//   return (
//     <Form
//       form={form}
//       layout="vertical"
//       onFinish={onFinish}
//       onFinishFailed={onFinishFailed}
//     >
//       <h2>Task Information</h2>
//       <Form.Item
//         label="ID"
//         name="id"
//         rules={[
//           { required: true, message: "Please enter ID" },
//         ]}
//         style={{ width: '50%' }} 
//       >
//         <Input placeholder="ID" />
//       </Form.Item>
//       <Form.Item
//         label="Task Title"
//         name="taskTitle"
//         rules={[
//           { required: true, message: "Please enter task title" },
//         ]}
//         style={{ width: '50%' }} 
//       >
//         <Input placeholder="Task Title" />
//       </Form.Item>
//       <Form.Item
//         label="Start Date"
//         name="startDate"
//         rules={[
//           { required: true, message: "Please select start date" },
//         ]}
//         style={{ width: '50%' }} 
//       >
//         <DatePicker style={{ width: "100%" }} />
//       </Form.Item>
//       <Form.Item
//         label="End Date"
//         name="endDate"
//         rules={[
//           { required: true, message: "Please select end date" },
//         ]}
//         style={{ width: '50%' }} 
//       >
//         <DatePicker style={{ width: "100%" }} />
//       </Form.Item>
//       <Form.Item
//         label="Task Description"
//         name="taskDescription"
//         rules={[
//           { required: true, message: "Please enter task description" },
//         ]}
//         style={{ width: '50%' }} 
//       >
//         <Input.TextArea placeholder="Task Description" />
//       </Form.Item>
// <div style={{display:'flex',gap:'30px'}}>
//       <Form.Item>
//         <Button type="primary" htmlType="submit">
//           Submit
//         </Button>
//       </Form.Item>

//       <Form.Item>
//         <Button type="primary" htmlType="submit">
//           Edit
//         </Button>
//       </Form.Item>

//       <Form.Item>
//         <Button type="primary" htmlType="submit">
//          Delete
//         </Button>
//       </Form.Item>
//       </div>
//     </Form>
//   );
// };

// export default Taskform;



// import React, { useState } from "react";
// import { Form, Input, Button, DatePicker, Table, Popconfirm } from "antd";

// const Taskform = () => {
//   const [form] = Form.useForm();
//   const [submittedData, setSubmittedData] = useState([]);
//   const [editingKey, setEditingKey] = useState("");

//   const columns = [
//     {
//       title: 'ID',
//       dataIndex: 'id',
//       key: 'id',
//     },
//     {
//       title: 'Task Title',
//       dataIndex: 'taskTitle',
//       key: 'taskTitle',
//     },
//     {
//       title: 'Start Date',
//       dataIndex: 'startDate',
//       key: 'startDate',
//       render: (text, record) => {
//         return <span>{record.startDate.format("YYYY-MM-DD")}</span>;
//       }
//     },
//     {
//       title: 'End Date',
//       dataIndex: 'endDate',
//       key: 'endDate',
//       render: (text, record) => {
//         return <span>{record.endDate.format("YYYY-MM-DD")}</span>;
//       }
//     },
//     {
//       title: 'Task Description',
//       dataIndex: 'taskDescription',
//       key: 'taskDescription',
//     },
//     {
//       title: 'Actions',
//       dataIndex: 'actions',
//       key: 'actions',
//       render: (_, record) => {
//         const editable = isEditing(record);
//         return editable ? (
//           <span>
//             <Button type="primary" onClick={() => save(record.key)} style={{ marginRight: 8 }}>Save</Button>
//             <Button onClick={cancel}>Cancel</Button>
//           </span>
//         ) : (
//           <span>
//             <Button type="link" disabled={editingKey !== ""} onClick={() => edit(record.key)}>Edit</Button>
//             <Popconfirm title="Sure to delete?" onConfirm={() => deleteTask(record.key)}>
//               <Button type="link" disabled={editingKey !== ""}>Delete</Button>
//             </Popconfirm>
//           </span>
//         );
//       },
//     },
//   ];

//   const isEditing = (record) => record.key === editingKey;

//   const edit = (key) => {
//     setEditingKey(key);
//     const taskToEdit = submittedData.find(task => task.key === key);
//     form.setFieldsValue(taskToEdit);
//   };

//   const cancel = () => {
//     setEditingKey("");
//     form.resetFields();
//   };

//   const save = async (key) => {
//     try {
//       const row = await form.validateFields();
//       const newData = [...submittedData];
//       const index = newData.findIndex((item) => key === item.key);

//       if (index > -1) {
//         newData[index] = { ...newData[index], ...row };
//         setSubmittedData(newData);
//         setEditingKey("");
//       } else {
//         newData.push(row);
//         setSubmittedData(newData);
//         setEditingKey("");
//       }
//     } catch (errInfo) {
//       console.log('Validate Failed:', errInfo);
//     }
//   };

//   const deleteTask = (key) => {
//     const newData = submittedData.filter((item) => item.key !== key);
//     setSubmittedData(newData);
//   };

//   const onFinish = (values) => {
//     const key = Date.now(); // Generate a unique key for each task
//     const newData = [...submittedData, { ...values, key }];
//     setSubmittedData(newData);
//     form.resetFields();
//   };

//   const onFinishFailed = (errorInfo) => {
//     console.log("Failed:", errorInfo);
//   };

//   return (
//     <div>
//       <Form
//         form={form}
//         layout="vertical"
//         onFinish={onFinish}
//         onFinishFailed={onFinishFailed}
//       >
//         <h2>Task Information</h2>
//         <Form.Item label="ID" name="id" rules={[{ required: true, message: "Please enter ID" }]}>
//           <Input placeholder="ID" />
//         </Form.Item>
//         <Form.Item label="Task Title" name="taskTitle" rules={[{ required: true, message: "Please enter task title" }]}>
//           <Input placeholder="Task Title" />
//         </Form.Item>
//         <Form.Item label="Start Date" name="startDate" rules={[{ required: true, message: "Please select start date" }]}>
//           <DatePicker style={{ width: "100%" }} />
//         </Form.Item>
//         <Form.Item label="End Date" name="endDate" rules={[{ required: true, message: "Please select end date" }]}>
//           <DatePicker style={{ width: "100%" }} />
//         </Form.Item>
//         <Form.Item label="Task Description" name="taskDescription" rules={[{ required: true, message: "Please enter task description" }]}>
//           <Input.TextArea placeholder="Task Description" />
//         </Form.Item>
//         <Form.Item>
//           <Button type="primary" htmlType="submit">Submit</Button>
//         </Form.Item>
//       </Form>
//       <div>
//         <h2>Submitted Tasks</h2>
//         <Table dataSource={submittedData.map((item, index) => ({ ...item, key: index }))} columns={columns} />
//       </div>
//     </div>
//   );
// };

// export default Taskform;







import React, { useState, useEffect } from "react";
import { Form, Input, Button, DatePicker, Select, Table, Popconfirm, InputNumber } from "antd";
import moment from "moment";
const { Option } = Select;

const Taskform = () => {
  const [form] = Form.useForm();
  const [submittedData, setSubmittedData] = useState([]);
  const [editingKey, setEditingKey] = useState(null);

  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("submittedData")) || [];
    setSubmittedData(savedData);
  }, []);

  // const onFinish = (values) => {
  //   const key = Date.now(); 
  //   const newData = [...submittedData, { ...values, key }];
  //   setSubmittedData(newData);
  //   form.resetFields();
  //   localStorage.setItem("submittedData", JSON.stringify(newData));
  // };

  // const onFinish = (values) => {
  //   const key = Date.now();
  //   const newData = {
  //     ...values,
  //     key,
  //     startDate: values.startDate.format("YYYY-MM-DD"), // Convert moment object to string
  //     endDate: values.endDate.format("YYYY-MM-DD") // Convert moment object to string
  //   };
  //   setSubmittedData([...submittedData, newData]);
  //   form.resetFields();
  //   localStorage.setItem("submittedData", JSON.stringify([...submittedData, newData]));
  // };


  const onFinish = (values) => {
    const key = Date.now();
    const newData = {
      ...values,
      key,
      startDate: moment(values.startDate), // Convert to moment object
      endDate: moment(values.endDate),     // Convert to moment object
    };
    setSubmittedData([...submittedData, newData]);
    form.resetFields();
    localStorage.setItem("submittedData", JSON.stringify([...submittedData, newData]));
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
    form.setFieldsValue(recordToEdit);
  };

  const save = async (key) => {
    try {
      const row = await form.validateFields();
      const newData = [...submittedData];
      const index = newData.findIndex((item) => key === item.key);

      if (index > -1) {
        newData[index] = { ...newData[index], ...row };
        setSubmittedData(newData);
        setEditingKey(null);
        localStorage.setItem("submittedData", JSON.stringify(newData));
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };

  const cancel = () => {
    setEditingKey(null);
    form.resetFields();
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Task Title',
      dataIndex: 'taskTitle',
      key: 'taskTitle',
    },
    {
      title: 'Start Date',
      dataIndex: 'startDate',
      key: 'startDate',
      render: (text, record) => {
        return <span>{moment(record.startDate).format("YYYY-MM-DD")}</span>;
      }
    },
    {
      title: 'End Date',
      dataIndex: 'endDate',
      key: 'endDate',
      render: (text, record) => {
        return <span>{moment(record.endDate).format("YYYY-MM-DD")}</span>;
      }
    },
    {
      title: 'Task Description',
      dataIndex: 'taskDescription',
      key: 'taskDescription',
    },

  
    // Add more columns as needed
    {
      title: 'Actions',
      dataIndex: 'actions',
      key: 'actions',
      render: (_, record) => {
        const editable = record.key === editingKey;
        return editable ? (
          <span>
            <Button type="primary" onClick={() => save(record.key)} style={{ marginRight: 8 }}>Save</Button>
            <Button onClick={cancel}>Cancel</Button>
          </span>
        ) : (
          <span>
            <Button type="link" onClick={() => edit(record.key)}>Edit</Button>
            <Popconfirm title="Sure to delete?" onConfirm={() => deleteRecord(record.key)}>
              <Button type="link">Delete</Button>
            </Popconfirm>
          </span>
        );
      },
    },
  ];

  return (
    <div>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        {/* Form fields */}
        <h2>Task Information</h2>
        <Form.Item label="ID" name="id" rules={[{ required: true, message: "Please enter ID" }]}>
          <Input placeholder="ID" />
        </Form.Item>
        <Form.Item label="Task Title" name="taskTitle" rules={[{ required: true, message: "Please enter task title" }]}>
          <Input placeholder="Task Title" />
        </Form.Item>
        <Form.Item label="Start Date" name="startDate" rules={[{ required: true, message: "Please select start date" }]}>
          <DatePicker style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item label="End Date" name="endDate" rules={[{ required: true, message: "Please select end date" }]}>
          <DatePicker style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item label="Task Description" name="taskDescription" rules={[{ required: true, message: "Please enter task description" }]}>
          <Input.TextArea placeholder="Task Description" />
        </Form.Item>

        {/* Add more form items as needed */}

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
      <div>
        <h2>Submitted Team lead task Information</h2>
        <Table dataSource={submittedData} columns={columns} />
      </div>
     </div>
  );
};


export default Taskform;
