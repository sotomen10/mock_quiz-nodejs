// Importa el enrutador 'Router' desde el paquete 'express'
import { Router } from 'express';

// Importa el controlador 'ProductController' desde la carpeta 'controllers'
import ProductController from '../controllers/productController';

// Crea una instancia del enrutador de Express
export const productRouter = Router();

// Define la ruta para obtener todos los productos
// Asocia la ruta GET '/' al método estático 'getAllProducts' del controlador 'ProductController'
productRouter.get('/', ProductController.getAllProducts);

// Define la ruta para obtener un producto específico por su ID
// Asocia la ruta GET '/:id' al método estático 'getProductById' del controlador 'ProductController'
productRouter.get('/:id', ProductController.getProductById);

// Define la ruta para obtener todos los productos asociados a un usuario específico por el ID del usuario
// Asocia la ruta GET '/user/:userId' al método estático 'getProductsByUserId' del controlador 'ProductController'
productRouter.get('/user/:userId', ProductController.getProductsByUserId);

// Define la ruta para crear un nuevo producto
// Asocia la ruta POST '/' al método estático 'createProduct' del controlador 'ProductController'
productRouter.post('/', ProductController.createProduct);

productRouter.put('/:id', ProductController.updateProductById);

