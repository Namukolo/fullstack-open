import React from "react";

const Add = ({addNewName, newName, nameChange, newNumber, numberChange}) => {

    return(
        <form onSubmit={addNewName}>
        <div>
          name: <input value={newName} onChange={nameChange} />
        </div>
        <br />
        <div>
          number: <input value={newNumber} onChange={numberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form> 
    );
}

export default Add;