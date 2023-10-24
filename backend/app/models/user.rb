# == Schema Information
#
# Table name: users
#
#  id                 :uuid             not null, primary key
#  admin              :boolean          default(FALSE), not null
#  email              :string           not null
#  encrypted_password :string           not null
#  created_at         :datetime         not null
#  updated_at         :datetime         not null
#
class User < ApplicationRecord
  has_many :recipes
  has_many :tags
  has_many :ingredients
  has_many :recipe_types

  validates :email, presence: true, length: { minimum: 6, maximum: 30 }, format: { with: URI::MailTo::EMAIL_REGEXP }
  validates :encrypted_password, presence: true
end
