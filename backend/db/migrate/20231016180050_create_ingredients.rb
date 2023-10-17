class CreateIngredients < ActiveRecord::Migration[6.1]
  def change
    create_table :ingredients, id: :uuid do |t|
      t.string :name, null: false
    end
  end
end
