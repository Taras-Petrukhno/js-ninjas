import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { isSuperheroModalShown } from '../store/reducers/superheroSlice'
// Components
import Slider from '../components/Slider.jsx'

// img
import plugImag from '../assets/secret.webp'

// styles
import '../styles/components/SuperheroCardModal.scss';

export default function SuperheroCardModal() {
  const dispatch = useDispatch();
  const hero = useSelector(state => state.superhero.modals.superheroCard.hero);

  function onClickHandler(e) {
    if (e.target === e.currentTarget) {
      dispatch(isSuperheroModalShown({ show: false, hero: null }))
    }
  }

  return (
    <div className="modal-hero" onClick={onClickHandler}>
      <div className="modal-hero__card">
        <div className="modal-hero__image-wrapper">
          {!hero.images.length
            ? <img className='plug-img' src={plugImag} />
            : <Slider images={hero.images} />}
        </div>
        <div className="modal-hero__info">
          <h4 className="modal-hero__info-label">Nickname</h4>
          <p className='modal-hero__info-field'>{hero.nickname}</p>
          <h4 className="modal-hero__info-label">Real name</h4>
          <p className='modal-hero__info-field'>{hero.real_name}</p>
          <h4 className="modal-hero__info-label">Origin description</h4>
          <p className='modal-hero__info-field'>{hero.origin_description}</p>
          <h4 className="modal-hero__info-label">Superpowers</h4>
          <p className='modal-hero__info-field'>{hero.superpowers}</p>
          <h4 className="modal-hero__info-label">Catch phrase</h4>
          <p className='modal-hero__info-field'>{hero.catch_phrase}</p>
        </div>
      </div>
    </div>
  )
}
