import { useEffect, useState, useContext } from 'react';
import './login.scss'
import { useHistory } from "react-router-dom";
import { toast } from 'react-toastify';
import { loginUser } from '../../services/userService';
import { UserContext } from '../../context/UserContext'

const Login = (props) => {
    const { loginContext } = useContext(UserContext)

    const [valueLogin, setValueLogin] = useState('')
    const [password, setPassword] = useState('')
    const defaultObjCheckInput = {
        isValidValueLogin: true,
        isValidPassword: true
    }
    const [objCheckInput, setObjCheckInput] = useState(defaultObjCheckInput)

    let history = useHistory();
    const handleRegister = () => {
        history.push('/register')
    }

    const isValidInput = () => {
        setObjCheckInput(defaultObjCheckInput)
        if (!valueLogin) {
            setObjCheckInput({ ...defaultObjCheckInput, isValidValueLogin: false })
            toast.error("Email or phone number is required!")
            return
        }
        if (!password) {
            setObjCheckInput({ ...defaultObjCheckInput, isValidPassword: false })
            toast.error("Password is required!")
            return
        }
    }

    const handleLogin = async () => {
        isValidInput()
        let response = await loginUser(valueLogin, password)

        if (response && +response.EC === 0) {
            let groupWithRoles = response.DT.groupWithRoles
            let email = response.DT.email
            let username = response.DT.username
            let token = response.DT.access_token

            let data = {
                isAuthenticated: true,
                token: token,
                account: { groupWithRoles, email, username }
            }

            localStorage.setItem('jwt', token)
            loginContext(data)
            history.push('/users')
        }

        if (response && +response.EC !== 0) {
            toast.error(response.EM)
        }
    }

    const handlePressEnter = (event) => {
        if (event.key === 'Enter') {
            handleLogin()
        }
    }

    return (
        <div className="login-container">
            <div className='container pt-3'>
                <div className='row px-3 px-sm-0'>
                    <div className='left-content col-7 mt-5 d-none d-sm-block'>
                        <div className='brand'>facebook</div>
                        <div className='description'>Facebook giúp bạn kết nối và chia sẻ với mọi người trong cuộc sống của bạn.</div>
                    </div>
                    <div className='right-content col-sm-5 col-12 d-flex flex-column gap-3 py-3'>
                        <div className='brand text-center d-block d-sm-none'>facebook</div>
                        <input
                            type='text'
                            placeholder='Email hoặc số điện thoại'
                            className={objCheckInput.isValidValueLogin ? 'form-control' : 'form-control is-invalid'}
                            value={valueLogin}
                            onChange={(event) => setValueLogin(event.target.value)}
                        />
                        <input
                            type='password'
                            placeholder='Mật khẩu'
                            className={objCheckInput.isValidPassword ? 'form-control' : 'form-control is-invalid'}
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                            onKeyDown={(event) => handlePressEnter(event)}
                        />
                        <button className='btn btn-primary' onClick={() => handleLogin()}>Đăng nhập</button>
                        <span className='text-center'><a className='forgotten-password' href='#'>Quên mật khẩu?</a></span>
                        <hr />
                        <div className='text-center'>
                            <button className='btn btn-success' onClick={() => handleRegister()}>
                                Tạo tài khoản mới
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login