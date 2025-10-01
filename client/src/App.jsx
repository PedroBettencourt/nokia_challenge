import { useEffect, useState } from 'react';
import './App.css'


function Task({ task, tasks, setTasks }) {

  const [edit, setEdit] = useState(false);
  const [input, setInput] = useState(task.text);

  // Change the task to be completed or not
  function handleClick() {
    const newTasks = tasks.map(item => {
      if (item.id === task.id) return {...item, completed: !item.completed};
      return item;
    })
    setTasks(newTasks);
  }

  function handleEdit(e){
    e.stopPropagation();
    setEdit(!edit);
  }

  function handleInput(e) {
    setInput(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    const newTasks = tasks.map(item => {
      if (item.id === task.id) return {...item, text: input};
      return item;
    })
    setTasks(newTasks);
    setEdit(false);
  }


  if (!edit) return (
    <li id={ task.id } onClick={ handleClick } className='items'>
      <div  className={ `circle ${task.completed && 'completed'}` }></div>
      <div className={ `task ${task.completed && 'completed'}` }>{ task.text }</div>
      <button onClick={ handleEdit }>Edit</button>
    </li>
  )

  if (edit) return (
    <li>
      <form onSubmit={ handleSubmit } className='items'>
        <input className='task' type="text" name='text' value={ input } onChange={ handleInput }/>
        <button type="submit">Save</button>
        <button type="button" onClick={ handleEdit }>Cancel</button>
      </form>
    </li>
  )
}

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
  
  return (
    <>
      { isLoading && <h3>Loading...</h3> }
      { error && <h3>Error</h3> }

      { tasks &&
        <ul className='tasklist'>
          { tasks.map(task => ( 
            <Task key={task.id} task={ task } tasks={ tasks} setTasks={ setTasks } />
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