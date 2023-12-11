import express from 'express';
import dotenv from 'dotenv'
import productRoutes from './routes/productRoutes.js';
import {notFound,errorHandler} from './middleware/errorHandler.js'
import connectDB  from './config/db.js';
import cookieParser from 'cookie-parser'
import userRoutes from './routes/userRoutes.js'
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
app.use(notFound)
app.use(errorHandler)
app.listen(port,() => {
    console.log(`your app running at port ${port}`)
})