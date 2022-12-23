import logo from './logo.svg';
import './Header.css'

function Header() {
    return (
        <header className="App-header">
        <img src={logo} className="Header-logo" alt="logo" />
        <p>
          This is going to be a glorious application which helps you build new characters for dnd.
        </p>
      </header>
    )
}

export default Header;