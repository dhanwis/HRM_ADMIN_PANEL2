// import React, { useState, useEffect } from "react";
// import { Table, Typography, Input, Button, Select, Modal, Form, InputNumber } from "antd";
// import moment from "moment";

// const { Title } = Typography;
// const { Option } = Select;

// function Feeform() {
//   const [paymentDetails, setPaymentDetails] = useState([]);
//   const [selectedRowKeys, setSelectedRowKeys] = useState([]);
//   const [isModalVisible, setIsModalVisible] = useState(false);
//   const [editingPayment, setEditingPayment] = useState(null);
//   const [form] = Form.useForm();
//   const [paymentOption, setPaymentOption] = useState(null);

//   useEffect(() => {
//     const storedData = localStorage.getItem("paymentDetails");
//     if (storedData) {
//       setPaymentDetails(JSON.parse(storedData));
//     }
//   }, []);

//   useEffect(() => {
//     localStorage.setItem("paymentDetails", JSON.stringify(paymentDetails));
//   }, [paymentDetails]);

//   const showModal = () => {
//     setIsModalVisible(true);
//     setEditingPayment(null);
//     form.resetFields();
//   };

//   const handleOk = () => {
//     form.validateFields().then((values) => {
//       const { paymentOption, ...restValues } = values;
//       const totalAmount = paymentOption === "Installment" ? calculateTotalAmount(restValues.firstPayment, restValues.secondPayment, restValues.thirdPayment) : restValues.fullPayment;

//       if (editingPayment) {
//         const editedPaymentDetails = paymentDetails.map((payment) => {
//           if (payment.id === editingPayment.id) {
//             return {
//               ...payment,
//               ...restValues,
//               totalAmount,
//             };
//           }
//           return payment;
//         });
//         setPaymentDetails(editedPaymentDetails);
//       } else {
//         const newPayment = {
//           id: paymentDetails.length + 1,
//           ...restValues,
//           totalAmount,
//           dateTime: moment().format("YYYY-MM-DD hh:mm:ss A"),
//         };
//         setPaymentDetails([...paymentDetails, newPayment]);
//       }
//       setIsModalVisible(false);
//       form.resetFields();
//     });
//   };

//   const handleCancel = () => {
//     setIsModalVisible(false);
//     form.resetFields();
//   };

//   const handleEdit = () => {
//     const editingPayment = paymentDetails.find((payment) => payment.id === selectedRowKeys[0]);
//     if (editingPayment) {
//       setEditingPayment(editingPayment);
//       setIsModalVisible(true);
//       form.setFieldsValue(editingPayment);
//     }
//   };

//   const handleDelete = () => {
//     const filteredData = paymentDetails.filter((item) => !selectedRowKeys.includes(item.id));
//     setPaymentDetails(filteredData);
//     setSelectedRowKeys([]);
//   };

//   const onSelectChange = (selectedKeys) => {
//     setSelectedRowKeys(selectedKeys);
//   };

//   const rowSelection = {
//     selectedRowKeys,
//     onChange: onSelectChange,
//   };

//   const calculateTotalAmount = (firstPayment, secondPayment, thirdPayment) => {
//     return (firstPayment || 0) + (secondPayment || 0) + (thirdPayment || 0);
//   };

//   const handlePaymentOptionChange = (value) => {
//     setPaymentOption(value);
//     form.resetFields(["firstPayment", "secondPayment", "thirdPayment", "fullPayment"]);
//   };

