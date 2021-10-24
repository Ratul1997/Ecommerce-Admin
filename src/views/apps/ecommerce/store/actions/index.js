/* eslint-disable semi */
import axios from "axios";

// ** Add products
export const addProducts = params => {
  return dispatch => {
    return dispatch({ type: "ADD_PRODUCT", data: params });
  };
};

// ** Add Item to Cart
export const addToCart = params => {
  return dispatch => {
    return dispatch({ type: "ADD_TO_CART", data: params });
  };
};

// ** Get all Cart items
export const getAllCart = () => {
  return dispatch => {
    return dispatch({ type: "GET_CART"});
  };
};

// ** GET Wishlist Items
export const getWishlistItems = () => {
  return dispatch => {
    return axios.get("/apps/ecommerce/wishlist").then(res => {
      dispatch({ type: "GET_WISHLIST", data: res.data });
    });
  };
};

// ** DELETE Wishlist Item
export const deleteWishlistItem = id => {
  return dispatch => {
    return axios.delete(`/apps/ecommerce/wishlist/${id}`).then(res => {
      dispatch({ type: "DELETE_WISHLIST_ITEM", data: res.data });
      dispatch(getWishlistItems());
    });
  };
};

// ** GET Cart Items
export const getCartItems = () => {
  return dispatch => {
    return axios.get("/apps/ecommerce/cart").then(res => {
      dispatch({ type: "GET_CART", data: res.data });
    });
  };
};

// ** GET Single Product
export const getProduct = slug => {
  return dispatch => {
    return axios.get(`/apps/ecommerce/products/${slug}`).then(res => {
      dispatch({ type: "GET_PRODUCT", data: res.data });
    });
  };
};

// ** Add Item to Wishlist
export const addToWishlist = id => {
  return dispatch => {
    return axios
      .post("/apps/ecommerce/wishlist", { productId: id })
      .then(() => {
        dispatch({ type: "ADD_TO_WISHLIST" });
      });
  };
};

// ** DELETE Cart Items
export const deleteCartItem = id => {
  return dispatch => {
      dispatch({ type: "DELETE_CART_ITEM", data: id });
  };
};

// ** Update cart item
export const updateCartItem = params => {
  return dispatch => {
    return dispatch({ type: "UPDATE_CART_ITEM", data: params });
  };
};

// ** Add Categories
export const addCategories = params => {
  return dispatch => {
    return dispatch({ type: "ADD_CATEGORY", data: params });
  };
};
// ** Update Categories list
export const updateCategories = params => {
  return dispatch => {
    return dispatch({ type: "UPDATE_CATEGORY", data: params });
  };
};

// ** Remove A Category Item
export const removeItemInCategory = params => {
  
  return dispatch => {
    return dispatch({ type: "REMOVE_CATEGORY_ITEM", data: params });
  };
};
