// import React, { useState } from 'react';
// import { Card, Form, Input, Button, Upload } from 'antd';
// import { UploadOutlined } from '@ant-design/icons';

// const TestimonialForm = () => {
//     const [form] = Form.useForm();
//     const [submittedData, setSubmittedData] = useState(null);
//     const [isSubmitted, setIsSubmitted] = useState(false);

//     const onFinish = (values) => {
//         const updatedData = { ...values, media: values.media?.fileList };
//         setSubmittedData(updatedData);
//         setIsSubmitted(true);
//     };

//     return (
//         <div style={{ width: "600px", margin: '50px auto', padding: 20, marginTop: "50px" }}>
//             <Card 
//                 title={!isSubmitted && <span style={{ fontSize: '40px' }}>Submit Your Testimonial</span>}
//                 bordered={false}
//             >
//                 {!isSubmitted ? (
//                     <Form 
//                         form={form} 
//                         layout="vertical" 
//                         onFinish={onFinish} 
//                         initialValues={submittedData || { testimonial: '', media: [] }}
//                     >
//                         <Form.Item
//                             label="Your Testimonial"
//                             name="testimonial"
//                             rules={[{ required: true, message: 'Please write your testimonial!' }]}
//                         >
//                             <Input.TextArea rows={4} />
//                         </Form.Item>
//                         <Form.Item label="Optional Image/Video" name="media">
//                             <Upload beforeUpload={() => false} listType="picture">
//                                 <Button icon={<UploadOutlined />}>Click to Upload</Button>
//                             </Upload>
//                         </Form.Item>
//                         <Form.Item>
//                             <Button type="primary" htmlType="submit" block>
//                                 Submit
//                             </Button>
//                         </Form.Item>
//                     </Form>
//                 ) : (
//                     <div className="testimonial-display">
//                         {submittedData.media?.length > 0 && (
//                             <div className="media-display" style={{ textAlign: 'center', marginBottom: '20px' }}>
//                                 {submittedData.media.map((file, index) => (
//                                     <div key={index}>
//                                         {file.type.startsWith('image') && (
//                                             <img
//                                                 src={URL.createObjectURL(file.originFileObj)}
//                                                 alt={file.name}
//                                                 style={{ maxWidth: '150px', borderRadius: '50%' }}
//                                             />
//                                         )}
//                                     </div>
//                                 ))}
//                             </div>
//                         )}
//                         <div style={{ textAlign: 'center', marginBottom: '20px' }}>
//                             <h3>Alice George</h3>
//                             <p>IT Team</p>
//                             {/* <p>Interests - Software Engineering and Web Development, Data Analysis</p> */}
//                         </div>
//                         <div className="testimonial-text" style={{ textAlign: 'center' }}>
//                             <blockquote style={{ fontStyle: 'italic', fontSize: '16px' }}>
//                                 "{submittedData.testimonial}"
//                             </blockquote>
//                         </div>
//                     </div>
//                 )}
//             </Card>
//         </div>
//     );
// };

// export default TestimonialForm;






import React, { useState } from 'react';
import { Container } from '@material-ui/core';

import vector from "../../assets/images/vector_image.png"


const TestimonialForm = () => {
  const [formData, setFormData] = useState({
    testimonial: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.testimonial) errors.testimonial = 'Testimonial is required';
    return errors;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Simulate form submission (replace with your actual submission logic)
    console.log('Submitting feedback:', formData);

    // Reset form after submission
    setFormData({
      testimonial: '',
    });
    setErrors({});
  };

  return (

    <div style={{backgroundImage:`url(${vector})`,height:"650px"}}>

    <Container className="container mt-5" style={{backgroundImage:`url(${vector})`}}>
    
      <h3>Intern Testimonial</h3>
      
      <form onSubmit={handleSubmit} style={{ marginTop: "20px" }}>
        <div className="mb-3">
          <label htmlFor="testimonial" className="form-label">Testimonial</label>
          <textarea
            className={`form-control ${errors.testimonial ? 'is-invalid' : ''}`}
            id="testimonial"
            name="testimonial"
            value={formData.testimonial}
            onChange={handleChange}
            rows="5"
            required
          ></textarea>
          {errors.testimonial && <div className="invalid-feedback">{errors.testimonial}</div>}
        </div>
        <div className="text-center">
          <button type="submit" className="btn btn-primary">Submit</button>
        </div>
      </form>
    </Container>
    </div>
    
  );
};

export default TestimonialForm;
