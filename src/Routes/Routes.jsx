import { createBrowserRouter } from "react-router-dom";
import Main from "../Layouts/Main";
import Error from "../Components/Shared/Error";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "../Layouts/Dashboard";
import AdminRoute from "./AdminRoute";
import Book_A_Parcel from "../Pages/Book_A_Parcel";
import My_Parcels from "../Pages/My_Parcels";
import My_Profile from "../Pages/My_Profile";
import All_Parcels from "../Pages/All_Parcels";
import All_Users from "../Pages/All_Users";
import All_Delivery_Men from "../Pages/All_Delivery_Men";
import My_Delivery_List from "../Pages/My_Delivery_List";
import My_Reviews from "../Pages/My_Reviews";
import DeliveryManRoute from "./DeliveryManRoute";
import Statistics from "../Pages/Statistics";
import UpdateBooking from "../Pages/UpdateBooking";
import AdminHome from "../Pages/AdminHome";
import UpdateItem from "../Pages/UpdateItem";

const Routes = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    errorElement: <Error></Error>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
    ],
  },
  {
    path: "dashboard",
    element: (
  
        <Dashboard></Dashboard>
  
    ),
    children: [
      // normal user routes
      {
        path: "bookAParcel",
        element: <Book_A_Parcel></Book_A_Parcel>,
      },
      {
        path: "updateBooking/:id",
        element: <UpdateBooking></UpdateBooking>,
        loader: ({params})=> {
         const result = fetch(`http://localhost:5000/api/v1/bookings/${params.id}`)
         return result;
        }
      },
      {
        path: "myParcels",
        element: <My_Parcels></My_Parcels>,
      },
      {
        path: "myProfile",
        element: <My_Profile></My_Profile>,
      },

      // Delivery Men Will See only routes
      {
        path: "myDeliveryList",
        element: <DeliveryManRoute><My_Delivery_List></My_Delivery_List></DeliveryManRoute> ,
      },
      {
        path: "myReviews",
        element: <DeliveryManRoute><My_Reviews></My_Reviews></DeliveryManRoute> ,
      },

      // // admin only routes
      {
        path: "adminHome",
        element: (
         
            <AdminHome></AdminHome>
         
        ),
      },
      {
        path: "allParcels",
        element: (
         
            <All_Parcels></All_Parcels>
         
        ),
      },
      {
        path: "allUsers",
        element: (
         
            <All_Users></All_Users>
         
        ),
      },
      {
        path: 'updateItem/:id',
        element:<UpdateItem></UpdateItem>,
        // loader: ({params}) => fetch(`http://localhost:5000/menu/${params.id}`)
      },
      {
        path: "allDeliveryMen",
        element: (
         
            <All_Delivery_Men></All_Delivery_Men>
         
        ),
      },
      {
        path: "statistics",
        element: (
         
            <Statistics></Statistics>
         
        ),
      },
    ],
  },
]);

export default Routes;
