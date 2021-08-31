/*eslint-disable*/
import { lazy } from 'react'

const DashboardRoutes = [
  // Dashboards
  {
    path: '/dashboard/analytics',
    component: lazy(() => import('../../views/dashboard/analytics')),
    exact:true
  },
  {
    path: '/dashboard/ecommerce',
    component: lazy(() => import('../../views/dashboard/ecommerce')),
    exact: true
  },
  {
    path: "/add-new-admin",
    exact:true,
    component: lazy(() => import("../../views/apps/addNewAdmin")),
  },
]

export default DashboardRoutes
