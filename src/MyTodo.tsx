import { useState } from 'react';
import './MyTodo.scss';

const initTodos = [
  { id: 1, title: "과제", done: false },
  { id: 2, title: "시험공부", done: false },
  { id: 3, title: "코딩훈련", done: false }
];

const MyTodo = () => {
  const [todos, setTodos] = useState(initTodos);
  const [title, setTitle] = useState('');
  const addTodo = () => {
    const n = todos.length;
    const id = n==0 ? 1 : todos[n-1].id + 1;
    setTodos([...todos, {id, title, done: false}]);
    setTitle('');
  }
  const deleteTodo = (id: number) => {
    if (confirm("삭제하시겠습니까?"))
      setTodos(todos.filter(t => t.id != id));
  }
  const toggleTodo = (id: number) =>  // immutable 하게 done 속성값을 변경해서 set 한다.
    setTodos(todos.map(todo => todo.id==id ? {...todo, done: !todo.done} : todo));
  return (
    <div id='MyTodo'>
      <h1>할 일</h1>
      <table>
        <thead>
          <tr><td>ID</td><td>할일</td></tr>
        </thead>
        <tbody>
          {todos.map(({id, title, done}) => <tr key={id} className={done ? 'gray' : ''}>
            <td>{id}</td><td>
              <input type="checkbox" checked={done} onChange={()=>toggleTodo(id)} />
              {title}<span onClick={()=>deleteTodo(id)}>x</span></td></tr>)}
        </tbody>
      </table>
      <input type="text" onChange={e=>setTitle(e.target.value)} value={title}
        placeholder="할일을 입력하세요" />
      <button type="button" onClick={()=>addTodo()}>추가</button>
    </div>);
}
export default MyTodo;
