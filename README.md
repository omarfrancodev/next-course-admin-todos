# Development
Pasos para levantar la app en desarrollo

1. Levantar la base de datos
```
docker compose up -d
```

2. Renombra el `.env.example` a `.env`
3. Reemplezar las varaibles de entorno
4. Ejecutar el comando ```npm install```
5. Ejecutar el comando ```npm run dev```
6. Ejecutar los comandos de prisma
```
npx prisma migrate dev
npx prisma generate
```
7. Ejecutar el SEED para [llenar la base de datos](localhost:3000/api/seed)

## Nota: Usuario por defecto
__User__: test1@gmail.com
__Password__: 123456

# Prisma commands
```
npx prisma init
npx prisma migrate dev
npx prisma generate
```

# Prod

# Stage