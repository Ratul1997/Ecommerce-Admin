/* eslint-disable  */
const initialState = {
  products: [],
  wishlist: [],
  cart: [],
  productDetail: {},
  params: {},
  totalProducts: 0,
  categories: [],
  attributes: [],
};

const updateCategory = (categories, data) => {
  categories.push(data);
  console.log(categories);
  return [...categories];
};

const removeACategoryItem = (categories, data) => {
  const newCategories = categories.filter(item => {
    if (item.category_id !== data.category_id) return item;
  });
  console.log(newCategories);
  return [...newCategories];
};
const ecommerceReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_PRODUCTS":
      return {
        ...state,
        products: action.data.products,
        params: action.params,
        totalProducts: action.data.total,
      };
    case "GET_WISHLIST":
      return { ...state, wishlist: action.data.products };
    case "DELETE_WISHLIST_ITEM":
      return { ...state };
    case "GET_CART":
      return { ...state, cart: action.data.products };
    case "DELETE_CART_ITEM":
      return { ...state };
    case "ADD_TO_WISHLIST":
      return { ...state };
    case "ADD_TO_CART":
      return { ...state };
    case "GET_PRODUCT":
      return { ...state, productDetail: action.data.product };
    case "ADD_CATEGORY":
      return { ...state, categories: action.data.categories };
    case "UPDATE_CATEGORY":
      return {
        ...state,
        categories: updateCategory(state.categories, action.data),
      };
    case "REMOVE_CATEGORY_ITEM":
      return {
        ...state,
        categories: removeACategoryItem(state.categories, action.data),
      };
    default:
      return state;
  }
};

export default ecommerceReducer;