//   // const handlePrint = (record) => {
//   //   const printWindow = window.open("", "_blank");
//   //   printWindow.document.write(`<html><head><title>Payment Details</title></head><body><h1>Payment Details</h1><p>Name: ${record.studentName}</p><p>Course Name: ${record.courseName}</p><p>Date Time: ${record.dateTime}</p><p>1st Payment: ${record.firstPayment}</p><p>2nd Payment: ${record.secondPayment}</p><p>3rd Payment: ${record.thirdPayment}</p><p>Total Amount: ${record.totalAmount}</p><p>Payment Method: ${record.paymentMethod}</p></body></html>`);
//   //   printWindow.document.close();
//   //   printWindow.print();
//   // };
//   const handlePrint = (record) => {
//     const printWindow = window.open("", "_blank");
//     printWindow.document.write(`
//       <html>
//         <head>
//           <title>Payment Receipt</title>
//           <style>
//             @page {
//               size: A4;
//               margin: 0;
//             }
//             body {
//               font-family: Arial, sans-serif;
//               margin: 0;
//               padding: 0;
//               background-color: #f5f5f5;
//             }
//             .receipt-container {
//               width: 100%;
//               max-width: 800px;
//               margin: 20px auto;
//               padding: 20px;
//               background-color: #fff;
//               box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
//               box-sizing: border-box;
//             }
//             .header {
//               text-align: center;
//               margin-bottom: 20px;
//             }
//             .header h1 {
//               margin: 5px 0;
//               color: #333;
//             }
//             .content {
//               margin-bottom: 20px;
//             }
//             .content p {
//               margin: 5px 0;
//             }
//             .footer {
//               text-align: center;
//               margin-top: 20px;
//             }
//             .footer p {
//               margin: 5px 0;
//               font-size: 12px;
//               color: #666;
//             }
//           </style>
//         </head>
//         <body>
//           <div class="receipt-container">
//             <div class="header">
//               <h1>Payment Receipt</h1>
              
//             </div>
//             <div class="content">
//               <p><strong>Name:</strong> ${record.studentName}</p>
//               <p><strong>Course Name:</strong> ${record.courseName}</p>
//               <p><strong>Date Time:</strong> ${record.dateTime}</p>
//               <p><strong>1st Payment:</strong> ${record.firstPayment || '-'}</p>
//               <p><strong>2nd Payment:</strong> ${record.secondPayment || '-'}</p>
//               <p><strong>3rd Payment:</strong> ${record.thirdPayment || '-'}</p>
//               <p><strong>Total Amount:</strong> ${record.totalAmount || '-'}</p>
//               <p><strong>Payment Method:</strong> ${record.paymentMethod}</p>
//             </div>
//             <div class="footer">
//             <p>Thank you for your payment</p>
//             </div>
//           </div>
//           <script>
//             window.onload = function() {
//               window.print();
//             }
//           </script>
//         </body>
//       </html>
//     `);
//     printWindow.document.close();
//   };
  
//   return (
//     <div className="payment-details">
//       <Title level={5}>Payment Details</Title>
//       <Button type="primary" onClick={showModal} style={{ marginBottom: 16 }}>
//         Add Payment
//       </Button>
//       {selectedRowKeys.length === 1 && (
//         <Button type="primary" onClick={handleEdit} style={{ marginBottom: 16, marginLeft: 16 }}>
//           Edit
//         </Button>
//       )}
//       {selectedRowKeys.length > 0 && (
//         <Button type="danger" onClick={handleDelete} style={{ marginBottom: 16, marginLeft: 16 }}>
//           Delete Selected
//         </Button>
//       )}
//       <Modal title={editingPayment ? "Edit Payment" : "Add Payment"} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
//         <Form form={form} layout="vertical">
//           <Form.Item name="studentName" label="Student Name" rules={[{ required: true, message: "Please enter student name" }]}>
//             <Input />
//           </Form.Item>
//           <Form.Item name="courseName" label="Course" rules={[{ required: true, message: "Please enter course name" }]}>
//             <Input />
//           </Form.Item>
//           <Form.Item name="paymentOption" label="Payment Option" rules={[{ required: true, message: "Please select payment option" }]}>
//             <Select onChange={handlePaymentOptionChange}>
//               <Option value="Installment">Installment</Option>
//               <Option value="Full">Full Payment</Option>
//             </Select>
//           </Form.Item>
//           {paymentOption === "Installment" && (
//             <>
//               <Form.Item name="firstPayment" label="1st Payment" rules={[{ required: true, message: "Please enter 1st payment" }]}>
//                 <InputNumber />
//               </Form.Item>
//               <Form.Item name="secondPayment" label="2nd Payment" rules={[{ required: true, message: "Please enter 2nd payment" }]}>
//                 <InputNumber />
//               </Form.Item>
//               <Form.Item name="thirdPayment" label="3rd Payment" rules={[{ required: true, message: "Please enter 3rd payment" }]}>
//                 <InputNumber />
//               </Form.Item>
//             </>
//           )}
//           {paymentOption === "Full" && (
//             <Form.Item name="fullPayment" label="Full Payment" rules={[{ required: true, message: "Please enter full payment" }]}>
//               <InputNumber />
//             </Form.Item>
//           )}
//           <Form.Item name="paymentMethod" label="Payment Method" rules={[{ required: true, message: "Please select payment method" }]}>
//             <Select>
//               <Option value="Credit Card">Credit Card</Option>
//               <Option value="Debit Card">Debit Card</Option>
//               <Option value="Cash">Cash</Option>
//               <Option value="UPI">UPI</Option>
//               <Option value="Bank Transfer">Bank Transfer</Option>
//             </Select>
//           </Form.Item>
//         </Form>
//       </Modal>
      
