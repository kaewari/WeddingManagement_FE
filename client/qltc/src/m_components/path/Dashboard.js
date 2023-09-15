import
    {
        ArcElement,
        BarElement,
        CategoryScale,
        Chart as ChartJS,
        Legend,
        LinearScale,
        Tooltip,
    } from "chart.js";
import { useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { Bar, Doughnut } from "react-chartjs-2";
import { authApi, endpoints } from "../../configs/Apis";

ChartJS.register(
  BarElement,
  ArcElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const [revenueByYear, setrevenueByYear] = useState([]);
  const [revenueByDate, setrevenueByDate] = useState([]);
  const [year, setYear] = useState(2021);
  const [fromDate, setFromDate] = useState();
  const [toDate, setToDate] = useState();
  const getRevenueByYear = (e) => {
    e.preventDefault();
    const process = async () => {
      let { data } = await authApi().get(endpoints["revenue-year"], {
        params: {
          year: year,
        },
      });
      setrevenueByYear(data);
    };
    process();
  };
  const getRevenueByDateRange = (e) => {
    e.preventDefault();
    const process = async () => {
      let { data } = await authApi().get(endpoints["revenue-date"], {
        params: {
          fromDateTime: fromDate,
          toDateTime: toDate,
        },
      });
      setrevenueByDate(data);
    };
    process();
  };
  const getQuaterRevenueByYear = () => {
    var getRevenue = [];
    var getQuater = [];
    for (var i = 0; i < revenueByYear.length; i++) {
      getQuater.push(revenueByYear[i][0]);
      getRevenue.push(revenueByYear[i][1]);
    }
    var dataObject = { getRevenue: getRevenue, getQuater: getQuater };
    return dataObject;
  };
  const getOrderRevenueByDateRange = () => {
    var getRevenue = [];
    var getOrderId = [];
    for (var i = 0; i < revenueByDate.length; i++) {
      getOrderId.push(revenueByDate[i][0]);
      getRevenue.push(revenueByDate[i][1]);
    }
    var dataObject = { getRevenue: getRevenue, getOrderId: getOrderId };
    return dataObject;
  };
  const data = {
    labels: getQuaterRevenueByYear().getQuater,
    datasets: [
      {
        label: "revenue",
        data: getQuaterRevenueByYear().getRevenue,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(255, 205, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(201, 203, 207, 0.2)",
        ],
        borderColor: [
          "rgb(255, 99, 132)",
          "rgb(255, 159, 64)",
          "rgb(255, 205, 86)",
          "rgb(75, 192, 192)",
          "rgb(54, 162, 235)",
          "rgb(153, 102, 255)",
          "rgb(201, 203, 207)",
        ],
        borderWidth: 2,
        borderRadius: 5,
      },
    ],
  };
  const data1 = {
    labels: getOrderRevenueByDateRange().getOrderId,
    datasets: [
      {
        label: "revenue",
        data: getOrderRevenueByDateRange().getRevenue,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(255, 205, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(201, 203, 207, 0.2)",
        ],
        borderColor: [
          "rgb(255, 99, 132)",
          "rgb(255, 159, 64)",
          "rgb(255, 205, 86)",
          "rgb(75, 192, 192)",
          "rgb(54, 162, 235)",
          "rgb(153, 102, 255)",
          "rgb(201, 203, 207)",
        ],
      },
    ],
  };
  const options = {};
  return (
    <>
      <Form onSubmit={getRevenueByYear}>
        <Row>
          <Col xs={12} md={2}>
            <Form.Group>
              <Form.Label>Year</Form.Label>
              <Form.Control
                type="number"
                value={year}
                onChange={(e) => {
                  setYear(e.target.value);
                }}
                required={true}
              />
            </Form.Group>
          </Col>
          <Col xs={12} md={3}>
            <Form.Group>
              <Form.Label>Doanh thu quý theo năm</Form.Label>
              <Form.Control
                type="submit"
                value={"Tìm kiếm"}
                className="btn btn-info text-white"
              />
            </Form.Group>
          </Col>
        </Row>
      </Form>
      <Form onSubmit={getRevenueByDateRange}>
        <Row>
          <Col xs={12} md={5}>
            <Form.Group onSubmit={""}>
              <Form.Label>From date</Form.Label>
              <Form.Control
                id="fromDateId"
                type="date"
                value={fromDate}
                onChange={(e) => {
                  setFromDate(e.target.value);
                }}
                required={true}
              />
            </Form.Group>
          </Col>
          <Col xs={12} md={5}>
            <Form.Group>
              <Form.Label>To date</Form.Label>
              <Form.Control
                id="toDateId"
                type="date"
                value={toDate}
                onChange={(e) => {
                  setToDate(e.target.value);
                }}
                required={true}
              />
            </Form.Group>
          </Col>
          <Col xs={12} md={2}>
            <Form.Group>
              <Form.Label>Doanh thu theo ngày</Form.Label>
              <Form.Control
                className="btn btn-info text-white"
                id="submitRevenueId"
                type="submit"
                value={"Tìm kiếm"}
              />
            </Form.Group>
          </Col>
        </Row>
      </Form>
      <Row>
        <Col xs={12} md={6}>
          <Bar data={data} options={options}></Bar>
        </Col>
        <Col xs={12} md={6}>
          <Doughnut data={data1} options={options}></Doughnut>
        </Col>
      </Row>
    </>
  );
};

export default Dashboard;
