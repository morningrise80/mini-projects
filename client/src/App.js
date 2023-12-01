import React from 'react';
import { useStepTracker } from './useStepTracker';
 
function StepTracker() {
  const { steps, incrementSteps } = useStepTracker(0);
 
  return (
    <div>
      <h1>Fitness Tracker</h1>
      <p>Steps Today: {steps}</p>
      <button onClick={incrementSteps}>Add Step</button>
      {steps >= 10 && <p>You've reached your step goal!</p>}
    </div>
  );
}
 
export default StepTracker;