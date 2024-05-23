import React, { useState, useEffect } from "react";
import { Form, Input, Button, DatePicker, Select, Table, Popconfirm, InputNumber,Row,Col,Upload } from "antd";
import moment from "moment";
import { UploadOutlined } from '@ant-design/icons';
import axios from 'axios';




const { Option } = Select;


const StaffRegistrationForm = () => {
  const [form] = Form.useForm();
  const [submittedData, setSubmittedData] = useState([]);
  const [editingKey, setEditingKey] = useState(null);

//   useEffect(() => {
// ;    const savedData = JSON.parse(localStorage.getItem("submittedData")) || [];
//     setSubmittedData(savedData);
//   }, []);


useEffect(() => {
  const savedData = JSON.parse(localStorage.getItem("submittedData")) || [];
  // Convert date strings back to moment objects
  savedData.forEach(item => {
    if (item.dob) {
      item.dob = moment(item.dob, 'YYYY-MM-DD');
    }
    if (item.joinDate) {
      item.joinDate = moment(item.joinDate, 'YYYY-MM-DD');
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
      joinDate: moment(values.joinDate).format('YYYY-MM-DD'), // Convert to the desired format
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

  const validateName = (_, value) => {
        if (!value || /^[a-zA-Z\s]*$/.test(value)) {
          return Promise.resolve();
        }
        return Promise.reject(new Error("Please enter only letters"));
      };
      const validateNoNumbers = (_, value) => {
            if (!value || !/\d/.test(value)) {
              return Promise.resolve();
            }
            return Promise.reject(new Error("Field should not contain numbers"));
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
       title: 'FirstName',
       dataIndex: 'firstname',
       key: 'firstname',
     },
     {
      title: 'LastName',
      dataIndex: 'lastname',
      key: 'lastname',
    },
     {
      title: 'Username',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: 'Password',
      dataIndex: 'password',
      key: 'password',
    },
     {
       title: 'Email',
       dataIndex: 'email',
       key: 'email',
     },
     {
       title: 'Phone Number',
       dataIndex: 'phoneNumber',
       key: 'phoneNumber',
     },
     {
       title: 'Marital Status',
       dataIndex: 'maritalStatus',
       key: 'maritalStatus',
     },
    {
      title: 'Date of birth',
      dataIndex: 'dob',
      key: 'dob',
      // render: (dob) => moment(dob).format('YYYY-MM-DD'),
      render: (text, record) => {
        return <span>{moment(record.dob).format("YYYY-MM-DD")}</span>;
      }
    },

    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },

     {
       title: 'City',
       dataIndex: 'city',
       key: 'city',
     },
     {
       title: 'State',
       dataIndex: 'state',
       key: 'state',
     },
     {
       title: 'Country',
       dataIndex: 'country',
       key: 'country',
     },
     {
       title: 'Pin Code',
       dataIndex: 'pinCode',
       key: 'pinCode',
     },
     {
       title: 'Role',
       dataIndex: 'role',
       key: 'role',
     },
   

    {
      title: 'Join Date',
      dataIndex: 'joinDate',
      key: 'joinDate',
      // render: (joinDate) => moment(joinDate).format('YYYY-MM-DD'),
      render: (text, record) => {
        return <span>{moment(record.joinDate).format("YYYY-MM-DD")}</span>;
      }
    },
    {
      title: 'Qualification',
      dataIndex: 'qualification',
      key: 'qualification',
    },


     {
       title: 'Experience',
       dataIndex: 'experience',
       key: 'experience',
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
            <Button type="link"  onClick={() => edit(record.key)}>Edit</Button>
            <Popconfirm title="Sure to delete?" onConfirm={() => deleteRecord(record.key)}>
              <Button type="link">Delete</Button>
            </Popconfirm>
          </span>
        );
      },
    },
  ];
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    image: '',
    username: '',
    password:'',
    email:'',
    phone:'',
    dob:'',
    marital_status: '',
    address: '',
    city: '',
    state: '',
    country: '',
    pin_code: '',
    qualification:'',
    experience:'',
  });


  console.log(formData);
 


  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Make the POST request
  // axios.post('http://127.0.0.1:8000/auth/staff/', formData)
  //     .then(response => {
  //       console.log('Data successfully posted:', response.data);
  //       alert('successfully added')

  //       setFormData({
  //         first_name: '',
  //         last_name: '',
  //         image: '',
  //         username: '',
  //         password:'',
  //         email:'',
  //         phone:'',
  //         marital_status: '',
  //         address: '',
  //         city: '',
  //         state: '',
  //         country: '',
  //         pin_code: '',
  //         qualification:'',
  //         experience:'',
  //       });
  //     })

     
  //     .catch(error => {
  //       console.error('There was an error posting the data!', error);
  //     });
    console.log(formData)

  };

  const handleCategoryChange = (e) => {
    const  marital_status = e.target.value; // Change variable name from "category" to "type"
    setFormData({ ...FormData, marital_status }); // Update "type" in state
    console.log('Selected type:', marital_status); // Log the selected type
  };
  function handleChange(value) {
    console.log(`selected ${value}`);
  }
  function handleChangeFun(value) {
    console.log(value.target.value);
  }
  return (
    <div style={{marginTop:'60px'}}>
      <h2 style={{marginBottom:'40px'}}> STAFF REGISTRATION</h2>
      <Form
    

        form={form}
        layout="vertical"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        
      >
        {/* Form fields */}
        {/* <h2 style={{marginTop:'20px'}}>Personal Information</h2> */}
       <Row gutter={16}>
        <Col span={12}>
           <Form.Item
             label=" First Name"
             name="firstname"
             rules={[
               { required: true, message: "Please enter your name" },
               { validator: validateName }
             ]}
             
           >
             <Input placeholder="name" value={FormData.name}name="first_name"
             onChange={(e)=>setFormData({...FormData,name:e.target.value})}/>
           </Form.Item>
         </Col> 
         <Col span={12}>
           <Form.Item
             label=" Last Name"
             name="lastname"
             rules={[
               { required: true, message: "Please enter your name" },
               { validator: validateName }
             ]}
             
           >
             <Input placeholder="name" value={FormData.name} name="last_name"
             onChange={(e)=>setFormData({...FormData,name:e.target.value})}/>
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
    <Input placeholder="Username"value={FormData.username}name="username"
             onChange={(e)=>setFormData({...FormData,username:e.target.value})} />
  </Form.Item>
</Col>
<Col span={12}>
  <Form.Item
    label="Password"
    name="password"
    rules={[
      { required: true, message: "Please enter password" },
      {
        pattern:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%?&])[A-Za-z\d@$!%?&]{6,}$/,

        message: "Password must be at least 6 characters long and contain at least one lowercase letter, one uppercase letter, and one number and one special character",
      },
    ]}
  >
    <Input.Password  placeholder="Password" value={FormData.password}name="password"
             onChange={(e)=>setFormData({...FormData,password:e.target.value})}/>
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
             <Input placeholder="Email"value={FormData.email}name="email"
             onChange={(e)=>setFormData({...FormData,email:e.target.value})} />
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
             <Input placeholder="Phone Number"value={FormData.phone}name="phone"
             onChange={(e)=>setFormData({...FormData,phone:e.target.value})} />
           </Form.Item>
         </Col>
       </Row>
       <Row gutter={16}>
         <Col span={12}>
           <Form.Item
             label="Marital Status"
             name="maritalStatus"
            //  rules={[{ required: true, message: "Please select marital status" }]}
           >
             <Select placeholder="Select marital status" onChange={handleChange} >
               <Option value="Single">Single</Option>
               <Option value="Married">Married</Option>
               <Option value="Divorced">Divorced</Option>
             </Select>

           </Form.Item>
     
         </Col>
         <Col span={12}>
         <Form.Item label="Dob"
          name="dob" 
          // rules={[{ required: true, message: "Please select DOB" }]}
          >

          <DatePicker style={{ width: "100%" }} />
        </Form.Item>
           
         </Col>
       </Row>
      
       {/* Address Information Section */}
       {/* <h2>Address Information</h2> */}
       <Row gutter={16}>
       <Col span={8}>
           <Form.Item
             label="Address"
             name="address"
             rules={[
              //  { required: true, message: "Please enter city" },
               { validator: validateNoNumbers }
             ]}
           >
             <Input placeholder="Address" value={FormData.address}name="address"
             onChange={(e)=>setFormData({...FormData,address:e.target.value})}/>
           </Form.Item>
         </Col>
         <Col span={8}>
           <Form.Item
             label="City"
             name="city"
             rules={[
              //  { required: true, message: "Please enter city" },
               { validator: validateNoNumbers }
             ]}
           >
             <Input placeholder="City" value={FormData.city} name="city"
             onChange={(e)=>setFormData({...FormData,city:e.target.value})}/>
           </Form.Item>
         </Col>
         <Col span={8}>
           <Form.Item
             label="State"
             name="state"
             rules={[
               //{ required: true, message: "Please enter state" },
               { validator: validateNoNumbers }
             ]}
           >
             <Input placeholder="State"value={FormData.state} name="state"
             onChange={(e)=>setFormData({...FormData,state:e.target.value})}/>
           </Form.Item>
         </Col>
         <Col span={8}>
           <Form.Item
             label="Country"
             name="country"
             rules={[
              //  { required: true, message: "Please enter country" },
               { validator: validateNoNumbers }
             ]}
           >
             <Input placeholder="Country" value={FormData.country}name="country"
             onChange={(e)=>setFormData({...FormData,country:e.target.value})}/>
           </Form.Item>
         </Col>
         <Col span={8}>
           <Form.Item
             label="Pin Code"
             name="pinCode"
             rules={[
              //  { required: true, message: "Please enter pin code" },
               {
                 pattern: /^[0-9]{6}$/,
                 message: "Please enter a valid pin code",
               },
             ]}
           >
             <Input placeholder="Pin Code" value={FormData.pin_code}name="pin_code"
            onChange={handleChangeFun}/>
           </Form.Item>
         </Col>
       </Row>
 

       {/* Additional Information Section */}
       {/* <h2>Additional Information</h2> */}
       <Row gutter={16}>
      
         <Col span={8}>
        
         <Form.Item label="JoinDate" 
         name="joinDate" 
        //  rules={[{ required: true, message: "Please select join date" }]}
         >
          <DatePicker style={{ width: "100%" }} />
        </Form.Item>
         </Col>
         <Col span={8}>
           <Form.Item
             label="Qualification"
             name="qualification"
             rules={[
              //  { required: true, message: "Please select department" },
              { validator: validateNoNumbers }
             ]}
           >
             <Input placeholder="Qualification" value={FormData.qualification} name="qualification"
             onChange={(e)=>setFormData({...FormData,qualification:e.target.value})}/>
           </Form.Item>
         </Col>
     
       </Row>

       {/* Work Experience Section */}
      
       <Row gutter={16}>
         <Col span={24}>
           <Form.Item
             label="Experience"
             name="experience"
             rules={[
              //  { required: true, message: "Please select your work experience" },
             ]}
           >
            
             <Select placeholder="Select your work experience" onChange={handleChange}>
               <Option value="Less than 1 year">Less than 1 year</Option>
               <Option value="1-2 years">1-2 years</Option>
               <Option value="2-5 years">2-5 years</Option>
               <Option value="More than 5 years">More than 5 years</Option>
             </Select>
           </Form.Item>
         </Col>
</Row>
       
        {/* Add more form items as needed */}

        <Form.Item>
          <Button onClick={handleSubmit} type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
      <div>
        <h2>Submitted Data</h2>
        {/* <Table dataSource={submittedData} columns={columns} /> */}
        <Table dataSource={submittedData} columns={columns} scroll={{ x: true }} />
      </div>
    </div>
  );
};

export default StaffRegistrationForm;


