import React , { useState } from 'react';

export function AddTaskForm(props) {
  
  const {field, setterField, label} = props.propriete

  const [focus, setFocus] = useState(false);

  function verify(e) {
      e.target.value !== "" ? setFocus(true) : setFocus(false)
  }


  function handleAddTask(e) {
    setterField(e.target.value)
  }

  return (
    <div className='formField'>
      <input 
       value={field}
        type="text" 
        onFocus={ () => setFocus(true)}
        onBlur={(e) => verify(e)}
        onChange={(e) => handleAddTask(e)}
      />
      <label htmlFor="" className={focus ? 'formFieldFocus' : "" }>{label}</label>
    </div>
  );
}
