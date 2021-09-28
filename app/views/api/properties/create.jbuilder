json.property do
    json.id @property.id
    json.title @property.title
    json.description @property.description
    json.city @property.city
    json.country @property.country
    json.property_type @property.property_type
    json.price_per_night @property.price_per_night
    json.max_guests @property.max_guests
    json.bedrooms @property.bedrooms
    json.beds @property.beds
    json.baths @property.baths
    json.image_url @property.image_url
    json.images do 
        json.array! @property.images do |image| 
            json.image_url url_for(image)
            json.signed_id image.signed_id
        end
    end
end