// login.jsx
import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import Layout from '@src/layout';
import LoginWidget from './loginWidget';
import SignupWidget from './signupWidget';
import { safeCredentials, handleErrors } from '@utils/fetchHelper';
import './login.scss';

export default function Login () {
  
  const [authenticated, setAuthenticated ] = useState(false);
  const [show_login, setShowLogin] = useState(true);

  useEffect( () => {
    fetch('/api/authenticated')
      .then(handleErrors)
      .then(data => {
        setAuthenticated(data.authenticated)
      })
    }, [authenticated]
  )

  const toggle = () => {
    setShowLogin(!show_login);
  }

  if (authenticated) {
    return (
      <Layout isLoggedIn={authenticated}>
        <div className="container">
          <div className="row">
            <div className="col-12 col-md-9 col-lg-6 mx-auto my-4">
              <div className="border p-4">
                <p className="mb-0">You are already logged in 🙂</p>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  };

  return (
    <Layout isLoggedIn={authenticated}>
      <div className="container">
        <div className="row">
          <div className="col-12 col-md-9 col-lg-6 mx-auto my-4">
            <div className="border p-4">
              {show_login ? <LoginWidget toggle={toggle} /> : <SignupWidget toggle={toggle} />}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );

}
