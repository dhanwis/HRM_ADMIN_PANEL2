import React, { useState } from 'react';
import { Card, Form, Input, Button, Rate, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const TestimonialForm = () => {
    const [form] = Form.useForm();
    const [rating, setRating] = useState(0);
    const [submittedData, setSubmittedData] = useState(null);
    const [isEditMode, setIsEditMode] = useState(true);

    const onFinish = (values) => {
        const updatedData = { ...values, rating, media: values.media?.fileList };
        setSubmittedData(updatedData);
        setIsEditMode(false);
    };

    const handleEdit = () => {
        setIsEditMode(true);
        form.setFieldsValue({ 
            testimonial: submittedData?.testimonial, 
            media: submittedData?.media || [], 
        });
        setRating(submittedData?.rating || 0);
    };

    return (
        <Card 
            title={<span style={{ fontSize: '40px' }}>Submit Your Testimonial</span>}
            bordered={false}
            style={{ width: "600px", margin: '50px auto', padding: 20, marginTop: "200px" }}
        >
            {isEditMode ? (
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
                    <Form.Item label="Rate our services">
                        <Rate onChange={setRating} value={rating} />
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
                <div>
                    {submittedData.media?.length > 0 && (
                        <div>
                            <ul>
                                {submittedData.media.map((file, index) => (
                                    <li key={index}>
                                        {file.type.startsWith('image') ? (
                                            <img
                                                src={URL.createObjectURL(file.originFileObj)}
                                                alt={file.name}
                                                style={{ maxWidth: '100%', height: 'auto' }}
                                            />
                                        ) : (
                                            <span>{file.name}</span>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                    <p style={{ fontStyle: 'italic' }}>"{submittedData.testimonial}"</p>
                    <p><Rate disabled value={submittedData.rating} /></p>
                    <Button type="primary" onClick={handleEdit}>
                        Edit
                    </Button>
                </div>
            )}
        </Card>
    );
};

export default TestimonialForm;
