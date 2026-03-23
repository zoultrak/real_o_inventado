# ¿Real o Inventado?

Juego de trivia donde debes adivinar si una afirmación es **real** o **inventada**.

## Tecnologías

- **Next.js 16** (App Router, Server Actions)
- **NextAuth v5** (autenticación con JWT)
- **Prisma ORM** con proveedor MySQL
- **Tailwind CSS v4**
- **MySQL** (local)

## Requisitos previos

- Node.js 20 o superior
- MySQL instalado y corriendo en tu sistema

---

## Instalación paso a paso

### 1. Descomprime el proyecto y entra a la carpeta

```bash
cd Real-o-Inventado
```

### 2. Instala las dependencias

```bash
npm install
```

### 3. Crea el archivo de variables de entorno

Crea un archivo llamado `.env` en la raíz del proyecto con este contenido:

```env
DATABASE_URL="mysql://root:TU_PASSWORD@localhost:3306/realInventado_db"
NEXTAUTH_SECRET=TU_CLAVE_SECRETA
```

Reemplaza `TU_PASSWORD` con la contraseña de tu MySQL.

Para generar una clave secreta segura corre esto en la terminal:

```bash
openssl rand -base64 32
```

Copia el resultado y pégalo como valor de `NEXTAUTH_SECRET`.

### 4. Crea la base de datos

```bash
mysql -u root -pTU_PASSWORD -e "CREATE DATABASE IF NOT EXISTS realInventado_db;"
```

### 5. Crea las tablas

```bash
npx prisma db push
```

### 6. Carga las categorías y preguntas de prueba

```bash
npm run seed
```

### 7. Inicia el servidor

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

---

## Uso de la app

### Registro e inicio de sesión

1. Entra a `http://localhost:3000`
2. Haz clic en **"Registrate ahora"**
3. Crea tu cuenta con usuario, correo y contraseña
4. Inicia sesión con tus credenciales

### Jugar

1. Elige una categoría en la pantalla de **Temas**
2. Responde si cada afirmación es **Real** o **Inventada**
3. Ve tu resultado al terminar la partida

### Panel de administración

Para acceder al panel de gestión de preguntas necesitas rol de admin. Ejecuta esto en tu terminal reemplazando `TU_USUARIO` con el username que registraste:

```bash
mysql -u root -pTU_PASSWORD realInventado_db -e "UPDATE user SET role='admin' WHERE username='TU_USUARIO';"
```

Cierra sesión y vuelve a entrar. Verás la opción **Gestión** en el menú de usuario.

Desde `/gestion` puedes:

- Ver todas las preguntas
- Crear nuevas preguntas
- Editar preguntas existentes
- Eliminar preguntas

---

## Estructura del proyecto

```
src/
├── app/
│   ├── actions/          # Server Actions (lógica de DB)
│   │   ├── categories.ts
│   │   ├── questions.ts
│   │   └── questions-admin.ts
│   ├── api/
│   │   ├── auth/         # NextAuth
│   │   └── registro/     # API de registro
│   ├── components/
│   │   ├── AppHeader.tsx
│   │   └── BottomNav.tsx
│   ├── gestion/          # CRUD de preguntas (solo admin)
│   ├── jugar/            # Pantalla de juego
│   ├── perfil/           # Perfil de usuario
│   ├── records/          # Tabla de récords
│   ├── registro/         # Página de registro
│   ├── resultado/        # Pantallas de acierto y fallo
│   └── temas/            # Selección de categoría
├── lib/
│   └── auth.ts           # Configuración de NextAuth
prisma/
├── schema.prisma         # Modelos de la base de datos
└── seed.ts               # Datos de prueba
```

---

## Comandos útiles

| Comando              | Descripción                            |
| -------------------- | -------------------------------------- |
| `npm run dev`        | Inicia el servidor de desarrollo       |
| `npm run build`      | Compila para producción                |
| `npm run seed`       | Carga categorías y preguntas de prueba |
| `npx prisma db push` | Sincroniza el schema con la DB         |
| `npx prisma studio`  | Abre el explorador visual de la DB     |
