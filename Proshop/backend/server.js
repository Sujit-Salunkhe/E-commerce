import express from 'express';
import dotenv from 'dotenv'
import productRoutes from './routes/productRoutes.js';
import {notFound,errorHandler} from './middleware/errorHandler.js'
import connectDB  from './config/db.js';
dotenv.config()
const port = process.env.PORT || 5000 ;
connectDB();
const app = express()

app.get('/',(req,res) => {
    res.send("API  is runnigng")
});
app.use('/api/products',productRoutes);
app.use(notFound)
app.use(errorHandler)
app.listen(port,() => {
    console.log(`your app running at port ${port}`)
})