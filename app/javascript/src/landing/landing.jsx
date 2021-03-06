import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import 'react-dates/initialize';
import { SingleDatePicker } from 'react-dates';
import Layout from '@src/layout';
import { safeCredentials, handleErrors } from '@utils/fetchHelper';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import 'react-dates/lib/css/_datepicker.css';
import './landing.scss'
import { data } from 'jquery';

export default function Landing () {
    const [authenticated, setAuthenticated ] = useState(null);
    const [startDate, setStartDate ] = useState(null);
    const [endDate, setEndDate ] = useState(null);
    const [focusedStart, setStartFocus ] = useState(false);
    const [focusedEnd, setEndFocus ] = useState(false);
    const [location, setLocation ] = useState(null);
    const [guests, setGuests ] = useState(0);
    const [searchHelp, setSearchHelp] = useState(false);
  
    useEffect( () => {
      fetch('/api/authenticated')
        .then(handleErrors)
        .then(data => {
          setAuthenticated(data.authenticated)
        })
      }, [authenticated]
    )

    const submitSearch = (e) => {
        fetch(`/api/properties/${location}/check`)
            .then( (data) => {
                if (!data.ok) {
                    setSearchHelp(true)
                } else {
                    window.location = `/properties/${location}/${startDate}/${endDate}/${guests}?page=1`
                }            
            })
    }

    const changeLocation = (e) => {
        setLocation(e.target.value);
        setSearchHelp(false);
    }

    const changeGuests = (e) => {
        setGuests(e.target.value);
    }

    const changeVisibility = () => {
        return (
        <div className="position-absolute rounded bg-white border border-danger search-popup mt-3 px-2">
            <p>No properties found, try one of the following cities:</p>
            <ul>
                <li>New York</li>
                <li>Brooklyn</li>
                <li>Jersey City</li>
                <li>Weehawken</li>
            </ul>
        </div>
        ) 
    }

    return (
        <Layout isLoggedIn={authenticated}>
            <div 
                className="background"
                style={{minHeight: `${Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0) - 112}px`}}    
            >
                <div className="container-fluid">
                <div className="row d-flex justify-content-center">
                    <div className="col-8 mt-5">

                        <div className="row bg-white mt-3 rounded-pill searchbar">
                            <div className="col-1 my-1"></div> 
                            <div className="col-2 border-right my-2">
                                <p className="mb-1 search-text">Location</p>
                                <input type="text" className="border-0 col-12 pl-0" placeholder="Add location" id="location-input" onChange={changeLocation} />
                                {searchHelp ? changeVisibility():null}
                            </div>
                            <div className="col-3 border-right my-2 start-date">
                                <p className="mb-1 search-text">Check in</p>
                                <SingleDatePicker
                                    date={startDate} // momentPropTypes.momentObj or null
                                    onDateChange={date => setStartDate(date)} // PropTypes.func.isRequired
                                    focused={focusedStart.focused} // PropTypes.bool
                                    onFocusChange={({ focused }) => setStartFocus({ focused })} // PropTypes.func.isRequired
                                    id="start_date" // PropTypes.string.isRequired,
                                />
                            </div>
                            <div className="col-3 border-right my-2 end-date">
                                <p className="mb-1 search-text">Check out</p>                           
                                <SingleDatePicker
                                    date={endDate} // momentPropTypes.momentObj or null
                                    onDateChange={date => setEndDate(date)} // PropTypes.func.isRequired
                                    focused={focusedEnd.focused} // PropTypes.bool
                                    onFocusChange={({ focused }) => setEndFocus({ focused })} // PropTypes.func.isRequired
                                    id="end_date" // PropTypes.string.isRequired,
                                />
                            </div>
                            <div className="col-2 my-2">
                                <p className="mb-1 search-text">Guests</p>
                                <input type="number" className="border-0 col-12 pl-0" placeholder="Add guests" onChange={changeGuests}/>
                            </div>
                            <div className="col-1 my-1 search-icon text-left ml-0 pl-0 d-flex align-items-center">
                                <button className="rounded-circle border-0 px-3 py-3 search-btn bg-danger text-white" onClick={submitSearch}>
                                    <FontAwesomeIcon icon={faSearch} id="search-icon"/>
                                </button>
                            </div>
                        </div>  

                    </div>
                </div>

                </div>
            </div>
        </Layout>
    )
}
