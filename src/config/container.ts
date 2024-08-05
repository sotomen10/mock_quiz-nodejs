// Importa el objeto 'container' desde el paquete 'tsyringe' para la inyección de dependencias
import { container } from 'tsyringe';

// Importa los servicios y repositorios que se registrarán en el contenedor de dependencias
import UserService from '../services/userService';
import UserRepository from '../repositories/userRepository';
import ProductRepository from '../repositories/productRepository';
import ProductService from '../services/productService';

// Registra UserRepository como una instancia singleton en el contenedor
// Esto significa que siempre se utilizará la misma instancia de UserRepository en toda la aplicación
container.registerSingleton<UserRepository>(UserRepository);

// Registra UserService como una instancia singleton en el contenedor
// Esto significa que siempre se utilizará la misma instancia de UserService en toda la aplicación
container.registerSingleton<UserService>(UserService);

// Registra ProductRepository como una instancia singleton en el contenedor
// Esto significa que siempre se utilizará la misma instancia de ProductRepository en toda la aplicación
container.registerSingleton<ProductRepository>(ProductRepository);

// Registra ProductService como una instancia singleton en el contenedor
// Esto significa que siempre se utilizará la misma instancia de ProductService en toda la aplicación
container.registerSingleton<ProductService>(ProductService);
