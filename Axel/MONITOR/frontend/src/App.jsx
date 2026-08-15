import { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';

export default function App() {
  const [data, setData] = useState([]);
  const [isHistory, setIsHistory] = useState(false);

  // Polling en tiempo real
  useEffect(() => {
    if (isHistory) return;

    const interval = setInterval(async () => {
      try {
        const res = await fetch('http://127.0.0.1:8000/api/current');
        const metric = await res.json();
        const time = new Date().toLocaleTimeString();

        setData((prev) => {
          const updated = [...prev, { ...metric, time }];
          if (updated.length > 20) updated.shift();
          return updated;
        });
      } catch (err) {
        console.error("Error al obtener datos:", err);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [isHistory]);

  // Cargar historial desde SQLite
  const loadHistory = async () => {
    try {
      const res = await fetch('http://127.0.0.1:8000/api/history');
      const historyData = await res.json();
      
      const formatted = historyData.map((item) => ({
        ...item,
        time: item.timestamp ? item.timestamp.split(' ')[1] : ''
      }));

      setData(formatted);
      setIsHistory(true);
    } catch (err) {
      console.error("Error al cargar historial:", err);
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>Dashboard de Monitoreo de Hardware {isHistory ? '(Historial SQLite)' : '(En Vivo)'}</h1>
        <div>
          <button onClick={() => setIsHistory(false)} style={{ marginRight: '10px' }}>Ver En Vivo</button>
          <button onClick={loadHistory}>Cargar Historial</button>
        </div>
      </div>

      <div style={{ display: 'grid', gap: '20px', marginTop: '20px' }}>
        <div>
          <h3>Uso de CPU (%)</h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis domain={[0, 100]} />
              <Tooltip />
              <Line type="monotone" dataKey="cpu" stroke="#8884d8" isAnimationActive={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div>
          <h3>Uso de RAM (%)</h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis domain={[0, 100]} />
              <Tooltip />
              <Line type="monotone" dataKey="ram" stroke="#82ca9d" isAnimationActive={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div>
          <h3>Uso de Disco (%)</h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis domain={[0, 100]} />
              <Tooltip />
              <Line type="monotone" dataKey="disk" stroke="#ff7300" isAnimationActive={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}