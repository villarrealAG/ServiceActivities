import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import ConditionalRendering from './pages/ConditionalRendering';
import ErrorHandling from './pages/ErrorHandling';
import LocalStorageDemo from './pages/LocalStorageDemo';
import RouterDemo from './pages/RouterDemo';
import FolderStructure from './pages/FolderStructure';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="conditional-rendering" element={<ConditionalRendering />} />
          <Route path="try-catch" element={<ErrorHandling />} />
          <Route path="local-storage" element={<LocalStorageDemo />} />
          <Route path="router-demo" element={<RouterDemo />} />
          <Route path="folder-structure" element={<FolderStructure />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
