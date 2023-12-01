import {Row,Col} from "react-bootstrap";
import products from "../products";
import React from 'react'
import Product from "../componets/Product";
// import Product from "../componets/Product";

const HomeScreens = () => {
  return (
    <>
    <h1>Latest products</h1>
    <Row>
        {products.map((products) => (
            <Col key={products.id} sm={12} md={6} lg={4} xl={3}>
                {/* <h3>{products.name}</h3> */}
                <Product product={products}/>
            </Col>
        ))}
    </Row>
      
    </>
  )
}

export default HomeScreens
