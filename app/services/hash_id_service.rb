class HashIdService

  def initialize
    @hashids = Hashids.new 'demeter salt', 5
  end
  
  def encode(id)
    @hashids.encode(id)
  end

  def decode(id)
    @hashids.decode(id)[0]
  end
end
