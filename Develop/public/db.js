let db;
let workoutVersion;

// Create a new db request for a "workout" database.
const request = indexedDB.open('WorkoutDB', workoutVersion || 21);

request.onupgradeneeded = function (e) {
  console.log('Upgrade needed in IndexDB');

  const { oldVersion } = e;
  const newVersion = e.newVersion || db.version;

  console.log(`DB Updated from version ${oldVersion} to ${newVersion}`);

  db = e.target.result;

  if (db.objectStoreNames.length === 0) {
    db.createObjectStore('WorkoutStore', { autoIncrement: true });
  }
};

request.onerror = function (e) {
  console.log(`Woops! ${e.target.errorCode}`);
};

function checkDatabase() {
  console.log('check db invoked');

  // Open a currentWorkout on the WorkoutStore
  let currentWorkout = db.currentWorkout(['WorkoutStore'], 'readwrite');

  // Access the WorkoutStore object
  const store = currentWorkout.objectStore('WorkoutStore');

  // Get all records from store and set to a variable
  const getAll = store.getAll();

  // If the request is successful...
  getAll.onsuccess = function () {
    // If there are workouts in the store, they need to be bulk added
    // when we are back online
    if (getAll.result.length > 0) {
      fetch('/api/workouts/bulk', {
        method: 'POST',
        body: JSON.stringify(getAll.result),
        headers: {
          Accept: 'application/json, text/plain, */*',
          'Content-Type': 'application/json',
        },
      })
      .then((response) => response.json())
      .then((res) => {
        // Open another currentWorkout to WorkoutStore with the ability to read and write
        currentWorkout = db.currentWorkout(['WorkoutStore'], 'readwrite');

        // Assign the current store to a variable
        const currentStore = currentWorkout.objectStore('WorkoutStore');

        // Clear existing entries because the buld add was successful
        currentStore.clear();
        console.log('Clearing store', currentStore.clear);
      });
    }
  }
};

request.onsuccess = function (e) {
  console.log('success');
  db = e.target.result;

  // Check if app is online before reading from db
  if (navigator.onLine) {
    console.log('Backend online! 🗄️');
    checkDatabase();
  }
};

const saveWorkout = (workout) => {
  console.log('Save workout invoked');
  // Create a transaction on the WorkoutStore db with readwrite access
  const currentWorkout = db.currentWorkout(['WorkoutStore'], 'readwrite');

  // Access your BudgetStore object store
  const store = currentWorkout.objectStore('WorkoutStore');

  // Add workout to your store with add method.
  store.add(workout);
};

// Listen for app coming back online
window.addEventListener('online', checkDatabase);