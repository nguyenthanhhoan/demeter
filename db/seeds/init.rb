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