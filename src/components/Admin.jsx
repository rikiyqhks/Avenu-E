/* ↓React Imports ALL */
import React, { useEffect, useState } from 'react';

/* ↓Utils */
import { MySwal } from '../utils/Swal';
import { sha256 } from '../utils/sha256';

const Admin = (props) => {
    
    /* ↓リアルタイムで取得 */
    const [uid, setUid] = useState(String());
    const [pwd, setPwd] = useState(String());
    const [loading, setLoading] = useState(Boolean(true));

    /* ↓メール認証が確認できていないアカウントのみ発火する関数 */
    const noVerifiedAccount = async () => {
        await MySwal.fire({
            title: 'エラー aE-0307',
            html : '認証していないアカウントはこの機能をご利用できません。',
            icon : 'error',
            allowOutsideClick : false,
            allowEscapeKey : false
        }).then(() => {
            window.location = '/';
        })
    }

    useEffect(async() => {
        /* ↓ユーザーが存在しなかった場合、ログインページに遷移させる */
        !props.user ? (
            window.location = '/login'
        ) : (
            /* ↓メール未認証の場合エラーを返す */
            !props.user.emailVerified ? (
                noVerifiedAccount()
            ) : (   
            /* ↓ページローディングを開始する */
                setLoading(false)
            )
        )
    }, [props]);

    /* ↓ログイン関数 */
    const adminLogin = () => {
        (async () => {
            /* ↓入力値をハッシュ化 */
            const hashedUid = await sha256(uid);
            const hashedPwd = await sha256(pwd);

            /* ↓ハッシュ値が合致した場合にのみお問い合わせ管理画面に接続できる */
            hashedUid === '13cfa0b627fc52610aa53f188df73506606ffd04e7bb3e94e4aafcab2b728a5f' && hashedPwd === '83c318eb8488a71c4fad5ed1c22c2bc39b6daa1bd240861e9318edf3f6ac7ade' ? (
                window.location = 'admin/inquiry/list?id=' + props.user.uid
            ) : (
                MySwal.fire({
                    title: 'エラー aE-0101',
                    html : 'UID、またはパスワードが間違っています。',
                    icon : 'error',
                    allowOutsideClick : false,
                    allowEscapeKey : false,
                })
            ); 
        })();
    };

    /* ↓Enterキーを押すと実行 */
    window.document.onkeydown = (event) => {
        if (event.key === 'Enter') {
            adminLogin();
        };
    };

    switch (loading) {
        case false:
        return (
            <div className='admin-wrapper'>
                <div className='container'>
                    <div className='row justify-content-center'>
                        <div className='col-md-8'>
                            <div className='card-group'>
                                <div className='card p-4 bg-light'>
                                    <div className='card-body'>
                                        <h1>管理者ログイン</h1>
                                        <div className='input-group mb-3'>
                                            <div className='input-group-prepend'>
                                                <span className='input-group-text'>
                                                <i className='fas fa-user' />
                                                </span>
                                            </div>
                                            <input type='text' className='form-control' value={uid} onChange={(event) => setUid(event.target.value)} placeholder='ログインID' />
                                        </div>
                                        <div className='input-group mb-4'>
                                            <div className='d-flex'>
                                                <span className='input-group-text'>
                                                <i className='fas fa-key' />
                                                </span>
                                            </div>
                                            <input type='password' className='form-control' value={pwd} onChange={(event) => setPwd(event.target.value)} placeholder='パスワード' />
                                        </div>
                                        <div className='row'>
                                            <div className='col-md-6'>
                                                <button className='btn' onClick={() => adminLogin()}>ログイン</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
        default: return null;
    };
};

export default Admin;