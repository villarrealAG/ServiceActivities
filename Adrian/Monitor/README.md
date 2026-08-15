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
| **Día 1** | Base de Datos | Configuración del entorno de base de datos relacional | Completado |
| **Día 2** | Agente de Monitoreo | Programación del script extractor en Python | Completado |
| **Día 3** | Backend API | Desarrollo del endpoint REST en PHP | Completado |
| **Día 4** | Frontend Setup | Maquetado inicial de la interfaz en React (Modo Oscuro) | Completado |
| **-** | Descanso | Pausa programada de fin de semana | - |
| **Día 5** | Integración de Gráficos | Implementación de minigráficas de rendimiento en tiempo real | Completado |
| **Día 6** | Métricas de E/S | Despliegue de métricas de almacenamiento y red | Completado |
| **Día 7** | Módulo de Históricos | Filtros y consultas por fecha en base de datos | Completado |
| **Día 8** | Optimización | Pruebas de carga, estrés y rendimiento general | Pendiente |
| **Día 9** | Despliegue | Cierre de documentación y despliegue final | Pendiente |

---

## Detalles de las Fases de Trabajo

### Fase 1: Configuración de Base de Datos (Día 1)
- [x] Crear y configurar la rama de trabajo principal (`feature/monitor-windows-ui`).
- [x] Adaptar el esquema relacional (`monitor_sistema.sql`) para admitir atributos de GPU (porcentaje de uso, temperatura).
- [x] Diseñar el modelo de datos para soportar el almacenamiento dinámico de múltiples discos físicos.

### Fase 2: Script Extractor de Datos (Día 2)
- [x] Programar la recolección periódica de métricas del hardware host mediante subprocesos y APIs del sistema operativo.
- [x] Investigar e implementar módulos de soporte para GPUs dedicadas (librerías `GPUtil` y `WMI`).

### Fase 3: API REST del Servidor (Día 3)
- [x] Implementar la API de PHP para encapsular las métricas consolidadas (CPU, RAM, Discos, Red y GPU).
- [x] Validar la serialización de respuestas a formato estándar JSON.
- http://localhost/sistema-monitor/Backend/api/metrics.php

### Fase 4: Maquetado del Frontend (Día 4)
- [x] Configurar el andamiaje del cliente web empleando Vite y React.
- [x] Diseñar la maquetación de la interfaz de usuario en modo oscuro con la disposición lateral de los componentes críticos.

> [!NOTE]
> **Fin de Semana (Días 5 y 6):** Pausa planificada para actividades de descanso.

### Fase 5: Conectividad y Gráficos (Día 5)
- [x] Conectar la interfaz web al backend PHP mediante consumo de la API REST.
- [x] Integrar librerías de gráficos (`Chart.js` o `Recharts`) para renderizar gráficos de líneas continuos y sin ejes, emulando la estética del Administrador de Tareas.

### Fase 6: Detalle de Almacenamiento y Conexiones (Día 6)
- [x] Validar y formatear la visualización de la memoria en unidades físicas reales (GB utilizados / GB disponibles en detalles).
- [x] Asegurar el cálculo dinámico del porcentaje de uso en los volúmenes de disco duro montados.
- [x] Implementar la visualización del historial en gráficas separadas para cada unidad de almacenamiento detectada.

### Fase 7: Consulta de Históricos (Día 7)
- [x] Desarrollar un filtro temporal interactivo (selector de fechas) para consultar estados anteriores de hardware almacenados en la base de datos.
- http://localhost/sistema-monitor/Backend/api/history.php

### Fase 8: Pruebas de Estrés y Diagnóstico (Día 8)
- [ ] Someter el sistema a cargas elevadas de trabajo simuladas para comprobar la estabilidad de la recolección de datos.
- [ ] Garantizar la eficiencia del renderizado del frontend bajo frecuencias de actualización de datos de alta velocidad.

### Fase 9: Despliegue e Informe Final (Día 9)
- [ ] Consolidar los commits del código en la rama principal.
- [ ] Finalizar la documentación técnica del sistema en este archivo `README.md` y preparar la entrega.

---

## Detalles de cada archivo

A continuación se detalla el propósito, la estructura interna y la funcionalidad de cada uno de los archivos que integran el proyecto actualmente:

