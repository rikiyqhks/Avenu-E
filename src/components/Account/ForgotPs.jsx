/* ↓React Imports ALL */
import React, { useRef } from 'react';

/* ↓Firebase Imports ALL */
import { sendUserPasswordResetEmail } from '../../firebase/database';

/* ↓Layouts */
import './Account.css';

/* ↓Utils */
import { MySwal } from '../../utils/Swal';

/* ↓Images */
import AcForgotPs from '../../images/account/forgotPs.svg';

const ForgotPs = () => {

    /* ↓state変数「loading」を定義 */
    const [loading, setLoading] = useState(Boolean(true));

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

    const emailRef = useRef(String());

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

    switch (loading) {
        case false:
        return (
            <div className='container my-5'>
                <h1 className='text-center forgotPs-title'>パスワードの再設定</h1>
                <div className='text-center'><img src={ AcForgotPs } width='300' height='200' alt='ForgotPsImage' /></div>
                <div className='bg-light d-flex p-5 col-6 mx-auto forgotPs-wrapper'>
                    <h6 className='mt-1 pb-2 text-center'>入力していただいたメールアドレスに<br />再設定用の案内が届きます。</h6>
                    <div className='input-group mb-3'>
                        <input type='email' className='form-control' placeholder='taro1234@xxxx.com' name='email' ref={emailRef} />
                    </div>
                    <a className='btn btn-warning py-3 my-1 mx-5 mb-3' onClick={() => sendUserPasswordResetEmail(emailRef.current.value)}>送信する</a>
                    <p className='text-center'>
                        SNSログインで登録されている場合は、
                        <a href='/login'>パスワードを設定</a>
                        してください。
                    </p>
                </div>
                <div className='text-center'>
                    <a className='btn btn-dark py-2 my-5 mx-5 col-6 text' href='/login'>ログインページ</a>
                </div>
            </div>
        );
        default: return null;
    };
};

export default ForgotPs;