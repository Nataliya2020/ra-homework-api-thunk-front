import {IinitialState, ItemsAction, ItemsActionType} from './typeStore/typesUpdate';

const initialState: IinitialState = {
  itemUpdate: [
    {
      id: null,
      name: null,
      price: null
    }
  ],
  edit: false,
  editId: 0,
  nameValue: '',
  priceValue: '',
  descValue: '',
  loading: false,
  error: ''
}

export default function serviceUpdateReducer(state = initialState, action: ItemsAction) {
  switch (action.type) {
    case ItemsActionType.CHANGE_NAME_VALUE:
      return {
        ...state, nameValue: action.payload
      };

    case ItemsActionType.CHANGE_PRICE_VALUE:
      return {
        ...state, priceValue: action.payload
      };

    case ItemsActionType.CHANGE_DESC_VALUE:
      return {
        ...state, descValue: action.payload
      };

    case ItemsActionType.FETCH_UPDATE_REQUEST:
      return {
        ...state,
        loading: true, error: ''
      };

    case ItemsActionType.FETCH_UPDATE_SUCCESS:
      return {
        ...state,
        loading: false, error: '', itemUpdate: action.payload
      };

    case ItemsActionType.FETCH_UPDATE_ERROR:
      return {
        ...state,
        loading: false, error: action.payload, itemUpdate: state.itemUpdate
      };
    default: {
      return state
    }
  }
}
