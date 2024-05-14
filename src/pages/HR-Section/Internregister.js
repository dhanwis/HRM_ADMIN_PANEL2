// import React, { useState } from "react";
// import { Form, Input, Button, DatePicker, Row, Col, Radio, Upload } from "antd";
// import { UploadOutlined } from '@ant-design/icons';


// const InternRegistrationForm = () => {
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
//       layout="vertical"
//       onFinish={onFinish}
//       onFinishFailed={onFinishFailed}
//     >
//       {/* Personal Information Section */}
//       <h2 style={{marginTop:'20px'}}>Personal Information</h2>
//       <Row gutter={16}>
//         <Col span={12}>
//           <Form.Item
//             label="Full Name"
//             name="fullName"
//             rules={[
//               { required: true, message: "Please enter full name" },
//               { validator: validateName }
//             ]}
//           >
//             <Input placeholder="Full Name" />
//           </Form.Item>
//         </Col>

//       </Row>

//       <Row gutter={16}>
//       <Col span={12}>
//   <Form.Item
//     label="Username"
//     name="username"
//     rules={[
//       { required: true, message: "Please enter username" },
//       {
//         pattern: /^[a-zA-Z0-9_]+$/,
//         message: "Username can only contain letters, numbers, and underscores",
//       },
//     ]}
//   >
//     <Input placeholder="Username" />
//   </Form.Item>
// </Col>
// <Col span={12}>
//   <Form.Item
//     label="Password"
//     name="password"
//     rules={[
//       { required: true, message: "Please enter password" },
//       {
//         pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
//         message: "Password must be at least 6 characters long and contain at least one lowercase letter, one uppercase letter, and one number and one special character",
//       },
//     ]}
//   >
//     <Input.Password placeholder="Password" />
//   </Form.Item>
// </Col>




//       </Row>
//       <Row gutter={16}>
//         <Col span={12}>
//           <Form.Item
//             label="Email"
//             name="email"
//             rules={[
//               { required: true, message: "Please enter email" },
//               { type: "email", message: "Please enter a valid email" },
//             ]}
//           >
//             <Input placeholder="Email" />
//           </Form.Item>
//         </Col>
//         <Col span={12}>
//           <Form.Item
//             label="Phone Number"
//             name="phoneNumber"
//             rules={[
//               { required: true, message: "Please enter phone number" },
//               {
//                 pattern: /^[0-9]{10}$/,
//                 message: "Please enter a valid phone number",
//               },
//             ]}
//           >
//             <Input placeholder="Phone Number" />
//           </Form.Item>
//         </Col>
//       </Row>
//       <Row gutter={16}>
//         <Col span={12}>
//           <Form.Item
//             label="Date of Birth"
//             name="dob"
//             rules={[
//               { required: true, message: "Please select date of birth" },
//             ]}
//           >
//             <DatePicker style={{ width: "100%" }} />
//           </Form.Item>
//         </Col>
//       </Row>
      
//       {/* Education Information Section */}
//       <h2>Education Information</h2>
//       <Row gutter={16}>
//         <Col span={24}>
//           <Form.Item
//             label="University"
//             name="university"
//             rules={[
//               { required: true, message: "Please enter university name" },
//             ]}
//           >
//             <Input placeholder="University" />
//           </Form.Item>
//         </Col>
//       </Row>
//       <Row gutter={16}>
//         <Col span={24}>
//           <Form.Item
//             label="Degree Program"
//             name="degreeProgram"
//             rules={[
//               { required: true, message: "Please enter degree program" },
//             ]}
//           >
//             <Input placeholder="Degree Program" />
//           </Form.Item>
//         </Col>
//       </Row>
      
//       {/* Internship Information Section */}
//       <h2>Internship Information</h2>
//       <Row gutter={16}>
//         <Col span={24}>
//           <Form.Item
//             label="Internship Position"
//             name="position"
//             rules={[
//               { required: true, message: "Please enter internship position" },
//             ]}
//           >
//             <Input placeholder="Internship Position" />
//           </Form.Item>
//         </Col>
//       </Row>
//       <Row gutter={16}>
//         <Col span={12}>
//           <Form.Item
//             label="Start Date"
//             name="startDate"
//             rules={[
//               { required: true, message: "Please select start date" },
//             ]}
//           >
//             <DatePicker style={{ width: "100%" }} />
//           </Form.Item>
//         </Col>
//         <Col span={12}>
//           <Form.Item
//             label="End Date"
//             name="endDate"
//             rules={[
//               { required: true, message: "Please select end date" },
//             ]}
//           >
//             <DatePicker style={{ width: "100%" }} />
//           </Form.Item>
//         </Col>
//       </Row>
      
