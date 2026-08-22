import React, { useState } from 'react';
import { FolderTree, Folder, FolderOpen, FileCode, CheckCircle, Info, ChevronRight, File } from 'lucide-react';
import CodeBlock from '../components/CodeBlock';

export default function FolderStructure() {
  const [selectedNode, setSelectedNode] = useState('src');

  // Directory details database
  const nodeInfo = {
    src: {
      name: 'src/',
      type: 'folder',
      desc: 'El directorio raíz del código fuente. Todo el código React que escribes (componentes, lógica, estilos) vive dentro de esta carpeta. Vite procesa este directorio para compilar la aplicación final.',
      why: 'Permite separar el código de desarrollo de los archivos de configuración estática del proyecto (como package.json o vite.config.js).'
    },
    components: {
      name: 'src/components/',
      type: 'folder',
      desc: 'Componentes de UI Compartidos. Contiene componentes visuales pequeños, atómicos y altamente reutilizables (ej. Botones, Tarjetas, Modales, Entradas de Formulario).',
      why: 'Mantiene el código DRY (Don\'t Repeat Yourself). Si necesitas cambiar el estilo de todos los botones de la app, solo editas el archivo en esta carpeta en vez de buscar en 50 archivos distintos.'
    },
    pages: {
      name: 'src/pages/',
      type: 'folder',
      desc: 'Páginas / Vistas Completas. Representa las pantallas completas de la aplicación que se asocian directamente a las rutas del navegador (ej. Login, Dashboard, DetalleUsuario).',
      why: 'Diferencia claramente las pantallas completas (que manejan enrutamiento) de las piezas individuales de interfaz. Facilita enormemente que un nuevo programador entienda cuántas vistas tiene el sistema.'
    },
    hooks: {
      name: 'src/hooks/',
      type: 'folder',
      desc: 'Hooks Personalizados (Custom Hooks). Carpeta dedicada a encapsular lógica de estado y efectos secundarios reutilizables. Su nombre siempre empieza con la palabra "use" (ej. useAuth, useLocalStorage).',
      why: 'Evita la repetición de lógica compleja en los componentes. Extraer la lógica de autenticación o de llamadas a APIs a un hook mantiene los archivos visuales limpios y fáciles de testear.',
      code: `// src/hooks/useToggle.js
import { useState } from 'react';

// Hook personalizado simple para alternar estados booleanos
export default function useToggle(initialValue = false) {
  const [value, setValue] = useState(initialValue);
  
  const toggle = () => setValue(prev => !prev);
  
  return [value, toggle];
}`
    },
    services: {
      name: 'src/services/',
      type: 'folder',
      desc: 'Servicios de Comunicación API. Centraliza las llamadas de red externas, configuraciones de Axios, Fetch o websockets.',
      why: 'Desacopla la interfaz visual del servidor de datos. Si la API cambia su URL base o los nombres de las propiedades, solo debes modificar la carpeta services, y los componentes de UI no sufrirán cambios.',
      code: `// src/services/userService.js
const API_URL = 'https://api.example.com';

export async function getUserProfile(userId) {
  const response = await fetch(\`\${API_URL}/users/\${userId}\`);
  if (!response.ok) {
    throw new Error('Error al obtener perfil');
  }
  return response.json();
}`
    },
    appJs: {
      name: 'src/App.jsx',
      type: 'file',
      desc: 'Componente Raíz de la Aplicación. Configura la estructura principal, los proveedores de contexto globales (temas, autenticación) y define las rutas principales de navegación.',
      why: 'Actúa como el pegamento de toda la aplicación, orquestando el flujo de entrada principal.'
    },
    mainJs: {
      name: 'src/main.jsx',
      type: 'file',
      desc: 'Punto de Entrada de la Aplicación JavaScript. Monta el componente raíz <App /> en el nodo del DOM de HTML del archivo index.html indexado por el navegador.',
      why: 'Es el primer archivo en ejecutarse en el navegador. Aquí se inicializan librerías nucleares y estilos globales CSS.'
    }
  };

  // Helper to render tree nodes with proper styles
  const renderTreeNode = (id, label, type, isSub = false) => {
    const isSelected = selectedNode === id;
    const isFolder = type === 'folder';

    return (
      <div 
        className={`tree-row ${isSelected ? 'selected' : ''}`}
        onClick={() => setSelectedNode(id)}
        style={{ paddingLeft: isSub ? '24px' : '8px' }}
      >
        {isFolder ? (
          isSelected ? <FolderOpen className="tree-icon folder-open" size={16} /> : <Folder className="tree-icon folder-open" size={16} />
        ) : (
          <FileCode className="tree-icon file-icon" size={16} />
        )}
        <span>{label}</span>
      </div>
    );
  };

  return (
    <div style={{ textAlign: 'left' }}>
      <h1>
        <FolderTree size={32} style={{ color: 'var(--primary)' }} />
        <span>Estructura de Carpetas de un Proyecto Real</span>
      </h1>
      <p className="page-description">
        Cuando un proyecto web crece y pasa de ser una pequeña tarea escolar a un software empresarial con miles de archivos y decenas de desarrolladores, el orden y la arquitectura de carpetas se vuelven indispensables para evitar el caos.
      </p>

      {/* Importance box */}
      <div className="alert alert-success" style={{ marginBottom: '24px', display: 'flex', gap: '12px' }}>
        <CheckCircle size={24} style={{ color: 'var(--success)', flexShrink: 0 }} />
        <div>
          <strong style={{ fontSize: '15px' }}>¿Por qué es crucial mantener este estándar?</strong>
          <p style={{ fontSize: '13px', color: '#a7f3d0', marginTop: '4px', lineHeight: '1.5' }}>
            Si cada programador organizara los archivos a su criterio personal, buscar una funcionalidad en un proyecto heredado tomaría horas. Al usar una estructura convencional (pages/, components/, hooks/, services/), cualquier desarrollador externo sabe exactamente a dónde ir para corregir un bug de diseño o modificar una llamada a base de datos.
          </p>
        </div>
      </div>

      <div className="grid-2">
        {/* Interactive Explorer Tree */}
        <div className="card">
          <h2 className="card-title">
            <FolderTree size={18} />
            <span>Explorador de Proyecto React</span>
          </h2>
          <p className="card-desc">
            Haz clic en los diferentes nodos del proyecto para inspeccionar el rol que juega cada directorio y archivo en la arquitectura.
          </p>

          <div style={{ 
            backgroundColor: '#0c0a09', 
            border: '1px solid var(--border)', 
            borderRadius: '8px', 
            padding: '16px',
            display: 'flex',
            flexDirection: 'column',
            gap: '4px'
          }}>
            {/* src root */}
            {renderTreeNode('src', 'src/', 'folder')}
            
            {/* src children */}
            <div className="tree-node">
              {renderTreeNode('components', 'components/', 'folder')}
              <div className="tree-node">
                <div style={{ paddingLeft: '24px', fontSize: '13px', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }} className="tree-row">Button.jsx</div>
                <div style={{ paddingLeft: '24px', fontSize: '13px', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }} className="tree-row">Layout.jsx</div>
              </div>

              {renderTreeNode('pages', 'pages/', 'folder')}
              <div className="tree-node">
                <div style={{ paddingLeft: '24px', fontSize: '13px', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }} className="tree-row">Dashboard.jsx</div>
                <div style={{ paddingLeft: '24px', fontSize: '13px', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }} className="tree-row">UserProfile.jsx</div>
              </div>

              {renderTreeNode('hooks', 'hooks/', 'folder')}
              <div className="tree-node">
                <div style={{ paddingLeft: '24px', fontSize: '13px', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', cursor: 'pointer' }} className="tree-row" onClick={() => setSelectedNode('hooks')}>useToggle.js</div>
              </div>

              {renderTreeNode('services', 'services/', 'folder')}
              <div className="tree-node">
                <div style={{ paddingLeft: '24px', fontSize: '13px', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', cursor: 'pointer' }} className="tree-row" onClick={() => setSelectedNode('services')}>userService.js</div>
              </div>

              {renderTreeNode('appJs', 'App.jsx', 'file', true)}
              {renderTreeNode('mainJs', 'main.jsx', 'file', true)}
            </div>
          </div>
        </div>

        {/* Selected Node Details */}
        <div className="card">
          <h2 className="card-title" style={{ color: 'var(--secondary)' }}>
            <Info size={18} style={{ color: 'var(--secondary)' }} />
            <span>Detalles de Arquitectura</span>
          </h2>
          <p className="card-desc">
            Información del elemento seleccionado en el árbol del proyecto.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <span className="badge badge-primary" style={{ fontSize: '10px' }}>
                {nodeInfo[selectedNode].type}
              </span>
              <h3 style={{ fontSize: '20px', color: 'var(--text)', marginTop: '8px', fontFamily: 'var(--font-mono)' }}>
                {nodeInfo[selectedNode].name}
              </h3>
            </div>

            <div>
              <strong style={{ fontSize: '13px', color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Descripción:</strong>
              <p style={{ fontSize: '14px', color: 'var(--text)', marginTop: '6px', lineHeight: '1.5' }}>
                {nodeInfo[selectedNode].desc}
              </p>
            </div>

            <div className="alert alert-info details-panel" style={{ margin: '0' }}>
              <div>
                <strong style={{ fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>¿Por qué es importante?</strong>
                <p style={{ fontSize: '13px', color: '#cffafe', marginTop: '4px', lineHeight: '1.5' }}>
                  {nodeInfo[selectedNode].why}
                </p>
              </div>
            </div>

            {/* Code example if present */}
            {nodeInfo[selectedNode].code && (
              <div style={{ marginTop: '10px' }}>
                <strong style={{ fontSize: '13px', color: 'var(--secondary)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Código Típico de la carpeta:</strong>
                <CodeBlock code={nodeInfo[selectedNode].code} title={selectedNode === 'hooks' ? 'useToggle.js' : 'userService.js'} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
