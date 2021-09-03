import React, {useState, useEffect} from 'react';
import Layout from '@src/layout';
import Edit from './edit';
import { handleErrors, safeCredentials } from '@utils/fetchHelper';
import './listing.scss';

export default function Listing () {
    const [authenticated, setAuthenticated] = useState(false)
    const [property, setProperty] = useState(null)
    const [update, setUpdate] = useState(null)
    const [title, setTitle] = useState(false)
    const [description, setDescription] = useState(false)
    const [city, setCity] = useState(false)
    const [country, setCountry] = useState(false)
    const [maxGuests, setMaxGuests] = useState(false)
    const [propertyType, setPropertyType] = useState(false)
    const [pricePerNight, setPricePerNight] = useState(false)
    const [bedrooms, setBedrooms] = useState(false)
    const [beds, setBeds] = useState(false)
    const [baths, setBaths] = useState(false)
    
    useEffect( () => {
        fetch('/api/authenticated')
          .then(handleErrors)
          .then(data => {
            setAuthenticated(data.authenticated)
          })
        }, [])

    useEffect( ()=> {
        fetch(`/api/properties/${1}`)
            .then(handleErrors)
            .then(data => {
                setProperty(data.property);
            })
    }, [authenticated])

    useEffect( ()=> {

    }, [])

    const submitChange = ()=> {
        // TODO add validation to ensure that no empty key or value is passed to the API
        if (update) {
            fetch(`/api/properties/${1}/update`, safeCredentials({
                method: 'POST',
                body: JSON.stringify({update})
    
            }))
                .then(handleErrors)
                .then(res => {
                    console.log(res);
                    setUpdate(null);
                })
        }

    }

    const updateHandler = (e) => {
        const key = e.target.id
        const value = e.target.value
        setUpdate( {[key] : value})
    }
    

    const updateState = (target) => {

        switch (target) {
            case "title":
                setTitle(prevState => !prevState)
            break;
            case "description":
                setDescription(prevState => !prevState)
            break;
            case "city":
                setCity(prevState => !prevState)
            break;
            case "country":
                setCountry(prevState => !prevState)
            break;
            case "max_guests":
                setMaxGuests(prevState => !prevState)
            break;
            case "price_per_night":
                setPricePerNight(prevState => !prevState)
            break;
            case "property_type":
                setPropertyType(prevState => !prevState)
            break;
            case "bedrooms":
                setBedrooms(prevState => !prevState)
            break;
            case "beds":
                setBeds(prevState => !prevState)
            break;
            case "baths":
                setBaths(prevState => !prevState)
            break;
            default:
                return null;
        }
    }

    const listing = () => {
        return(
            <Layout isLoggedIn={authenticated}>
                <div className="container pb-4">
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
                            <Edit changeHandler={submitChange} updater={updateState} />
                        </div>
                        <hr />
                    </div>
                    <div className="listing-basics">
                        <p><strong>Listing Basics</strong></p>

                        <div className="d-inline-block">
                            <p className="">Title</p>
                        </div>
                        <div className="d-inline-block float-right">
                            <Edit changeHandler={submitChange} updater={updateState} target="title" />
                        </div>
                        <div className="form-group pr-5">
                            {title? <input type="text" className="form-control" id="title" defaultValue={property.title} onChange={updateHandler} /> : <input type="text" className="form-control" id="title" defaultValue={property.title} onChange={updateHandler} disabled/>}
                           
                        </div>
                        <hr />

                        <div className="d-inline-block">
                            <p className="">Description</p>
                        </div>
                        <div className="d-inline-block float-right">
                            <Edit changeHandler={submitChange} updater={updateState} target="description" />
                        </div>
                        <div className="form-group pr-5">
                            {description? <textarea className="form-control" id="description" defaultValue={property.description} onChange={updateHandler} /> : <textarea className="form-control" id="description" defaultValue={property.description} onChange={updateHandler} disabled/>}
                            
                        </div>
                        <hr />

                        <div className="d-inline-block">
                            <p className="">Price per night</p>
                        </div>
                        <div className="d-inline-block float-right">
                            <Edit changeHandler={submitChange} updater={updateState} target="price_per_night" />
                        </div>
                        <div className="form-group pr-5">
                            {pricePerNight? <input type="number" className="form-control" id="price_per_night" placeholder="$" defaultValue={property.price_per_night} onChange={updateHandler}/> : <input type="number" className="form-control" id="price_per_night" placeholder="$" defaultValue={property.price_per_night} onChange={updateHandler} disabled/>}
                            
                        </div>
                        <hr />

                        <div className="d-inline-block">
                            <p className="">Number of guests</p>
                        </div>
                        <div className="d-inline-block float-right">
                            <Edit changeHandler={submitChange} updater={updateState} target="max_guests" />
                        </div>
                        <div className="form-group d-inline-block float-right">
                            {maxGuests? 
                            (<select className="form-control pr-2" id="max_guests" defaultValue={property.max_guests} onChange={updateHandler}>
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                                <option>6</option>
                                <option>7+</option>
                            </select>) : 
                            (<select className="form-control pr-2" id="max_guests" defaultValue={property.max_guests} onChange={updateHandler} disabled>
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                                <option>6</option>
                                <option>7+</option>
                            </select>)}
                            
                        </div>
                    </div>
                    <hr />
                    <div className="location">
                        <p><strong>Location</strong></p>

                        <div className="d-inline-block">
                            <p className="">City</p>
                        </div>
                        <div className="d-inline-block float-right">
                            <Edit changeHandler={submitChange} updater={updateState} target="city" />
                        </div>
                        <div className="form-group pr-5">
                            {city? <input type="text" className="form-control" id="city" defaultValue={property.city} onChange={updateHandler}/> : <input type="text" className="form-control" id="city" defaultValue={property.city} onChange={updateHandler} disabled/>}
                           
                        </div>
                        <hr />

                        <div className="d-inline-block">
                            <p className="">Country</p>
                        </div>
                        <div className="d-inline-block float-right">
                            <Edit changeHandler={submitChange} updater={updateState} target="country" />
                        </div>
                        <div className="form-group pr-5">
                            {country? <input type="text" className="form-control" id="country" defaultValue={property.country} onChange={updateHandler}/> : <input type="text" className="form-control" id="country" defaultValue={property.country} onChange={updateHandler} disabled/>}
                           
                        </div>
                        <hr />
                    </div>
                    <div className="property-and-rooms">
                        <p><strong>Property and rooms</strong></p>

                        <div className="d-inline-block">
                            <p className="">Property type</p>
                        </div>
                        <div className="d-inline-block float-right">
                            <Edit changeHandler={submitChange} updater={updateState} target="property_type" />
                        </div>
                        <div className="form-group d-inline-block float-right">
                            {propertyType? 
                            (<select className="form-control pr-2" id="property_type" defaultValue={property.property_type} onChange={updateHandler}>
                            <option>studio</option>
                            <option>entire apartment</option>
                            <option>private room in apartment</option>
                            <option>room in hotel</option>
                            <option>entire house</option>
                            <option>entire condominium</option>
                        </select>) : 
                            (<select className="form-control pr-2" id="property_type" defaultValue={property.property_type} onChange={updateHandler} disabled>
                            <option>studio</option>
                            <option>entire apartment</option>
                            <option>private room in apartment</option>
                            <option>room in hotel</option>
                            <option>entire house</option>
                            <option>entire condominium</option>
                        </select>)}
                            
                        </div>
                        <hr />

                        <div className="d-inline-block">
                            <p className="">Bedrooms</p>
                        </div>
                        <div className="d-inline-block float-right">
                            <Edit changeHandler={submitChange} updater={updateState} target="bedrooms" />
                        </div>
                        <div className="form-group d-inline-block float-right">
                            {bedrooms? 
                            (<select className="form-control pr-2" id="bedrooms" defaultValue={property.bedrooms} onChange={updateHandler}>
                                <option>0</option>
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                                <option>6</option>
                                <option>7+</option>
                            </select>): 
                            (<select className="form-control pr-2" id="bedrooms" defaultValue={property.bedrooms} onChange={updateHandler} disabled>
                                <option>0</option>
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                                <option>6</option>
                                <option>7+</option>
                            </select>)}
                        </div>
                        <hr />

                        <div className="d-inline-block">
                            <p className="">Beds</p>
                        </div>
                        <div className="d-inline-block float-right">
                            <Edit changeHandler={submitChange} updater={updateState} target="beds" />
                        </div>
                        <div className="form-group d-inline-block float-right">
                            {beds? 
                            (<select className="form-control pr-2" id="beds" defaultValue={property.beds} onChange={updateHandler}>
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                                <option>6</option>
                                <option>7+</option>
                            </select>):
                            (<select className="form-control pr-2" id="beds" defaultValue={property.beds} onChange={updateHandler} disabled>
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                                <option>6</option>
                                <option>7+</option>
                            </select>)}
                        </div>
                        <hr />

                        <div className="d-inline-block">
                            <p className="">Bathrooms</p>
                        </div>
                        <div className="d-inline-block float-right">
                            <Edit changeHandler={submitChange} updater={updateState} target="baths" />
                        </div>
                        <div className="form-group d-inline-block float-right">
                            {baths? 
                            (<select className="form-control pr-2" id="baths" defaultValue={property.baths} onChange={updateHandler}>
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                                <option>6</option>
                                <option>7+</option>
                            </select>):
                            (<select className="form-control pr-2" id="baths" defaultValue={property.baths} onChange={updateHandler} disabled>
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                                <option>6</option>
                                <option>7+</option>
                            </select>)}
                            
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