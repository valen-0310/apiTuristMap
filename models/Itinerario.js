const mongoose = require("mongoose");

const ItinerarioSchema = new mongoose.Schema({
    titulo: {
        type: String,
        required: true  // Ej: "Mi viaje a Cartagena"
    },
    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Usuario",  // Referencia al modelo Usuario
        required: true
    },
    fechaInicio: {
        type: Date,
        required: true
    },
    fechaFin: {
        type: Date,
        required: true
    },
    dias: [
        {
            dia: {
                type: Number,  // Ej: 1, 2, 3...
                required: true
            },
            actividades: [
                {
                    lugar: {
                        type: mongoose.Schema.Types.ObjectId,
                        ref: "Lugar"  // Referencia al modelo Lugar
                    },
                    hora: {
                        type: String  // Ej: "10:00 AM"
                    },
                    nota: {
                        type: String  // Nota personal del usuario
                    }
                }
            ]
        }
    ]
}, {
    timestamps: true
});

module.exports = mongoose.model("Itinerario", ItinerarioSchema);