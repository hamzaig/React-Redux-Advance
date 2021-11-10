import { createSlice } from "@reduxjs/toolkit";
import { uiActions } from "./uiRedux";

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        items: [],
        totalQuantity: 0,
    },
    reducers: {
        replaceCart(state, action) {
            state.totalQuantity = action.payload.totalQuantity;
            state.items = action.payload.items;
        },
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

export const sendCartData = (cart) => {
    return async (dispatch) => {

        dispatch(uiActions.showNotification({
            status: "Pending",
            title: "Sending ...",
            message: "Sending Cart Data ...",
        }));

        const sendReq = async () => {
            const response = await fetch("https://react-http-c28cc-default-rtdb.firebaseio.com/cart.json", {
                method: "PUT",
                body: JSON.stringify(cart),
            });

            if (!response.ok) {
                throw Error("Something Wrong");
            }
        }

        try {
            await sendReq();
            dispatch(uiActions.showNotification({
                status: "success",
                title: "Success!",
                message: "Sent Cart Data Successfully",
            }));
        } catch (err) {
            dispatch(uiActions.showNotification({
                status: "error",
                title: "Error!",
                message: "Sending Cart Data Failed",
            }));
        }
    }
}

export const fetchCartData = () => {
    return async dispatch => {
        const fetchData = async () => {
            const response = await fetch("https://react-http-c28cc-default-rtdb.firebaseio.com/cart.json");
            if (!response.ok) {
                throw Error("Something Went Wrong");
            }
            const data = await response.json();
            return data;
        }
        try {
            const data = await fetchData();
            dispatch(cartSlice.actions.replaceCart(data));
        } catch (error) {
            dispatch(uiActions.showNotification({
                status: "error",
                title: "Error!",
                message: "Sending Cart Data Failed",
            }));
        }
    }
}

export const cartActions = cartSlice.actions;
export default cartSlice;