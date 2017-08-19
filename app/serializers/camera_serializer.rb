class CameraSerializer < ActiveModel::Serializer
  attributes  :id, :camera_no, :camera_name, :api, :server, :live_hash, 
              :playback_hash, :secret_id, :channel
end
