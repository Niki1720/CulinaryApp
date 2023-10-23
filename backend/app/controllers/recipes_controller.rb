class RecipesController < ApplicationController
  before_action :set_recipe, only: %w[show update destroy]

  def index
    @recipes = Recipe.all
  end

  def show
  end
  def create
    @recipe = Recipe.new(recipe_params)
    @recipe.save!
    render :show, status: :created
  end

  def update
    @recipe.update!(recipe_params)
  end

  def destroy
    @recipe.destroy
  end

  private

  def set_recipe
    @recipe = Recipe.find(params[:id])
  end

  def recipe_params
    params.require(:recipe).permit(
      :name,
      :description,
      :preparation_time,
      :recipe_type_id,
      tag_ids: [],
      recipe_ingredients_attributes: [:id, :ingredient_id, :amount, :unit, :_destroy],
      )
  end
end
