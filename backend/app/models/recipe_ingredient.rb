# == Schema Information
#
# Table name: recipe_ingredients
#
#  id            :uuid             not null, primary key
#  amount        :decimal(10, 2)   not null
#  unit          :string
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#  ingredient_id :uuid
#  recipe_id     :uuid
#
# Foreign Keys
#
#  fk_rails_...  (ingredient_id => ingredients.id)
#  fk_rails_...  (recipe_id => recipes.id)
#
class RecipeIngredient < ApplicationRecord
  belongs_to :recipe
  belongs_to :ingredient

  accepts_nested_attributes_for :recipe
  accepts_nested_attributes_for :ingredient
end
