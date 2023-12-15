import {Link,useParams} from  'react-router-dom';
import {Row,Col,ListGroup,Image,Form,Button,Card}  from 'react-bootstrap';
import Message from '../componets/Message.js';
import Loader from '../componets/Loader.js';
import { useGetOrderDetailsQuery } from '../slices/orderApiSlice.js'
import React from 'react'

const OrderScreen = () => {
    const {id:orderId} = useParams();  
    const {data:order,refetch,isLoading,isError} = useGetOrderDetailsQuery(orderId)
    console.log(order)
  return (
    <div>
      
    </div>
  )
}

export default OrderScreen
