# == Schema Information
#
# Table name: ingredients
#
#  id   :uuid             not null, primary key
#  name :string           not null
#
class Ingredient < ApplicationRecord
  has_many :recipe_ingredients
end
