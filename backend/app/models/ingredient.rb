# == Schema Information
#
# Table name: ingredients
#
#  id      :uuid             not null, primary key
#  name    :string           not null
#  user_id :uuid
#
# Indexes
#
#  index_ingredients_on_user_id  (user_id)
#
# Foreign Keys
#
#  fk_rails_...  (user_id => users.id)
#
class Ingredient < ApplicationRecord
  belongs_to :user
  has_many :recipe_ingredients, dependent: :destroy
  has_many :recipes, through: :recipe_ingredients

  validates :name, presence: true, length: { minimum: 3 }
  validates :name, uniqueness: { scope: :user_id }
end
