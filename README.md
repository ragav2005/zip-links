# ZipLinks

A modern, full-stack URL shortener application built with React 19, TypeScript, and React Router 7. Features authentication, analytics dashboard, and geo-aware redirects.

## Features

- **URL Shortening**: Create short, custom aliases for long URLs
- **Authentication**: Secure user registration and login system
- **Analytics Dashboard**: Comprehensive statistics and click tracking
- **Geo-Aware Redirects**: Location-based URL redirection with country-specific rules
- **Responsive Design**: Mobile-first design with glass morphism UI
- **Real-time Analytics**: Device breakdown, geographic distribution, and activity feeds
- **Protected Routes**: Secure access control for authenticated users

## Tech Stack

### Frontend
- **React 19** - Modern React with concurrent features
- **TypeScript** - Type-safe development
- **React Router 7** - Client-side routing and data loading
- **Tailwind CSS v4** - Utility-first CSS framework
- **Zustand** - Lightweight state management
- **Recharts** - Data visualization library
- **ShadCN UI** - Modern component library
- **Sonner** - Toast notifications

### Build Tools
- **Vite** - Fast build tool and development server
- **ESLint** - Code linting
- **TypeScript** - Type checking

## Getting Started

### Prerequisites

- Node.js 20 or higher
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd ziplinks
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
cp .env.example .env
```

4. Configure environment variables in `.env`:
```env
VITE_NODE_URI=http://localhost:5500
VITE_SITE_URL=http://localhost:5173
```

## Development

Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`.

### Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Create production build
- `npm run start` - Start production server
- `npm run typecheck` - Run TypeScript type checking

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_NODE_URI` | Backend API base URL | `http://localhost:5500` |
| `VITE_SITE_URL` | Frontend application URL | `http://localhost:5173` |

## Project Structure

```
ziplinks/
├── app/
│   ├── components/          # Reusable UI components
│   ├── pages/              # Page components
│   │   ├── Dashboard/      # Analytics dashboard
│   │   ├── GeoRedirect/    # Geo-aware redirects
│   │   └── shorten/        # URL shortening
│   ├── routes/             # Route definitions
│   ├── stores/             # Zustand state management
│   ├── types/              # TypeScript type definitions
│   └── utils/              # Utility functions
├── public/                 # Static assets
├── build/                  # Production build output
├── Dockerfile              # Docker configuration
├── package.json            # Dependencies and scripts
├── tsconfig.json           # TypeScript configuration
└── vite.config.ts          # Vite build configuration
```

## Building for Production

Create a production build:

```bash
npm run build
```

This will generate optimized files in the `build/` directory.

## Deployment

### Docker Deployment

Build and run with Docker:

```bash
# Build the image
docker build -t ziplinks .

# Run the container
docker run -p 3000:3000 ziplinks
```

### Manual Deployment

1. Build the application:
```bash
npm run build
```

2. Start the production server:
```bash
npm run start
```

The application will be available on port 3000.

### Environment Configuration

Ensure the following environment variables are set in production:

- `VITE_NODE_URI` - Point to your production API
- `VITE_SITE_URL` - Your production domain

## API Integration

The application integrates with a backend API for:

- User authentication (`/api/auth`)
- URL management (`/api/url`)
- Analytics data (`/api/dashboard`)
- User profile (`/api/user`)

All API calls include proper error handling and loading states.

## Security Features

- JWT token-based authentication
- Protected routes with automatic redirects
- Secure token storage in localStorage
- Automatic token verification on app load
- Secure API communication with Bearer tokens

## Performance

- Server-side rendering with React Router
- Code splitting and lazy loading
- Optimized bundle sizes
- Efficient state management
- Responsive images and assets

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## License

This project is private and proprietary.
