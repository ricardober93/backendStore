import { Router } from "express";
const router = Router();
import Product from "./controller/ProductController";


  // Products
  // Obtener Todos los productos
  router.get("/products", Product.getProducts);
  // Obtener un solo producto
  router.get("/product/:id", Product.getProduct);
  // crear un producto
  router.post("/product/create", Product.create);
  // editar un producto
  router.get("/product/edit/:id", Product.edit);
  // Actualizar un producto
  router.put("/product/edit/:id", Product.update);
  // Eliminar un producto
  router.delete("/product/:id", Product.delete);

export default router