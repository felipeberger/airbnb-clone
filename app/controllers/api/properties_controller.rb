module Api
    class PropertiesController < ApplicationController
      def index
        @properties = Property.order(created_at: :desc).page(params[:page]).per(6)
        return render json: { error: 'not_found' }, status: :not_found if !@properties
  
        render 'api/properties/index', status: :ok
      end
  
      def show
        @property = Property.find_by(id: params[:id])
        return render json: { error: 'not_found' }, status: :not_found if !@property
  
        render 'api/properties/show', status: :ok
      end

      def get_properties_by_location
        @city = params[:city].titleize 
        matchingIds = []
        propertyExists = Property.find_by(city: @city)
        return render json: { error: 'No properties found in that location'}, status: :not_found if !propertyExists
        properties = Property.where("city = ? AND max_guests >= ?", @city, params[:guests])

        properties.each do |match|
          if match.bookings.where("start_date > ?", params[:end]).or(match.bookings.where("end_date < ?", params[:start]))
            matchingIds.push(match.id)
          end
        end

        @propertiesByLocation = Property.where(id: matchingIds).order(created_at: :desc).page(params[:page]).per(6)
        
        # @propertiesByLocation.order(created_at: :desc).page(params[:page]).per(6)

        render 'api/properties/bylocation', status: :ok
      end
    end
  end