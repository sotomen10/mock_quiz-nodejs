// Importa el decorador 'injectable' desde 'tsyringe' para la inyección de dependencias
import { injectable } from 'tsyringe';

// Importa el modelo 'User' desde la carpeta 'models'
import { User } from '../models/user';

// Importa el tipo 'CreationAttributes' desde 'sequelize' para definir los atributos de creación del modelo
import { CreationAttributes } from 'sequelize';

// Marca la clase como inyectable para que pueda ser utilizada en la inyección de dependencias
@injectable()
export default class UserRepository {
    // Método para encontrar todos los usuarios en la base de datos
    async findAll() {
        return await User.findAll(); // Llama al método 'findAll' del modelo 'User'
    }

    // Método para encontrar un usuario por su ID
    async findById(id: number) {
        return await User.findByPk(id); // Llama al método 'findByPk' del modelo 'User'
    }

    // Método para crear un nuevo user en la base de datos
    async create(user: CreationAttributes<User>) {
        return await User.create(user); // Llama al método 'create' del modelo 'User'
    }

    // Método para encontrar un usuario por su email
    async findByEmail(email: string) {
        return await User.findOne({ where: { email } }); // Llama al método 'findOne' del modelo 'User' con un filtro por email
}    
}
