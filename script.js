// import fs from 'fs';
import { promises as fs } from 'fs';

class ProductManager {
	constructor(path) {
		this.products = [];
		this.path = path;
	}

	addProduct(product) {
		this.readFile();
		const { title, description, price, thumbnail, code, stock } = product;

		if (!title || !code ) {
			console.log(
				'El producto debe incluir los campos title, description, price, thumbnail, code y stock'
			);
			return;
		}

		this.products.find(element => element.code == product.code)
			? console.log('El código del producto ya existe')
			: this.products.push(product);

		let writeProducts = JSON.stringify(this.products);

        const writext = async () =>{
            await fs.writeFile(this.path, writeProducts)
        }
		writext()
	}

	getProducts() {
		this.readFile();
		return this.products;
	}

	getProductById(id) {
		this.readFile();
		return this.products.find(product => product.id == id) ?? console.log('Not Found');
	}

	updateProducts(id, update) {
		this.readFile();
		let product = this.products.find(prod => prod.id == id);
		let keys = Object.keys(update);
		keys.map(key => key !== 'id' && (product[key] = update[key]));
		let writeProducts = JSON.stringify(this.products);
        const escribirtxt = async () =>{

            fs.writeFile(this.path, writeProducts);
        }
        escribirtxt()
	}

	deleteProduct(id) {
		this.readFile();
		this.products = this.products.filter(prod => prod.id !== id);
		let writeProducts = JSON.stringify(this.products);
        const escribirNuev = async () =>{

            fs.writeFile(this.path, writeProducts);
        }
        escribirNuev()
	}

	readFile() {
		const resultado = async () => {
         await fs.readFile(this.path, 'utf-8');
         this.products = JSON.parse(resultado);
        }    
	}
}

class Product {
	constructor({ title, description, price, thumbnail, code, stock }) {
		this.title = title;
		this.description = description;
		this.price = price;
		this.thumbnail = thumbnail;
		this.code = code;
		this.stock = stock;
		this.id = Product.incrementarID();
	}

	static incrementarID() {
		this.idIncrement ? this.idIncrement++ : (this.idIncrement = 1);
		return this.idIncrement;
	}
}

// Crear el manager
const manager = new ProductManager('products.txt');

// Añadir productos
manager.addProduct(
	new Product({
		title: 'Pantalón',
		description: 'Un producto',
		price: 500,
		thumbnail: 'http://',
		code: 154,
		stock: 43,
	})
);
manager.addProduct(
	new Product({
		title: 'Pantalón',
		description: 'Un producto',
		price: 500,
		thumbnail: 'http://',
		code: 124,
		stock: 43,
	})
);

manager.addProduct(
	new Product({
		title: 'Pantalón',
		description: 'Un producto',
		price: 500,
		thumbnail: 'http://',
		code: 453,
		stock: 43,
	})
);

// Añadir producto con mismo codigo
manager.addProduct(
	new Product({
		title: 'Pantalón',
		description: 'Un producto',
		price: 500,
		thumbnail: 'http://',
		code: 124,
		stock: 43,
	})
);

let products = manager.getProducts();
console.log('Todos los productos: ', products);
console.log('Producto id 2: ', manager.getProductById(2));
manager.deleteProduct(6);
manager.updateProducts(2, { title: 'Remera', stock: 12, id: 3 });
products = manager.getProducts();
console.log('Todos los productos: ', products);