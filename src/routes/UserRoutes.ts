// Importa el enrutador 'Router' desde el paquete 'express'
import { Router } from 'express';

// Importa el controlador 'UserController' desde la carpeta 'controllers'
import UserController from '../controllers/userController';

// Crea una instancia del enrutador de Express
export const userRouter = Router();

// Define la ruta para obtener todos los usuarios
// Asocia la ruta GET '/' al método estático 'getAllUsers' del controlador 'UserController'
userRouter.get('/', UserController.getAllUsers);

// Define la ruta para obtener un usuario específico por su ID
// Asocia la ruta GET '/:id' al método estático 'getUserById' del controlador 'UserController'
userRouter.get('/:id', UserController.getUserById);

// Define la ruta para crear un nuevo usuario
// Asocia la ruta POST '/' al método estático 'createUser' del controlador 'UserController'
userRouter.post('/', UserController.createUser);
