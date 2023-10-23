# == Schema Information
#
# Table name: ingredients
#
#  id   :uuid             not null, primary key
#  name :string           not null
#
class Ingredient < ApplicationRecord
  has_many :recipe_ingredients
  has_many :recipes, through: :recipe_ingredients

  validates :name, presence: true, length: { minimum: 3 }
  validates :name, uniqueness: true
end
