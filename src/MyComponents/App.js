// import logo from './logo.svg';
import './App.css';
import Header from "./Header";
import {Todos} from "./Todos";
import {Footer} from "./Footer";
import {AddTodo} from "./AddTodo";
import React,{ useState,useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import {About} from "./About";
function App() {
  let initTodo;
  if(localStorage.getItem("todos")===null){
    initTodo=[];
  }
  else{
    initTodo = JSON.parse(localStorage.getItem("todos"));
  }
  const onDelete = (todo)=>{
    // console.log("I am ondelete of todo",todo);
    // Deleting this way in react does not work
    // let index = todos.indexOf(todo);
    // todos.splice(index,1);
    setTodos(todos.filter((e)=>{
      return e!==todo;
    }))
    localStorage.setItem("todos",JSON.stringify(todos));
  }

  const addTodo = (title,desc) =>{
    // console.log("I am adding this todo",title,desc);
    let sno=0;
    if(todos.length!=0)
    sno = todos[todos.length-1].sno+1;
    const myTodo = {
      sno:sno,
      title:title,
      desc:desc,
    }
    setTodos([...todos,myTodo]);
    // console.log(myTodo);
    
  }
  const [todos,setTodos] =useState(initTodo);
  useEffect(() => {
    localStorage.setItem("todos",JSON.stringify(todos));
  },[todos])

  return (
    <div>
      <Router>
      <Header title="My Todos List" searchBar={false}/>
      <Routes>
          <Route path="/" element = {
            
              <>
                  <AddTodo addTodo={addTodo} />
                  <Todos todos={todos} onDelete={onDelete}/>
              </>
            
          }>
          </Route>
          {/* <Route path="/" element={<AddTodo addTodo={addTodo} /> } exact /> */}
          {/* <Route path="/" element={<Todos todos={todos} onDelete={onDelete}/> } exact /> */}
          <Route path="/about" element={<About />}></Route>
        </Routes>
      <Footer />
      </Router>
    </div>
  );
}

export default App;
