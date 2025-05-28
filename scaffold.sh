#!/usr/bin/env bash
set -e

echo "Scaffolding Mini E-Commerce Store project..."

# Root directories
mkdir -p mini-ecom-store/.github/workflows
mkdir -p mini-ecom-store/backend/src/{models,routes,utils}
mkdir -p mini-ecom-store/frontend/{styles,components,contexts,pages/products,utils}

# Create root-level files
cat << 'EOF' > mini-ecom-store/.gitignore
# Node
node_modules/
.env

# Python (if any)
__pycache__/
*.pyc

# Docker
docker-compose.override.yml

# VSCode
.vscode/
EOF

cat << 'EOF' > mini-ecom-store/docker-compose.yml
version: '3.8'
services:
  db:
    image: mysql:8.0
    environment:
      MYSQL_DATABASE: ecommerce
      MYSQL_USER: user
      MYSQL_PASSWORD: password
      MYSQL_ROOT_PASSWORD: rootpwd
    volumes:
      - db-data:/var/lib/mysql
    ports:
      - "3306:3306"

  backend:
    build: ./backend
    env_file:
      - ./backend/.env
    ports:
      - "8000:8000"
    depends_on:
      - db

  frontend:
    build: ./frontend
    env_file:
      - ./frontend/.env.local
    ports:
      - "3000:3000"
    depends_on:
      - backend

volumes:
  db-data:
EOF

cat << 'EOF' > mini-ecom-store/README.md
# Mini E-Commerce Store

## Local Development
```bash
git clone https://github.com/youruser/mini-ecom-store.git
cd mini-ecom-store
docker-compose up --build
```

Frontend on http://localhost:3000, Backend on http://localhost:8000

## CI/CD
- GitHub Actions runs tests on push/PR (backend & frontend).
- Docker images built & pushed on main, then deployed to AWS ECS.
EOF

# Create empty backend files
touch mini-ecom-store/backend/.env
touch mini-ecom-store/backend/Dockerfile
touch mini-ecom-store/backend/package.json
touch mini-ecom-store/backend/tsconfig.json
touch mini-ecom-store/backend/src/app.ts
touch mini-ecom-store/backend/src/utils/db.ts
for file in User Product CartItem Order; do
  touch mini-ecom-store/backend/src/models/"${file}.ts"
done
for route in auth products cart orders payments; do
  touch mini-ecom-store/backend/src/routes/"${route}.ts"
done

# Create empty frontend files
touch mini-ecom-store/frontend/.env.local
touch mini-ecom-store/frontend/Dockerfile
touch mini-ecom-store/frontend/package.json
touch mini-ecom-store/frontend/tsconfig.json
touch mini-ecom-store/frontend/tailwind.config.js
touch mini-ecom-store/frontend/postcss.config.js
mkdir -p mini-ecom-store/frontend/styles
touch mini-ecom-store/frontend/styles/globals.css
for util in api stripe; do
  touch mini-ecom-store/frontend/utils/"${util}.ts"
done
for ctx in AuthContext CartContext; do
  touch mini-ecom-store/frontend/contexts/"${ctx}.tsx"
done
for comp in Layout ProtectedRoute PaymentForm; do
  touch mini-ecom-store/frontend/components/"${comp}.tsx"
done
for page in _app index login register cart checkout orders; do
  touch mini-ecom-store/frontend/pages/"${page}.tsx"
done
mkdir -p mini-ecom-store/frontend/pages/products
touch mini-ecom-store/frontend/pages/products/[id].tsx

echo "Scaffold complete. Populate each file with the provided codebase content!"
