import express from 'express';
import products from './data/products.js'
import dotenv from 'dotenv'
dotenv.config()
const port = process.env.PORT || 5000 ;

const app = express()

app.get('/',(req,res) => {
    res.send("API  is runnigng")
});

app.get('/api/products',(req,res) => {
    res.json(products)
})

app.get('/api/products/:id',(req,res) => {
    const {id} = req.params
    const product = products.find(p => p._id === Number(id))
    res.json(product)
})

app.listen(port,() => {
    console.log(`your app running at port ${port}`)
})