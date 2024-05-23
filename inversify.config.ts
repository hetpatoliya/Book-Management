import { Container } from "inversify";
import { AdminController } from "./src/controllers/admin.controller";
import { AdminServices } from "./src/services/admin.service";
import { AuthorController } from "./src/controllers/author.controller";
import { AuthorService } from "./src/services/author.service";
import { BookController } from "./src/controllers/book.controller";
import { BookService } from "./src/services/book.service";
import { CategoryController } from "./src/controllers/category.controller";
import { CategoryService } from "./src/services/category.service";

const container = new Container();

container.bind<AdminController>(AdminController).toSelf();
container.bind<AdminServices>(AdminServices).toSelf();

container.bind<AuthorController>(AuthorController).toSelf();
container.bind<AuthorService>(AuthorService).toSelf();

container.bind<BookController>(BookController).toSelf();
container.bind<BookService>(BookService).toSelf();

container.bind<CategoryController>(CategoryController).toSelf();
container.bind<CategoryService>(CategoryService).toSelf();

export default container;