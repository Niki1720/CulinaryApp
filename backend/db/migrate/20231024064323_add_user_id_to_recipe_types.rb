class AddUserIdToRecipeTypes < ActiveRecord::Migration[6.1]
  def change
    add_reference :recipe_types, :user, foreign_key: true, type: :uuid
  end
end
