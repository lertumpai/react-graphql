import React from 'react'
import './style.scss'

const Index = ({ onClick, value, style, className = '' }) => {
  return <div className={className || `button-memorize`} onClick={onClick} style={style} >{value}</div>
}

export default Index
