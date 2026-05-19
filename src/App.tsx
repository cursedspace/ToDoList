import { useState, useEffect } from "react";
import { TodoItem } from "./TodoItem";


type Task = {
  id: number
  title: string
  priority: string
  done: boolean
}

export default function App() {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const saved = localStorage.getItem('tasks')
    return saved ? JSON.parse(saved) : []
  }) // массив задач
  
  
  const [inputValue, setInputValue] = useState('') // подставляемое значение в массив tasks
  const [priorityValue, setPriorityValue] = useState('')
  const [filter, setFilter] = useState<'all' | 'active' | 'done'>('all')
  const [editingId, setEditingId] = useState<number | null>(null)
  const [editingValue, setEditingValue] = useState('')

  const handleAdd = () => { // функция добавления задачи в массив с проверкой 
    if (inputValue.trim() === '') return // проверка на пустое поле 

    const priority = priorityValue.trim() === '' ? 'средний' : priorityValue // подставление значения по умолчанию в поле состояния

    const newTask: Task = { // создание объекта для массива tasks
      id: Date.now(),
      title: inputValue,
      priority: priority,
      done: false
    } 
// ====== проверка на добавление уникальной задачи ======
    if(tasks.some((task) => task.title === newTask.title)) { 
      alert('такая задача уже есть')
      return
    }

    setTasks([...tasks, newTask]) 
    setInputValue('')
    setPriorityValue('')
  }

  const handleDelete = (IdToDelete: number) => { // фукнкция для удаления задачи из массива
    setTasks(tasks.filter((task) => task.id !== IdToDelete))
  }

  const handleToggle = (idToToggle: number) => {
    setTasks(
      tasks.map((task) => task.id === idToToggle ? { ...task, done: !task.done} : task) 
    )
  }

  const handleEdit = (task: Task) =>  {
    setEditingId(task.id)
    setEditingValue(task.title)
  }

  const handleSave = (id: number) => {
    if (editingValue.trim() == '') return
    
    setTasks(
      tasks.map((task) => 
        task.id === id ? { ...task, title: editingValue } : task
      )
    )
    
    setEditingId(null)
    setEditingValue('')
  }

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }, [tasks])

  const filteredTasks = tasks.filter(task => {
    if (filter === 'active') return !task.done
    if (filter === 'done') return task.done
    return true
  })
// rounded rounded-md rounded-lg rounded-xl rounded-2xl rounded-full
  return (
    <div className="min-h-screen bg-gray-100 flex justify-center pt-16">
      <div className="bg-gray-700 rounded-2xl shadow-lg w-full max-w-lg p-6">
      <h1 className="text-3xl font-bold text-gray-200 mb-6">Мои задачи</h1>
        {/* кнопки для смены фильтрации */}
        <div className="flex gap-2"> 
          <button 
            onClick={ () => setFilter('all') }
            className={`rounded-full font-medium px-2.5 py-1.5 transition-colors ${
              filter === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
            >Все</button>
          <button className={`rounded-full font-medium px-2.5 py-1.5 transition-colors ${
              filter === 'active' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`} onClick={ () => setFilter('active') }>Активные</button>
          <button className={`rounded-full font-medium px-2.5 py-1.5 transition-colors ${
              filter === 'done' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`} onClick={ () => setFilter('done') }>Выполненные</button>
        </div>
        <div className="bg-gray-800 rounded-2xl">
            <ul className=" text-gray-100 font-medium mt-5 px-1 py-2 w-full rounded-lg ml-2">
            {filteredTasks.map((task) => (
              <TodoItem
                key={task.id}
                task = {task}
                editingId={editingId}
                editingValue={editingValue}
                onToggle={handleToggle}
                onDelete={handleDelete}
                onEdit={handleEdit}
                onSave={handleSave}
                setEditingValue={setEditingValue}
              />    
            ))}
          </ul>
        </div>
        
        <input 
          className="font-medium px-2.5 py-1.5 w-full rounded-lg p-3 mt-6 bg-gray-100 border placeholder-grey-600 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="text" 
          maxLength={25}
          placeholder="Задача"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleAdd();
          }}

        />
        <div className="flex">
          <input 
          className="font-medium px-2.5 py-1.5 flex-auto rounded-lg mt-6 mr-5 bg-gray-100 border placeholder-grey-600 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="text" 
          placeholder="Приоритет"
          maxLength={10}
          value={priorityValue}
          onChange={(e) => setPriorityValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleAdd();
          }}
        />

        <button 
        onClick={handleAdd} 
        className="bg-blue-500 text-gray-100 font-medium px-2.5 py-1.5 w-auto rounded-lg mt-6 hover:bg-blue-600 transition-colors">
          Добавить задачу
          </button>
        </div>
        
      </div>
    </div>
  )
}