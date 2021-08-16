module Api
  class UsersController < ApplicationController
    def create
    @user = User.new(user_params)

      if @user.save
        render 'api/users/create'
      else
        render json: { success: false }
      end
    end

    def get_user_bookings
      @user = User.find_by(username: params[:username])

      if @user 
        render 'api/users/get_user_bookings', status: :ok
      else
        render json: { success: false }, status: :bad_request
      end

    end

    private

    def user_params
      params.require(:user).permit(:email, :password, :username)
    end
  end
end
