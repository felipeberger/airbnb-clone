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
          })
    }, [loaded])

    return (
        <Layout isLoggedIn={authenticated}>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-3"></div>
                    <div className="col-8">
                        <div className="py-4">
                            <h1 className="text-danger">Booking Completed</h1>
                            <p>Congratulations! Your booking has been completed successfully.</p>
                        </div>
                        <div className="py-3">
                            <img src={booking? booking.image_url:null} alt="" />
                            <h5 className="pt-1">{booking? booking.title:null}</h5>
                            <p>{booking? booking.property_type:null}</p>
                        </div>
                        <div className="row py-3">
                            <div className="col-6">
                                <p>Check-in</p>
                                <p><b>{booking? booking.start_date:null}</b></p>
                            </div>
                            <div className="col-6">
                                <p>Check-out</p>
                                <p><b>{booking? booking.end_date:null}</b></p>
                            </div>
                        </div>
                        <a href="/trips" role="button" className="btn btn-danger my-3">View Your Trips</a>
                    </div>
                    <div className="col-1"></div>
                </div>
            </div>
        </Layout>
    )
}