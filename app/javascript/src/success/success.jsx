// success.jsx
import React, {useState, useEffect} from 'react';
import Layout from '@src/layout';
import { handleErrors } from '@utils/fetchHelper';
import './success.scss';

export default function Success (props) {
    const [authenticated, setAuthenticated] = useState(false)    
    const [property, setProperty] = useState(null)

    useEffect( () => {
        fetch('/api/authenticated')
          .then(handleErrors)
          .then(data => {
            setAuthenticated(data.authenticated)
            setUsername(data.username)
          })
        }, [authenticated]
    )

    

    return (
        <Layout isLoggedIn={authenticated}>
            <p>Success Page</p>
        </Layout>
    )
}