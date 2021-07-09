import React, { useState, useEffect } from 'react';
import { hot } from 'react-hot-loader/root';

import PageLayout from 'layouts/Page';
import styles from './index.css';
import { useTodo } from 'models/blog';

const PageContent = () => {
	// 這個 todos 則是所有下方 todo list 的內容， 這個 state 的 setTodos 主要處理 :
	//  1. 在 submit 時更新 todo list 
	//  2. 在 delete 時更新 todo list 
	//  3. 在 checkbox 點框框 toggle 時更新 todo list 內部的 complete 狀態用來呈現完成 todo 
	//  4. 在 edit 完成後更新 todo list
	const [todos, setTodos] = useState([]);

	// 這邊是 form 填寫加入新的 todo ，這個 state 的setAddTodo 主要處理 1.清空 add todo 的 input 2. 雙向綁定回去 add todo 的 value
	const [addTodo, setAddTodo] = useState('');

	// 這邊是 todo list edit 的狀態，主要傳入每個點 edit todo 的 id 並用來判斷是否在正修改中
	// 1. 如果不在修改中 => 也就是正常狀態就會顯示 todo.text 等於正常顯示 todo List
	// 2. 正在修改中    => 則會顯示另一個 input 來修改 todo list 內容
	// 這邊的 setTodoEditStatus 則是處理當點擊時候更新 state 為 todo.id ，以及送出修改內容時清空 state 
	const [todoEditStatus, setTodoEditStatus] = useState(null);

	// 這邊是 edit 的內容的 state ，而 setEditingText 則會處理把 edit 過後的內容放入 state 也就是 editingText 內
	const [editingText, setEditingText] = useState('');

	// 這部分主要把 todo 的資料從 localStorage 提取出來，因為提取出來只要畫面更新時做一次就好所以後面陣列為空
	useEffect(() => {
		const json = localStorage.getItem('todos');
		const loadedTodos = JSON.parse(json);
		if (loadedTodos) {
			setTodos(loadedTodos);
		}
	}, []);

	// 這部分主要把 todo 的資料丟進去 localStorage，監聽 todos 在每次 todos 更新時把資料放進去 loacalStorage
	useEffect(() => {
		const json = JSON.stringify(todos);
		localStorage.setItem('todos', json);
	}, [todos]);

	function handleSubmit(e) {
		e.preventDefault();

		// 這行判斷式主要處理當輸入的 todo 為空時則直接 return 結束函式
		if (!addTodo.trim()) return;

		const newTodo = [
			{
				// 使用時間就會每一個都不一樣
				id: new Date().getTime(),
				text: addTodo,
				completed: false,
			}
		];
		setTodos([...todos].concat(newTodo));
		setAddTodo('');
	}

	function deleteTodo(id) {
		let updatedTodos = [...todos].filter((todo) => todo.id !== id);
		setTodos(updatedTodos);
	}

	function toggleComplete(id) {
		let updatedTodos = [...todos].map((todo) => {
			if (todo.id === id) {
				todo.completed = !todo.completed;
			}
			return todo;
		});
		setTodos(updatedTodos);
	}

	function submitEdits(id) {
		const updatedTodos = [...todos].map((todo) => {

			// 這邊用判斷式比確認要改的 todo 是哪一隻確認成功則 替換 todo.text 為修改後的內容
			if (todo.id === id) {
				todo.text = editingText;
			}
			return todo;
		});
		setTodos(updatedTodos);
		setTodoEditStatus(null);
	}

	return (
		<div id="todo-list">
			<h1>Todo List</h1>
			<form onSubmit={handleSubmit}>
				<input
					type="text"
					onChange={(e) => setAddTodo(e.target.value)}
					value={addTodo}
					placeholder="key in new todo here..."
				/>
				<button type="submit">Add Todo</button>
			</form>
			{todos.map((todo) => (
				<div key={todo.id} className={styles.todolist}>

					<div className={styles.todotext}>
						<input
							type="checkbox"
							id="completed"
							checked={todo.completed}
							onChange={() => toggleComplete(todo.id)}
						/>
						{todo.id === todoEditStatus ? (
							<input
								type="text"
								onChange={(e) => setEditingText(e.target.value)}
								className={styles.editinput}
								placeholder="edit todo..."
							/>
						) : (
								<div className={todo.completed ? styles.done : ''}>{todo.text}</div>
							)}
					</div>

					<div>
						{todo.id === todoEditStatus ? (
							<button onClick={() => submitEdits(todo.id)}>Submit Edits</button>
						) : (
								<button onClick={() => setTodoEditStatus(todo.id)}>Edit</button>
							)}

						<button onClick={() => deleteTodo(todo.id)}>Delete</button>
					</div>
				</div>
			))}
		</div>
	);

};

const Blogs = PageLayout({
	PageHeader: '',
	PageContent,
});

Blogs.displayName = 'Blogs';

export default hot(Blogs);
