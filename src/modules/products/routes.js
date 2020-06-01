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
  router.get("/products/edit/:id", Product.editProduct);
  // Actualizar un producto
  router.put("/products/edit/:id", Product.updateproduct);
  // Eliminar un producto
  router.delete("/products/:id", Product.deleteProduct);

export default router