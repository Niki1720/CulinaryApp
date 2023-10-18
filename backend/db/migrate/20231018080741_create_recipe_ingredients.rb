class CreateRecipeIngredients < ActiveRecord::Migration[6.1]
  def change
    create_table :recipe_ingredients, id: :uuid do |t|
      t.uuid :recipe_id
      t.uuid :ingredient_id
      t.decimal :amount, precision: 10, scale: 2, null: false
      t.string :unit
      t.timestamps
    end

    add_foreign_key :recipe_ingredients, :recipes, column: :recipe_id, type: :uuid, on_delete: :cascade
    add_foreign_key :recipe_ingredients, :ingredients, column: :ingredient_id, type: :uuid, on_delete: :cascade
  end
end
``