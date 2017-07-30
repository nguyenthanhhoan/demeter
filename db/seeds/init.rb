['admin', 'user'].each do |role_name|
  Role.create! name: role_name
end

admin = User.create({
  email: 'admin@example.com',
  password: '123456'
})
admin.add_role :admin

user = User.create({
  email: 'user@example.com',
  password: '123456'
})

caudatfarm = User.create({
  email: 'caudatfarm@demeter.vn',
  password: '123456'
})

# Loop all projects, zones, devices then create hashid
Project.all.each { |project|
  hash_id = HashIdService.new.encode project.id
  project.update_attribute(:hash_id, hash_id)
}

Zone.all.each { |project|
  hash_id = HashIdService.new.encode project.id
  project.update_attribute(:hash_id, hash_id)
}

DeviceField.all.each { |project|
  hash_id = HashIdService.new.encode project.id
  project.update_attribute(:hash_id, hash_id)
}