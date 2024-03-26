import asyncHandler from "../middleware/asyncHandler.js";
import Sales from "../models/salesModel.js";

export const addBrandSales = asyncHandler(async(req,res) => {
const {brand,count} = req.body
try {
const sales = Sales.findOne();
sales.brandsales[brand] += count;
await sales.save();
}
catch(err){
    console.log(err)
}
})

 