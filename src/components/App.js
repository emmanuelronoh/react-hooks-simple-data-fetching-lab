// src/App.js
import React, { useEffect, useState } from 'react';

const App = () => {
  const [dogImage, setDogImage] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDogImage = async () => {
      const response = await fetch('https://dog.ceo/api/breeds/image/random');
      const data = await response.json();
      setDogImage(data.message);
      setLoading(false);
    };

    fetchDogImage();
  }, []);

  return (
    <div>
      {loading ? <p>Loading...</p> : <img src={dogImage} alt="A Random Dog" />}
    </div>
  );
};

export default App;
