class ProductMaganer {
    constructor(path){
        this.products = []
        this.path = path
    }


    addProduct(product){
        //Chequeo si existe el codigo
        if(this.products.find(prod => prod.code == product.code)){
            return "El codigo del producto ya existe"
        }

        if(product.code != "" || product.stock >= 0 ){
            this.products.push(product)
        
        }else{
            return "El producto no puede ser cargado"
        }
     
    }
    
    getProduct(){
        // this.readFile()
        return this.products;
    }
    
    getProductById (id){
        // let product = this.products.find(prod => prod.id == id)
        return this.products.find(prod => prod.id == id) ?? console.log("Producto no encontrado")
      
        // if(product){
        //     return product
        // }else{
        //     console.log("Producto no encontrado")
        // }
    }
}

class Product{
    constructor(title, description, price, thumbnail, code, stock){
        this.title = title
        this.description = description
        this.price = price
        this.thumbnail = thumbnail
        this.code = code
        this.stock = stock 
        this.id = Product.incrementarID()
    }

    static incrementarID(){
        this.idIncremento ? this.idIncremento++ : (this.idIncremento = 1);

        // if(this.idIncremento){
        //     this.idIncremento++
        // }else{
        //     this.idIncremento = 1
        // }
        return this.idIncremento
    }

}

const Product1 = new Product("Medias","Rico",1000,"","123",20)
const Product2 = new Product("Gorras","Rico",1000,"","456",20)


const productMaganer = new ProductMaganer();
productMaganer.addProduct(Product1)
productMaganer.addProduct(Product2)

console.log(productMaganer.getProduct())
console.log(productMaganer.getProductById(2))