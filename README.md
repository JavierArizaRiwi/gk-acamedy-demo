# GK Academy Platform

MVP full stack para una academia de arqueros: landing responsive, planes, registro/login, suscripciones, checkout preparado para Wompi, solicitud de arquero por partido y dashboard administrativo.

## Stack
- Next.js + TypeScript
- NestJS + TypeScript
- MongoDB + Mongoose
- JWT
- Wompi Checkout/Webhook (modo real) + modo mock para demos
- Docker Compose

## Ejecución local con Docker
1. Copia `.env.example` a `.env` y cambia `JWT_SECRET`.
2. Ejecuta `docker compose up -d --build`.
3. Ejecuta el seed una vez dentro del API: `docker compose exec api node dist/seed.js` (si el seed no fue compilado, usa la alternativa de desarrollo indicada abajo).
4. Abre http://localhost:3000

> Para desarrollo sin Docker, instala dependencias en la raíz con `npm install`, levanta MongoDB, ejecuta `npm run dev -w apps/api` y `npm run dev -w apps/web`, y luego `npm run seed -w apps/api`.

### Usuario administrador demo
- Email: `admin@gkacademy.com`
- Password: `Admin123*`

Cámbialo antes de producción.

## Pagos
Por defecto `PAYMENTS_MODE=mock`, por lo que el botón de pago aprueba una transacción de demostración sin dinero real.

Para producción:
- `PAYMENTS_MODE=wompi`
- `WOMPI_PUBLIC_KEY`
- `WOMPI_PRIVATE_KEY`
- `WOMPI_INTEGRITY_SECRET`
- `WOMPI_REDIRECT_URL=https://tu-dominio.com/dashboard`

Configura en Wompi el webhook:
`POST https://TU-API/api/payments/wompi/webhook`

La API valida el checksum SHA-256 del webhook cuando configuras `WOMPI_EVENTS_SECRET`. Prueba primero el flujo completo en Sandbox.

## Deploy recomendado de bajo costo
### MongoDB Atlas
Crea un cluster, usuario y Network Access. Copia el connection string en `MONGODB_URI`.

### Backend en Railway
- Nuevo proyecto desde GitHub.
- Root directory: `apps/api`.
- Variables: `MONGODB_URI`, `JWT_SECRET`, `FRONTEND_URL`, variables de Wompi.
- Railway detecta el Dockerfile.
- Copia el dominio HTTPS generado.

### Frontend en Vercel
- Importa el mismo repositorio.
- Root directory: `apps/web`.
- Variable: `NEXT_PUBLIC_API_URL=https://TU-API-RAILWAY/api`.
- Deploy.
- Regresa a Railway y configura `FRONTEND_URL=https://TU-FRONTEND.vercel.app`.

## Funcionalidades incluidas
- Landing responsive.
- Planes configurables desde API.
- Registro/Login JWT.
- Dashboard alumno.
- Creación de suscripción.
- Modo pago mock y preparación Wompi.
- Solicitud pública de alquiler de arquero.
- Dashboard admin con indicadores.
- Listado administrativo de solicitudes.
- Docker para frontend, backend y MongoDB local.

## Pendientes recomendados antes de producción comercial
- Recuperación de contraseña y verificación de correo.
- CRUD visual de planes/usuarios/solicitudes en admin.
- Notificaciones WhatsApp/email.
- Rate limiting y auditoría.
- Política de privacidad, términos y tratamiento de datos.
- Pruebas automatizadas y CI/CD.
- Backups y alertas de MongoDB Atlas.
