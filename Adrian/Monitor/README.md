# Monitor de Rendimiento de Recursos del Sistema

Un sistema integral para el monitoreo en tiempo real de recursos críticos del hardware (CPU, memoria RAM, GPU, almacenamiento y red), con una interfaz de usuario en modo oscuro inspirada en el Administrador de Tareas de Windows.

## Arquitectura del Proyecto

El sistema se compone de tres capas principales:

1. **Agente de Adquisición (Python):** Script dedicado a recolectar métricas del sistema (uso e información de CPU, RAM, GPU, discos y red) de manera continua.
2. **Servidor API (PHP):** Endpoint REST que recibe, almacena e interactúa con la base de datos relacional para exponer los históricos y el estado en tiempo real en formato JSON.
3. **Cliente Web (React + Vite):** Panel visual responsivo y estilizado que renderiza los gráficos de rendimiento y permite consultar registros históricos.

---

## Plan de Desarrollo y Cronograma

A continuación se detalla la planificación y el estado del proyecto a lo largo de un ciclo de desarrollo de 9 días.

### Cronograma General

| Día | Fase de Desarrollo | Descripción de la Actividad | Estado |
| :--- | :--- | :--- | :---: |
| **Día 1** | Base de Datos | Configuración del entorno de base de datos relacional | En Progreso |
| **Día 2** | Agente de Monitoreo | Programación del script extractor en Python | Pendiente |
| **Día 3** | Backend API | Desarrollo del endpoint REST en PHP | Pendiente |
| **Día 4** | Frontend Setup | Maquetado inicial de la interfaz en React (Modo Oscuro) | Pendiente |
| **-** | Descanso | Pausa programada de fin de semana | - |
| **Día 5** | Integración de Gráficos | Implementación de minigráficas de rendimiento en tiempo real | Pendiente |
| **Día 6** | Métricas de E/S | Despliegue de métricas de almacenamiento y red | Pendiente |
| **Día 7** | Módulo de Históricos | Filtros y consultas por fecha en base de datos | Pendiente |
| **Día 8** | Optimización | Pruebas de carga, estrés y rendimiento general | Pendiente |
| **Día 9** | Despliegue | Cierre de documentación y despliegue final | Pendiente |

---

## Detalles de las Fases de Trabajo

### Fase 1: Configuración de Base de Datos (Día 1)
- [x] Crear y configurar la rama de trabajo principal (`feature/monitor-windows-ui`).
- [ ] Adaptar el esquema relacional (`monitor_sistema.sql`) para admitir atributos de GPU (porcentaje de uso, temperatura).
- [ ] Diseñar el modelo de datos para soportar el almacenamiento dinámico de múltiples discos físicos.

### Fase 2: Script Extractor de Datos (Día 2)
- [ ] Programar la recolección periódica de métricas del hardware host mediante subprocesos y APIs del sistema operativo.
- [ ] Investigar e implementar módulos de soporte para GPUs dedicadas (librerías `GPUtil` y `WMI`).

### Fase 3: API REST del Servidor (Día 3)
- [ ] Implementar la API de PHP para encapsular las métricas consolidadas (CPU, RAM, Discos, Red y GPU).
- [ ] Validar la serialización de respuestas a formato estándar JSON.

### Fase 4: Maquetado del Frontend (Día 4)
- [ ] Configurar el andamiaje del cliente web empleando Vite y React.
- [ ] Diseñar la maquetación de la interfaz de usuario en modo oscuro con la disposición lateral de los componentes críticos.

> [!NOTE]
> **Fin de Semana (Días 5 y 6):** Pausa planificada para actividades de descanso.

### Fase 5: Conectividad y Gráficos (Día 5)
- [ ] Conectar la interfaz web al backend PHP mediante consumo de la API REST.
- [ ] Integrar librerías de gráficos (`Chart.js` o `Recharts`) para renderizar gráficos de líneas continuos y sin ejes, emulando la estética del Administrador de Tareas.

### Fase 6: Detalle de Almacenamiento y Conexiones (Día 6)
- [ ] Validar y formatear la visualización de la memoria en unidades físicas reales (GB utilizados / GB totales).
- [ ] Asegurar el cálculo dinámico del porcentaje de uso en los volúmenes de disco duro montados.

### Fase 7: Consulta de Históricos (Día 7)
- [ ] Desarrollar un filtro temporal interactivo (selector de fechas) para consultar estados anteriores de hardware almacenados en la base de datos.

### Fase 8: Pruebas de Estrés y Diagnóstico (Día 8)
- [ ] Someter el sistema a cargas elevadas de trabajo simuladas para comprobar la estabilidad de la recolección de datos.
- [ ] Garantizar la eficiencia del renderizado del frontend bajo frecuencias de actualización de datos de alta velocidad.

### Fase 9: Despliegue e Informe Final (Día 9)
- [ ] Consolidar los commits del código en la rama principal.
- [ ] Finalizar la documentación técnica del sistema en este archivo `README.md` y preparar la entrega.