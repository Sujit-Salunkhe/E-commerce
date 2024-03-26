import { apiSlice } from "./apiSlice";
import { CART_URL } from "../constants";

const cartApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createCart:builder.mutation({
            query:(cartItems) => ({
                url: CART_URL,
                method:'POST', 
                body: cartItems
            }),
            
        }),
        getCartItems:builder.query({
            query:() => ({
                url:CART_URL
            }),
            keepUnusedDataFor:5,
            providesTags:['Cart']
        }),
        deleteCartItem:builder.mutation({
            query:(id) => ({
                url:`${CART_URL}/${id}`,
                method:'DELETE',
            }),
            invalidatesTags:['Cart']
        })
    })
})


export const {useCreateCartMutation ,useGetCartItemsQuery ,useDeleteCartItemMutation} = cartApiSlice;