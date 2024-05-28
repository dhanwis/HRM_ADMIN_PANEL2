// import React, { useState } from 'react';
// import { Form, Input, DatePicker, Select, Button, Table, Modal, Space } from 'antd';
// import 'antd/dist/antd.css';
// import moment from 'moment';

// const EnquiryAdmissionform = () => {
//   const [studentForm] = Form.useForm();
//   const [productionForm] = Form.useForm();
//   const [isStudentModalVisible, setIsStudentModalVisible] = useState(false);
//   const [isProductionModalVisible, setIsProductionModalVisible] = useState(false);
//   const [studentData, setStudentData] = useState([]);
//   const [productionData, setProductionData] = useState([]);
//   const [selectedStudent, setSelectedStudent] = useState(null);
//   const [selectedProduction, setSelectedProduction] = useState(null);

//   const showStudentModal = () => {
//     setIsStudentModalVisible(true);
//   };

//   const showProductionModal = () => {
//     setIsProductionModalVisible(true);
//   };

//   const handleStudentCancel = () => {
//     studentForm.resetFields();
//     setIsStudentModalVisible(false);
//   };

//   const handleProductionCancel = () => {
//     productionForm.resetFields();
//     setIsProductionModalVisible(false);
//   };

//   const onStudentFinish = (values) => {
//     const formattedValues = {
//       ...values,
//       dob: values.dob.format('YYYY-MM-DD'),
//     };
//     if (selectedStudent) {
//       const updatedData = studentData.map((student) =>
//         student === selectedStudent ? formattedValues : student
//       );
//       setStudentData(updatedData);
//       setSelectedStudent(null);
//     } else {
//       setStudentData([...studentData, formattedValues]);
//     }
//     studentForm.resetFields();
//     setIsStudentModalVisible(false);
//   };

//   const onProductionFinish = (values) => {
//     const formattedValues = {
//       ...values,
//       date: values.date.format('YYYY-MM-DD'),
//     };
//     if (selectedProduction) {
//       const updatedData = productionData.map((production) =>
//         production === selectedProduction ? formattedValues : production
//       );
//       setProductionData(updatedData);
//       setSelectedProduction(null);
//     } else {
//       setProductionData([...productionData, formattedValues]);
//     }
//     productionForm.resetFields();
//     setIsProductionModalVisible(false);
//   };

//   const handleStudentEdit = (record) => {
//     setSelectedStudent(record);
//     setIsStudentModalVisible(true);
//     studentForm.setFieldsValue({
//       ...record,
//       dob: moment(record.dob),
//     });
//   };

//   const handleProductionEdit = (record) => {
//     setSelectedProduction(record);
//     setIsProductionModalVisible(true);
//     productionForm.setFieldsValue({
//       ...record,
//       date: moment(record.date),
//     });
//   };

//   const handleStudentDelete = (record) => {
//     setStudentData(studentData.filter((student) => student !== record));
//   };

//   const handleProductionDelete = (record) => {
//     setProductionData(productionData.filter((production) => production !== record));
//   };

//   const studentColumns = [
//     {
//       title: 'Name of Student',
//       dataIndex: 'name',
//       key: 'name',
//     },
//     {
//       title: 'Date of Birth',
//       dataIndex: 'dob',
//       key: 'dob',
//     },
//     {
//       title: 'Education Qualification',
//       dataIndex: 'educationQualification',
//       key: 'educationQualification',
//     },
//     {
//       title: 'Course',
//       dataIndex: 'course',
//       key: 'course',
//     },
//     {
//       title: 'Address',
//       dataIndex: 'address',
//       key: 'address',
//     },
//     {
//       title: 'Contact Number',
//       dataIndex: 'contactNumber',
//       key: 'contactNumber',
//     },
//     {
//       title: 'Action',
//       key: 'action',
//       render: (text, record) => (
//         <Space size="middle">
//           <Button onClick={() => handleStudentEdit(record)}>Edit</Button>
//           <Button onClick={() => handleStudentDelete(record)}>Delete</Button>
//         </Space>
//       ),
//     },
//   ];

