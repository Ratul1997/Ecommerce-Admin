/* eslint-disable */
import {
  Mail,
  MessageSquare,
  CheckSquare,
  Calendar,
  FileText,
  Circle,
  ShoppingCart,
  File,
  User,
  ShoppingBag,
  Command,
  Tag,
  Settings,
  Database
} from "react-feather";

export default [
  {
    header: "Apps & Pages",
  },
  {
    id: "email",
    title: "Email",
    icon: <Mail size={20} />,
    navLink: "/apps/email",
  },
  {
    id: "chat",
    title: "Chat",
    icon: <MessageSquare size={20} />,
    navLink: "/apps/chat",
  },
  {
    id: "todo",
    title: "Todo",
    icon: <CheckSquare size={20} />,
    navLink: "/apps/todo",
  },
  {
    id: "calendar",
    title: "Calendar",
    icon: <Calendar size={20} />,
    navLink: "/apps/calendar",
  },
  {
    id: "tag",
    title: "Tags",
    icon: <Tag size={20} />,
    navLink: "/apps/ecommerce/taggenerator/list",
  },
  {
    id: "invoiceApp",
    title: "Invoice",
    icon: <FileText size={20} />,
    navLink: "/apps/invoice/list",
    // children: [
    // 	{
    // 		id: "invoiceList",
    // 		title: "List",
    // 		icon: <Circle size={12} />,
    // 		navLink: "/apps/invoice/list"
    // 	},
    // 	// {
    // 	// 	id: "invoicePreview",
    // 	// 	title: "Preview",
    // 	// 	icon: <Circle size={12} />,
    // 	// 	navLink: "/apps/invoice/preview"
    // 	// },
    // 	// {
    // 	// 	id: "invoiceEdit",
    // 	// 	title: "Edit",
    // 	// 	icon: <Circle size={12} />,
    // 	// 	navLink: "/apps/invoice/edit"
    // 	// },
    // 	{
    // 		id: "invoiceAdd",
    // 		title: "Add",
    // 		icon: <Circle size={12} />,
    // 		navLink: "/apps/invoice/add"
    // 	}
    // ]
  },
  {
    id: "eCommerce",
    title: "eCommerce",
    icon: <ShoppingCart size={20} />,
    children: [
      {
        id: "order",
        title: "Orders",
        icon: <Circle size={12} />,
        navLink: "/apps/ecommerce/orders/list",
      },
      {
        id: "order",
        title: "Pre Orders",
        icon: <Circle size={12} />,
        navLink: "/apps/ecommerce/pre-orders/list",
      },
      {
        id: "shop",
        title: "Shop",
        icon: <Circle size={12} />,
        navLink: "/apps/ecommerce/shop",
      },
      {
        id: "detail",
        title: "Details",
        icon: <Circle size={12} />,
        navLink: "/apps/ecommerce/product-detail",
      },
      {
        id: "wishList",
        title: "Wish List",
        icon: <Circle size={12} />,
        navLink: "/apps/ecommerce/wishlist",
      },
      {
        id: "checkout",
        title: "Checkout",
        icon: <Circle size={12} />,
        navLink: "/apps/ecommerce/checkout",
      },
    ],
  },
  {
    id: "inventory",
    title: "Inventory",
    icon: <Database size={20} />,
    navLink: "/apps/inventory/list",
  },
  {
    id: "productApp",
    title: "Products",
    icon: <ShoppingBag size={20} />,
    children: [
      {
        id: "viewProducts",
        title: "View Products",
        icon: <Circle size={12} />,
        navLink: "/apps/ecommerce/products",
      },
      // {
      //   id: "addProduct",
      //   title: "Add Product",
      //   icon: <Circle size={12} />,
      //   navLink: "/apps/ecommerce/addProduct",
      // },
      {
        id: "ecommerce-category",
        title: "Category",
        icon: <Circle size={12} />,
        navLink: "/apps/ecommerce/category",
      },
      {
        id: "ecommerce-attributes",
        title: "Attributes",
        icon: <Circle size={12} />,
        navLink: "/apps/ecommerce/attributes",
      },
    ],
  },
  {
    id: "comment",
    title: "Comments",
    icon: <Command size={20} />,
    navLink: "/apps/comments",
  },
  {
    id: "media",
    title: "Media",
    icon: <File size={20} />,
    navLink: "/apps/media/images",
    // children: [
    //   {
    //     id: "mediaImages",
    //     title: "Images",
    //     icon: <Circle size={12} />,
    //     navLink: "/apps/media/images",
    //   },
    //   {
    //     id: "mediaVideo",
    //     title: "Videos",
    //     icon: <Circle size={12} />,
    //     navLink: "/apps/media/videos",
    //   },
    // ],
  },
  {
    id: "users",
    title: "User",
    icon: <User size={20} />,
    children: [
      {
        id: "list",
        title: "List",
        icon: <Circle size={12} />,
        navLink: "/apps/user/list",
      },
      // {
      //   id: "view",
      //   title: "View",
      //   icon: <Circle size={12} />,
      //   navLink: "/apps/user/view",
      // },
      // {
      //   id: "edit",
      //   title: "Edit",
      //   icon: <Circle size={12} />,
      //   navLink: "/apps/user/edit",
      // },
    ],
  },
  {
    id: "settings",
    title: "Settings",
    icon: <Settings size={20} />,
    navLink: "/apps/settings",
  },
];
