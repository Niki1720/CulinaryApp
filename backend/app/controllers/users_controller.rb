class UsersController < ApplicationController
  load_and_authorize_resource

  def index
  end

  def show
  end

  def create
    @user.save!
  end

  def update
    @user.update!(user_params)
  end

  def destroy
    @user.destroy
  end

  private

  def user_params
    params.require(:user).permit(:email, :password, :admin)
  end
end
