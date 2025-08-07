import React, { useState } from 'react';
import Chips from './components/Chips';
import './App.css';

const chipsData = Array.from({ length: 20 }, (_, i) => ({
  id: `chip-${i + 1}`,
  label: `Чипс ${i + 1}`,
}));

const App: React.FC = () => {
  const [selectedId, setSelectedId] = useState<string>();

  return (
    <div className='container'>
      <Chips chips={chipsData} selectedId={selectedId} onSelect={setSelectedId} />
    </div>
  );
};

export default App;