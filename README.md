# RoadGuardian

RoadGuardian is a full-stack motorcycle safety and management web application developed as a year-long university project.

The platform combines emergency response functionality, real-time communication, live location sharing, motorcycle management, maintenance tracking, AI assistance and user communication into a single web application.

## Features

### Emergency Response

- Create and manage emergency incidents
- Share live rider locations
- Display riders and incidents on an interactive map
- Real-time emergency communication
- Emergency incident status tracking
- Route and location information
- Real-time updates using Ably

### Motorcycle Management

- Add and manage motorcycles
- Store motorcycle information
- Associate motorcycles with users
- Access motorcycle information throughout the application

### Maintenance Tracking

- Record motorcycle maintenance
- Track maintenance history
- View maintenance timelines
- Monitor maintenance status
- Manage maintenance records for individual motorcycles

### AI Assistance

- Integrated AI chat functionality
- API-based AI interaction
- AI assistance available within the application

### User Accounts

- User registration
- User login and authentication
- User profiles
- Profile management
- Account settings
- User preferences

### Communication

- Conversations and messaging
- Notifications
- Emergency chat functionality
- Support functionality

### Documents

- User document management
- Document access through the application

## Technologies

- Next.js
- React
- JavaScript
- MongoDB
- NextAuth
- Ably
- Mapbox
- Bootstrap
- React Bootstrap
- Bootstrap Icons
- Node.js

## Architecture

RoadGuardian is built using Next.js and follows a component-based web application architecture.

The application uses Next.js App Router pages and server-side API routes to separate frontend functionality from backend operations.

```text
User Interface
      │
      ▼
Next.js / React
      │
      ├── Authentication
      ├── Emergency Response
      ├── Live Location
      ├── Motorcycle Management
      ├── Maintenance
      ├── Messaging
      ├── Notifications
      └── AI Assistance
      │
      ▼
Next.js API Routes
      │
      ├── MongoDB
      ├── Ably
      ├── Mapbox
      └── AI Services
```

## Real-Time Functionality

Real-time functionality is implemented using Ably.

Ably is used to support features such as:

- Emergency incident updates
- Live location updates
- Emergency communication
- Real-time rider information

The application contains dedicated client and server Ably integrations as well as an authentication endpoint for Ably connections.

## Mapping and Location

Mapbox is used to provide interactive mapping functionality.

The emergency system includes functionality for:

- Displaying rider locations
- Displaying incident markers
- Tracking live locations
- Calculating and displaying routes
- Using browser geolocation

The emergency section contains dedicated hooks and utilities for handling map and location functionality.

## Authentication

Authentication is implemented using NextAuth.

The application provides:

- User registration
- Login
- Session management
- Protected application functionality
- User profile management

Password handling also uses `bcryptjs` for password hashing.

## Database

MongoDB is used for persistent application data.

The application contains a dedicated MongoDB integration and API routes for managing areas such as:

- Users
- Motorcycles
- Maintenance records
- Emergency incidents
- Conversations
- Messages
- Notifications
- Documents
- Profiles
- Settings

## API

The application uses Next.js API routes for backend functionality.

Major API areas include:

- Authentication
- Registration
- AI chat
- Ably authentication
- Conversations
- Documents
- Emergency incidents
- Live location
- Maintenance
- Messages
- Motorcycles
- Notifications
- Profiles
- Settings
- Support

## Project Structure

The main project structure is organised around the Next.js App Router.

```text
RoadGuardian/
├── .github/
│   └── workflows/
│       └── codeql.yml
├── public/
│   ├── ai.png
│   ├── community.png
│   ├── document.png
│   ├── emergency.png
│   ├── maintenance.png
│   └── profile.png
├── src/
│   ├── app/
│   │   ├── api/
│   │   ├── components/
│   │   ├── documents/
│   │   ├── emergency/
│   │   ├── home/
│   │   ├── login/
│   │   ├── maintenance/
│   │   ├── profile/
│   │   ├── register/
│   │   ├── settings/
│   │   └── support/
│   └── lib/
│       ├── ablyClient.js
│       ├── ablyServer.js
│       ├── auth.js
│       ├── maintenance.js
│       ├── mongodb.js
│       └── utils.js
├── .gitignore
├── next.config.mjs
├── package.json
└── package-lock.json
```

## Security

The project uses several security-related technologies and practices, including:

- NextAuth authentication
- Password hashing with bcryptjs
- Protected API functionality
- Environment variables for sensitive configuration
- GitHub CodeQL analysis

Sensitive configuration values are stored using environment variables and should not be committed to the repository.

## CodeQL

GitHub CodeQL is configured for automated security analysis.

The workflow runs against the JavaScript/TypeScript codebase when changes are pushed to the main branch or submitted through pull requests.

## Running the Project

### Requirements

- Node.js
- npm
- MongoDB
- Required third-party service accounts and API keys

### Installation

Clone the repository:

    git clone https://github.com/your-username/roadguardian.git

Navigate into the project:

    cd roadguardian

Install the dependencies:

    npm install

Create a local environment file:

    .env.local

Configure the required environment variables for:

- MongoDB
- NextAuth
- Ably
- Mapbox
- AI services

Start the development server:

    npm run dev

The application will then be available through the local Next.js development server.

## Environment Variables

The application requires environment variables for external services and authentication.

Example configuration:

    MONGODB_URI=
    NEXTAUTH_SECRET=
    NEXTAUTH_URL=
    ABLY_API_KEY=
    NEXT_PUBLIC_MAPBOX_TOKEN=
    AI_API_KEY=

Actual credentials should never be committed to the repository.

## Project Background

RoadGuardian was developed as a year-long university project.

The project involved the design and development of a full-stack web application combining multiple technical areas, including:

- Full-stack web development
- Database integration
- Authentication
- Real-time communication
- Geolocation
- Interactive mapping
- API development
- AI integration
- User management
- Security
- Cloud-based services

The project was developed collaboratively as part of the university curriculum.

## Screenshots

Screenshots of the application can be added here to demonstrate key areas of the system, including:

- Home dashboard
- Emergency response interface
- Live map
- Motorcycle management
- Maintenance tracking
- AI assistant
- User profile
- Messaging

## Future Improvements

Potential future improvements include:

- Further emergency response functionality
- Expanded motorcycle management
- Additional maintenance analytics
- More advanced AI assistance
- Additional real-time communication features
- Improved notification functionality
- Expanded automated testing
- Further security improvements

---

*Year-long university project developed collaboratively as part of a Level 8 Computer Science programme.*
