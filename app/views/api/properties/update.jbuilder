json.updates do
    json.property_id @property.id
    json.field_updated @name
    json.new_value @value

end