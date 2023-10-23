# == Schema Information
#
# Table name: recipe_tags
#
#  id         :uuid             not null, primary key
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  recipe_id  :uuid
#  tag_id     :uuid
#
# Foreign Keys
#
#  fk_rails_...  (recipe_id => recipes.id)
#  fk_rails_...  (tag_id => tags.id)
#
class RecipeTag < ApplicationRecord
  belongs_to :recipe
  belongs_to :tag

  validates :tag_id, uniqueness: { scope: :recipe_id }
end
