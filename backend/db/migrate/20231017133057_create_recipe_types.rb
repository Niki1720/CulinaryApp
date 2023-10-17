class CreateRecipeTypes < ActiveRecord::Migration[6.1]
  def change
    create_table :recipe_types, id: :uuid do |t|
      t.string :name, null: false, default: '', limit: 255

      t.timestamps
    end
  end
end
