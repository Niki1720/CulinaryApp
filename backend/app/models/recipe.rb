# == Schema Information
#
# Table name: recipes
#
#  id               :uuid             not null, primary key
#  description      :string           not null
#  name             :string(255)      not null
#  preparation_time :time             not null
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
end
