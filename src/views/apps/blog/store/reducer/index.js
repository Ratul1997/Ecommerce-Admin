/* eslint-disable  */
const initialState = {
  blogs: [],
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

const removeABlog = (blogs, data) => {
  const newBlogs = blogs.filter(item => {
    if (item.blog_id !== data.blog_id) return item;
  });

  return [...newBlogs];
};

const blogReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_NEW_BLOG":
      return { ...state, blogs: action.data };
    case "REMOVE_A_BLOG":
      return {
        ...state,
        blogs: removeABlog(state.blogs, action.data),
      };
    case "ADD_BLOG_CATEGORY":
      return { ...state, categories: action.data.results };
    case "UPDATE_BLOG_CATEGORY":
      return {
        ...state,
        categories: updateCategory(state.categories, action.data),
      };
    case "REMOVE_BLOG_CATEGORY_ITEM":
      return {
        ...state,
        categories: removeACategoryItem(state.categories, action.data),
      };
    default:
      return state;
  }
};

export default blogReducer;
