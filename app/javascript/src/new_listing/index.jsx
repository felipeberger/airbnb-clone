import React from 'react'
import ReactDOM from 'react-dom'
import NewListing from './new_listing';

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <NewListing />,
    document.body.appendChild(document.createElement('div')),
  )
})