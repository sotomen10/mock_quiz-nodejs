Mis disculpas por eso. A continuación te proporciono los códigos restantes con comentarios en inglés. He incluido comentarios para los archivos que faltaban.

```markdown
# Project Code with Comments

## `src/config/db.ts`
```typescript
import { Sequelize } from 'sequelize-typescript';
import { User, Product } from '../models';

// Initialize Sequelize with database configuration
const sequelize: Sequelize = new Sequelize({
    dialect: 'mysql', // Database type
    host: 'localhost', // Database host
    username: 'root', // Database username
    password: '', // Database password
    database: 'erp', // Database name
    models: [User, Product], // Models to be used
});

export default sequelize;
```

## `src/config/container.ts`
```typescript
import { container } from 'tsyringe';
import UserService from '../services/userService';
import UserRepository from '../repositories/userRepository';
import ProductRepository from '../repositories/productRepository';
import ProductService from '../services/productService';

// Register singletons for dependency injection
container.registerSingleton<UserRepository>(UserRepository);
container.registerSingleton<UserService>(UserService);

container.registerSingleton<ProductRepository>(ProductRepository);
container.registerSingleton<ProductService>(ProductService);
```

## `src/controllers/authController.ts`
```typescript
import { container } from "tsyringe";
import { Request, Response } from "express";
import UserService from "../services/userService";
import jwt from "jsonwebtoken";
import { User } from "../models";

export default class AuthController {
  static async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const userService = container.resolve(UserService);
      const user: User = await userService.checkUserCredentials(
        email,
        password
      );
      // Generate JWT token
      const token = AuthController.generateToken({
        id: user.id,
        username: user.email,
      });
      res.status(200).json({ status: 200, token });
    } catch (error: any) {
      res.status(401).json({ message: error.message });
    }
  }

  // Generate a JWT token for the user
  static generateToken = (user: { id: number; username: string }) => {
    const token = jwt.sign(user, "secret", { expiresIn: "1h" });
    return token;
  };
}
```

## `src/controllers/productController.ts`
```typescript
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ProductService from '../services/productService';

export default class ProductController {
    // Handle GET request to fetch all products
    static async getAllProducts(req: Request, res: Response) {
        const productService = container.resolve(ProductService);
        const products = await productService.getAllProducts();
        res.json(products);
    }

    // Handle GET request to fetch a product by ID
    static async getProductById(req: Request, res: Response) {
        const productService = container.resolve(ProductService);
        const product = await productService.getProductById(parseInt(req.params.id));
        res.json(product);
    }

    // Handle GET request to fetch products by user ID
    static async getProductsByUserId(req: Request, res: Response) {
        const productService = container.resolve(ProductService);
        const products = await productService.getProductsByUserId(parseInt(req.params.userId));
        res.json(products);
    }

    // Handle POST request to create a new product
    static async createProduct(req: Request, res: Response) {
        const productService = container.resolve(ProductService);
        const product = await productService.createProduct(req.body);
        res.status(201).json(product);
    }
}
```

## `src/controllers/userController.ts`
```typescript
import { Request, Response } from "express";
import { container } from "tsyringe";
import UserService from "../services/userService";

export default class UserController {
  // Handle GET request to fetch all users
  static async getAllUsers(_: Request, res: Response) {
    const userService = container.resolve(UserService);
    const users = await userService.getAllUsers();
    res.json(users);
  }

  // Handle GET request to fetch a user by ID
  static async getUserById(req: Request, res: Response) {
    const userService = container.resolve(UserService);
    const user = await userService.getUserById(parseInt(req.params.id));
    res.json(user);
  }

  // Handle POST request to create a new user
  static async createUser(req: Request, res: Response) {
    const userService = container.resolve(UserService);
    const user = await userService.createUser(req.body);
    res.status(201).json(user);
  }
}
```

## `src/models/product.ts`
```typescript
import {
    Table,
    Column,
    Model,
    DataType,
    ForeignKey,
    BelongsTo,
} from 'sequelize-typescript';
import { User } from './user';

