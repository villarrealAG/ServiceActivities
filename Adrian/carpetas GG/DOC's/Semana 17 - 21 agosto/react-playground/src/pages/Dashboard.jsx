import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ToggleLeft, 
  ShieldAlert, 
  Database, 
  Route as RouteIcon, 
  FolderTree,
  ArrowRight,
  Flame
} from 'lucide-react';

export default function Dashboard() {
  const navigate = useNavigate();

  const cards = [
    {
      title: 'Renderizado Condicional en JSX',
      desc: 'Aprende a mostrar u ocultar interfaces dinámicamente usando sentencias "if", el operador ternario, y el cortocircuito lógico "&&".',
      icon: <ToggleLeft size={24} style={{ color: 'var(--primary)' }} />,
      route: '/conditional-rendering',
      badge: 'Básico'
    },
    {
      title: 'Manejo de Errores (Try / Catch)',
      desc: 'Simula llamadas a APIs con latencia y maneja errores de red o servidor. Observa cómo cambian los estados de cargando, éxito y error.',
      icon: <ShieldAlert size={24} style={{ color: 'var(--primary)' }} />,
      route: '/try-catch',
      badge: 'Intermedio'
    },
    {
      title: 'localStorage vs useState',
      desc: 'Compara el estado en memoria volátil contra la persistencia en disco del navegador. Pon a prueba la lista recargando la página.',
      icon: <Database size={24} style={{ color: 'var(--primary)' }} />,
      route: '/local-storage',
      badge: 'Intermedio'
    },
    {
      title: 'Navegación con React Router',
      desc: 'Entiende qué es una Single Page Application (SPA). Experimenta la gran diferencia entre usar etiquetas <a> y el componente <Link>.',
      icon: <RouteIcon size={24} style={{ color: 'var(--primary)' }} />,
      route: '/router-demo',
      badge: 'Esencial'
    },
    {
      title: 'Estructura de Carpetas Real',
      desc: 'Navega en un árbol de directorios interactivo que simula un proyecto real. Descubre por qué organizar en pages/, components/ y hooks/ es crucial.',
      icon: <FolderTree size={24} style={{ color: 'var(--primary)' }} />,
      route: '/folder-structure',
      badge: 'Arquitectura'
    }
  ];

  return (
    <div style={{ textAlign: 'left' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
        <Flame size={40} style={{ color: 'var(--primary)' }} />
        <h1>React Core Concepts Hub</h1>
      </div>
      <p className="page-description">
        Bienvenido al laboratorio de aprendizaje interactivo de React. Cada sección contiene ejemplos prácticos, explicaciones claras del código, y paneles de juego interactivos donde puedes experimentar los cambios de estado en tiempo real.
      </p>

      <div className="alert alert-info" style={{ marginBottom: '32px' }}>
        <strong>¡Tip para estudiantes!</strong> Presta atención a la barra lateral izquierda: hay un contador de "Cargas Reales (F5)" que registra si el navegador recarga el sitio web completo por accidente. ¡Debería mantenerse estable mientras navegas por aquí!
      </div>

      <h2 style={{ marginBottom: '20px', color: 'var(--text)' }}>Módulos de Aprendizaje</h2>
      
      <div className="dashboard-grid">
        {cards.map((c, i) => (
          <div key={i} className="card dashboard-card">
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  {c.icon}
                  <span style={{ fontSize: '12px', fontWeight: 'bold' }} className="badge badge-secondary">{c.badge}</span>
                </div>
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: '600', color: 'var(--text)', marginBottom: '8px' }}>{c.title}</h3>
              <p className="card-desc" style={{ marginBottom: '0' }}>{c.desc}</p>
            </div>
            
            <button 
              className="btn btn-secondary dashboard-card-btn"
              onClick={() => navigate(c.route)}
            >
              <span>Explorar Laboratorio</span>
              <ArrowRight size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
