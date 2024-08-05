// Importa el decorador 'injectable' desde 'tsyringe' para la inyección de dependencias
import { injectable } from 'tsyringe';

// Importa el modelo 'Product' desde la carpeta 'models'
import { Product } from '../models';

// Importa el tipo 'CreationAttributes' desde 'sequelize' para definir los atributos de creación del modelo
import { CreationAttributes } from 'sequelize';

// Marca la clase como inyectable para que pueda ser utilizada en la inyección de dependencias
@injectable()
export default class ProductRepository {
    // Método para encontrar todos los productos en la base de datos
    async findAll() {
        return await Product.findAll(); // Llama al método 'findAll' del modelo 'Product'
    }

    // Método para encontrar un producto por su ID
    async findById(id: number) {
        return await Product.findByPk(id); // Llama al método 'findByPk' del modelo 'Product'
    }

    // Método para encontrar todos los productos asociados a un usuario específico
    async findByUserId(userId: number) {
        return await Product.findAll({ where: { userId } }); // Llama al método 'findAll' del modelo 'Product' con un filtro
    }

    // Método para crear un nuevo producto en la base de datos
    async create(product: CreationAttributes<Product>) {
        return await Product.create(product); // Llama al método 'create' del modelo 'Product'
    }
    async destroyByUserId(productId: number) {
        return await Product.destroy({ where: { id: productId } });

    } async updateByUserId(productId: number, Object: Partial<Product>) {
        return await Product.update(Object, { where: { id: productId } });
    }
}



/**
 * 'CreationAttributes<Product>' es un tipo que representa los atributos que se pueden pasar a la función 'create' de un modelo de Sequelize.
 */