//       {/* Internship Type Section */}
    
//       <Row gutter={16}>
//         <Col span={24}>
//           <Form.Item
//             name="type"
//             label="Internship Type"
//             rules={[{ required: true, message: "Please select internship type" }]}
//           >
//             <Radio.Group onChange={handleInternshipTypeChange}>
//               <Radio value="paid">Paid</Radio>
//               <Radio value="unpaid">Unpaid</Radio>
//               <Radio value="stipend">Stipend</Radio>
//             </Radio.Group>
//           </Form.Item>
//         </Col>
//       </Row>
      
//       {/* Amount Field (Display conditionally based on selected type) */}
//       {internshipType === "paid" || internshipType === "stipend" ? (
//         <Row gutter={16}>
//           <Col span={24}>
//             <Form.Item
//               label={internshipType === "paid" ? "Amount (Paid)" : "Amount (Stipend)"}
//               name="amount"
//               rules={[
//                 { required: true, message: "Please enter the amount" },
//                 { pattern: /^[0-9]+(\.[0-9]{1,2})?$/, message: "Please enter a valid amount" },
//               ]}
//             >
//               <Input placeholder="Amount" />
//             </Form.Item>
//           </Col>
//         </Row>
//       ) : null}
//       {/* Photo Upload Section */}
//       <h2>Upload Photo</h2>
//       <Row gutter={16}>
//         <Col span={24}>
//           <Form.Item
//             name="photo"
//             label="Photo"
//             valuePropName="fileList"
//             getValueFromEvent={(e) => e && e.fileList}
//           >
//             <Upload
//               name="photo"
//               listType="picture-card"
//               maxCount={1}
//               beforeUpload={() => false}
//             >
//               <Button icon={<UploadOutlined />}>Click to upload</Button>
//             </Upload>
//           </Form.Item>
//         </Col>
//       </Row>

      
//       <Form.Item>
//         <Button type="primary" htmlType="submit">
//           Register
//         </Button>
//       </Form.Item>
//     </Form>
//   );
// };

// export default InternRegistrationForm;




// import React, { useState } from "react";
// import { Form, Input, Button, DatePicker, Row, Col, Radio, Upload } from "antd";
// import { UploadOutlined } from '@ant-design/icons';


// const InternRegistrationForm = () => {
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
//       layout="vertical"
//       onFinish={onFinish}
//       onFinishFailed={onFinishFailed}
//     >
//       {/* Personal Information Section */}
//       <h2>Personal Information</h2>
//       <Row gutter={16}>
//         <Col span={12}>
//           <Form.Item
//             label="Full Name"
//             name="fullName"
//             rules={[
//               { required: true, message: "Please enter full name" },
//               { validator: validateName }
//             ]}
//           >
//             <Input placeholder="Full Name" />
//           </Form.Item>
//         </Col>


//         <Col span={12}>
//           <Form.Item
//             label="Photo"
//             name="photo"
//             rules={[{ required: true, message: "Please upload your photo" }]}
//           >
//             <Upload maxCount={1}>
//               <Button icon={<UploadOutlined />}>Upload Photo</Button>
//             </Upload>
//           </Form.Item>
//         </Col>







  
//       </Row>
//       <Row gutter={16}>
//         <Col span={12}>
//           <Form.Item
//             label="Email"
//             name="email"
//             rules={[
//               { required: true, message: "Please enter email" },
//               { type: "email", message: "Please enter a valid email" },
//             ]}
//           >
//             <Input placeholder="Email" />
//           </Form.Item>
//         </Col>
//         <Col span={12}>
//           <Form.Item
//             label="Phone Number"
//             name="phoneNumber"
//             rules={[
//               { required: true, message: "Please enter phone number" },
//               {
//                 pattern: /^[0-9]{10}$/,
//                 message: "Please enter a valid phone number",
//               },
//             ]}
//           >
//             <Input placeholder="Phone Number" />
//           </Form.Item>
//         </Col>
//       </Row>
//       <Row gutter={16}>
//         <Col span={12}>
//           <Form.Item
//             label="Date of Birth"
//             name="dob"
//             rules={[
//               { required: true, message: "Please select date of birth" },
//             ]}
//           >
//             <DatePicker style={{ width: "100%" }} />
//           </Form.Item>
//         </Col>
//       </Row>intern
      
