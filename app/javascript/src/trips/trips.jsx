import React, {useState, useEffect} from 'react';
import Layout from '@src/layout';
import { safeCredentials, handleErrors } from '@utils/fetchHelper';
import './trips.scss';

export default function Trips () {

    const [authenticated, setAuthenticated ] = useState(false);
    const [username, setUsername] = useState(null);
    const [bookings, setBookings] = useState(null);
    const [properties, setProperties] = useState(null);
    const [upcoming, setUpcoming] = useState(true);
    const [today, setToday] = useState(null);
  
    useEffect( () => {
      fetch('/api/authenticated')
        .then(handleErrors)
        .then(data => {
          setAuthenticated(data.authenticated)
          setUsername(data.username)
        })
      }, [authenticated]
    )

    useEffect(() => {
        fetch(`api/users/${username}/bookings`)
            .then(handleErrors)
            .then(data => {
                setBookings(data.user.bookings)
            })
    }, [username]
    )

    useEffect(() => {
        setToday(new Date().toISOString().split('T')[0])
    }, [bookings])

    useEffect(() => {
        if (bookings) {
            let propertiesIds = bookings.map(booking => {
                return booking.property_id
            })

            fetch(`api/properties/${propertiesIds}/search`)
                .then(handleErrors)
                .then(data => {
                    console.log(data)
                    setProperties(data.propertiesById)
                })
        }

    }, [bookings])

    const displayBookings = (bool) => {
        if (!bool) {
            return (
            <div key={0} className="card" style={{width: "16rem"}}>
                <img className="card-img-top" src="https://media.istockphoto.com/photos/white-studio-background-picture-id1040250650?k=6&m=1040250650&s=612x612&w=0&h=Ve0znmMwCbVyo66uIfeSrSYRuHau85oBiVIv1OplATs=" alt="Loading" />
                <div className="card-body">
                    <h5 className="card-title">No bookings could be found</h5>
                </div>
            </div>
            )
        } 
 
        let bookingCards = [];
        
        if (properties) {
            for (let i = 0; i < bookings.length; i++) {
                if (upcoming && Date.parse(bookings[i].start_date) >= Date.parse(today)) {

                    bookingBuilder(i, bookingCards)
                    
                } else if (!upcoming && Date.parse(bookings[i].start_date) < Date.parse(today)) {
                    bookingBuilder(i, bookingCards)
                }
            }
            return bookingCards
        }
    }

    const bookingBuilder = (i, bookingsArray) => {
        bookingsArray.push(
            <div key={bookings[i].id} className="card mx-2 my-2" style={{width: "16rem"}}>
                <img className="card-img-top" src={properties[i].image_url} alt="Property picture" /> 
                <div className="card-body">
                <h5 className="card-title"> <b>{properties[i].title}</b> </h5>
                <p className="card-text">{properties[i].city}</p>
                <p className="card-text">Checking in on <b>{bookings[i].start_date}</b></p>
                <a href={`/property/${bookings[i].property_id}`} className="btn btn-secondary btn-sm" role="button" >See Property Details</a>
                </div>
            </div>
        )
    }

    const toggleActive = (e) => {
        if (e.target.id === "upcoming") {
            setUpcoming(true)
        } else if (e.target.id === "past") {
            setUpcoming(false)
        }
    }

return (
    <Layout isLoggedIn={authenticated}>
            <div className="py-3">
                <h2>Trips</h2>
            </div>
            <div>
                {/* TODO add style so bottom border of selected className will show bold */}
                <button id="upcoming" className={upcoming? "btn btn-danger" : "btn" } onClick={toggleActive}>Upcoming</button>
                <button id="past" className={upcoming? "btn": "btn btn-danger"} onClick={toggleActive}>Past</button>
                <hr className="mt-0" />
                <div className="row py-3">
                    {bookings? displayBookings(true):displayBookings(false)}
                </div>
                <hr />
            </div>
            <div>
                <a href="/" className="btn btn-danger btn-lg" role="button" >Explore AirBnB</a>
            </div>
            <hr />
        </Layout> 
    )
}