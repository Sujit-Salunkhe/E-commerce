import React from 'react'
import { Card, CardBody } from 'react-bootstrap'
// import products from '../products'

const Product = ({product}) => {
  return (
    <Card className='my-3 p-3 rounded'>
        <a href={`/product/${product.id}`}>
            <Card.Img src={product.image} variant='top'/>
        </a>
        <CardBody>
            <a href={`/product/${product.id}`}>
                <Card.Title as ="div">
                     <strong>{product.name}</strong>
                </Card.Title>
            </a>
            <Card.Text as='h3'>
                ${product.price}
            </Card.Text>
        </CardBody>
    </Card>
  )
}

export default Product
