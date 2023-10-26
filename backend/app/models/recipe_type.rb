# == Schema Information
#
# Table name: recipe_types
#
#  id         :uuid             not null, primary key
#  name       :string(255)      default(""), not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  user_id    :uuid
#
# Indexes
#
#  index_recipe_types_on_user_id  (user_id)
#
# Foreign Keys
#
#  fk_rails_...  (user_id => users.id)
#
class RecipeType < ApplicationRecord
  has_many :recipe, dependent: :destroy
  belongs_to :user

  validates :name, presence: true, length: { minimum: 3 }
  validates :name, uniqueness: { scope: :user_id }
end
