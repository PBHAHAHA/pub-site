import config from '../gitprofile.config';
import Home from './components/Home';

function App() {
  return <Home config={config} />;
}

export default App;
