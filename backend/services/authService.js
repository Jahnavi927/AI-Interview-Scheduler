const bcrypt = require("bcryptjs");
const authRepository = require("../repositories/authRepository");
const generateToken = require("../utils/generateToken");

// ==========================
// Register User
// ==========================
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

  // Save user
  const user = await authRepository.createUser(newUser);

  // Automatically create candidate profile
  if (user.role === "candidate") {
    await authRepository.createCandidateProfile(user.id);
  }

  return user;
};
// ==========================
// Login User
// ==========================
const loginUser = async ({ email, password }) => {
  // Find user by email
  const user = await authRepository.findUserByEmail(email);

  if (!user) {
    throw new Error("Invalid email or password");
  }

  // Compare entered password with hashed password
  const isPasswordMatch = await bcrypt.compare(password, user.password);

  if (!isPasswordMatch) {
    throw new Error("Invalid email or password");
  }

  // Generate JWT
  const token = generateToken(user);

  // Return user without password
  return {
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      created_at: user.created_at,
    },
  };
};

module.exports = {
  registerUser,
  loginUser,
};