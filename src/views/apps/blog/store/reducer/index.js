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
const blogReducer = (state = initialState, action) => {
  switch (action.type) {
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

export default blogReducer;
