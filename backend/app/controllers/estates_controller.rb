class EstatesController < ApplicationController
  before_action :set_estate, only: [:show, :update, :destroy]

  def index
    @estates = Estate.all
  end

  def show
  end

  def create
    @estate = Estate.new(estate_params)
    @estate.save!
    render :show, status: :created
  end

  def update
    @estate.update!(estate_params)
    render :show, status: :ok
  end

  def destroy
    @estate.destroy
  end

  private

  def set_estate
    @estate = Estate.find(params[:id])
  end

  def estate_params
    params.require(:estate).permit(:name, :address, :city, :state, :zip, :latitude, :longitude)
  end
end
