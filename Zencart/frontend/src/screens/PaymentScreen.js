import {  useEffect,useState} from "react";
import {  useSelector,useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Form, Button, Col } from "react-bootstrap";
import CheckoutSteps from "../componets/CheckOutSteps.js";
import FormContainer from "../componets/FormContainer.js";
import { savePaymentMethod } from "../slices/cartSlice.js";

const PaymentScreen = () => {
  const [paymentMethod, setPaymentMethod] = useState('Paypal');
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
              checked 
              onChange={(e) => setPaymentMethod(e.target.value)}
              
            ></Form.Check>
          </Col>
        </Form.Group>
    
        <Button type="submit" variant="primary" >
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};

export default PaymentScreen;
