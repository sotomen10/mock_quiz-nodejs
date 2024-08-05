// Importa el repositorio de usuarios desde el archivo 'userRepository.ts'
import UserRepository from "../repositories/userRepository";

// Importa los decoradores 'injectable' e 'inject' desde 'tsyringe' para la inyección de dependencias
import { injectable, inject } from "tsyringe";

// Importa el modelo 'User' desde el archivo 'models/user.ts'
import { User } from "../models/user";

// Declara la clase 'UserService' como inyectable para permitir la inyección de dependencias
@injectable()
export default class UserService {
  // Constructor de la clase que inyecta una instancia de 'UserRepository'
  constructor(@inject(UserRepository) private userRepository: UserRepository) {}

  // Método para obtener todos los usuarios
  async getAllUsers() {
    // Llama al método 'findAll' del repositorio para obtener todos los usuarios
    return await this.userRepository.findAll();
  }

  // Método para obtener un usuario por su ID
  async getUserById(id: number) {
    // Llama al método 'findById' del repositorio para obtener un usuario específico
    return await this.userRepository.findById(id);
  }

  // Método para obtener un usuario por su correo electrónico
  async getUserByEmail(email: string): Promise<User | null> {
    // Llama al método 'findByEmail' del repositorio para obtener un usuario por su correo electrónico
    return await this.userRepository.findByEmail(email);
  }

  // Método para crear un nuevo usuario
  async createUser(user: User) {
    // Llama al método 'create' del repositorio para crear un nuevo usuario
    return await this.userRepository.create(user);
  }

  // Método para verificar las credenciales del usuario
  async checkUserCredentials(
    email: string,
    password: string
  ): Promise<User> {
    // Obtiene el usuario por su correo electrónico
    const user = await this.getUserByEmail(email);
    // Verifica si el usuario existe y si la contraseña es correcta
    if (user && user.password === password) {
      return user;
    }
    // Lanza un error si las credenciales son inválidas
    throw new Error("Invalid credentials");
  }
}

/**
 * @injectable() es un decorador que indica que la clase es un servicio que puede ser inyectado en otras clases.
 * @inject(UserRepository) es un decorador que indica que el parámetro userRepository del constructor debe ser resuelto por el contenedor de inyección de dependencias.
 * El contenedor de inyección de dependencias se encarga de crear una instancia de la clase UserService y de inyectar una instancia de UserRepository en el parámetro userRepository del constructor.
 *
 * Partial<User> se utiliza para definir un tipo que tiene todas las propiedades del tipo 'User' como opcionales. Esto es útil para la creación de nuevos usuarios, ya que es posible que no se proporcione toda la información al crear un nuevo usuario.
 */
