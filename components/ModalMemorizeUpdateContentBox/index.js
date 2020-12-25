import React from 'react'

import TextAreaBox from '../TextAreaBox/dynamic'
import Modal from '../Modal/dynamic'
import Button from '../Button/dynamic'

const ModalMemorizeUpdateContentBoxIndex = ({ id, content, onTextAreaChange, onMemorize, onCancel, display }) => {
  function onClickMemorize() {
    onMemorize({ id, content })
  }

  function MemorizeCreateButton() {
    const classNameButton = 'memorize-create-button-memorize modal-button-memorize'
    const classNameCancelButton = 'memorize-create-button-memorize cancel-button-memorize modal-button-memorize'
    const classNameMemorizeButton = classNameButton + (content ? '' : ' disable-click-memorize')
    return (
      <div className='memorize-form-create-button-memorize modal-form-memorize'>
        <Button onClick={onClickMemorize} className={classNameMemorizeButton} value='Memorize' />
        <Button onClick={onCancel} className={classNameCancelButton} value='Cancel' />
      </div>
    )
  }

  function ModalMemorizeUpdateContentBox() {
    return (
      <Modal display={display}>
        <TextAreaBox
          className='memorize-textarea-content-box-memorize'
          id='TextAreaBox'
          value={content}
          onChange={onTextAreaChange}
        />
        {MemorizeCreateButton()}
      </Modal>
    )
  }

  return ModalMemorizeUpdateContentBox()
}

export default React.memo(ModalMemorizeUpdateContentBoxIndex)