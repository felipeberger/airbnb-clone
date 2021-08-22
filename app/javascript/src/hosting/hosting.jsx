import React, {useState, useEffect} from 'react';
import Layout from '@src/layout';
import { handleErrors } from '@utils/fetchHelper';
import './hosting.scss';

export default function Hosting () {
    const [listings, setListings] = useState(null)
    const [listingCards, setListingCards] = useState(null)



    const displayListings = (bool) => {
        if (!bool) {
            return (
            <div className="row">
                <div className="col-3">
                    <div key={0} className="card" style={{width: "13rem"}}>
                        <img className="card-img-top" src="https://media.istockphoto.com/photos/white-studio-background-picture-id1040250650?k=6&m=1040250650&s=612x612&w=0&h=Ve0znmMwCbVyo66uIfeSrSYRuHau85oBiVIv1OplATs=" alt="No properties found" />
                        <div className="card-body">
                            {/* TODO add link to listing edit page on property title below */}
                            <h5 className="card-title">Property Title</h5>
                        </div>
                    </div>
                </div>
                <div className="col-9">
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
        <Layout>
            <div className="container-fluid">
                {displayListings(false)}
            </div>
        </Layout>
    )
}