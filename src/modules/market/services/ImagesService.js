import Image from "../models/ImageModel";
import Product from "../models/ProductModel";

export async function getImages(userId) {
    
    let images = Image.findById(userId);

    if (!images) {
        throw new Error('Hay un problema con las imagenes')
    }

    return images

}


export async function addImages(images, id) {

    let product = await Product.findById(id);

    let addImages = new Image({
        images:images,
        product:product.id
    });

    addImages.id = addImages._id
    addImages.save()

    return addImages;

}

export async function deleteImages(imagesId, index) {

    let NewImages =  await images.updateOne( {_id: imagesId }, { $pullAll : { images: index } })

    return NewImages;

}