import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AddProduct from './pages/AddProduct';
import Shop from './pages/Shop';

const router = createBrowserRouter([
  {
    path: "/shop",
    element: <Shop />
  },
  {
    path: "/add-product",
    element: <AddProduct />
  }
])

function App() {
  return (
    <RouterProvider router={router}>

    </RouterProvider>
  );
}

export default App;
