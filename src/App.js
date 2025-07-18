import React, { useState, useEffect } from "react";

const App = () => {
  // Materias por semestre
  const initialSubjects = [
    [
      { name: "METODO DE ESTUDIO Y COMUNICACION", grade: null, id: "s1m1" },
      { name: "ANATOMIA I", grade: null, id: "s1m2" },
      { name: "EMBRIOLOGIA I", grade: null, id: "s1m3" },
      { name: "HISTOLOGIA I", grade: null, id: "s1m4"},
      { name: "FISIOLOGIA I", grade: null, id: "s1m5"},
      { name: "BIOLOGIA", grade: null, id: "s1m6"},
      { name: "BIOQUIMICA", grade: null, id: "s1m7"}
    ],
    [
      { name: "ANATOMIA II", grade: null, id: "s2m1" },
      { name: "EMBRIOLOGIA II", grade: null, id: "s2m2" },
      { name: "HISTOLOGIA II", grade: null, id: "s2m3" },
      { name: "FISIOLOGIA II", grade: null, id: "s2m4" },
      { name: "INMUNOLOGIA", grade: null, id: "s2m5" },
      { name: "ANTROPOLOGIA OBSTETRICA", grade: null, id: "s2m6" }
    ],
    [
      { name: "SALUD PUBLICA", grade: null, id: "s3m1" },
      { name: "EPISTEMOLOGIA DE LA OBSTETRICIA", grade: null, id: "s3m2" },
      { name: "SEMIOLOGIA Y SEMIOTECNIA GENERA", grade: null, id: "s3m3" },
      { name: "MICROBIOLOGIA Y PARASITOLOGIA", grade: null, id: "s3m4" },
      { name: "FISIOPATOLOGIA", grade: null, id: "s3m5" },
      { name: "PSICOLOGIA", grade: null, id: "s3m6" }
    ],
    [
      { name: "SALUD COMUNITARIA I", grade: null, id: "s4m1" },
      { name: "EPIDEMIOLOGIA", grade: null, id: "s4m2" },
      { name: "SEMIOLOGIA Y SEMIOTECNIA OBSTETRICA", grade: null, id: "s4m3" },
      { name: "ENFERMERIA GENERAL Y OBSTETRICA", grade: null, id: "s4m4" },
      { name: "FARMACOLOGIA", grade: null, id: "s4m5" },
      { name: "PATOLOGIA GENERAL", grade: null, id: "s4m6" },
      { name: "PSICOLOGIA APLICADA A LA OBSTETRICIA", grade: null, id: "s4m7" }
    ],
    [
      { name: "IMAGENOLOGIA GENERAL", grade: null, id: "s5m1" },
      { name: "TERAPEUTICA", grade: null, id: "s5m2" },
      { name: "SALUD COMUNITARIA II", grade: null, id: "s5m3" },
      { name: "EDUCACION MATERNAL E INTERCULTARALIDAD", grade: null, id: "s5m4"},
      { name: "INVESTIGACION DESCRIPTIVA Y ESTADISTICA APLICADA", grade: null, id: "s5m5"},
      { name: "MEDICINA LEGAL", grade: null, id: "s5m6"},
      { name: "CLINICA OBSTETRICA I", grade: null, id: "s5m7"}
    ],
    [
      { name: "BIOESTADISTICA", grade: null, id: "s6m1" },
      { name: "INVESTIGACION ANALITICA", grade: null, id: "s6m2" },
      { name: "PERINATOLOGIA", grade: null, id: "s6m3" },
      { name: "IMAGENOLOGIA OBSTETRICA", grade: null, id: "s6m4" },
      { name: "PATOLOGIA OBSTETRICA I", grade: null, id: "s6m5" },
      { name: "GINECOLOGIA I", grade: null, id: "s6m6" },
      { name: "CLINICA OBSTETRICA II", grade: null, id: "s6m7" }
    ],
    [
      { name: "BIOETICA", grade: null, id: "s7m1" },
      { name: "ADMINISTRACION GERENCIAL", grade: null, id: "s7m2" },
      { name: "INVESTIGACION ANALITICA CUALITATIVA", grade: null, id: "s7m3" },
      { name: "NEONATOLOGIA", grade: null, id: "s7m4" },
      { name: "PATOLOGIA OBSTETRICA II", grade: null, id: "s7m5" },
      { name: "PLANIFICACION FAMILIAR", grade: null, id: "s7m6" },
      { name: "GINECOLOGIA II", grade: null, id: "s7m7" },
      { name: "CLINICA DEL PARTO", grade: null, id: "s7m8" }
    ],
    [
      { name: "GESTION Y EMPRENDIMIENTO", grade: null, id: "s8m1" },
      { name: "PEDIATRIA", grade: null, id: "s8m2" },
      { name: "PATOLOGIA OBSTETRICA III", grade: null, id: "s8m3" },
      { name: "NUTRICION", grade: null, id: "s8m4" },
      { name: "SEXUALIDAD HUMANA", grade: null, id: "s8m5" },
      { name: "SALUD SEXUAL Y SALUD REPRODUCTIVA EN LA ADOLESCENCIA", grade: null, id: "s8m6" },
      { name: "CLINICA DEL PUERPERIO Y LACTANCIA MATERNA", grade: null, id: "s8m7" }
    ],
     [
      { name: "CICLO NEONATOLOGIA - TITULACION", grade: null, id: "s9m1" },
      { name: "CICLO OBSTETRICIA - TITULACION", grade: null, id: "s9m2" },
      { name: "CICLO OBSTETRICIA", grade: null, id: "s9m3" },
      { name: "CICLO PEDIATRIA", grade: null, id: "s9m4" },
      { name: "CICLO COMUNITARIA", grade: null, id: "s9m5" },
    ],
    [
      { name: "CICLO GINECOLOGIA - TITULACION", grade: null, id: "s10m1" },
      { name: "CICLO PATOLOGIA OBSTETRICA - TITULACION", grade: null, id: "s10m2" },
      { name: "CICLO GINECOLOGIA", grade: null, id: "s10m3" },
      { name: "CICLO PATOLOGIA OBSTETRICA", grade: null, id: "s10m4" },
    ]
  ];

  const [subjects, setSubjects] = useState(() => {
    const saved = localStorage.getItem("academicProgress");
    return saved ? JSON.parse(saved) : initialSubjects;
  });

  const [notification, setNotification] = useState("");

  useEffect(() => {
    localStorage.setItem("academicProgress", JSON.stringify(subjects));
  }, [subjects]);

  const handleGradeChange = (semestreIndex, materiaIndex, value) => {
    const newSubjects = [...subjects];
    const grade = parseFloat(value);

    if (!isNaN(grade) && grade >= 0 && grade <= 20) {
      newSubjects[semestreIndex][materiaIndex].grade = grade;
      setSubjects(newSubjects);
    } else if (value === "") {
      newSubjects[semestreIndex][materiaIndex].grade = null;
      setSubjects(newSubjects);
    }
  };

  const isSemestreUnlocked = (semestreIndex) => {
    if (semestreIndex === 0) return true;
    const prevSemestre = subjects[semestreIndex - 1];
    return prevSemestre.every((materia) => materia.grade !== null && materia.grade >= 14);
  };

  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => setNotification(""), 3000);
  };

  return (
    <div className="container">
      <h1 className="title">Seguimiento de Progreso Académico</h1>

      {notification && <div className="notification">{notification}</div>}

      {subjects.map((semestre, semestreIndex) => (
        <div
          key={semestreIndex}
          className={`semester ${isSemestreUnlocked(semestreIndex) ? "" : "locked"}`}
        >
          <h2>Semestre {semestreIndex + 1}</h2>
          <div className="subjects">
            {semestre.map((materia, materiaIndex) => (
              <div key={materia.id} className="subject">
                <h3>{materia.name}</h3>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <input
                    type="number"
                    step="1"
                    min="0"
                    max="20"
                    placeholder="Nota"
                    value={materia.grade === null ? "" : materia.grade}
                    onChange={(e) =>
                      handleGradeChange(semestreIndex, materiaIndex, e.target.value)
                    }
                    disabled={!isSemestreUnlocked(semestreIndex)}
                    className={`grade-input ${
                      materia.grade !== null && materia.grade >= 14
                        ? "approved"
                        : materia.grade !== null && materia.grade < 14
                        ? "rejected"
                        : ""
                    }`}
                  />
                  {materia.grade !== null && (
                    <span
                      className={`status ${
                        materia.grade >= 14 ? "approved" : "rejected"
                      }`}
                    >
                      {materia.grade >= 14 ? "Aprobado✅" : "Aun no"}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      <button onClick={() => {
        setSubjects(initialSubjects);
        showNotification("Datos reiniciados correctamente.");
      }} className="reset-button">
        Reiniciar Datos
      </button>
    </div>
  );
};

export default App;