@Table({
    tableName: 'products',
    timestamps: true, // Sequelize will handle timestamps
})
export class Product extends Model<Product> {
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    name!: string;

    @Column({
        type: DataType.FLOAT,
        allowNull: false,
    })
    price!: number;

    @ForeignKey(() => User)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    userId!: number;

    @BelongsTo(() => User)
    user!: User;
}
```

## `src/models/user.ts`
```typescript
import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  AutoIncrement,
  HasMany,
} from "sequelize-typescript";
import { Product } from './product';

@Table({
  tableName: "users",
  timestamps: true, // Sequelize will handle timestamps
})
export class User extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataType.INTEGER,
  })
  id!: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  email!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password!: string;

  @HasMany(() => Product)
  products!: Product[];
}
```

## `src/models/index.ts`
```typescript
export * from './product';
export * from './user';
```

## `src/repositories/productRepository.ts`
```typescript
import { injectable } from 'tsyringe';
import { Product } from '../models';
import { CreationAttributes } from 'sequelize';

@injectable() // Indicates this class is a service that can be injected
export default class ProductRepository {
    // Fetch all products
    async findAll() {
        return await Product.findAll();
    }

    // Fetch a product by its ID
    async findById(id: number) {
        return await Product.findByPk(id);
    }

    // Fetch products by user ID
    async findByUserId(userId: number) {
        return await Product.findAll({ where: { userId } });
    }

    // Create a new product
    async create(product: CreationAttributes<Product>) {
        return await Product.create(product);
    }
}
```

## `src/repositories/userRepository.ts`
```typescript
import { injectable } from 'tsyringe';
import { User } from '../models/user';

@injectable()
export default class UserRepository {
    // Fetch all users
    async findAll() {
        return await User.findAll();
    }

    // Fetch a user by their ID
    async findById(id: number) {
        return await User.findByPk(id);
    }

    // Create a new user
    async create(user: Partial<User>) {
        return await User.create(user);
    }

    // Fetch a user by their email
    async findByEmail(email: string) {
        return await User.findOne({ where: { email } });
    }
}
```

## `src/routes/productRoutes.ts`
```typescript
import { Router } from 'express';
import ProductController from '../controllers/productController';

export const productRouter = Router();

// Define routes for product operations
productRouter.get('/', ProductController.getAllProducts);
productRouter.get('/:id', ProductController.getProductById);
productRouter.get('/user/:userId', ProductController.getProductsByUserId);
productRouter.post('/', ProductController.createProduct);
```

## `src/routes/userRoutes.ts`
```typescript
import { Router } from 'express';
import UserController from '../controllers/userController';

export const userRouter = Router();

// Define routes for user operations
userRouter.get('/', UserController.getAllUsers);
userRouter.get('/:id', UserController.getUserById);
userRouter.post('/', UserController.createUser);
```

## `src/routes/Router.ts`
```typescript
import { Router } from 'express';
import { userRouter, productRouter } from './';
import { authRouter } from './authRouter';

const router = Router();

// Use routers for different API paths
router.use('/users', userRouter);
router.use('/products', productRouter);
router.use('/auth', authRouter);

export default router;
```

## `src/routes/index.ts`
```typescript
export * from './productRoutes';
export * from './userRoutes';
```

## `src/index.ts`
```typescript
import express from "express";
import sequelize from "./config/db";
import router from "./routes/Router";

const app = express();


app.use(express.json());
app.use("/api", router);

// Start server and connect to database
const startServer = async () => {
  try {
    await sequelize.authenticate(); // Authenticate database connection
    console.log("Database connected!");
    await sequelize.sync(); // Sync database models
    app.listen(3000, () => {
      console.log("Server started on port 3000");
    });
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

startServer();
```

Este archivo Markdown incluye todos los códigos que me proporcionaste con comentarios puntuales y generales en inglés.