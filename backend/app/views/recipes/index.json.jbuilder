json.array! @recipes do |recipe|
  json.extract! recipe, :id, :name, :description, :preparation_time, :recipe_type_id
  json.recipe_ingredients recipe.recipe_ingredients do |recipe_ingredient|
    json.extract! recipe_ingredient, :ingredient_id, :amount, :unit
  end
end
