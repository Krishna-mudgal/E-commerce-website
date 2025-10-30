import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AddProduct from './pages/AddProduct';
import Shop from './pages/Shop';
import Home from './pages/HomePage';
import Checkout from './pages/CheckoutPage';
import Success from './pages/SuccessPage';

const router = createBrowserRouter([
  { 
    path: "/",
    element: <Home />
  },
  {
    path: "/shop",
    element: <Shop />
  },
  {
    path: "/add-product",
    element: <AddProduct />
  },
  {
    path: "/checkout/:productId",
    element: <Checkout />
  },
  {
    path: "/success",
    element: <Success />
  }
])

function App() {
  return (
    <RouterProvider router={router}>

    </RouterProvider>
  );
}

export default App;
