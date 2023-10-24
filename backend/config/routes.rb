Rails.application.routes.draw do
  scope :api, defaults: { format: :json } do
    resources :ingredients
    resources :recipe_types
    resources :tags
    resources :recipes
    resources :users
  end
end