//       {/* Education Information Section */}
//       <h2>Education Information</h2>
//       <Row gutter={16}>
//         <Col span={24}>
//           <Form.Item
//             label="University"
//             name="university"
//             rules={[
//               { required: true, message: "Please enter university name" },
//             ]}
//           >
//             <Input placeholder="University" />
//           </Form.Item>
//         </Col>
//       </Row>
//       <Row gutter={16}>
//         <Col span={24}>
//           <Form.Item
//             label="Degree Program"
//             name="degreeProgram"
//             rules={[
//               { required: true, message: "Please enter degree program" },
//             ]}
//           >
//             <Input placeholder="Degree Program" />
//           </Form.Item>
//         </Col>
//       </Row>
      
//       {/* Internship Information Section */}
//       <h2>Internship Information</h2>
//       <Row gutter={16}>
//         <Col span={24}>
//           <Form.Item
//             label="Internship Position"
//             name="position"
//             rules={[
//               { required: true, message: "Please enter internship position" },
//             ]}
//           >
//             <Input placeholder="Internship Position" />
//           </Form.Item>
//         </Col>
//       </Row>
//       <Row gutter={16}>
//         <Col span={12}>
//           <Form.Item
//             label="Start Date"
//             name="startDate"
//             rules={[
//               { required: true, message: "Please select start date" },
//             ]}
//           >
//             <DatePicker style={{ width: "100%" }} />
//           </Form.Item>
//         </Col>
//         <Col span={12}>
//           <Form.Item
//             label="End Date"
//             name="endDate"
//             rules={[
//               { required: true, message: "Please select end date" },
//             ]}
//           >
//             <DatePicker style={{ width: "100%" }} />
//           </Form.Item>
//         </Col>
//       </Row>
      
//       {/* Internship Type Section */}
    
//       <Row gutter={16}>
//         <Col span={24}>
//           <Form.Item
//             name="type"
//             label="Internship Type"
//             rules={[{ required: true, message: "Please select internship type" }]}
//           >
//             <Radio.Group onChange={handleInternshipTypeChange}>
//               <Radio value="paid">Paid</Radio>
//               <Radio value="unpaid">Unpaid</Radio>
//               <Radio value="stipend">Stipend</Radio>
//             </Radio.Group>
//           </Form.Item>
//         </Col>
//       </Row>
      
//       {/* Amount Field (Display conditionally based on selected type) */}
//       {internshipType === "paid" || internshipType === "stipend" ? (
//         <Row gutter={16}>
//           <Col span={24}>
//             <Form.Item
//               label={internshipType === "paid" ? "Amount (Paid)" : "Amount (Stipend)"}
//               name="amount"
//               rules={[
//                 { required: true, message: "Please enter the amount" },
//                 { pattern: /^[0-9]+(\.[0-9]{1,2})?$/, message: "Please enter a valid amount" },
//               ]}
//             >
//               <Input placeholder="Amount" />
//             </Form.Item>
//           </Col>
//         </Row>
//       ) : null}
      
//       <Form.Item>
//         <Button type="primary" htmlType="submit">
//           Register
//         </Button>
//       </Form.Item>
//     </Form>
//   );
// };

// export default InternRegistrationForm;





import React, { useState, useEffect } from "react";
import { Form, Input, Button, DatePicker, Table, Popconfirm, Radio, Row, Col, Upload } from "antd";
import { UploadOutlined } from '@ant-design/icons';
import moment from 'moment';

