# Dearborn Heights Auto Clinic

## Overview

This is a full-stack web application for Dearborn Heights Auto Clinic, an automotive service business operating since 1986. The application provides an online booking system for customers to schedule automotive services, with support for both in-shop and mobile repair services. The system manages customers, vehicles, services, and appointments with a modern React frontend and Express.js backend.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript, built using Vite
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query (React Query) for server state management
- **UI Components**: Radix UI primitives with shadcn/ui component library
- **Styling**: Tailwind CSS with custom design system variables
- **Form Handling**: React Hook Form with Zod validation

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **API Design**: RESTful API structure with centralized route registration
- **Error Handling**: Global error middleware with structured error responses
- **Development**: Hot reload with Vite middleware integration

### Database & ORM
- **Database**: PostgreSQL (configured for Neon serverless)
- **ORM**: Drizzle ORM with connection pooling
- **Schema Management**: Centralized schema definitions with TypeScript types
- **Migrations**: Drizzle Kit for schema migrations and database management

### Data Models
- **Users**: Authentication and user management
- **Customers**: Customer information and contact details
- **Vehicles**: Vehicle information linked to customers
- **Services**: Service catalog with pricing and availability
- **Appointments**: Booking system with status tracking and service associations

### Authentication & Security
- Session-based authentication (prepared for but not fully implemented)
- Input validation using Zod schemas
- Type-safe API contracts between frontend and backend

### Project Structure
- **Monorepo**: Single repository with client, server, and shared code
- **Shared Types**: Common TypeScript definitions and schemas
- **Client**: React application in `/client` directory
- **Server**: Express API in `/server` directory
- **Shared**: Common code and schemas in `/shared` directory

## External Dependencies

### Core Framework Dependencies
- **React Ecosystem**: React 18, React DOM, React Hook Form
- **Backend Framework**: Express.js with TypeScript support
- **Build Tools**: Vite for frontend bundling, esbuild for backend compilation

### Database & ORM
- **Database**: Neon PostgreSQL serverless database
- **ORM**: Drizzle ORM with PostgreSQL adapter
- **Connection**: Connection pooling via @neondatabase/serverless

### UI Framework
- **Component Library**: Radix UI primitives (accordion, dialog, dropdown, etc.)
- **Styling**: Tailwind CSS with PostCSS
- **Icons**: Lucide React icon library
- **Utility Libraries**: clsx, tailwind-merge for conditional styling

### State Management & API
- **Server State**: TanStack React Query for API state management
- **Validation**: Zod for runtime type validation and schema generation
- **HTTP Client**: Native fetch API with custom wrapper functions

### Development Tools
- **Type Checking**: TypeScript compiler with strict mode
- **Code Quality**: ESLint configuration (implied by package structure)
- **Development Server**: Vite dev server with HMR
- **Database Tools**: Drizzle Kit for migrations and schema management

### Potential Integrations
- **Email Service**: SendGrid integration (configured but not implemented)
- **Session Storage**: PostgreSQL session store via connect-pg-simple
- **Development**: Replit-specific plugins for development environment