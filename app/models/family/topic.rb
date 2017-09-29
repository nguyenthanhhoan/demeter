class Family::Topic < ApplicationRecord
  mount_uploader :picture, ImageUploader
end
