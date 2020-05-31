import Category from "../models/CategoryModel";

export async function readCategories () {

    let categories = Category.find()
    if(!categories){
        throw new Error('Ocurrio un error al obtener los datos de la categoria')
    }
    return categories

}

export async function addCategory (name,descrition,image_url,featured,state) {

    const category = new Category({
        name: name,
        descrition: descrition,
        image_url: image_url,
        featured: featured,
        state: state,
    });
    
    category.id = category._id;
    await category.save()
    return category;
}

export async function getCategory (id) {
    
    const category = await Category.findById(id)

    if(!category){
        throw new Error('La categoria con ese ID no esta')
    }  

    return category;
}

export async function updateCategory (id,name,descrition,image_url,featured,state)  {

    const category = await Category.findByIdAndUpdate(id, {
        name: name,
        descrition: descrition,
        image_url: image_url,
        featured: featured,
        state: state,
    }) 

    if(!category){
       throw new Error('La categoria con ese ID no esta')
    }

    const categoryUpdate = await User.findById(id)

    if(!categoryUpdate){
        throw new Error('Hubo un error al encontrar la categoria')
    }

    return categoryUpdate;
}