//       <Table
//         dataSource={paymentDetails}
//         columns={[
//           { title: "Student Name", dataIndex: "studentName", key: "studentName" },
//           { title: "Course", dataIndex: "courseName", key: "courseName" },
//           { title: "Date Time", dataIndex: "dateTime", key: "dateTime", render: (text) => moment(text).format("YYYY-MM-DD hh:mm:ss A") },
//           // { title: "Payment Option", dataIndex: "paymentOption", key: "paymentOption" },
//           { title: "1st Payment", dataIndex: "firstPayment", key: "firstPayment" },
//           { title: "2nd Payment", dataIndex: "secondPayment", key: "secondPayment" },
//           { title: "3rd Payment", dataIndex: "thirdPayment", key: "thirdPayment" },
//           { title: "Full Payment", dataIndex: "fullPayment", key: "fullPayment" },
//           { title: "Total Amount", dataIndex: "totalAmount", key: "totalAmount", render: (text) => (text ? `${text}` : "-") },
//           { title: "Payment Method", dataIndex: "paymentMethod", key: "paymentMethod" },
//           { title: "Print", key: "print", render: (text, record) => (<Button type="link" onClick={() => handlePrint(record)}>Print</Button>) },
//         ]}
//         pagination={false}
//         rowKey="id"
//         rowSelection={{
//           type: "checkbox",
//           ...rowSelection,
//         }}
//       />
//     </div>
//   );
// }

// export default Feeform;




// import React, { useState } from "react";
// import { Form, Input, Button, DatePicker, Radio, InputNumber } from "antd";

// const Feeform = () => {
//   const [form] = Form.useForm();
//   const [paymentMethod, setPaymentMethod] = useState(null);

//   const onFinish = (values) => {
//     console.log("Success:", values);
//   };

//   const onFinishFailed = (errorInfo) => {
//     console.log("Failed:", errorInfo);
//   };

//   const handlePaymentMethodChange = (e) => {
//     setPaymentMethod(e.target.value);
//   };

//   return (
//     <Form
//       form={form}
//       layout="vertical"
//       onFinish={onFinish}
//       onFinishFailed={onFinishFailed}
//     >
//       <h2>Student Fee Payment</h2>
//       <Form.Item
//         label="Student ID"
//         name="studentID"
//         rules={[
//           { required: true, message: "Please enter student ID" },
//         ]}
//       >
//         <Input placeholder="Student ID" />
//       </Form.Item>
//       <Form.Item
//         label="Total Amount"
//         name="totalAmount"
//         rules={[
//           { required: true, message: "Please enter total amount" },
//         ]}
//       >
//         <InputNumber
//           style={{ width: '100%' }}
//           formatter={value => $ ${value}}
//           parser={value => value.replace('$', '')}
//         />
//       </Form.Item>
//       <Form.Item
//         label="Installment Payment"
//         name="installmentPayment"
//       >
//         <Radio.Group onChange={handlePaymentMethodChange}>
//           <Radio value="full">Full Payment</Radio>
//           <Radio value="installment">Installment Payment</Radio>
//         </Radio.Group>
//       </Form.Item>
//       {paymentMethod === "installment" && (
//         <>
//           <Form.Item
//             label="Number of Installments"
//             name="numInstallments"
//           >
//             <InputNumber min={1} max={12} />
//           </Form.Item>
//           <Form.Item
//             label="Installment Amount"
//             name="installmentAmount"
//           >
//             <InputNumber
//               style={{ width: '100%' }}
//               formatter={value => $ ${value}}
//               parser={value => value.replace('$', '')}
//             />
//           </Form.Item>
//         </>
//       )}
//       <Form.Item>
//         <Button type="primary" htmlType="submit">
//           Submit
//         </Button>
//       </Form.Item>
//     </Form>
//   );
// };

