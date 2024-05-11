import ReactApexChart from "react-apexcharts";
import { Row, Col, Typography } from "antd";

function EChart() {
  const { Title } = Typography;

  const attendanceData = [
    {
      date: "2024-05-01",
      present: 50,
      absent: 10,
    },
    {
      date: "2024-05-02",
      present: 48,
      absent: 12,
    },
    {
      date: "2024-05-03",
      present: 52,
      absent: 8,
    },
    // Add more attendance data as needed
  ];

  const options = {
    chart: {
      type: "bar",
      height: 350,
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "55%",
        endingShape: "rounded",
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 0.2,
      colors: ["blue"],
    },
    xaxis: {
      categories: attendanceData.map((data) => data.date),
    },
    yaxis: {
      title: {
        text: "Attendance",
      },
    },
    fill: {
      opacity: 1,
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return val + " employee";
        },
      },
    },
  };

  const series = [
    {
      name: "Present",
      data: attendanceData.map((data) => data.present),
    },
    {
      name: "Absent",
      data: attendanceData.map((data) => data.absent),
    },
  ];

  return (
    <>
      <div id="attendance-chart">
        <ReactApexChart options={options} series={series} type="bar" height={400} />
      </div>
      <div className="attendance-summary">
        <Title level={5}>Attendance Summary</Title>
        <Row gutter={[16, 16]}>
          {attendanceData.map((data, index) => (
            <Col span={8} key={index}>
              <div className="date-summary">
                <Title level={4}>{data.date}</Title>
                <p>Present: {data.present}</p>
                <p>Absent: {data.absent}</p>
              </div>
            </Col>
          ))}
        </Row>
      </div>
    </>
  );
}

export default EChart;