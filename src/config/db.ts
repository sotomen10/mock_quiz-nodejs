// Importa la clase Sequelize del paquete sequelize-typescript
import { Sequelize } from 'sequelize-typescript';

// Importa los modelos User y Product desde la carpeta models
import { User, Product } from '../models';

// Crea una nueva instancia de Sequelize, configurando la conexión a la base de datos
const sequelize: Sequelize = new Sequelize({
    // Define el dialecto de la base de datos, en este caso MySQL
    dialect: 'mysql',
    
    // Especifica el host donde se encuentra la base de datos
    host: 'localhost',
    
    // Proporciona el nombre de usuario para la conexión a la base de datos
    username: 'root',
    
    // Proporciona la contraseña para la conexión a la base de datos (vacío aquí)
    password: 'Juliana2610*',
    
    // Define el nombre de la base de datos a la que se conectará
    database: 'simulacro_nodeJS',
    
    // Enumera los modelos que se deben utilizar en esta instancia de Sequelize
    // Aquí se añaden los modelos User y Product que se importaron anteriormente
    models: [User, Product], // Añade todos tus modelos aquí
});

// Exporta la instancia de Sequelize para que pueda ser utilizada en otras partes de la aplicación
export default sequelize;