// export default Feeform;






// import React, { useState } from "react";
// import { Form, Input, Button, DatePicker, Radio, InputNumber } from "antd";

// const Feeform = () => {
//   const [form] = Form.useForm();
//   const [paymentMethod, setPaymentMethod] = useState(null);

//   const onFinish = (values) => {
//     console.log("Success:", values);
//   };

//   const onFinishFailed = (errorInfo) => {
//     console.log("Failed:", errorInfo);
//   };

//   const handlePaymentMethodChange = (e) => {
//     setPaymentMethod(e.target.value);
//   };

//   return (
//     <Form
//       form={form}
//       layout="vertical"
//       onFinish={onFinish}
//       onFinishFailed={onFinishFailed}
//     >
//       <h2>Student Fee Payment</h2>
//       <Form.Item
//         label="Student ID"
//         name="studentID"
//         rules={[
//           { required: true, message: "Please enter student ID" },
//         ]}
//       >
//         <Input placeholder="Student ID" />
//       </Form.Item>
//       <Form.Item
//         label="Total Amount"
//         name="totalAmount"
//         rules={[
//           { required: true, message: "Please enter total amount" },
//         ]}
//       >
//         <InputNumber
//           style={{ width: '100%' }}
//           formatter={value => `$ ${value}`}
//           parser={value => value.replace('$', '')}
//         />
//       </Form.Item>
//       <Form.Item
//         label="Installment Payment"
//         name="installmentPayment"
//       >
//         <Radio.Group onChange={handlePaymentMethodChange}>
//           <Radio value="full">Full Payment</Radio>
//           <Radio value="installment">Installment Payment</Radio>
//         </Radio.Group>
//       </Form.Item>
//       {paymentMethod === "installment" && (
//         <>
//           <Form.Item
//             label="Number of Installments"
//             name="numInstallments"
//           >
//             <InputNumber min={1} max={12} />
//           </Form.Item>
//           <Form.Item
//             label="Installment Amount"
//             name="installmentAmount"
//           >
//             <InputNumber
//               style={{ width: '100%' }}
//               formatter={value => `$ ${value}`}
//               parser={value => value.replace('$', '')}
//             />
//           </Form.Item>
//         </>
//       )}
//       <Form.Item>
//         <Button type="primary" htmlType="submit">
//           Submit
//         </Button>
//       </Form.Item>
//     </Form>
//   );
// };

// export default Feeform;





// import React, { useState } from "react";
// import { Form, Input, Button, DatePicker, Radio, InputNumber, Table, Popconfirm } from "antd";

// const Feeform = () => {
//   const [form] = Form.useForm();
//   const [submittedData, setSubmittedData] = useState([]);
//   const [editingKey, setEditingKey] = useState("");
//   const [paymentMethod, setPaymentMethod] = useState(null);

//   const handlePaymentMethodChange = (e) => {
//     setPaymentMethod(e.target.value);
//   };

//   const onFinish = (values) => {
//     const key = Date.now(); // Generate a unique key for each fee
//     const newData = [...submittedData, { ...values, key }];
//     setSubmittedData(newData);
//     form.resetFields();
//     setPaymentMethod(null);
//   };

//   const onFinishFailed = (errorInfo) => {
//     console.log("Failed:", errorInfo);
//   };

