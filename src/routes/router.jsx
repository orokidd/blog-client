import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import Post from "../pages/Post";
import Login from "../pages/Login";
import Register from "../pages/Register";
import AdminDashboard from "../pages/AdminDashboard";
import NotFound from "../pages/NotFound";
import AdminPost from "../pages/AdminPost";

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
    errorElement: <NotFound />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/post/:postId",
    element: <Post />,
  },
  {
    path: "/admin",
    element: <AdminDashboard />,
  },
    {
    path: "/admin/posts/:postId/edit",
    element: <AdminPost />,
  },
    {
    path: "/admin/new-post",
    element: <AdminPost />,
  },
]);