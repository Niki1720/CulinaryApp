# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
Estate.create!(name: 'Test',
               address: 'Test Address',
               city: 'Krakow',
               state: 'Malopolska', zip: '30-199', latitude: 45, longitude: 32)