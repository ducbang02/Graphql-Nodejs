// App.js

import React from 'react';
import Authors from './components/Authors'; // Import component Authors

function App() {
  return (
    <div>
      <h1>Danh sách tác giả</h1>
      <Authors /> {/* Sử dụng component Authors ở đây để hiển thị danh sách tác giả. */}
      
      {/* ... Phần còn lại của App component ... */}
    </div>
  );
}

export default App;
