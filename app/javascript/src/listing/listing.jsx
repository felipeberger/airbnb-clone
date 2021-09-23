import React, {useState, useEffect, useRef} from 'react';
import Layout from '@src/layout';
import Edit from './edit';
import { handleErrors, safeCredentials, safeCredentialsForm } from '@utils/fetchHelper';
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
    const [pictures, setPictures] = useState(false)
    const [removePicturesArray, setRemovePicturesArray] = useState([])
    const [picturesArray, setPicturesArray] = useState([])
    const uploadInput = useRef(null)
    
    useEffect( () => {
        fetch('/api/authenticated')
          .then(handleErrors)
          .then(data => {
            setAuthenticated(data.authenticated)
          })
        }, [])

    useEffect( ()=> {
        let picsObject = []
        fetch(`/api/properties/${1}`)
            .then(handleErrors)
            .then(data => {
                setProperty(data.property);
                console.log(data.property)
                mapImages(data.property)
            })
    }, [authenticated])

    const submitChange = ()=> {
        // TODO add validation to ensure that no empty key or value is passed to the API
        if (update) {
            fetch(`/api/properties/${1}/update`, safeCredentials({
                method: 'POST',
                body: JSON.stringify({update})
    
            }))
                .then(handleErrors)
                .then(res => {
                    setUpdate(null);
                })
        }
    }

    const updateHandler = (e) => {
        const key = e.target.id
        const value = e.target.value
        setUpdate({[key] : value})
    }
    
    const updateState = (target) => {

        switch (target) {
            case "pictures":
                setPictures(prevState => !prevState)
            break;
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
    
    // Grays out pictures to show selection and adds those to an array to be used for purging pics
    const selectPicHandler = (e) => {
        let temp = []
        let removePics = []
        let src = e.target.src

        if (pictures) {
            temp = picturesArray.map(image => {
                
                if (image.opacity === 0.5 && src.includes(image.image_url)) {
                    return {image_url: image.image_url, signed_id: image.signed_id, opacity: 1}
                } else if (image.opacity === 0.5 || src.includes(image.image_url)) {
                    removePics.push(image.signed_id)
                    return {image_url: image.image_url, signed_id: image.signed_id, opacity: 0.5}
                } 
                return {image_url: image.image_url, signed_id: image.signed_id, opacity: 1}
            })
    
            setPicturesArray(temp)
            setRemovePicturesArray(removePics)
        }
    }

    const uploadImage = () => {
        let formData = new FormData ();
        for (let i = 0;i < uploadInput.current.files.length; i++) {
            formData.append('image[]',uploadInput.current.files[i])
        }
        
        fetch(`/api/properties/${1}/update`, safeCredentialsForm({
            method: 'POST',
            body: formData
            
        }))
        .then(handleErrors)
        .then(res => {
            console.log(res)
            mapImages(res.update)
        })
    }

    const removeImage = () => {
        console.log(removePicturesArray)
        fetch(`/api/properties/${1}/updateImages`, safeCredentialsForm({
            method: 'POST',
            body: removePicturesArray
        }))
        .then(handleErrors)
        .then(res => {
            console.log(res)
            mapImages(res.property)
            setRemovePicturesArray([])
        })
    }

    const imageUpdateHandler = () => {
        if (picturesArray.length > 0) {
            uploadImage()
        }

        if (removePicturesArray.length > 0) {
            removeImage()
        }
    }

    const mapImages = (response) => {
        let picsObject = response.images.map(image => {
            return {image_url: image.image_url, signed_id: image.signed_id, opacity: 1}
        })
        setPicturesArray(picsObject)
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
                            <Edit changeHandler={imageUpdateHandler} updater={updateState} target="pictures" />
                        </div>
                        <div className="row">
                            {picturesArray.map(image => {
                                return (
                                    <div key={image.image_url} className="col-4 py-1 px-1">
                                        <img src={image.image_url} alt="" className="img-thumbnail img-fluid" onClick={selectPicHandler} style={{opacity: image.opacity}} id={image.signed_id}/>
                                    </div>
                                )
                            })}
                            <div className="col-4 align-self-center text-center">
                                <input ref={uploadInput} className="" type="file" id="image-select" name="images" accept="image/*" multiple hidden/>
                                {pictures? <button className="btn btn-secondary" id="post-image" onClick={() => uploadInput.current.click()} >Add more pictures</button> : <button className="btn btn-secondary" id="post-image" onClick={() => uploadInput.current.click()} hidden>Add more pictures</button>}
                                
                            </div>                            
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