//   const productionColumns = [
//     {
//       title: 'Customer Name',
//       dataIndex: 'customerName',
//       key: 'customerName',
//     },
//     {
//       title: 'Contact',
//       dataIndex: 'contact',
//       key: 'contact',
//     },
//     {
//       title: 'Requirement',
//       dataIndex: 'requirement',
//       key: 'requirement',
//     },
//     {
//       title: 'Date',
//       dataIndex: 'date',
//       key: 'date',
//     },
//     {
//       title: 'Action',
//       key: 'action',
//       render: (text, record) => (
//         <Space size="middle">
//           <Button onClick={() => handleProductionEdit(record)}>Edit</Button>
//           <Button onClick={() => handleProductionDelete(record)}>Delete</Button>
//         </Space>
//       ),
//     },
//   ];

//   return (
//     <div style={{ marginTop: '40px' }}>
//       <Button type="primary" onClick={showStudentModal} style={{ marginRight: '10px' }}>
//         Add Student
//       </Button>
//       <Button type="primary" onClick={showProductionModal}>
//         Add Production
//       </Button>

//       <Modal
//         title="Student Form"
//         visible={isStudentModalVisible}
//         onCancel={handleStudentCancel}
//         footer={null}
//       >
//         <Form form={studentForm} onFinish={onStudentFinish} layout="vertical">
//           <Form.Item
//             label="Name of Student"
//             name="name"
//             rules={[{ required: true, message: 'Please input the name of the student' }]}
//           >
//             <Input />
//           </Form.Item>
//           <Form.Item
//             label="Date of Birth"
//             name="dob"
//             rules={[{ required: true, message: 'Please select the date of birth' }]}
//           >
//             <DatePicker style={{ width: '100%' }} />
//           </Form.Item>
//           <Form.Item
//             label="Education Qualification"
//             name="educationQualification"
//             rules={[{ required: true, message: 'Please input the education qualification' }]}
//           >
//             <Input />
//           </Form.Item>
//           <Form.Item
//             label="Course"
//             name="course"
//             rules={[{ required: true, message: 'Please select a course' }]}
//           >
//             <Select>
//               <Select.Option value="course1">Course 1</Select.Option>
//               <Select.Option value="course2">Course 2</Select.Option>
//               <Select.Option value="course3">Course 3</Select.Option>
//             </Select>
//           </Form.Item>
//           <Form.Item
//             label="Address"
//             name="address"
//             rules={[{ required: true, message: 'Please input the address' }]}
//           >
//             <Input.TextArea />
//           </Form.Item>
//           <Form.Item
//             label="Contact Number"
//             name="contactNumber"
//             rules={[
//               { required: true, message: 'Please input the contact number' },
//               { pattern: /^\d+$/, message: 'Contact number must be a number' },
//             ]}
//           >
//             <Input />
//           </Form.Item>
//           <Form.Item>
//             <Button type="primary" htmlType="submit">
//               {selectedStudent ? 'Update' : 'Submit'}
//             </Button>
//           </Form.Item>
//         </Form>
//       </Modal>

//       <Modal
//         title="Production Form"
//         visible={isProductionModalVisible}
//         onCancel={handleProductionCancel}
//         footer={null}
//       >
//         <Form form={productionForm} onFinish={onProductionFinish} layout="vertical">
//           <Form.Item
//             label="Customer Name"
//             name="customerName"
//             rules={[{ required: true, message: 'Please input the customer name' }]}
//           >
//             <Input />
//           </Form.Item>
//           <Form.Item
//             label="Contact"
//             name="contact"
//             rules={[
//               { required: true, message: 'Please input the contact' },
//               { pattern: /^\d+$/, message: 'Contact must be a number' },
//             ]}
//           >
//             <Input />
//           </Form.Item>
//           <Form.Item
//             label="Requirement"
//             name="requirement"
//             rules={[{ required: true, message: 'Please input the requirement' }]}
//           >
//             <Input />
//           </Form.Item>
//           <Form.Item
//             label="Date"
//             name="date"
//             rules={[{ required: true, message: 'Please select the date' }]}
//           >
//             <DatePicker style={{ width: '100%' }} />
//           </Form.Item>
//           <Form.Item>
//             <Button type="primary" htmlType="submit">
//               {selectedProduction ? 'Update' : 'Submit'}
//             </Button>
//           </Form.Item>
//         </Form>
//       </Modal>

