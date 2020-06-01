import { Router } from "express";
const router = Router();
import User from "./controllers/UserControllers";
import Role from "./controllers/RoleController";
import Auth from "./services/authUser";
import Product from "./controllers/ProductController";

module.exports = () => {
  //Users
  //Signup
  router.post("/signup", User.signup);
  //Signin
  router.post("/signin", User.signin);

  //Dashboard TEST Authentication token
  router.get("/profile", Auth.validateToken);

  //Roles
  //Add role
  router.post("/role", Role.addRole);

  // Products
  // Obtener Todos los productos
  router.get("/products/", Product.getProducts);
  // Obtener un solo producto
  router.get("/products/:id", Product.getProduct);
  // crear un producto
  router.post("/product/create", Product.create);
  // editar un producto
  router.get("/products/edit/:id", Product.editProduct);
  // Actualizar un producto
  router.put("/products/edit/:id", Product.updateproduct);
  // Eliminar un producto
  router.delete("/products/:id", Product.deleteProduct);

  return router;
};
