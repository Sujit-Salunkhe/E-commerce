import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Form, Button, Col } from "react-bootstrap";
import CheckoutSteps from "../componets/CheckOutSteps.js";
import FormContainer from "../componets/FormContainer.js";
import { savePaymentMethod } from "../slices/cartSlice.js";
const PaymentScreen = () => {
  const [paymentMethod, setPaymentMethod] = useState("gpay");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  useEffect(() => {
    if (!shippingAddress) {
      navigate("/shipping");
    }
  }, [shippingAddress, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    navigate("/placeorder");
  };
  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 />
      <h1>Payment Method</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group>
          <Form.Label as="legend">Select Method</Form.Label>
          <Col>
            <Form.Check
              type="radio"
              className="my-2"
              label="Paypal or Credit Card"
              id="Paypal"
              name="paymentMethod"
              value="Paypal"
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></Form.Check>
          </Col>
        </Form.Group>
        <Form.Group>
          <Col>
            <Form.Check
              type="radio"
              className="my-2"
              label="G-pay"
              id="G-pay"
              name="paymentMethod"
              value="G-pay"
              //  checked = {paymentMethod === 'G-pay'}
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></Form.Check>
          </Col>
        </Form.Group>
        <Button type="submit" variant="primary">
          {" "}
          Continue{" "}
        </Button>
      </Form>
    </FormContainer>
  );
};

export default PaymentScreen;
