import { Booking, Property, User, Payment } from '../models/index.js';
import { Op } from 'sequelize';

const createBooking = async (req, res) => {
  try {
    const { propertyId, startDate, endDate, guests, notes } = req.body;

    // Check if property exists and is available
    const property = await Property.findByPk(propertyId);
    if (!property || !property.isApproved || !property.isActive) {
      return res.status(404).json({
        success: false,
        message: 'Property not found or not available'
      });
    }

    // Check if dates are available
    const existingBooking = await Booking.findOne({
      where: {
        propertyId,
        status: { [Op.in]: ['pending', 'confirmed'] },
        [Op.or]: [
          {
            startDate: { [Op.between]: [startDate, endDate] }
          },
          {
            endDate: { [Op.between]: [startDate, endDate] }
          },
          {
            [Op.and]: [
              { startDate: { [Op.lte]: startDate } },
              { endDate: { [Op.gte]: endDate } }
            ]
          }
        ]
      }
    });

    if (existingBooking) {
      return res.status(400).json({
        success: false,
        message: 'Property is not available for selected dates'
      });
    }

    // Calculate total amount
    const start = new Date(startDate);
    const end = new Date(endDate);
    const nights = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
    const totalAmount = nights * property.price;

    const booking = await Booking.create({
      propertyId,
      customerId: req.user.id,
      startDate,
      endDate,
      guests: guests || 1,
      totalAmount,
      notes
    });

    // Include property and customer details in response
    const bookingWithDetails = await Booking.findByPk(booking.id, {
      include: [
        {
          model: Property,
          as: 'property',
          attributes: ['id', 'title', 'images', 'location', 'price']
        },
        {
          model: User,
          as: 'customer',
          attributes: ['id', 'name', 'email']
        }
      ]
    });

    res.status(201).json({
      success: true,
      message: 'Booking created successfully',
      booking: bookingWithDetails
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to create booking',
      error: error.message
    });
  }
};

const getCustomerBookings = async (req, res) => {
  try {
    const bookings = await Booking.findAll({
      where: { customerId: req.user.id },
      include: [
        {
          model: Property,
          as: 'property',
          attributes: ['id', 'title', 'images', 'location', 'price'],
          include: [
            {
              model: User,
              as: 'owner',
              attributes: ['id', 'name', 'phone']
            }
          ]
        },
        {
          model: Payment,
          as: 'payment',
          attributes: ['id', 'method', 'status', 'amount']
        }
      ],
      order: [['createdAt', 'DESC']]
    });

    res.json({
      success: true,
      bookings
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch bookings',
      error: error.message
    });
  }
};

const getOwnerBookings = async (req, res) => {
  try {
    const bookings = await Booking.findAll({
      include: [
        {
          model: Property,
          as: 'property',
          where: { ownerId: req.user.id },
          attributes: ['id', 'title', 'images', 'location', 'price']
        },
        {
          model: User,
          as: 'customer',
          attributes: ['id', 'name', 'email', 'phone']
        },
        {
          model: Payment,
          as: 'payment',
          attributes: ['id', 'method', 'status', 'amount']
        }
      ],
      order: [['createdAt', 'DESC']]
    });

    res.json({
      success: true,
      bookings
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch owner bookings',
      error: error.message
    });
  }
};

const updateBookingStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const booking = await Booking.findByPk(id, {
      include: [
        {
          model: Property,
          as: 'property'
        }
      ]
    });

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    // Check if user has permission to update booking
    const canUpdate = booking.customerId === req.user.id || 
                     booking.property.ownerId === req.user.id ||
                     req.user.role === 'admin';

    if (!canUpdate) {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }

    await booking.update({ status });

    res.json({
      success: true,
      message: 'Booking status updated successfully',
      booking
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to update booking status',
      error: error.message
    });
  }
};

export {
  createBooking,
  getCustomerBookings,
  getOwnerBookings,
  updateBookingStatus
};