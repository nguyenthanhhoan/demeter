10.times { |x|
  User.create({
    email: "test#{x}@example.com",
    password: '123456'
  })
}
