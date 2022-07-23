import {
  FETCH_ITEMS,
  FETCH_ITEMS_SUCCESS,
  FETCH_ITEMS_ERROR,
  EDIT_ITEM,
  CHANGE_NAME_VALUE,
  CHANGE_PRICE_VALUE,
  CHANGE_DESC_VALUE,
  FETCH_UPDATE_REQUEST,
  FETCH_UPDATE_SUCCESS,
  FETCH_UPDATE_ERROR,
} from './actionsTypes';

import {Dispatch} from "redux";

export const fetchItemsRequest = () => ({
  type: FETCH_ITEMS
});

export const fetchItemsSuccess = (items: any[]) => ({
  type: FETCH_ITEMS_SUCCESS,
  payload: items,
});

export const fetchItemsError = (error: string) => ({
  type: FETCH_ITEMS_ERROR,
  payload: error,
});

export const editItem = (id: number) => ({
  type: EDIT_ITEM,
  payload: id,
});

export const changeNameValue = (name: string) => ({
  type: CHANGE_NAME_VALUE,
  payload: name,
});

export const changePriceValue = (price: string) => ({
  type: CHANGE_PRICE_VALUE,
  payload: price,
});

export const changeDescValue = (desc: string) => ({
  type: CHANGE_DESC_VALUE,
  payload: desc,
});

export const fetchUpdate = () => ({
  type: FETCH_UPDATE_REQUEST,
});

export const fetchUpdateSuccess = (items: any[]) => ({
  type: FETCH_UPDATE_SUCCESS,
  payload: items,
});

export const fetchUpdateError = (error: string) => ({
  type: FETCH_UPDATE_ERROR,
  payload: error
});

export const fetchServices = () => async (dispatch: Dispatch) => {
  dispatch(fetchItemsRequest());
  try {
    const res = await fetch(`${process.env.REACT_APP_URL}/api/services`);
    if (!res.ok) {
      dispatch(fetchItemsError(res.statusText));
      return;
    }
    const data = await res.json();
    dispatch(fetchItemsSuccess(data));
  } catch (e) {
    const result = (e as Error).message;
    dispatch(fetchItemsError(result));
    throw new Error(result);
  }
};

export const updateItem = (id: number) => (dispatch: Dispatch) => {
  dispatch(editItem(id))
}

export const removeItem = (id: number) => async (dispatch: Dispatch) => {
  const params = new FormData();
  params.set('id', id.toString());
  try {
    // @ts-ignore
    dispatch(fetchItemsRequest());
    const result = await fetch(`${process.env.REACT_APP_URL}/api/services/${id}`, {
      method: 'DELETE',
      body: params
    });
    if (!result.ok) {
      dispatch(fetchItemsError(result.statusText));
      return;
    }
    // @ts-ignore
    dispatch(fetchServices());
  } catch (e) {
    const result = (e as Error).message;
    dispatch(fetchItemsError(result));
  }
};

export const fetchUpdateRequest = (itemId: number) => async (dispatch: Dispatch) => {
  dispatch(fetchUpdate());

  try {
    if (itemId === 0) {
      return;
    }
    const res = await fetch(`${process.env.REACT_APP_URL}/api/services/${itemId}`);

    if (!res.ok) {
      dispatch(fetchUpdateError(res.statusText));
      return;
    }

    const data = await res.json();
    dispatch(fetchUpdateSuccess(data));
    dispatch(changeNameValue(data.name));
    dispatch(changePriceValue(data.price));
    dispatch(changeDescValue(data.content));
  } catch (e) {
    const result = (e as Error).message;
    dispatch(fetchUpdateError(result));
    throw new Error(result);
  }
}

export const fetchSubmitItem = (itemId: number, redirect: () => void) => async (dispatch: Dispatch) => {
  dispatch(fetchUpdate());
  const form = document.querySelector('#form');

  if (form instanceof HTMLFormElement) {
    const params = new FormData(form);
    params.set('id', itemId.toString());

    const paramsData = Array.from(params.entries()).reduce((obj, prop) => ({
      ...obj,
      [prop[0]]: prop[1],
    }), {});

    dispatch(fetchUpdate());

    try {
      const result = fetch(`${process.env.REACT_APP_URL}/api/services`, {
        method: 'POST',
        body: JSON.stringify(paramsData)
      });
      dispatch(dispatch(fetchUpdate()));

      result.then((data) => {
          if (!data.ok) {
            dispatch(fetchUpdateError(data.statusText));


          } else {
            dispatch(fetchUpdate());
            redirect();
            if (data.statusText !== 'No Content') {
              throw new Error(data.statusText);
            }
          }
        }
      ).catch((e) => {
        const result = (e as Error).message;
        dispatch(fetchUpdateError(result));
        throw new Error(e);
      })
    } catch (e) {
      const result = (e as Error).message;
      dispatch(fetchUpdateError(result));
    }
  }
}
