/* eslint-disable */
import { lazy } from "react";
import { Redirect } from "react-router-dom";

const AppRoutes = [
  {
    path: "/apps/email",
    exact: true,
    appLayout: true,
    className: "email-application",
    component: lazy(() => import("../../views/apps/email")),
  },
  {
    path: "/apps/email/:folder",
    exact: true,
    appLayout: true,
    className: "email-application",
    component: lazy(() => import("../../views/apps/email")),
    meta: {
      navLink: "/apps/email",
    },
  },
  {
    path: "/apps/email/label/:label",
    exact: true,
    appLayout: true,
    className: "email-application",
    component: lazy(() => import("../../views/apps/email")),
    meta: {
      navLink: "/apps/email",
    },
  },
  {
    path: "/apps/email/:filter",
    component: lazy(() => import("../../views/apps/email")),
    meta: {
      navLink: "/apps/email",
    },
  },
  {
    path: "/apps/chat",
    appLayout: true,
    className: "chat-application",
    component: lazy(() => import("../../views/apps/chat")),
  },
  {
    path: "/apps/todo",
    exact: true,
    appLayout: true,
    className: "todo-application",
    component: lazy(() => import("../../views/apps/todo")),
  },
  {
    path: "/apps/todo/:filter",
    appLayout: true,
    exact: true,
    className: "todo-application",
    component: lazy(() => import("../../views/apps/todo")),
    meta: {
      navLink: "/apps/todo",
    },
  },
  {
    path: "/apps/todo/tag/:tag",
    appLayout: true,
    className: "todo-application",
    component: lazy(() => import("../../views/apps/todo")),
    meta: {
      navLink: "/apps/todo",
    },
  },
  {
    path: "/apps/calendar",
    component: lazy(() => import("../../views/apps/calendar")),
  },
  {
    path: "/apps/comments",
    component: lazy(() => import("../../views/apps/comment")),
  },
  {
    path: "/apps/invoice/list",
    component: lazy(() => import("../../views/apps/invoice/list")),
  },
  {
    path: "/apps/inventory/list",
    component: lazy(() => import("../../views/apps/ecommerce/inventory/list")),
  },
  {
    path: "/apps/invoice/preview/:id",
    component: lazy(() => import("../../views/apps/invoice/preview")),
    meta: {
      navLink: "/apps/invoice/preview",
    },
  },
  {
    path: "/apps/invoice/preview",
    exact: true,
    component: () => <Redirect to="/apps/invoice/preview/4987" />,
  },
  {
    path: "/apps/invoice/edit/:id",
    component: lazy(() => import("../../views/apps/invoice/add")),
    meta: {
      navLink: "/apps/invoice/edit",
    },
  },
  {
    path: "/apps/invoice/edit",
    exact: true,
    component: () => <Redirect to="/apps/invoice/edit/4987" />,
  },
  {
    path: "/apps/invoice/add",
    component: lazy(() => import("../../views/apps/invoice/add")),
  },
  {
    path: "/apps/invoice/print",
    layout: "BlankLayout",
    component: lazy(() => import("../../views/apps/invoice/print")),
  },
  {
    path: "/apps/media/files",
    component: lazy(() => import("../../views/apps/media/files")),
  },
  {
    path: "/apps/media/images",
    component: lazy(() => import("../../views/apps/media/images")),
  },
  {
    path: "/apps/media/videos",
    component: lazy(() => import("../../views/apps/media/videos")),
  },
  {
    path: "/apps/ecommerce/shop",
    className: "ecommerce-application",
    component: lazy(() => import("../../views/apps/ecommerce/shop")),
  },
  {
    path: "/apps/ecommerce/wishlist",
    className: "ecommerce-application",
    component: lazy(() => import("../../views/apps/ecommerce/wishlist")),
  },

  {
    path: "/apps/ecommerce/taggenerator/list",
    component: lazy(() =>
      import("../../views/apps/ecommerce/tagGenerator/list")
    ),
  },
  {
    path: "/apps/ecommerce/taggenerator",
    component: lazy(() =>
      import("../../views/apps/ecommerce/tagGenerator/generateTag")
    ),
  },
  {
    path: "/apps/ecommerce/tag-generator/preview/:id",
    component: lazy(() =>
      import("../../views/apps/ecommerce/tagGenerator/preview")
    ),
  },
  {
    path: "/apps/ecommerce/orders/list",
    className: "ecommerce-application",
    component: lazy(() => import("../../views/apps/ecommerce/orders/list")),
  },
  {
    path: "/apps/ecommerce/pre-orders/list",
    className: "ecommerce-application",
    component: lazy(() => import("../../views/apps/ecommerce/preorders/list")),
  },
  {
    path: "/apps/ecommerce/orders/preview/:id",
    className: "ecommerce-application",
    component: lazy(() => import("../../views/apps/ecommerce/orders/preview")),
  },
  {
    path: "/apps/ecommerce/category",
    className: "ecommerce-application",
    component: lazy(() => import("../../views/apps/ecommerce/category")),
  },
  {
    path: "/apps/ecommerce/addProduct",
    className: "ecommerce-application",
    component: lazy(() => import("../../views/apps/ecommerce/addProduct")),
  },
  {
    path: "/apps/ecommerce/product/edit/:id",
    className: "ecommerce-application",
    component: lazy(() => import("../../views/apps/ecommerce/addProduct")),
  },
  {
    path: "/apps/ecommerce/products",
    className: "ecommerce-application",
    component: lazy(() => import("../../views/apps/ecommerce/products")),
  },
  {
    path: "/apps/ecommerce/attributes",
    className: "ecommerce-application",
    component: lazy(() => import("../../views/apps/ecommerce/attributes")),
  },
  {
    path: "/apps/ecommerce/product-detail",
    exact: true,
    className: "ecommerce-application",
    component: () => (
      <Redirect to="/apps/ecommerce/product-detail/apple-i-phone-11-64-gb-black-26" />
    ),
  },
  {
    path: "/apps/ecommerce/product-detail/:product",
    exact: true,
    className: "ecommerce-application",
    component: lazy(() => import("../../views/apps/ecommerce/detail")),
    meta: {
      navLink: "/apps/ecommerce/product-detail",
    },
  },
  {
    path: "/apps/ecommerce/checkout",
    className: "ecommerce-application",
    component: lazy(() => import("../../views/apps/ecommerce/checkout")),
  },
  {
    path: "/apps/user/list",
    component: lazy(() => import("../../views/apps/user/list")),
  },
  {
    path: "/apps/user/edit",
    exact: true,
    component: () => <Redirect to="/apps/user/edit/1" />,
  },
  {
    path: "/apps/user/edit/:id",
    component: lazy(() => import("../../views/apps/user/edit")),
    meta: {
      navLink: "/apps/user/edit",
    },
  },
  {
    path: "/apps/user/view",
    exact: true,
    component: () => <Redirect to="/apps/user/view/1" />,
  },
  {
    path: "/apps/user/view/:id",
    component: lazy(() => import("../../views/apps/user/view")),
    meta: {
      navLink: "/apps/user/view",
    },
  },
  {
    path: "/apps/settings",
    className: "ecommerce-application",
    component: lazy(() => import("../../views/apps/settings")),
  },
  {
    path: "/apps/marketing/facebook-pixel",
    exact: true,
    component: lazy(() => import("../../views/apps/marketing/facebookPixel")),
  },
  {
    path:'/apps/marketing/email-marketing',
    exact: true,
    component: lazy(() => import("../../views/apps/marketing/email")),
  },{
    path:'/apps/marketing/email-marketing/email-templates',
    exact: true,
    component: lazy(()=> import('../../views/apps/marketing/email/templateList'))
  },{
    path:'/apps/marketing/email-marketing/email-templates/edit/:id',
    exact:true,
    component: lazy(()=>import('../../views/apps/marketing/email'))
  }
];

export default AppRoutes;
