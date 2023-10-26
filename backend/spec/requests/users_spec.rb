require 'rails_helper'
require 'test_helper'

RSpec.describe UsersController, type: :request do
  include_examples "basic_seed"

  context 'when user is authorizations' do
    it 'it shows the users list' do
      get "/api/users", headers: auth_as(admin)

      response_data = JSON.parse(response.body)

      users_emails = response_data.map { |email| email['email'] }
      expect(response_data.length).to eq 3
      expect(users_emails).to include("magda.gesler@gmail.pl", "pizza.men@domino.com", "admin@wp.pl")
    end

    it 'it shows the user data' do
      get "/api/users/#{madzia.id}", headers: auth_as(admin)

      response_data = JSON.parse(response.body)
      expect(response_data['email']).to eq("magda.gesler@gmail.pl")
    end

    it 'allows admin to create a new user' do
      params = {
        user: {
          email: "paula@wp.pl",
          password: "password"
        }
      }
      post "/api/users", params:, headers: auth_as(admin)

      expect(response).to have_http_status(:no_content)
    end

    it 'allows admin to update an existing user' do
      params = {
        user: {
          email: "paula@wp.pl",
          password: "password"
        }
      }
      put "/api/users/#{madzia.id}", params:, headers: auth_as(admin)

      expect(response).to have_http_status(:no_content)
    end

    it 'allows amin to delete the user' do
      delete "/api/users/#{madzia.id}", headers: auth_as(admin)

      expect(response).to have_http_status(:no_content)

      get "/api/users", headers: auth_as(admin)

      response_data = JSON.parse(response.body)
      users_emails = response_data.map { |email| email['email'] }

      expect(users_emails).to eq(["pizza.men@domino.com", "admin@wp.pl"])
    end
  end

  context 'when user is not admin' do
    it 'does not show the madzia a list of users' do
      get "/api/users", headers: auth_as(madzia)

      expect(response).to have_http_status(:forbidden)
    end

    it 'does not show the user to the madzia' do
      get "/api/users/#{admin.id}", headers: auth_as(madzia)

      expect(response).to have_http_status(:forbidden)
    end

    it 'does not allow the madzia to create a user' do
      params = {
        user: {
          email: "paula@wp.pl"
        }
      }
      post "/api/users", params:, headers: auth_as(madzia)

      expect(response).to have_http_status(:forbidden)
    end

    it 'does not allow the madzia to update the user' do
      params = {
        user: {
          email: "paula@wp.pl"
        }
      }
      put "/api/users/#{admin.id}", params:, headers: auth_as(madzia)

      expect(response).to have_http_status(:forbidden)
    end

    it 'does not allow the madzia to delete the user' do
      delete "/api/users/#{admin.id}", headers: auth_as(madzia)

      expect(response).to have_http_status(:forbidden)
    end
  end
end
