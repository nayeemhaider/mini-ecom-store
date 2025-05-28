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
