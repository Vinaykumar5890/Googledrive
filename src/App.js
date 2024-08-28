import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import GoogleAuth from './components/GoogleAuth'
import Home from './components/Home'

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<GoogleAuth />} />
      <Route path="/home" element={<Home />} />
    </Routes>
  </Router>
)

export default App
