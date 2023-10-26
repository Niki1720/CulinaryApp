# == Schema Information
#
# Table name: tags
#
#  id         :uuid             not null, primary key
#  name       :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  user_id    :uuid
#
# Indexes
#
#  index_tags_on_user_id  (user_id)
#
# Foreign Keys
#
#  fk_rails_...  (user_id => users.id)
#
class Tag < ApplicationRecord
  belongs_to :user
  has_many :recipe_tags, dependent: :destroy
  has_many :recipes, through: :recipe_tags

  validates :name, presence: true, length: { minimum: 2 }
  validates :name, uniqueness: { scope: :user_id }
end
