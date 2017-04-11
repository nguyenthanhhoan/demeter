class Camera < ApplicationRecord
  has_and_belongs_to_many :zones
  enum api: [ :vp9 ]
end
