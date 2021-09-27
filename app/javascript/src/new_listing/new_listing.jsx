import React, {useState, useEffect, useRef} from 'react';
import Layout from '@src/layout';
import { handleErrors, safeCredentials, safeCredentialsForm } from '@utils/fetchHelper';
import './new_listing.scss';

export default function NewListing () {
   const [authenticated, setAuthenticated] = useState(false)
   const [userID, setUserID] = useState(null)
   const [update, setUpdate] = useState(null)
   const [title, setTitle] = useState(null)
   const [description, setDescription] = useState(null)
   const [city, setCity] = useState(null)
   const [country, setCountry] = useState(null)
   const [maxGuests, setMaxGuests] = useState(null)
   const [propertyType, setPropertyType] = useState(null)
   const [pricePerNight, setPricePerNight] = useState(null)
   const [bedrooms, setBedrooms] = useState(null)
   const [beds, setBeds] = useState(null)
   const [baths, setBaths] = useState(null)
   const uploadInput = useRef(null)

   useEffect( () => {
      fetch('/api/authenticated')
        .then(handleErrors)
        .then(data => {
          setAuthenticated(data.authenticated)
          setUserID(data.user_id)
        })
      }, [])

   const submitProperty = ()=> {
   // TODO add validation to ensure that no empty key or value is passed to the API
   if (update) {
         fetch(`/api/properties/new_property`, safeCredentials({
            method: 'POST',
            body: JSON.stringify({update})

         }))
            .then(handleErrors)
            .then(res => {
               console.log(res)
               setUpdate(null);
               // uploadImages(res.property.id)
            })
         }
   }

   const uploadImages = (property_id) => {
      let formData = new FormData ();
      for (let i = 0;i < uploadInput.current.files.length; i++) {
          formData.append('image[]',uploadInput.current.files[i])
      }
      
      fetch(`/api/properties/${property_id}/update`, safeCredentialsForm({
          method: 'POST',
          body: formData
      }))
      .then(handleErrors)
      .then(res => {
          console.log(res)
          uploadInput.current.value = "";
      })
   }

   const createPropertyObject = () => {
      let property = {title: title, description: description, price_per_night: pricePerNight, max_guests: maxGuests, city: city, country: country, property_type: propertyType, bedrooms: bedrooms, beds: beds, baths: baths, home_image: ""}
   }

   const updateHandler = (e) => {
      const key = e.target.id
      const value = e.target.value

      switch (key) {
         case "pictures":
             setPictures(value)
         break;
         case "title":
             setTitle(value)
         break;
         case "description":
             setDescription(value)
         break;
         case "city":
             setCity(value)
         break;
         case "country":
             setCountry(value)
         break;
         case "max_guests":
             setMaxGuests(value)
         break;
         case "price_per_night":
             setPricePerNight(value)
         break;
         case "property_type":
             setPropertyType(value)
         break;
         case "bedrooms":
             setBedrooms(value)
         break;
         case "beds":
             setBeds(value)
         break;
         case "baths":
             setBaths(value)
         break;
         default:
             return null;
     }
   }

   return(
      <Layout isLoggedIn={authenticated}>
            <div className="container pb-4">
               <div className="pt-4 pb-2">
                  <h2>Create New Listing</h2>
                  <hr />
               </div>
               <div className="">
                  <div className="d-inline-block">
                        <p className=""><strong>Photos</strong></p>
                  </div>
                  <div className="row">
                        <div className="col-4 align-self-center">
                           <input ref={uploadInput} className="" type="file" id="image-select" name="images" accept="image/*" multiple hidden/>
                           <button className="btn btn-secondary my-4" id="post-image" onClick={() => uploadInput.current.click()} >Add pictures</button>                             
                        </div>                            
                  </div>
                  <hr />
               </div>
               <div className="listing-basics">
                  <p><strong>Listing Basics</strong></p>

                  <div className="d-inline-block">
                        <p className="">Title</p>
                  </div>
                  <div className="form-group pr-5">
                        <input type="text" className="form-control" id="title" onChange={updateHandler} />
                  </div>
                  <hr />

                  <div className="d-inline-block">
                        <p className="">Description</p>
                  </div>
                  <div className="form-group pr-5">
                        <textarea className="form-control" id="description" onChange={updateHandler} />
                  </div>
                  <hr />

                  <div className="d-inline-block">
                        <p className="">Price per night</p>
                  </div>
                  <div className="form-group pr-5">
                        <input type="number" className="form-control" id="price_per_night" placeholder="$" onChange={updateHandler}/> 
                  </div>
                  <hr />

                  <div className="d-inline-block">
                        <p className="">Number of guests</p>
                  </div>
                  <div className="form-group d-inline-block float-right">
                     <select className="form-control pr-2" id="max_guests" onChange={updateHandler}>
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
               <hr />
               <div className="location">
                  <p><strong>Location</strong></p>

                  <div className="d-inline-block">
                        <p className="">City</p>
                  </div>
                  <div className="form-group pr-5">
                        <input type="text" className="form-control" id="city" onChange={updateHandler}/> 
                  </div>
                  <hr />

                  <div className="d-inline-block">
                        <p className="">Country</p>
                  </div>
                  <div className="form-group pr-5">
                        <input type="text" className="form-control" id="country" onChange={updateHandler}/>
                  </div>
                  <hr />
               </div>

               <div className="property-and-rooms">
                  <p><strong>Property and rooms</strong></p>

                  <div className="d-inline-block">
                        <p className="">Property type</p>
                  </div>
                  <div className="form-group d-inline-block float-right">
                        <select className="form-control pr-2" id="property_type" onChange={updateHandler}>
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
                        <select className="form-control pr-2" id="bedrooms" onChange={updateHandler}>
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
                        <select className="form-control pr-2" id="beds" onChange={updateHandler}>
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
                        <select className="form-control pr-2" id="baths" onChange={updateHandler}>
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

               <div className="text-center pt-3 pb-2">
                  <button className="btn btn-danger btn-large" onClick={submitProperty}>Create New Listing</button>
               </div>

            </div>
      </Layout>
   )
}