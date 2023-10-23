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

  validates :ingredient_id, uniqueness: { scope: :recipe_id }
  validates :amount, presence: true
  validates :unit, presence: true
end
