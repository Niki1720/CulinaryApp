class RecipesController < ApplicationController
  load_and_authorize_resource

  def index
  end

  def show
  end

  def create
    @recipe.save!
  end

  def update
    @recipe.update!(recipe_params)
  end

  def destroy
    @recipe.destroy
  end

  private

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
