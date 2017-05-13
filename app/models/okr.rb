class Okr < ApplicationRecord
  belongs_to :zone

  has_many :okr_objectives, dependent: :destroy
end
