import React, {useState } from 'react'


// styles
import '../styles/components/InputFile.scss'

function InputFile({ setFieldCreator }) {
  const setField = setFieldCreator();
  const [info, setInfo] = useState({
    count: 0
  });


  const handleChange = (e) => {
    setField(e.target.files)
    setInfo({ ...info, count: e.target.files.length })
  }

  function returnInfoText() {
    return `Selected ${info.count} files`
  }
  return (
    <div className={`input-file`}>
      <label htmlFor='input-file' className={`input-file__label`}>
        <input id="input-file" type="file" multiple onChange={handleChange} className="input-file__input" />
        <button type="button" className="input-file__btn">Upload</button>
        <p className="input-file__info">{returnInfoText()}</p>
      </label>
    </div>
  )
}


export default InputFile