### 1. Base de Datos: [127_0_0_1.sql](../ServiceActivities/Adrian/Monitor/Backend/127_0_0_1.sql)
Este archivo contiene el script SQL para configurar e inicializar la base de datos relacional MySQL del sistema (`monitor_hw`). 

- **Estructura y Tablas:**
  - **`equipos`:** Almacena información básica de los dispositivos monitoreados. Campos: `id` (Clave Primaria), `nombre_pc`, `sistema_operativo` y `fecha_registro`. Posee un registro inicial para la computadora principal (`id = 1`).
  - **`metricas_rendimiento`:** Tabla principal que recopila de manera histórica los datos de telemetría de hardware enviados por el agente. Registra:
    - Uso de CPU en porcentaje (`uso_cpu`).
    - Uso de memoria RAM en porcentaje (`uso_ram`) y en cantidad absoluta de Gigabytes utilizados (`ram_gb_usados`).
    - Rendimiento gráfico en GPU: porcentaje de uso (`uso_gpu`) y temperatura en grados Celsius (`temp_gpu`).
    - Tasas de transferencia de red en kilobits por segundo: bajada (`red_bajada_kbps`) y subida (`red_subida_kbps`).
    - Información de almacenamiento estructurada (`info_discos`) en formato JSON, la cual almacena un mapeo dinámico de todas las unidades físicas y particiones detectadas junto con su porcentaje de ocupación individual.
    - Timestamp de registro (`registrado_en`).

---

### 2. Agente de Monitoreo: [monitor.py](../ServiceActivities/Adrian/Monitor/Backend/scripts/monitor.py)
Es un script ejecutable escrito en Python que actúa como demonio o servicio recolector en segundo plano. Se ejecuta de manera indefinida en la máquina objetivo para recopilar periódicamente métricas reales de hardware mediante APIs del sistema operativo.

- **Características y Módulos Clave:**
  - **`psutil`:** Utilizado para extraer estadísticas en tiempo real de la CPU, memoria RAM, discos montados y el tráfico por red.
  - **`GPUtil`:** Módulo para la detección y recopilación de métricas de rendimiento en tarjetas gráficas dedicadas NVIDIA.
  - **Soporte de GPU AMD/Intel (Fallback Windows):** Incluye lógica de respaldo que emplea comandos de PowerShell (`Get-Counter`) para interrogar a los contadores de rendimiento nativos en Windows si no se detecta hardware compatible con NVIDIA, logrando compatibilidad cruzada de fabricantes.
  - **`mysql.connector`:** Interfaz nativa para establecer conexiones e insertar datos directamente en la base de datos local de MySQL.
- **Lógica de Ejecución:**
  - Se ejecuta en un bucle continuo configurado con intervalos de descanso de 2 segundos.
  - Calcula dinámicamente las tasas de velocidad de red (descarga y carga en KB/s) comparando los contadores del sistema respecto al tiempo transcurrido desde la última consulta.
  - Consulta y formatea todas las unidades de almacenamiento disponibles, convirtiendo la información a una cadena JSON limpia antes de guardarla.
  - Realiza un redondeo de precisión a 2 decimales para homogeneizar los datos recolectados y los inserta en la tabla `metricas_rendimiento`.

---

### 3. API REST del Servidor: [metrics.php](../ServiceActivities/Adrian/Monitor/Backend/api/metrics.php) y [history.php](../ServiceActivities/Adrian/Monitor/Backend/api/history.php)
Estos archivos constituyen el backend escrito en PHP que expone los datos de hardware hacia el frontend mediante JSON:

- **metrics.php:**
  - **Consultas con PDO:** Realiza una consulta directa para obtener únicamente la métrica de telemetría más reciente (`ORDER BY id DESC LIMIT 1`).
  - **Mapeo de Datos:** Decodifica el objeto JSON de discos para integrarlo en la respuesta.
- **history.php:**
  - **Filtros Temporales:** Recibe parámetros de consulta GET `start` y `end` para retornar la colección histórica de registros dentro de ese rango, limitada a 200 filas.
- **Características Comunes:**
  - **CORS y Encabezados:** Ambos definen las cabeceras `Content-Type: application/json` y habilitan solicitudes CORS (`Access-Control-Allow-Origin: *`, `Access-Control-Allow-Methods: GET`).
  - **Manejo de Errores:** Responden con estados estructurados y capturan excepciones de base de datos (`PDOException`), devolviendo códigos de respuesta HTTP correspondientes (p. ej., `500`).

