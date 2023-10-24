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
#  user_id          :uuid
#
# Indexes
#
#  index_recipes_on_recipe_type_id  (recipe_type_id)
#  index_recipes_on_user_id         (user_id)
#
# Foreign Keys
#
#  fk_rails_...  (recipe_type_id => recipe_types.id)
#  fk_rails_...  (user_id => users.id)
#
class Recipe < ApplicationRecord
  belongs_to :recipe_type
  belongs_to :user
  has_many :recipe_tags, dependent: :destroy
  has_many :tags, through: :recipe_tags
  has_many :recipe_ingredients, dependent: :destroy

  accepts_nested_attributes_for :recipe_ingredients, allow_destroy: true

  validates :name, presence: true, length: { minimum: 5 }
  validates :description, presence: true, length: { in: 15..500 }
  validates :preparation_time, presence: true
  validates :recipe_type, presence: true
end
