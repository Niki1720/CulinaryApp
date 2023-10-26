require 'rails_helper'

RSpec.shared_examples "basic_seed" do
  let(:madzia) { User.find_by(email: 'magda.gesler@gmail.pl') }
  let(:domino) { User.find_by(email: 'pizza.men@domino.com') }
  let(:admin) { User.find_by(email: 'admin@wp.pl') }

  let(:madzia_category) { RecipeType.find_by(name: "Obiad") }
  let(:domino_category) { RecipeType.find_by(name: "Kolacja") }

  let(:madzia_tag) { Tag.find_by(name: "Wegetariańskie") }
  let(:domino_tag) { Tag.find_by(name: "Z mięsem") }
  let(:domino_tag_2) { Tag.find_by(name: "Nabiał") }

  let(:madzia_ingredient) { Ingredient.find_by(name: "Pomarańcza") }
  let(:domino_ingredient) { Ingredient.find_by(name: "Mleko") }
  let(:domino_ingredient_2) { Ingredient.find_by(name: "Mąka") }

  let(:pizza) { Recipe.find_by(name: "Pizza") }
  let(:nalesniki) { Recipe.find_by(name: "Naleśniki") }
  let(:margherita) { Recipe.find_by(name: "Margherita") }

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

    RecipeType.create(name: "Obiad", user: madzia)
    RecipeType.create(name: "Kolacja", user: domino)

    Tag.create(name: "Wegetariańskie", user: madzia)
    Tag.create(name: "Z mięsem", user: domino)
    Tag.create(name: "Nabiał", user: domino)

    Ingredient.create(name: "Pomarańcza", user: madzia)
    Ingredient.create(name: "Mleko", user: domino)
    Ingredient.create(name: "Mąka", user: domino)

    Recipe.create(
      name: "Naleśniki",
      description: "Do przygotowania nalesników potrzebujesz...",
      preparation_time: 50,
      recipe_type_id: madzia_category.id,
      tags: [madzia_tag],
      recipe_ingredients_attributes: [
        {
          ingredient_id: madzia_ingredient.id,
          amount: 0.6,
          unit: "gram"
        }
      ],
      user: madzia)

    Recipe.create(
      name: "Pizza",
      description: "Do przygotowania pizzy potrzebujesz...",
      preparation_time: 90,
      recipe_type_id: domino_category.id,
      tags: [domino_tag],
      recipe_ingredients_attributes: [
        {
          ingredient_id: domino_ingredient_2.id,
          amount: 0.6,
          unit: "gram"
        }
      ],
      user: domino)

    Recipe.create(
      name: "Margherita",
      description: "Do przygotowania margherity potrzebujesz...",
      preparation_time: 90,
      recipe_type_id: domino_category.id,
      tags: [domino_tag],
      recipe_ingredients_attributes: [
        {
          ingredient_id: domino_ingredient.id,
          amount: 0.6,
          unit: "gram"
        },
        {
          ingredient_id: domino_ingredient_2.id,
          amount: 0.6,
          unit: "gram"
        }

      ],
      user: domino)
  end
end