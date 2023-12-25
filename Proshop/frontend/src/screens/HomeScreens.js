import { Row, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useGetProductsQuery } from "../slices/productsApiSlice";
import {Link} from 'react-router-dom'
import Product from "../componets/Product";
import Loader from "../componets/Loader";
import Message from "../componets/Message";
import Paginate from "../componets/Paginate";
import {useGetCartItemsQuery} from '../slices/cartApiSlice.js'
import { addToCart } from "../slices/cartSlice.js";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

const HomeScreens = () => {
  const {pageNumber,keyword} = useParams();
  const auth = useSelector(state => state.auth)
  const {userInfo} = auth;
  const dispatch = useDispatch();
  const { data, isLoading, error } = useGetProductsQuery({keyword,pageNumber});
  const {data:cartData,isLoading:cartLoading,refetch} = useGetCartItemsQuery();
  useEffect( () => {
    refetch()
    if (!cartLoading && userInfo && cartData.length > 0 ) {
       cartData.map((x) => dispatch(addToCart({ ...x })));
    }
    
    
}, );
  return (
    <>
      
      {keyword && <Link to='/' className='btn btn-light mb-4'>Go Back</Link> }
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
            {data.products.map((products) => (
              <Col key={products._id} sm={12} md={6} lg={4} xl={3}>
                {/* <h3>{products.name}</h3> */}
                <Product product={products} />
              </Col>
            ))}
          </Row>
          <Paginate pages ={data.pages} page={data.page} keyword={keyword ? keyword : ""}/>
        </>
      )}
    </>
  );
};

export default HomeScreens;
