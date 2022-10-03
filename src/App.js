import React , { useState } from 'react';
import './Assets/Styles/global.css';
import './Assets/Styles/app.css';
import { AddTaskForm } from './Components/AddTaskForm';
import { Delete, Edit, Plus, Done, RemoveDone, Update, Cancel, IconDate } from './Assets/Icons/iconsActions';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {

  const [tasks, setTasks] = useState(localStorage.getItem('tasksTable') ? JSON.parse(localStorage.getItem("tasksTable")) : "")

  const [task , setTask] = useState("")

  const [taskUpdate , setTaskUpdate] = useState('')

  const [showInputEdit, setShowInputEdit] = useState(false)

  function addTask(task) {
    const copy = [...tasks]
    if (task !== "") {
      copy.push({nom : task, etat: 'unDone', time: new Date().toLocaleString()})
      setTasks(copy)
      localStorage.setItem("tasksTable", JSON.stringify(copy))
      setTask("")
    } else {
      toast.error('Vous devez remplir le Champs')
    }
  }
  
  function deleteTask(index) {
    const copy = [...tasks];
    copy.splice(index, 1);
    localStorage.setItem('tasksTable', JSON.stringify(copy));
    setTasks(copy);
  }

  function handleEdit(tak,index) {
    setTaskUpdate(tak.nom)
    setShowInputEdit(index + 'true')
  }

  function handleUpdate(taskUpdate, index) {

    const copy = [...tasks]
    if(taskUpdate.length > 0) {
      copy[index].nom = taskUpdate;
      copy[index].time = ('Dernière modification: ' + new Date().toLocaleString())
      localStorage.setItem('tasksTable', JSON.stringify(copy));
      setTasks(copy);
      setTaskUpdate("");
      setShowInputEdit(false)
    } else {
      setTaskUpdate(copy[index].nom);
      toast.error("Le champs ne doit pas etre vide, supprimer la tache dans ce cas")
    }
  }

  function handleDone(index) {
    const copy = [...tasks]
    copy[index].etat = "Done"
    localStorage.setItem('tasksTable', JSON.stringify(copy));
    setTasks(copy)
  }

  function handleRemoveDone(index) {
    const copy = [...tasks]
    copy[index].etat = "unDone"
    localStorage.setItem('tasksTable', JSON.stringify(copy));
    setTasks(copy)
  }

  function handleSupTasks() {
    localStorage.removeItem('tasksTable')
    setTasks("")
  }

  return (
    <div className="App">
      <div className='todoHome'>
        <div className='todoGestionnaire'>
          <h1>Gestionnaire de tache</h1>
          <div
            className='addTaskForm'
          >
            <AddTaskForm 
              propriete={{field : task,
                setterField : setTask, 
                label : 'Ajouter une Tache',
                // setTime: setCurrentDate
              }}
            />

            <button 
              onClick={() => {
                addTask(task)
              }}
            >
              <Plus />
            </button>
          </div>
          <div className='tasksTables'>
            {tasks && tasks.length > 0 ? tasks.map((tak, index) =>
              <div 
                key={'Index de chaque tache' + index}
                className='taskHome'
              >
                <div className='taskHomeDate'>
                 <IconDate />
                 <span>{tak.time}</span>
                </div>
                
                <div className='taskHomeTask'>

                  <span className='taskHomeTaskInput'>{ tak.nom }</span> 

                  <div className='taskHomeTaskIcons'>

                    {tak.etat === "Done" ? 
                      <button onClick={() => handleRemoveDone(index)} className="btnRemoveDone"><RemoveDone /></button> : 
                      <button onClick={() => handleDone(index)}><Done /></button>
                    }
 
                    {tak.etat !== "Done" ?
                      <button 
                        onClick={() => handleEdit(tak, index)} className="btnEdit"
                      >
                      <Edit />
                    </button> : "" 
                    }

                    <button 
                      onClick={ () => deleteTask(index)} className="btnDelete"
                    >
                      <Delete />
                    </button>
                  </div>
                </div>

                {showInputEdit && showInputEdit === index + "true" ? 

                <div className='updateField'>
                    <input 
                      value={taskUpdate}
                      type="text" 
                      className='upadateFieldInput'
                      onChange={(e) => setTaskUpdate(e.target.value)}
                    />
                    <div className='updateFieldBtn'>
                      <button onClick={() => handleUpdate(taskUpdate, index)}><Update /></button>
                      <button onClick={() => setShowInputEdit(false)}><Cancel /></button>
                    </div>
                </div> : "" }
              </div>) : "Pas de tache en vue"} 
          </div>

          <button onClick={handleSupTasks} className='btnAllDeleted'>Tous supprimer</button>
        </div>
        <ToastContainer />
      </div>
    </div>
  );
}

export default App;
