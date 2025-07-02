## 1. RESTful API nədir?

**REST** (Representational State Transfer) — resurslarla qarşılıqlı əlaqə üçün standart HTTP metodlarından istifadə edən veb-xidmətlər yaratmaq üçün memarlıq üslubudur.

### REST-in əsas prinsipləri:

- **Stateless** — hər sorğu bütün lazımi məlumatları özündə ehtiva edir
- **Client-Server** — müştəri və server arasında məsuliyyətin bölünməsi
- **Cacheable** — cavablar keşlənə bilər
- **Uniform Interface** — vahid qarşılıqlı əlaqə interfeysi

## 2. HTTP Metodları

### GET

- **Təyinatı**: Məlumatların əldə edilməsi
- **Çoxdəfəlik**: Bəli (vəziyyəti dəyişdirmədən dəfələrlə çağırıla bilər)
- **Nümunə**: `GET /api/users` — istifadəçilərin siyahısını əldə et

### POST

- **Təyinatı**: Yeni resursların yaradılması
- **Çoxdəfəlik**: Xeyr
- **Nümunə**: `POST /api/users` — yeni istifadəçi yarat

### PUT

- **Təyinatı**: Resursun tam yenilənməsi
- **Çoxdəfəlik**: Bəli
- **Nümunə**: `PUT /api/users/1` — ID-si 1 olan istifadəçini tam yenilə

### DELETE

- **Təyinatı**: Resursun silinməsi
- **Çoxdəfəlik**: Bəli
- **Nümunə**: `DELETE /api/users/1` — ID-si 1 olan istifadəçini sil

### PATCH

- **Təyinatı**: Resursun qismən yenilənməsi
- **Çoxdəfəlik**: Bəli
- **Nümunə**: `PATCH /api/users/1` — istifadəçini qismən yenilə

## 3. Endpoint Dizaynının Prinsipləri

### Yaxşı təcrübələr:

```
✅ Düzgün:
GET /api/users          # Bütün istifadəçiləri əldə et
GET /api/users/1        # ID-si 1 olan istifadəçini əldə et
POST /api/users         # İstifadəçi yarat
PUT /api/users/1        # ID-si 1 olan istifadəçini yenilə
DELETE /api/users/1     # ID-si 1 olan istifadəçini sil

❌ Yanlış:
GET /api/getUsers
POST /api/createUser
GET /api/user/delete/1
```

### Adlandırma qaydaları:

- İsim sözlərindən istifadə edin, fel sözlərindən yox
- Kolleksiyalar üçün cəm formadan istifadə edin
- İerarxik strukturdan istifadə edin
- Kiçik hərflər və tirələrdən istifadə edin

## 4. JSON strukturu

### İstifadəçi strukturu nümunəsi:

```json
{
  "id": 1,
  "name": "John Doe",
  "email": "john@example.com",
  "address": {
    "street": "123 Main St",
    "city": "New York",
    "zipcode": "10001"
  },
  "phone": "+1-234-567-8900",
  "website": "johndoe.com"
}
```

### API cavab strukturu:

```json
{
  "data": [...],
  "status": "success",
  "message": "İstifadəçilər uğurla əldə edildi",
  "meta": {
    "total": 100,
    "page": 1,
    "per_page": 10
  }
}
```

## 5. React-da Fetch API

### Əsas GET sorğusu:

