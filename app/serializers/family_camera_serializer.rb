class FamilyCameraSerializer < ActiveModel::Serializer
  attributes :id, :hash_id, :name, :rtsp_url, :rtmp_url, :m3u8_url, :main
end
