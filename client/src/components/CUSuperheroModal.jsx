import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setError, isCUSuperheroModalShown } from '../store/reducers/superheroSlice';
import { fetchPage } from '../store/reducers/superheroAsyncThunk';

// Components
import InputText from './InputText';
import InputFile from './InputFile';
import Slider from './Slider';

// styles
import '../styles/components/CUSuperheroModal.scss'

// image
import plugImag from '../assets/secret.webp'

function CUSuperheroModal({ }) {

  const dispatch = useDispatch();
  let hero = useSelector(state => state.superhero.modals.CUSuperhero.hero);
  let mode = useSelector(state => state.superhero.modals.CUSuperhero.mode);
  const isCreateMode = mode === 'create';
  const isUpdateMode = mode === 'update';


  let { currentPage } = useSelector(state => state.superhero);

  if (!hero) {
    hero = {
      nickname: '', real_name: '', origin_description: '', superpowers: '', catch_phrase: '', images: '', _id: '',
    }
  };

  const [fields, setFields] = useState({
    nickname: hero.nickname,
    real_name: hero.real_name,
    origin_description: hero.origin_description,
    superpowers: hero.superpowers,
    catch_phrase: hero.catch_phrase,
    images: hero.images,
    id: hero._id,
    deleted: [],
  });


  function closeModalHandler(e) {
    if (e.currentTarget === e.target) dispatch(isCUSuperheroModalShown({ show: false, id: null }));
  }

  //  createSuperhero
  async function createSuperhero(e) {

    e.preventDefault()

    // Upload text fields http://localhost:3001/superhero
    let formDataText = new FormData();
    formDataText.set('nickname', fields.nickname);
    formDataText.set('real_name', fields.real_name);
    formDataText.set('origin_description', fields.origin_description);
    formDataText.set('superpowers', fields.superpowers);
    formDataText.set('catch_phrase', fields.catch_phrase);

    let id = null;
    // query
    try {

      const response = await fetch(`http://localhost:3001/superhero`, {
        method: "POST",
        body: formDataText
      });
      const data = await response.json();

      id = encodeURIComponent(data.id);

    } catch (e) {
      dispatch(setError(e))
    }

    // Upload image fields http://localhost:3001/superhero/uploadImages/?id=${id}


    let formDataFiles = new FormData();

    Array.from(fields.images).forEach((file) => {
      formDataFiles.append('images', file);
    })

    try {
      await fetch(`http://localhost:3001/superhero/uploadImages/?id=${id}`, {
        method: "POST",
        body: formDataFiles
      });
    } catch (e) {
      dispatch(setError(e))
    }

    // Update page
    dispatch(fetchPage({ pageNumber: currentPage }));

    // close modal
    dispatch(isCUSuperheroModalShown({ show: false, id: null }));
  }

  async function updateSuperhero(e) {

    e.preventDefault()

    // Upload text fields http://localhost:3001/superhero
    let formData = new FormData();
    formData.set('nickname', fields.nickname);
    formData.set('real_name', fields.real_name);
    formData.set('origin_description', fields.origin_description);
    formData.set('superpowers', fields.superpowers);
    formData.set('catch_phrase', fields.catch_phrase);
    fields.deleted.forEach((deleted) => {
      formData.append('deleted', deleted);
    })
    Array.from(fields.images).forEach((file) => {
      formData.append('images', file);
    })

    try {
        await fetch(`http://localhost:3001/superhero/?id=${fields.id}`, {
        method: "PUT",
        body: formData
      });

    } catch (e) {
      dispatch(setError(e))
    }

    // Update page
    dispatch(fetchPage({ pageNumber: currentPage }));

    // close modal
    dispatch(isCUSuperheroModalShown({ show: false, id: null }));
  }

  function deleteSlideHandler(slider) {
    setFields({ ...fields, deleted: [...fields.deleted, slider.currentSlide.ep] });
  }


  function inputSetFields(property) {
    return (value) => {
      if (typeof property === 'string' && property in fields) setFields(prev => ({ ...prev, [property]: value }));
    }
  }

  return (
    <div className="modal-cuhero" onClick={closeModalHandler}>
      <form className='modal-cuhero__form'>
        <h1 className='modal-cuhero__title'>{isCreateMode ? 'Create Superhero' : 'Update this Superhero'}</h1>
        <div className={isUpdateMode ? 'modal-cuhero__fields' : ''}>

          <div className="modal-cuhero__main-info">
            <InputText field={fields.nickname} setFieldCreator={inputSetFields.bind(null, 'nickname')} placeholder="Nickname" />
            <InputText field={fields.real_name} setFieldCreator={inputSetFields.bind(null, 'real_name')} placeholder="Real name" />
            <InputText field={fields.origin_description} setFieldCreator={inputSetFields.bind(null, 'origin_description')} placeholder="Origin description" />
            <InputText field={fields.superpowers} setFieldCreator={inputSetFields.bind(null, 'superpowers')} placeholder="Superpowers" />
            <InputText field={fields.catch_phrase} setFieldCreator={inputSetFields.bind(null, 'catch_phrase')} placeholder="Catch phrase" />
            <InputFile setFieldCreator={inputSetFields.bind(null, 'images')} />
          </div>
          <div className="modal-cuhero__slider">
            {isUpdateMode && (!hero.images.length
              ? <img className='plug-img' src={plugImag} />
              : <Slider images={hero.images} slideController={{ deleteSlideHandler }} />)}
          </div>
        </div>
        {isCreateMode && <button type='submit' onClick={createSuperhero} className='modal-cuhero__btn'>Create Superhero</button>}
        {isUpdateMode && <button type='submit' onClick={updateSuperhero} className='modal-cuhero__btn'>Confirm update</button>}

      </form>
    </div>

  )
}


export default CUSuperheroModal
