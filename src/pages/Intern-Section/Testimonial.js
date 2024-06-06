import React, { useState } from 'react';
import { Card, Form, Input, Button, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const TestimonialForm = () => {
    const [form] = Form.useForm();
    const [submittedData, setSubmittedData] = useState(null);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const onFinish = (values) => {
        const updatedData = { ...values, media: values.media?.fileList };
        setSubmittedData(updatedData);
        setIsSubmitted(true);
    };

    return (
        <div style={{ width: "600px", margin: '50px auto', padding: 20, marginTop: "50px" }}>
            <Card 
                title={!isSubmitted && <span style={{ fontSize: '40px' }}>Submit Your Testimonial</span>}
                bordered={false}
            >
                {!isSubmitted ? (
                    <Form 
                        form={form} 
                        layout="vertical" 
                        onFinish={onFinish} 
                        initialValues={submittedData || { testimonial: '', media: [] }}
                    >
                        <Form.Item
                            label="Your Testimonial"
                            name="testimonial"
                            rules={[{ required: true, message: 'Please write your testimonial!' }]}
                        >
                            <Input.TextArea rows={4} />
                        </Form.Item>
                        <Form.Item label="Optional Image/Video" name="media">
                            <Upload beforeUpload={() => false} listType="picture">
                                <Button icon={<UploadOutlined />}>Click to Upload</Button>
                            </Upload>
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" block>
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                ) : (
                    <div className="testimonial-display">
                        {submittedData.media?.length > 0 && (
                            <div className="media-display" style={{ textAlign: 'center', marginBottom: '20px' }}>
                                {submittedData.media.map((file, index) => (
                                    <div key={index}>
                                        {file.type.startsWith('image') && (
                                            <img
                                                src={URL.createObjectURL(file.originFileObj)}
                                                alt={file.name}
                                                style={{ maxWidth: '150px', borderRadius: '50%' }}
                                            />
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                            <h3>Alice George</h3>
                            <p>IT Team</p>
                            {/* <p>Interests - Software Engineering and Web Development, Data Analysis</p> */}
                        </div>
                        <div className="testimonial-text" style={{ textAlign: 'center' }}>
                            <blockquote style={{ fontStyle: 'italic', fontSize: '16px' }}>
                                "{submittedData.testimonial}"
                            </blockquote>
                        </div>
                    </div>
                )}
            </Card>
        </div>
    );
};

export default TestimonialForm;