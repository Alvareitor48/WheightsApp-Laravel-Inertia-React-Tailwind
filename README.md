# 🏋️ Weights Technology - Gym Tracker

### Weights Technology es una aplicación web desarrollada con Laravel, Inertia.js, React y Tailwind que permite gestionar rutinas de entrenamiento, registrar ejercicios y visualizar el progreso del usuario mediante gráficos interactivos.

## 📸 Capturas de Pantalla

![Dashboard](https://github.com/user-attachments/assets/62ff273e-bd44-4e4a-8d3e-42d823208a0e)

![Routine](https://github.com/user-attachments/assets/dd90b145-6a4d-45ed-85c3-e91429d200ef)

![Exercises](https://github.com/user-attachments/assets/ae16b8b4-692c-48fc-bd66-2dd82666181a)

## ✅ Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:
- **PHP 8.1+**
- **Composer**
- **Node.js 16+ y npm**
- **MySQL**

## 📥 Instalación

Sigue estos pasos para configurar el proyecto en tu máquina local:

```sh
# 1️⃣ Clonar el repositorio
git clone https://github.com/Alvareitor48/WheightsApp-Laravel-Inertia-React-Tailwind.git
cd mi-proyecto

# 2️⃣ Instalar dependencias
composer install

# 3️⃣ Copiar archivo de configuración
cp .env.example .env

# 4️⃣ Configurar esto en el .env

APP_NAME="Weights Technology"
APP_ENV=local
APP_DEBUG=true
APP_URL="http://localhost"

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=mi_base_de_datos
DB_USERNAME=mi_usuario
DB_PASSWORD=mi_contraseña

# 5️⃣ Ejecutar:

php artisan project:setup

# 6️⃣ Ejecutar para ver que todo funciona

php artisan test

# 7️⃣ Volver a cambiar estos 2 parametros de .env

APP_ENV=production
APP_DEBUG=false
```

## API Endpoints

Esta API proporciona funcionalidades para gestionar ejercicios, rutinas y autenticación de usuarios.

### Autenticación

#### Registro de Usuario
**Endpoint:** `POST /register`
**Descripción:** Registra un nuevo usuario.
**Parámetros:**
- `name`: Nombre del usuario (string, requerido).
- `email`: Correo electrónico (string, requerido, único).
- `password`: Contraseña (string, requerido).
- `password_confirmation`: Confirmación de la contraseña (string, requerido).

**Respuesta:** JSON con los datos del usuario registrado y token de autenticación.

---

#### Inicio de Sesión
**Endpoint:** `POST /login`
**Descripción:** Autentica a un usuario y devuelve un token.
**Parámetros:**
- `email`: Correo electrónico (string, requerido).
- `password`: Contraseña (string, requerido).

**Respuesta:** JSON con el token de acceso.

---

#### Cerrar Sesión
**Endpoint:** `POST /logout`
**Descripción:** Invalida el token de autenticación del usuario actual.
**Requiere Autenticación:** Sí
**Respuesta:** JSON con mensaje de confirmación.

---

### Ejercicios

#### Listar Ejercicios
**Endpoint:** `GET /exercises`
**Descripción:** Obtiene una lista de ejercicios disponibles.
**Parámetros Opcionales:**
- `muscles`: Filtrar por grupo muscular, separados por comas (string, opcional).
- `equipment`: Filtrar por tipo de equipamiento (string, opcional).
- `created_by_me`: Filtrar solo ejercicios creados por el usuario autenticado (boolean, opcional, `true` o `false`).

**Respuesta:** JSON con la lista de ejercicios filtrados según los parámetros proporcionados.

---

#### Ver un Ejercicio
**Endpoint:** `GET /exercises/{id}`
**Descripción:** Obtiene los detalles de un ejercicio específico.
**Requiere Autenticación:** Sí (roles: `user`, `admin`, `premium`)
**Parámetros:**
- `{id}`: ID del ejercicio (integer, requerido).

**Respuesta:** JSON con la información del ejercicio.

---

#### Crear un Ejercicio
**Endpoint:** `POST /exercises`
**Descripción:** Crea un nuevo ejercicio.
**Requiere Autenticación:** Sí (roles: `admin`, `premium`)
**Parámetros:**
- `name`: Nombre del ejercicio (string, requerido).
- `description`: Descripción del ejercicio (string, requerido).
- `equipment`: Equipamiento (string, opcional).
- `muscles`: Musculos trabajados, separados por comas (string, requerido).
- `media`: Video o imagen del ejercicio (file, mimes:webp,mp4, requerido).

**Respuesta:** JSON con los detalles del ejercicio creado.

---

### Rutinas

#### Ver una Rutina
**Endpoint:** `GET /routines/{id}`
**Descripción:** Obtiene los detalles de una rutina específica.
**Requiere Autenticación:** Sí (roles: `user`, `admin`, `premium`)
**Parámetros:**
- `{id}`: ID de la rutina (integer, requerido).

**Respuesta:** JSON con los detalles de la rutina.

---

#### Datos de Gráfica de una Rutina
**Endpoint:** `GET /routines/{id}/chart-data`
**Descripción:** Obtiene datos estadísticos de una rutina para visualización en gráficos.
**Requiere Autenticación:** Sí (roles: `user`, `admin`, `premium`)
**Parámetros:**
- `{id}`: ID de la rutina (integer, requerido).
- `{period}`: Periodo de consulta(month, 3months, year) (opcional)

**Respuesta:** JSON con los datos para gráficos.

---

### Notas
- Todos los endpoints que requieren autenticación utilizan `auth:sanctum`.
- Los roles `admin` y `premium` tienen permisos adicionales para crear ejercicios.
- Los roles `admin` y `premium` pueden listar sus ejercicios, los usuarios normales no
- Los roles `admin` y `premium` pueden filtrar la grafica por 3 meses y año, los usuarios normales solo por mes
- El sistema utiliza tokens de acceso para la autenticación.
