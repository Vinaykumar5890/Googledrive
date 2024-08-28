import {GoogleOAuthProvider, GoogleLogin} from '@react-oauth/google'
import {useNavigate} from 'react-router-dom'
import './index.css'

const GoogleAuth = () => {
  const navigate = useNavigate()

  const handleLoginSuccess = response => {
    console.log('Login Success: ', response)

    // Here you can fetch user info and handle authentication
    // For now, we'll just navigate to the Home page
    navigate('/home')
  }

  const handleLoginFailure = error => {
    console.log('Login Failed: ', error)
  }

  return (
    <GoogleOAuthProvider clientId="337949774744-pv1f7ngoudt03emmvoj2ecnh8ke18u7o.apps.googleusercontent.com">
      <div className="App">
        <h1>Login with Google</h1>
        <GoogleLogin
          onSuccess={handleLoginSuccess}
          onError={handleLoginFailure}
        />
      </div>
    </GoogleOAuthProvider>
  )
}

export default GoogleAuth
