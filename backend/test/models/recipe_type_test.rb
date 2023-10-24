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
require "test_helper"

class RecipeTypeTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
