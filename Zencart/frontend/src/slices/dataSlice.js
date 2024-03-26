import { createSlice } from "@reduxjs/toolkit";


const initialState = localStorage.getItem('Sales') ? JSON.parse(localStorage.getItem('Sales')) : {
    Apple : 0,
    Cannon : 0,
    Logitech : 0,
    Amazon: 0, 
    Sony:0 
}
const dataSliceReducer = createSlice(
    {
        name:'Sales',
        initialState,
        reducers:{
            increaseTheNumber:(state,action) => {
                state[action.payload.payload] += action.payload.count;
                localStorage.setItem('Sales',JSON.stringify(state))
            }
        }
    }
)
export const {increaseTheNumber} = dataSliceReducer.actions
export default dataSliceReducer.reducer

