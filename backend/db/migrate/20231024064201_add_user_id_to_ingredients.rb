class AddUserIdToIngredients < ActiveRecord::Migration[6.1]
  def change
    add_reference :ingredients, :user, foreign_key: true, type: :uuid
  end
end
