require 'rails_helper'
require 'test_helper'

RSpec.describe TagsController, type: :request do
  include_examples "basic_seed"

  let(:user) { User.find_by(email: 'magda.gesler@gmail.pl') }
  let(:another_user) { User.find_by(email: 'pizza.men@domino.com') }
  let(:admin) { User.find_by(email: 'admin@wp.pl') }

  context 'when user is authorizations' do
    let(:tag) { Tag.create(name: "Tag", user:) }

    it 'returns a success response with the user tags that belong to him' do
      tag = Tag.create(name: "Tag", user:)
      tag_2 = Tag.create(name: "Tag2", user: another_user)

      get "/api/tags", headers: auth_as(another_user)

      response_data = JSON.parse(response.body)

      expect(response).to have_http_status(:ok)
      expect(response_data.length).to eq 1
      expect(response_data).to_not include(tag)
      expect(response_data.first['id']).to eq(tag_2.id)
      expect(response_data.first['name']).to eq(tag_2.name)
    end

    it 'returns a success response for showing an existing tag' do
      get "/api/tags/#{tag.id}", headers: auth_as(user)

      expect(response).to have_http_status(:ok)
    end

    it 'returns a forbidden status when trying to show a tag belonging to another user' do
      get "/api/tags/#{tag.id}", headers: auth_as(another_user)

      expect(response).to have_http_status(:forbidden)
    end

    it 'returns a no content response when successfully creating a new tag' do
      params = {
        tag: {
          name: "Tag 3"
        }
      }
      post "/api/tags", params:, headers: auth_as(user)

      expect(response).to have_http_status(:no_content)
    end

    it 'returns a no content response when successfully updating an existing tag' do
      params = {
        tag: {
          name: "New Name"
        }
      }
      put "/api/tags/#{tag.id}", params:, headers: auth_as(user)

      expect(response).to have_http_status(:no_content)
    end

    it 'returns a forbidden status when trying to update a tag belonging to another user' do
      params = {
        tag: {
          name: "New Name"
        }
      }
      put "/api/tags/#{tag.id}", params:, headers: auth_as(another_user)

      expect(response).to have_http_status(:forbidden)
    end

    it 'returns a no content response when successfully destroying an existing tag' do
      delete "/api/tags/#{tag.id}", headers: auth_as(user)

      expect(response).to have_http_status(:no_content)
    end

    it 'returns a forbidden status when trying to destroy a tag belonging to another user' do
      delete "/api/tags/#{tag.id}", headers: auth_as(another_user)

      expect(response).to have_http_status(:forbidden)
    end
  end

  context 'when user is admin' do
    let(:tag) { Tag.create(name: "Tag", user:) }

    it 'returns a forbidden status when attempting to access the index' do
      get "/api/tags", headers: auth_as(admin)

      expect(response).to have_http_status(:forbidden)
    end

    it 'returns a forbidden status when attempting to access the show action' do
      get "/api/tags/#{tag.id}", headers: auth_as(admin)

      expect(response).to have_http_status(:forbidden)
    end

    it 'returns a forbidden status when attempting to create a new tag' do
      params = {
        tag: {
          name: "Tag"
        }
      }
      post "/api/tags", params:, headers: auth_as(admin)

      expect(response).to have_http_status(:forbidden)
    end

    it 'returns a forbidden status when attempting to update an existing tag' do
      params = {
        tag: {
          name: "New tag"
        }
      }
      put "/api/tags/#{tag.id}", params:, headers: auth_as(admin)

      expect(response).to have_http_status(:forbidden)
    end

    it 'returns a forbidden status when attempting to destroy an existing tag' do
      delete "/api/tags/#{tag.id}", headers: auth_as(admin)

      expect(response).to have_http_status(:forbidden)
    end
  end
end
