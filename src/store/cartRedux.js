import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        items: [],
        totalQuantity: 0,
    },
    reducers: {
        addItemToCart(state, action) {
            state.totalQuantity++;
            const newItem = action.payload;
            const existingItem = state.items.find(item => {
                return item.id === newItem.id;
            });
            if (!existingItem) {
                state.items.push({
                    id: newItem.id,
                    price: newItem.price,
                    quantity: 1,
                    totalPrice: newItem.price,
                    name: newItem.title,
                })
            } else {
                existingItem.quantity++;
                existingItem.price = existingItem.price + newItem.price;
            }
        },
        removeItemFromCart(state, action) {
            state.totalQuantity--;
            const id = action.payload;
            const existingItem = state.items.find(item => {
                return item.id === id;
            })
            if (existingItem.quantity === 1) {
                state.items = state.items.filter(item => {
                    return item.id !== id;
                });
            }
            else {
                existingItem.quantity--;
            }
        }
    }
});

export const cartActions = cartSlice.actions;
export default cartSlice;