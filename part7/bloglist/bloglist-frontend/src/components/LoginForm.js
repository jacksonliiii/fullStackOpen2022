import PropTypes from 'prop-types'

const LoginForm = ({
    username,
    password,
    handleUsernameChange,
    handlePasswordChange,
    handleLogin,
}) => (
    <div>
        <h1>Login</h1>
        <form onSubmit={handleLogin}>
            <div>
                Username
                <input
                    type="text"
                    value={username}
                    name="username"
                    onChange={handleUsernameChange}
                    id='username'
                />
            </div>

            <div>
                Password
                <input
                    type="text"
                    value={password}
                    name="password"
                    onChange={handlePasswordChange}
                    id='password'
                />
            </div>
            <button id="login-button" type="submit">Login</button>
        </form>
    </div>
)

LoginForm.propTypes = {
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    handleUsernameChange: PropTypes.func.isRequired,
    handlePasswordChange: PropTypes.func.isRequired,
    handleLogin: PropTypes.func.isRequired,
  }

export default LoginForm