import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Home from "./pages/Home/Home.tsx";
import NotFound from "./pages/NotFound/NotFound.tsx";
import Layout from "./components/Layout/Layout.tsx";
import About from "./pages/About/About.tsx";
import Category from "./pages/Category/Category.tsx";

//import styles from './App.module.scss'


const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "about", element: <About /> },
      { path: "category/:categoryId", element: <Category /> },
      /*{ path: "product/:productId", element: <ProductDetails /> },*/
      { path: "*", element: <NotFound /> },
    ],
  },
]);

function App() {

  return <RouterProvider router={router} />;
}

export default App
