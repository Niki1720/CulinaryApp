# == Schema Information
#
# Table name: ingredients
#
#  id      :uuid             not null, primary key
#  name    :string           not null
#  user_id :uuid
#
# Indexes
#
#  index_ingredients_on_user_id  (user_id)
#
# Foreign Keys
#
#  fk_rails_...  (user_id => users.id)
#
require "test_helper"

class IngredientTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
