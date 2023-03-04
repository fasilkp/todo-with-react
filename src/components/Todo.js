import { useState, useRef, useEffect } from "react";
function Todo() {
    const [todo, setTodo] = useState({value:"", completed:false});
    const [todos, setTodos] = useState([]);
    const focusInput = useRef();
    const deleteItem = (key) => {
        if (window.confirm("are you sure delete this item form todo")) {
            console.log(key);
            const allTodos = todos;
            allTodos.splice(key, 1);
            setTodos([...allTodos]);
            localStorage.setItem("todoData", JSON.stringify([...allTodos]));
        }
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        setTodos([...todos, todo]);
        setTodo({value:"", completed:false});
        localStorage.setItem("todoData", JSON.stringify([...todos, todo]));
    };
    const updateTodo = (e, index) => {
        let tempTodo = todos;
        tempTodo[index].completed = e.target.checked;
        setTodos([...tempTodo]);
        localStorage.setItem("todoData", JSON.stringify(tempTodo));
    };
    const deleteAll = (e, index) => {
        if(window.confirm("Are you sure delete all items")){
            setTodos([])
        }
    };
    useEffect(() => {
        if (localStorage.getItem("todoData")) {
            setTodos(JSON.parse(localStorage.getItem("todoData")));
        }
        focusInput.current.focus();
    }, []);
    return (
        <section className="section-1">
            <div className="container">
                <div className="row head">
                    <h2>TODO APP</h2>
                </div>
                <div className="row">
                    <form onSubmit={handleSubmit} className="input-box">
                        <input
                            type="text"
                            placeholder="Enter Item to do"
                            value={todo.value}
                            ref={focusInput}
                            onChange={(e) => {
                                setTodo({ value: e.target.value, completed: false });
                            }}
                        />
                        <button type="submit">Add</button>
                    </form>
                </div>
                <div className="row">
                    {todos.map((item, index) => {
                        return (
                            <label htmlFor={"item" + index} className={item.completed ? "item completed" : "item"} key={index}>
                                <b style={{
                                        textDecoration: item.completed ? "line-through" : "none",
                                    }}>
                                    <input
                                        type="checkbox"
                                        id={"item" + index}
                                        checked={item.completed}
                                        onChange={(e) => updateTodo(e, index)}/>
                                    {item.value}
                                </b>
                                <i
                                    className="fas fa-trash"
                                    id="deleteBtn"
                                    onClick={() => deleteItem(index)}
                                ></i>
                            </label>
                        );
                    })}
                </div>
                <div className="row">
                    <button onClick={deleteAll} disabled={todos[0] ? false : true}>Clear all</button>
                </div>
            </div>
        </section>
    );
}

export default Todo;
