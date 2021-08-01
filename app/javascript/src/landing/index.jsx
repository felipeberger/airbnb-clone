import React from 'react'
import ReactDOM from 'react-dom'
import Landing from './landing';

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Landing />,
    document.body.appendChild(document.createElement('div')),
  )
})