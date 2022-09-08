const fs = require("fs");

class Contenedor {
    constructor(archivo) {
        this.archivo = archivo;
    }


async save(obj){
    const data = await fs.promises.readFile(this.archivo, "utf-8")
    const objetos = JSON.parse(data)
    const id = objetos.length + 1
    obj.id = id;
    objetos.push(obj);
    const objetosString = JSON.stringify(objetos)
    await fs.promises.writeFile(this.archivo, objetosString)
    return objetos
}

async getAll() {
    const data = await fs.promises.readFile(this.archivo, "utf-8")
    return JSON.parse(data);

}

async getObjById(id) {
    const data = await fs.promises.readFile(this.archivo, "utf-8");
    const objetos = JSON.parse(data);
    const objetoId = objetos.filter ((objeto) => objeto.id !== id);
    const objeto = objetos.find((objeto) => objeto.id == id);
    if(objeto) {
        console.log("se elimino el id");
        const updatedFile = JSON.stringify(objetoId, null, "");
        fs.promises.writeFile(this.archivo, updatedFile);
    }else{
        console.log("no se encontro el id")
    }
}

deleteAll() {
    fs.writeFileSync(this.archivo, "[]");
    console.log("se borro todo");
    return "[]";
    
}
updateById(id, objetoNuevo) {
    const data = fs.readFileSync(this.archivo, "utf-8");
    let dataParseada = JSON.parse(data);
    let productoViejo = dataParseada.find((objeto) => objeto.id === id);
    let mensaje = "Se reemplazo el producto";
    if (productoViejo === undefined) {
      throw { msg: "404 Not found" };
    }
    let productosFiltrados = dataParseada.filter((objeto) => objeto.id !== id);
    productoViejo = { id, ...objetoNuevo };
    productosFiltrados.push(productoViejo);
    fs.writeFileSync(this.archivo, JSON.stringify(productosFiltrados, null, 2));
    return mensaje;
  }

}

async function start(){
//const db = new Contenedor("data");
//db.save({nombre:"eduardo"});
//const all = await db.getAll();
//console.log(all);
//const objeto = await db.getObjById(5);
//console.log(objeto)
//await db.deleteAll()
}

start();

module.exports = Contenedor;
