import config from '../gitprofile.config';
import Home from './views/Home';

function App() {
  return <Home config={config} />;
}

export default App;
