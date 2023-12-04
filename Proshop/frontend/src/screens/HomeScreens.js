import {Row,Col} from "react-bootstrap";
import axios from 'axios'
import {useEffect,useState} from 'react'
import Product from "../componets/Product";
// import Product from "../componets/Product";


const HomeScreens = () => {
  const [products,setProducts] = useState([])
  useEffect(() =>{
      const fetchdata = async () =>{
        const {data} = await axios.get('/api/products');
        setProducts(data)
      };
      fetchdata()
  },[])
  return (
    <>
    <h1>Latest products</h1>
    <Row>
        {products.map((products) => (
            <Col key={products._id} sm={12} md={6} lg={4} xl={3}>
                {/* <h3>{products.name}</h3> */}
                <Product product={products}/> 
            </Col>
        ))}
    </Row>
      
    </>
  )
}

export default HomeScreens
