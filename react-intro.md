
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
