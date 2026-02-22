import { Payment, Booking } from '../models/index.js';

const initiatePayment = async (req, res) => {
  try {
    const { bookingId, method, phoneNumber, cardDetails } = req.body;

    // Verify booking exists and belongs to user
    const booking = await Booking.findByPk(bookingId);
    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    if (booking.customerId !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }

    // Check if payment already exists
    const existingPayment = await Payment.findOne({ where: { bookingId } });
    if (existingPayment && existingPayment.status === 'completed') {
      return res.status(400).json({
        success: false,
        message: 'Payment already completed for this booking'
      });
    }

    // Create or update payment record
    let payment;
    if (existingPayment) {
      payment = await existingPayment.update({
        method,
        amount: booking.totalAmount,
        status: 'pending',
        phoneNumber: method === 'orange_money' || method === 'momo_pay' ? phoneNumber : null,
        cardLast4: method === 'credit_card' && cardDetails ? cardDetails.last4 : null,
        transactionId: generateTransactionId()
      });
    } else {
      payment = await Payment.create({
        bookingId,
        method,
        amount: booking.totalAmount,
        status: 'pending',
        phoneNumber: method === 'orange_money' || method === 'momo_pay' ? phoneNumber : null,
        cardLast4: method === 'credit_card' && cardDetails ? cardDetails.last4 : null,
        transactionId: generateTransactionId()
      });
    }

    // Simulate payment processing based on method
    let paymentResponse;
    switch (method) {
      case 'orange_money':
        paymentResponse = await simulateOrangeMoneyPayment(phoneNumber, booking.totalAmount);
        break;
      case 'momo_pay':
        paymentResponse = await simulateMomoPayment(phoneNumber, booking.totalAmount);
        break;
      case 'credit_card':
        paymentResponse = await simulateCreditCardPayment(cardDetails, booking.totalAmount);
        break;
      default:
        return res.status(400).json({
          success: false,
          message: 'Invalid payment method'
        });
    }

    res.json({
      success: true,
      message: 'Payment initiated successfully',
      payment: {
        id: payment.id,
        transactionId: payment.transactionId,
        status: payment.status,
        method: payment.method,
        amount: payment.amount
      },
      paymentResponse
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to initiate payment',
      error: error.message
    });
  }
};

const confirmPayment = async (req, res) => {
  try {
    const { transactionId, confirmationCode } = req.body;

    const payment = await Payment.findOne({ 
      where: { transactionId },
      include: [
        {
          model: Booking,
          as: 'booking'
        }
      ]
    });

    if (!payment) {
      return res.status(404).json({
        success: false,
        message: 'Payment not found'
      });
    }

    // Simulate payment confirmation
    const isConfirmed = await simulatePaymentConfirmation(payment.method, confirmationCode);
    
    if (isConfirmed) {
      await payment.update({ status: 'completed' });
      await payment.booking.update({ status: 'confirmed' });

      res.json({
        success: true,
        message: 'Payment confirmed successfully',
        payment: {
          id: payment.id,
          status: payment.status,
          method: payment.method,
          amount: payment.amount
        }
      });
    } else {
      await payment.update({ status: 'failed' });

      res.status(400).json({
        success: false,
        message: 'Payment confirmation failed'
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to confirm payment',
      error: error.message
    });
  }
};

// Utility functions for payment simulation
const generateTransactionId = () => {
  return 'TXN_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
};

const simulateOrangeMoneyPayment = async (phoneNumber, amount) => {
  // Simulate Orange Money API call
  return {
    status: 'pending',
    message: `Payment request sent to ${phoneNumber}. Please check your phone for confirmation.`,
    confirmationRequired: true
  };
};

const simulateMomoPayment = async (phoneNumber, amount) => {
  // Simulate Momo Pay API call
  return {
    status: 'pending',
    message: `Payment request sent to ${phoneNumber}. Please check your phone for confirmation.`,
    confirmationRequired: true
  };
};

const simulateCreditCardPayment = async (cardDetails, amount) => {
  // Simulate credit card processing
  return {
    status: 'processing',
    message: 'Processing credit card payment...',
    confirmationRequired: false
  };
};

const simulatePaymentConfirmation = async (method, confirmationCode) => {
  // Simulate payment confirmation logic
  // In real implementation, this would verify with actual payment providers
  return confirmationCode && confirmationCode.length >= 4;
};

export {
  initiatePayment,
  confirmPayment
};