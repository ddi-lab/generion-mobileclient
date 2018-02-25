import clients from '@clients';
import * as actionTypes from './types';

export const createOrder = (address, record_id_list, price) => async (dispatch) => {
  dispatch({
    type: actionTypes.CREATE_ORDER_REQUEST,
  });

  await clients.accessStorage.client.request({
    url: `/users/${address}/orders/`,
    method: 'POST',
    data: {
      record_id_list,
      price,
    },
  }).then(() => {
    dispatch({
      type: actionTypes.CREATE_ORDER_SUCCESS,
    });
  })
  .catch(() => {
    dispatch({
      type: actionTypes.CREATE_ORDER_FAILURE,
    });
  });
};

export const getAllOrders = () => async (dispatch) => {
  dispatch({
    type: actionTypes.GET_ALL_ORDERS_REQUEST,
  });

  const orderIds = await clients.accessStorage.client.request({
    url: '/orders',
    method: 'GET',
  }).then((response) => response.data.result)
  .catch(() => {
    dispatch({
      type: actionTypes.CREATE_ORDER_FAILURE,
    });
  });

  console.log(orderIds);

  const orderRequests = [];
  orderIds.map(id => {
    orderRequests.push(
      clients.accessStorage.client.request({
        url: `/orders/${id}`,
        method: 'GET',
      }).then(response => response.data.result),
    );
  });

  const orders = await Promise.all(orderRequests);

  dispatch({
    type: actionTypes.GET_ALL_ORDERS_SUCCESS,
    payload: orders,
  });
};
