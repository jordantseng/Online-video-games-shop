import bcrypt from 'bcryptjs';

const users = [
  {
    name: 'Admin',
    email: 'admin@example.com',
    password: bcrypt.hashSync('admin', 10),
    isAdmin: true,
  },
  {
    name: 'Jordan',
    email: 'jordantseng1024@gmail.com',
    password: bcrypt.hashSync('123456', 10),
  },
  {
    name: 'Grace',
    email: 'grace@gmail.com',
    password: bcrypt.hashSync('123456', 10),
  },
];

export default users;