---

### 4. Documentación: [README.md](../ServiceActivities/Adrian/Monitor/README.md)
Es el archivo de documentación técnica actual. Detalla la arquitectura de tres capas del sistema, describe el plan de desarrollo desglosado en actividades, y profundiza en las funciones y conexiones de todos los componentes activos del proyecto.

### 5. Cliente Web (React): [App.jsx](../ServiceActivities/Adrian/Monitor/frontend/src/App.jsx)
Este archivo representa la interfaz gráfica de usuario en modo oscuro que interactúa con el backend de forma asíncrona.
- **Características Clave:**
  - **Estado Local y Hooks (`useState`, `useEffect`):** Almacena de manera local la última métrica de hardware y mantiene arreglos de históricos para renderizar los gráficos.
  - **Modos de Visualización:**
    - **En Vivo (Live):** Utiliza un temporizador (`setInterval`) para consultar `metrics.php` cada 2 segundos, desplazando los datos del gráfico para mostrar los últimos 20 puntos de lectura.
    - **Historial (History):** Ejecuta una consulta única hacia `history.php` para un rango de fecha/hora dado y alimenta los gráficos con toda la serie temporal seleccionada.
  - **Visualización con Recharts:** Consume el componente `<LineChart>` y `<Line>` para renderizar gráficos continuos para CPU, Memoria, GPU, Red y un grid responsivo con múltiples gráficos independientes para cada disco duro detectado.
  - **Eje Y y Dominio Dinámico:** Configurado para ajustar el dominio del eje Y dinámicamente (`['auto', 'auto']` para red y `[0, 100]` para porcentajes de hardware).

---

## Arquitectura de Conexiones y Flujo de Datos

El sistema opera bajo un flujo continuo e integrado de información estructurado en tres pasos clave:

```mermaid
sequenceDiagram
    participant Hardware as Hardware del Sistema
    participant PythonAgent as Agente Python (monitor.py)
    participant Database as MySQL (monitor_hw)
    participant PHPAPI as API REST PHP (metrics.php/history.php)
    participant ReactApp as Cliente React (App.jsx)

    loop Cada 2 segundos (Agente)
        PythonAgent->>Hardware: Obtiene métricas (psutil/GPUtil)
        PythonAgent->>Database: Registra telemetría (INSERT INTO)
    end

    alt Modo En Vivo
        loop Cada 2 segundos
            ReactApp->>PHPAPI: Petición GET a metrics.php
            PHPAPI->>Database: Consulta registro más reciente (LIMIT 1)
            Database-->>PHPAPI: Retorna fila de telemetría
            PHPAPI-->>ReactApp: Responde JSON estructurado
            ReactApp->>ReactApp: Actualiza estado local y desplaza gráficos (últimos 20)
        end
    else Modo Historial
        ReactApp->>PHPAPI: Petición GET a history.php?start=X&end=Y
        PHPAPI->>Database: Consulta registros en rango BETWEEN
        Database-->>PHPAPI: Retorna colección de registros
        PHPAPI-->>ReactApp: Responde JSON con arreglo de datos
        ReactApp->>ReactApp: Reemplaza gráficos con la serie histórica completa
    end
```

1. **Adquisición e Inserción:** El agente extractor (`monitor.py`) en Python lee las estadísticas de hardware a través de llamadas de sistema (`psutil` y `GPUtil`), redondea la información y la inserta periódicamente cada 2 segundos en la base de datos MySQL local (`monitor_hw`).
2. **Exposición del Endpoint:** El servidor web Apache sirve el backend en PHP. `metrics.php` consulta mediante PDO el registro más reciente para monitoreo en tiempo real, mientras que `history.php` expone consultas parametrizadas para rangos históricos de telemetría.
3. **Consumo y Renderizado:** El cliente React corre en el puerto `5173` y realiza peticiones REST a Apache. Actualiza dinámicamente los gráficos y vistas de rendimiento en base al modo activo (En Vivo o Historial) seleccionado por el usuario.

---

## Bitácora de Integración y Solución de Incidencias Técnicas

Durante la fase de integración de los tres componentes (Python + PHP + React), se detectaron y resolvieron diversos fallos críticos de conectividad y renderizado:

