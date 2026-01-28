import { createBrowserRouter } from "react-router-dom";

import Login from "../pages/Login";
import Error from "../pages/Error.jsx";
import Register from "../pages/Register";
import Home from "../pages/user/Home.jsx";
import BlogPost from "../pages/user/PostContent.jsx";
import AdminDashboard from "../pages/admin/Home.jsx";
import PostFormPage from "../pages/admin/PostForm.jsx";

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
		element: <PostFormPage />,
	},
	{
		path: "/admin/new-post",
		element: <PostFormPage />,
	},
]);
