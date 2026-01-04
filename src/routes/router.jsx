import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import Post from "../pages/Post";
import Login from "../pages/Login";

// export const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <RootLayout />,
//     children: [
//       { index: true, element: <Home />, loader: shopLoader, },
//       { path: "shop", element: <Shop />, loader: shopLoader, },
//       { path: "product/:id", element: <Product />, loader: shopLoader, },
//     ],
//   },
// ]);

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/post/:postId",
    element: <Post />,
  },
]);