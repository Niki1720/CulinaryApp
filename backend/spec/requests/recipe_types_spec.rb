require 'rails_helper'
require 'test_helper'

RSpec.describe RecipeTypesController, type: :request do
  include_examples "basic_seed"

  let(:user) { User.find_by(email: 'magda.gesler@gmail.pl') }
  let(:another_user) { User.find_by(email: 'pizza.men@domino.com') }
  let(:admin) { User.find_by(email: 'admin@wp.pl') }

  context 'when user is authorizations' do
    let(:category) { RecipeType.create(name: "Obiad", user:) }

    it 'returns a success response with the user categories that belong to him' do
      category = RecipeType.create(name: "Kolacja", user:)
      category_2 = RecipeType.create(name: "Obiad", user: another_user)

      get "/api/recipe_types", headers: auth_as(another_user)

      response_data = JSON.parse(response.body)

      expect(response).to have_http_status(:ok)
      expect(response_data.length).to eq 1
      expect(response_data).to_not include(category)
      expect(response_data.first['id']).to eq(category_2.id)
      expect(response_data.first['name']).to eq(category_2.name)
    end

    it 'returns a success response for showing an existing category' do
      get "/api/recipe_types/#{category.id}", headers: auth_as(user)

      expect(response).to have_http_status(:ok)
    end

    it 'returns a forbidden status when trying to show a category belonging to another user' do
      get "/api/recipe_types/#{category.id}", headers: auth_as(another_user)

      expect(response).to have_http_status(:forbidden)
    end

    it 'returns a no content response when successfully creating a new category' do
      params = {
        recipe_type: {
          name: "Banan"
        }
      }
      post "/api/recipe_types", params:, headers: auth_as(user)

      expect(response).to have_http_status(:no_content)
    end

    it 'returns a no content response when successfully updating an existing category' do
      params = {
        recipe_type: {
          name: "New Name"
        }
      }
      put "/api/recipe_types/#{category.id}", params:, headers: auth_as(user)

      expect(response).to have_http_status(:no_content)
    end

    it 'returns a forbidden status when trying to update a category belonging to another user' do
      params = {
        recipe_type: {
          name: "New Name"
        }
      }
      put "/api/recipe_types/#{category.id}", params:, headers: auth_as(another_user)

      expect(response).to have_http_status(:forbidden)
    end

    it 'returns a no content response when successfully destroying an existing category' do
      delete "/api/recipe_types/#{category.id}", headers: auth_as(user)

      expect(response).to have_http_status(:no_content)
    end

    it 'returns a forbidden status when trying to destroy a category belonging to another user' do
      delete "/api/recipe_types/#{category.id}", headers: auth_as(another_user)

      expect(response).to have_http_status(:forbidden)
    end
  end

  context 'when user is admin' do
    let(:category) { RecipeType.create(name: "Type", user:) }

    it 'returns a forbidden status when attempting to access the index' do
      get "/api/recipe_types", headers: auth_as(admin)

      expect(response).to have_http_status(:forbidden)
    end

    it 'returns a forbidden status when attempting to access the show action' do
      get "/api/recipe_types/#{category.id}", headers: auth_as(admin)

      expect(response).to have_http_status(:forbidden)
    end

    it 'returns a forbidden status when attempting to create a new category' do
      params = {
        recipe_type: {
          name: "Obiad"
        }
      }
      post "/api/recipe_types", params:, headers: auth_as(admin)

      expect(response).to have_http_status(:forbidden)
    end

    it 'returns a forbidden status when attempting to update an existing category' do
      params = {
        recipe_type: {
          name: "New Name"
        }
      }
      put "/api/recipe_types/#{category.id}", params:, headers: auth_as(admin)

      expect(response).to have_http_status(:forbidden)
    end

    it 'returns a forbidden status when attempting to destroy an existing category' do
      delete "/api/recipe_types/#{category.id}", headers: auth_as(admin)

      expect(response).to have_http_status(:forbidden)
    end
  end
end
