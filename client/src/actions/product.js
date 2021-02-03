import axios from '../axios';
import history from '../history';
import {
  FETCH_PRODUCT_REQUEST,
  FETCH_PRODUCT_SUCCESS,
  FETCH_PRODUCT_FAIL,
  FETCH_PRODUCT_CANCELLED,
  UPDATE_PRODUCT_REQUEST,
  UPDATE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_FAIL,
} from '../types/product';

export const fetchProduct = (id, cancelToken) => async (dispatch) => {
  dispatch({ type: FETCH_PRODUCT_REQUEST });

  try {
    const { data } = await axios.get(`/api/products/${id}`, { cancelToken });

    dispatch({ type: FETCH_PRODUCT_SUCCESS, payload: data });
  } catch (error) {
    if (axios.isCancel(error)) {
      dispatch({ type: FETCH_PRODUCT_CANCELLED });
    } else {
      dispatch({
        type: FETCH_PRODUCT_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  }
};

export const updateProduct = (id, formValues) => async (dispatch) => {
  dispatch({ type: UPDATE_PRODUCT_REQUEST });

  try {
    const {
      name,
      price,
      description,
      brand,
      category,
      countInStock,
      releaseDate,
      image,
      isPreOrder,
    } = formValues;

    const formData = new FormData();

    formData.append('name', name);
    formData.append('price', price);
    formData.append('description', description);
    formData.append('brand', brand);
    formData.append('category', category);
    formData.append('countInStock', countInStock);
    formData.append('releaseDate', releaseDate);
    formData.append('isPreOrder', isPreOrder);
    if (image) {
      formData.append('productImg', image);
    }

    const { data } = await axios.put(`/api/products/${id}`, formData);

    history.push('/admin/productList');

    dispatch({ type: UPDATE_PRODUCT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: UPDATE_PRODUCT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response,
    });
  }
};
