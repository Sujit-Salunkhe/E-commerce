import { Link, useParams } from "react-router-dom";
import products from "../products";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  button,
  ListGroupItem,
  Button,
} from "react-bootstrap";
import Rating from "../componets/Rating";
const ProductScreen = () => {
  const { id:productId } = useParams();
  const product = products.find((p) => p._id === Number(productId));
  console.log(product)
  return (
    <>
      <Link className="btn btn-light my-3" to="/">
        Go Back
      </Link>
      <Row>
        <Col md={5}>
          <Image src={product.image} alt={product.name} fluid />
        </Col>
        <Col md={4}>
          <ListGroup variant="flush">
            <ListGroupItem>
              <h3>{product.name}</h3>
            </ListGroupItem>
            <ListGroupItem>
              <Rating
                value={product.rating}
                text={`${product.numReviews} reviews`}
              />
            </ListGroupItem>
          <ListGroup.Item>price:{product.price}</ListGroup.Item>
          <ListGroup.Item>Description:{product.description}</ListGroup.Item>
          </ListGroup>
          
        </Col>
        <Col md={3}>
            <Card>
                <ListGroup variant="flush">
                    <ListGroupItem>
                        <Row>
                            <Col>Price:</Col>
                            <Col>
                            <strong>${product.price}</strong>
                            </Col>
                        </Row>
                    </ListGroupItem>
                    <ListGroupItem>
                        <Row>
                            <Col>Status:</Col>
                            <Col>
                            <strong>{product.countInStock > 0 ? 'In Stock':"Out of Stock"}</strong>
                            </Col>
                        </Row>
                    </ListGroupItem>
                        <ListGroupItem>
                            <Button className="btn-block"
                            type="button"
                            disabled={product.countInStock === 0}>Add To Cart</Button>
                        </ListGroupItem>

                </ListGroup>
            </Card>
        </Col>
      </Row>
    </> 
  );
};

export default ProductScreen;
