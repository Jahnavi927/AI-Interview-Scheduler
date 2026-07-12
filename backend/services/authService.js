const bcrypt = require("bcryptjs");
const authRepository = require("../repositories/authRepository");

const registerUser = async ({ name, email, password, role }) => {

  // Check if email already exists
  const existingUser = await authRepository.findUserByEmail(email);

  if (existingUser) {
    throw new Error("Email already exists");
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create user object
  const newUser = {
    name,
    email,
    password: hashedPassword,
    role,
  };

  // Save to database
  const user = await authRepository.createUser(newUser);

  return user;
};

module.exports = {
  registerUser,
};