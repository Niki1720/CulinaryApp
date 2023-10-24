json.array! @users do |user|
  json.extract! user, :id, :email, :admin
end
