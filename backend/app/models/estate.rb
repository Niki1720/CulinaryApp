# == Schema Information
#
# Table name: estates
#
#  id         :bigint           not null, primary key
#  address    :string           not null
#  city       :string           not null
#  latitude   :float            not null
#  longitude  :float            not null
#  name       :string           not null
#  state      :string           not null
#  zip        :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class Estate < ApplicationRecord
end
