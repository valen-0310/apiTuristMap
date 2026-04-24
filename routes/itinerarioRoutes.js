const express = require("express");
const router = express.Router();
const Itinerario = require("../models/Itinerario");
const verifyToken = require("./validarToken");

// CREATE: Crear un nuevo itinerario
router.post("/", verifyToken, async (req, res) => {
    try {
        const itinerario = new Itinerario(req.body);
        const savedItinerario = await itinerario.save();
        res.status(201).json(savedItinerario);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// READ ALL: Obtener todos los itinerarios del usuario
router.get("/", verifyToken, async (req, res) => {
    try {
        const itinerarios = await Itinerario.find({ usuario: req.user.id })
            .populate("dias.actividades.lugar");  // Trae los datos completos del lugar
        res.json(itinerarios);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// READ ONE: Obtener un itinerario por ID
router.get("/:id", verifyToken, async (req, res) => {
    try {
        const itinerario = await Itinerario.findById(req.params.id)
            .populate("dias.actividades.lugar");
        if (!itinerario) {
            return res.status(404).json({ error: "Itinerario no encontrado" });
        }
        res.json(itinerario);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// UPDATE: Actualizar un itinerario por ID
router.put("/:id", verifyToken, async (req, res) => {
    try {
        const updatedItinerario = await Itinerario.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!updatedItinerario) {
            return res.status(404).json({ error: "Itinerario no encontrado" });
        }
        res.json(updatedItinerario);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// DELETE: Eliminar un itinerario por ID
router.delete("/:id", verifyToken, async (req, res) => {
    try {
        const deletedItinerario = await Itinerario.findByIdAndDelete(req.params.id);
        if (!deletedItinerario) {
            return res.status(404).json({ error: "Itinerario no encontrado" });
        }
        res.json({ message: "Itinerario eliminado correctamente" });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

module.exports = router;