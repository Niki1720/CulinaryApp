require 'rails_helper'
require 'test_helper'

RSpec.describe RecipesController, type: :request do
  include_examples "basic_seed"

  let(:user) { User.find_by(email: 'magda.gesler@gmail.pl') }
  let(:another_user) { User.find_by(email: 'pizza.men@domino.com') }
  let(:admin) { User.find_by(email: 'admin@wp.pl') }

  context 'when user is authorizations' do
    let(:category) { RecipeType.create(name: "Obiad", user:) }
    let(:category_2) { RecipeType.create(name: "Obiad", user: another_user) }
    let(:tag) { Tag.create(name: "Tag", user:) }
    let(:tag_2) { Tag.create(name: "Tag", user: another_user) }
    let(:ingredient) { Ingredient.create(name: "Pomarańcza", user:) }
    let(:ingredient_2) { Ingredient.create(name: "Pomarańcza", user: another_user) }
    let(:recipe) {
      Recipe.create(
        name: "Pizza",
        description: "Do przygotowania pizzy potrzebujesz...",
        preparation_time: 50,
        recipe_type_id: category.id,
        tags: [tag],
        recipe_ingredients_attributes: [
          {
            ingredient_id: ingredient.id,
            amount: 0.6,
            unit: "gram"
          }
        ],
        user:)
    }

    it 'returns a success response with the user recipes that belong to him' do
      recipe_2 = Recipe.create(
        name: "Pizza",
        description: "Do przygotowania pizzy potrzebujesz...",
        preparation_time: 50,
        recipe_type_id: category_2.id,
        tags: [tag_2],
        recipe_ingredients_attributes: [
          {
            ingredient_id: ingredient_2.id,
            amount: 0.6,
            unit: "gram"
          }
        ],
        user: another_user)

      get "/api/recipes", headers: auth_as(another_user)

      response_data = JSON.parse(response.body)

      expect(response).to have_http_status(:ok)
      expect(response_data.length).to eq 1

      expect(response_data).to_not include(recipe)
      expect(response_data.first['id']).to eq(recipe_2.id)
      expect(response_data.first['name']).to eq(recipe_2.name)
      expect(response_data.first['description']).to eq(recipe_2.description)
      expect(response_data.first['preparation_time']).to eq(recipe_2.preparation_time)
      expect(response_data.first['recipe_type_id']).to eq(category_2.id)
    end

    it 'returns a success response for showing an existing recipe' do
      get "/api/recipes/#{recipe.id}", headers: auth_as(user)

      expect(response).to have_http_status(:ok)
    end

    it 'returns a forbidden status when trying to show a recipe belonging to another user' do
      get "/api/recipes/#{recipe.id}", headers: auth_as(another_user)

      expect(response).to have_http_status(:forbidden)
    end

    it 'returns a no content response when successfully creating a new recipe' do
      params = {
        recipe: {
          name: "Naleśniki",
          description: "Do przygotowania naleśników potrzebujesz...",
          preparation_time: 30,
          recipe_type_id: category.id,
          tags: [tag],
          recipe_ingredients_attributes: [
            {
              ingredient_id: ingredient.id,
              amount: 2.6,
              unit: "gram"
            }
          ],
        }
      }
      post "/api/recipes", params:, headers: auth_as(user)

      expect(response).to have_http_status(:no_content)
    end

    it 'returns a no content response when successfully updating an existing recipe' do
      params = {
        recipe: {
          name: "Pierogi",
          preparation_time: 90
        }
      }
      put "/api/recipes/#{recipe.id}", params:, headers: auth_as(user)

      expect(response).to have_http_status(:no_content)
    end

    it 'returns a forbidden status when trying to update a recipe belonging to another user' do
      params = {
        recipe: {
          name: "Pierogi",
          preparation_time: 90
        }
      }
      put "/api/recipes/#{recipe.id}", params:, headers: auth_as(another_user)

      expect(response).to have_http_status(:forbidden)
    end

    it 'returns a no content response when successfully destroying an existing recipe' do
      delete "/api/recipes/#{recipe.id}", headers: auth_as(user)

      expect(response).to have_http_status(:no_content)
    end

    it 'returns a forbidden status when trying to destroy a recipe belonging to another user' do
      delete "/api/recipes/#{recipe.id}", headers: auth_as(another_user)

      expect(response).to have_http_status(:forbidden)
    end
  end

  context 'when user is admin' do
    let(:category) { RecipeType.create(name: "Obiad", user:) }
    let(:tag) { Tag.create(name: "Tag", user:) }
    let(:ingredient) { Ingredient.create(name: "Pomarańcza", user:) }
    let(:recipe) {
      Recipe.create(
        name: "Pizza",
        description: "Do przygotowania pizzy potrzebujesz...",
        preparation_time: 50,
        recipe_type_id: category.id,
        tags: [tag],
        recipe_ingredients_attributes: [
          {
            ingredient_id: ingredient.id,
            amount: 0.6,
            unit: "gram"
          }
        ],
        user:)
    }

    it 'returns a forbidden status when attempting to access the index' do
      get "/api/recipes", headers: auth_as(admin)

      expect(response).to have_http_status(:forbidden)
    end

    it 'returns a forbidden status when attempting to access the show action' do
      get "/api/recipes/#{recipe.id}", headers: auth_as(admin)

      expect(response).to have_http_status(:forbidden)
    end

    it 'returns a forbidden status when attempting to create a new recipe' do
      params = {
        recipe: {
          name: "Pizza",
          description: "Do przygotowania pizzy potrzebujesz...",
          preparation_time: 50,
          recipe_type_id: category.id,
          tags: [tag],
          recipe_ingredients_attributes: [
            {
              ingredient_id: ingredient.id,
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

    it 'returns a forbidden status when attempting to update an existing recipe' do
      params = {
        recipe: {
          name: "Naleśniki"
        }
      }
      put "/api/recipes/#{recipe.id}", params:, headers: auth_as(admin)

      expect(response).to have_http_status(:forbidden)
    end

    it 'returns a forbidden status when attempting to destroy an existing recipe' do
      delete "/api/recipes/#{recipe.id}", headers: auth_as(admin)

      expect(response).to have_http_status(:forbidden)
    end
  end
end
