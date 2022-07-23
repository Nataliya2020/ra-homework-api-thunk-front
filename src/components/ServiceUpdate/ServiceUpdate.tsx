import React from 'react';
import {useDispatch} from 'react-redux';
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {useEffectOnce} from "../../hooks/useEffectOnce";
import {Link, NavLink, Navigate, useNavigate} from 'react-router-dom';
import {
  fetchUpdateRequest,
  changeNameValue,
  changePriceValue,
  changeDescValue,
  fetchUpdate,
  fetchSubmitItem
} from '../../store/typeStore/actionCreators';

function ServiceUpdate() {
  const dispatch = useDispatch();
  const name = useTypedSelector((state) => state.itemUpdate.nameValue);
  const price = useTypedSelector((state) => state.itemUpdate.priceValue);
  const desc = useTypedSelector((state) => state.itemUpdate.descValue);
  const itemId = useTypedSelector((state) => state.items.editId);
  const loading = useTypedSelector((state) => state.itemUpdate.loading);
  const error = useTypedSelector((state) => state.itemUpdate.error);
  const navigate = useNavigate();

  useEffectOnce(() => {
    try {
      dispatch(fetchUpdate());
      // @ts-ignore
      dispatch(fetchUpdateRequest(itemId));
    } catch (e) {
      const result = (e as Error).message;
      throw new Error(result);
    }
  });

  if (itemId === 0) {
    return (<Navigate to={`/ra-homework-api-thunk-front`}/>)
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
      <>
        <div className={"error-wrapper"}>
          <p className={"error"}>Что-то пошло не так.</p>
          <Link to={"/ra-homework-api-thunk-front"} className={"error-link"}>Вернуться к списку</Link>
        </div>
      </>
    )
  }

  const handleName = (event: { target: { name: string; value: string; }; }) => {
    dispatch(changeNameValue(event.target.value));
  }

  const handlePrice = (event: { target: { name: string; value: string; }; }) => {
    dispatch(changePriceValue(event.target.value));
  }

  const handleDesc = (event: { target: { name: string; value: string; }; }) => {
    dispatch(changeDescValue(event.target.value));
  }

  const redirectComponent = () => {
    navigate('/ra-homework-api-thunk-front');
  }

  const handleSubmit = (event: {
    preventDefault: () => void;
  }) => {
    event.preventDefault();
    // @ts-ignore
    dispatch(fetchSubmitItem(itemId, redirectComponent));
  }

  return (
    <div className="container">
      <div className="container-services">
        <div className={"content-container"}>
          <form className={"form"} id={"form"} onSubmit={handleSubmit}>
            <div>
              <label className={"form-row"}>
                <span className={"name-field"}>Наименование услуги</span>
                <input className={"field"} name="name" value={name} onChange={handleName} required/>
              </label>
            </div>

            <div>
              <label className={"form-row"}>
                <span className={"name-field"}>Стоимость услуги</span>
                <input className={"field"} name="price" value={price} onChange={handlePrice} required/>
              </label>
            </div>

            <div>
              <label className={"form-row"}>
                <span className={"name-field"}>Описание услуги</span>
                <input className={"field"} name="content" value={desc} onChange={handleDesc} required/>
              </label>
            </div>

            <div className={"form-row form-row-button"}>
              <button type="submit" className={"btn-control"}>Save</button>
              <NavLink to={"/ra-homework-api-thunk-front"}>
                <button className={"btn-control"}>Cancel</button>
              </NavLink>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ServiceUpdate;
