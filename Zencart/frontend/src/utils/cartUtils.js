export const addDecimals = num => {
    return (Math.round(num * 100) / 100).toFixed(2)
};


export const  updateCart = (state) => {
     // calculate items price
    state.itemsPrice = addDecimals(state.cartItems.reduce((acc,item) => acc + item.price * item.qty,0));
    //  calculate shipping price (if order over 100 doller is free,else $10 for shipping)
    state.shippingPrice = (state.itemsPrice > 100 ? "Free" : 10)
    //  calculate tax  price (15% tax)
    state.taxPrice = addDecimals(Number((0.15 * state.itemsPrice ).toFixed(2)))
    //  calculate total price price
    state.totalPrice = (
        Number(state.itemsPrice) + 
        Number(state.shippingPrice  === Number ? state.shippingPrice : 0 ) +
        Number(state.taxPrice)
    ).toFixed(2);
    localStorage.setItem('cart',JSON.stringify(state))

    return state
}