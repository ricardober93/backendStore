import Product from "../models/ProductModel";
import {CreateProducto, updateProduct, deleteProduct} from '../services/ProductService'

// obtener todos los productos
exports.getProducts = async ( req,res, next) => {
  let response = {
    errors: [],
    msg: "",
    data: {},
  };

  try {
    const products = await Product.find();
    response.msg = "La petición exitosa";
    response.data = products;
    res.json(response);
  } catch (error) {
    response.errors = true;
    response.msg = error;
    res.status(400).json(response);
    next();
  }
};

// obtener un solo producto
exports.getProduct = async (req, res, next) => {
  const id = req.params.id;
  let response = {
    errors: [],
    msg: "",
    data: {},
  };

  try {
    const product = await Product.findById(id);
    response.msg = "get Product";
    response.data = product;
    res.json(response);
  } catch (error) {
    response.errors = true;
    response.msg = error;
    res.status(400).json(response);
    next();
  }
};

// crear un solo producto
exports.create = async (req, res, next) => {
  const {
    name,
    description,
    price,
    image,
    raiting,
    SKU,
    comentaries,
    state,
    mark,
    publish,
  } = req.body;

  let response = {
    errors: [],
    msg: "",
    data: {},
  };


  
  try {
    
      await CreateProducto(name, description, price,image, raiting, SKU, comentaries,state, mark,publish)
      response.msg = 'Product created succesfuly'
      res.status(200).json(response)
    
    
  } catch (error) {
    response.errors = true
    response.msg = error
    res.status(500).json(response)
    console.error(error)
    next(error)
  }

};

// Editar un producto
exports.edit = async (req, res, next) => {
  const id = req.params.id;
  let response = {
    errors: [],
    msg: "",
    data: {},
  };
  try {
    const product = await Product.findbyid(id);
    response.data = product;
    res.json(response);
  } catch (error) {
    response.errors = true;
    response.msg = error;
    res.status(500).json(response);
    next();
  }
};
// Actualizar un producto
exports.update = async(req, res, next) => {
    const id = req.params.id;
    const {
        name,
        description,
        price,
        image,
        raiting,
        SKU,
        comentaries,
        state,
        mark,
        publish,
    }= req.body;
    let response = {
      errors: [],
      msg: "",
      data: {},
    };    
    try {
      
        await updateProduct(id, name, description, price,image, raiting, SKU, comentaries,state, mark,    publish)
        response.msg = 'Product update succesfuly'
        res.status(200).json(response)
         
    } catch (error) {
    response.errors = true;
    response.msg = error;
    res.status(500).json(error);
    next();
    }
};
// Eliminar producto
exports.delete = async (req, res, next) =>{
    const id = req.params.id;
    let response = {
      errors: [],
      msg: "",
      data: {},
    };
  
    try {
        await deleteProduct(id);
        response.msg = 'Product deleted succesfuly'
        res.status(200).json(response)
    } catch (error) {
    res.status(500).json(error);
    next();
    }
};
