import './register.scss'
import { useHistory } from "react-router-dom";
import axios from 'axios'
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { registerNewUser } from '../../services/userService';

const Register = (props) => {
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const defaultValidInput = {
        isValidEmail: true,
        isValidPhone: true,
        isValidPassword: true,
        isValidConfirmPassword: true,
    }
    const [objCheckInput, setObjCheckInput] = useState(defaultValidInput)


    let history = useHistory();

    const handleLogin = () => {
        history.push('/login')
    }

    useEffect(() => {

    }, [])

    const isValidInput = () => {
        setObjCheckInput(defaultValidInput)
        if (!email) {
            setObjCheckInput({ ...defaultValidInput, isValidEmail: false })
            toast.error("Email is required!")
            return false
        }
        let re = /\S+@\S+\.\S+/;
        if (!re.test(email)) {
            setObjCheckInput({ ...defaultValidInput, isValidEmail: false })
            toast.error("Please enter a valid email address")
            return false
        }
        if (!phone) {
            setObjCheckInput({ ...defaultValidInput, isValidPhone: false })
            toast.error("Phone is required!")
            return false
        }
        if (!password) {
            setObjCheckInput({ ...defaultValidInput, isValidPassword: false })
            toast.error("Password is required!")
            return false
        }
        if (password !== confirmPassword) {
            setObjCheckInput({ ...defaultValidInput, isValidConfirmPassword: false })
            toast.error("Your password is not the same!")
            return false
        }
        return true
    }

    const handleRegister = async () => {
        let check = isValidInput()

        if (check === true) {
            let serverData = await registerNewUser(email, phone, username, password)
            if (+serverData.EC === 0) {
                toast.success(serverData.EM)
                history.push('/login')
            } else {
                toast.error(serverData.EM)
            }
        }
    }
    return (
        <div className="register-container">
            <div className='container pt-3'>
                <div className='row px-3 px-sm-0'>
                    <div className='left-content col-7 mt-5 d-none d-sm-block'>
                        <div className='brand'>facebook</div>
                        <div className='description'>Facebook giúp bạn kết nối và chia sẻ với mọi người trong cuộc sống của bạn.</div>
                    </div>
                    <div className='right-content col-sm-5 col-12 d-flex flex-column gap-3 py-3'>
                        <div className='brand text-center d-block d-sm-none'>facebook</div>
                        <div className='d-flex flex-column gap-3 flex-sm-row gap-sm-0'>
                            <div className='col-sm-6 pe-sm-1'>
                                <input type='text' placeholder='Email' className={objCheckInput.isValidEmail ? 'form-control' : 'form-control is-invalid'}
                                    value={email} onChange={(event) => setEmail(event.target.value)} />
                            </div>
                            <div className='col-sm-6 ps-sm-1'>
                                <input type='text' placeholder='Số điện thoại' className={objCheckInput.isValidPhone ? 'form-control' : 'form-control is-invalid'}
                                    value={phone} onChange={(event) => setPhone(event.target.value)} />
                            </div>
                        </div>
                        <input type='text' placeholder='Tên người dùng' className='form-control'
                            value={username} onChange={(event) => setUsername(event.target.value)} />
                        <input type='password' placeholder='Mật khẩu' className={objCheckInput.isValidPassword ? 'form-control' : 'form-control is-invalid'}
                            value={password} onChange={(event) => setPassword(event.target.value)} />
                        <input type='password' placeholder='Nhập lại mật khẩu' className={objCheckInput.isValidConfirmPassword ? 'form-control' : 'form-control is-invalid'}
                            value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} />
                        <button className='btn btn-primary' onClick={() => handleRegister()}>Đăng ký</button>
                        <hr />
                        <div className='text-center'>
                            <button className='btn btn-success' onClick={() => handleLogin()}>
                                Đã có tài khoản
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register