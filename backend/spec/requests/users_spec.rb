require 'rails_helper'
require 'test_helper'

RSpec.describe UsersController, type: :request do
  include_examples "basic_seed"

  let(:user) { User.find_by(email: 'magda.gesler@gmail.pl') }
  let(:another_user) { User.find_by(email: 'pizza.men@domino.com') }
  let(:admin) { User.find_by(email: 'admin@wp.pl') }

  context 'when user is authorizations' do
    it 'returns a success response with the users list' do
      get "/api/users", headers: auth_as(admin)

      response_data = JSON.parse(response.body)

      expect(response).to have_http_status(:ok)
      expect(response_data.length).to eq 3
      expect(response_data.first['id']).to eq(user.id)
      expect(response_data.first['email']).to eq(user.email)
      expect(response_data.second['id']).to eq(another_user.id)
      expect(response_data.second['email']).to eq(another_user.email)
      expect(response_data.last['id']).to eq(admin.id)
      expect(response_data.last['email']).to eq(admin.email)
    end

    it 'returns a success response for showing an existing user' do
      get "/api/users/#{user.id}", headers: auth_as(admin)

      expect(response).to have_http_status(:ok)
    end

    it 'returns a no content response when successfully creating a new user' do
      params = {
        user: {
          email: "paula@wp.pl",
          password: "password"
        }
      }
      post "/api/users", params:, headers: auth_as(admin)

      expect(response).to have_http_status(:no_content)
    end

    it 'returns a no content response when successfully updating an existing user' do
      params = {
        user: {
          email: "paula@wp.pl",
          password: "password"
        }
      }
      put "/api/users/#{user.id}", params:, headers: auth_as(admin)

      expect(response).to have_http_status(:no_content)
    end

    it 'returns a no content response when successfully destroying an existing user' do
      delete "/api/users/#{user.id}", headers: auth_as(admin)

      expect(response).to have_http_status(:no_content)
    end
  end

  context 'when user is not admin' do
    let(:user) { User.find_by(email: 'pizza.men@domino.com') }

    it 'returns a forbidden status when attempting to access the index' do
      get "/api/users", headers: auth_as(user)

      expect(response).to have_http_status(:forbidden)
    end

    it 'returns a forbidden status when attempting to access the show action' do
      get "/api/users/#{another_user.id}", headers: auth_as(user)

      expect(response).to have_http_status(:forbidden)
    end

    it 'returns a forbidden status when attempting to create a new user' do
      params = {
        user: {
          email: "paula@wp.pl"
        }
      }
      post "/api/users", params:, headers: auth_as(user)

      expect(response).to have_http_status(:forbidden)
    end

    it 'returns a forbidden status when attempting to update an existing user' do
      params = {
        user: {
          email: "paula@wp.pl"
        }
      }
      put "/api/users/#{another_user.id}", params:, headers: auth_as(user)

      expect(response).to have_http_status(:forbidden)
    end

    it 'returns a forbidden status when attempting to destroy an existing user' do
      delete "/api/users/#{another_user.id}", headers: auth_as(user)

      expect(response).to have_http_status(:forbidden)
    end
  end
end