//   const columns = [
//     {
//       title: 'Student ID',
//       dataIndex: 'studentID',
//       key: 'studentID',
//     },
//     {
//       title: 'Total Amount',
//       dataIndex: 'totalAmount',
//       key: 'totalAmount',
//     },
//     {
//       title: 'Payment Method',
//       dataIndex: 'paymentMethod',
//       key: 'paymentMethod',
//     },
//     {
//       title: 'Number of Installments',
//       dataIndex: 'numInstallments',
//       key: 'numInstallments',
//     },
//     {
//       title: 'Installment Amount',
//       dataIndex: 'installmentAmount',
//       key: 'installmentAmount',
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
//             <Popconfirm title="Sure to delete?" onConfirm={() => deleteFee(record.key)}>
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
//     const feeToEdit = submittedData.find(fee => fee.key === key);
//     form.setFieldsValue(feeToEdit);
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

//   const deleteFee = (key) => {
//     const newData = submittedData.filter((item) => item.key !== key);
//     setSubmittedData(newData);
//   };

//   return (
//     <div>
//       <Form
//         form={form}
//         layout="vertical"
//         onFinish={onFinish}
//         onFinishFailed={onFinishFailed}
//       >
//         <h2>Student Fee Payment</h2>
//         <Form.Item label="Student ID" name="studentID" rules={[{ required: true, message: "Please enter student ID" }]}>
//           <Input placeholder="Student ID" />
//         </Form.Item>
//         <Form.Item label="Total Amount" name="totalAmount" rules={[{ required: true, message: "Please enter total amount" }]}>
//           <InputNumber style={{ width: '100%' }} />
//         </Form.Item>
//         <Form.Item label="Payment Method" name="paymentMethod" rules={[{ required: true, message: "Please select payment method" }]}>
//           <Radio.Group onChange={handlePaymentMethodChange}>
//             <Radio value="full">Full Payment</Radio>
//             <Radio value="installment">Installment Payment</Radio>
//           </Radio.Group>
//         </Form.Item>
//         {paymentMethod === "installment" && (
//           <>
//             <Form.Item label="Number of Installments" name="numInstallments">
//               <InputNumber min={1} max={12} />
//             </Form.Item>
//             <Form.Item label="Installment Amount" name="installmentAmount">
//               <InputNumber style={{ width: '100%' }} />
//             </Form.Item>
//           </>
//         )}
//         <Form.Item>
//           <Button type="primary" htmlType="submit">Submit</Button>
//         </Form.Item>
//       </Form>
//       <div>
//         <h2>Submitted Fees</h2>
//         <Table dataSource={submittedData.map((item, index) => ({ ...item, key: index }))} columns={columns} />
//       </div>
//     </div>
//   );
// };

// export default Feeform;







// import React, { useState, useEffect } from "react";
// import { Form, Input, Button,  Radio, InputNumber, Table, Popconfirm } from "antd";

// const Feeform = () => {
//   const [form] = Form.useForm();
//   const [submittedData, setSubmittedData] = useState([]);
//   const [editingKey, setEditingKey] = useState("");
//   const [paymentMethod, setPaymentMethod] = useState(null);

//   useEffect(() => {
//     const savedData = JSON.parse(localStorage.getItem("submittedFees")) || [];
//     setSubmittedData(savedData);
//   }, []);

//   const handlePaymentMethodChange = (e) => {
//     setPaymentMethod(e.target.value);
//   };

//   const onFinish = (values) => {
//     const key = Date.now(); // Generate a unique key for each fee
//     const newData = [...submittedData, { ...values, key }];
//     setSubmittedData(newData);
//     form.resetFields();
//     setPaymentMethod(null);
//     localStorage.setItem("submittedFees", JSON.stringify(newData));
//   };

//   const onFinishFailed = (errorInfo) => {
//     console.log("Failed:", errorInfo);
//   };

//   const deleteFee = (key) => {
//     const newData = submittedData.filter((item) => item.key !== key);
//     setSubmittedData(newData);
//     localStorage.setItem("submittedFees", JSON.stringify(newData));
//   };

