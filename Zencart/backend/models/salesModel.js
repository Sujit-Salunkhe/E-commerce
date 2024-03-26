import mongoose from "mongoose";



const salesSchema = mongoose.Schema({
    brandsales: {
        Apple: { type: Number, default: 0 },
        Cannon: { type: Number, default: 0 },
        Logitech: { type: Number, default: 0 },
        Amazon: { type: Number, default: 0 },
        Sony: { type: Number, default: 0 }
    }
});

const Sales = mongoose.model('Sales', salesSchema);
export default Sales;
