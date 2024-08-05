// Importa los decoradores y tipos necesarios desde 'sequelize-typescript'
import {
    Table,
    Column,
    Model,
    DataType,
    PrimaryKey,
    AutoIncrement,
    ForeignKey,
    BelongsTo,
} from 'sequelize-typescript';

// Importa el modelo 'User' para establecer la relación con el modelo 'Product'
import { User } from './user';

// Define la clase 'Product' como un modelo de Sequelize
@Table({
    // Define el nombre de la tabla en la base de datos
    tableName: 'products',
    
    // Activa los timestamps para que Sequelize maneje automáticamente las fechas de creación y actualización
    timestamps: true,
})
export class Product extends Model<Product> {
     // Define la columna 'id' como clave primaria y autoincrementable
     @PrimaryKey
     @AutoIncrement
     @Column({
       type: DataType.INTEGER, // Define el tipo de datos como INTEGER
     })
     id!: number; // Marca 'id' como propiedad obligatoria
   
    // Define la columna 'name' en la tabla 'products'
    @Column({
        type: DataType.STRING, // Define el tipo de datos como STRING
        allowNull: false,     // Establece que este campo no puede ser nulo
    })
    name!: string; // Marca 'name' como propiedad obligatoria

    // Define la columna 'price' en la tabla 'products'
    @Column({
        type: DataType.FLOAT,  // Define el tipo de datos como FLOAT
        allowNull: false,     // Establece que este campo no puede ser nulo
    })
    price!: number; // Marca 'price' como propiedad obligatoria

    // Define la columna 'userId' como una clave foránea que referencia el modelo 'User'
    @ForeignKey(() => User)
    @Column({
        type: DataType.INTEGER, // Define el tipo de datos como INTEGER
        allowNull: false,      // Establece que este campo no puede ser nulo
    })
    userId!: number; // Marca 'userId' como propiedad obligatoria

    // Define una relación de pertenencia (BelongsTo) con el modelo 'User'
    @BelongsTo(() => User)
    user!: User; // Define la propiedad 'user' para representar la relación
}
