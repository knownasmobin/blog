# Personal Website with Next.js and Directus CMS

A modern personal website built with Next.js and Directus CMS, featuring a blog system and portfolio management.

## Tech Stack

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS
- **CMS**: Directus
- **Database**: PostgreSQL
- **Containerization**: Docker & Docker Compose

## Prerequisites

- Docker and Docker Compose installed
- Git

## Project Structure

```
.
├── app/                    # Next.js application
├── directus/              # Directus CMS data
│   ├── uploads/           # Media files
│   └── database/          # Database files
├── public/                # Static files
├── .env                   # Environment variables
├── docker-compose.yml     # Docker Compose configuration
└── Dockerfile            # Frontend Docker configuration
```

## Production Deployment

### Initial Setup

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd website
   ```

2. Create necessary directories:
   ```bash
   mkdir -p directus/uploads directus/database
   ```

3. Create and configure environment file:
   ```bash
   cp .env.example .env
   # Edit .env with your production values
   ```

4. Build and start the services:
   ```bash
   docker-compose up -d --build
   ```

5. Access the services:
   - Frontend: http://your-domain:3000
   - Directus Admin: http://your-domain:8055
   - Directus API: http://your-domain:8055

### Environment Variables

Create a `.env` file with the following variables:

```env
# Next.js Frontend
NEXT_PUBLIC_DIRECTUS_URL=http://your-domain:8055
NEXTAUTH_URL=http://your-domain:3000
NEXTAUTH_SECRET=your-secure-secret-key

# Directus
DIRECTUS_URL=http://your-domain:8055
ADMIN_EMAIL=your-admin-email
ADMIN_PASSWORD=your-secure-password
DB_PASSWORD=your-secure-db-password
```

### Directus Setup

1. Access the Directus admin panel
2. Log in with your admin credentials
3. Create necessary collections:
   - blog_posts
   - portfolio_items
   - media

## Production Maintenance

### Backups

1. Database backup:
   ```bash
   docker-compose exec postgres pg_dump -U directus directus > backup_$(date +%Y%m%d).sql
   ```

2. Media files backup:
   ```bash
   tar -czf media_backup_$(date +%Y%m%d).tar.gz directus/uploads/
   ```

### Updates

1. Pull latest changes:
   ```bash
   git pull origin main
   ```

2. Update Docker images:
   ```bash
   docker-compose pull
   docker-compose up -d --build
   ```

### Monitoring

1. Check service status:
   ```bash
   docker-compose ps
   ```

2. View logs:
   ```bash
   docker-compose logs -f [service-name]
   ```

## Security Considerations

1. **Environment Variables**:
   - Use strong, unique passwords
   - Keep secrets secure
   - Never commit .env file

2. **Network Security**:
   - Configure firewall rules
   - Use HTTPS
   - Restrict access to admin interfaces

3. **Regular Updates**:
   - Keep Docker images updated
   - Monitor for security patches
   - Regular backups

## Troubleshooting

### Common Issues

1. **Service Not Starting**:
   ```bash
   docker-compose logs [service-name]
   ```

2. **Database Issues**:
   ```bash
   docker-compose exec postgres psql -U directus
   ```

3. **Directus Issues**:
   ```bash
   docker-compose logs directus
   ```

### Recovery

1. **Database Recovery**:
   ```bash
   docker-compose exec -T postgres psql -U directus directus < backup.sql
   ```

2. **Media Recovery**:
   ```bash
   tar -xzf media_backup.tar.gz -C directus/uploads/
   ```

## License

This project is licensed under the MIT License - see the LICENSE file for details.
