json.array! @recipes do |recipe|
  json.extract! recipe, :id, :name, :description, :preparation_time, :recipe_type_id
end
