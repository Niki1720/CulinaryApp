class RecipesController < ApplicationController
  before_action :set_recipe, only: %w[show update destroy]

  def index
    @recipes = Recipe.all
  end

  def show
  end

  def create
    @recipe = Recipe.new(recipe_params)

    if @recipe.save
      if params[:recipe][:recipe_ingredients].present?
        ingredients_array = JSON.parse(params[:recipe][:recipe_ingredients])
        ingredients_array.each do |ingredient_params|
          @recipe.recipe_ingredients.create(ingredient_params)
        end
      end

      render :show, status: :created
    else
      render json: @recipe.errors, status: :unprocessable_entity
    end
  end

  def update
    if @recipe.update(recipe_params)
      render :show, status: :ok
    else
      render json: @recipe.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @recipe.destroy
  end

  private

  def set_recipe
    @recipe = Recipe.find(params[:id])
  end

  def recipe_params
    params.require(:recipe).permit(:name, :description, :preparation_time, :recipe_type_id, recipe_ingredients: [:ingredient_id, :amount, :unit])
  end
end
