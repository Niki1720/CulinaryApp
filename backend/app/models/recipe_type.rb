# == Schema Information
#
# Table name: recipe_types
#
#  id         :uuid             not null, primary key
#  name       :string(255)      default(""), not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class RecipeType < ApplicationRecord
  has_many :recipe
end
