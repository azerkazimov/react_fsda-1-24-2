import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Main from "./pages/main/main";
import About from "./pages/about/about";
import Header from "./layout/header/header";
import Contact from "./pages/contact/contact";
import Service from "./pages/service/service";
import Users from "./pages/users/users";

function App() {
  return (
    <>
      <Header />
      <Router>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/service" element={<Service />} />
          <Route path="/users" element={<Users />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
