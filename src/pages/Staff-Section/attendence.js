import React, { useEffect, useState } from 'react';
import { Table, Space, DatePicker } from 'antd';
import axios from 'axios';

const { RangePicker } = DatePicker;

const AttendanceTable = () => {
  const [attendanceData, setAttendanceData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchAttendanceData();
  }, []);

  const fetchAttendanceData = async () => {
    setLoading(true);
    try {
      // Example API request to fetch attendance data from backend
      const response = await axios.get('/api/attendance');
      setAttendanceData(response.data);
    } catch (error) {
      console.error('Error fetching attendance data:', error);
    }
    setLoading(false);
  };

  // Mocked sample data for demonstration
  const sampleAttendanceData = [
    {
      id: 1,
      date: '2024-05-01',
      time: '09:00 AM',
      present: true,
    },
    {
      id: 2,
      date: '2024-05-05',
      time: '09:30 AM',
      present: false,
    },
    {
      id: 3,
      date: '2024-05-10',
      time: '10:00 AM',
      present: true,
    },
    {
      id: 4,
      date: '2024-05-15',
      time: '09:15 AM',
      present: true,
    },
  ];

  const filteredData = sampleAttendanceData.filter((record) => {
    const currentDate = new Date(record.date);
    const currentMonth = new Date().getMonth();
    return currentDate.getMonth() === currentMonth;
  });

  const columns = [
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Time',
      dataIndex: 'time',
      key: 'time',
    },
    {
      title: 'Present',
      dataIndex: 'present',
      key: 'present',
      render: (present) => (present ? 'Yes' : 'No'),
    },
  ];

  return (
    <div style={{ paddingTop: "50px" }}>
      <h2>Monthly Attendance</h2>
      <RangePicker picker="month" disabledDate={(current) => current > new Date()} />
      <Table
        dataSource={filteredData}
        columns={columns}
        rowKey={(record) => record.id.toString()} // Assuming `id` is unique and of type string/number
        loading={loading}
        pagination={{ pageSize: 10 }} // Customize pagination as needed
      />
    </div>
  );
};

export default AttendanceTable;
