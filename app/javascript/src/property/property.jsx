// property.jsx
import React, {useState, useEffect} from 'react';
import Layout from '@src/layout';
import BookingWidget from './bookingWidget';
import { handleErrors } from '@utils/fetchHelper';
import { Carousel } from 'react-carousel-minimal';
import './property.scss';

class Property extends React.Component {
  state = {
    property: {},
    loading: true,
    picMap: []
  }

  componentDidMount() {
    fetch(`/api/properties/${this.props.property_id}`)
      .then(handleErrors)
      .then(data => {
        this.setState({
          property: data.property,
          loading: false,
        })
      })
  }

  render () {
    const { property, loading } = this.state;

    if (loading) {
      return <p>loading...</p>;
    };

    const {
      id,
      title,
      description,
      city,
      country,
      property_type,
      price_per_night,
      max_guests,
      bedrooms,
      beds,
      baths,
      home_image,
      user,
      images,
    } = property

    const picturesMap = () => {
      let temp = images.map(pic => {
        return (
          {image: pic.image_url, caption: ""}
        )
      })

      home_image? temp.unshift({image: home_image, caption: ""}) : null

      return temp
    } 
      
    const data = [
      // home_image? {image: home_image, caption: "home"} : null,
      picturesMap()
    ]

    const captionStyle = {
      fontSize: '2em',
      fontWeight: 'bold',
    }

    const slideNumberStyle = {
      fontSize: '20px',
      fontWeight: 'bold',
    }

    console.log(data)

    return (
      <Layout>
        <div className="container">
          <Carousel
              data={picturesMap()}
              time={2000}
              width="1000px"
              height="500px"
              captionStyle={captionStyle}
              radius="0px"
              slideNumber={false}
              slideNumberStyle={slideNumberStyle}
              captionPosition="bottom"
              automatic={false}
              dots={true}
              pauseIconColor="white"
              pauseIconSize="40px"
              slideBackgroundColor="darkgrey"
              slideImageFit="cover"
              thumbnails={false}
              thumbnailWidth="150px"
              style={{
                textAlign: "center",
                maxWidth: "1000px",
                maxHeight: "500px",
                margin: "30px auto",
              }}
            />
          <div className="row">
            <div className="info col-12 col-lg-7">
              <div className="mb-3">
                <h3 className="mb-0">{title}</h3>
                <p className="text-uppercase mb-0 text-secondary"><small>{city}</small></p>
                <p className="mb-0"><small>Hosted by <b>{user.username}</b></small></p>
              </div>
              <div>
                <p className="mb-0 text-capitalize"><b>{property_type}</b></p>
                <p>
                  <span className="mr-3">{max_guests} guests</span>
                  <span className="mr-3">{bedrooms} bedroom</span>
                  <span className="mr-3">{beds} bed</span>
                  <span className="mr-3">{baths} bath</span>
                </p>
              </div>
              <hr />
              <p>{description}</p>
            </div>
            <div className="col-12 col-lg-5">
              <BookingWidget property_id={id} price_per_night={price_per_night} />
            </div>
          </div>
        </div>
      </Layout>
    )
  }
}

export default Property