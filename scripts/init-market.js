import Product from '../src/modules/market/models/ProductModel'
import Category from '../src/modules/market/models/CategoryModel'
import Brand from '../src/modules/market/models/BrandModel'

export const initMarket = function () {

    const newCategory = new Category({
        name: "Computacion",
        description: "Procesadores, Mothers, etc",
        image_url: "https://hardzone.es/app/uploads-hardzone.es/2019/12/Procesadores-Intel-y-AMD-930x487.jpg",
        featured: true,
        state: "available",
    })
    newCategory.id = newCategory._id;
    newCategory.save()

    const newBrand = new Brand({
        name: "Intel",
        description: "Procesadores para computadoras",
        image_url: "https://www.intel.la/content/dam/products/hero/foreground/processor-badge-intel-icon-1x1.png.rendition.intel.web.225.225.png",
        featured: true,
        state: "available",
    })
    newBrand.id = newBrand._id;
    newBrand.save()

    const newProduct = new Product({
        name: "Intel I9",
        description: "Productividad y entretenimiento, todo disponible en computadoras de escritorio. La superioridad tecnológica de INTEL es un beneficio para todo tipo de profesionales. Asegura el mejor rendimiento de las aplicaciones, de la transferencia de datos y la conexión con otros elementos tecnológicos. Núcleos: el corazón del procesador Dentro de este producto vas a encontrar los núcleos, que son los encargados de ejecutar las instrucciones y actividades que le asignás a tu dispositivo. Estos están en relación directa con dos elementos: los hilos y el modelo, por lo que a la hora de elegir un procesador es importante que valores los tres en su conjunto.",
        price: 7500.00,
        image_preview: "https://http2.mlstatic.com/D_NQ_NP_951435-MLA40182457147_122019-O.webp",
        image: [
            "https://http2.mlstatic.com/D_NQ_NP_951435-MLA40182457147_122019-O.webp", 
            "https://hardzone.es/app/uploads-hardzone.es/2019/12/Procesadores-Intel-y-AMD-930x487.jpg"
        ],
        raiting: 1,
        SKU: "3SHC89XY8XR",
        stock: 50,
        state: "available",
        brand: newBrand._id,
        category: newCategory._id,
        publish: true,
    })
    newProduct.id = newProduct._id;
    newProduct.save()

    console.log("Se crearon 1 Marca, 1 Categoria y 1 Producto")
    return;

}