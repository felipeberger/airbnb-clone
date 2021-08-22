// layout.js
import React, {useState, useEffect} from 'react';
import LoginWidget from './login/loginWidget';
import 'bootstrap/dist/js/bootstrap.bundle.min';

const loggedIn = () => {
  return (
    <>
    <a className="dropdown-item" href="">Messages</a>
    <a className="dropdown-item" href="">Notifications</a>
    <a className="dropdown-item" href="/trips">Trips</a>
    <div className="dropdown-divider"></div>
    <a className="dropdown-item" href="/hosting">Manage Listings</a>
    <a className="dropdown-item" href="">Host an Experience</a>
    <div className="dropdown-divider"></div>
    <a className="dropdown-item" href="">Help</a>
    <a className="dropdown-item" href="">Log Out</a>
    </>
  )
}

const notLoggedIn = () => {
  return (
    <>
    <a className="dropdown-item" id="log-in" href="/login" >Log In</a>
    <a className="dropdown-item" id="sign-up" href="">Sign Up</a>
    <div className="dropdown-divider"></div>
    <a className="dropdown-item" href="">Host Your Home</a>
    <a className="dropdown-item" href="">Host an Experience</a>
    <a className="dropdown-item" href="">Help</a>
    </>
  )
}

const Layout = (props) => {
  const [dropDownData, setDropdown] = useState(notLoggedIn)

  useEffect( ()=>{
    if (props.isLoggedIn) {
      setDropdown(loggedIn);
    } else {
      setDropdown(notLoggedIn);
    }
  })

  return (
    <React.Fragment>
      <nav className="navbar navbar-light bg-light">
        <a href="/"><span className="navbar-brand mb-0 h1 text-danger">Airbnb</span></a>

        <div className="dropleft">
          <button className="btn rounded dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="dropdown-menu rounded mr-2">
            {dropDownData}
          </div>
        </div>

      </nav>
      {props.children}
      <footer className="p-3 bg-light">
        <div>
          <p className="mr-3 mb-0 text-secondary">Airbnb Clone</p>
        </div>
      </footer>
    </React.Fragment>
  );
}

export default Layout;
