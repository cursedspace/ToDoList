type TodoItemProps = {
    task: { id: number; title: string; priority: string; done: boolean }
    editingId: number | null
    editingValue: string
    onToggle: (id: number) => void
    onDelete: (id: number) => void
    onEdit: (task: any) => void
    onSave: (id: number) => void
    setEditingValue: (val: string) => void
}

export function TodoItem({ task, editingId, editingValue,
    onToggle, onDelete, onEdit, onSave, setEditingValue}: TodoItemProps) { 
    return (
        <li className="flex justify-between items-center gap-3 mr-3">
              <input 
                className="m-2 h-4 w-4 bg-gray-200 border-gray-400 cursor-pointer accent-blue-500 border-2 transition-colors checked:appearance-auto hover:bg-gray-500 appearance-none"
                type="checkbox" 
                checked={task.done}
                onChange={() => onToggle(task.id)}
                
              />

              { editingId === task.id ? (
                <input 
                  className={`text-sm font-medium px-2 rounded-lg bg-gray-600 border placeholder-grey-600 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  maxLength={25}
                  type="text" 
                  value={editingValue}
                  onChange={(e) => setEditingValue(e.target.value)} 
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') onSave(task.id);
                    
                  }}
                  
                />
              ) : ( 
                <span className={`flex-1 text-sm ${task.done ? 'line-through text-gray-400': 'text-gray-100'}`}>
                  {task.title}
                  <span className="ml-1 text-xs text-gray-400"> ({task.priority}) </span>
                </span>
                
                
              )}

              { editingId === task.id ? (
                  <button className=" ml-2 bg-gray-700 rounded-3xl w-auto px-2 hover:bg-gray-600 transition-colors"
                  onClick={() => onSave(task.id)} >&#x1F5AC;</button> 
                ) : (
                  <button className="inline-block -scale-x-100 ml-2 bg-gray-700 rounded-3xl w-auto px-2 hover:bg-gray-600 transition-colors"
                  onClick={() => onEdit(task)}>&#x270E;</button>
                )
              }

              { editingId === task.id ? (
                  <div></div>
                ) : (
                  <button className="flex-end bg-gray-700 rounded-3xl w-auto px-2 hover:bg-gray-600 transition-colors" 
                  onClick={() => onDelete(task.id)}>&#x1F5D1;</button> 
                )
              }

              
            </li>
    )
}

