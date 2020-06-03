import Product from "../models/ProductModel";

exports.CreateProducto = async (
  name,
  description,
  price,
  image,
  raiting,
  SKU,
  comentaries,
  state,
  mark,
  publish
) => {
  const NewProduct = new Product({
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
  });

  const result = await NewProduct.save();

  return result;
};

exports.updateProduct = async (
  id,
  name,
  description,
  price,
  image,
  raiting,
  SKU,
  comentaries,
  state,
  mark,
  publish
) => {


  const updateProduct = {
    name,
    description,
    price,
    image,
    raiting,
    SKU,
    comentaries,
    state,
    mark,
    publish};

    const result = await Product.findOneAndUpdate(id,  updateProduct );

    return result;

};


exports.deleteProduct = async(id) => {
  const result = await Product.findByIdAndRemove(id);
  return result;
}