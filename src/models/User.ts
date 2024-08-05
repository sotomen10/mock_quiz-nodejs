// Importa los decoradores y tipos necesarios desde 'sequelize-typescript'
import {
    Table,
    Column,
    Model,
    DataType,
    PrimaryKey,
    AutoIncrement,
    HasMany,
  } from "sequelize-typescript";
  
  // Importa el modelo 'Product' para establecer la relación con el modelo 'User'
  import { Product } from './product';
  
  // Define la clase 'User' como un modelo de Sequelize
  @Table({
    // Define el nombre de la tabla en la base de datos
    tableName: "users",
    
    // Activa los timestamps para que Sequelize maneje automáticamente las fechas de creación y actualización
    timestamps: true,
  })
  export class User extends Model<User> {
    // Define la columna 'id' como clave primaria y autoincrementable
    @PrimaryKey
    @AutoIncrement
    @Column({
      type: DataType.INTEGER, // Define el tipo de datos como INTEGER
    })
    id!: number; // Marca 'id' como propiedad obligatoria
  
    // Define la columna 'name' en la tabla 'users'
    @Column({
      type: DataType.STRING, // Define el tipo de datos como STRING
      allowNull: false,     // Establece que este campo no puede ser nulo
    })
    name!: string; // Marca 'name' como propiedad obligatoria
  
    // Define la columna 'email' en la tabla 'users' como única
    @Column({
      type: DataType.STRING, // Define el tipo de datos como STRING
      allowNull: false,     // Establece que este campo no puede ser nulo
      unique: true,         // Define que el valor de este campo debe ser único
    })
    email!: string; // Marca 'email' como propiedad obligatoria
  
    // Define la columna 'password' en la tabla 'users'
    @Column({
      type: DataType.STRING, // Define el tipo de datos como STRING
      allowNull: false,     // Establece que este campo no puede ser nulo
    })
    password!: string; // Marca 'password' como propiedad obligatoria
  
    // Define una relación de uno a muchos con el modelo 'Product'
    @HasMany(() => Product)
    products!: Product[]; // Define la propiedad 'products' para representar la relación
  }
  