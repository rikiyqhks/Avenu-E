/* ↓React Imports ALL */
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

/* ↓Layouts */
import './Inquiry.css';

/* ↓Images */
import Completed from '../../images/inquiry/complete.svg';

const InquiryThanks= (props) => {

    /* ↓state変数「loading」を定義 */
    const [loading, setLoading] = useState(Boolean());

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
        });
    };

    /* ↓内部関数のローディングが完了したときに発火する */
    useEffect(() => {
        /* ↓ユーザーが存在しなかった場合、ログインページに遷移させる */
        if (!props.user) {
            window.location = '/login';
        } else if (!props.user.emailVerified) {
            /* ↓メール未認証の場合エラーを返す */
            noVerifiedAccount();
        } else {
            /* ↓ページローディングを開始する */
            setLoading(false);
        };
    }, [props]);

    switch (loading) {
        case false:
        return (
            <div className='inquiryThanks-wrapper'>
                <div className='bl-sect05'>
                    <div className='ly-cont'>
                        <ul className='un-step'>
                        <li className='un-step-item'><span className='step'>STEP1</span><span className='txt'>情報の入力</span></li>
                        <li className='un-step-item'><span className='step'>STEP2</span><span className='txt'>入力内容の確認</span></li>
                        <li className='un-step-item is-current'><span className='step'>STEP3</span><span className='txt'>送信完了</span></li>
                        </ul>
                    </div>
                </div>
                <div className='inquiryThanks-form'>
                    <h2 className='inquiry-contentTitle'>お問い合わせ 送信完了</h2>
                    <img src={ Completed } width='300' height='200' alt='CompletedImage' />
                    <p className='inquiryConfirm-subtitle-first'>お問い合わせありがとうございました。</p>
                    <p className='inquiryConfirm-subtitle-first'>内容を確認のうえ、回答させて頂きます。</p>
                    <p className='inquiryConfirm-subtitle-second'>しばらくお待ちください。</p>
                    <div className='inquiry-btnDiv'>
                        <Link to='/inquiry'><button className='btn'>お問い合わせに戻る</button></Link>
                    </div>
                </div>
            </div>
        );
        default: return null;
    };
};

export default InquiryThanks;