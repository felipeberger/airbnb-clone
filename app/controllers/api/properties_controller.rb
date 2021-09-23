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
        startDate = params[:start_date] == "null"? Date.today : Date.parse(params[:start_date])
        endDate = params[:end_date] == "null"? Date.today.next_year(2) : Date.parse(params[:end_date])
        matchingIds = []

        propertyExists = Property.find_by(city: @city)
        return render json: { error: 'No properties found in that location'}, status: :not_found if !propertyExists
        
        properties = Property.where("city = ? AND max_guests >= ?", @city, params[:guests])

        properties.each do |match|
          
          if match.bookings.where("start_date < ? AND end_date > ? AND start_date < ? AND end_date > ?", startDate, startDate, endDate, endDate).exists?
            puts match.id
          else
            matchingIds.push(match.id)
          end
        end

        @propertiesByLocation = Property.where(id: matchingIds).order(created_at: :desc).page(params[:page]).per(6)
        
        render 'api/properties/bylocation', status: :ok
      end

      def check_city
        city = params[:city].titleize 
        cityHasProperties = Property.find_by(city: city)
        return render json: { error: 'No properties found in that location'}, status: :not_found if !cityHasProperties

        return render json: { sucess: 'Properties found in that location'}, status: :ok if cityHasProperties
      end

      def get_properties_by_id
        arrayOfId = params[:arrayOfId].split(",").map(&:to_i)
        @propertiesById = Property.where({id: arrayOfId})

        return render json: { error: 'not_found' }, status: :not_found if !@propertiesById

        render 'api/properties/byId', status: :ok
      end

      def update

        if params[:image]

          @property = Property.find_by(id: params[:id].to_i)
          return render json: { error: 'No property found'}, status: :not_found if !@property
        
          @property.images.attach(params[:image])
          @property.save
          
        else
          
          @name = params[:update].keys[0].to_sym
          @value = params[:update][@name]
          return render json: {error: 'key is empty'}, status: :bad_request if !@name
          return render json: {error: 'value is empty'}, status: :bad_request if !@value
  
          @property = Property.find_by(id: params[:id].to_i)
          return render json: { error: 'No property found'}, status: :not_found if !@property
  
          @property[@name] = @value
          @property.save
  
        end
      
        render 'api/properties/update', status: :ok

      end

      def updateImages

        removeTheseImages = request.body
        @imageKeys
        @property = Property.find_by(id: params[:id].to_i)
        return render json: { error: 'No property found'}, status: :not_found if !@property
      
        @pictures = @property.images

        removeTheseImages.each do |line|
          @imageKeys = line.split(",")
          puts @imageKeys
        end

        @pictures.each do |pic|
          @imageKeys.each do |key|
            if pic.signed_id == key
              pic.purge
            end
          end
        end

        render 'api/properties/show', status: :ok
      end

      private

        def properties_params
          params.require(:property).permit(:title, :city, images: [])
        end

    end
  end