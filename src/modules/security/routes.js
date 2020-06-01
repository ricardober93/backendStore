import { Router } from "express";
const router = Router();
import User from "./controllers/UserControllers";
import Role from "./controllers/RoleController";
import Auth from "./services/authUser";
import Product from "./controllers/ProductController";

    //Users
        //Signup
    router.post('/signup', User.signup)
        //Verify user
    router.post('/auth/verify', User.verify)
        //Signin
    router.post('/signin', User.signin)
        //Change password
    router.post('/reset-password/:email',User.resetPassword)
    router.post('/reset-password/:userid/:token',User.changePassword)

        //Login Google
    router.get('/auth/google',Auth.googleScope)
    router.get('/auth/google/redirect',
                Auth.google,
                User.loginStrategy
    )

        //Login Facebook
    router.get('/auth/facebook', Auth.facebook);
    router.get('/auth/facebook/callback',
                Auth.facebook,
                User.loginStrategy
    );

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

export default router
