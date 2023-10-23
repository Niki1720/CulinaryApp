json.extract! @recipe, :id, :name, :description, :preparation_time
json.recipe_ingredients @recipe.recipe_ingredients do |recipe_ingredient|
  json.extract! recipe_ingredient, :id, :amount, :unit
  json.ingredient do
    json.extract! recipe_ingredient.ingredient, :id, :name
  end
end

json.recipe_type do
  json.extract! @recipe.recipe_type, :id, :name
end

json.tags @recipe.tags do |tag|
  json.extract! tag, :id, :name
end
