import PropTypes from 'prop-types'

const LoginForm = ({
    username,
    password,
    handleUsernameChange,
    handlePasswordChange,
    handleLogin,
}) => (
    <div>
        <h1>Log in to BlogList</h1>
        <form onSubmit={handleLogin}>
            <div>
                Username
                <input
                    type="text"
                    value={username}
                    name="username"
                    onChange={handleUsernameChange}
                />
            </div>

            <div>
                Password
                <input
                    type="text"
                    value={password}
                    name="password"
                    onChange={handlePasswordChange}
                />
            </div>
            <button type="submit">Login</button>
        </form>
    </div>
)

LoginForm.propTypes = {
    username: PropTypes.func.isRequired,
    password: PropTypes.func.isRequired,
    handleUsernameChange: PropTypes.func.isRequired,
    handlePasswordChange: PropTypes.func.isRequired,
    handleLogin: PropTypes.func.isRequired,
  }

export default LoginForm