require 'rails_helper'
require 'test_helper'

RSpec.describe IngredientsController, type: :request do
  include_examples "basic_seed"

  context 'when user is authorizations' do
    it 'it shows the domino ingredients list' do
      get "/api/ingredients", headers: auth_as(domino)

      response_data = JSON.parse(response.body)
      ingredients_names = response_data.map { |ingredient| ingredient['name'] }

      expect(ingredients_names).to eq(["Mleko", "Mąka"])

      get "/api/ingredients", headers: auth_as(domino)

      response_data = JSON.parse(response.body)
      ingredients_names = response_data.map { |ingredient| ingredient['name'] }

      expect(ingredients_names).to_not eq("Pomarańcza")
    end

    it 'it shows the ingredient for domino' do
      get "/api/ingredients/#{domino_ingredient.id}", headers: auth_as(domino)

      response_data = JSON.parse(response.body)
      expect(response_data['name']).to eq("Mleko")
    end

    it 'it does not show the ingredient that belongs to domino' do
      get "/api/ingredients/#{domino_ingredient.id}", headers: auth_as(madzia)

      expect(response).to have_http_status(:forbidden)
    end

    it 'allows domino to create a new ingredient' do
      params = {
        ingredient: {
          name: "Banan"
        }
      }
      post "/api/ingredients", params:, headers: auth_as(domino)

      expect(response).to have_http_status(:no_content)
    end

    it 'allows domino to update an existing ingredient' do
      params = {
        ingredient: {
          name: "Masło"
        }
      }
      put "/api/ingredients/#{domino_ingredient.id}", params:, headers: auth_as(domino)

      expect(response).to have_http_status(:no_content)
    end

    it 'does not allow to update the ingredient that belongs to domino' do
      params = {
        ingredient: {
          name: "Masło"
        }
      }
      put "/api/ingredients/#{domino_ingredient.id}", params:, headers: auth_as(madzia)

      expect(response).to have_http_status(:forbidden)
    end

    it 'allows domino to delete the ingredient' do
      delete "/api/ingredients/#{domino_ingredient_2.id}", headers: auth_as(domino)

      expect(response).to have_http_status(:no_content)

      get "/api/ingredients", headers: auth_as(domino)

      response_data = JSON.parse(response.body)
      ingredients_names = response_data.map { |ingredient| ingredient['name'] }

      expect(ingredients_names).to eq(["Mleko"])
    end

    it 'does not allot to destroy the ingredient that belongs to domino' do
      delete "/api/ingredients/#{domino_ingredient.id}", headers: auth_as(madzia)

      expect(response).to have_http_status(:forbidden)
    end
  end

  context 'when user is admin' do
    it 'does not show the admin a list of ingredients' do
      get "/api/ingredients", headers: auth_as(admin)

      expect(response).to have_http_status(:forbidden)
    end

    it 'does not show the ingredient to the admin' do
      get "/api/ingredients/#{domino_ingredient.id}", headers: auth_as(admin)

      expect(response).to have_http_status(:forbidden)
    end

    it 'does not allow the admin to create a ingredient' do
      params = {
        ingredient: {
          name: "Masło"
        }
      }
      post "/api/ingredients", params:, headers: auth_as(admin)

      expect(response).to have_http_status(:forbidden)
    end

    it 'does not allow the admin to update the ingredient' do
      params = {
        ingredient: {
          name: "Naleśniki"
        }
      }
      put "/api/ingredients/#{domino_ingredient.id}", params:, headers: auth_as(admin)

      expect(response).to have_http_status(:forbidden)
    end

    it 'does not allow the admin to delete the ingredient' do
      delete "/api/ingredients/#{domino_ingredient.id}", headers: auth_as(admin)

      expect(response).to have_http_status(:forbidden)
    end
  end
end