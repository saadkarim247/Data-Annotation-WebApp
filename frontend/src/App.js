import Header from './components/Header'
import FormPage from './components/Form'
import './index.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen.js'
import ProfileScreen from './screens/ProfileScreen'

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path='/home' element={<FormPage />} exact />
        <Route path='/login' element={<LoginScreen />} />
        <Route path='/register' element={<RegisterScreen />} />
        <Route path='/profile' element={<ProfileScreen />} />
      </Routes>
    </Router>
  )
}

export default App
