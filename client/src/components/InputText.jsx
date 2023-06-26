import React from 'react'

// Styles
import '../styles/components/InputText.scss'


function InputText({ placeholder, field, setFieldCreator }) {

  let setField = setFieldCreator();

  function onChangeHandler(e) {
    setField(e.target.value);
  }

  return (
    <div className='input-text'>
      <input value={field} name='images' required onChange={onChangeHandler} className="input-text__input" placeholder=' ' type="text" />
      <span className="input-text__placeholder">{placeholder}</span>
    </div>
  )
}



export default InputText
