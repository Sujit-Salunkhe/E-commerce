import { Row, Col } from "react-bootstrap";
import { useGetProductsQuery } from "../slices/productsApiSlice";
import Product from "../componets/Product";
import Loader from "../componets/Loader";
import Message from "../componets/Message";
// import Product from "../componets/Product";

const HomeScreens = () => {
  const { data: products, isLoading, error } = useGetProductsQuery();
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : error ? (
        
          <Message variant='danger'>
          {error?.data?.message || error.error}
          </Message>
      ) : (
        <>
          <h1>Latest products</h1>
          <Row>
            {products.map((products) => (
              <Col key={products._id} sm={12} md={6} lg={4} xl={3}>
                {/* <h3>{products.name}</h3> */}
                <Product product={products} />
              </Col>
            ))}
          </Row>
        </>
      )}
    </>
  );
};

export default HomeScreens;
