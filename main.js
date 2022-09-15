const express = require ("express");
const handlebars = require("express-handlebars");
const app = express();
const fs = require("fs");
const fsPromise = fs.promises;
const contenedor = require("./desafio4")
const cont = new contenedor("./productos.json") 
const productosRouter = require ("./productos");

app.set("port", 8080);

app.use(express.urlencoded({extended:true}))
app.use(express.json())

//app.use("/",express.static( __dirname + "/assets"))


//HANDLEBARS//


// app.engine(
//     "hbs",
//     handlebars.engine({
//     extname: "hbs",
//     layoutsDir:__dirname + "/views",
//     defaultLayout:"main",
// })
// )
// app.set("views", __dirname + "/views")
// app.set("view engine", "hbs")

// app.get( "/", (req, res)=>{
//     res.render("index", {
//         layout: "index",
//         title: "Página principal",
//         Precio: "Precio",
//         addProd: "Añadir Producto",
//     })
// })

// app.get("/productos", (req, res) =>{
//     res.render("productos", {
//         layout: "productos",
//         title: "Productos",
//         compras: cont.getAll(),
//         noProd: "no hay productos",
//     })
// })

//PUG///

app.set("views", __dirname + "/views");
app.set("view engine", "pug");
app.get("/", (req, res) => {
  res.render("Pug", {
    layout: "Pug",
    title: "Página principal",
    Precio: "Precio",
    addProd: "Añadir Producto",
  });
});

app.get("/productos", (req, res) => {
  res.render("produ", {
    layout: "produ",
    title: "Productos",
    compras: cont.getAll(),
    noProd: "No hay productos",
  });
});

//EJS///

// app.set("views", __dirname + "/views");
// app.set("view engine", "ejs");
// app.get("/", (req, res) => {
//   res.render("Ejs", {
//     layout: "Ejs",
//     title: "Página principal",
//     Precio: "Precio",
//     addProd: "Añadir Producto",
//   });
// });

// app.get("/productos", (req, res) => {
//   res.render("prod", {
//     layout: "prod",
//     title: "Productos",
//     compras: cont.getAll(),
//     noProd: "No hay productos",
//   });
// });

//Prefiero Pug, handlebars se me complico bastante usarlo y EJS me marea un poco.///

app.use("/productos",productosRouter)


const server = app.listen(app.get("port"), () => {
    console.log(`Servidor express iniciado en puerto ${app.get("port")}`);
  });

  server.on("error", (error) => {
    console.log(`Error !!!: ${error}`);
  });