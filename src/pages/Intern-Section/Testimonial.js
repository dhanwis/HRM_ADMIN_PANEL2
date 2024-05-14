import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Rate, Card, Modal, Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
// import './TestimonialForm.css'; // Import your custom CSS file for additional styling

const TestimonialForm = () => {
  const [form] = Form.useForm();
  const [rating, setRating] = useState(0);
  const [submittedData, setSubmittedData] = useState(null);
  const [isEditVisible, setIsEditVisible] = useState(false);
  const [fileList, setFileList] = useState([]);

  useEffect(() => {
    // Retrieve data from local storage if available
    const savedData = localStorage.getItem('submittedData');
    if (savedData) {
      setSubmittedData(JSON.parse(savedData));
    }
  }, []);

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  const onFinish = (values) => {
    const testimonialData = { ...values, rating, photo: fileList[0]?.name || null };
    setSubmittedData(testimonialData);
    localStorage.setItem('submittedData', JSON.stringify(testimonialData));
    form.resetFields();
    setRating(0);
    setFileList([]);
  };

  const handleEdit = () => {
    setIsEditVisible(true);
  };

  const handleEditFinish = (values) => {
    const editedData = { ...values, rating, photo: fileList[0]?.name || null };
    setSubmittedData(editedData);
    localStorage.setItem('submittedData', JSON.stringify(editedData));
    setIsEditVisible(false);
  };

  const uploadProps = {
    fileList,
    beforeUpload: (file) => {
      setFileList([file]);
      return false;
    },
    onChange: (info) => {
      const { status } = info.file;
      if (status === 'done') {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  return (
    
    <div className="testimonial-form-container">
      <h2>Submit Your Testimonial</h2>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={submittedData}
      >
        <Form.Item
          name="name"
          label="Your Name"
          rules={[{ required: true, message: 'Please input your name!' }]}
        >
          <Input disabled={submittedData} />
        </Form.Item>
        <Form.Item
          name="position"
          label="Your Position"
          rules={[{ required: true, message: 'Please input your position!' }]}
        >
          <Input disabled={submittedData} />
        </Form.Item>
        <Form.Item
          name="text"
          label="Your Review"
          rules={[{ required: true, message: 'Please input your review!' }]}
        >
          <Input.TextArea disabled={submittedData} />
        </Form.Item>
        <Form.Item
          name="rating"
          label="Your Rating"
          rules={[{ required: true, message: 'Please give a rating!' }]}
        >
          <Rate allowHalf onChange={handleRatingChange} disabled={submittedData} />
        </Form.Item>
        <Form.Item
          name="photo"
          label="Your Photo"
        >
          <Upload {...uploadProps}>
            <Button icon={<UploadOutlined />}>Upload Photo</Button>
          </Upload>
        </Form.Item>
        {!submittedData && (
          <Form.Item>
            <Button type="primary" htmlType="submit" className="submit-button">
              Submit
            </Button>
          </Form.Item>
        )}
        {submittedData && (
          <>
            <Button type="primary" onClick={handleEdit} className="edit-button">
              Edit
            </Button>
            <Modal
              title="Edit Testimonial"
              visible={isEditVisible}
              onCancel={() => setIsEditVisible(false)}
              footer={[
                <Button key="cancel" onClick={() => setIsEditVisible(false)}>
                  Cancel
                </Button>,
                <Button key="submit" type="primary" onClick={() => form.submit()}>
                  Save
                </Button>,
              ]}
            >
              <Form
                form={form}
                layout="vertical"
                onFinish={handleEditFinish}
                initialValues={submittedData}
              >
                <Form.Item
                  name="name"
                  label="Your Name"
                  rules={[{ required: true, message: 'Please input your name!' }]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name="position"
                  label="Your Position"
                  rules={[{ required: true, message: 'Please input your position!' }]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name="text"
                  label="Your Review"
                  rules={[{ required: true, message: 'Please input your review!' }]}
                >
                  <Input.TextArea />
                </Form.Item>
                <Form.Item
                  name="rating"
                  label="Your Rating"
                  rules={[{ required: true, message: 'Please give a rating!' }]}
                >
                  <Rate allowHalf onChange={handleRatingChange} />
                </Form.Item>
                <Form.Item
                  name="photo"
                  label="Your Photo"
                >
                  <Upload {...uploadProps}>
                    <Button icon={<UploadOutlined />}>Upload Photo</Button>
                  </Upload>
                </Form.Item>
              </Form>
            </Modal>
          </>
        )}
      </Form>
      {submittedData && (
        <Card className="submitted-card" title="Submitted Testimonial">
          <img src={`https://via.placeholder.com/150/${submittedData.photo}`} alt="Profile" className="profile-image" />
          <p><strong>Name:</strong> {submittedData.name}</p>
          <p><strong>Position:</strong> {submittedData.position}</p>
          <p><strong>Review:</strong> {submittedData.text}</p>
          <p><strong>Rating:</strong> <Rate disabled defaultValue={submittedData.rating} /></p>
        </Card>
      )}
    </div>
  );
};

export default TestimonialForm;
