import "bootstrap/dist/css/bootstrap.min.css"
import { Formik, useFormik } from "formik"
import { useState } from "react"
import Filter from "./Filter"
import './App.css';

function App() {

  let [list, setList] = useState([
    {
      name: "Exercise",
      description: "Exercise for 15 mins",
      status: "Not Completed",
    },
    {
      name: "Read Book",
      description: "Read book for 20 mins",
      status: "Completed",
    },
  ])

  let [filterValue, setFilterValue] = useState('All')

  let filteredTodoList = list.filter((todo) => {
    if (filterValue === 'Not Completed') {
      return todo.status === 'Not Completed'
    } else if (filterValue === 'Completed') {
      return todo.status === 'Completed'
    } else {
      return todo
    }
  })

  let handleSubmit = (values) => {
    setList([...list, values]);
  }


  let removeTodo = ((clickedTodo) => {
    let index = list.findIndex(eachlist => eachlist.name === clickedTodo.name)
    if (index != -1) {
      list.splice(index, 1)
      setList([...list])
    }
  })

  let editTodo = ((clickedTodo, index) => {
    setList(prev => {
      return prev?.map((item, i) => {
        return i === index ? { ...item, status: item?.status === "Completed" ? "Not Completed" : "Completed" } : item
      })
    })
  })

  let onFilterValueChanged = ((filteredValue) => {
    setFilterValue(filteredValue)

  })

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      status: "Not Completed",
    },

    onSubmit: (values) => {
      handleSubmit(values)
    }
  })


  return (
    <>
      <div className="background-image"></div>
      <div className='container-fluid'>
        <div className="row">
          <div className="heading">
            <nav className="bg-body-tertiary">
              <h1 className="heading" style={{ textAlign: "center" }}> MY TODO </h1>
            </nav>
          </div>
        </div>
        <div>
          <form className="row g-3 mt-2" onSubmit={formik.handleSubmit}>
            <div className="col-3">
              <input type="text" className="form-control" placeholder="ToDo Name"
                name='name' value={formik.values.name} onChange={formik.handleChange} />
            </div>
            <div className="col-5">
              <input type="text" className="form-control" placeholder="Description"
                name='description' value={formik.values.description} onChange={formik.handleChange} />
            </div>
            <div className="col-auto">
              <button type="submit" className="btn btn-success mb-3">Add ToDo</button>
            </div>
          </form>
        </div>
        <div>
          <nav className="navbar bg-body-tertiary cover">
            <div className="container-fluid">
              <span className="navbar-text">
                <h2 style={{ color: '#dbb004', fontWeight: 'bolder' }}>ToDo's</h2>
                <select className="form-select form-select-sm" aria-label="Small select example"
                  onChange={e => { onFilterValueChanged(e.target.value) }}>
                  <option value={'All'}>All</option>
                  <option value={'Not Completed'}> Not Completed</option>
                  <option value={'Completed'}>Completed</option>
                </select>
              </span>
            </div>
          </nav>
        </div>
        <div className="d-flex flex-wrap justify-content-evenly">
          <Filter filteredTodoList={filteredTodoList} removeTodo={removeTodo} editTodo={editTodo} />
        </div>
      </div>
    </>
  )
}

export default App
