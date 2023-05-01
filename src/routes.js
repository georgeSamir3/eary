import { createBrowserRouter, Navigate } from "react-router-dom";
import Home from "./pages/home";
import Login from "./pages/login/login";
import SignUP from "./pages/signup/signup";
import App from "./App";
import ManageUSers from "./pages/manageUsers/ManageUSers";
import AddUser from "./pages/manageUsers/AddUser";
import UpdateUser from "./pages/manageUsers/updateUser";
import Guest from "./middleware/Guest";
import Admin from "./middleware/Admin";
import UserDetails from "./pages/UserDetails/UserDetails";
import Test from "./pages/testfolder/test";
import User from "./middleware/User";
import ManageQuestions from "./pages/manageQuestions/ManageQuestions";
import AddQuestion from "./pages/manageQuestions/addQuestion";
import MyProfile from "./pages/my profile/MyProfile";
import UpdateQuestion from "./pages/manageQuestions/UpdateQuestion";
import SubmissionsDetails from "./pages/submissionsDetails/submissionsDetails";
import UserSubmissions from "./pages/submissionsDetails/userSubmissions";
export const routes = createBrowserRouter([
  {
    path: "",
    element: <App />,
    children: [
      // {
      //   path: "/",
      //   element: <Home />,
      // },
      //   {
      //     path: ":id",
      //     element: <UserDetails />,
      //   },

      // GUEST MIDDLEWARE
      {
        element: <Guest />,
        children: [
          {
            path: "/login",
            element: <Login></Login>,
          },
          {
            path: "/register",
            element: <SignUP />,
          },
        ],
      },

      {
        element: <User></User>,
        children: [
          {
            path: "/test",
            element: <Test></Test>,
          },
          {
            path: "/myprofile",
            element: <MyProfile></MyProfile>,
          },
          {
            path: "/",
            element: <Home />,
          },
          {
            path: "/subDetails/:id",
            element: <SubmissionsDetails></SubmissionsDetails>,
          },
        ],
      },
      // {
      //   path:"/subDetails",
      //   element:<User></User>,
      //   children:[
      //     {
      //       path:":id",
      //       element:<SubmissionsDetails></SubmissionsDetails>
      //     }
      //   ]
      // },
      {
        path: "/mngQuestions",
        element: <Admin></Admin>,
        children: [
          {
            path: "",
            element: <ManageQuestions></ManageQuestions>,
          },
          {
            path: "add",
            element: <AddQuestion></AddQuestion>,
          },
          {
            path: ":id",
            element: <UpdateQuestion />,
          },
        ],
      },
      {
        path: "/mngUsers",
        element: <Admin />,
        children: [
          {
            path: "",
            element: <ManageUSers />,
          },
          {
            path: "add",
            element: <AddUser />,
          },
          {
            path: ":id",
            element: <UpdateUser />,
          },
          {
            path: "subDetails/:id",
            element: <UserSubmissions/>,
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to={"/login"} />,
  },
]);
