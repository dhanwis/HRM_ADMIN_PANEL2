
import React from "react";
import ReactApexChart from "react-apexcharts";
import { Row, Col, Typography } from "antd";

function PaymentGraph() {
  const { Title } = Typography;

  const conversionRate = 75; // Conversion rate: 1 USD = 75 INR

  const paymentData = [
    {
      date: "2024-05-01",
      amountUSD: 5000,
    },
    {
      date: "2024-05-02",
      amountUSD: 4800,
    },
    {
      date: "2024-05-03",
      amountUSD: 5200,
    },
    // Add more payment data as needed
  ];

  const options = {
    chart: {
      type: "line",
      height: 350,
    },
    xaxis: {
      categories: paymentData.map((data) => data.date),
    },
    yaxis: {
      title: {
        text: "Payment Amount (INR)",
      },
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return "₹" + (val * conversionRate).toFixed(2); // Convert USD to INR
        },
      },
    },
  };

  const series = [
    {
      name: "Payment",
      data: paymentData.map((data) => data.amountUSD * conversionRate), // Convert USD to INR
    },
  ];

  return (
    <>
      <div id="payment-chart">
        <ReactApexChart options={options} series={series} type="line" height={400} />
      </div>
      <div className="payment-summary">
        <Title level={5}>Payment Summary</Title>
        <Row gutter={[16, 16]}>
          {paymentData.map((data, index) => (
            <Col span={8} key={index}>
              <div className="date-summary">
                <Title level={4}>{data.date}</Title>
                <p>Amount: ₹{(data.amountUSD * conversionRate).toFixed(2)}</p> {/* Convert USD to INR */}
              </div>
            </Col>
          ))}
        </Row>
      </div>
    </>
  );
}

export default PaymentGraph;
