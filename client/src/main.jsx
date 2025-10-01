import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css'
import Layout from './Layout/Layout.jsx'
import Errorpage from './Errorpage.jsx'
import Homepage from './Homepage.jsx'
import Tasks from './Tasks/Tasks.jsx'

const router = createBrowserRouter([
  {
    element: <Layout />,
    errorElement: <Errorpage />,
    children: [
      {
        path: "/",
        element: <Homepage />,
      },
      {
        path: "/tasks",
        element: <Tasks />
      },
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={ router } />
  </StrictMode>,
)