class RecipeTypesController < ApplicationController
  before_action :set_recipe_type, only: %w[ show update destroy ]

  def index
    @recipe_types = RecipeType.all
  end

  def show
  end

  def create
    @recipe_type = RecipeType.new(recipe_type_params)
    @recipe_type.save!
    render :show, status: :created
  end

  def update
    @recipe_type.update!(recipe_type_params)
  end

  def destroy
    @recipe_type.destroy
  end

  private
  def set_recipe_type
    @recipe_type = RecipeType.find(params[:id])
  end

  def recipe_type_params
    params.require(:recipe_type).permit(:name)
  end
end
