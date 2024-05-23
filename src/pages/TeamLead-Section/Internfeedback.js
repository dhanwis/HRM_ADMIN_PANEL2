import React, { useState, useEffect } from 'react';
import { Table, Typography, message } from 'antd';
import axios from 'axios';
import moment from 'moment';

const { Title } = Typography;

function FeedbackList() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Replace with your API endpoint
    const fetchFeedbacks = async () => {
      try {
        const response = await axios.get('/api/feedbacks');
        setFeedbacks(response.data);
      } catch (error) {
        message.error('Failed to fetch feedback');
      } finally {
        setLoading(false);
      }
    };

    fetchFeedbacks();
  }, []);

  const columns = [
    {
      title: 'Intern Name',
      dataIndex: 'internName',
      key: 'internName',
    },
    {
      title: 'Feedback',
      dataIndex: 'feedback',
      key: 'feedback',
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      render: (text) => moment(text).format('LL'),
    },
  ];

  return (
    <div className="feedback-list" style={{ paddingTop: '50px' }}>
      <Title level={5}>Intern Feedback</Title>
      <Table
        dataSource={feedbacks}
        columns={columns}
        loading={loading}
        rowKey="id"
        pagination={{ pageSize: 10 }}
      />
    </div>
  );
}

export default FeedbackList;
