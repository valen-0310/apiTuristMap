const mongoose = require("mongoose");

// Esquema del Lugar
const Lugares = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    categoria: {
        type: String,
        required: true
    },
    ciudad: {
        type: String,
        required: true
    },
    pais: {
        type: String,
        required: true
    },
    horario: {
        type: String,
        required: true
    },
    recomendaciones: {
        type: String,
        required: true
    },
    imagenes: {
        type: String,
        required: true
    },
    calificacion: {
        type: Number,
        required: true
    },
    fechaCreacion: {
        type: Date,
        default: Date.now  // La fecha se genera automáticamente al crear un nuevo documento
    }
}, {
    timestamps: true // Mongoose genera automáticamente `createdAt` y `updatedAt`
});

// Exportar el modelo Animal
module.exports = mongoose.model("Lugar", Lugares);
