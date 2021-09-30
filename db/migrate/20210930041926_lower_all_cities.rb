class LowerAllCities < ActiveRecord::Migration[6.0]
  def change
    Property.all.each do |property|
      property.city = property.city.downcase
    end
  end
end
