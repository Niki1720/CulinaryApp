# == Schema Information
#
# Table name: users
#
#  id                     :uuid             not null, primary key
#  admin                  :boolean          default(FALSE), not null
#  email                  :string           default(""), not null
#  encrypted_password     :string           default(""), not null
#  jti                    :string           not null
#  remember_created_at    :datetime
#  reset_password_sent_at :datetime
#  reset_password_token   :string
#
# Indexes
#
#  index_users_on_email                 (email) UNIQUE
#  index_users_on_jti                   (jti) UNIQUE
#  index_users_on_reset_password_token  (reset_password_token) UNIQUE
#
class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  include Devise::JWT::RevocationStrategies::JTIMatcher

  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable, :jwt_authenticatable,
         jwt_revocation_strategy: self

  has_many :recipes, dependent: :destroy
  has_many :tags, dependent: :destroy
  has_many :ingredients, dependent: :destroy
  has_many :recipe_types, dependent: :destroy

  validates :email, presence: true, length: { minimum: 6, maximum: 30 }, format: { with: URI::MailTo::EMAIL_REGEXP }
  validates :encrypted_password, presence: true

  def admin?
    admin
  end
end
