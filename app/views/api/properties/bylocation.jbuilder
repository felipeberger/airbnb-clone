json.total_pages @propertiesByLocation.total_pages
json.next_page @propertiesByLocation.next_page
json.city @city

json.propertiesByLocation do
    json.array! @propertiesByLocation do |property|
      json.id property.id
      json.title property.title
      json.city property.city
      json.country property.country
      json.property_type property.property_type
      json.price_per_night property.price_per_night
      json.image_url property.image_url
    end
end