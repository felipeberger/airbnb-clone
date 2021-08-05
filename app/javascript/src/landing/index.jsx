import React from 'react'
import ReactDOM from 'react-dom'
import Landing from './landing';
import { BrowserRouter as Router } from "react-router-dom";

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Router>
      <Landing />
    </Router>,
    document.body.appendChild(document.createElement('div')),
  )
})