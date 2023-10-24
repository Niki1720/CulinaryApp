class UsersController < ApplicationController
  before_action :set_user, only: %w[ show update destroy ]

  def index
    @users = User.all
  end

  def show
  end

  def create
    @user = User.new(user_params)
    @user.save!
    render :show, status: :created
  end

  def update
    @user.update!(user_params)
  end

  def destroy
    @user.destroy
  end

  private

  def set_user
    @user = User.find(params[:id])
  end

  def user_params
    params.require(:user).permit(:email, :encrypted_password, :admin)
  end
end