//   const columns = [
//     {
//       title: 'Student ID',
//       dataIndex: 'studentID',
//       key: 'studentID',
//     },
//     {
//       title: 'Total Amount',
//       dataIndex: 'totalAmount',
//       key: 'totalAmount',
//     },
//     {
//       title: 'Payment Method',
//       dataIndex: 'paymentMethod',
//       key: 'paymentMethod',
//     },
//     {
//       title: 'Number of Installments',
//       dataIndex: 'numInstallments',
//       key: 'numInstallments',
//     },
//     {
//       title: 'Installment Amount',
//       dataIndex: 'installmentAmount',
//       key: 'installmentAmount',
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
//             <Popconfirm title="Sure to delete?" onConfirm={() => deleteFee(record.key)}>
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
//     const feeToEdit = submittedData.find(fee => fee.key === key);
//     form.setFieldsValue(feeToEdit);
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
//         localStorage.setItem("submittedFees", JSON.stringify(newData));
//       }
//     } catch (errInfo) {
//       console.log('Validate Failed:', errInfo);
//     }
//   };

//   return (
//     <div>
//       <Form
//         form={form}
//         layout="vertical"
//         onFinish={onFinish}
//         onFinishFailed={onFinishFailed}
//       >
//         <h2>Student Fee Payment</h2>
//         <Form.Item label="Student ID" name="studentID" rules={[{ required: true, message: "Please enter student ID" }]}>
//           <Input placeholder="Student ID" />
//         </Form.Item>
//         <Form.Item label="Total Amount" name="totalAmount" rules={[{ required: true, message: "Please enter total amount" }]}>
//           <InputNumber style={{ width: '100%' }} />
//         </Form.Item>
//         <Form.Item label="Payment Method" name="paymentMethod" rules={[{ required: true, message: "Please select payment method" }]}>
//           <Radio.Group onChange={handlePaymentMethodChange}>
//             <Radio value="full">Full Payment</Radio>
//             <Radio value="installment">Installment Payment</Radio>
//           </Radio.Group>
//         </Form.Item>
//         {paymentMethod === "installment" && (
//           <>
//             <Form.Item label="Number of Installments" name="numInstallments">
//               <InputNumber min={1} max={12} />
//             </Form.Item>
//             <Form.Item label="Installment Amount" name="installmentAmount">
//               <InputNumber style={{ width: '100%' }} />
//             </Form.Item>
//           </>
//         )}
//         <Form.Item>
//           <Button type="primary" htmlType="submit">Submit</Button>
//         </Form.Item>
//       </Form>
//       <div>
//         <h2>Submitted Fees</h2>
//         <Table dataSource={submittedData} columns={columns} />
//       </div>
//     </div>
//   );
// };

// export default Feeform;



import React, { useState, useEffect } from "react";
import { Table, Typography, Input, Button, Select, Modal, Form, InputNumber } from "antd";
import moment from "moment";

const { Title } = Typography;
const { Option } = Select;

