class IngredientsController < ApplicationController
  before_action :set_ingredient, only: %w[ show update destroy ]

  def index
    @ingredients = Ingredient.all
  end

  def show
  end

  def create
    @ingredient = Ingredient.new(ingredient_params)
    @ingredient.save!
    render :show, status: :created
  end

  def update
    @ingredient.update!(ingredient_params)
      render :show, status: :ok
  end

  def destroy
    @ingredient.destroy
  end

  private
    def set_ingredient
      @ingredient = Ingredient.find(params[:id])
    end

    def ingredient_params
      params.require(:ingredient).permit(:name, :null)
    end
end
