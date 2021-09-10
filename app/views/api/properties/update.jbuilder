json.update do
    json.property_id @property.id
    json.city @property.city
    json.id @property.id
    json.title @property.title
    json.city @property.city
    json.country @property.country
    json.property_type @property.property_type
    json.price_per_night @property.price_per_night
    json.home_image @property.image_url
    json.images do 
        json.array! @property.images do |image| 
            json.image_url url_for(image)
        end
    end
end