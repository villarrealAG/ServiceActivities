import { useState, useEffect } from 'react';
import axios from 'axios';
import {LineChart, Line, ResponsiveContainer, YAxis, XAxis, CartesianGrid, Tooltip} from 'recharts';
import './App.css';

function App() {

  const [cpuHistory, setCpuHistory] = useState(Array(20).fill({value: 0}));
  const [ramHistory, setRamHistory] = useState(Array(20).fill({value: 0}));
  const [gpuHistory, setGpuHistory] = useState(Array(20).fill({value: 0}));
  const [netHistory, setNetHistory] = useState(Array(20).fill({value: 0}));
  
  const [currentData, setCurrentData] = useState({
    cpu: 0,
    ram_percent: 0,
    ram_gb: 0,
    gpu: 0,
    gpu_temp: 0,
    net_down: 0,
    net_up: 0
  });

  const [selectedComponent, setSelectedComponent] = useState('CPU');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost/sistema-monitor/Backend/api/metrics.php');
        const data = response.data.data;

        if (data) {
          setCurrentData({
            cpu: data.cpu_percent,
            ram_percent: data.ram_percent,
            ram_gb: data.ram_gb_usados,
            gpu: data.gpu_percent,
            gpu_temp: data.gpu_temp,
            net_down: data.network_rx_kbps,
            net_up: data.network_tx_kbps
          });

          setCpuHistory(prev => {
            const newHistory = [...prev.slice(1), { value: data.cpu_percent }];
            return newHistory;
          });

          setRamHistory(prev => {
            const newHistory = [...prev.slice(1), { value: data.ram_percent }];
            return newHistory;
          });

          setGpuHistory(prev => {
            const newHistory = [...prev.slice(1), { value: data.gpu_percent }];
            return newHistory;
          });

          setNetHistory(prev => {
            const newHistory = [...prev.slice(1), { value: data.network_rx_kbps }];
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

  let mainGraphData = cpuHistory;
  let mainGraphColor = '#17a2b8';
  let yAxisDomain = [0, 100];
  let unit = '%';

  if (selectedComponent === 'Memoria') {
    mainGraphData = ramHistory;
    mainGraphColor = '#8b5cf6';
  } else if (selectedComponent === 'GPU') {
    mainGraphData = gpuHistory;
    mainGraphColor = '#10b981'; 
  } else if (selectedComponent === 'Red') {
    mainGraphData = netHistory;
    mainGraphColor = '#f59e0b'; 
    yAxisDomain = ['auto', 'auto']; 
    unit = ' KB/s';
  }

  return (
    <div className="monitor-container">
      <aside className="sidebar">
        <h2 className="sidebar-title">Rendimiento</h2>
        
        <div className="hardware-list">
          {/* Card de CPU */}
          <div className={`hardware-card ${selectedComponent === 'CPU' ? 'active' : ''}`} onClick={() => setSelectedComponent('CPU')}>
            <MiniGraph data={cpuHistory} color="#17a2b8" />
            <div className="hardware-info">
              <span className="hardware-name">CPU</span>
              <span className="hardware-stats">{currentData.cpu}%</span>
            </div>
          </div>

          {/* Card de Memoria */}
          <div className={`hardware-card ${selectedComponent === 'Memoria' ? 'active' : ''}`} onClick={() => setSelectedComponent('Memoria')}>
            <MiniGraph data={ramHistory} color="#8b5cf6" />
            <div className="hardware-info">
              <span className="hardware-name">Memoria</span>
              <span className="hardware-stats">{currentData.ram_gb} GB ({currentData.ram_percent}%)</span>
            </div>
          </div>

          {/* Card de GPU */}
          <div className={`hardware-card ${selectedComponent === 'GPU' ? 'active' : ''}`} onClick={() => setSelectedComponent('GPU')}>
            <MiniGraph data={gpuHistory} color="#10b981" />
            <div className="hardware-info">
              <span className="hardware-name">GPU</span>
              <span className="hardware-stats">{currentData.gpu}%</span>
            </div>
          </div>

          {/* Card de Red */}
          <div className={`hardware-card ${selectedComponent === 'Red' ? 'active' : ''}`} onClick={() => setSelectedComponent('Red')}>
            <MiniGraph data={netHistory} color="#f59e0b" />
            <div className="hardware-info">
              <span className="hardware-name">Red</span>
              <span className="hardware-stats">{currentData.net_down} KB/s</span>
            </div>
          </div>
        </div>
      </aside>
      
<main className="main-content">
        <h1>{selectedComponent}</h1>
        
        {/* Gráfica Principal Interactiva */}
        <div style={{ height: '300px', width: '100%', backgroundColor: '#111', padding: '15px', border: '1px solid #333', borderRadius: '4px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={mainGraphData}>

              <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
              <XAxis hide />
              <YAxis domain={yAxisDomain} stroke="#666" tick={{ fill: '#666', fontSize: 12 }} width={30} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#222', border: '1px solid #444', color: '#fff' }}
                itemStyle={{ color: mainGraphColor }}
                labelStyle={{ display: 'none' }}
              />
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke={mainGraphColor} 
                strokeWidth={2} 
                dot={false} 
                isAnimationActive={false} 
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Detalles numéricos inferiores */}
        <div style={{ display: 'flex', marginTop: '20px', gap: '40px', color: '#aaaaaa' }}>
          {selectedComponent === 'CPU' && (
            <div><p>Uso actual</p><h3 style={{ color: '#fff', fontSize: '1.5rem', fontWeight: '500' }}>{currentData.cpu}%</h3></div>
          )}
          {selectedComponent === 'Memoria' && (
            <>
              <div><p>En uso</p><h3 style={{ color: '#fff', fontSize: '1.5rem', fontWeight: '500' }}>{currentData.ram_gb} GB</h3></div>
              <div><p>Disponible</p><h3 style={{ color: '#fff', fontSize: '1.5rem', fontWeight: '500' }}>{(31.9 - currentData.ram_gb).toFixed(1)} GB</h3></div>
            </>
          )}
          {selectedComponent === 'GPU' && (
            <>
              <div><p>Utilización</p><h3 style={{ color: '#fff', fontSize: '1.5rem', fontWeight: '500' }}>{currentData.gpu}%</h3></div>
              <div><p>Temperatura</p><h3 style={{ color: '#fff', fontSize: '1.5rem', fontWeight: '500' }}>{currentData.gpu_temp}°C</h3></div>
            </>
          )}
          {selectedComponent === 'Red' && (
            <>
              <div><p>Recepción</p><h3 style={{ color: '#fff', fontSize: '1.5rem', fontWeight: '500' }}>{currentData.net_down.toFixed(1)} KB/s</h3></div>
              <div><p>Envío</p><h3 style={{ color: '#fff', fontSize: '1.5rem', fontWeight: '500' }}>{currentData.net_up.toFixed(1)} KB/s</h3></div>
            </>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;