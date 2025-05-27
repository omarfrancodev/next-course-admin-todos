# Development
Pasos para levantar la app en desarrollo

1. Levantar la base de datos
```
docker compose up -d
```

2. Renombra el `.env.example` a `.env`
3. Reemplezar las varaibles de entorno
4. Ejecutar el SEED para [llenar la base de datos](localhost:3000/api/seed)

# Prisma commands
```
npx prisma init
npx prisma migrate dev
npx prisma generate
```

# Prod

# Stage