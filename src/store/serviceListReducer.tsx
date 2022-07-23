import {IinitialState, ItemsAction, ItemsActionType} from './typeStore/typesServices';

const initialState: IinitialState = {
  items: [
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

export default function serviceListReducer(state = initialState, action: ItemsAction) {
  switch (action.type) {
    case ItemsActionType.FETCH_ITEMS:
      return {
        ...state,
        loading: true, error: ''
      };

    case ItemsActionType.FETCH_ITEMS_SUCCESS:
      return {
        ...state,
        loading: false, error: '', items: action.payload
      };

    case ItemsActionType.FETCH_ITEMS_ERROR:
      return {
        ...state,
        loading: false, error: action.payload, items: state.items
      };
    case ItemsActionType.EDIT_ITEM:
      return {
        ...state,
        editId: action.payload
      };
    default: {
      return state
    }
  }
}
