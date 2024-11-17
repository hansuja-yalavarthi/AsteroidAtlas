document.getElementById('asteroidForm').addEventListener('submit', function (e) {
  e.preventDefault();

  // Get the form input values
  const name = document.getElementById('name').value;
  const date = document.getElementById('date').value;
  const velocity = parseFloat(document.getElementById('velocity').value);
  const size = parseFloat(document.getElementById('size').value);
  const angle = parseFloat(document.getElementById('angle').value);

  // Define the danger algorithm (you can adjust these thresholds)
  const velocityThreshold = 25; // km/s (high velocity is more dangerous)
  const sizeThreshold = 500; // meters (bigger size is more dangerous)
  const angleThreshold = 30; // degrees (steeper angle means more likely to hit Earth)

  // Danger prediction algorithm
  let dangerLevel = 'Safe';

  if (velocity > velocityThreshold && size > sizeThreshold && angle < angleThreshold) {
    dangerLevel = 'Dangerous';
  } else if (velocity > velocityThreshold || size > sizeThreshold) {
    dangerLevel = 'Potentially Dangerous';
  }

  // Output the result
  document.getElementById('predictionResult').innerText = `Asteroid ${name} is predicted to be: ${dangerLevel}`;
});
