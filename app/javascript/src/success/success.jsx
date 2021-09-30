// success.jsx
import React, {useState, useEffect} from 'react';
import Layout from '@src/layout';
import { handleErrors } from '@utils/fetchHelper';
import './success.scss';

export default function Success (props) {
    const [authenticated, setAuthenticated] = useState(false)    
    const [booking, setBooking] = useState(null)
    const [loaded, setLoaded] = useState(false)

    useEffect( () => {
        fetch('/api/authenticated')
          .then(handleErrors)
          .then(data => {
            setAuthenticated(data.authenticated)
          })
        }, [authenticated])

    useEffect( () =>{
        fetch(`/api/bookings/${props.data.booking_id}/property`)
          .then(handleErrors)
          .then(data => {
            setBooking(data.bookings)
            setLoaded(true)
            console.log(data.bookings)
          })
    }, [loaded])

    if (loaded) {
        return (
            <Layout isLoggedIn={authenticated}>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-3"></div>
                        <div className="col-5">
                            <div className="py-4">
                                <h1 className="text-danger">Booking Completed</h1>
                                <p>Congratulations! Your booking has been completed successfully.</p>
                            </div>
                            <div className="py-3">
                                <img src={booking.image_url? booking.image_url:booking.images[0].image_url} alt="" className="pb-3"/>
                                <h5 className="pt-1">{booking.title}</h5>
                                <p>{booking.property_type}</p>
                            </div>
                            <div className="row py-3">
                                <div className="col-6">
                                    <p>Check-in</p>
                                    <p><b>{booking.start_date}</b></p>
                                </div>
                                <div className="col-6">
                                    <p>Check-out</p>
                                    <p><b>{booking.end_date}</b></p>
                                </div>
                            </div>
                            <a href="/trips" role="button" className="btn btn-danger my-3">View Your Trips</a>
                        </div>
                        <div className="col-4"></div>
                    </div>
                </div>
            </Layout>
        )
    } else {
        return null
    }
}