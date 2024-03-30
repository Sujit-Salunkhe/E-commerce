import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { useGetOrdersQuery } from "../../slices/orderApiSlice";

const DataScreen = () => {
  const { data: orders, isLoading } = useGetOrdersQuery();
  const [apple, setApple] = useState(0);
  const [logitech, setLogitech] = useState(0);
  const [amazon, setAmazon] = useState(0);
  const [cannon, setCannon] = useState(0);
  const [sony, setSony] = useState(0);
  const [render, setRender] = useState(false);

  useEffect(() => {
    const calculateTotals = () => {
      if (!isLoading && orders) {
        let appleTotal = 0;
        let logitechTotal = 0;
        let cannonTotal = 0;
        let sonyTotal = 0;
        let amazonTotal = 0;

        orders.forEach((order) => {
          order.orderItems.forEach((item) => {
            switch (item.brand) {
              case "Apple":
                appleTotal += item.price;
                break;
              case "Logitech":
                logitechTotal += item.price;
                break;
              case "Cannon":
                cannonTotal += item.price;
                break;
              case "Sony":
                sonyTotal += item.price;
                break;
              case "Amazon":
                amazonTotal += item.price;
                break;
              default:
                break;
            }
          });
        });
        setRender(true)
        setApple(appleTotal);
        setLogitech(logitechTotal);
        setCannon(cannonTotal);
        setSony(sonyTotal);
        setAmazon(amazonTotal);
      }
    };

    calculateTotals();
  }, [isLoading, orders]);

  const data = {
    labels: ["Apple", "Logitech", "Amazon", "Cannon", "Sony"],
    datasets: [
      {
        data: [apple, logitech, amazon, cannon, sony],
        backgroundColor: ["RoyalBlue", "Red", "Green", "Yellow", "Purple"],
      },
    ],
  };
  ChartJS.register(ArcElement, Tooltip, Legend);
  return render ? (
    <Container>
      <Row md={8}>
        <Col className=" border border-primary" xs={1} md={4} lg={4}>
          <Col
            className="text-center"
            style={{ fontSize: "24px", color: "gray", fontWeight: "bold" }}
          >
            Brand Sales In Rs (₹)
          </Col>
          <hr />
          <Col>
            <Doughnut data={data} />
          </Col>
        </Col>
      </Row>
    </Container>
  ) : (
    <p className="text-center" style={{ fontSize: "24px", color: "gray", fontWeight: "bold" }}>There is no Sales</p>
    );
};

export default DataScreen;
