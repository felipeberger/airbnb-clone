import React, {useState, useEffect} from 'react';
import Layout from '@src/layout';
import { handleErrors } from '@utils/fetchHelper';
import './hosting.scss';
import ListingSnapshot from "./listingSnapshot";

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
            // console.log(data)
            setListings(data.user)
        })
    }, [username])

    // TODO add a button after listings (or before, if it looks better) that lets users create a new listing. This avoids showing an empty page for people without listings
    
    return (
        <Layout isLoggedIn={authenticated}>
            <div className="container">
                <h3 className="pt-3">Your Listings</h3>
                {listings? listings.map( property => {
                    return (
                        <div key={property.id}>
                            <ListingSnapshot property={property} />
                        </div>
                    )
                }):null}
                <div className="text-center">
                    <a href="/new_listing" role="button" className="btn btn-danger btn-lg mb-3 mt-2">Add New Listing</a>
                </div>
            </div>
        </Layout>
    )
}