import React from 'react'

function Filter({ filteredTodoList, removeTodo, editTodo }) {

  return (
    filteredTodoList.map((filteredTodo, index) => {
      return <div key={index} className="card mt-2" style={{ width: '18rem', backgroundColor: '#197d6c', borderRadius: '20px', fontFamily: 'monospace', color: '#c5f0e9' }}>
        <div className="card-body">
          <h5 className="card-text"> Name : {filteredTodo.name}</h5>
          <h5 className="card-text"> Description : {filteredTodo.description} </h5>
          <div className="row g-2">
            <div className="col-auto">
              <h5 className="card-text"> Status : </h5>
            </div>
            <div className="col-auto">
              <select className="form-select form-select-sm" aria-label="Small select example" value={filteredTodo?.status}>
                <option value={'Not Completed'}> Not Completed</option>
                <option value={'Completed'}>Completed</option>
              </select>
            </div>
          </div>
          <div className="row g-2 mt-1">
            <div className="col-auto">
              <button onClick={() => {
                editTodo(filteredTodo, index)
              }} type="button" className="btn btn-success">Update</button>
            </div>
            <div className="col-auto">
              <button onClick={() => {
                removeTodo(filteredTodo)
              }} type="button" className="btn btn-danger">Delete</button>
            </div>
          </div>
        </div>
      </div>
    })

  )
}


export default Filter