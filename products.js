const express = require("express")
const {Router}= express
const router = Router()
const contenedor = require("./desafio4")
const cont = new contenedor("./products.json") 
 

router.get("/", async (req,res)=>{
   
    const data = await cont.getAll()
    console.log(data)
    res.send(data)
  })

router.get("/:id",async (req,res)=>{
    const {id} = req.params
    try {
        const data = await cont.getById(id)
        res.send(data)
    }catch(e){
        res.status(404).send({error:true, msj: e.message})
    }    
  })
  

router.post("/", async (req,res)=>{
    const {title,price}= req.body
    await cont.save({title,price})
    res.send({error:false,msg:"Producto cargado"})
    
  })
  
router.put("/:id", (req, res) => {
    try {
      const { id } = req.params
      const prodNuevo = req.body
      const idInt = parseInt(id)
      res.send(cont.updateById(idInt, prodNuevo))
    } catch (err) {
      res.status(404).send(err.msg)
    }
  })
  
router.delete("/:id",(req,res)=>{
    try {
        const { id } = req.params
        res.send(cont.deleteById(parseInt(id)))
      } catch (err) {
        res.status(404).send(err.msg)
      }
  })

module.exports = router  