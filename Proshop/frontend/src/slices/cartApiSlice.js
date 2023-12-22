import { apiSlice } from "./apiSlice";
import { CART_URL } from "../constants";

const cartApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createCart:builder.mutation({
            query:(cartItems) => ({
                url: CART_URL,
                method:'POST', 
                body: cartItems
            })
        })
    })
})


export const {useCreateCartMutation} = cartApiSlice;