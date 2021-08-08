const fs=require('fs');
class Producto{
    constructor(tittle,price,thumbnail){
        this.tittle=tittle
        this.price=price
        this.thumbnail=thumbnail
    }
} 

class Contenedor{
    constructor(path){
        this.path=path
        this.id=0
        this.productos = []
    }

    async save (producto){
        await this.getAll()
        this.id++
        this.productos.push({
            id: this.id,
            producto: producto,
        })
        try{
            await fs.promises.writeFile(this.path,JSON.stringify(this.productos))
            console.log('guardado con exito')
        }
        catch(err){
            console.log('Error al escribirlo')
        }
    }

    async getAll() {
		try {
			const data = await fs.promises.readFile(this.path, 'utf-8')
			if (data) {
				this.productos = JSON.parse(data)
				this.productos.map((producto) => {
					if (this.id < producto.id) this.id = producto.id
				})
			}
		} catch (error) {
			return
		}
	}

    async deleteAll(){
        this.productos=[]
        try{
            await fs.promises.writeFile(this.path,JSON.stringify(this.productos))
            console.log('Borrado con exito')
        }
        catch(err){
            console.log('Error al Borrarlo')
        }
    }

    async deleteById(id){
        await this.getAll()
        this.productos=this.productos.filter((producto)=> id!= producto.id )
        console.log(this.productos)
        try{
            await fs.promises.writeFile(this.path,JSON.stringify(this.productos))
            console.log('El id fue eliminado con exito')
        }
        catch(err){
            console.log('Error al borrar el id')
        }
    }

    async getById(id){
        try {
			const data = await fs.promises.readFile(this.path, 'utf-8')
			if (data) {
				this.productos = JSON.parse(data)
				this.productos.map((producto) => {
					if (this.id == producto.id) this.id = producto.id
				})  
			}
		} catch (error) {
			return
		}
    }
}

const contenido= new Contenedor('./productos.txt')
async function Imprimir () {
    await contenido.save({title:"manzana",price:100,url:"otraURL"});
    await contenido.save({title:"Banana",price:60,url:"otraURL"});
    await contenido.save({title:"Naranja",price:80,url:"otraURL"});
    //console.log(await contenido.getAll());
    //console.log(await contenido.getById(2) , 'metodo getById');
    //await contenido.deleteById(1);
    //console.log(await contenido.getAll(),'Con id borrado');
    //await contenido.deleteAll();
 };
Imprimir()
