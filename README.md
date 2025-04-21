# Personal Website

A modern, responsive personal website built with Next.js, TypeScript, and Tailwind CSS.

## Features

- Responsive design
- Blog functionality
- Skills showcase
- Education and experience sections
- Contact form
- Dark mode support

## Tech Stack

- Next.js 14
- TypeScript
- Tailwind CSS
- Directus CMS
- PostgreSQL
- Docker

## Getting Started

### Prerequisites

- Node.js 18+
- Docker and Docker Compose
- Git

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/website.git
cd website
```

2. Create a `.env` file in the root directory with the following variables:
```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_DIRECTUS_URL=http://localhost:8055
ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin
```

3. Start the development environment:
```bash
docker-compose up -d
```

4. Access the website at http://localhost:3000

## Development

### Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the production application
- `npm run start` - Start the production server
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

### Project Structure

```
.
├── app/                 # Next.js app directory
│   ├── components/      # React components
│   ├── lib/            # Utility functions
│   └── styles/         # Global styles
├── cms/                # Directus CMS configuration
├── public/             # Static assets
└── types/              # TypeScript type definitions
```

## Deployment

The application is configured for Docker deployment. To deploy:

1. Build the Docker images:
```bash
docker-compose build
```

2. Start the services:
```bash
docker-compose up -d
```

The application will be available at the URL specified in your `NEXT_PUBLIC_SITE_URL` environment variable.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
