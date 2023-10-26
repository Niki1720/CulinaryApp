require 'rails_helper'
require 'test_helper'

RSpec.describe RecipesController, type: :request do
  include_examples "basic_seed"

  context 'when user is authorizations' do
    it 'it shows the domino recipe list' do
      get "/api/recipes", headers: auth_as(domino)

      response_data = JSON.parse(response.body)
      recipe_names = response_data.map { |recipe| recipe['name'] }

      expect(recipe_names).to eq(["Pizza", "Margherita"])

      get "/api/recipes", headers: auth_as(madzia)

      response_data = JSON.parse(response.body)
      recipe_names = response_data.map { |recipe| recipe['name'] }

      expect(recipe_names).to eq(["Naleśniki"])
    end

    it 'it shows the recipe for domino' do
      get "/api/recipes/#{pizza.id}", headers: auth_as(domino)

      response_data = JSON.parse(response.body)
      expect(response_data['name']).to eq("Pizza")
    end

    it 'it does not show the recipe that belongs to domino' do
      get "/api/recipes/#{pizza.id}", headers: auth_as(madzia)

      expect(response).to have_http_status(:forbidden)
    end

    it 'allows domino to create a new recipe' do
      params = {
        recipe: {
          name: "Naleśniki",
          description: "Do przygotowania naleśników potrzebujesz...",
          preparation_time: 30,
          recipe_type_id: domino_category.id,
          tags: [domino_tag],
          recipe_ingredients_attributes: [
            {
              ingredient_id: domino_ingredient.id,
              amount: 2.6,
              unit: "gram"
            }
          ],
        }
      }
      post "/api/recipes", params:, headers: auth_as(domino)

      expect(response).to have_http_status(:no_content)
    end

    it 'allows domino to update an existing recipe' do
      params = {
        recipe: {
          name: "Pierogi",
          preparation_time: 90
        }
      }
      put "/api/recipes/#{pizza.id}", params:, headers: auth_as(domino)

      expect(response).to have_http_status(:no_content)
    end

    it 'does not allow to update the recipe that belongs to domino' do
      params = {
        recipe: {
          name: "Pierogi",
          preparation_time: 90
        }
      }
      put "/api/recipes/#{pizza.id}", params:, headers: auth_as(madzia)

      expect(response).to have_http_status(:forbidden)
    end

    it 'allows domino to delete the recipe' do
      delete "/api/recipes/#{pizza.id}", headers: auth_as(domino)

      expect(response).to have_http_status(:no_content)

      get "/api/recipes", headers: auth_as(domino)

      response_data = JSON.parse(response.body)
      recipe_names = response_data.map { |recipe| recipe['name'] }

      expect(recipe_names).to eq(["Margherita"])
    end

    it 'does not allot to destroy the recipe that belongs to domino' do
      delete "/api/recipes/#{pizza.id}", headers: auth_as(madzia)

      expect(response).to have_http_status(:forbidden)
    end
  end

  context 'when user is admin' do
    it 'does not show the admin a list of recipes' do
      get "/api/recipes", headers: auth_as(admin)

      expect(response).to have_http_status(:forbidden)
    end

    it 'does not show the recipe to the admin' do
      get "/api/recipes/#{pizza.id}", headers: auth_as(admin)

      expect(response).to have_http_status(:forbidden)
    end

    it 'does not allow the admin to create a recipe' do
      params = {
        recipe: {
          name: "Pizza",
          description: "Do przygotowania pizzy potrzebujesz...",
          preparation_time: 50,
          recipe_type_id: "type_id",
          tags: ["tag_id"],
          recipe_ingredients_attributes: [
            {
              ingredient_id: "ingredient_id",
              amount: 0.6,
              unit: "gram"
            }
          ],
          user: admin
        }
      }
      post "/api/recipes", params:, headers: auth_as(admin)

      expect(response).to have_http_status(:forbidden)
    end

    it 'does not allow the admin to update the recipe' do
      params = {
        recipe: {
          name: "Naleśniki"
        }
      }
      put "/api/recipes/#{pizza.id}", params:, headers: auth_as(admin)

      expect(response).to have_http_status(:forbidden)
    end

    it 'does not allow the admin to delete the recipe' do
      delete "/api/recipes/#{pizza.id}", headers: auth_as(admin)

      expect(response).to have_http_status(:forbidden)
    end
  end
end
