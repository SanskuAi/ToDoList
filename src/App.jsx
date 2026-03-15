import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import { FaEdit } from "react-icons/fa";  // => FOR BEETER UI {ICON}
// import './App.css'
// const { v4 : uuidv4 } = required(
// 'uuid')
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [todo,setTodo] = useState("")
  const [todos , setTodos] =useState([])
  const [showFinished , setshowFinished] = useState(true)


  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if (todoString) {            //{todoString}=> NULL NAHI HAI TABHI YA CHALEGA 
      let todos = JSON.parse(localStorage.getItem("todos"))
      setTodos(todos)
      }
  } , [])

  // ___________________ -REFRASH KARNE KE  BAAD BHI DATA NAA HATE
  
 const saveToLS = (params) => {
  localStorage.setItem("todos" , JSON.stringify(todos))
}

  
  const toggleFinished = (e) => {
    setshowFinished (!showFinished)
  }
  
const handleEdit = ( e,id)=> {
    let t = todos.filter(i=>i.id === id)
    setTodo(t[0].todo)
    let newTodos = todos.filter(item => {
      return item.id!==id
    }) 
    setTodos(newTodos)
    saveToLS()   
  }

  const handleDelete = (e,id) =>{ 
let newTodos = todos.filter(item => {
  return item.id!==id
})
  
setTodos(newTodos)
saveToLS()
  }
  

  const handleAdd = () =>{
    setTodos([...todos , {id:uuidv4(), todo , isCompleted : false}])
    setTodo("")   
    console.log(todos)      
    saveToLS()                  
  }

  const handleChange = (e)=> {
    setTodo(e.target.value)
  }
const handleCheckbox = (e) => {
  console.log(e,e.target);
  
  let id =e.target.name 
  console.log(id);
  let index = todos.findIndex(item=> {
    return item.id ===id 
 
    
  })
  console.log(index);
  
  let newTodos= [...todos]
  newTodos[index].isCompleted = !newTodos[index].isCompleted // {!...}=> TRUE FALSE CONDATION HOGE
  setTodos(newTodos)

  saveToLS()
}


  return (
    <>
    <Navbar/>
    <div className='mx-3 md:container md:mx-auto my-5 rounded-xl p-5 bg-violet-200  min-h-[81vh] md:w-1/2'>
    <h1 className='font-bold text-center text-3xl' > iTask- Manage your todos at  one place</h1>
      <div className="addTodo my-5 flex flex-col gap-4">  
        <h2 className='text-lg font-bold  '>  Add a Todo</h2>

        <input onChange={handleChange} value={todo}  type="text" className='w-1/2 bg-white rounded-lg w-full rounded-full px-5 py-1.5' />
        <button onClick={handleAdd} disabled={todo.length<= 3} className='bg-violet-800 hover:bg-violet-950 px-2 py-1 text-sm font-bold text-white rounded-md  '> Add</button>
       
      </div>
 
      <input className='my-4' onChange={toggleFinished} type="checkbox" checked={showFinished} /> Show Finished
      <div className='h-[1px] bg-black w-[90%] mx-auto opacity-15 my-4 px-2' > </div>
    <h1 className='text-2xl font-bold'> Your Todo  </h1> 

     <div className=' todos'>  
{todos.length ===0 && <div className='m-5'> No ToDos to Display</div>}
      {todos.map(item=> {


 // md =>> for a mobile or any view user can see a clear WEB
      return ( showFinished || !item.isCompleted) &&<div key={item.id} className='md:todo flex w-1/2 my-3 justify-between'>    
      <input  name={item.id} type="checkbox" value={item.isCompleted}  onChange={handleCheckbox}  id=""  className='bg-white checked:yellow'/>
        <div className={item.isCompleted?" line-through" : ""}>{item.todo} </div>
        <div className='buttons  flex h-full'>
        <button onClick={(e) =>handleEdit(e,item.id) }
         className='bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-6'> 
         Edit</button>
        <button onClick={(e)=> {handleDelete(e,item.id)}}
         className='bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-6'>
             Delete</button>
        </div> 
      </div>
           })}  
    </div>
       <div className=''>  

                        </div> </div>
    </>
  )
}

export default App
