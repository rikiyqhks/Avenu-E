/* ↓React Imports ALL */
import React, { useEffect, useState, useRef } from 'react';

/* ↓Firebase Imports ALL */
import { collection, onSnapshot } from 'firebase/firestore';
import { db, updateUserPassword } from '../../../firebase/database';

/* ↓Utils */
import { MySwal } from '../../../utils/Swal';

/* ↓Layouts */
import '../Account.css';

const ResetPassword = (props) => {

    const [loginData, setLoginData] = useState(Object());

    /* ↓state変数「loading」を定義 */
    const [loading, setLoading] = useState(Boolean(true));

    /* ↓パスワード表示制御用の状態変数 */
    const [oldRevealPassword, setOldRevealPassword] = useState(Boolean(false));
    const [newRevealPassword, setNewRevealPassword] = useState(Boolean(false));
    const [reNewRevealPassword, setReNewRevealPassword] = useState(Boolean(false));

    /* ↓パスワード制御関数 */
    const togglePassword = async (key) => {
        key === 'old' ? (
            setOldRevealPassword((prevState) => !prevState)
        ) : key === 'new' ? (
            setNewRevealPassword((prevState) => !prevState)
        ) : key === 'reNew' ? (
            setReNewRevealPassword((prevState) => !prevState)
        ) : (
            await MySwal.fire({
                title: 'エラーを検知しました',
                html : '不正な値です。',
                icon : 'error',
                allowOutsideClick : false,
                allowEscapeKey : false
            })
        );
    };

    const oldPasswordRef = useRef(String());
    const newPasswordRef = useRef(String());
    const reNewPasswordRef = useRef(String());

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

    const updatePassword = async (newPassword, userProvidedPassword) => {
        props.user && (
            loginData.password === oldPasswordRef.current.value ? (
                newPasswordRef.current.value === reNewPasswordRef.current.value && newPasswordRef.current.value !== oldPasswordRef.current.value ? (
                    await updateUserPassword(newPassword, userProvidedPassword, loginData.id)
                ) : (
                    await MySwal.fire({
                        title: 'エラー aE-0402',
                        html : 'パスワードが間違っているか、同じパスワードを使用しています。',
                        icon : 'error',
                        allowOutsideClick : false,
                        allowEscapeKey : false
                    })
                )
            ) : (
                await MySwal.fire({
                    title: 'エラー aE-0407',
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
                    <h1 className='pt-5 pb-4 text-center'>パスワードの再設定</h1>
                    <form onSubmit={handleSubmit}>
                        <div className='bg-light d-flex p-5 col-6 mx-auto reset-wrapper'>
                            <h6 className='mt-1 pb-2'>古いパスワードを入力してください。</h6>
                            <div className='position-relative'>
                                <input type={oldRevealPassword ? 'text' : 'password'} className='form-control mb-3' placeholder='古いパスワード' ref={oldPasswordRef} />
                                <span className='position-absolute bottom-50 end-0 pe-3' role='presentation' onClick={() => togglePassword('old')}>
                                    {oldRevealPassword ? (
                                        <i className='fas fa-eye-slash pointer' />
                                    ) : (
                                        <i className='fas fa-eye pointer' />
                                    )}
                                </span>
                            </div>
                            <h6 className='mt-1 pb-2'>新しいパスワードを入力してください。</h6>
                            <div className='position-relative'>
                                <input type={newRevealPassword ? 'text' : 'password'} className='form-control mb-3' placeholder='新しいパスワード' ref={newPasswordRef} />
                                <span className='position-absolute bottom-50 end-0 pe-3' role='presentation' onClick={() => togglePassword('new')}>
                                    {newRevealPassword ? (
                                        <i className='fas fa-eye-slash pointer' />
                                    ) : (
                                        <i className='fas fa-eye pointer' />
                                    )}
                                </span>
                            </div>
                            <h6 className='mt-1 pb-2'>新しいパスワードをもう一度入力してください。</h6>
                            <div className='position-relative'>
                                <input type={reNewRevealPassword ? 'text' : 'password'} className='form-control mb-3' placeholder='もう一度新しいパスワード' ref={reNewPasswordRef} />
                                <span className='position-absolute bottom-50 end-0 pe-3' role='presentation' onClick={() => togglePassword('reNew')}>
                                    {reNewRevealPassword ? (
                                        <i className='fas fa-eye-slash pointer' />
                                    ) : (
                                        <i className='fas fa-eye pointer' />
                                    )}
                                </span>
                            </div>
                            <button className='btn btn-success py-3 my-1 mx-5 mb-3' onClick={() => updatePassword(newPasswordRef.current.value, oldPasswordRef.current.value)}>変更する</button>
                            <a className='btn btn-secondary py-3 my-1 mx-5 mb-3' href={'/profile?user=' + props.user.displayName}>マイページへ戻る</a>
                        </div>
                    </form>
                </div>
            );
        default: return null;
    };
};

export default ResetPassword;