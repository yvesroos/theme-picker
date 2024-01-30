import "./App.css";
import Router from "./containers/Router";
import routes from "./routes";

function App() {
  return (
    <div className="content">
      <header className="header">
        <h1 className="header__title">Theme Picker</h1>
      </header>
      <Router routes={routes} />
    </div>
  );
}

export default App;
