import { SALES_URL } from "../constants.js";
import { apiSlice } from "./apiSlice.js";
export const salesApiSlice = apiSlice.injectEndpoints({
    endpoints:(builder) => ({
      createSales:builder.mutation ({
            query : ({brand,count}) => ({
                url:SALES_URL,
                method:"POST",
                body:{brand,count}
            })
      })        
    })
})

export const {useCreateSalesMutation} = salesApiSlice;
