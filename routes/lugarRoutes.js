const express = require("express");
const router = express.Router();
const Lugar = require("../models/Lugar");  
const verifyToken = require('./validarToken');

// CREATE: Crear un nuevo lugar
router.post("/", async (req, res) => {
  try {
    const lugar = new Lugar(req.body);
    const savedLugar = await lugar.save();
    res.status(201).json(savedLugar);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// READ ALL: Obtener todos los lugares
router.get("/", async (req, res) => {
  try {
    const lugares = await Lugar.find();  
    res.json(lugares);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// READ ONE: Obtener un solo lugar por su ID
router.get("/:id", async (req, res) => {
  try {
    const lugar = await Lugar.findById(req.params.id);  
    if (!lugar) {
      return res.status(404).json({ error: "Lugar no encontrado" });
    }
    res.json(lugar);  
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// UPDATE: Actualizar un lugar por su ID
router.put("/:id", async (req, res) => {
  try {
    const updatedLugar = await Lugar.findByIdAndUpdate(
      req.params.id, 
      req.body,  
      { new: true }  
    );
    if (!updatedLugar) {
      return res.status(404).json({ error: "Lugar no encontrado" });
    }
    res.json(updatedLugar);  
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE: Eliminar un lugar por su ID
router.delete("/:id", async (req, res) => {
  try {
    const deletedLugar = await Lugar.findByIdAndDelete(req.params.id);  
    if (!deletedLugar) {
      return res.status(404).json({ error: "Lugar no encontrado" });
    }
    res.json({ message: "Lugar eliminado" }); 
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// GET protegido con token
router.get("/lugares", verifyToken, async (req, res) => {  
  try {
    const data = await Lugar.find();  
    res.json(data);
  } catch (error) {
    res.json({ message: error });
  }
});

module.exports = router;