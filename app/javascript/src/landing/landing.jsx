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
    const [pickerStartDate, setPickerStart ] = useState(null);
    const [endDate, setEndDate ] = useState(null);
    const [pickerEndDate, setPickerEnd ] = useState(null);
    const [focusedStart, setStartFocus ] = useState(false);
    const [focusedEnd, setEndFocus ] = useState(false);
    const [location, setLocation ] = useState(null);
    const [guests, setGuests ] = useState(0);
  
    useEffect( () => {
      fetch('/api/authenticated')
        .then(handleErrors)
        .then(data => {
          setAuthenticated(data.authenticated)
        })
      }, [authenticated]
    )

    const submitSearch = (e) => {       
        fetch(`/api/properties/${location}/${startDate}/${endDate}/${guests}/search`)
            .then(handleErrors)
            .then(data => {
                window.location = `/properties/${location}/${startDate}/${endDate}/${guests}?page=1`
            })
    }

    const changeLocation = (e) => {
        setLocation(e.target.value);
    }

    const changeGuests = (e) => {
        setGuests(e.target.value);
    }

    const formatStartDate = (e) =>{
        let tempStart = new Date(e).toISOString().split('T')[0]        
        setStartDate(tempStart)
        setPickerStart(e)
    }

    const formatEndDate = (e) =>{
        let tempEnd = new Date(e).toISOString().split('T')[0]        
        setEndDate(tempEnd)
        setPickerEnd(e)
    }

    return (
        <Layout isLoggedIn={authenticated}>
            <div className="background">
                <div className="row d-flex justify-content-center">
                    <div className="col-8 mt-5">

                        <div className="row bg-white mt-3 rounded-pill searchbar">
                            <div className="col-1 my-1"></div> 
                            <div className="col-2 border-right my-2">
                                <p className="mb-1">Location</p>
                                <input type="text" className="border-0 col-12 pl-0" placeholder="Add location" onChange={changeLocation} />
                            </div>
                            <div className="col-3 border-right my-2 start-date">
                                <p className="mb-1">Check in</p>
                                <SingleDatePicker
                                    date={pickerStartDate} // momentPropTypes.momentObj or null
                                    onDateChange={date => formatStartDate(date)} // PropTypes.func.isRequired
                                    focused={focusedStart.focused} // PropTypes.bool
                                    onFocusChange={({ focused }) => setStartFocus({ focused })} // PropTypes.func.isRequired
                                    id="start_date" // PropTypes.string.isRequired,
                                />
                            </div>
                            <div className="col-3 border-right my-2 end-date">
                                <p className="mb-1">Check out</p>                           
                                <SingleDatePicker
                                    date={pickerEndDate} // momentPropTypes.momentObj or null
                                    onDateChange={date => formatEndDate(date)} // PropTypes.func.isRequired
                                    focused={focusedEnd.focused} // PropTypes.bool
                                    onFocusChange={({ focused }) => setEndFocus({ focused })} // PropTypes.func.isRequired
                                    id="end_date" // PropTypes.string.isRequired,
                                />
                            </div>
                            <div className="col-2 my-2">
                                <p className="mb-1">Guests</p>
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
        </Layout>
    )
}
