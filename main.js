const express = require ("express");
const handlebars = require("express-handlebars");
const app = express();
const fs = require("fs");
const fsPromise = fs.promises;
const contenedor = require("./desafio4")
const cont = new contenedor("./productos.json") 
const productosRouter = require ("./productos");
const { Server: SocketServer } = require("socket.io");
const { Server: HttpServer } = require("http");
const httpServer = new HttpServer(app);
const io = new SocketServer(httpServer);

app.use(express.static("views"));


app.set("port", 8080);

app.use(express.urlencoded({extended:true}))
app.use(express.json())

//app.use("/",express.static( __dirname + "/assets"))

//CHAT SOCKET IO///

let mensajes = [{email: "bienvenida@chat.com", msg: "Bienvenido al chat", date: "01/01/2021 00:00:00"}];


io.on("connection", (socket) => {
  console.log("Se ha conectado un cliente");
  socket.emit('new-message', mensajes);
  socket.emit('new-product', cont.getAll());
  socket.on('new-message', (data) => {
    mensajes.push(data);
    io.sockets.emit('new-message', mensajes);
    fs.writeFile('./mensajes.txt', JSON.stringify(mensajes), (err) => {
      if (err) throw err;
      console.log('The file has been saved!');
    });
  });
  socket.on('new-product', async (data) => {
   await cont.save(data);
   const productos = await cont.getAll();
    io.sockets.emit('new-product', productos);
  });
});

//HANDLEBARS//


app.engine(
    "hbs",
    handlebars.engine({
    extname: "hbs",
    layoutsDir:__dirname + "/views",
    defaultLayout:"main",
})
)
app.set("views", __dirname + "/views")
app.set("view engine", "hbs")

app.get( "/", (req, res)=>{
    res.render("index", {
        layout: "index",
        title: "Página principal",
        Precio: "Precio",
        addProd: "Añadir Producto",
        compras: cont.getAll(),
        noProd: "no hay productos",
    })
})

app.get("/productos", (req, res) =>{
    res.render("productos", {
        layout: "productos",
        title: "Productos",
        compras: cont.getAll(),
        noProd: "no hay productos",
        partialsPath: __dirname + "/views/partials",
    })
})

app.use("/productos",productosRouter)


const server = httpServer.listen(app.get("port"), () => {
    console.log(`Servidor express iniciado en puerto ${app.get("port")}`);
  });

  server.on("error", (error) => {
    console.log(`Error !!!: ${error}`);
  });