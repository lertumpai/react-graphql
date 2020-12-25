import React, { useState, useCallback } from 'react'
import moment from 'moment'

import Button from '../Button/dynamic'
import ModalConfirm from '../ModalConfirm/dynamic'
import ModalMemorizeUpdateContentBox from '../ModalMemorizeUpdateContentBox/dynamic'

import './style.scss'

const MemorizeContentBoxIndex = ({ memorize, author, onLike, onComment, onEdit, onDelete }) => {
  const [editContent, setEditContent] = useState('')
  const [editDisplay, setEditDisplay] = useState('hide')
  const [deleteDisplay, setDeleteDisplay] = useState('hide')

  const onClickDelete = useCallback(() => {
    setDeleteDisplay('')
  }, [])

  const onClickCancelDelete = useCallback(() => {
    setDeleteDisplay('hide')
  }, [])

  const onClickEdit = useCallback(() => {
    setEditContent(memorize?.content)
    setEditDisplay('')
  }, [])

  const onClickCancelEdit = useCallback(() => {
    setEditDisplay('hide')
  }, [])

  const onClickConfirmDelete = useCallback(() => {
    onDelete(memorize.id)
  }, [])

  const onClickComment = useCallback(() => {
    onComment(memorize.id)
  }, [])

  const onClickLike = useCallback(() => {
    const action = !memorize.userAction ? 'like' : 'unlike'
    onLike(memorize.id, action)
  }, [memorize?.userAction])

  const onEditContentChange = useCallback(e => {
    setEditContent(e.target.value)
  }, [])

  const onClickMemorize = useCallback(({ id, content }) => {
    onEdit({ id, content })
    setEditDisplay('hide')
  }, [])

  function MemorizeEditDeleteBox() {
    const classNameEdit = 'fa fa-pencil icon-edit-memorize'
    const classNameDelete = 'fa fa-trash-o icon-delete-memorize'
    return (
      <div className='container-edit-delete-box-memorize'>
        <i className={classNameEdit} onClick={onClickEdit} />
        <i className={classNameDelete} onClick={onClickDelete} />
      </div>
    )
  }

  function MemorizeContentBoxHead() {
    return (
      <div className='container-content-box-head-memorize'>
        <div className='container-content-box-head-profile-name-memorize'>
          {author?.profile?.name || 'unknown'}
          {memorize?.canMutate ? MemorizeEditDeleteBox() : ''}
        </div>
        <div className='container-content-box-head-createdAt-memorize'>
          {moment(memorize?.createdAt).format('DD/MM/YYYY HH:mm:ss')}
        </div>
      </div>
    )
  }

  function MemorizeCommentButton() {
    const classNameButton = 'button-comment-memorize blue-memorize'
    const value = <i className='fa fa-comment-o icon-comment-memorize' count={memorize?.comment || 0} />
    return onComment ? <Button className={classNameButton} onClick={onClickComment} value={value} /> : ''
  }

  function MemorizeLikeButton() {
    const action = memorize?.userAction ? memorize?.userAction.action : 'unlike'
    const classNameButton = `button-like-memorize ${action}-memorize`
    const classNameIcon = `fa fa-heart-o icon-like-memorize ${action}`
    const value = <i className={classNameIcon} count={memorize?.action || 0} />
    return <Button className={classNameButton} onClick={onClickLike} value={value} />
  }

  function MemorizeContentBoxBody() {
    return (
      <div className='container-content-box-body-memorize'>
        <div className='container-content-box-content-memorize'>
          {memorize?.content}
        </div>
        <hr className='content-box-body-horizontal-memorize' />
        <div className='container-content-box-body-button-memorize'>
          {MemorizeLikeButton()}
          {MemorizeCommentButton()}
        </div>
      </div>
    )
  }

  function MemorizeContentBox() {
    return (
      <>
        <ModalConfirm
          message='Are you sure you want to delete ?'
          display={deleteDisplay}
          onConfirm={onClickConfirmDelete}
          onCancel={onClickCancelDelete}
        />
        <ModalMemorizeUpdateContentBox
          id={memorize?.id}
          display={editDisplay}
          onTextAreaChange={onEditContentChange}
          content={editContent}
          onMemorize={onClickMemorize}
          onCancel={onClickCancelEdit}
        />
        <div className='container-memorize-content-box-memorize'>
          <MemorizeContentBoxHead />
          <MemorizeContentBoxBody />
        </div>
      </>
    )
  }

  return MemorizeContentBox()
}

export default React.memo(MemorizeContentBoxIndex)
