json.bookings do
    json.id @bookingProperty.id
    json.title @bookingProperty.title
    json.city @bookingProperty.city
    json.country @bookingProperty.country
    json.property_type @bookingProperty.property_type
    json.price_per_night @bookingProperty.price_per_night
    json.image_url @bookingProperty.image_url
    json.start_date @booking.start_date
    json.end_date @booking.end_date
    json.images do 
        json.array! @bookingProperty.images do |image| 
            json.image_url url_for(image)
        end
    end
end