import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const Landing = lazy(() => import('./features/Landing'));

const pageLoading = '';

function App() {
  return (
    <Suspense fallback={pageLoading}>
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
        </Routes>
      </Router>
    </Suspense>
  );
}

export default App;
