import React from 'react'
import ReactDOM from 'react-dom'
import Listing from './listing';

document.addEventListener('DOMContentLoaded', () => {
  const node = document.getElementById('params');
  const data = JSON.parse(node.getAttribute('data-params'));

  ReactDOM.render(
    <Listing data={data} />,
    document.body.appendChild(document.createElement('div')),
  )
})