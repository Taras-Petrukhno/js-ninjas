import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { isSuperheroModalShown, isCUSuperheroModalShown } from '../store/reducers/superheroSlice'
import { fetchPage, deleteHeroById } from '../store/reducers/superheroAsyncThunk'
import plugImag from '../assets/secret.webp'
// style
import '../styles/components/SuperheroItem.scss'



export default function SuperheroItem({ hero }) {
    const dispatch = useDispatch();
    const { currentPage } = useSelector(state => state.superhero);


    function onClickHandler(e) {
        dispatch(isSuperheroModalShown({ show: true, hero }))
    }

    function onUpdateHandler(e) {
        e.stopPropagation();
        dispatch(isCUSuperheroModalShown({ show: true, hero, mode: 'update' }))
    }

    function removeHandler(e) {
        e.stopPropagation();
        dispatch(deleteHeroById(e.currentTarget.dataset.id));
        dispatch(fetchPage({ pageNumber: currentPage, countPerPage: 5 }));
    }

    return (
        <div onClick={onClickHandler} data-id={hero._id} className="superhero-item">
            <div className="superhero-item__info">
                <div className="superhero-item__image-wrapper">
                    {!hero.images.length
                        ? <img className='plug-img' src={plugImag} />
                        : <img className='superhero-item__image' src={process.env.REACT_APP_API_URL + hero.images[0]} alt="avatar" />}
                </div>
                <p className="superhero-item__nickname">{hero.nickname}</p>
            </div>
            <div className="superhero-item__controller">
                <button className="superhero-item__btn" data-id={hero._id} onClick={removeHandler}>Remove</button>
                <button className="superhero-item__btn" data-id={hero._id} onClick={onUpdateHandler}>Update</button>
            </div>
        </div>
    )
}
