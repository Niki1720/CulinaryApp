require 'rails_helper'
require 'test_helper'

RSpec.describe TagsController, type: :request do
  include_examples "basic_seed"

  context 'when user is authorizations' do
    let(:tag) { Tag.create(name: "Tag", user:) }

    it 'it shows the domino tags list' do
      get "/api/tags", headers: auth_as(domino)

      response_data = JSON.parse(response.body)
      tags_names = response_data.map { |tag| tag['name'] }

      expect(tags_names).to eq(["Z mięsem", "Nabiał"])

      get "/api/tags", headers: auth_as(madzia)

      response_data = JSON.parse(response.body)
      tags_names = response_data.map { |tag| tag['name'] }

      expect(tags_names).to eq(["Wegetariańskie"])
    end

    it 'it shows the tag for domino' do
      get "/api/tags/#{domino_tag_2.id}", headers: auth_as(domino)

      response_data = JSON.parse(response.body)
      expect(response_data['name']).to eq("Nabiał")
    end

    it 'it does not show the tag that belongs to domino' do
      get "/api/tags/#{domino_tag_2.id}", headers: auth_as(madzia)

      expect(response).to have_http_status(:forbidden)
    end

    it 'allows domino to create a new tag' do
      params = {
        tag: {
          name: "Banan"
        }
      }
      post "/api/tags", params:, headers: auth_as(domino)

      expect(response).to have_http_status(:no_content)
    end

    it 'allows domino to update an existing tag' do
      params = {
        tag: {
          name: "Wegańskie"
        }
      }
      put "/api/tags/#{domino_tag.id}", params:, headers: auth_as(domino)

      expect(response).to have_http_status(:no_content)
    end

    it 'does not allow to update the tag that belongs to domino' do
      params = {
        tag: {
          name: "Wegańskie"
        }
      }
      put "/api/tags/#{domino_tag.id}", params:, headers: auth_as(madzia)

      expect(response).to have_http_status(:forbidden)
    end

    it 'allows domino to delete the tag' do
      delete "/api/tags/#{domino_tag.id}", headers: auth_as(domino)

      expect(response).to have_http_status(:no_content)

      get "/api/tags", headers: auth_as(domino)

      response_data = JSON.parse(response.body)
      tags_names = response_data.map { |tag| tag['name'] }

      expect(tags_names).to eq(["Nabiał"])
    end

    it 'does not allot to destroy the tag that belongs to domino' do
      delete "/api/tags/#{domino_tag.id}", headers: auth_as(madzia)

      expect(response).to have_http_status(:forbidden)
    end
  end

  context 'when user is admin' do
    it 'does not show the admin a list of tags' do
      get "/api/tags", headers: auth_as(admin)

      expect(response).to have_http_status(:forbidden)
    end

    it 'does not show the tag to the admin' do
      get "/api/tags/#{domino_tag.id}", headers: auth_as(admin)

      expect(response).to have_http_status(:forbidden)
    end

    it 'does not allow the admin to create a tag' do
      params = {
        tag: {
          name: "Masło"
        }
      }
      post "/api/tags", params:, headers: auth_as(admin)

      expect(response).to have_http_status(:forbidden)
    end

    it 'does not allow the admin to update the tag' do
      params = {
        tag: {
          name: "Naleśniki"
        }
      }
      put "/api/tags/#{domino_tag.id}", params:, headers: auth_as(admin)

      expect(response).to have_http_status(:forbidden)
    end

    it 'does not allow the admin to delete the tag' do
      delete "/api/tags/#{domino_tag.id}", headers: auth_as(admin)

      expect(response).to have_http_status(:forbidden)
    end
  end
end
