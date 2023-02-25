/* ↓React Imports ALL */
import React, { useEffect, useState } from 'react';

/* ↓Firebase Imports ALL */
import { signinWithEmailAndPassword, signInWithSns } from '../../firebase/database';

/* ↓Layouts */
import './Account.css';

/* ↓Utils */
import { MySwal } from '../../utils/Swal';

/* ↓Images */
import AcLogin from '../../images/account/login.svg';

const Login = (props) => {

    const [loginData, setLoginData] = useState({
        email: String(),
        password: String(),
    });

    /* ↓パスワード表示制御用の状態変数 */
    const [isRevealPassword, setIsRevealPassword] = useState(Boolean(false));

    /* ↓パスワード制御関数 */
    const togglePassword = () => {
        setIsRevealPassword((prevState) =>  !prevState);
    };

    /* ↓入力値を状態変数に追加 */
    const handleInputChange = (e) => {
        const target = e.target;
        const value = target.value;
        const name = target.name;
        setLoginData({ ...loginData, [name]: value });
    };
  
    /* ↓関数「handleSubmit」を定義 */
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await signinWithEmailAndPassword(loginData.email, loginData.password);
        } catch(error) {
            alert('メールアドレスまたはパスワードが間違っています');
        };
    };

    /* ↓state変数「loading」を定義 */
    const [loading, setLoading] = useState(Boolean(true));

    /* ↓メール認証が確認できていないアカウントのみ発火する関数 */
    const isUser = async () => {
        await MySwal.fire({
            title: 'エラー aE-0401',
            html : `${props.user.displayName}でログイン中です。`,
            icon : 'error',
            allowOutsideClick : false,
            allowEscapeKey : false,
        }).then(() => {
            window.location = '/';
        });
    };

    /* ↓内部関数のローディングが完了したときに発火する */
    useEffect(() => {
        /* ↓ユーザーが存在しなかった場合、ログインページに遷移させる */
        if (!props.user) {
            /* ↓ページローディングを開始する */
            setLoading(false);
        } else {
            /* ↓ログイン中の場合エラーを返す */
            isUser()
        };
    }, []);

    switch (loading) {
        case false:
        return (
            <div className='container my-5'>
                <h1 className='login-title text-center'>既存のアカウントにログインする。</h1>
                <div className='text-center'><img src={ AcLogin } width='300' height='200' alt='LoginImage' /></div>
                <form onSubmit={handleSubmit}>
                    <div className='bg-light d-flex p-5 col-6 mx-auto login-wrapper'>
                        <h6 className='mt-3'>メールアドレス</h6>
                        <div className='input-group mb-3'>
                            <input type='email' className='form-control' placeholder='taro1234@xxxx.com' name='email' value={loginData.email} onChange={handleInputChange} />
                        </div>
                        <h6 className='mt-3'>パスワード</h6>
                        <div className='position-relative'>
                            <input type={isRevealPassword ? 'text' : 'password'} className='form-control mb-3' placeholder='パスワード' name='password' value={loginData.password} onChange={handleInputChange} />
                            <span className='position-absolute bottom-50 end-0 pe-3' role='presentation' onClick={() => togglePassword()}>
                                {isRevealPassword ? (
                                    <i className='fas fa-eye-slash pointer' />
                                ) : (
                                    <i className='fas fa-eye pointer' />
                                )}
                            </span>
                        </div>
                        <button className='btn login__btn py-3 my-1 mx-5 mt-2 mb-3'>ログイン</button>
                        <p className='text-center my-4'>-- 他の方法でログインする --</p>
                        <a className='btn btn-primary py-3 my-1 mx-5 mt-2' onClick={() => signInWithSns('google.com')}><i className='fa-brands fa-google me-2' />
                            Googleアカウントでログインする
                        </a>
                        <a className='btn btn-success py-3 my-1 mx-5 mt-2' onClick={() => signInWithSns('github.com')}><i className='fa-brands fa-github me-2' />
                            Githubでログインする
                        </a>
                        <a className='my-1 text-center' href='/register'>アカウントをお持ちではない方はこちら</a>
                        <a className='text-center' href='/password/reset'>パスワードをお忘れの方はこちら</a>
                    </div>
                </form>
                <div className='text-center'>
                    <a className='btn btn-dark py-2 my-5 mx-5 col-6' href='/'>トップページ</a>
                </div>
            </div>
        );
        default: return null;
    };
};

export default Login;