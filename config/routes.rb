Rails.application.routes.draw do
  root to: 'static_pages#landing'

  get '/property/:id' => 'static_pages#property'
  get '/login' => 'static_pages#login'
  get '/landing' => 'static_pages#landing'
  get '/properties/:city/:start/:end/:guests' => 'static_pages#home'
  get '/trips' => 'static_pages#trips'

  namespace :api do
    # Add routes below this line
    resources :users, only: [:create]
    resources :sessions, only: [:create, :destroy]
    resources :properties, only: [:index, :show]
    resources :bookings, only: [:create]
    resources :charges, only: [:create]

    # Properties
    get '/properties/:city/:start_date/:end_date/:guests/search' => 'properties#get_properties_by_location'
    get '/properties/:city/check' => 'properties#check_city'

    # Bookings
    get '/properties/:id/bookings' => 'bookings#get_property_bookings'
    get '/users/:username/bookings' => 'users#get_user_bookings'
    
    # Sessions
    get '/authenticated' => 'sessions#authenticated'

    # stripe webhook
    post '/charges/mark_complete' => 'charges#mark_complete'

  end

end
