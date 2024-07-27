import React, { useState, useEffect } from "react";
import { Table, Typography, message } from "antd";
import axios from "axios";
import moment from "moment";
import iternbg from "../../assets/images/vectorteam5.png";
import { baseUrl } from "../../url";

const { Title } = Typography;

function FeedbackList() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("authToken");

  useEffect(() => {
    // Replace with your API endpoint
    const fetchFeedbacks = async () => {
      try {
        let x = await axios.get(`${baseUrl}/intern/feedback/`, {
          headers: { Authorization: `Token ${token}` },
        });

        if (x.status === 200) {
          console.log("feedback", x.data);
          setFeedbacks(x.data);
        }
      } catch (error) {
        message.error("Failed to fetch feedback");
      } finally {
        setLoading(false);
      }
    };

    fetchFeedbacks();
  }, [token]);

  const columns = [
    {
      title: "Intern Name",
      dataIndex: "username",
      key: "internName",
    },
    {
      title: "Feedback",
      dataIndex: "feedback",
      key: "feedback",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (text) => moment(text).format("LL"),
    },
  ];

  return (
    <div style={{ backgroundImage: `url(${iternbg})`, height: "700px" }}>
      <div className="feedback-list" style={{ paddingTop: "50px" }}>
        <Title level={5}>Intern Feedback</Title>
        <Table
          dataSource={feedbacks}
          columns={columns}
          loading={loading}
          rowKey="id"
          pagination={{ pageSize: 10 }}
        />
      </div>
    </div>
  );
}

export default FeedbackList;
