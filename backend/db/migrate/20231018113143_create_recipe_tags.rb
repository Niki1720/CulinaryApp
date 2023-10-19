class CreateRecipeTags < ActiveRecord::Migration[6.1]
  def change
    create_table :recipe_tags, id: :uuid do |t|
      t.uuid :recipe_id
      t.uuid :tag_id
      t.timestamps
    end

    add_foreign_key :recipe_tags, :recipes, column: :recipe_id, type: :uuid
    add_foreign_key :recipe_tags, :tags, column: :tag_id, type: :uuid
  end
end
