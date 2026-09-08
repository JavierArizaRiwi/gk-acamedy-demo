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
- Catálogo de servicios con alta y activación/desactivación para administradores.
- Registro/Login JWT.
- Dashboard alumno.
- Creación de suscripción.
- Modo pago mock y preparación Wompi.
- Solicitud pública de alquiler de arquero.
- Dashboard admin con indicadores.
- Listado administrativo de solicitudes.
- Docker para frontend, backend y MongoDB local.

## Almacenamiento de la aplicación
La API guarda la información en MongoDB mediante Mongoose. En Docker Compose, MongoDB usa el volumen persistente `mongo_data`, por lo que los datos sobreviven a un reinicio de contenedores, pero ese volumen no reemplaza un backup. Las colecciones principales son `users`, `plans`, `services`, `subscriptions`, `payments` y `rentals`.

Para producción se recomienda MongoDB Atlas con usuario de base de datos independiente, acceso de red restringido a la API, cifrado en tránsito y backups automáticos. La aplicación no debe guardar contraseñas: solo almacena hashes bcrypt. Los archivos o imágenes futuros deben ir a almacenamiento de objetos privado, como Azure Blob Storage o S3, usando URLs temporales; no deben guardarse dentro del contenedor ni en MongoDB.

## Seguridad antes de producción
- Cambia el usuario administrador de seed y elimina las credenciales demo.
- Define un `JWT_SECRET` largo, aleatorio y exclusivo en el gestor de secretos del proveedor. Nunca uses el valor por defecto.
- Usa HTTPS en frontend, API y conexión a MongoDB; configura `FRONTEND_URL` con el dominio exacto, no con `*`.
- No publiques el puerto de MongoDB en Internet. En producción solo debe ser accesible desde la API y desde una red administrativa controlada.
- Añade rate limiting para login, registro, checkout y webhooks, además de bloqueo progresivo ante intentos repetidos.
- Mantén Helmet, validación estricta y roles activos; valida también tamaños y tipos de archivos cuando se agreguen cargas.
- Usa secretos de Wompi únicamente en el backend y valida siempre la firma del webhook. El modo `mock` es solo para desarrollo.
- Configura backups probados, retención, alertas de disponibilidad y logs sin contraseñas, tokens ni datos sensibles.
- Completa recuperación/verificación de correo, política de privacidad, consentimiento de datos, auditoría y pruebas automatizadas antes de vender el servicio.

## Pendientes recomendados antes de producción comercial
- Recuperación de contraseña y verificación de correo.
- CRUD visual de planes/usuarios/solicitudes en admin.
- Notificaciones WhatsApp/email.
- Rate limiting y auditoría.
- Política de privacidad, términos y tratamiento de datos.
- Pruebas automatizadas y CI/CD.
- Backups y alertas de MongoDB Atlas.
