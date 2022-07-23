import edit from './edit.png';
import React from 'react';
import {useDispatch} from 'react-redux';
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {useEffectOnce} from "../../hooks/useEffectOnce";
import {useNavigate} from 'react-router-dom';
import {
  fetchServices,
  updateItem,
  removeItem,
  changeNameValue,
  changePriceValue,
  changeDescValue
} from "../../store/typeStore/actionCreators";

function ServiceList() {
  const dispatch = useDispatch();
  const {items} = useTypedSelector((state) => state.items);
  const loading = useTypedSelector((state) => state.items.loading);
  const error = useTypedSelector((state) => state.items.error);
  const navigate = useNavigate();

  useEffectOnce(() => {
    try {
      // @ts-ignore
      dispatch(fetchServices());
    } catch (e) {
      const result = (e as Error).message;
      throw new Error(result);
    }
  });

  const handleEdit = ((id: number | null) => {
    if (id !== null) {
      dispatch(changeNameValue(''));
      dispatch(changePriceValue(''));
      dispatch(changeDescValue(''));
      // @ts-ignore
      dispatch(updateItem(id));
      navigate(`/ra-homework-api-thunk-front/services/${id}`);
    } else {
      return;
    }
  })

  const handleRemove = (id: number) => {
    // @ts-ignore
    dispatch(removeItem(id));
  }

  if (loading) {
    return (
      <div className={"loading-wrapper"}>Loading....
        <div className={"loader"}/>
      </div>
    )
  }

  if (error) {
    return (
      <div className={"error-wrapper"}>
        <p className={"error"}>Что-то пошло не так. Обновите страницу </p>
      </div>
    )
  }

  return (
    <div className="container">
      <ul className={"list list-items"}>
        {items.map(item => {
          return (
            <li className={"list-item"} key={item.id}>
              <div className={"service-name"}>{item.name}</div>
              <div className={"service-price"}>{item.price}</div>
              <div className={"service-btn"}>
                <button className={"btn btn-edit"} onClick={() => handleEdit(item.id)}><img className={"img-edit"}
                                                                                            src={edit}
                                                                                            alt={"иконка редактирования услуги"}/>
                </button>
                <button className={"btn"} onClick={() => handleRemove(item.id)}>X</button>
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default ServiceList;
