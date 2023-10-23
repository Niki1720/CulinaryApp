# == Schema Information
#
# Table name: tags
#
#  id         :uuid             not null, primary key
#  name       :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class Tag < ApplicationRecord
  has_many :recipe_tags
  has_many :recipes, through: :recipe_tags

  validates :name, presence: true, length: { minimum: 2 }
  validates :name, uniqueness: true
end
