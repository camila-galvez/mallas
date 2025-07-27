import { useState } from "react";
import { motion } from "framer-motion";
import { ramos } from "./data/malla";
import "./App.css";

const fixedColors = {
  "Física 1": "#FFE766",
  "Álgebra 1": "c81708",
  "Cálculo 1": "007fff",
  "Introducción a la Programación": "007fff",
  "Introducción a la Ingeniería Informática": "007fff",

  "Física 2": "#FFE766",
  "Álgebra 2": "c81708",
  "Cálculo 2": "007fff",
  "Programación de Computadores": "007fff",
  "Introducción a la Innovación en Ingeniería": "007fff",

  "Cálculo 3": "007fff",
  "Ecuaciones Diferenciales": "007fff",
  "Lógica": "007fff",
  "Sistemas Computacionales y Arquitectura de Computadores": "007fff",
  "Desarrollo Orientado al Objetivo": "007fff",

  "Cálculo Numérico": "007fff",
  "Sistemas Operativos": "007fff",
  "Proyecto de Programación": "007fff",
  "Matemáticas Discretas": "007fff",
  "Ingeniería de Software": "007fff",
  "Complementario 1": "007fff",

  "Estadísticas y Probabilidades": "007fff",
  "Economía": "007fff",
  "Estructura de Datos": "007fff",
  "Diseño de Software": "007fff",
  "Inglés 1": "007fff",

  "Gestión de Empresas": "007fff",
  "Formulación y Evaluación de Proyectos": "007fff",
  "Análisis de Datos": "007fff",
  "Inteligencia Artificial": "007fff",
  "Testing y Aseguramiento de la Calidad de Software": "007fff",
  "Inglés 2": "007fff",

  "Innovación": "007fff",
  "Redes de Computadores": "007fff",
  "Análisis de Algoritmos": "007fff",
  "Electivo 1": "007fff",
  "Práctica Laboral": "007fff",
  "Inglés 3": "007fff",

  "Introducción a la Sustentabilidad en Ingeniería": "007fff",
  "Optimización": "007fff",
  "Seguridad Informática": "007fff",
  "Integración de Sistemas": "007fff",
  "Proyecto Informático": "007fff",
  "Inglés 4": "007fff",
  "Complementario 2": "007fff",

  "Sistemas Distribuidos y Paralelismo": "007fff",
  "Electivo 2": "007fff",
  "Electivo 3": "007fff",
  "Electivo 4": "007fff",
  "Electivo 5": "007fff",
  "Complementario 3": "007fff",
  "Complementario 4": "007fff",

  "Electivo 6": "007fff",
  "Electivo 7": "007fff",
  "Electivo 8": "007fff",
  "Electivo 9": "007fff",
  "Complementario 5": "007fff",
  "Complementario 6": "007fff",

  "Práctica Profesional": "007fff",
  "Memoria de Título": "#007fff",
};


export default function App() {
  const [aprobados, setAprobados] = useState([]);
  const [filtro, setFiltro] = useState("todos");

  // Genera un color HSL único variando saturación y luminosidad
  function colorFromName(name) {
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }

    const hue = Math.abs(hash) % 360;               // 0–360
    const sat = 40 + (Math.abs(hash >> 2) % 50);    // 40–90%
    const light = 45 + (Math.abs(hash >> 4) % 40);  // 45–85%

    return `hsl(${hue}, ${sat}%, ${light}%)`;
  }

  const toggleRamo = (id) => {
    setAprobados((prev) =>
      prev.includes(id)
        ? prev.filter((r) => r !== id)
        : [...prev, id]
    );
  };

  const resetRamos = () => {
    setAprobados([]);
  };

  const semestres = [...new Set(ramos.map((r) => r.semestre))].sort(
    (a, b) => a - b
  );

  const años = [];
  for (let i = 0; i < semestres.length; i += 2) {
    años.push([semestres[i], semestres[i + 1]]);
  }

  const nombreAño = (index) => `${index + 1}° Año`;
  const nombreSemestre = (num) => `${num}° Semestre`;

  const filtrarRamos = (lista) => {
    if (filtro === "aprobados") return lista.filter((r) => aprobados.includes(r.id));
    if (filtro === "pendientes") return lista.filter((r) => !aprobados.includes(r.id));
    return lista;
  };

  return (
    <div className="app-container">
      <h1>Ingeniería Civil Informática</h1>
      <p>
        Aprobados: {aprobados.length} / {ramos.length}
      </p>

      <div className="button-group">
        <button
          onClick={() => setFiltro("todos")}
          className={`todos ${filtro === "todos" ? "active" : ""}`}
        >
          Todos
        </button>
        <button
          onClick={() => setFiltro("aprobados")}
          className={`aprobados ${filtro === "aprobados" ? "active" : ""}`}
        >
          Aprobados
        </button>
        <button
          onClick={() => setFiltro("pendientes")}
          className={`pendientes ${filtro === "pendientes" ? "active" : ""}`}
        >
          Pendientes
        </button>
        <button
          onClick={resetRamos}
          className="reset"
        >
          Reset
        </button>
      </div>

      <div className="grid-anios">
        {años.map((par, index) => (
          <div key={index} className="anio-card">
            <h2>{nombreAño(index)}</h2>
            <div className="grid-semestres">
              {par.map(
                (sem) =>
                  sem && (
                    <div key={sem} className="semestre">
                      <h3>{nombreSemestre(sem)}</h3>
                      <div className="flex flex-col gap-3">
                        {filtrarRamos(ramos.filter((r) => r.semestre === sem))
                          .map((r) => {
                            const isAprobado = aprobados.includes(r.id);
                            const color = fixedColors[r.nombre] || colorFromName(r.nombre);

                            return (
                              <motion.div
                                key={r.id}
                                onClick={() => toggleRamo(r.id)}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3 }}
                                whileTap={{ scale: 0.98 }}
                                className={`ramo ${isAprobado ? "aprobado" : ""}`}
                                style={{ backgroundColor: color }}
                              >
                                {r.nombre}
                              </motion.div>
                            );
                          })}
                      </div>
                    </div>
                  )
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
