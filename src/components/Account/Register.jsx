/* ↓React Imports ALL */
import React, { useState, useCallback } from 'react';

/* ↓Redux Imports ALL */
import { useDispatch } from 'react-redux';
import { useFirestoreConnect, useFirestore } from 'react-redux-firebase';
import { addUser } from '../../features/actions';

/* ↓Firebase Imports ALL */
import { auth, signupWithEmailAndPassword, onAuthStateChanged } from '../../firebase/database';

/* ↓Layouts */
import './Account.css';

/* ↓Utils */
import { MySwal } from '../../utils/Swal';
import { sha256 } from '../../utils/sha256';

/* ↓Images */
import AcAuth from '../../images/account/authentication.svg';
import DefaultUser from '../../images/account/default_user.svg';

const Register = () => {

    /* ↓state変数「user」を定義 */
    const [user, setUser] = useState(String());

    /* ↓Firestore連携 */
    const firestore = useFirestore();
    useFirestoreConnect('users');

    /* ↓Redux連携 */
    const dispatch = useDispatch();
    const createUser = useCallback(
        (user) => dispatch(addUser({ firestore }, user)),
        [firestore]
    );

    /* ↓パスワード表示制御用の状態変数 */
    const [isRevealPassword, setIsRevealPassword] = useState(Boolean(false));
    const [isRevealRePassword, setIsReRevealPassword] = useState(Boolean(false));

    /* ↓パスワード制御関数 */
    const togglePassword = (value) => {
        value === 0 ? (
            setIsRevealPassword((prevState) =>  !prevState)
        ) : value === 1 ? (
            setIsReRevealPassword((prevState) => !prevState)
        ) : (
            null
        );
    };

    /* 登録ボタンの制御判定 */
    const [disabled, setDisabled] = useState(Boolean(false));

    /* ↓チェックボックス制御判定 */
    const [check, setCheck] = useState(Boolean(false));

    /* ↓チェックボックスの判定 */
    const toggleCheck = () => {
        !check ? (
            setCheck(true)
        ) : (
            setCheck(false)
        );
    };

    /* ↓ユーザー登録用の状態変数 */
    const [registerationData, setRegisterationData] = useState({
        displayName: String(),
        email: String(),
        icon: DefaultUser,
        id: String(),
        uid: String(),
        password: String(),
        repassword: String(),
        twitter: String(),
        github: String(),
        introduce: String(),
        likeScraps: Array(),
        goodScraps: Array(),
        bookmarks: Array(),
        pt: Number(0),
    });

    /* ↓入力値を状態変数に追加 */
    const handleInputChange = (e) => {
        const target = e.target;
        const value = target.value;
        const name = target.name;
        setRegisterationData({ ...registerationData, [name]: value });
    };

    /* ↓ユーザーの登録処理 */
    const handleSubmit = async (event) => {
        event.preventDefault();
        !registerationData.displayName ? (
            MySwal.fire({
                title: 'エラー aE-0301',
                html : '名前が入力されていません。',
                icon : 'error',
                allowOutsideClick : false,
                allowEscapeKey : false,
            })
        ) : registerationData.password !== registerationData.repassword ? (
            MySwal.fire({
                title: 'エラー aE-0302',
                html : '入力したパスワードが合致しません。',
                icon : 'error',
                allowOutsideClick : false,
                allowEscapeKey : false,
            })
        ) : !check ? (
            MySwal.fire({
                title: 'エラー aE-0303',
                html : '利用規約とプライバシーポリシーの確認の上、チェックボックスにチェックを入れてください。',
                icon : 'error',
                allowOutsideClick : false,
                allowEscapeKey : false,
            })
        ) : (
            new Promise((resolve) => {
                setDisabled(true);
                /* ↓Authentication上でのユーザー追加 */
                signupWithEmailAndPassword(
                    registerationData.displayName.toString(),
                    registerationData.email.toString(),
                    registerationData.password.toString(),
                );
                try {
                    /* ↓FirestoreとReduxにユーザーデータを格納 */
                    createUser(registerationData);
                    /* ↓ログインしているかどうかを判定する */
                    onAuthStateChanged(auth, (currentUser) => {
                        setUser(currentUser)
                    });
                } catch (e) {
                    console.log(e)
                };

                resolve(registerationData.displayName);
                // 処理中ダイアログ
                MySwal.fire({
                    title: '処理中',
                    html: '処理終了まで画面はそのままにしてください。',
                    allowOutsideClick : false,
                    showConfirmButton: false,
                    timer: 2000,
                });
            })
            .then((promise) => {
                return new Promise((resolve, reject) => {
                    setTimeout(() => {
                        MySwal.fire({
                            title: `ようこそAvenu-Eへ、${promise}さん`,
                            html : '登録したメールアドレスに認証メールが送信されます。',
                            icon : 'success',
                            allowOutsideClick : false,
                            allowEscapeKey : false,
                        })
                        .then(() => {
                            window.location = '/';
                        });
                    }, 2000);
                })
            })
            .catch((err) => {
                console.log(err);
            })
        );
    };
    
    return (
        <div className='container my-5'>
            <h1 className='text-center emailAuth-title'>メールアドレスで登録する。</h1>
            <div className='text-center'><img src={ AcAuth } width='300' height='200' alt='AuthImage' /></div>
            <form onSubmit={handleSubmit}>
                <div className='bg-light d-flex p-5 col-6 mx-auto emailAuth-wrapper'>
                    <div className='mt-3'>
                        <label className='form-label'>ユーザー名</label>
                        <input type='text' className='form-control mb-3' placeholder='田中太郎' name='displayName' value={registerationData.displayName} onChange={handleInputChange} />
                    </div>
                    <div className='mb-3'>
                        <label className='form-label'>メールアドレス</label>
                        <input type='email' className='form-control' placeholder='taro1234@xxxx.com' name='email' value={registerationData.email} onChange={handleInputChange} />
                    </div>
                    <label className='form-label mt-3'>パスワード（英数字6文字以上）</label>
                    <div className='position-relative'>
                        <input type={isRevealPassword ? 'text' : 'password'} className='form-control mb-3' placeholder='パスワード' name='password' value={registerationData.password} onChange={handleInputChange} />
                        <span className='position-absolute bottom-50 end-0 pe-3' role='presentation' onClick={() => togglePassword(0)}>
                            {isRevealPassword ? (
                                <i className='fas fa-eye-slash pointer' />
                            ) : (
                                <i className='fas fa-eye pointer' />
                            )}
                        </span>    
                    </div>
                    <label className='form-label mt-3'>パスワードを再入力</label>
                    <div className='position-relative'>
                        <input type={isRevealRePassword ? 'text' : 'password'} className='form-control mb-3' placeholder='パスワードを再入力' name='repassword' value={registerationData.repassword} onChange={handleInputChange} />
                        <span className='position-absolute bottom-50 end-0 pe-3' role='presentation' onClick={() => togglePassword(1)}>
                            {isRevealRePassword ? (
                                <i className='fas fa-eye-slash pointer' />
                            ) : (
                                <i className='fas fa-eye pointer' />
                            )}
                        </span>
                    </div>
                    <div className='row mb-3'>
                        <div className='col-sm-10 offset-sm-2'>
                            <div className='form-check'>
                                <input type='checkbox' className='form-check-input' name='policy' onClick={toggleCheck} defaultChecked={check} />
                                <label className='form-check-label' htmlFor='policy'>
                                    <a href='/term' target='_blank' rel='noopener noreferrer'>利用規約</a>
                                    と
                                    <a href='/privacypolicy' target='_blank' rel='noopener noreferrer'>プライバシーポリシー</a>
                                    に同意する。
                                </label>
                            </div>
                        </div>
                    </div>
                    <button
                        className={!disabled ? 'btn btn-primary py-3 my-1 mx-5 mb-3' : 'btn btn-secondary py-3 my-1 mx-5 mb-3'}
                        disabled={disabled}>
                        {!disabled ? '登録' : '処理中'}
                    </button>
                    <a className='my-2 text-center' href='./login'>アカウントをお持ちの方はこちら</a>
                </div>
            </form>
            <div className='text-center'>
                <a className='btn btn-dark py-2 my-5 mx-5 col-6' href='/'>戻る</a>
            </div>
        </div>
    );

};

export default Register;