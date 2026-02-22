import { User, Property, Booking, Review } from '../models/index.js';
import { Op } from 'sequelize';

const getUsers = async (req, res) => {
  try {
    const { page = 1, limit = 20, role, search } = req.query;
    const offset = (page - 1) * limit;
    const where = {};

    if (role) where.role = role;
    if (search) {
      where[Op.or] = [
        { name: { [Op.iLike]: `%${search}%` } },
        { email: { [Op.iLike]: `%${search}%` } }
      ];
    }

    const { count, rows: users } = await User.findAndCountAll({
      where,
      attributes: { exclude: ['password'] },
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [['createdAt', 'DESC']]
    });

    res.json({
      success: true,
      users,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(count / limit),
        totalItems: count,
        itemsPerPage: parseInt(limit)
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch users',
      error: error.message
    });
  }
};

const toggleUserStatus = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Prevent admin from blocking themselves
    if (user.id === req.user.id) {
      return res.status(400).json({
        success: false,
        message: 'Cannot block yourself'
      });
    }

    await user.update({ isActive: !user.isActive });

    res.json({
      success: true,
      message: `User ${user.isActive ? 'activated' : 'deactivated'} successfully`,
      user: { ...user.toJSON(), password: undefined }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to update user status',
      error: error.message
    });
  }
};

const getPendingProperties = async (req, res) => {
  try {
    const { page = 1, limit = 20 } = req.query;
    const offset = (page - 1) * limit;

    const { count, rows: properties } = await Property.findAndCountAll({
      where: { isApproved: false },
      include: [
        {
          model: User,
          as: 'owner',
          attributes: ['id', 'name', 'email']
        }
      ],
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [['createdAt', 'ASC']]
    });

    res.json({
      success: true,
      properties,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(count / limit),
        totalItems: count,
        itemsPerPage: parseInt(limit)
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch pending properties',
      error: error.message
    });
  }
};

const approveProperty = async (req, res) => {
  try {
    const { id } = req.params;

    const property = await Property.findByPk(id);
    if (!property) {
      return res.status(404).json({
        success: false,
        message: 'Property not found'
      });
    }

    await property.update({ isApproved: true });

    res.json({
      success: true,
      message: 'Property approved successfully',
      property
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to approve property',
      error: error.message
    });
  }
};

const rejectProperty = async (req, res) => {
  try {
    const { id } = req.params;

    const property = await Property.findByPk(id);
    if (!property) {
      return res.status(404).json({
        success: false,
        message: 'Property not found'
      });
    }

    await property.destroy();

    res.json({
      success: true,
      message: 'Property rejected and deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to reject property',
      error: error.message
    });
  }
};

const getDashboardStats = async (req, res) => {
  try {
    const [
      totalUsers,
      totalProperties,
      totalBookings,
      pendingProperties,
      activeUsers,
      completedBookings
    ] = await Promise.all([
      User.count(),
      Property.count(),
      Booking.count(),
      Property.count({ where: { isApproved: false } }),
      User.count({ where: { isActive: true } }),
      Booking.count({ where: { status: 'completed' } })
    ]);

    res.json({
      success: true,
      stats: {
        totalUsers,
        totalProperties,
        totalBookings,
        pendingProperties,
        activeUsers,
        completedBookings
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch dashboard stats',
      error: error.message
    });
  }
};

export {
  getUsers,
  toggleUserStatus,
  getPendingProperties,
  approveProperty,
  rejectProperty,
  getDashboardStats
};