require 'rails_helper'
require 'test_helper'

RSpec.describe IngredientsController, type: :request do
  include_examples "basic_seed"

  let(:user) { User.find_by(email: 'magda.gesler@gmail.pl') }
  let(:another_user) { User.find_by(email: 'pizza.men@domino.com') }
  let(:admin) { User.find_by(email: 'admin@wp.pl') }

  context 'when user is authorizations' do
    let(:ingredient) { Ingredient.create(name: "Pomarańcza", user:) }

    it 'returns a success response with the user ingredients that belong to him' do
      ingredient = Ingredient.create(name: "Śliwka", user:)
      ingredient_2 = Ingredient.create(name: "Banan", user: another_user)

      get "/api/ingredients", headers: auth_as(another_user)

      response_data = JSON.parse(response.body)

      expect(response).to have_http_status(:ok)
      expect(response_data.length).to eq 1
      expect(response_data).to_not include(ingredient)
      expect(response_data.first['id']).to eq(ingredient_2.id)
      expect(response_data.first['name']).to eq(ingredient_2.name)
    end

    it 'returns a success response for showing an existing ingredient' do
      get "/api/ingredients/#{ingredient.id}", headers: auth_as(user)

      expect(response).to have_http_status(:ok)
    end

    it 'returns a forbidden status when trying to show an ingredient belonging to another user' do
      get "/api/ingredients/#{ingredient.id}", headers: auth_as(another_user)

      expect(response).to have_http_status(:forbidden)
    end

    it 'returns a no content response when successfully creating a new ingredient' do
      params = {
        ingredient: {
          name: "Banan"
        }
      }
      post "/api/ingredients", params:, headers: auth_as(user)

      expect(response).to have_http_status(:no_content)
    end

    it 'returns a no content response when successfully updating an existing ingredient' do
      params = {
        ingredient: {
          name: "New Name"
        }
      }
      put "/api/ingredients/#{ingredient.id}", params:, headers: auth_as(user)

      expect(response).to have_http_status(:no_content)
    end

    it 'returns a forbidden status when trying to update an ingredient belonging to another user' do
      params = {
        ingredient: {
          name: "New Name"
        }
      }
      put "/api/ingredients/#{ingredient.id}", params:, headers: auth_as(another_user)

      expect(response).to have_http_status(:forbidden)
    end

    it 'returns a no content response when successfully destroying an existing ingredient' do
      delete "/api/ingredients/#{ingredient.id}", headers: auth_as(user)

      expect(response).to have_http_status(:no_content)
    end

    it 'returns a forbidden status when trying to destroy an ingredient belonging to another user' do
      delete "/api/ingredients/#{ingredient.id}", headers: auth_as(another_user)

      expect(response).to have_http_status(:forbidden)
    end
  end

  context 'when user is admin' do
    let(:ingredient) { Ingredient.create(name: "Pomarańcza", user:) }

    it 'returns a forbidden status when attempting to access the index' do
      get "/api/ingredients", headers: auth_as(admin)

      expect(response).to have_http_status(:forbidden)
    end

    it 'returns a forbidden status when attempting to access the show action' do
      get "/api/ingredients/#{ingredient.id}", headers: auth_as(admin)

      expect(response).to have_http_status(:forbidden)
    end

    it 'returns a forbidden status when attempting to create a new ingredient' do
      params = {
        ingredient: {
          name: "Banan"
        }
      }
      post "/api/ingredients", params:, headers: auth_as(admin)

      expect(response).to have_http_status(:forbidden)
    end

    it 'returns a forbidden status when attempting to update an existing ingredient' do
      params = {
        ingredient: {
          name: "New Name"
        }
      }
      put "/api/ingredients/#{ingredient.id}", params:, headers: auth_as(admin)

      expect(response).to have_http_status(:forbidden)
    end

    it 'returns a forbidden status when attempting to destroy an existing ingredient' do
      delete "/api/ingredients/#{ingredient.id}", headers: auth_as(admin)

      expect(response).to have_http_status(:forbidden)
    end
  end
end