

## 🔹 1. React və onun xüsusiyyətləri

### React-ın əsas xüsusiyyətləri:

- **Virtual DOM** - Performansı artırır
- **Component-based** - Yenidən istifadə edilə bilən komponentlər
- **One-way data flow** - Məlumatlar yalnız bir istiqamətdə hərəkət edir
- **Declarative** - Siz nə istədiyinizi yazırsınız, necə edəcəyini React həll edir

# React tətbiqinin yaradılması

Mən sizə ilk React tətbiqinizi yaratmaqda kömək edəcəyəm! Başlamaq üçün addım-addım təlimat:

## Əvvəlcədən tələblər

Kompüterinizdə Node.js quraşdırıldığından əmin olun. Onu [nodejs.org](https://nodejs.org/) saytından yükləyə bilərsiniz.

## İlk React tətbiqinin yaradılması

**1. Terminal/komanda sətiri açın**

**2. Create React App istifadə edərək yeni React tətbiqi yaradın:**

```bash
npx create-react-app name
```

("my-first-app" yerinə layihənizə vermək istədiyiniz istənilən adı yazın)

**3. Layihə qovluğuna keçin:**

```bash
cd my-first-app
```

**4. İnkişaf serverini işə salın:**

```bash
npm start
```

Bu avtomatik olaraq yeni React tətbiqinizi brauzerdə `http://localhost:3000` ünvanında açacaq. Siz React loqosu ilə standart salamlama səhifəsini görməlisiniz.

## Layihə strukturunun başa düşülməsi

Yeni React tətbiqiniz aşağıdakı strukturda olacaq:

```
my-first-app/
├── public/
├── src/
│   ├── App.js          # Əsas komponent
│   ├── App.css         # App üçün styllər
│   ├── index.js        # Giriş nöqtəsi
│   └── index.css       # Qlobal styllər
├── package.json
└── README.md
```

## İlk dəyişikliklərin edilməsi

`src/App.js` faylını redaktə etməyə çalışın - hər hansı mətni dəyişin və faylı saxlayın. İsti yenidən yükləmə sayəsində dəyişiklikləri brauzerdə dərhal görəcəksiniz!

---

## 🔹 2. JSX və komponent strukturu

### JSX nədir?

JSX (JavaScript XML) - JavaScript daxilində HTML yazmağa imkan verir.

```jsx
// JSX nümunəsi
const element = <h1>Salam Dünya!</h1>;

// JavaScript-ə çevrilir:
const element = React.createElement('h1', null, 'Salam Dünya!');
```

### JSX qaydaları:

1. **Bir valideyn element** olmalıdır
2. **className** istifadə edin (class deyil)
3. **CamelCase** istifadə edin
4. **Self-closing teqlər** mütləqdir

```jsx
// Düzgün JSX
function App() {
  return (
    <div>
      <h1 className="title">Başlıq</h1>
      <img src="image.jpg" alt="Şəkil" />
    </div>
  );
}
```

### React Fragment:

```jsx
// Fragment istifadəsi
function App() {
  return (
    <React.Fragment>
      <h1>Başlıq</h1>
      <p>Mətn</p>
    </React.Fragment>
  );
}

// Qısa yazılış
function App() {
  return (
    <>
      <h1>Başlıq</h1>
      <p>Mətn</p>
    </>
  );
}
```

---

## 🔹 3. Props və State

### Props (Properties)

Props - komponentlərə verilən parametrlərdir. Dəyişilməzdir (immutable).

```jsx
// Valideyn komponent
function App() {
  return (
    <div>
      <Welcome name="Əli" age={25} />
      <Welcome name="Ayşə" age={22} />
    </div>
  );
}

// Uşaq komponent
function Welcome(props) {
  return (
    <div>
      <h1>Salam {props.name}</h1>
      <p>Yaş: {props.age}</p>
    </div>
  );
}

// Destructuring ilə
function Welcome({ name, age }) {
  return (
    <div>
      <h1>Salam {name}</h1>
      <p>Yaş: {age}</p>
    </div>
  );
}
```

### Default Props:

```jsx
function Welcome({ name = "Qonaq", age = 0 }) {
  return (
    <div>
      <h1>Salam {name}</h1>
      <p>Yaş: {age}</p>
    </div>
  );
}
```

### State

State - komponentin daxili vəziyyətidir. Dəyişdirilə bilər.

```jsx
import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Sayğac: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Artır
      </button>
    </div>
  );
}
```

---

## 🔹 4. Hooklar (Hooks)

### useState Hook

Funksional komponentlərdə state istifadə etmək üçün.

```jsx
import { useState } from 'react';

function Example() {
  // State elan edilməsi
  const [name, setName] = useState('');
  const [age, setAge] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  // Array state
  const [items, setItems] = useState([]);

  // Object state
  const [user, setUser] = useState({
    name: '',
    email: ''
  });

  const updateUser = () => {
    setUser(prevUser => ({
      ...prevUser,
      name: 'Yeni ad'
    }));
  };

  return (
    <div>
      <input 
        value={name} 
        onChange={(e) => setName(e.target.value)} 
      />
      <p>Ad: {name}</p>
    </div>
  );
}
```

### useEffect Hook

Yan təsirlər üçün (API çağırışları, abunəliklər, DOM dəyişiklikləri).

```jsx
import { useState, useEffect } from 'react';

function Example() {
  const [count, setCount] = useState(0);
  const [data, setData] = useState(null);

  // Komponent mount olunanda icra olunur
  useEffect(() => {
    console.log('Komponent yükləndi');
  }, []); // Boş massiv - yalnız bir dəfə icra olunur

  // count dəyişəndə icra olunur
  useEffect(() => {
    document.title = `Sayğac: ${count}`;
  }, [count]); // count asılılıqlarda

  // Hər render zamanı icra olunur
  useEffect(() => {
    console.log('Hər render zamanı icra olunur');
  }); // Asılılıq massivi yoxdur

  // Cleanup funksiyası
  useEffect(() => {
    const timer = setInterval(() => {
      console.log('Taymer işləyir');
    }, 1000);

    // Təmizləmə
    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Artır
      </button>
    </div>
  );
}
```

### useRef Hook

DOM elementlərinə birbaşa giriş və dəyərlərin saxlanması üçün.

```jsx
import { useRef, useEffect } from 'react';

function Example() {
  const inputRef = useRef(null);
  const countRef = useRef(0);

  useEffect(() => {
    // Input-a fokus qoy
    inputRef.current.focus();
  }, []);

  const handleClick = () => {
    countRef.current += 1;
    console.log('Klik sayı:', countRef.current);
  };

  return (
    <div>
      <input ref={inputRef} type="text" />
      <button onClick={handleClick}>
        Tıkla
      </button>
    </div>
  );
}
```

---

## 🔹 5. Nəzarət edilən formalar

### Nəzarət edilən komponentlər

Form elementlərinin dəyəri React state tərəfindən idarə olunur.

```jsx
import { useState } from 'react';

function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    gender: '',
    isSubscribed: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form məlumatları:', formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Ad:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label>Mesaj:</label>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows="4"
        />
      </div>

      <div>
        <label>Cins:</label>
        <select
          name="gender"
          value={formData.gender}
          onChange={handleChange}
        >
          <option value="">Seçin</option>
          <option value="male">Kişi</option>
          <option value="female">Qadın</option>
        </select>
      </div>

      <div>
        <label>
          <input
            type="checkbox"
            name="isSubscribed"
            checked={formData.isSubscribed}
            onChange={handleChange}
          />
          Xəbərlərə abunə ol
        </label>
      </div>

      <button type="submit">Göndər</button>
    </form>
  );
}
```

---

## 🔹 6. Komponentin həyat dövrü

### Funksional komponentlər (hooklar ilə)

```jsx
import { useState, useEffect } from 'react';

function LifecycleExample() {
  const [count, setCount] = useState(0);

  // componentDidMount
  useEffect(() => {
    console.log('Komponent mount olundu');
    
    // componentWillUnmount
    return () => {
      console.log('Komponent unmount olundu');
    };
  }, []);

  // componentDidUpdate
  useEffect(() => {
    console.log('Count dəyişdi:', count);
  }, [count]);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Artır
      </button>
    </div>
  );
}
```

### Sinif komponentləri (ənənəvi üsul)

```jsx
import React, { Component } from 'react';

class LifecycleExample extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    };
    console.log('Constructor icra olundu');
  }

  componentDidMount() {
    console.log('Komponent mount olundu');
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.count !== this.state.count) {
      console.log('Count dəyişdi:', this.state.count);
    }
  }

  componentWillUnmount() {
    console.log('Komponent unmount olunacaq');
  }

  render() {
    return (
      <div>
        <p>Count: {this.state.count}</p>
        <button onClick={() => this.setState({ count: this.state.count + 1 })}>
          Artır
        </button>
      </div>
    );
  }
}
```

---

## 🔹 7. To-Do List tətbiqi - Praktik tapşırıq

### To-Do List-in tam komponenti:

```jsx
import React, { useState, useEffect, useRef } from 'react';
import './TodoApp.css';

function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [filter, setFilter] = useState('all'); // all, active, completed
  const inputRef = useRef(null);

  // localStorage-dən məlumatları yüklə
  useEffect(() => {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos));
    }
  }, []);

  // todos dəyişəndə localStorage-ə yaz
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  // Komponent mount olunanda input-a fokus qoy
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  // Yeni todo əlavə et
  const addTodo = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      const newTodo = {
        id: Date.now(),
        text: inputValue.trim(),
        completed: false,
        createdAt: new Date().toLocaleString()
      };
      setTodos([...todos, newTodo]);
      setInputValue('');
      inputRef.current.focus();
    }
  };

  // Todo-nu sil
  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  // Todo vəziyyətini dəyiş
  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id
        ? { ...todo, completed: !todo.completed }
        : todo
    ));
  };

  // Todo-nu redaktə et
  const editTodo = (id, newText) => {
    setTodos(todos.map(todo =>
      todo.id === id
        ? { ...todo, text: newText }
        : todo
    ));
  };

  // Tamamlanmış todo-ları təmizlə
  const clearCompleted = () => {
    setTodos(todos.filter(todo => !todo.completed));
  };

  // Hamısını seç/seçimi ləğv et
  const toggleAll = () => {
    const allCompleted = todos.every(todo => todo.completed);
    setTodos(todos.map(todo => ({
      ...todo,
      completed: !allCompleted
    })));
  };

  // Filtrə görə todo-ları göstər
  const filteredTodos = todos.filter(todo => {
    switch (filter) {
      case 'active':
        return !todo.completed;
      case 'completed':
        return todo.completed;
      default:
        return true;
    }
  });

  // Statistika
  const activeCount = todos.filter(todo => !todo.completed).length;
  const completedCount = todos.filter(todo => todo.completed).length;

  return (
    <div className="todo-app">
      <h1>📝 Tapşırıq Siyahısı</h1>
      
      {/* Todo əlavə etmək forması */}
      <form onSubmit={addTodo} className="add-form">
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Yeni tapşırıq əlavə et..."
          className="add-input"
        />
        <button type="submit" className="add-button">
          ➕ Əlavə et
        </button>
      </form>

      {/* Statistika */}
      {todos.length > 0 && (
        <div className="stats">
          <span>Cəmi: {todos.length}</span>
          <span>Aktiv: {activeCount}</span>
          <span>Tamamlanmış: {completedCount}</span>
        </div>
      )}

      {/* Əməliyyatlar */}
      {todos.length > 0 && (
        <div className="actions">
          <button 
            onClick={toggleAll}
            className="toggle-all-btn"
          >
            {todos.every(todo => todo.completed) ? '🔲' : '☑️'} 
            Hamısını seç
          </button>
          
          {completedCount > 0 && (
            <button 
              onClick={clearCompleted}
              className="clear-completed-btn"
            >
              🗑️ Tamamlanmışları sil
            </button>
          )}
        </div>
      )}

      {/* Filtr düymələri */}
      <div className="filters">
        <button 
          onClick={() => setFilter('all')}
          className={filter === 'all' ? 'active' : ''}
        >
          Hamısı
        </button>
        <button 
          onClick={() => setFilter('active')}
          className={filter === 'active' ? 'active' : ''}
        >
          Aktiv
        </button>
        <button 
          onClick={() => setFilter('completed')}
          className={filter === 'completed' ? 'active' : ''}
        >
          Tamamlanmış
        </button>
      </div>

      {/* Todo siyahısı */}
      <div className="todo-list">
        {filteredTodos.length === 0 ? (
          <p className="empty-message">
            {filter === 'all' 
              ? 'Hələ tapşırıq yoxdur 🤷‍♂️'
              : filter === 'active'
              ? 'Aktiv tapşırıq yoxdur ✅'
              : 'Tamamlanmış tapşırıq yoxdur 📝'
            }
          </p>
        ) : (
          filteredTodos.map(todo => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={toggleTodo}
              onDelete={deleteTodo}
              onEdit={editTodo}
            />
          ))
        )}
      </div>
    </div>
  );
}

// Ayrı Todo Item komponenti
function TodoItem({ todo, onToggle, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);
  const editInputRef = useRef(null);

  // Redaktə rejiminə keçəndə input-a fokus qoy
  useEffect(() => {
    if (isEditing) {
      editInputRef.current.focus();
    }
  }, [isEditing]);

  const handleEdit = () => {
    if (editText.trim() && editText !== todo.text) {
      onEdit(todo.id, editText.trim());
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleEdit();
    } else if (e.key === 'Escape') {
      setEditText(todo.text);
      setIsEditing(false);
    }
  };

  return (
    <div className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
        className="todo-checkbox"
      />
      
      {isEditing ? (
        <input
          ref={editInputRef}
          type="text"
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          onBlur={handleEdit}
          onKeyDown={handleKeyDown}
          className="edit-input"
        />
      ) : (
        <span 
          className="todo-text"
          onDoubleClick={() => setIsEditing(true)}
          title="Redaktə etmək üçün iki dəfə tıklayın"
        >
          {todo.text}
        </span>
      )}
      
      <div className="todo-actions">
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="edit-btn"
          title="Redaktə et"
        >
          ✏️
        </button>
        <button
          onClick={() => onDelete(todo.id)}
          className="delete-btn"
          title="Sil"
        >
          🗑️
        </button>
      </div>
      
      <small className="todo-date">{todo.createdAt}</small>
    </div>
  );
}

export default TodoApp;
```

### CSS stilləri (TodoApp.css):

```css
.todo-app {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.todo-app h1 {
  text-align: center;
  color: #333;
  margin-bottom: 30px;
}

.add-form {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.add-input {
  flex: 1;
  padding: 12px;
  font-size: 16px;
  border: 2px solid #ddd;
  border-radius: 5px;
  outline: none;
}

.add-input:focus {
  border-color: #007bff;
}

.add-button {
  padding: 12px 20px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
}

.add-button:hover {
  background: #0056b3;
}

.stats {
  display: flex;
  justify-content: space-between;
  background: #f8f9fa;
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 15px;
  font-size: 14px;
}

.actions {
  display: flex;
  gap: 10px;
  margin-bottom: 15px;
}

.toggle-all-btn, .clear-completed-btn {
  padding: 8px 15px;
  border: 1px solid #ddd;
  border-radius: 5px;
  background: white;
  cursor: pointer;
}

.toggle-all-btn:hover, .clear-completed-btn:hover {
  background: #f8f9fa;
}

.filters {
  display: flex;
  gap: 5px;
  margin-bottom: 20px;
  justify-content: center;
}

.filters button {
  padding: 8px 15px;
  border: 1px solid #ddd;
  background: white;
  cursor: pointer;
  border-radius: 5px;
}

.filters button.active {
  background: #007bff;
  color: white;
}

.filters button:hover {
  background: #f8f9fa;
}

.filters button.active:hover {
  background: #0056b3;
}

.todo-list {
  border: 1px solid #ddd;
  border-radius: 5px;
  overflow: hidden;
}

.todo-item {
  display: flex;
  align-items: center;
  padding: 15px;
  border-bottom: 1px solid #eee;
  gap: 10px;
}

.todo-item:last-child {
  border-bottom: none;
}

.todo-item.completed {
  background: #f8f9fa;
  opacity: 0.7;
}

.todo-checkbox {
  width: 20px;
  height: 20px;
  cursor: pointer;
}

.todo-text {
  flex: 1;
  cursor: pointer;
}

.todo-item.completed .todo-text {
  text-decoration: line-through;
  color: #666;
}

.edit-input {
  flex: 1;
  padding: 5px;
  border: 1px solid #007bff;
  border-radius: 3px;
  outline: none;
}

.todo-actions {
  display: flex;
  gap: 5px;
}

.edit-btn, .delete-btn {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 16px;
  padding: 5px;
}

.edit-btn:hover, .delete-btn:hover {
  opacity: 0.7;
}

.todo-date {
  font-size: 11px;
  color: #999;
  white-space: nowrap;
}

.empty-message {
  text-align: center;
  padding: 40px;
  color: #666;
  font-style: italic;
}

/* Responsivlik */
@media (max-width: 768px) {
  .todo-app {
    padding: 10px;
  }
  
  .add-form {
    flex-direction: column;
  }
  
  .stats {
    flex-direction: column;
    gap: 5px;
  }
  
  .todo-item {
    flex-wrap: wrap;
  }
  
  .todo-date {
    order: 1;
    width: 100%;
    margin-top: 5px;
  }
}
```

---

## 🔹 8. Əlavə məlumat

### Hadisələrin işlənməsi:

```jsx
function Button() {
  const handleClick = (e) => {
    e.preventDefault();
    console.log('Düyməyə tıklandı');
  };

  const handleMouseEnter = () => {
    console.log('Siçan daxil oldu');
  };

  return (
    <button 
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
    >
      Tıkla
    </button>
  );
}
```

### Şərti render:

```jsx
function ConditionalExample({ isLoggedIn, user }) {
  return (
    <div>
      {isLoggedIn ? (
        <h1>Xoş gəlmisiniz, {user.name}!</h1>
      ) : (
        <h1>Zəhmət olmasa sistemə daxil olun</h1>
      )}
      
      {isLoggedIn && <p>Şəxsi kabinetiniz</p>}
      
      {!isLoggedIn && <button>Daxil ol</button>}
    </div>
  );
}
```

### Siyahıların render edilməsi:

```jsx
function ListExample() {
  const items = [
    { id: 1, name: 'Alma', price: 2 },
    { id: 2, name: 'Banan', price: 3 },
    { id: 3, name: 'Portağal', price: 4 }
  ];

  return (
    <ul>
      {items.map(item => (
        <li key={item.id}>
          {item.name} - {item.price} man
        </li>
      ))}
    </ul>
  );
}
```

### Performansın optimallaşdırılması:

```jsx
import { memo, useMemo, useCallback } from 'react';

// React.memo - komponentin re-render-ini azaldır
const ExpensiveComponent = memo(function ExpensiveComponent({ data }) {
  return <div>{data}</div>;
});

// useMemo - ağır hesablamaları keşləyir
function OptimizedComponent({ items }) {
  const expensiveValue = useMemo(() => {
    return items.reduce((sum, item) => sum + item.price, 0);
  }, [items]);

  return <div>Ümumi dəyər: {expensiveValue}</div>;
}

// useCallback - funksiyaları keşləyir
function ParentComponent() {
  const [count, setCount] = useState(0);
  
  const handleClick = useCallback(() => {
    setCount(prev => prev + 1);
  }, []);

  return (
    <div>
      <p>Count: {count}</p>
      <ChildComponent onClick={handleClick} />
    </div>
  );
}
```

Bu dərslik React.js-in əsas konsepsiyalarını əhatə edir və siz praktik To-Do List tətbiqi ilə biliklərinizi yoxlaya bilərsiniz. Hər hissəni tədricən öyrənin və çox praktika edin!