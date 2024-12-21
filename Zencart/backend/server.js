import path from 'path'
import express from 'express';
import dotenv from 'dotenv'
import productRoutes from './routes/productRoutes.js';
import {notFound,errorHandler} from './middleware/errorHandler.js'
import connectDB  from './config/db.js';
import cookieParser from 'cookie-parser'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import cartRoutes from './routes/cartRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'
import salesRoutes from './routes/salesRoutes.js'
import cors from 'cors'

const envpath = path.resolve(
    "C:\\Users\\Sujit\\OneDrive\\Desktop\\Practice\\project\\E-commerce-Zencart\\Zencart\\.env"
)
dotenv.config({
    path:envpath
})
// console.log(process.env.port)
const port = process.env.PORT || 8000 ;
connectDB();
const app = express()
// body parser middleware
app.use(cors())
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended:true}))



app.use('/api/products',productRoutes);
app.use('/api/users',userRoutes);
app.use('/api/orders',orderRoutes);
app.use('/api/cart', cartRoutes );
app.use('/api/sales',salesRoutes)
app.use('/api/upload',uploadRoutes);
app.get('/api/config/paypal',(req,res) => res.send({clientId : process.env.PAYPAL_CLIENT_ID}))
const __dirname = path.resolve();
app.use('/uploads',express.static(path.join(__dirname,'uploads')))
if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname,'/frontend/build')))
    app.get('*',(req,res) =>{
        res.sendFile(path.resolve(__dirname,'frontend','build','index.html'))
    });
}else{
    app.get('/',(req,res) => {
        res.send("API  is running...")
    });
}
app.use(notFound)
app.use(errorHandler)
app.listen(port,() => {
    console.log(`your app running at port ${port}`)
})