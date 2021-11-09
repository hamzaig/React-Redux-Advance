import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import Notification from './components/UI/Notification';
import { uiActions } from './store/uiRedux';

let isInitail = true;

function App() {
  const showCart = useSelector(state => state.ui.cartIsVisible);
  const cart = useSelector(state => state.cart);
  const dispatch = useDispatch();
  const notification = useSelector(state => state.ui.notification)

  useEffect(() => {
    const sendCartData = async () => {

      dispatch(uiActions.showNotification({
        status: "Pending",
        title: "Sending ...",
        message: "Sending Cart Data ...",
      }));

      const response = await fetch("https://react-http-c28cc-default-rtdb.firebaseio.com/cart.json", {
        method: "PUT",
        body: JSON.stringify(cart),
      });

      if (!response.ok) {
        dispatch(uiActions.showNotification({
          status: "error",
          title: "Error!",
          message: "Sending Cart Data Failed",
        }));
        return;
      }

      dispatch(uiActions.showNotification({
        status: "success",
        title: "Success!",
        message: "Sent Cart Data Successfully",
      }));
    }

    if (isInitail) {
      isInitail = false;
      return;
    }

    sendCartData();

  }, [cart, dispatch])

  return (
    <>
      {notification && <Notification {...notification} />}
      <Layout>
        {showCart && <Cart />}
        <Products />
      </Layout>
    </>
  );
}

export default App;
