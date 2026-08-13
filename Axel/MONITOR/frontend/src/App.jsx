import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';

export default function App() {
  // Datos iniciales de prueba para maquetar la interfaz
  const [data, setData] = useState([
    { time: '12:00:00', cpu: 20, ram: 45, disk: 60 },
    { time: '12:00:03', cpu: 35, ram: 48, disk: 60 },
  ]);

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Dashboard de Monitoreo de Hardware</h1>

      <div style={{ display: 'grid', gap: '20px' }}>
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