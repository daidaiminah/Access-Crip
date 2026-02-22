# Access Crip - Real Estate Platform for Liberia

A comprehensive fullstack real estate listing and booking platform built specifically for Liberia, featuring an Airbnb-style interface with modern design and seamless user experience.

## 🌟 Features

### For Customers
- **Property Discovery**: Browse and search properties with advanced filters
- **Detailed Listings**: View property details, photos, amenities, and reviews
- **Secure Booking**: Book properties with date selection and guest management
- **Multiple Payment Options**: Orange Money, Momo Pay, and Credit Card support
- **Review System**: Rate and review properties after stays
- **User Dashboard**: Manage bookings and view booking history

### For Property Owners
- **Property Management**: Create, edit, and manage property listings
- **Booking Management**: View and manage incoming booking requests
- **Dashboard Analytics**: Track property performance and bookings
- **Image Upload**: Add multiple photos to showcase properties

### For Administrators
- **User Management**: View, activate, and deactivate user accounts
- **Property Moderation**: Approve or reject property listings
- **Dashboard Analytics**: View platform statistics and metrics
- **Content Management**: Manage reviews and reported content

## 🛠️ Tech Stack

### Frontend
- **Vite** with **React**
- **TypeScript** for type safety
- **Redux Toolkit** for state management
- **TailwindCSS** for styling
- **Framer Motion** for animations
- **Axios** for API calls

### Backend
- **Node.js** with Express.js
- **PostgreSQL** with Sequelize ORM
- **JWT** authentication with HTTP-only cookies
- **Argon2** for password hashing
- **Express Validator** for input validation
- **Multer** for file uploads

### Security & Performance
- **Helmet** for security headers
- **Rate limiting** to prevent abuse
- **CORS** configuration
- **Input validation** and sanitization
- **Error handling** middleware

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- PostgreSQL 12+
- npm

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd access-crip
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   
   # Create .env file with your database credentials
   cp .env.example .env
   
   # Start the backend server
   npm run dev
   ```

3. **Frontend Setup**
   ```bash
   cd frontend
   npm install
   
   # Create .env.local file
   cp .env.example .env.local
   
   # Start the frontend development server
   npm run dev
   ```

4. **Database Setup**
   - Create a PostgreSQL database
   - Update the database credentials in `backend/.env`
   - The application will automatically sync database models on startup

### Environment Variables

#### Backend (.env)
```env
NODE_ENV=development
PORT=5000
JWT_SECRET=your-super-secret-jwt-key
DB_HOST=localhost
DB_PORT=5432
DB_NAME=access_crip
DB_USER=postgres
DB_PASS=password
FRONTEND_URL=http://localhost:3000
```

#### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

## 📱 Usage

### Customer Flow
1. **Browse Properties**: Visit the homepage and explore featured properties
2. **Search & Filter**: Use the search functionality to find specific properties
3. **View Details**: Click on properties to view detailed information
4. **Book Property**: Select dates, guests, and proceed with booking
5. **Make Payment**: Choose from Orange Money, Momo Pay, or Credit Card
6. **Manage Bookings**: View and manage bookings in the customer dashboard

### Owner Flow
1. **Register as Owner**: Sign up with owner role
2. **Create Listing**: Add property details, photos, and amenities
3. **Wait for Approval**: Admin reviews and approves the listing
4. **Manage Bookings**: View and respond to booking requests
5. **Track Performance**: Monitor property performance in dashboard

### Admin Flow
1. **Admin Login**: Access admin dashboard with admin credentials
2. **Moderate Content**: Review and approve/reject property listings
3. **Manage Users**: View user list and manage account status
4. **View Analytics**: Monitor platform statistics and performance

## 🎨 Design System

### Colors
- **Primary Red**: `#E53935` - Main brand color
- **Black**: `#000000` - Primary text
- **White**: `#FFFFFF` - Background
- **Gray**: `#9E9E9E` - Secondary elements

### Typography
- **Display Font**: Poppins (headings)
- **Body Font**: Inter (body text)
- **Font Weights**: 300, 400, 500, 600, 700, 800

### Components
- **Cards**: Rounded corners with soft shadows
- **Buttons**: Rounded with hover effects
- **Forms**: Clean inputs with focus states
- **Animations**: Smooth transitions with Framer Motion

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user
- `POST /api/auth/logout` - User logout

### Properties
- `GET /api/properties` - Get all properties (with filters)
- `GET /api/properties/:id` - Get single property
- `POST /api/properties` - Create property (owner only)
- `PUT /api/properties/:id` - Update property (owner only)
- `DELETE /api/properties/:id` - Delete property (owner/admin)

### Bookings
- `POST /api/bookings` - Create booking (customer only)
- `GET /api/bookings/customer` - Get customer bookings
- `GET /api/bookings/owner` - Get owner bookings
- `PATCH /api/bookings/:id/status` - Update booking status

### Payments
- `POST /api/payments/initiate` - Initiate payment
- `POST /api/payments/confirm` - Confirm payment

### Reviews
- `POST /api/reviews` - Create review (customer only)
- `GET /api/reviews/property/:id` - Get property reviews

### Admin
- `GET /api/admin/stats` - Get dashboard statistics
- `GET /api/admin/users` - Get all users
- `PATCH /api/admin/users/:id/toggle-status` - Toggle user status
- `GET /api/admin/properties/pending` - Get pending properties
- `PATCH /api/admin/properties/:id/approve` - Approve property
- `DELETE /api/admin/properties/:id/reject` - Reject property

## 🧪 Testing

### Backend Testing
```bash
cd backend
npm test
```

### Frontend Testing
```bash
cd frontend
npm test
```

## 🚀 Deployment

### Backend Deployment
1. Set up PostgreSQL database
2. Configure environment variables
3. Deploy to your preferred platform (render.com)

### Frontend Deployment
1. Build the application: `npm run build`
2. Deploy to  render.com

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit changes: `git commit -am 'Add new feature'`
4. Push to branch: `git push origin feature/new-feature`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Pexels** for providing high-quality stock images
- **Lucide React** for beautiful icons
- **Tailwind CSS** for the utility-first CSS framework
- **Framer Motion** for smooth animations

## 📞 Support

For support, email hello@accesscrip.com or create an issue in the repository.

---

**Access Crip** - Your gateway to comfortable accommodations in Liberia 🇱🇷