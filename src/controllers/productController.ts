// Importa las interfaces 'Request' y 'Response' desde el paquete 'express'
import { Request, Response } from 'express';

// Importa el objeto 'container' desde el paquete 'tsyringe' para la inyección de dependencias
import { container } from 'tsyringe';

// Importa el servicio 'ProductService' desde la carpeta 'services'
import ProductService from '../services/productService';

// Define la clase 'ProductController' que maneja las operaciones relacionadas con productos
export default class ProductController {
    // Método estático para obtener todos los productos
    static async getAllProducts(req: Request, res: Response) {
        // Resuelve la instancia de ProductService desde el contenedor de dependencias
        const productService = container.resolve(ProductService);
        
        // Llama al método 'getAllProducts' del servicio para obtener todos los productos
        const products = await productService.getAllProducts();
        
        // Envía la lista de productos como respuesta en formato JSON
        res.json(products);
    }

    // Método estático para obtener un producto por su ID
    static async getProductById(req: Request, res: Response) {
        // Resuelve la instancia de ProductService desde el contenedor de dependencias
        const productService = container.resolve(ProductService);
        
        // Obtiene el ID del producto desde los parámetros de la solicitud
        const product = await productService.getProductById(parseInt(req.params.id));
        
        // Envía el producto como respuesta en formato JSON
        res.json(product);
    }

    // Método estático para obtener productos asociados a un usuario específico
    static async getProductsByUserId(req: Request, res: Response) {
        // Resuelve la instancia de ProductService desde el contenedor de dependencias
        const productService = container.resolve(ProductService);
        
        // Obtiene el ID del usuario desde los parámetros de la solicitud
        const products = await productService.getProductsByUserId(parseInt(req.params.userId));
        
        // Envía la lista de productos del usuario como respuesta en formato JSON
        res.json(products);
    }

    // Método estático para crear un nuevo producto
    static async createProduct(req: Request, res: Response) {
        // Resuelve la instancia de ProductService desde el contenedor de dependencias
        const productService = container.resolve(ProductService);
        
        // Crea un nuevo producto utilizando los datos del cuerpo de la solicitud
        const product = await productService.createProduct(req.body);
        
        // Envía el nuevo producto como respuesta en formato JSON con estado 201 (Creado)
        res.status(201).json(product);
    }
    static async updateProductById(req: Request, res: Response) {
        // Resuelve la instancia de ProductService desde el contenedor de dependencias
        const productService = container.resolve(ProductService);
        
        const product = req.body
        const id = parseInt(req.params.id)
        await productService.updateProduct(id, product)
        const productUpdated = await productService.getProductsByUserId(id);
        // Envía el producto como respuesta en formato JSON
        res.status(200).json(productUpdated);
    }
}
