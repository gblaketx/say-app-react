# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
TestData.create(info: 'Foo')
TestData.create(info: 'Bar')
TestData.create(info: 'Baz')

Editor.create!(first_name: 'John' , last_name: 'Doe', email: 'jdoe@kent.com', password: 'test123')
Editor.create!(first_name: 'Jane', last_name: 'Doe', email: 'janedoe@kent.com', password: 'test123')
Editor.create!(first_name: 'JK', last_name: 'Rowling', email: 'jk@kent.com', approved: true, password: 'test123')

Submitter.create!(first_name: 'Charles' , last_name: 'Dickens', email: 'dickens@kent.com', password: 'test123', school: 'Tierra Linda Middle School', grade: '6', teacher: 'God Herself', bio: 'Test User')
Submitter.create!(first_name: 'Charlotte' , last_name: 'Bronte', email: 'bronte@kent.com', password: 'test123', school: 'Central Middle School (San Carlos)', grade: '7', teacher: 'God Herself', bio: 'Test User')
