require 'rails_helper'
require 'test_helper'

RSpec.describe RecipeTypesController, type: :request do
  include_examples "basic_seed"

  context 'when user is authorizations' do
    let(:category) { RecipeType.create(name: "Obiad", user:) }

    it 'it shows the domino categories list' do
      get "/api/recipe_types", headers: auth_as(domino)

      response_data = JSON.parse(response.body)
      categories_names = response_data.map { |category| category['name'] }

      expect(categories_names).to eq(["Kolacja"])

      get "/api/recipe_types", headers: auth_as(madzia)

      response_data = JSON.parse(response.body)
      categories_names = response_data.map { |category| category['name'] }

      expect(categories_names).to eq(["Obiad"])
    end

    it 'it shows a category for domino' do
      get "/api/recipe_types/#{domino_category.id}", headers: auth_as(domino)

      response_data = JSON.parse(response.body)
      expect(response_data['name']).to eq("Kolacja")
    end

    it 'it does not show the category that belongs to domino' do
      get "/api/recipe_types/#{domino_category.id}", headers: auth_as(madzia)

      expect(response).to have_http_status(:forbidden)
    end

    it 'allows domino to create a new category' do
      params = {
        recipe_type: {
          name: "Podwieczorek"
        }
      }
      post "/api/recipe_types", params:, headers: auth_as(domino)

      expect(response).to have_http_status(:no_content)
    end

    it 'allows domino to update an existing category' do
      params = {
        recipe_type: {
          name: "Obiad"
        }
      }
      put "/api/recipe_types/#{domino_category.id}", params:, headers: auth_as(domino)

      expect(response).to have_http_status(:no_content)
    end

    it 'does not allow to update the category that belongs to domino' do
      params = {
        recipe_type: {
          name: "Podwieczorek"
        }
      }
      put "/api/recipe_types/#{domino_category.id}", params:, headers: auth_as(madzia)

      expect(response).to have_http_status(:forbidden)
    end

    it 'allows domino to delete the category' do
      delete "/api/recipe_types/#{domino_category.id}", headers: auth_as(domino)

      expect(response).to have_http_status(:no_content)

      get "/api/recipe_types", headers: auth_as(domino)

      response_data = JSON.parse(response.body)
      categories_names = response_data.map { |category| category['name'] }

      expect(categories_names).to eq([])
    end

    it 'does not allot to destroy the category that belongs to domino' do
      delete "/api/recipe_types/#{domino_category.id}", headers: auth_as(madzia)

      expect(response).to have_http_status(:forbidden)
    end
  end

  context 'when user is admin' do
    it 'does not show the admin a list of categories' do
      get "/api/recipe_types", headers: auth_as(admin)

      expect(response).to have_http_status(:forbidden)
    end

    it 'does not show the category to the admin' do
      get "/api/recipe_types/#{domino_category.id}", headers: auth_as(admin)

      expect(response).to have_http_status(:forbidden)
    end

    it 'does not allow the admin to create a category' do
      params = {
        recipe_type: {
          name: "Kolacja"
        }
      }
      post "/api/recipe_types", params:, headers: auth_as(admin)

      expect(response).to have_http_status(:forbidden)
    end

    it 'does not allow the admin to update the category' do
      params = {
        recipe_type: {
          name: "Kolacja"
        }
      }
      put "/api/recipe_types/#{domino_category.id}", params:, headers: auth_as(admin)

      expect(response).to have_http_status(:forbidden)
    end

    it 'does not allow the admin to delete the category' do
      delete "/api/recipe_types/#{domino_category.id}", headers: auth_as(admin)

      expect(response).to have_http_status(:forbidden)
    end
  end
end
