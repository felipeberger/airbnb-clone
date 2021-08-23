import React, {useState, useEffect} from 'react';
import Layout from '@src/layout';
import { handleErrors } from '@utils/fetchHelper';
import './hosting.scss';

export default function Hosting () {
    const [listings, setListings] = useState(null)
    const [listingCards, setListingCards] = useState(null)
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



    
    const displayListings = (bool) => {
        if (!bool) {
            return (
            <>
            <div className="row my-3 pt-2">
                <div className="col-4 listing-preview">
                    <div key={0} className="card" style={{width: "18rem"}}>
                        <img className="card-img-top" src="https://media.istockphoto.com/photos/white-studio-background-picture-id1040250650?k=6&m=1040250650&s=612x612&w=0&h=Ve0znmMwCbVyo66uIfeSrSYRuHau85oBiVIv1OplATs=" alt="No properties found" />
                        <div className="card-body text-center">
                            <button className="card-title btn btn-secondary btn-lg btn-block">Upcoming Bookings</button>
                        </div>
                    </div>
                </div>
                <div className="col-5 my-3">
                    <h4>Property Title</h4>
                    <p>description</p>
                    <p>City</p>
                    <p>Country</p>
                    <p>Price per night</p>
                </div>
                <div className="col-3 d-flex flex-column my-3">
                    <button className="btn btn-danger my-2">Edit listing</button>
                    <button className="btn btn-danger my-2">Disable listing</button>
                    <button className="btn btn-danger my-2">Delete listing</button>
                </div>
                <div className="upcoming-bookings pt-3 pb-2 d-none">
                    <h5 className="pb-2">Upcoming bookings:</h5>
                    <div className="row">
                        <div className="col-4">
                            <div className="card" style={{width: "11rem"}}>
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item">Guest: xx</li>
                                    <li className="list-group-item">Start: xxx</li>
                                    <li className="list-group-item">End: xxx</li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-4">
                            <div className="card" style={{width: "11rem"}}>
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item">Guest: xx</li>
                                    <li className="list-group-item">Start: xxx</li>
                                    <li className="list-group-item">End: xxx</li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-4">
                            <div className="card" style={{width: "11rem"}}>
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item">Guest: xx</li>
                                    <li className="list-group-item">Start: xxx</li>
                                    <li className="list-group-item">End: xxx</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <hr />
            </>
            )
        } 
 
        let cards = [];
        
        if (listings) {
            for (let i = 0; i < listings.length; i++) {
                cards.push(
                    <div className="row">
                        <div className="col-4">
                            <div key={listings[i].id} className="card mx-3 my-2" style={{width: "13rem"}}>
                                <img className="card-img-top" src={properties[i].image_url} alt="Property picture" /> 
                                <div className="card-body">
                                    <h5 className="card-title"> <b>{properties[i].title}</b> </h5>
                                    <p className="card-text">{properties[i].city}</p>
                                    <p className="card-text">Checking in on <b>{listings[i].start_date}</b></p>
                                    <a href={`/property/${listings[i].property_id}`} className="btn btn-secondary btn-sm" role="button" >See Property Details</a>
                                </div>
                            </div>
                        </div>
                        <div className="col col-8">
                            <h5 className="pb-2">Upcoming bookings:</h5>
                            <div className="card" style={{width: "11rem"}}>
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item">Guest: xx</li>
                                    <li className="list-group-item">Start: xxx</li>
                                    <li className="list-group-item">End: xxx</li>
                                </ul>
                            </div>
                            <div className="card" style={{width: "11rem"}}>
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item">Guest: something</li>
                                    <li className="list-group-item">Start: another time</li>
                                    <li className="list-group-item">End: ending</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                )

            }
            setListingCards(cards)
        }
    }


    return (
        <Layout isLoggedIn={authenticated}>
            <div className="container">
                {displayListings(false)}
            </div>
        </Layout>
    )
}