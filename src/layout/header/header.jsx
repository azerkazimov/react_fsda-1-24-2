import "./header.css";

export default function Header() {
  return (
    <nav>
      <div className="container">
        <div className="navigation">
          <div className="logo">
            <a href="/">My App</a>
          </div>
          <ul className="nav-menu">
            <li className="nav-item"><a href="/">Home</a></li>
            <li className="nav-item"><a href="/about">About</a></li>
            <li className="nav-item"><a href="/contact">Contact</a></li>
            <li className="nav-item"><a href="/service">Service</a></li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
