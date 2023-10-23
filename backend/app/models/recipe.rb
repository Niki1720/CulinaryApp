# == Schema Information
#
# Table name: recipes
#
#  id               :uuid             not null, primary key
#  description      :string           not null
#  name             :string(255)      not null
#  preparation_time :integer          not null
#  created_at       :datetime         not null
#  updated_at       :datetime         not null
#  recipe_type_id   :uuid
#
# Indexes
#
#  index_recipes_on_recipe_type_id  (recipe_type_id)
#
# Foreign Keys
#
#  fk_rails_...  (recipe_type_id => recipe_types.id)
#
class Recipe < ApplicationRecord
  belongs_to :recipe_type
  has_many :recipe_tags, dependent: :destroy
  has_many :tags, through: :recipe_tags
  has_many :recipe_ingredients, dependent: :destroy

  accepts_nested_attributes_for :recipe_ingredients, allow_destroy: true

  validates :name, presence: true, length: { minimum: 5 }
  validates :description, presence: true, length: { in: 15..500 }
  validates :preparation_time, presence: true
  validates :recipe_type, presence: true
end
