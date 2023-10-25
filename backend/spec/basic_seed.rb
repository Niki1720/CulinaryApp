require 'rails_helper'

RSpec.shared_examples "basic_seed" do
  let(:madzia) { User.find_by(email: 'magda.gesler@gmail.pl') }
  let(:domino) { User.find_by(email: 'pizza.men@domino.com') }
  let(:admin) { User.find_by(email: 'admin@wp.pl') }

  before do
    User.create!(
      email: "magda.gesler@gmail.pl",
      password: "madzia1",
      admin: false
      )

    User.create!(
      email: "pizza.men@domino.com",
      password: "domino1",
      admin: false
    )

    User.create!(
      email: "admin@wp.pl",
      password: "admin123",
      admin: true
    )
  end
end