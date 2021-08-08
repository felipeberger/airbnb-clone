// home.jsx
import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import Layout from '@src/layout';
import { handleErrors } from '@utils/fetchHelper';
import './home.scss';

function Home (props) {

  const [properties, setProperties] = useState([]);
  const [total_pages, setTotalPages] = useState(null);
  const [next_page, setNextPage ] = useState(null);
  const [loading, setLoading ] = useState(true);
  const [locationText, setLocationText] = useState("Showing all properties");

  useEffect( ()=>{

    fetch(`/api/properties/${props.data.city}/${props.data.guests}/search`)
      .then(handleErrors)
      .then(data => {
        console.log(data)
        setProperties(data.propertiesByLocation)
        setTotalPages(data.total_pages)
        setNextPage(data.next_page)
        setLoading(false)
        setLocationText(`Properties found in ${data.city}`)
      })
  }, [total_pages])

  const loadMore = () => {

    if (next_page === null) {

      return;

    }

    setLoading(true);
    fetch(`/api/properties/${props.data.city}/${props.data.guests}/search?page=${next_page}`)
      .then(handleErrors)
      .then(data => {
        setProperties(properties.concat(data.propertiesByLocation))
        setTotalPages(data.total_pages)
        setNextPage(data.next_page)
        setLoading(false)
      })
  }

  return (

    <Layout>
      <div className="container pt-4">
        <h4 className="mb-1">{locationText}</h4>
        <p className="text-secondary mb-3">Explore some of the best-reviewed stays in the world</p>
        <div className="row">
          {properties.map(property => {

            return (
              <div key={property.id} className="col-6 col-lg-4 mb-4 property">
                <a href={`/property/${property.id}`} className="text-body text-decoration-none">
                  <div className="property-image mb-1 rounded" style={{ backgroundImage: `url(${property.image_url})` }} />
                  <p className="text-uppercase mb-0 text-secondary"><small><b>{property.city}</b></small></p>
                  <h6 className="mb-0">{property.title}</h6>
                  <p className="mb-0"><small>${property.price_per_night} USD/night</small></p>
                </a>
              </div>
            )
          })}
        </div>
          {loading && <p>loading...</p>}
          {(loading || next_page === null) ||
            <div className="text-center">
              <button
                className="btn btn-light mb-4"
                onClick={loadMore}
              >load more</button>
            </div>
          }
      </div>
    </Layout>
    
  )
}

document.addEventListener('DOMContentLoaded', () => {
  const node = document.getElementById('params');
  const data = JSON.parse(node.getAttribute('data-params'));
  console.log(data);

  ReactDOM.render(
    <Home data={data} />,
    document.body.appendChild(document.createElement('div')),
  )
})
