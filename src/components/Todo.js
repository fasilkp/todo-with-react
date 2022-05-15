import {useState} from 'react'
function Todo() {
    const [todo, setTodo]=useState('')
    const [todos, setTodos]=useState([])
    const deleteItem = key =>{
        console.log(key);
        const allTodos = todos
        allTodos.splice(key, 1)
        setTodos([...allTodos])
    }
    return (
        <section class="section-1">
            <div className="container">
            <div className="heading">
                <h3>TodoApp</h3>
            </div>
            
                <form onSubmit={(e)=>{
                    e.preventDefault();
                    setTodos([...todos, todo])
                    setTodo('')
                    }} className="input-sec">
                    <input type="text" value={todo} name="content" onChange={(e)=>{setTodo(e.target.value)}} id="item" className="input-col" placeholder="Enter Something..." autofocus />
                    <button type='submit' className="enter">Enter</button>
                </form>
            
            <div className="output-sec">
                <div className="menu"><div>My Todos</div><a href="#" onClick={(e)=>{setTodos([])}}>Delete All</a></div>
                {   todos.map((items, index)=>
                        <div className="out"><div className="content"  key={index}>{items}</div><button onClick={()=> deleteItem(index)} className="deleteBox"><i className="fas fa-trash-alt" id="deleteBtn"></i></button></div>
                    )
                }
                
            </div>
            </div>
        </section>
    )
}

export default Todo
