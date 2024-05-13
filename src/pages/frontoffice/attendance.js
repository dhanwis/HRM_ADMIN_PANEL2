import React, { useEffect, useState } from 'react';
import { Table, Space, DatePicker } from 'antd';
import axios from 'axios';

const { RangePicker } = DatePicker;

const Attendanceview = () => {
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

  // Filter function to exclude Sundays and entries not in the current month
  const isWorkingDay = (dateString) => {
    const date = new Date(dateString);
    return date.getDay() !== 0 && date.getMonth() === new Date().getMonth();
  };

  const filteredData = attendanceData.filter((record) =>
    isWorkingDay(record.date)
  );

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
    <div style={{paddingTop:"50px"}}>
      <h2>Monthly Attendance</h2>
      <RangePicker picker="month" disabledDate={(current) => current > new Date()} />
      <Table
        dataSource={filteredData}
        columns={columns}
        rowKey={(record) => record.id} // Adjust based on your data structure
        loading={loading}
        pagination={{ pageSize: 10 }} // Customize pagination as needed
      />
    </div>
  );
};

export default Attendanceview;