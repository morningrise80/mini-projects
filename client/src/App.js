import React, { useState, useEffect } from 'react';

// Functional component
const App = () => {
  const [exercises, setExercises] = useState([]); // State for exercises

  // Helper function to fetch exercises
  const fetchExercises = async () => {
    try {
      const response = await fetch('/api/exercises');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setExercises(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // Fetch exercises from API
  useEffect(() => {
    fetchExercises();
  }, []);

  // Event handler for refreshing exercises
  const handleRefresh = () => {
    fetchExercises();
  };

  return (
    <div>
      <h1>Exercise List</h1>
      <button onClick={handleRefresh}>Refresh</button>
      <ul>
        {exercises.map(exercise => (
          <li key={exercise.id}>{exercise.name}</li>
        ))}
      </ul>

      <PropsAndStateExample title="Props and State Example" />
    </div>
  );
};

export default App;
