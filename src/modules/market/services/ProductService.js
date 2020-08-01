import Product from "../models/ProductModel";

exports.createProduct = async (
  name,
  description,
  price = 33,
  featured,
  image_preview,
  image = [],
  raiting = 5,
  SKU = 272883990,
  stock = 1, 
  brand = null, 
  category = null,
  state = 'disponible',
  publish = true
) => {

  const NewProduct = new Product({
    name,
    description,
    price,
    featured,
    image_preview,
    image,
    raiting,
    SKU,
    stock, 
    brand, 
    category,
    state,
    publish
  });

  const result = await NewProduct.save();

  return result;
};

exports.updateProduct = async (
  id,
  name,
  description,
  price,
  featured,
  image_preview,
  image,
  raiting,
  SKU,
  stock, 
  brand, 
  category,
  state,
  publish
) => {

  const updateProduct = {
    name,
    description,
    price,
    featured,
    image_preview,
    image,
    raiting,
    SKU,
    stock, 
    brand, 
    category,
    state,
    publish
  };

  const result = await Product.findOneAndUpdate(id, updateProduct );

  return result;

};

exports.deleteProduct = async (id) => {
  const result = await Product.findByIdAndRemove(id);
  return result;
}