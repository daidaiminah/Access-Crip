import { User } from '../models/index.js';
import { hashPassword, verifyPassword, generateToken, setTokenCookie, clearTokenCookie } from '../utils/auth.js';

const register = async (req, res) => {
  try {
    const { name, email, password, role = 'customer', phone } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'User already exists with this email'
      });
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
      phone
    });

    // Generate token and set cookie
    const token = generateToken(user.id);
    setTokenCookie(res, token);

    // Remove password from response
    const userResponse = { ...user.toJSON() };
    delete userResponse.password;

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      user: userResponse
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Registration failed',
      error: error.message
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Check if user is active
    if (!user.isActive) {
      return res.status(401).json({
        success: false,
        message: 'Account is deactivated'
      });
    }

    // Verify password
    const isValidPassword = await verifyPassword(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Generate token and set cookie
    const token = generateToken(user.id);
    setTokenCookie(res, token);

    // Remove password from response
    const userResponse = { ...user.toJSON() };
    delete userResponse.password;

    res.json({
      success: true,
      message: 'Login successful',
      user: userResponse
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Login failed',
      error: error.message
    });
  }
};

const getMe = async (req, res) => {
  try {
    const user = req.user;
    res.json({
      success: true,
      user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to get user info',
      error: error.message
    });
  }
};

const logout = async (req, res) => {
  try {
    clearTokenCookie(res);
    res.json({
      success: true,
      message: 'Logout successful'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Logout failed',
      error: error.message
    });
  }
};

export {
  register,
  login,
  getMe,
  logout
};