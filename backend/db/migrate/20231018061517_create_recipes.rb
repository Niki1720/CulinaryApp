class CreateRecipes < ActiveRecord::Migration[6.1]
  def change
    create_table :recipes, id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
      t.string :name, limit: 255, null: false
      t.string :description, null: false
      t.time :preparation_time, null: false
      t.references :recipe_type, type: :uuid, foreign_key: true

      t.timestamps
    end
  end
end