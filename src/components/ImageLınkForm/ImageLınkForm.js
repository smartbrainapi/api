import React from "react";
import "./ImageLınkForm.css";
const ImageLınkForm = ({
  onInputChange,
  onDetectButtonSubmit,
  onTagsButtonSubmit
}) => {
  return (
    <div>
      <p className=' white f3'>
        {"This Magic Brain will detect faces or tags in your pictures!!"}
      </p>
      <div className='center'>
        <div className='pa4 br3 shadow-5 center form'>
          <input
            className='f4 pa2 w-70 center'
            type='text'
            onChange={onInputChange}
          />
          <button
            className='button w-30 grow f4 link ph3 pv2 dib white bg-light-purple'
            onClick={onDetectButtonSubmit}
          >
            Detect Face
          </button>
          <button
            className='button w-30 grow f4 link ph3 pv2 dib white bg-light-purple'
            onClick={onTagsButtonSubmit}
          >
            Detect Tags
          </button>
        </div>
      </div>
    </div>
  );
};
export default ImageLınkForm;
