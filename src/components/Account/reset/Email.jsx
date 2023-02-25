/* ↓React Imports ALL */
import React, { useEffect, useState, useRef } from 'react';

/* ↓Firebase Imports ALL */
import { collection, onSnapshot } from 'firebase/firestore';
import { db, updateUserEmail } from '../../../firebase/database';

/* ↓Utils */
import { MySwal } from '../../../utils/Swal';

/* ↓Layouts */
import '../Account.css';

const ResetEmail = (props) => {

    const [loginData, setLoginData] = useState(Object());

    /* ↓state変数「loading」を定義 */
    const [loading, setLoading] = useState(Boolean(true));

    /* ↓パスワード表示制御用の状態変数 */
    const [isRevealPassword, setIsRevealPassword] = useState(Boolean(false));

    /* ↓パスワード制御関数 */
    const togglePassword = () => {
        setIsRevealPassword((prevState) =>  !prevState);
    };

    const emailRef = useRef(String());
    const passwordRef = useRef(String());

    useEffect(() => {
        /* ↓ユーザーが存在しなかった場合、ログインページに遷移させる */
        if (!props.user) {
            window.location = '/login';
        } else {
            /* ↓データベースからデータを取得 */
            const usersData = collection(db, 'users');
            /* ↓リアルタイムにデータベースからデータを取得 */
            onSnapshot(usersData, (users) => {
                users.docs.map((doc) => {
                    if(doc.data().email === props.user.email) setLoginData(doc.data());
                });
            });
            /* ↓ページローディングを開始する */
            setLoading(false);
        };
    }, [props]);

    const updateEmail = async (newEmail, userProvidedPassword) => {
        props.user && (
            loginData.password === passwordRef.current.value ? (
                await updateUserEmail(newEmail, userProvidedPassword, loginData.id)
            ) : (
                await MySwal.fire({
                    title: 'エラー aE-0402',
                    html : 'パスワードが間違っています。',
                    icon : 'error',
                    allowOutsideClick : false,
                    allowEscapeKey : false
                })
            )
        );
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
    };

    switch (loading) {
        case false:
            return (
                <div className='container my-5'>
                    <div className='pt-5'></div>
                    <h1 className='pt-5 pb-4 text-center'>メールアドレスの再設定</h1>
                    <form onSubmit={handleSubmit}>
                        <div className='bg-light d-flex p-5 col-6 mx-auto reset-wrapper'>
                            <h6 className='mt-1 pb-2'>新しいメールアドレスを入力してください。</h6>
                            <div className='input-group mb-3'>
                                <input type='email' className='form-control' placeholder='taro1234@xxxx.com' ref={emailRef} />
                            </div>
                            <h6 className='mt-1 pb-2'>パスワード</h6>
                            <div className='position-relative'>
                                <input type={isRevealPassword ? 'text' : 'password'} className='form-control mb-3' placeholder='パスワード' ref={passwordRef} />
                                <span className='position-absolute bottom-50 end-0 pe-3' role='presentation' onClick={() => togglePassword()}>
                                    {isRevealPassword ? (
                                        <i className='fas fa-eye-slash pointer' />
                                    ) : (
                                        <i className='fas fa-eye pointer' />
                                    )}
                                </span>
                            </div>
                            <button className='btn btn-success py-3 my-1 mx-5 mb-3' onClick={() => updateEmail(emailRef.current.value, passwordRef.current.value)}>変更する</button>
                            <a className='btn btn-secondary py-3 my-1 mx-5 mb-3' href={'/profile?user=' + props.user.displayName}>マイページへ戻る</a>
                        </div>
                    </form>
                </div>
            );
        default: return null;
    };
};

export default ResetEmail;