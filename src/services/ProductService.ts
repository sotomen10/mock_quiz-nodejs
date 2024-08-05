// Importa el repositorio de productos desde el archivo 'productRepository.ts'
import ProductRepository from '../repositories/productRepository';

// Importa el tipo 'CreationAttributes' desde 'sequelize', que representa los atributos para la creación de modelos
import { CreationAttributes } from 'sequelize';

// Importa los decoradores 'injectable' e 'inject' desde 'tsyringe', que se utilizan para la inyección de dependencias
import { injectable, inject } from 'tsyringe';

// Importa el modelo 'Product' desde el archivo 'models/product.ts'
import { Product } from '../models';

// Declara la clase 'ProductService' como inyectable para que pueda ser gestionada por 'tsyringe'
@injectable()
export default class ProductService {
    // Constructor de la clase que inyecta una instancia de 'ProductRepository'
    constructor(
        @inject(ProductRepository) private productRepository: ProductRepository
    ) {}

    // Método para obtener todos los productos
    async getAllProducts() {
        // Llama al método 'findAll' del repositorio para obtener todos los productos
        return await this.productRepository.findAll();
    }

    // Método para obtener un producto por su ID
    async getProductById(id: number) {
        // Llama al método 'findById' del repositorio para obtener un producto específico
        return await this.productRepository.findById(id);
    }

    // Método para obtener productos por ID de usuario
    async getProductsByUserId(userId: number) {
        // Llama al método 'findByUserId' del repositorio para obtener productos asociados a un usuario específico
        return await this.productRepository.findByUserId(userId);
    }

    // Método para crear un nuevo producto
    async createProduct(product: CreationAttributes<Product>) {
        // Llama al método 'create' del repositorio para crear un nuevo producto
        return await this.productRepository.create(product);
    }
    async deleteProduct(productId: number) {
        return await this.productRepository.destroyByUserId(productId);
    }
    async updateProduct(productId: number, Object: Partial<Product>) {
        return await this.productRepository.updateByUserId(productId, Object)        
    }
}

