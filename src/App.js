import React from 'react';
import './App.css';
import { useState } from 'react';

function App() {
  const [toDos, settoDos] = useState([]);
  const [toDo, setToDo] = useState('');

  // Function to get formatted date and time
  const getCurrentDateTime = () => {
    const now = new Date();
    return now.toLocaleString(); // Returns the current date and time in local format
  };

  return (
    <div className="app">
      <div className="mainHeading">
        <h1>ToDo List</h1>
      </div>
      <div className="subHeading">
        <br />
        <h2>Whoop, it's Wednesday 🌝 ☕</h2>
      </div>
      <div className="input">
        <input
          value={toDo}
          onChange={(e) => setToDo(e.target.value)}
          type="text"
          placeholder="🖊️ Add item..."
        />
        <i
          onClick={() =>
            settoDos([
              ...toDos,
              { id: Date.now(), Text: toDo, status: false, dateTime: getCurrentDateTime() },
            ])
          }
          className="fas fa-plus"
        ></i>
      </div>
      <div className="todos">
        {toDos.map((obj) => {
          return (
            <div className="todo" key={obj.id}>
              <div className="left">
                <input
                  onChange={(e) => {
                    settoDos(
                      toDos.map((obj2) => {
                        if (obj2.id === obj.id) {
                          obj2.status = e.target.checked; // Update `status` correctly
                        }
                        return obj2;
                      })
                    );
                  }}
                  checked={obj.status} // Correctly bind `checked` for checkbox
                  type="checkbox"
                />
                <p
                  className={obj.status ? 'completed' : ''} // Apply 'completed' class if checked
                >
                  {obj.Text}
                </p>
                <span className="date-time">{obj.dateTime}</span>
              </div>
              <div className="right">
                <i
                  className="fas fa-times"
                  onClick={() => {
                    settoDos(toDos.filter((obj2) => obj2.id !== obj.id)); // Delete functionality
                  }}
                ></i>
              </div>
            </div>
          );
        })}

        {toDos.map((obj) => {
          if (obj.status) {
            return <h1 key={obj.id}>{obj.Text}</h1>; // Correctly display completed tasks
          }
          return null;
        })}
      </div>
    </div>
  );
}

export default App;
