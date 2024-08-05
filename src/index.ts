// Importa el paquete 'express' para crear y manejar el servidor web
import express from "express";

// Importa la instancia de Sequelize desde el archivo de configuración de la base de datos
import sequelize from "./config/db";

// Importa el enrutador principal de la aplicación desde el archivo de rutas
import router from "./routes/Router";

// Crea una instancia de la aplicación Express
const app = express();

// Middleware para parsear el cuerpo de las solicitudes en formato JSON
app.use(express.json());

// Configura el enrutador principal para manejar las solicitudes en la ruta '/api'
app.use("/api", router);

// Función asíncrona para iniciar el servidor y conectar a la base de datos
const startServer = async () => {
  try {
    // Intenta autenticar la conexión a la base de datos
    await sequelize.authenticate();
    console.log("Database connected!"); // Mensaje de éxito si la conexión es correcta

    // Sincroniza los modelos con la base de datos, creando las tablas si no existen
    await sequelize.sync();
    
    // Inicia el servidor en el puerto 3000 y muestra un mensaje de éxito
    app.listen(3000, () => {
      console.log("Server started on port 3000");
    });
  } catch (error) {
    // Muestra un mensaje de error si no se puede conectar a la base de datos
    console.error("Unable to connect to the database:", error);
  }
};

// Llama a la función para iniciar el servidor
startServer();
