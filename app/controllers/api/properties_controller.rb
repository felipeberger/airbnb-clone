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
        property = Property.find_by(city: params[:city])
        return render json: { error: 'No properties found in that location'}, status: :not_found if !property

        @propertiesByLocation = Property.where("city = ? ", params[:city])
        render 'api/properties/bylocation', status: :ok
      end
    end
  end