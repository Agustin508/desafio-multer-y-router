const express = require("express")
const {Router}= express
const router = Router()
const contenedor = require("./desafio4")
const cont = new contenedor("./productos.json") 
 
router.get("/", (req, res) => {
  try {
    res.send(cont.getAll());
  } catch (err) {
    res.status(404).send(err);
  }
});

router.get("/:id", (req, res) => {
  try {
    const { id } = req.params;
    res.send(cont.getById(parseInt(id)));
  } catch (err) {
    res.status(404).send(err);
  }
});
  

router.post("/", async (req,res)=>{
  try{
    const data= req.body
    await cont.save(data)
    res.redirect("/");
    }catch(err){
      res.status(404).send(err);
    }
    
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