import fs from 'fs';

class ProductManager {
	constructor(path) {
		this.products = [];
		this.path = path;
	}

	addProduct(product) {
		this.readFile();
		const { title, description, price, thumbnail, code, stock } = product;

		if (!title || !description || !price || !thumbnail || !code || !stock) {
			console.log(
				'Error. Faltan datos del producto'
			);
			return;
		}

		this.products.find(element => element.code == product.code)
			? console.log('El código del producto ya existe')
			: this.products.push(product);

		let writeProducts = JSON.stringify(this.products);
		fs.writeFileSync(this.path, writeProducts);
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
		fs.writeFileSync(this.path, writeProducts);
	}

	deleteProduct(id) {
		this.readFile();
		this.products = this.products.filter(prod => prod.id !== id);
		let writeProducts = JSON.stringify(this.products);
		fs.writeFileSync(this.path, writeProducts);
	}

	readFile() {
		let resultado = fs.readFileSync(this.path, 'utf-8');
		this.products = JSON.parse(resultado);
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

const Pman = new ProductManager('products.txt');

Pman.addProduct(
	new Product({
		title: 'Pantalón',
		description: 'Un producto',
		price: 500,
		thumbnail: 'http://',
		code: 154,
		stock: 43,
	})
);
Pman.addProduct(
	new Product({
		title: 'Pantalón',
		description: 'Un producto',
		price: 500,
		thumbnail: 'http://',
		code: 124,
		stock: 43,
	})
);

Pman.addProduct(
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
Pman.addProduct(
	new Product({
		title: 'Pantalón',
		description: 'Un producto',
		price: 500,
		thumbnail: 'http://',
		code: 124,
		stock: 43,
	})
);

// mostrar productos
let products = Pman.getProducts();
console.log('Todos los productos: ', products);
// mostrar por ID
console.log('Producto id 2: ', Pman.getProductById(2));
// eliminar un producto
Pman.deleteProduct(6);
// actualizar un producto
Pman.updateProducts(2, { title: 'Remera', stock: 12, id: 3 });
// mostrar productos
products = Pman.getProducts();
console.log('Todos los productos: ', products);