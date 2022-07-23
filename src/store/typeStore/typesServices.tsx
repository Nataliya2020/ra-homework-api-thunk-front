export type ItemsInitialState =
  {
    id: number | null,
    name: string | null,
    price: string | null
  }[]

export type IinitialState = {
  items: ItemsInitialState
  edit: boolean | null,
  editId: number,
  nameValue: string,
  priceValue: string,
  descValue: string,
  loading: boolean,
  error: string
}

export enum ItemsActionType {
  FETCH_ITEMS = 'FETCH_ITEMS',
  FETCH_ITEMS_SUCCESS = 'FETCH_ITEMS_SUCCESS',
  FETCH_ITEMS_ERROR = 'FETCH_ITEMS_ERROR',
  EDIT_ITEM = 'EDIT_ITEM',
}

type FetchItemsAction = {
  type: ItemsActionType.FETCH_ITEMS;
}

type FetchItemsSuccessAction = {
  type: ItemsActionType.FETCH_ITEMS_SUCCESS;
  payload: any[];
}

type FetchItemsErrorAction = {
  type: ItemsActionType.FETCH_ITEMS_ERROR;
  payload: string;
}

type EditItemAction = {
  type: ItemsActionType.EDIT_ITEM;
  payload: number;
}

export type ItemsAction = FetchItemsAction |
  FetchItemsSuccessAction |
  FetchItemsErrorAction |
  EditItemAction;
