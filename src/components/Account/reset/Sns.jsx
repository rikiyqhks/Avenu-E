/* ↓React Imports ALL */
import React, { useEffect, useState } from 'react';

/* ↓Firebase Imports ALL */
import { linkWithSNS, unlinkSNS } from '../../../firebase/database';

/* ↓Layouts */
import '../Account.css';

const SNS = (props) => {

    /* ↓state変数「loading」を定義 */
    const [loading, setLoading] = useState(Boolean(true));

    /* ↓SNS連携制御用の状態変数 */
    const [sns, setSns] = useState({
        google: Boolean(false),
        github: Boolean(false),
    });

    useEffect(() => {
        /* ↓ユーザーが存在しなかった場合、ログインページに遷移させる */
        if (!props.user) {
            window.location = '/login';
        } else if (!props.user.emailVerified) {
            /* ↓メール未認証の場合エラーを返す */
            noVerifiedAccount();
        } else {
            props.user.providerData.map((user) => user.providerId).includes('google.com') && (
                setSns((prevState) => ({ ...prevState, google: true }))
            );
            props.user.providerData.map((user) => user.providerId).includes('github.com') && (
                setSns((prevState) => ({ ...prevState, github: true }))
            );
            /* ↓ページローディングを開始する */
            setLoading(false);
        };
    }, [props]);

    const handleSubmit = async (event) => {
        event.preventDefault();
    };

    switch (loading) {
        case false:
            return (
                <div className='container my-5'>
                    <div className='pt-5'></div>
                    <h1 className='pt-5 pb-4 text-center'>アカウントとSNSを連携する</h1>
                    <form onSubmit={handleSubmit}>
                        <div className='bg-light d-flex p-5 col-6 mx-auto reset-wrapper'>
                            {
                                props.user && (
                                    sns.google ? (
                                        <a className='btn btn-secondary py-3 my-1 mx-5 mb-3' onClick={() => unlinkSNS('google.com')} key={'google'}>Googleの連携を解除する（連携済み）</a>
                                    ) : (
                                        <a className='btn btn-primary py-3 my-1 mx-5 mb-3' onClick={() => linkWithSNS('google.com')} key={'google'}>Googleと連携する</a>
                                    )
                                )
                            }
                            {
                                props.user && (
                                    sns.github ? (
                                        <a className='btn btn-secondary py-3 my-1 mx-5 mb-5' onClick={() => unlinkSNS('github.com')} key={'github'}>Githubの連携を解除する（連携済み）</a>
                                    ) : (
                                        <a className='btn btn-success py-3 my-1 mx-5 mb-5' onClick={() => linkWithSNS('github.com')} key={'github'}>GitHubと連携する</a>
                                    )
                                )
                            }
                            <a className='btn btn-secondary py-3 my-1 mx-5 mb-3' href={'/profile?user=' + props.user.displayName}>マイページへ戻る</a>
                        </div>
                    </form>
                </div>
            );
        default: return null;
    };
};

export default SNS;