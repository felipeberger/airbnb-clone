import React, {useState, useEffect} from 'react';
import Layout from '@src/layout';
import { handleErrors } from '@utils/fetchHelper';
import './listing.scss';

export default function Listing () {
    const [authenticated, setAuthenticated] = useState(false)
    const [property, setProperty] = useState(null)
    const [username, setUsername] = useState(null)
    const [update, setUpdate] = useState(null)
    
    useEffect( () => {
        fetch('/api/authenticated')
          .then(handleErrors)
          .then(data => {
            setAuthenticated(data.authenticated)
            setUsername(data.username)
          })
        }, [])

    useEffect( ()=> {
        fetch(`/api/properties/${1}`)
            .then(handleErrors)
            .then(data => {
                setProperty(data.property)
            })
    }, [authenticated])

    const changeHandler = (e) => {
        const key = e.target.id
        const value = e.target.value
        setUpdate( {[key] : value} )
    } 

    const listing = () => {
        return(
            <Layout isLoggedIn={authenticated}>
                <div className="container">
                    <div className="pt-4 pb-2">
                        <h2>Your listing</h2>
                        <h5><i>{property.title}</i></h5>
                        <hr />
                    </div>
                    <div className="">
                        <div className="d-inline-block">
                            <p className=""><strong>Photos</strong></p>
                        </div>
                        <div className="d-inline-block float-right">
                            <a href="">Edit ></a>
                        </div>
                        <hr />
                    </div>
                    <div className="listing-basics">
                        <p><strong>Listing Basics</strong></p>

                        <div className="d-inline-block">
                            <p className="">Title</p>
                        </div>
                        <div className="d-inline-block float-right">
                            <a href="">Edit ></a>
                        </div>
                        <div className="form-group pr-5">
                           <input type="text" className="form-control" id="title" defaultValue={property.title} onChange={changeHandler} />
                        </div>
                        <hr />

                        <div className="d-inline-block">
                            <p className="">Description</p>
                        </div>
                        <div className="d-inline-block float-right">
                            <a href="">Edit ></a>
                        </div>
                        <div className="form-group pr-5">
                            <textarea className="form-control" id="description" defaultValue={property.description} onChange={changeHandler} />
                        </div>
                        <hr />

                        <div className="d-inline-block">
                            <p className="">Price per night</p>
                        </div>
                        <div className="form-group d-inline-block float-right">
                            <input type="number" className="form-control" id="price_per_night" placeholder="$" defaultValue={property.price_per_night} onChange={changeHandler}/>
                        </div>
                        <hr />

                        <div className="d-inline-block">
                            <p className="">Number of guests</p>
                        </div>
                        <div className="form-group d-inline-block float-right">
                            <select className="form-control pr-2" id="max_guests" defaultValue={property.max_guests} onChange={changeHandler}>
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                                <option>6</option>
                                <option>7+</option>
                            </select>
                        </div>
                        <hr />

                    </div>
                    <div className="location">
                        <p><strong>Location</strong></p>

                        <div className="d-inline-block">
                            <p className="">City</p>
                        </div>
                        <div className="d-inline-block float-right">
                            <a href="">Edit ></a>
                        </div>
                        <div className="form-group pr-5">
                           <input type="text" className="form-control" id="city" defaultValue={property.city} onChange={changeHandler}/>
                        </div>
                        <hr />

                        <div className="d-inline-block">
                            <p className="">Country</p>
                        </div>
                        <div className="d-inline-block float-right">
                            <a href="">Edit ></a>
                        </div>
                        <div className="form-group pr-5">
                           <input type="text" className="form-control" id="country" defaultValue={property.country} onChange={changeHandler}/>
                        </div>
                        <hr />
                    </div>
                    <div className="property-and-rooms">
                        <p><strong>Property and rooms</strong></p>

                        <div className="d-inline-block">
                            <p className="">Property type</p>
                        </div>
                        <div className="form-group d-inline-block float-right">
                            <select className="form-control pr-2" id="property_type" defaultValue={property.property_type} onChange={changeHandler}>
                                <option>studio</option>
                                <option>entire apartment</option>
                                <option>private room in apartment</option>
                                <option>room in hotel</option>
                                <option>entire house</option>
                                <option>entire condominium</option>
                            </select>
                        </div>
                        <hr />

                        <div className="d-inline-block">
                            <p className="">Bedrooms</p>
                        </div>
                        <div className="form-group d-inline-block float-right">
                            <select className="form-control pr-2" id="bedrooms" defaultValue={property.bedrooms} onChange={changeHandler}>
                                <option>0</option>
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                                <option>6</option>
                                <option>7+</option>
                            </select>
                        </div>
                        <hr />

                        <div className="d-inline-block">
                            <p className="">Beds</p>
                        </div>
                        <div className="form-group d-inline-block float-right">
                            <select className="form-control pr-2" id="beds" defaultValue={property.beds} onChange={changeHandler}>
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                                <option>6</option>
                                <option>7+</option>
                            </select>
                        </div>
                        <hr />

                        <div className="d-inline-block">
                            <p className="">Bathrooms</p>
                        </div>
                        <div className="form-group d-inline-block float-right">
                            <select className="form-control pr-2" id="baths" defaultValue={property.baths} onChange={changeHandler}>
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                                <option>6</option>
                                <option>7+</option>
                            </select>
                        </div>

                    </div>
                </div>
            </Layout>
        )
    }

    return (
        <>
        {property? listing(): null}
        </>
    )
}