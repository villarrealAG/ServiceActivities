import { useState, useEffect } from 'react';
import axios from 'axios';
import {LineChart, Line, ResponsiveContainer, YAxis} from 'recharts';
import './App.css';

function App() {

  const [cpuHistory, setCpuHistory] = useState(Array(20).fill({value: 0}));
  const [ramHistory, setRamHistory] = useState(Array(20).fill({value: 0}));
  
  const [currentData, setCurrentData] = useState({
    cpu: 0,
    ram_percent: 0,
    ram_gb: 0
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost/sistema-monitor/Backend/api/metrics.php');
        const data = response.data.data;

        if (data) {
          setCurrentData({
            cpu: data.cpu_percent,
            ram_percent: data.ram_percent,
            ram_gb: data.ram_gb_usados
          });

          setCpuHistory(prev => {
            const newHistory = [...prev.slice(1), { value: data.cpu_percent }];
            return newHistory;
          });

          setRamHistory(prev => {
            const newHistory = [...prev.slice(1), { value: data.ram_percent }];
            return newHistory;
          });
        }
      } catch (error) {
        console.error("Error al obtener datos: ", error);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 2000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const MiniGraph = ({ data, color }) => (
    <div className="mini-graph-placeholder" style={{ backgroundColor: '#111', padding: '2px' }}>
      <LineChart width={54} height={34} data={data}>
        {/* Fijamos el eje Y de 0 a 100 */}
        <YAxis domain={[0, 100]} hide={true} />
        <Line 
          type="monotone" 
          dataKey="value" 
          stroke={color} 
          strokeWidth={1.5} 
          dot={false} 
          isAnimationActive={false} 
        />
      </LineChart>
    </div>
  );

  return (
    <div className="monitor-container">
      <aside className="sidebar">
        <h2 className="sidebar-title">Rendimiento</h2>
        
        <div className="hardware-list">
          {/* Card de CPU */}
          <div className="hardware-card active">
            <MiniGraph data={cpuHistory} color="#17a2b8" />
            <div className="hardware-info">
              <span className="hardware-name">CPU</span>
              <span className="hardware-stats">{currentData.cpu}%</span>
            </div>
          </div>

          {/* Card de Memoria */}
          <div className="hardware-card">
            <MiniGraph data={ramHistory} color="#8b5cf6" />
            <div className="hardware-info">
              <span className="hardware-name">Memoria</span>
              <span className="hardware-stats">{currentData.ram_gb} GB ({currentData.ram_percent}%)</span>
            </div>
          </div>
        </div>
      </aside>

      <main className="main-content">
        <h1>CPU</h1>
        <div className="main-graph-placeholder">
           <p>Selecciona un componente a la izquierda para ver el detalle completo (Próximamente)</p>
        </div>
      </main>
    </div>
  );
}

export default App;