# POS NestJS - Point of Sale System

A full-stack Point of Sale (POS) application built with modern technologies.

## 🏗️ Tech Stack

- **Backend:** NestJS, TypeScript, PostgreSQL, TypeORM
- **Frontend:** React with Next.js
- **Database:** PostgreSQL with TypeORM
- **File Handling:** Cloudinary integration
- **Additional:** Multer for file uploads, Date utilities with date-fns

## 📋 Features

- Point of sale operations
- Product management
- Sales tracking
- User authentication
- File uploads with Cloudinary

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- PostgreSQL
- npm or yarn

### Installation

```bash
$ npm install
```

### Environment Variables
Create a `.env` file with your configuration:
```
DATABASE_URL=postgresql://user:password@localhost:5432/posnest
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### Running the Application

```bash
# Development mode
$ npm run start:dev

# Production mode
$ npm run start:prod
```

## 🧪 Testing

```bash
# Unit tests
$ npm run test

# E2E tests
$ npm run test:e2e

# Test coverage
$ npm run test:cov
```

## 📚 Project Structure

- `/src` - NestJS backend source code
- Frontend code - [Specify location of React/Next.js frontend]

## 📄 License

MIT
