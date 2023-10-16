json.array! @estates do |estate|
  json.extract! estate, :id, :name, :latitude, :longitude
end