### 1. Corrección de la URL de API y Configuración de Apache
* **Problema:** El frontend intentaba realizar llamadas HTTP hacia el puerto alternativo `http://localhost:5000/api/metrics`. Dado que el servidor web local se ejecuta sobre el puerto por defecto de Apache (`80`) y la estructura del proyecto está enlazada mediante un *junction* en `C:\xampp\htdocs\sistema-monitor`, las peticiones fallaban con errores de red.
* **Solución:** Se corrigió el endpoint en el cliente React hacia la ruta absoluta correcta de Apache: `http://localhost/sistema-monitor/Backend/api/metrics.php`.

### 2. Homologación de Claves del JSON de Telemetría
* **Problema:** Existía una inconsistencia en las variables usadas en ambos extremos; el backend exponía las métricas bajo las claves `cpu_percent`, `ram_percent` y `ram_gb_usados`, mientras que el frontend intentaba desestructurarlas de forma incorrecta como `cpu_porcentaje`, `ram_porcentaje` y `ram_total_gb`, dejando los componentes gráficos en un estado de valores indeterminados (`undefined`).
* **Solución:** Se reestructuraron las llamadas en el componente asíncrono de React para mapear de manera estricta y correcta las propiedades proporcionadas por la API de PHP.

### 3. Ajuste de Renderizado de Recharts (ResponsiveContainer en Sparklines)
* **Problema:** En el diseño inicial, las gráficas pequeñas de la barra lateral estaban envueltas en un componente `<ResponsiveContainer>` de Recharts. Debido a que el contenedor padre (`.mini-graph-placeholder`) cuenta con un tamaño fijo y rígido de `60px` por `40px` y está anidado en un menú con estilos Flexbox, Recharts calculaba un tamaño inicial de ancho y alto equivalente a `0`, haciendo que la gráfica no se viese reflejada en la interfaz de usuario.
* **Solución:** Se removió el contenedor responsivo y se asignaron dimensiones fijas (`width={54}` y `height={34}`) directamente a la etiqueta `<LineChart>`, garantizando que el motor de renderizado de Recharts dibuje el SVG de forma estática e instantánea al montar la interfaz.

### 4. Depuración de Sintaxis en React
* **Problema:** Se identificaron errores sintácticos de JavaScript en el andamiaje del componente `App.jsx`, tales como:
  * El uso incorrecto de llaves de objetos `{}` en lugar de corchetes `[]` para la desestructuración del hook `useState` para `currentData`.
  * La falta de la estructura interna asíncrona dentro del hook `useEffect` al intentar llamar de forma síncrona a `axios` utilizando `await`.
  * Error ortográfico en el disparador del temporizador (`setIterval` en lugar de `setInterval`).
  * Declaración incompleta en la función de limpieza de la referencia del intervalo (`return (clearInterval(interval)`).
* **Solución:** Se corrigieron todas las inconsistencias de código, implementando la llamada asíncrona de manera encapsulada y retornando una función flecha limpia en el cleanup de React (`return () => clearInterval(interval);`).

### 5. Corrección de Selección y Gráfica de RAM (Memoria) y GPU
* **Problema:** Había una discrepancia entre el estado que guardaba el componente seleccionado (los botones/tarjetas de la barra lateral establecían `'RAM'` y `'GPU)'` con un paréntesis de más en la clase activa), mientras que la lógica de renderizado y el gráfico principal en `App.jsx` esperaban los nombres `'Memoria'` y `'GPU'`. Esto impedía que se mostrara la gráfica principal de la RAM al hacer clic y que se aplicara el estilo activo a la tarjeta de la GPU.
* **Solución:** Se homologaron los identificadores a `'Memoria'` y `'GPU'` de manera consistente en las tarjetas y la lógica de renderizado, y se eliminó el error tipográfico del paréntesis en el caso de la GPU.

### 6. Prevención de Error Fatal (Pantalla Gris) en la Vista de Red
* **Problema:** Al hacer clic en la tarjeta de Red, la aplicación web fallaba por completo a pantalla gris (`TypeError`). Esto ocurría porque en la sección de detalles inferiores se intentaba acceder a `currentData.net_rx.toFixed(1)` y `currentData.net_tx.toFixed(1)`, las cuales eran propiedades inexistentes (`undefined`). Además, el frontend buscaba las claves `data.net_down` y `data.net_up` en la respuesta de la API de PHP, mientras que esta devolvía `data.network_rx_kbps` y `data.network_tx_kbps`.
* **Solución:** Se mapearon correctamente los campos de la API de PHP en `App.jsx` y se reemplazaron los accesos de `net_rx`/`net_tx` en la UI por las variables mapeadas `net_down`/`net_up`. Adicionalmente, se configuró el eje `<YAxis>` del gráfico principal para aceptar el dominio dinámico de la red (`yAxisDomain`), de manera que las unidades se adaptaran correctamente de 0-100 a escala automática.

