const express=require('express')
const app=express()
const fs=require('fs');

app.get('/',(req,res,next)=>{
    res.send('<h1 style = "color: blue"> Bienvenido a Express </h1>')
})
let visitas =0
app.get('/visitas',(req,res)=>{
    visitas++
    res.send(`la cantidad de visitas es ${visitas}`)
})
app.get('/fyh',(req,res)=>{
    let fecha= new Date ().toLocaleString("es-AR")
    res.send(`la fecha es ${fecha}`)
})

class Contenedor{
    constructor(path){
        this.path=path
        this.id=0
        this.productos = []
    }
    async getAll() {
        const prod=[]
		try {
			const data = await fs.promises.readFile(this.path, 'utf-8')
			if (data) {
				this.productos = JSON.parse(data)
				this.productos.map((producto) => {
					if (this.id < producto.id) prod.push(producto)
				})
			}
		} catch (error) {
			return
		}
        return prod
	}
    async getRandom(){
        const prod=[]
        try{
            const data= await fs.promises.readFile(this.path,'utf-8')
            if (data){
                const productos=JSON.parse(data)
                productos.map((producto) => {
                    prod.push(producto)
            })
            }
        }
        catch(err){
            console.log(err)
        }
        const num=Math.floor(Math.random()*(prod.length-1))
        return prod[num]
    }
}
const cont=new Contenedor('./productos.txt')
app.get('/productoRandom',(req,res)=>{
    async function productostotales(){
        let prod = await cont.getRandom()
        res.send(prod)
    }
    productostotales()
})
app.get('/productos',(req,res)=>{
    async function productostotales(){
        let prod = await cont.getAll()
        res.send(prod)
    }
    productostotales()
})


const PORT=8080
const server= app.listen(PORT,()=>{
    console.log(`Servidor Express en ${PORT}`)
})

server.on('error',(error) => console.log(error))