import React, {useState, useEffect} from 'react';
import Layout from '@src/layout';
import { handleErrors } from '@utils/fetchHelper';
import './hosting.scss';
import Listing from "./listing";

export default function Hosting () {
    const [listings, setListings] = useState(null)
    const [authenticated, setAuthenticated] = useState(false)
    const [username, setUsername] = useState(null)

    useEffect( () => {
        fetch('/api/authenticated')
          .then(handleErrors)
          .then(data => {
            setAuthenticated(data.authenticated)
            setUsername(data.username)
          })
        }, [authenticated])

    useEffect( () => {
        fetch(`api/users/${username}/properties`)
        .then(handleErrors)
        .then(data => {
            setListings(data.user.properties)
        })
    }, [username])

    return (
        <Layout isLoggedIn={authenticated}>
            <div className="container">
                {/* {listings? <Listing property={listings[2]} />:null} */}
                {listings? listings.map( property => {
                    return (
                        <div key={property.id}>
                            <Listing property={property} />
                        </div>
                    )
                }):null}
            </div>
        </Layout>
    )
}