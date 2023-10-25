class IngredientsController < ApplicationController
  load_and_authorize_resource

  def index
  end

  def show
  end

  def create
    @ingredient.save!
  end

  def update
    @ingredient.update!(ingredient_params)
  end

  def destroy
    @ingredient.destroy
  end

  private

  def ingredient_params
    params.require(:ingredient).permit(:name)
  end
end
