# SwiftFormat - AI-Powered File Converter

## Overview

SwiftFormat is a modern, full-stack web application designed as a fast, free, AI-powered file converter. The application specializes in converting various file formats including videos, audio, documents, images, and data formats. Built with a serverless-first architecture, it's optimized for deployment on Vercel while maintaining compatibility with Replit development environments.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for lightweight client-side routing
- **Styling**: Tailwind CSS with shadcn/ui component library
- **State Management**: TanStack React Query for server state management
- **Build Tool**: Vite with custom configuration for monorepo structure
- **UI Components**: Modern component library built on Radix UI primitives

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **API Design**: RESTful API with file upload capabilities using Multer
- **File Processing**: Serverless-optimized file conversion workflows
- **Session Management**: In-memory storage with PostgreSQL schema ready for production

### Data Storage Solutions
- **Database**: PostgreSQL with Drizzle ORM
- **Schema Management**: Type-safe database operations with Drizzle
- **File Storage**: Temporary file handling in `/tmp` directory (serverless-compatible)
- **Session Storage**: Configurable storage layer with memory fallback

## Key Components

### File Conversion Engine
- Multi-format support for video, audio, document, and image conversion
- AI-powered enhancement features including noise reduction, OCR, and transcription
- Serverless-optimized processing with external library integration
- Quality settings and compression options

### User Interface Components
- **Header**: Navigation with smooth scrolling between sections
- **Hero Section**: Landing area with key statistics and call-to-action
- **Converter**: Main file upload and conversion interface
- **Features**: Showcase of conversion capabilities
- **About**: Developer information and credentials
- **Donations**: FamPay integration with QR code support
- **Blog/FAQ**: Content sections with SEO optimization

### SEO and Accessibility
- Comprehensive meta tag implementation
- JSON-LD structured data
- Open Graph and Twitter Card support
- ARIA attributes and semantic HTML
- Responsive design with mobile optimization

## Data Flow

1. **File Upload**: Users upload files through the converter interface
2. **Validation**: File types and settings are validated on both client and server
3. **Processing**: Files are processed using appropriate conversion libraries
4. **Storage**: Temporary files are stored in `/tmp` during processing
5. **Download**: Converted files are returned to the user for download
6. **Cleanup**: Temporary files are automatically cleaned up

### Database Schema
- **Users Table**: Basic user management (future feature)
- **Conversions Table**: Tracking conversion history and status
- **Settings Storage**: JSON-based conversion settings storage

## External Dependencies

### Core Libraries
- **@neondatabase/serverless**: PostgreSQL connection for serverless
- **drizzle-orm**: Type-safe ORM with PostgreSQL support
- **multer**: File upload handling
- **express**: Web framework

### UI Libraries
- **@radix-ui**: Accessible component primitives
- **@tanstack/react-query**: Server state management
- **tailwindcss**: Utility-first CSS framework
- **lucide-react**: Icon library

### Development Tools
- **vite**: Build tool and development server
- **typescript**: Type safety
- **drizzle-kit**: Database migrations and management

## Deployment Strategy

### Vercel Deployment
- **Build Process**: Vite builds the frontend, esbuild bundles the server
- **Serverless Functions**: Express server runs as serverless functions
- **Static Assets**: Frontend assets served from CDN
- **Environment Variables**: Database URL and other secrets via Vercel dashboard

### Database Setup
- PostgreSQL database (configured for Neon Database)
- Automatic migrations using Drizzle Kit
- Connection pooling for serverless environments

### File Processing Considerations
- All file operations use `/tmp` directory for serverless compatibility
- Large file processing may require external services or hybrid approaches
- Memory and timeout limits considered for conversion operations

### SEO and Performance
- Static generation for optimal loading
- Image optimization and lazy loading
- Comprehensive meta tags for social sharing
- Sitemap and robots.txt included

## Database Requirements

**NO DATABASE REQUIRED** for production deployment on Vercel. The application is designed as a stateless serverless system:

- **File conversion**: Processed in `/tmp` directory (serverless-compatible)
- **Session management**: In-memory storage (resets per function call)
- **User tracking**: Handled client-side for progress indication

This makes deployment extremely simple - just connect GitHub to Vercel with zero configuration.

## Mobile Optimization & Edge Cases

### Mobile Experience
- Touch-optimized UI with 44px minimum tap targets
- Mobile-responsive drag-and-drop zones
- Progressive enhancement for touch devices
- Optimized progress indicators and error states

### Edge Case Handling
- File size validation (100MB limit with clear error messages)
- File type validation with detailed feedback
- Network timeout handling (5-minute max)
- Corrupt file detection with graceful fallbacks
- Enhanced error messages with retry suggestions

### Testing Coverage
- Mobile touch interaction testing
- Large file upload validation
- Network error simulation
- Timeout and retry flows
- Cross-device compatibility verification

The application is designed to be fully self-contained and production-ready upon deployment, requiring no external setup or database configuration.