import { Property, User, Review } from '../models/index.js';
import { Op } from 'sequelize';

const getProperties = async (req, res) => {
  try {
    const { 
      page = 1, 
      limit = 12, 
      type, 
      location, 
      minPrice, 
      maxPrice, 
      bedrooms, 
      bathrooms,
      search 
    } = req.query;

    const offset = (page - 1) * limit;
    const where = { isApproved: true, isActive: true };

    // Apply filters
    if (type) where.type = type;
    if (location) where.location = { [Op.iLike]: `%${location}%` };
    if (minPrice) where.price = { ...where.price, [Op.gte]: minPrice };
    if (maxPrice) where.price = { ...where.price, [Op.lte]: maxPrice };
    if (bedrooms) where.bedrooms = { [Op.gte]: bedrooms };
    if (bathrooms) where.bathrooms = { [Op.gte]: bathrooms };
    if (search) {
      where[Op.or] = [
        { title: { [Op.iLike]: `%${search}%` } },
        { description: { [Op.iLike]: `%${search}%` } },
        { location: { [Op.iLike]: `%${search}%` } }
      ];
    }

    const { count, rows: properties } = await Property.findAndCountAll({
      where,
      include: [
        {
          model: User,
          as: 'owner',
          attributes: ['id', 'name', 'email', 'avatar']
        },
        {
          model: Review,
          as: 'reviews',
          attributes: ['rating']
        }
      ],
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [['createdAt', 'DESC']]
    });

    // Calculate average rating for each property
    const propertiesWithRating = properties.map(property => {
      const reviews = property.reviews || [];
      const avgRating = reviews.length > 0 
        ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length 
        : 0;
      
      return {
        ...property.toJSON(),
        avgRating: Math.round(avgRating * 10) / 10,
        reviewCount: reviews.length
      };
    });

    res.json({
      success: true,
      properties: propertiesWithRating,
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
      message: 'Failed to fetch properties',
      error: error.message
    });
  }
};

const getProperty = async (req, res) => {
  try {
    const { id } = req.params;

    const property = await Property.findByPk(id, {
      include: [
        {
          model: User,
          as: 'owner',
          attributes: ['id', 'name', 'email', 'avatar', 'phone']
        },
        {
          model: Review,
          as: 'reviews',
          include: [
            {
              model: User,
              as: 'user',
              attributes: ['id', 'name', 'avatar']
            }
          ]
        }
      ]
    });

    if (!property) {
      return res.status(404).json({
        success: false,
        message: 'Property not found'
      });
    }

    // Calculate average rating
    const reviews = property.reviews || [];
    const avgRating = reviews.length > 0 
      ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length 
      : 0;

    const propertyWithRating = {
      ...property.toJSON(),
      avgRating: Math.round(avgRating * 10) / 10,
      reviewCount: reviews.length
    };

    res.json({
      success: true,
      property: propertyWithRating
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch property',
      error: error.message
    });
  }
};

const createProperty = async (req, res) => {
  try {
    const {
      title,
      description,
      price,
      location,
      address,
      type,
      amenities,
      bedrooms,
      bathrooms,
      maxGuests,
      latitude,
      longitude
    } = req.body;

    const property = await Property.create({
      title,
      description,
      price,
      location,
      address,
      type,
      amenities: amenities || [],
      bedrooms: bedrooms || 1,
      bathrooms: bathrooms || 1,
      maxGuests: maxGuests || 2,
      latitude,
      longitude,
      ownerId: req.user.id,
      images: [] // Will be updated when images are uploaded
    });

    res.status(201).json({
      success: true,
      message: 'Property created successfully',
      property
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to create property',
      error: error.message
    });
  }
};

const updateProperty = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const property = await Property.findByPk(id);
    if (!property) {
      return res.status(404).json({
        success: false,
        message: 'Property not found'
      });
    }

    // Check if user owns the property
    if (property.ownerId !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }

    await property.update(updates);

    res.json({
      success: true,
      message: 'Property updated successfully',
      property
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to update property',
      error: error.message
    });
  }
};

const deleteProperty = async (req, res) => {
  try {
    const { id } = req.params;

    const property = await Property.findByPk(id);
    if (!property) {
      return res.status(404).json({
        success: false,
        message: 'Property not found'
      });
    }

    // Check if user owns the property
    if (property.ownerId !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }

    await property.destroy();

    res.json({
      success: true,
      message: 'Property deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to delete property',
      error: error.message
    });
  }
};

const getOwnerProperties = async (req, res) => {
  try {
    const properties = await Property.findAll({
      where: { ownerId: req.user.id },
      include: [
        {
          model: Review,
          as: 'reviews',
          attributes: ['rating']
        }
      ],
      order: [['createdAt', 'DESC']]
    });

    // Calculate average rating for each property
    const propertiesWithRating = properties.map(property => {
      const reviews = property.reviews || [];
      const avgRating = reviews.length > 0 
        ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length 
        : 0;
      
      return {
        ...property.toJSON(),
        avgRating: Math.round(avgRating * 10) / 10,
        reviewCount: reviews.length
      };
    });

    res.json({
      success: true,
      properties: propertiesWithRating
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch owner properties',
      error: error.message
    });
  }
};

export {
  getProperties,
  getProperty,
  createProperty,
  updateProperty,
  deleteProperty,
  getOwnerProperties
};