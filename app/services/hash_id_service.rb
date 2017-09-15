class HashIdService

  def initialize
    @hashids = Hashids.new 'demeter salt', 5
    @package_hashids = Hashids.new 'dmt package salt', 10
    @camera_hashids = Hashids.new 'dmt camera salt', 10
  end
  
  def encode(id)
    @hashids.encode(id)
  end

  def decode(id)
    @hashids.decode(id)[0]
  end

  def encode_package(id)
    @package_hashids.encode(id)
  end

  def decode_package(id)
    @package_hashids.decode(id)[0]
  end

  def encode_camera(id)
    @camera_hashids.encode(id)
  end

  def decode_camera(id)
    @camera_hashids.decode(id)[0]
  end
end
