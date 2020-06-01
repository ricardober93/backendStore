import Product from "../models/ProductModel";


// obtener todos los productos
exports.getProducts = async (res, req, next) => {
  let response = {
    errors: [],
    msg: "",
    data: {},
  };

  if (!errors.IsEmpty()) {
    response.errors = errors.array();
    response.msg = "La Peticion no es exitosa";
    res.status(400).json(response);
    next();
  }

  try {
    const products = await Product.find();
    response.msg = "La petición exitosa";
    response.data = products;
    res.json(response);
  } catch (error) {
    response.errors = true;
    response.msg = error;
    res.status(500).json(response);
    next();
  }
};

// obtener un solo producto
exports.getProduct = async (res, req, next) => {
  const id = req.params.id;
  let response = {
    errors: [],
    msg: "",
    data: {},
  };

  try {
    const product = await Product.findbyid(id);
    response.msg = "get Product";
    response.data = product;
    res.json(response);
  } catch (error) {
    response.errors = true;
    response.msg = error;
    res.status(500).json(response);
    next();
  }
};

// crear un solo producto
exports.create = async (res, req, next) => {
  const {
    name,
    description,
    price,
    image,
    raiting,
    SKU,
    comentaries,
    state,
    marcaProducto,
    publish,
  } = req.body;

  const NewProduct = new Product({
    name,
    description,
    price,
    image,
    raiting,
    SKU,
    comentaries,
    state,
    marcaProducto,
    publish,
  });

  try {
    await NewProduct.save();
    res.json(NewProduct);
  } catch (error) {
    res.status(500).json();
    next();
  }
};

// Editar un producto
exports.editProduct = async (res, req, next) => {
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
exports.updateproduct = async(res, req, next) => {
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
        marcaProducto,
        publish,
    }= req.body;

    const updateProduct = {
        name,
        description,
        price,
        image,
        raiting,
        SKU,
        comentaries,
        state,
        marcaProducto,
        publish,
    };

    try {
        const product = await ProductoModel.findOneAndUpdate(id,  updateProduct );
        res.json(product);
    } catch (error) {
    res.status(500).json(error);
    next();
    }
};
// Eliminar producto
exports.deleteProduct = async (res, req, next) =>{
    const id = req.params.id;
    try {
        const product = await ProductoModel.findByIdAndRemove(id);
        res.json(product);
    } catch (error) {
    res.status(500).json(error);
    next();
    }
};
