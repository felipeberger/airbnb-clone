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

end
