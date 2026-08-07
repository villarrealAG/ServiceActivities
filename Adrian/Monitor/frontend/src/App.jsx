import React from 'react';
import './App.css';

function App() {
  const base_url = 'http://localhost:5000';
  return (
    <div className="monitor-container">
    {/*Panel lateral*/}
      <aside clasName="sidebar">
        <h2 className='sidebar-title'> Rendimiento</h2>

        <div className='Hardware-list'>
          <div className='hardware-card'>
            <div className='mini-graph-placeholder'></div>
            <div className='hardware-info'>
              <span className='hardware-name'>CPU</span>
              <span className='hardware-stats'>0% 0.00 GHz</span>
            </div>
          </div>

          <div className='hardware-card'>
            <div className='mini-graph-placeholder'></div>
            <div className='hardware-info'>
              <span className='hardware-name'>Memoria</span>
              <span className='hardware-stats'>0.0/31.9 GB (0%)</span>
            </div>
          </div>
        </div>
      </aside>

      <main className='main-content'>
        <h1>CPU</h1>
        <div className='main-graph-placeholder'>
          <p>Grafica completa proximamente...</p>
        </div>
      </main>
    </div>
  );
}

export default App;