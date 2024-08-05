// Importa las interfaces 'Request' y 'Response' desde el paquete 'express'
import { Request, Response } from "express";

// Importa el objeto 'container' desde el paquete 'tsyringe' para la inyección de dependencias
import { container } from "tsyringe";

// Importa el servicio 'UserService' desde la carpeta 'services'
import UserService from "../services/userService";

// Define la clase 'UserController' que maneja las operaciones relacionadas con usuarios
export default class UserController {
  // Método estático para obtener todos los usuarios
  static async getAllUsers(_: Request, res: Response) {
    // Resuelve la instancia de UserService desde el contenedor de dependencias
    const userService = container.resolve(UserService);
    
    // Llama al método 'getAllUsers' del servicio para obtener todos los usuarios
    const users = await userService.getAllUsers();
    
    // Envía la lista de usuarios como respuesta en formato JSON
    res.json(users);
  }

  // Método estático para obtener un usuario por su ID
  static async getUserById(req: Request, res: Response) {
    // Resuelve la instancia de UserService desde el contenedor de dependencias
    const userService = container.resolve(UserService);
    
    // Obtiene el ID del usuario desde los parámetros de la solicitud
    const user = await userService.getUserById(parseInt(req.params.id));
    
    // Envía el usuario como respuesta en formato JSON
    res.json(user);
  }

  // Método estático para crear un nuevo usuario
  static async createUser(req: Request, res: Response) {
    // Resuelve la instancia de UserService desde el contenedor de dependencias
    const userService = container.resolve(UserService);
    
    // Crea un nuevo usuario utilizando los datos del cuerpo de la solicitud
    const user = await userService.createUser(req.body);
    
    // Envía el nuevo usuario como respuesta en formato JSON con estado 201 (Creado)
    res.status(201).json(user);
  }
}
