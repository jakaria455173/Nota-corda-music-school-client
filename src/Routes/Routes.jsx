import { createBrowserRouter } from 'react-router-dom'
import MainPage from '../Layouts/MainPage'
import Login from '../Components/Login/Login'
import SignUp from '../Components/SignUp/SignUp'
import HomePage from '../Pages/HomePage/HomePage'
import ErrorPage from '../Components/SharedComponents/ErrorPage'
import DashboardLayout from '../Layouts/DashboardLayout'
import SelectClasses from '../Pages/Dashboard/SelectClasses'
import EnrolledClasses from '../Pages/Dashboard/EnrolledClasses'
import AllClasses from '../Components/Classes/AllClasses'
import AllInstructors from '../Components/Instructors/AllInstructors'
import Payment from '../Pages/Dashboard/Payment/Payment'
import PaymentHistoryPage from '../Pages/Dashboard/PaymentHistoryPage'
import PrivateRoute from './PrivateRoute'
import InstructorAddClass from '../Pages/Dashboard/InstructorAddClass'
import InstructorMyClasses from '../Pages/Dashboard/InstructorMyClasses'
import InstructorRoute from './InstructorRoute'
import InstructorClassUpdate from '../Pages/Dashboard/InstructorClassUpdate'
import AdminRoute from './AdminRoute'
import ManageClasses from '../Pages/Dashboard/ManageClasses'
import ManageUsers from '../Pages/Dashboard/ManageUsers'
import StudentRoute from './StudentRoute'


export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainPage />,
    errorElement:<ErrorPage/>,
    children: [
      {
      path: '/',
      element:<HomePage/>
      },
      {
        path: '/login',
        element:<Login/>
      },
      {
        path: '/signUp',
        element:<SignUp/>
      },
      {
        path: '/classes',
        element:<AllClasses/>
      },
      {
        path: '/instructors',
        element:<AllInstructors/>
      },
    ],
  },
  {
    path: '/dashboard',
    element:<PrivateRoute><DashboardLayout /></PrivateRoute>,
    errorElement: <ErrorPage />,
    children: [
      {
        path: 'select-classes',
        element:<StudentRoute><SelectClasses/></StudentRoute>
      },
      {
        path: 'enrolled-classes',
        element:<StudentRoute><EnrolledClasses/></StudentRoute>
      },
      {
        path: 'payment',
        element:<StudentRoute><Payment/></StudentRoute>
      },
      {
        path: 'payment-history',
        element:<StudentRoute><PaymentHistoryPage/></StudentRoute>
      },
      {
        path: 'add-class',
        element:<InstructorRoute><InstructorAddClass/></InstructorRoute>
      },
      {
        path: 'my-class',
        element:<InstructorRoute><InstructorMyClasses/></InstructorRoute>
      },
      {
        path: 'instructorClassUpdate/:id',
        element:<InstructorRoute><InstructorClassUpdate /></InstructorRoute>,
        loader: ({ params }) => fetch(`http://localhost:4000/allClass/${params.id}`)
      },
      {
        path: 'manage-classes',
        element:<AdminRoute><ManageClasses/></AdminRoute>
      },
      {
        path: 'manage-users',
        element:<AdminRoute><ManageUsers/></AdminRoute>
      }
    ]
  }
])
