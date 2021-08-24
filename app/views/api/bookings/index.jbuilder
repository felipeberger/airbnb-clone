json.bookings do
    json.array! @bookings do |booking|
      json.id booking.id
      json.start_date booking.start_date
      json.end_date booking.end_date
      json.guest booking.user.username
      json.propertyId booking.property.id
    end
  end