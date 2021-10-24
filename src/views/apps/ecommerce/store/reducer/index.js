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

  return [...categories];
};

const removeACategoryItem = (categories, data) => {
  const newCategories = categories.filter(item => {
    if (item.category_id !== data.category_id) return item;
  });

  return [...newCategories];
};

const removeACartItem = (cart, data) => {
  const newCart = cart.filter(item => {
    if (item.product_id !== data) return item;
  });

  return [...newCart];
};

const updateCart = (cart, data) => {
  cart.push(data);

  return [...cart];
};

const ecommerceReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_PRODUCT":
      return { ...state, products: action.data };
    case "ADD_TO_CART":
      return { ...state, cart: action.data};
    case "GET_CART":
      return { ...state };
    case "GET_WISHLIST":
      return { ...state, wishlist: action.data.products };
    case "DELETE_WISHLIST_ITEM":
      return { ...state };
    case "DELETE_CART_ITEM":
      return {
        ...state,
        cart: removeACartItem(state.cart, action.data),
      };
    case "UPDATE_CART_ITEM":
      return {
        ...state,
        cart: updateCart(state.cart, action.data),
      };
    case "ADD_TO_WISHLIST":
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
    case "CLEAR_ECOMMERCE":
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

export default ecommerceReducer;
