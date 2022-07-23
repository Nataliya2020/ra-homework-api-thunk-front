export type ItemsUpdateInitialState =
  {
    id: number | null,
    name: string | null,
    price: string | null
  }[]

export type IinitialState = {
  itemUpdate: ItemsUpdateInitialState
  edit: boolean | null,
  editId: number,
  nameValue: string,
  priceValue: string,
  descValue: string,
  loading: boolean,
  error: string
}

export enum ItemsActionType {
  CHANGE_NAME_VALUE = 'CHANGE_NAME_VALUE',
  CHANGE_PRICE_VALUE = 'CHANGE_PRICE_VALUE',
  CHANGE_DESC_VALUE = 'CHANGE_DESC_VALUE',
  FETCH_UPDATE_REQUEST = 'FETCH_UPDATE_REQUEST',
  FETCH_UPDATE_SUCCESS = 'FETCH_UPDATE_SUCCESS',
  FETCH_UPDATE_ERROR = 'FETCH_UPDATE_ERROR'
}

type ChangeNameValueAction = {
  type: ItemsActionType.CHANGE_NAME_VALUE;
  payload: string;
}

type ChangePriceValueAction = {
  type: ItemsActionType.CHANGE_PRICE_VALUE;
  payload: string;
}

type ChangeDescValueAction = {
  type: ItemsActionType.CHANGE_DESC_VALUE;
  payload: string;
}

type FetchUpdateAction = {
  type: ItemsActionType.FETCH_UPDATE_REQUEST;
}

type FetchUpdateSuccessAction = {
  type: ItemsActionType.FETCH_UPDATE_SUCCESS;
  payload: any[];
}

type FetchUpdateErrorAction = {
  type: ItemsActionType.FETCH_UPDATE_ERROR;
  payload: string;
}

export type ItemsAction =
  ChangeNameValueAction |
  ChangePriceValueAction |
  ChangeDescValueAction |
  FetchUpdateAction |
  FetchUpdateSuccessAction |
  FetchUpdateErrorAction;
