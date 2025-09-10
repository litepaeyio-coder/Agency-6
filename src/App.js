import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AgencyPortfolio from './components/AgencyPortfolio';
const AdminPanel = lazy(() => import('./components/AdminPanel'));

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AgencyPortfolio />} />
        <Route
          path="/admin/*"
          element={
            <Suspense fallback={<div className="skeleton h-64 w-full" />}>
              <AdminPanel />
            </Suspense>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
