```markdown
# Guía Completa para Configurar un Proyecto Node.js con TypeScript y MySQL

## Creación de la Estructura de Directorios y Archivos desde la Consola

```bash
# Crear directorio del proyecto
mkdir project-name
cd project-name

# Crear estructura de directorios
mkdir -p src/{config,controllers,models,repositories,routes,services}

# Crear archivos dentro de los directorios necesarios
touch src/config/{db.ts,container.ts}
touch src/controllers/{userController.ts,productController.ts}
touch src/models/{User.ts,Product.ts}
touch src/repositories/{UserRepository.ts,ProductRepository.ts}
touch src/routes/{Router.ts,UserRoutes.ts,ProductRoutes.ts}
touch src/services/{UserService.ts,ProductService.ts}
touch src/index.ts

# Crear archivo nodemon.json
touch nodemon.json

# Crear archivo tsconfig.json
touch tsconfig.json

# Crear archivo package.json (si no existe)
npm init -y
```

## Instalación de las Bibliotecas Utilizadas

### Instalación de Dependencias

```bash
# Dependencias de producción
npm install @types/express express sequelize sequelize-typescript mysql2 tsyringe --save

# Dependencias de desarrollo
npm install @types/node @types/sequelize nodemon ts-node typescript --save-dev
```

## Explicación de las Bibliotecas Utilizadas

- **express**: Framework web para Node.js que facilita la creación de aplicaciones y APIs.
- **sequelize**: ORM para Node.js que permite interactuar con bases de datos relacionales como MySQL de manera sencilla y eficiente.
- **sequelize-typescript**: Extensión de Sequelize que permite definir modelos utilizando clases de TypeScript, facilitando la integración de Sequelize con TypeScript.
- **mysql2**: Driver para MySQL en Node.js, necesario para conectar y comunicarse con una base de datos MySQL.
- **nodemon**: Herramienta que reinicia automáticamente la aplicación Node.js cuando se detectan cambios en el código fuente, útil durante el desarrollo.
- **ts-node**: Permite ejecutar archivos TypeScript directamente en Node.js sin necesidad de compilarlos previamente a JavaScript.
- **typescript**: Lenguaje de programación que añade tipado estático a JavaScript, utilizado para escribir aplicaciones más robustas y escalables.
- **tsyringe**: Contenedor de inyección de dependencias para TypeScript, que facilita la organización y mantenimiento de dependencias en aplicaciones TypeScript.
- **@types/express**: Definiciones de tipos TypeScript para Express, que proporcionan soporte para el autocompletado y validaciones de tipos en código TypeScript.
- **@types/sequelize**: Definiciones de tipos TypeScript para Sequelize, que proporcionan soporte para el autocompletado y validaciones de tipos en código TypeScript.
- **@types/node**: Definiciones de tipos TypeScript para Node.js, que proporcionan soporte para el autocompletado y validaciones de tipos en código TypeScript.

## Inicializar el Archivo de TypeScript

```bash
npx tsc --init
```

## Editar el Archivo `tsconfig.json` para Configurar TypeScript

```json
{
  "compilerOptions": {
    "target": "ES6",
    "module": "commonjs",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules"]
}
```

## Configurar Nodemon para Desarrollar

Crea un archivo `nodemon.json` en la raíz del proyecto con el siguiente contenido:

```bash
touch nodemon.json
```

```json
{
  "watch": ["src"],
  "ext": "ts",
  "exec": "ts-node src/index.ts"
}
```

## Agregar un Script en el `package.json` para Iniciar el Servidor con Nodemon

```json
"scripts": {
  "start": "nodemon"
}
```

## Crear el Archivo para Configurar las Variables de Entorno `.env`

```dotenv
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=password
DB_NAME=mydatabase
PORT=3000
```

## Crear la Conexión con la Base de Datos

Crea una carpeta `config` en `src` y añade un archivo `db.ts`:

```typescript
import { Sequelize } from 'sequelize-typescript';
import env from 'dotenv';

env.config();

const sequelize: Sequelize = new Sequelize({
  dialect: 'mysql',
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  // models: [User, Product], // Añade todos tus modelos aquí
});

export default sequelize;
```

## Iniciar el Servidor a Través de `index.ts`

Después de crear la conexión a la base de datos, prueba si realmente está conectada con un `try-catch`:

```typescript
import express from 'express';
import env from 'dotenv';
import sequelize from "./config/db";

const server = express();
// server.use(express.json()) // Descomentar cuando empieces a usar req
env.config();

const PORT = process.env.PORT || 3001;

const startServer = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    console.log("¡Base de datos conectada!");
    server.listen(PORT, () => {
      console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
    });
  } catch (error: any) {
    console.log(`Algo salió mal desde index.ts`, error);
  }
};

startServer();
```

# Archivo `package.json` Ideal para el Proyecto

Este es el archivo `package.json` ideal para un proyecto de Node.js con TypeScript que se conecta a una base de datos MySQL. Este archivo incluye tanto las dependencias de producción como las de desarrollo, así como la configuración básica del proyecto.

```json
{
  "name": "taller-de-typescript-en-la-industria-farmac-utica",
  "version": "1.0.0",
  "description": "Creamos una API RESTful que permite conectarse con una base de datos relacional MySQL y gestionar toda la información.",
  "main": "index.js",
  "scripts": {
    "start": "nodemon"
  },
  "repository": {
    "type": "git",
  
  },
  "keywords": [
    "restfull",
    "nodejs",
    "typescript",
    "javascript",
    "decorators",
    "sequelize"
  ],
  "author": "Juan Felipe Pulgarín Hernández (pulgarino222)",
  "license": "ISC",
  "bugs": {
    
  },
  "devDependencies": {
    "@types/cors": "^2.8.17",
    "@types/jsonwebtoken": "^9.0.6",
    "@types/node": "^22.1.0",
    "@types/sequelize": "^4.28.20",
    "nodemon": "^3.1.4",
    "ts-node": "^10.9.2",
    "typescript": "^5.5.4"
  },
  "dependencies": {
    "@types/bcryptjs": "^2.4.6",
    "@types/express": "^4.17.21",
    "bcryptjs": "^2.4.3",
    "cors": "^2.8.5",
    "dotenv": "^16.4.5",
    "express": "^4.19.2",
    "jsonwebtoken": "^9.0.2",
    "mysql2": "^3.11.0",
    "sequelize": "^6.37.3",
    "sequelize-typescript": "^2.1.6",
    "trying": "^1.0.0",
    "tsyringe": "^4.8.0"
  }
}