//       <Table
//         columns={studentColumns}
//         dataSource={studentData}
//         rowKey="name"
//         style={{ marginTop: '20px' }}
//         title={() => 'Students'}
//       />
//       <Table
//         columns={productionColumns}
//         dataSource={productionData}
//         rowKey="customerName"
//         style={{ marginTop: '20px' }}
//         title={() => 'Productions'}
//       />
//     </div>
//   );
// };

// export default EnquiryAdmissionform;
import React, { useState } from 'react';
import { Form, Input, DatePicker, Select, Button, Table, Modal, Space } from 'antd';
import 'antd/dist/antd.css';
import moment from 'moment';

const EnquiryAdmissionform = () => {
  const [studentForm] = Form.useForm();
  const [productionForm] = Form.useForm();
  const [isStudentModalVisible, setIsStudentModalVisible] = useState(false);
  const [isProductionModalVisible, setIsProductionModalVisible] = useState(false);
  const [studentData, setStudentData] = useState([]);
  const [productionData, setProductionData] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [selectedProduction, setSelectedProduction] = useState(null);

  const showStudentModal = () => {
    setIsStudentModalVisible(true);
  };

  const showProductionModal = () => {
    setIsProductionModalVisible(true);
  };

  const handleStudentCancel = () => {
    studentForm.resetFields();
    setIsStudentModalVisible(false);
  };

  const handleProductionCancel = () => {
    productionForm.resetFields();
    setIsProductionModalVisible(false);
  };

  const onStudentFinish = (values) => {
    const formattedValues = {
      ...values,
      dob: values.dob.format('YYYY-MM-DD'),
    };
    if (selectedStudent) {
      const updatedData = studentData.map((student) =>
        student === selectedStudent ? formattedValues : student
      );
      setStudentData(updatedData);
      setSelectedStudent(null);
    } else {
      setStudentData([...studentData, formattedValues]);
    }
    studentForm.resetFields();
    setIsStudentModalVisible(false);
  };

  const onProductionFinish = (values) => {
    const formattedValues = {
      ...values,
      date: values.date.format('YYYY-MM-DD'),
    };
    if (selectedProduction) {
      const updatedData = productionData.map((production) =>
        production === selectedProduction ? formattedValues : production
      );
      setProductionData(updatedData);
      setSelectedProduction(null);
    } else {
      setProductionData([...productionData, formattedValues]);
    }
    productionForm.resetFields();
    setIsProductionModalVisible(false);
  };

  const handleStudentEdit = (record) => {
    setSelectedStudent(record);
    setIsStudentModalVisible(true);
    studentForm.setFieldsValue({
      ...record,
      dob: moment(record.dob),
    });
  };

  const handleProductionEdit = (record) => {
    setSelectedProduction(record);
    setIsProductionModalVisible(true);
    productionForm.setFieldsValue({
      ...record,
      date: moment(record.date),
    });
  };

  const handleAcceptStudent = (record) => {
    // Implement accept student functionality here
  };

  const handleDeclineStudent = (record) => {
    // Remove the declined student from the studentData state
    setStudentData(studentData.filter((student) => student !== record));
  };

  const studentColumns = [
    {
      title: 'Name of Student',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Date of Birth',
      dataIndex: 'dob',
      key: 'dob',
    },
    {
      title: 'Education Qualification',
      dataIndex: 'educationQualification',
      key: 'educationQualification',
    },
    {
      title: 'Course',
      dataIndex: 'course',
      key: 'course',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Contact Number',
      dataIndex: 'contactNumber',
      key: 'contactNumber',
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <Button onClick={() => handleStudentEdit(record)}>Edit</Button>
          <Button onClick={() => handleAcceptStudent(record)}>Accept</Button>
          <Button onClick={() => handleDeclineStudent(record)}>Decline</Button>
        </Space>
      ),
    },
  ];

  const handleAcceptProduct = (record) => {
    // Implement accept student functionality here
  };

  const handleDeclineProduct = (record) => {
    // Remove the declined production from the productionData state
    setProductionData(productionData.filter((production) => production !== record));
  };

  const productionColumns = [
    {
      title: 'Customer Name',
      dataIndex: 'customerName',
      key: 'customerName',
    },
    {
      title: 'Contact',
      dataIndex: 'contact',
      key: 'contact',
    },
    {
      title: 'Requirement',
      dataIndex: 'requirement',
      key: 'requirement',
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <Button onClick={() => handleProductionEdit(record)}>Edit</Button>
          <Button onClick={() => handleAcceptProduct(record)}>Accept</Button>
          <Button onClick={() => handleDeclineProduct(record)}>Decline</Button>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ marginTop: '40px' }}>
      <Button type="primary" onClick={showStudentModal} style={{ marginRight: '10px' }}>
        Add Student
      </Button>
      <Button type="primary" onClick={showProductionModal}>
        Add Production
      </Button>
      
      <Modal
        title="Student Form"
        visible={isStudentModalVisible}
        onCancel={handleStudentCancel}
        footer={null}
        width={1000} // Change this value to the desired width
        maskClosable={false}
      >
       

        <Form form={studentForm} onFinish={onStudentFinish} layout="vertical">
          {/* Student form fields */}
          <Form.Item
            label="Name of Student"
            name="name"
            // rules={[{ pattern: /^[A-Za-z]+$/,required: true, message: 'Please input the name of the student' }]}
          rules={[  {
            required: true,
            message: "Please input the name of the student",
          },
          {
            pattern: /^[a-zA-Z]*$/,
            message: "Please enter a valid name",
          },]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Date of Birth"
            name="dob"
            rules={[
              { required: true, message: 'Please select the date of birth' },
            ]}
          >
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item
            label="Education Qualification"
            name="educationQualification"
            rules={[
              {
                required: true,
                message: "Please input your educational qualification",
              },
              {
                pattern: /^[a-zA-Z]*$/,
                message: "Please enter a valid data",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Course"
            name="course"
            rules={[
              {
                required: true,
                message: "Please input your course",
              },
              {
                // pattern: /^[a-zA-Z]*$/,
                // message: "Course should not contain numbers and special characters!",
              },
            ]}
          >
             <Input />
          </Form.Item>
        
          <Form.Item
            label="Address"
            name="address"
            rules={[
              {
                required: true,
                message: "Please input your Address",
              },
              {
                pattern: /^[a-zA-Z]*$/,
               
              },
            ]}
          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item
            label="Contact Number"
            name="contactNumber"
            rules={[
              {
                required: true,
                message: 'Please input your phone number!',
              },
              {
                pattern: /^\d{10}$/,
                message: 'Please enter exactly 10 digits',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              {selectedStudent ? 'Update' : 'Submit'}
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="Production Form"
        visible={isProductionModalVisible}
        onCancel={handleProductionCancel}
        footer={null}
      >
        <Form form={productionForm} onFinish={onProductionFinish} layout="vertical">
          {/* Production form fields */}
          <Form.Item
            label="Customer Name"
            name="customerName"
            rules={[
              {
                required: true,
                message: "Please input the name of the customer",
              },
              {
                pattern: /^[a-zA-Z]*$/,
                message: "Please enter a valid name",
              },

            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Contact"
            name="contact"
            rules={[
              { required: true, message: 'Please input the contact' },
              { pattern: /^\d{10}$/, message: 'Contact must be a number' },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Requirement"
            name="requirement"
            rules={[{ required: true, message: 'Please input the requirement' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Date"
            name="date"
            rules={[{ required: true, message: 'Please select the date' }]}
          >
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              {selectedProduction ? 'Update' : 'Submit'}
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      <Table
        columns={studentColumns}
        dataSource={studentData}
        rowKey="name"
        style={{ marginTop: '20px' }}
        title={() => 'Students'}
      />
      <Table
        columns={productionColumns}
        dataSource={productionData}
        rowKey="customerName"
        style={{ marginTop: '20px' }}
        title={() => 'Productions'}
      />
    </div>
  );
};

export default EnquiryAdmissionform;

