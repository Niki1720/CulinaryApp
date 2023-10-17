# == Schema Information
#
# Table name: recipe_types
#
#  id         :uuid             not null, primary key
#  name       :string(255)      default(""), not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
require "test_helper"

class RecipeTypeTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
