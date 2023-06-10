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
    element: <DashboardLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: 'select-classes',
        element:<SelectClasses/>
      },
      {
        path: 'enrolled-classes',
        element:<EnrolledClasses/>
      },
      {
        path: 'payment',
        element:<Payment/>
      },
      {
        path: 'payment-history',
        element:<PaymentHistoryPage/>
      },
    ]
  }
])