```javascript
const fetchUsers = async () => {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    if (!response.ok) {
      throw new Error(`HTTP xətası! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('İstifadəçilər əldə edilərkən xəta:', error);
    throw error;
  }
};
```

### POST sorğusu:

```javascript
const createUser = async (userData) => {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData)
    });
    
    if (!response.ok) {
      throw new Error(`HTTP xətası! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('İstifadəçi yaradılarkən xəta:', error);
    throw error;
  }
};
```

## 6. React-da Axios

### Quraşdırma:

```bash
npm install axios
```

### Əsas konfiqurasiya:

```javascript
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Xətaları idarə etmək üçün interceptorlar
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Xətası:', error);
    return Promise.reject(error);
  }
);
```

### Axios ilə GET sorğusu:

```javascript
const fetchUsers = async () => {
  try {
    const response = await api.get('/users');
    return response.data;
  } catch (error) {
    throw error;
  }
};
```

### Axios ilə POST sorğusu:

```javascript
const createUser = async (userData) => {
  try {
    const response = await api.post('/users', userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};
```

## 7. React-da API vəziyyətinin idarə edilməsi

### useState və useEffect istifadəsi:

```javascript
import React, { useState, useEffect } from 'react';

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        setLoading(true);
        const data = await fetchUsers();
        setUsers(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, []);

  if (loading) return <div>Yüklənir...</div>;
  if (error) return <div>Xəta: {error}</div>;

  return (
    <div>
      {users.map(user => (
        <div key={user.id}>{user.name}</div>
      ))}
    </div>
  );
};
```

## 8. API üçün xüsusi hook-lar

### useApi hook-u:

```javascript
import { useState, useEffect } from 'react';

const useApi = (apiFunction, dependencies = []) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const result = await apiFunction();
        setData(result);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, dependencies);

  return { data, loading, error };
};

// İstifadə:
const { data: users, loading, error } = useApi(fetchUsers);
```

## 9. Xətaların idarə edilməsi

### Xəta növləri:

- **Network errors** — şəbəkə problemləri
- **HTTP errors** — server xətaları (404, 500, və s.)
- **Parsing errors** — JSON parsing xətaları
- **Timeout errors** — gözləmə müddətinin keçilməsi

### Xətaların idarə edilməsi:

```javascript
const handleApiCall = async (apiFunction) => {
  try {
    const result = await apiFunction();
    return { data: result, error: null };
  } catch (error) {
    let errorMessage = 'Naməlum xəta baş verdi';
    
    if (error.response) {
      // HTTP xətası
      errorMessage = `Server xətası: ${error.response.status}`;
    } else if (error.request) {
      // Şəbəkə problemləri
      errorMessage = 'Şəbəkə bağlantısı ilə problem';
    } else {
      errorMessage = error.message;
    }
    
    return { data: null, error: errorMessage };
  }
};
```

## 10. Optimallaşdırma və ən yaxşı təcrübələr

### Keşləmə:

```javascript
const cache = new Map();

const fetchWithCache = async (url) => {
  if (cache.has(url)) {
    return cache.get(url);
  }
  
  const data = await fetch(url).then(res => res.json());
  cache.set(url, data);
  return data;
};
```

### Sorğuların ləğv edilməsi:

```javascript
useEffect(() => {
  const controller = new AbortController();
  
  const fetchData = async () => {
    try {
      const response = await fetch(url, {
        signal: controller.signal
      });
      // cavabın işlənməsi
    } catch (error) {
      if (error.name === 'AbortError') {
        console.log('Sorğu ləğv edildi');
      }
    }
  };
  
  fetchData();
  
  return () => {
    controller.abort();
  };
}, []);
```

### Axtarış üçün debouncing:

```javascript
const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};
```

## 11. API sorğularının testlənməsi

### Fetch-in mock edilməsi:

```javascript
// Testlərdə
global.fetch = jest.fn();

beforeEach(() => {
  fetch.mockClear();
});

test('istifadəçiləri əldə etməlidir', async () => {
  const mockUsers = [{ id: 1, name: 'John' }];
  
  fetch.mockResolvedValueOnce({
    ok: true,
    json: async () => mockUsers,
  });

  const users = await fetchUsers();
  expect(users).toEqual(mockUsers);
});
```

## 12. Nəticə

### Əsas məqamlar:

- REST API — veb-xidmətlər üçün standartdır
- Düzgün HTTP metodlarından istifadə edin
- Xətaları düzgün idarə edin
- Loading vəziyyətlərini tətbiq edin
- Mümkün olduqda məlumatları keşləyin
- API qarşılıqlı əlaqələrini test edin
- Məlumat tipləri üçün TypeScript istifadə edin