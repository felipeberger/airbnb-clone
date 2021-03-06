class StaticPagesController < ApplicationController
  def home
    @data = { city: params[:city], startDate: params[:start], endDate: params[:end], guests: params[:guests] }.to_json
    render 'home'
  end

  def property
    @data = { property_id: params[:id] }.to_json
    render 'property'
  end

  def login
    render 'login'
  end

  def landing
    render 'landing'
  end

  def trips 
    token = cookies.signed[:airbnb_session_token]
    session = Session.find_by(token: token)

    if session
      render 'trips'
    else 
      redirect_to '/login'
    end
  end

  def success
    @data = {booking_id: params[:id]}.to_json
    render 'success'
  end

  def hosting
    token = cookies.signed[:airbnb_session_token]
    session = Session.find_by(token: token)

    if session
      render 'hosting'
    else 
      redirect_to '/login'
    end

  end

  def listing
    token = cookies.signed[:airbnb_session_token]
    session = Session.find_by(token: token)
    
    if session
      @data = { property_id: params[:id] }.to_json
      render 'listing'
    else 
      redirect_to '/login'
    end
  end

  def new_listing
    render 'new_listing'
  end

end
