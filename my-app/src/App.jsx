import { useState ,useEffect } from 'react'
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import './App.css'

function App() {
  const [todo, settodo] = useState("");
  const [todos, settodos] = useState([]);
  const [showfinished, setshowfinished] = useState(true)
  
  const handleedit = (e,id) => {
      let t=todos.filter(i=>i.id===id);
      settodo(t[0].todo);
      let newtodos=todos.filter(item=>{
        return item.id!==id
      });
      settodos(newtodos)
  }
  useEffect(() => {
    let todosstring=localStorage.getItem("todos");
    if(todosstring){
      let todos=JSON.parse(localStorage.getItem("todos"));
      settodos(todos)
    }
  }, [])

  const handletoggle = (e) => {
    setshowfinished(!showfinished)
  }
  
  
  const savetoLS = (params) => {
    localStorage.setItem("todos",JSON.stringify(todos));
  }


  const handlechange = (e) => {
    settodo(e.target.value)
    
  }

  const handleadd = () => {
    settodos([...todos, {id:uuidv4(), todo, isCompleted: false }])
    settodo("")
    savetoLS();
  }

  const handledelete = (e,id) => {
     let newtodos=todos.filter(item=>{
      return item.id!=id
     })
     settodos(newtodos)
     savetoLS();
  }

  const handlecheckbox=(e) =>{
    console.log(e,e.target);
    let id =e.target.name;
    let index= todos.findIndex(item=>{
      return item.id===id;
    })
    let newtodos=[...todos];
    newtodos[index].isCompleted=!newtodos[index].isCompleted;
    settodos(newtodos)
    savetoLS();
  }

  return (
    <>
      <Navbar/>
      <div className="mx-3 md:container md:mx-auto rounded-xl p-5 bg-violet-100 my-5 min-h-screen md:w-1/2 ">
      <h1 className="font-bold text-center text-xl">iTask manage your tasks at one place</h1>
        <div className="addtodo flex flex-col gap-4 my-2">
          <h2 className="font-bold">Add a todo</h2>
          <input onChange={handlechange} value={todo} type="text" className='bg-white mx-auto w-full rounded-lg px-5 py-2' />
          <button onClick={handleadd} disabled={todo.length<=3} className='p-2 py-1  cursor-pointer bg-violet-800 hover:bg-violet-950 text-sm disabled:bg-violet-500 text-white rounded font-bold '>Save</button>
        </div>
        <input type="checkbox" onChange={handletoggle}  checked={showfinished} />
        <label className='mx-2' htmlFor="show">Show Finished</label>
        <div className="w-[90%] h-[1px] bg-black opacity-15 mx-auto my-2"><hr /></div>
        <h1 className="font-bold text-2xl">Your Todos</h1>
        <div className="todos">
          {todos.length===0 &&<div className='mx-5'>No Todos to display</div>}
          {todos.map((item) => {
            return (showfinished || !item.isCompleted)&&(
              <div key={item.id} className="todo flex md:w-full  my-3 justify-between items-center">
              <div className="flex items-center gap-3">
                <input onChange={handlecheckbox} type="checkbox" checked={item.isCompleted} name={item.id} id="" />
                <div className={item.isCompleted ? "line-through" : ""}>{item.todo}</div>
                </div>
                <div className="button flex h-full">
                  <button className='p-4 py-2 cursor-pointer bg-violet-800 hover:bg-violet-950 text-sm text-white rounded font-bold mx-1'  onClick={(e)=>handleedit(e,item.id)}><FaEdit /> </button>
                  <button className='p-4 py-2 cursor-pointer bg-violet-800 hover:bg-violet-950 text-sm text-white rounded font-bold mx-1' onClick={(e)=>handledelete(e,item.id)}><MdDelete /> </button>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}

export default App
