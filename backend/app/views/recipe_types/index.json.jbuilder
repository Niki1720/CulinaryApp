json.array! @recipe_types do |rec_type|
  json.extract! rec_type, :id, :name
end
