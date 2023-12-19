import path from 'path'
import express from 'express';
import dotenv from 'dotenv'
import productRoutes from './routes/productRoutes.js';
import {notFound,errorHandler} from './middleware/errorHandler.js'
import connectDB  from './config/db.js';
import cookieParser from 'cookie-parser'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'
dotenv.config()
const port = process.env.PORT || 5000 ;
connectDB();
const app = express()

// body parser middleware
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.get('/',(req,res) => {
    res.send("API  is running...")
});
app.use('/api/products',productRoutes);
app.use('/api/users',userRoutes);
app.use('/api/orders',orderRoutes)
app.get('/api/config/paypal',(req,res) => res.send({clientId : process.env.PAYPAL_CLIENT_ID}))
app.use('/api/upload',uploadRoutes);
const _dirname = path.resolve();
app.use('/uploads' , express.static(path.join(_dirname,'uploads')))
app.use(notFound)
app.use(errorHandler)
app.listen(port,() => {
    console.log(`your app running at port ${port}`)
})