class RecipeTypesController < ApplicationController
  load_and_authorize_resource

  def index
  end

  def show
  end

  def create
    @recipe_type.save!
  end

  def update
    @recipe_type.update!(recipe_type_params)
  end

  def destroy
    @recipe_type.destroy
  end

  private

  def recipe_type_params
    params.require(:recipe_type).permit(:name)
  end
end
