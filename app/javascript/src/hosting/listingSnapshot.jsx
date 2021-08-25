import { map } from 'jquery';
import React, {useState, useEffect} from 'react';
import { handleErrors } from '@utils/fetchHelper';

export default function ListingSnapshot (props) {
    const [displayBookings, setDisplayBookings] = useState(false)
    const [bookings, setBookings] = useState([])
    const [property, setProperty] = useState(null)

    useEffect( ()=> {
        fetch(`api/properties/${props.property.id}/bookings`)
        .then(handleErrors)
        .then(data => {
            console.log(data)
            setBookings(data.bookings)
        })
    }, [])
    
    useEffect( ()=>{
        setProperty(props.property)
    }, [] )

    const clickHandler = () => {
        setDisplayBookings(!displayBookings)
    }

    let placeholderPic = "https://media.istockphoto.com/photos/white-studio-background-picture-id1040250650?k=6&m=1040250650&s=612x612&w=0&h=Ve0znmMwCbVyo66uIfeSrSYRuHau85oBiVIv1OplATs="

    const noBookings = () => {
        return (
            <div className="py-3">
                <h5>No Bookings found for this property</h5>
            </div>
        )
    }

    if (property) {

        return (
            <>
            <div className="row my-3 pt-2">
                <div className="col-4 listing-preview pr-sm-1 pr-md-0">
                    <div key={props.key} className="card" style={{width: "14rem"}}>
                        <img className="card-img-top" src={property.image_url? property.image_url:placeholderPic} alt="Property picture" />
                        <div className="card-body text-center">
                            <button className="card-title btn btn-secondary btn-lg btn-block" onClick={clickHandler}>Upcoming Bookings</button>
                        </div>
                    </div>
                </div>
                <div className="col-5 my-3">
                    <h5>{property.title}</h5>
                    <p>{property.description}</p>
                </div>
                <div className="col-3 d-flex flex-column my-3">
                    {/* TODO add listing page redirect with listing id once the listing page has been created */}
                    <a href="" role="button" className="btn btn-danger my-2">Edit listing</a>
                    <button className="btn btn-danger my-2">Disable listing</button>
                    <button className="btn btn-danger my-2">Delete listing</button>
                </div>
                <div className={displayBookings? "pb-2 pt-3":"pb-2 pt-3 d-none"}>
                    {bookings.length > 0? <h5 className="pb-2">Upcoming bookings:</h5>: <h5 className="pb-2">No bookings found for this property</h5>}
                    {bookings.map( booking => {

                        return (
                            <div key={booking.id} className="row">
                                <div className="col-4">
                                    <div className="card" style={{width: "11rem"}}>
                                        <ul className="list-group list-group-flush">
                                            <li className="list-group-item">Guest: {booking.guest}</li>
                                            <li className="list-group-item">Start: {booking.start_date}</li>
                                            <li className="list-group-item">End: {booking.end_date}</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        )  
                    })}
                </div>
            </div>
            <hr />
            </>
        )
    } else {
        return null
    }
} 