function Feeform() {
  const [paymentDetails, setPaymentDetails] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingPayment, setEditingPayment] = useState(null);
  const [form] = Form.useForm();
  const [paymentOption, setPaymentOption] = useState(null);

  useEffect(() => {
    const storedData = localStorage.getItem("paymentDetails");
    if (storedData) {
      setPaymentDetails(JSON.parse(storedData));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("paymentDetails", JSON.stringify(paymentDetails));
  }, [paymentDetails]);

  const showModal = () => {
    setIsModalVisible(true);
    setEditingPayment(null);
    form.resetFields();
  };

  const handleOk = () => {
    form.validateFields().then((values) => {
      const { paymentOption, ...restValues } = values;
      const totalAmount = paymentOption === "Installment" ? calculateTotalAmount(restValues.firstPayment, restValues.secondPayment, restValues.thirdPayment) : restValues.fullPayment;

      if (editingPayment) {
        const editedPaymentDetails = paymentDetails.map((payment) => {
          if (payment.id === editingPayment.id) {
            return {
              ...payment,
              ...restValues,
              totalAmount,
            };
          }
          return payment;
        });
        setPaymentDetails(editedPaymentDetails);
      } else {
        const newPayment = {
          id: paymentDetails.length + 1,
          ...restValues,
          totalAmount,
          dateTime: moment().format("YYYY-MM-DD hh:mm:ss A"),
        };
        setPaymentDetails([...paymentDetails, newPayment]);
      }
      setIsModalVisible(false);
      form.resetFields();
    });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const handleEdit = () => {
    const editingPayment = paymentDetails.find((payment) => payment.id === selectedRowKeys[0]);
    if (editingPayment) {
      setEditingPayment(editingPayment);
      setIsModalVisible(true);
      form.setFieldsValue(editingPayment);
    }
  };

  const handleDelete = () => {
    const filteredData = paymentDetails.filter((item) => !selectedRowKeys.includes(item.id));
    setPaymentDetails(filteredData);
    setSelectedRowKeys([]);
  };

  const onSelectChange = (selectedKeys) => {
    setSelectedRowKeys(selectedKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const calculateTotalAmount = (firstPayment, secondPayment, thirdPayment) => {
    return (firstPayment || 0) + (secondPayment || 0) + (thirdPayment || 0);
  };

  const handlePaymentOptionChange = (value) => {
    setPaymentOption(value);
    form.resetFields(["firstPayment", "secondPayment", "thirdPayment", "fullPayment"]);
  };

  const handlePrint = (record) => {
    const printWindow = window.open("", "_blank");
    printWindow.document.write(`
    <html>
    <head>
      <title>Payment Receipt</title>
      <style>
        @page {
          size: A4;
          margin: 0;
        }
        body {
          font-family: Arial, sans-serif;
          margin: 0;
          padding: 0;
          background-color: #f5f5f5;
        }
        .receipt-container {
          width: 100%;
          max-width: 800px;
          margin: 20px auto;
          padding: 20px;
          background-color: #fff;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          box-sizing: border-box;
        }
        .header {
          text-align: center;
          margin-bottom: 20px;
        }
        .header h1 {
          margin: 5px 0;
          color: #333;
        }
        .content {
          margin-bottom: 20px;
        }
        .content p {
          margin: 5px 0;
        }
        .footer {
          text-align: center;
          margin-top: 20px;
        }
        .footer p {
          margin: 5px 0;
          font-size: 12px;
          color: #666;
        }
      </style>
    </head>
    <body>
      <div class="receipt-container">
        <div class="header">
          <h1>Payment Receipt</h1>
          
        </div>
        <div class="content">
          <p><strong>Name:</strong> ${record.studentName}</p>
          <p><strong>Course Name:</strong> ${record.courseName}</p>
          <p><strong>Date Time:</strong> ${record.dateTime}</p>
          <p><strong>1st Payment:</strong> ${record.firstPayment || '-'}</p>
          <p><strong>2nd Payment:</strong> ${record.secondPayment || '-'}</p>
          <p><strong>3rd Payment:</strong> ${record.thirdPayment || '-'}</p>
          <p><strong>Total Amount:</strong> ${record.totalAmount || '-'}</p>
          <p><strong>Payment Method:</strong> ${record.paymentMethod}</p>
        </div>
        <div class="footer">
        <p>Thank you for your payment</p>
        </div>
      </div>
      <script>
        window.onload = function() {
          window.print();
        }
      </script>
    </body>
  </html>
  `);
    printWindow.document.close();
    printWindow.print();
  };
  // const calculateTotalAmount = (firstPayment, secondPayment, thirdPayment) => {
  //   if (!secondPayment && !thirdPayment) {
  //     return firstPayment || 0;
  //   }
  //   return (firstPayment || 0) + (secondPayment || 0) + (thirdPayment || 0);
  // };

  return (
    <div className="payment-details">
      <Title level={5}>Payment Details</Title>
      <Button type="primary" onClick={showModal} style={{ marginBottom: 16 }}>
        Add Payment
      </Button>
      {selectedRowKeys.length === 1 && (
        <Button type="primary" onClick={handleEdit} style={{ marginBottom: 16, marginLeft: 16 }}>
          Edit
        </Button>
      )}
      {selectedRowKeys.length > 0 && (
        <Button type="danger" onClick={handleDelete} style={{ marginBottom: 16, marginLeft: 16 }}>
          Delete Selected
        </Button>
      )}
      <Modal title={editingPayment ? "Edit Payment" : "Add Payment"} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <Form form={form} layout="vertical">
          <Form.Item name="studentName" label="Student Name" rules={[{ required: true, message: "Please enter student name" }]}>
            <Input />
          </Form.Item>
          <Form.Item name="courseName" label="Course" rules={[{ required: true, message: "Please enter course name" }]}>
            <Input />
          </Form.Item>
          <Form.Item name="paymentOption" label="Payment Option" rules={[{ required: true, message: "Please select payment option" }]}>
            <Select onChange={handlePaymentOptionChange}>
              <Option value="Installment">Installment</Option>
              <Option value="Full">Full Payment</Option>
            </Select>
          </Form.Item>
          {paymentOption === "Installment" && (
            <>
              <Form.Item
                name="firstPayment"
                label="1st Payment"
                rules={[
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (getFieldValue('secondPayment') || getFieldValue('thirdPayment') || getFieldValue('fullPayment')) {
                        return Promise.resolve();
                      }
                      if (!value) {
                        return Promise.reject(new Error('Please enter at least one payment amount'));
                      }
                      return Promise.resolve();
                    },
                  }),
                ]}
              >
                <InputNumber />
              </Form.Item>
              <Form.Item
                name="secondPayment"
                label="2nd Payment"
                rules={[
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (getFieldValue('firstPayment') || getFieldValue('thirdPayment') || getFieldValue('fullPayment')) {
                        return Promise.resolve();
                      }
                      if (!value) {
                        return Promise.reject(new Error('Please enter at least one payment amount'));
                      }
                      return Promise.resolve();
                    },
                  }),
                ]}
              >
                <InputNumber />
              </Form.Item>
              <Form.Item
                name="thirdPayment"
                label="3rd Payment"
                rules={[
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (getFieldValue('firstPayment') || getFieldValue('secondPayment') || getFieldValue('fullPayment')) {
                        return Promise.resolve();
                      }
                      if (!value) {
                        return Promise.reject(new Error('Please enter at least one payment amount'));
                      }
                      return Promise.resolve();
                    },
                  }),
                ]}
              >
                <InputNumber />
              </Form.Item>
            </>
          )}
          {paymentOption === "Full" && (
            <Form.Item
              name="fullPayment"
              label="Full Payment"
              rules={[
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (getFieldValue('firstPayment') || getFieldValue('secondPayment') || getFieldValue('thirdPayment')) {
                      return Promise.resolve();
                    }
                    if (!value) {
                      return Promise.reject(new Error('Please enter at least one payment amount'));
                    }
                    return Promise.resolve();
                  },
                }),
              ]}
            >
              <InputNumber />
            </Form.Item>
          )}
          <Form.Item name="paymentMethod" label="Payment Method" rules={[{ required: true, message: "Please select payment method" }]}>
            <Select>
              <Option value="Credit Card">Credit Card</Option>
              <Option value="Debit Card">Debit Card</Option>
              <Option value="Cash">Cash</Option>
              <Option value="UPI">UPI</Option>
              <Option value="Bank Transfer">Bank Transfer</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
      <div style={{ maxHeight: "400px", overflowY: "auto" }}>
      <Table
        dataSource={paymentDetails}
        columns={[
          { title: "Student Name", dataIndex: "studentName", key: "studentName" },
          { title: "Course", dataIndex: "courseName", key: "courseName" },
          { title: "Date Time", dataIndex: "dateTime", key: "dateTime", render: (text) => moment(text).format("YYYY-MM-DD hh:mm:ss A") },
          // { title: "Payment Option", dataIndex: "paymentOption", key: "paymentOption" },
          { title: "1st Payment", dataIndex: "firstPayment", key: "firstPayment" },
          { title: "2nd Payment", dataIndex: "secondPayment", key: "secondPayment" },
          { title: "3rd Payment", dataIndex: "thirdPayment", key: "thirdPayment" },
          { title: "Full Payment", dataIndex: "fullPayment", key: "fullPayment" },
          { title: "Total Amount", dataIndex: "totalAmount", key: "totalAmount", render: (text) => (text ? `${text}` : "-") },
          { title: "Payment Method", dataIndex: "paymentMethod", key: "paymentMethod" },
          { title: "Print", key: "print", render: (text, record) => (<Button type="link" onClick={() => handlePrint(record)}>Print</Button>) },
        ]}
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

export default Feeform;