const InternRegistrationForm = () => {
  const [form] = Form.useForm();
  const [submittedData, setSubmittedData] = useState([]);
  const [internshipType, setInternshipType] = useState(null);
  const [editingKey, setEditingKey] = useState(null);

  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("submittedData")) || [];
    // Convert date strings back to moment objects
    savedData.forEach(item => {
      if (item.dob) {
        item.dob = moment(item.dob, 'YYYY-MM-DD');
      }
      if (item.startDate) {
        item.startDate = moment(item.startDate, 'YYYY-MM-DD');
      }
      if (item.endDate) {
        item.endDate = moment(item.endDate, 'YYYY-MM-DD');
      }
    });
    setSubmittedData(savedData);
  }, []);

  const onFinish = (values) => {
    const key = Date.now();
    const newData = {
      ...values,
      key,
      dob: moment(values.dob).format('YYYY-MM-DD'), // Convert to the desired format
      startDate: moment(values.startDate).format('YYYY-MM-DD'), // Convert to the desired format
      endDate: moment(values.endDate).format('YYYY-MM-DD'), // Convert to the desired format
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

  // const edit = (key) => {
  //   setEditingKey(key);
  //   const recordToEdit = submittedData.find((record) => record.key === key);
  //   form.setFieldsValue(recordToEdit);
  // };

  const edit = (key) => {
    setEditingKey(key);
    const recordToEdit = submittedData.find((record) => record.key === key);
    
    // Convert date strings to moment objects before setting form fields
    const initialValues = { ...recordToEdit };
    initialValues.dob = moment(recordToEdit.dob);
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
        newData[index].dob = moment(newData[index].dob);
        newData[index].startDate = moment(newData[index].startDate);
        newData[index].endDate = moment(newData[index].endDate);
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

  const validateName = (_, value) => {
    if (!value || /^[a-zA-Z\s]*$/.test(value)) {
      return Promise.resolve();
    }
    return Promise.reject(new Error("Please enter only letters"));
  };

  const handleInternshipTypeChange = (e) => {
    setInternshipType(e.target.value);
  };

  const columns = [
    { title: 'Full Name', dataIndex: 'fullName', key: 'fullName' },
    { title: 'Email', dataIndex: 'email', key: 'email' },
    { title: 'Phone Number', dataIndex: 'phoneNumber', key: 'phoneNumber' },
    { title: 'Username', dataIndex: 'username', key: 'username' },
    { title: 'Password', dataIndex: 'password', key: 'password' },
    { title: 'Date of birth', dataIndex: 'dob', key: 'dob', render: date => moment(date).format('YYYY-MM-DD') },
    { title: 'University', dataIndex: 'university', key: 'university' },
    { title: 'Degree Program', dataIndex: 'degreeProgram', key: 'degreeProgram' },
    { title: 'Internship Position', dataIndex: 'position', key: 'position' },
    { title: 'Start Date', dataIndex: 'startDate', key: 'startDate', render: date => moment(date).format('YYYY-MM-DD') },
    { title: 'End Date', dataIndex: 'endDate', key: 'endDate', render: date => moment(date).format('YYYY-MM-DD') },
    { title: 'Internship Type', dataIndex: 'type', key: 'type' },
    { title: 'Amount', dataIndex: 'amount', key: 'amount' },
    {
      title: 'Actions',
      dataIndex: 'actions',
      key: 'actions',
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Button type="link" onClick={() => save(record.key)} style={{ marginRight: 8 }}>
              Save
            </Button>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <Button type="link">Cancel</Button>
            </Popconfirm>
          </span>
        ) : (
          <span>
            <Button type="link" disabled={editingKey !== null} onClick={() => edit(record.key)}>
              Edit
            </Button>
            <Popconfirm title="Sure to delete?" onConfirm={() => deleteRecord(record.key)}>
              <Button type="link">Delete</Button>
            </Popconfirm>
          </span>
        );
      },
    },
  ];

  const isEditing = (record) => record.key === editingKey;

  return (
    <div style={{marginTop:'40px'}}>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        {/* Form fields */}
        <h2>INTERN REGISTRATION</h2>
        <Row gutter={16} style={{marginTop:'20PX'}}>
          <Col span={12}>
            <Form.Item
              label="Full Name"
              name="fullName"
              rules={[
                { required: true, message: "Please enter full name" },
                { validator: validateName }
              ]}
            >
              <Input placeholder="Full Name" />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="Photo"
              name="photo"
              rules={[{ required: true, message: "Please upload your photo" }]}
            >
              <Upload maxCount={1}>
                <Button icon={<UploadOutlined />}>Upload Photo</Button>
              </Upload>
            </Form.Item>
          </Col>
        </Row>
        {/* Other form fields */}
        {/* Your form fields */}

        <Row gutter={16}>
      <Col span={12}>
  <Form.Item
    label="Username"
    name="username"
    rules={[
      { required: true, message: "Please enter username" },
      {
        pattern: /^[a-zA-Z0-9_]+$/,
        message: "Username can only contain letters, numbers, and underscores",
      },
    ]}
  >
    <Input placeholder="Username" />
  </Form.Item>
</Col>
<Col span={12}>
  <Form.Item
    label="Password"
    name="password"
    rules={[
      { required: true, message: "Please enter password" },
      {
        pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
        message: "Password must be at least 6 characters long and contain at least one lowercase letter, one uppercase letter, and one number and one special character",
      },
    ]}
  >
    <Input.Password placeholder="Password" />
  </Form.Item>
</Col>
      </Row>

        <Row gutter={16}>
         <Col span={12}>
           <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please enter email" },
              { type: "email", message: "Please enter a valid email" },
            ]}
          >
            <Input placeholder="Email" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="Phone Number"
            name="phoneNumber"
            rules={[
              { required: true, message: "Please enter phone number" },
              {
                pattern: /^[0-9]{10}$/,
                message: "Please enter a valid phone number",
              },
            ]}
          >
            <Input placeholder="Phone Number" />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>  
        <Form.Item label="dob" name="dob" rules={[{ required: true, message: "Please select date of birth" }]}>
          <DatePicker style={{ width: "100%" }} />
        </Form.Item>



        </Col>
      </Row>
      
      {/* Education Information Section */}
      <Row gutter={16}>
        <Col span={24}>
          <Form.Item
            label="University"
            name="university"
            rules={[
              { required: true, message: "Please enter university name" },
            ]}
          >
            <Input placeholder="University" />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={24}>
          <Form.Item
            label="Degree Program"
            name="degreeProgram"
            rules={[
              { required: true, message: "Please enter degree program" },
            ]}
          >
            <Input placeholder="Degree Program" />
          </Form.Item>
        </Col>
      </Row>
      
      {/* Internship Information Section */}
      <Row gutter={16}>
        <Col span={24}>
          <Form.Item
            label="Internship Position"
            name="position"
            rules={[
              { required: true, message: "Please enter internship position" },
            ]}
          >
            <Input placeholder="Internship Position" />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          {/* <Form.Item
            label="Start Date"
            name="startDate"
            rules={[
              { required: true, message: "Please select start date" },
            ]}
          >
            <DatePicker style={{ width: "100%" }} />
          </Form.Item> */}

          
        <Form.Item label="Start Date" name="startDate" rules={[{ required: true, message: "Please select start date" }]}>
          <DatePicker style={{ width: "100%" }} />
        </Form.Item>
        </Col>
        <Col span={12}>
          {/* <Form.Item
            label="End Date"
            name="endDate"
            rules={[
              { required: true, message: "Please select end date" },
            ]}
          >
            <DatePicker style={{ width: "100%" }} />
          </Form.Item> */}


        <Form.Item label="End Date" name="endDate" rules={[{ required: true, message: "Please select end date" }]}>
          <DatePicker style={{ width: "100%" }} />
        </Form.Item>
        </Col>
      </Row>
      
      {/* Internship Type Section */}
    
      <Row gutter={16}>
        <Col span={24}>
          <Form.Item
            name="type"
            label="Internship Type"
            rules={[{ required: true, message: "Please select internship type" }]}
          >
            <Radio.Group onChange={handleInternshipTypeChange}>
              <Radio value="paid">Paid</Radio>
              <Radio value="unpaid">Unpaid</Radio>
              <Radio value="stipend">Stipend</Radio>
            </Radio.Group>
          </Form.Item>
        </Col>
      </Row>
      
      {/* Amount Field (Display conditionally based on selected type) */}
      {internshipType === "paid" || internshipType === "stipend" ? (
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              label={internshipType === "paid" ? "Amount (Paid)" : "Amount (Stipend)"}
              name="amount"
              rules={[
                { required: true, message: "Please enter the amount" },
                { pattern: /^[0-9]+(\.[0-9]{1,2})?$/, message: "Please enter a valid amount" },
              ]}
            >
              <Input placeholder="Amount" />
            </Form.Item>
          </Col>
        </Row>
      ) : null}

        <Button type="primary" htmlType="submit">
          Register
        </Button>
      </Form>
      <div>
        <h2>Submitted Data</h2>
        <Table dataSource={submittedData} columns={columns} scroll={{ x: true }} />
      </div>
    </div>
  );
};

export default InternRegistrationForm;