### 7. Soporte para Monitoreo de Gráficas AMD/Intel en Windows
* **Problema:** El script de recolección de datos (`monitor.py`) utilizaba únicamente la biblioteca `GPUtil` para monitorear la tarjeta gráfica, la cual es compatible exclusivamente con hardware de NVIDIA. En equipos con tarjetas gráficas dedicadas de AMD o integradas de Intel, la GPU se reportaba de forma constante en `0%` de uso.
* **Solución:** Se implementó un mecanismo de respaldo (fallback) en `monitor.py`. Si `GPUtil` no encuentra tarjetas compatibles y el sistema host es Windows, el script consulta de manera rápida el contador de rendimiento de la GPU en tiempo real (`\GPU Engine(*engtype_3D)\Utilization Percentage`) invocando a PowerShell a través del módulo `subprocess`. Se incluyó además una corrección regional para normalizar separadores decimales de coma a punto en sistemas configurados en idioma español.

### 8. Corrección de Pantalla Gris (Crash por datos de disco inexistentes)
* **Problema:** Al iniciar el frontend, la pantalla se quedaba en gris (un crash runtime de React) porque al actualizar el estado (`setCurrentData`) tras realizar la petición REST a la API de PHP, se omitía la clave `disk`. Esto provocaba que `currentData.disk` pasara a ser `undefined` y, al intentar leer `currentData.disk['C:']`, causaba un error de tipo (`TypeError: Cannot read properties of undefined`). Además, la gráfica de disco mostraba una línea plana en 0% porque `diskHistory` nunca se actualizaba con datos reales del host.
* **Solución:** Se incluyó el campo `disk` mapeando a `data.disks_info || {}` en la actualización de estado y se añadió la inicialización y empuje del historial del disco principal a `diskHistory`.

### 9. Visualización Dinámica de Múltiples Gráficas de Disco
* **Problema:** El sistema solo permitía visualizar la información y gráfica de un único disco (originalmente `C:`). Si el equipo monitoreado poseía múltiples particiones o unidades de disco montadas (como `D:`, `G:`, etc.), estas no se graficaban de forma individual.
* **Solución:** Se reestructuró el estado `diskHistory` como un objeto que almacena un historial para cada volumen detectado y se actualizó la sección principal de **Disco** para renderizar dinámicamente un grid CSS responsivo de tarjetas, cada una conteniendo un gráfico de líneas independiente (`LineChart`) para cada unidad de almacenamiento detectada.
* **Solución de error de inicialización:** Se reordenó la declaración de las variables dinámicas de discos (`diskKeys`, `mainDiskKey`, `currentDiskUsage`) antes de ser referenciadas por el bloque de renderizado/selección del gráfico principal de la app, resolviendo un error de inicialización temporal (`ReferenceError`).

### 10. Integración del Módulo de Históricos y Selector de Fechas
* **Problema:** En la integración de la consulta histórica, `App.jsx` presentaba errores de sintaxis (bloques `useEffect` mal formados) que impedían compilar la aplicación. Adicionalmente, las llamadas a API estaban invertidas: la consulta en tiempo real (`fetchLive`) intentaba usar erróneamente `history.php` que retorna un array, y la consulta de filtros de fecha apuntaba a `metrics.php` sin enviar parámetros. El historial de discos (`diskHistory`) también contenía referencias a la variable no definida `updated`.
* **Solución:** Se corrigió la sintaxis de los efectos en React y se reestructuró la lógica para que `fetchLive` consuma `metrics.php` secuencialmente cada 2 segundos, y se creó la función `fetchHistory` que consume `history.php` enviando las fechas de inicio (`start`) y fin (`end`) formateadas de forma estándar. Se implementó una barra superior que permite alternar entre **En Vivo** e **Historial**, mostrando selectores de tipo `datetime-local` y aplicando estilos en modo oscuro.