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
	User
} from "react-feather";

export default [
	{
		header: "Apps & Pages"
	},
	{
		id: "email",
		title: "Email",
		icon: <Mail size={20} />,
		navLink: "/apps/email"
	},
	{
		id: "chat",
		title: "Chat",
		icon: <MessageSquare size={20} />,
		navLink: "/apps/chat"
	},
	{
		id: "todo",
		title: "Todo",
		icon: <CheckSquare size={20} />,
		navLink: "/apps/todo"
	},
	{
		id: "calendar",
		title: "Calendar",
		icon: <Calendar size={20} />,
		navLink: "/apps/calendar"
	},
	{
		id: "invoiceApp",
		title: "Invoice",
		icon: <FileText size={20} />,
		children: [
			{
				id: "invoiceList",
				title: "List",
				icon: <Circle size={12} />,
				navLink: "/apps/invoice/list"
			},
			{
				id: "invoicePreview",
				title: "Preview",
				icon: <Circle size={12} />,
				navLink: "/apps/invoice/preview"
			},
			{
				id: "invoiceEdit",
				title: "Edit",
				icon: <Circle size={12} />,
				navLink: "/apps/invoice/edit"
			},
			{
				id: "invoiceAdd",
				title: "Add",
				icon: <Circle size={12} />,
				navLink: "/apps/invoice/add"
			}
		]
	},
	{
		id: "eCommerce",
		title: "eCommerce",
		icon: <ShoppingCart size={20} />,
		children: [
			{
				id: "shop",
				title: "Shop",
				icon: <Circle size={12} />,
				navLink: "/apps/ecommerce/shop"
			},
			{
				id: "detail",
				title: "Details",
				icon: <Circle size={12} />,
				navLink: "/apps/ecommerce/product-detail"
			},
			{
				id: "wishList",
				title: "Wish List",
				icon: <Circle size={12} />,
				navLink: "/apps/ecommerce/wishlist"
			},
			{
				id: "checkout",
				title: "Checkout",
				icon: <Circle size={12} />,
				navLink: "/apps/ecommerce/checkout"
			}
		]
	},
	{
		id: "productApp",
		title: "Products",
		icon: <ShoppingCart size={20} />,
		children: [
			{
				id: "viewProducts",
				title: "View Products",
				icon: <Circle size={12} />,
				navLink: "/apps/ecommerce/products"
			},
			{
				id: "addProduct",
				title: "Add Product",
				icon: <Circle size={12} />,
				navLink: "/apps/ecommerce/addProduct"
			},
			{
				id: "ecommerce-category",
				title: "Category",
				icon: <Circle size={12} />,
				navLink: "/apps/ecommerce/category"
			},
			{
				id: "ecommerce-attributes",
				title: "Attributes",
				icon: <Circle size={12} />,
				navLink: "/apps/ecommerce/attributes"
			}
		]
	},
	{
		id: "media",
		title: "Media",
		icon: <File size={20} />,
		children: [
			{
				id: "mediaFiles",
				title: "Files",
				icon: <Circle size={12} />,
				navLink: "/apps/media/files"
			},
			{
				id: "mediaImages",
				title: "Images",
				icon: <Circle size={12} />,
				navLink: "/apps/media/images"
			},
			{
				id: "mediaVideo",
				title: "Videos",
				icon: <Circle size={12} />,
				navLink: "/apps/media/videos"
			}
		]
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
				navLink: "/apps/user/list"
			},
			{
				id: "view",
				title: "View",
				icon: <Circle size={12} />,
				navLink: "/apps/user/view"
			},
			{
				id: "edit",
				title: "Edit",
				icon: <Circle size={12} />,
				navLink: "/apps/user/edit"
			}
		]
	}
];
