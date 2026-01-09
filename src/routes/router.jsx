import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/user/Home.jsx";
import BlogPost from "../pages/user/BlogPost.jsx";
import Login from "../pages/Login";
import Register from "../pages/Register";
import AdminDashboard from "../pages/admin/Dashboard.jsx";
// import NotFound from "../pages/NotFound";
import AdminPost from "../pages/admin/NewPost.jsx";
import Error from "../pages/Error.jsx";

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
    errorElement: <Error errorType="not-found" />,
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
    element: <BlogPost />,
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