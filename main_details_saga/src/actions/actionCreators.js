import {
  FETCH_SERVICES_FAILURE,
  FETCH_SERVICES_REQUEST,
  FETCH_SERVICES_SUCCESS,
  FETCH_SINGLE_SERVICE_FAILURE,
  FETCH_SINGLE_SERVICE_REQUEST,
  FETCH_SINGLE_SERVICE_SUCCESS,
} from './actionTypes';

export const fetchServiceRequest = () => ({
  type: FETCH_SERVICES_REQUEST,
});

export const fetchServiceFailure = (error) => ({
  type: FETCH_SERVICES_FAILURE,
  payload: {
    error,
  },
});

export const fetchServiceSuccess = (items) => ({
  type: FETCH_SERVICES_SUCCESS,
  payload: {
    items,
  },
});

export const fetchSingleServiceRequest = (id) => ({
  type: FETCH_SINGLE_SERVICE_REQUEST,
  payload: {
    id,
  },
});

export const fetchSingleServiceFailure = (error) => ({
  type: FETCH_SINGLE_SERVICE_FAILURE,
  payload: {
    error,
  },
});

export const fetchSingleServiceSuccess = (item) => ({
  type: FETCH_SINGLE_SERVICE_SUCCESS,
  payload: {
    item,
  },
});
