import { useEffect, useState } from 'react';
import './App.css'

function Tasks() {

  const [tasks, setTasks] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch task data
  useEffect(() => {
    async function getTasks() {
      setIsLoading(true);
      setError(false);
      try {
        const res = await fetch(import.meta.env.VITE_URL);
        const json = await res.json();
        setTasks(json);
      } catch(err) {
        setError(err);
        console.error(err)
      } finally {
        setIsLoading(false);
      };    
    };

    getTasks();
  }, []);
  
  // Get the task name and change the task to be completed or not
  function handleClick(e) {
    const clicked = e.target.lastElementChild.innerHTML;
    const newTasks = tasks.map(task => {
      if (task.text === clicked) task.completed = !task.completed;
      return task;
    });
    setTasks(newTasks);
  }

  
  return (
    <>
      { isLoading && <h3>Loading...</h3> }
      { error && <h3>Error</h3> }

      { tasks &&
        <ul className='tasklist'>
          { tasks.map(task => ( 
            <li key={ task.id } onClick={ handleClick }>
              <div className={ `circle ${task.completed && 'completed'}` }></div>
              <div className={ `task ${task.completed && 'completed'}` }>{ task.text }</div>
            </li>
          ))}
        </ul>
      }
    </>
  )
};

function App() {


  return(
    <>
      <header>
        <h1>New App</h1>
      </header>

      <div className="main">
        <nav>
          <h2>Home</h2>
          <h2>Tasks</h2>
        </nav>
        
        <section>
          <h2>Task List</h2>
          <Tasks />
        </section>
      </div>
    
      <footer>
        
      </footer>
    </>
    
  )

};

export default App;