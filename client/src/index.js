import React from 'react';
import { createRoot } from 'react-dom/client'; // Thay đổi import này
import App from './App';

const root = createRoot(document.getElementById('root'));
root.render(<App />);