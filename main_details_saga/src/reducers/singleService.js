import {
  FETCH_SINGLE_SERVICE_FAILURE,
  FETCH_SINGLE_SERVICE_REQUEST,
  FETCH_SINGLE_SERVICE_SUCCESS,
} from '../actions/actionTypes';

const initialState = {
  item: { name: '', price: '', content: '' },
  loading: false,
  error: null,
};

const singleServiceReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_SINGLE_SERVICE_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_SINGLE_SERVICE_FAILURE:
      const { error } = action.payload;
      return {
        ...state,
        loading: false,
        error,
      };
    case FETCH_SINGLE_SERVICE_SUCCESS:
      const { item } = action.payload;
      return {
        ...state,
        item,
        loading: false,
        error: null,
      };
    default:
      return state;
  }
};

export default singleServiceReducer;
