/* ↓React Imports ALL */
import React, { useState, useEffect, useCallback } from 'react';
import { useLocation, Link } from 'react-router-dom';

/* ↓Redux and Firebase Imports ALL */
import { useDispatch } from 'react-redux';
import { useFirestoreConnect, useFirestore } from 'react-redux-firebase';
import { addInquiry } from '../../features/actions';

/* ↓Layouts */
import './Inquiry.css';

const InquiryConfirm = (props) => {

    /* ↓state変数「loading」を定義 */
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
            setInquiry(state);
            /* ↓ページローディングを開始する */
            setLoading(false);
        };
    }, [props]);

    /* ↓Inquiry.jsxのStateをuseLocationで受け取る。 */
    /* ↓Redux経由でFirestoreにデータを追加する */
    const { state } = useLocation();
    const [Inquiry, setInquiry] = useState({
        date: String(),
        name: String(),
        furigana: String(),
        email: String(),
        tel: String(),
        sex: String(),
        item: String(),
        content: String(),
        id: String(),
    });

    /* ↓↓Firestore連携 */
    const firestore = useFirestore();
    useFirestoreConnect('inquiries');

    /* ↓↓Redux連携 */
    const dispatch = useDispatch();
    const createInquiry = useCallback(
        (inquiry) => dispatch(addInquiry({ firestore }, inquiry)),
        [firestore]
    );
    
    /* ↓入力したデータを取得してデータベースに追加する */
    const handleChange = (e) => {
        setInquiry({ ...Inquiry, [e.target.id]: e.target.value });
    };
    
    const handleSubmit = () => {
        /* ↓入力された投稿がFirestoreに作成される */
        if (Inquiry.date.trim() === '' || Inquiry.name.trim() === '' || Inquiry.furigana.trim() === '' || Inquiry.email.trim() === '' || Inquiry.tel.trim() === '' || Inquiry.sex.trim() === '' || Inquiry.item.trim() === '' || Inquiry.content.trim() === '') return;
        createInquiry(Inquiry);
    };

    
    switch (loading) {
        case false:
        return (
            <div className='inquiryConfirm-wrapper'>
                <div className='bl-sect05'>
                    <div className='ly-cont'>
                        <ul className='un-step'>
                        <li className='un-step-item'><span className='step'>STEP1</span><span className='txt'>情報の入力</span></li>
                        <li className='un-step-item is-current'><span className='step'>STEP2</span><span className='txt'>入力内容の確認</span></li>
                        <li className='un-step-item'><span className='step'>STEP3</span><span className='txt'>送信完了</span></li>
                        </ul>
                    </div>
                </div>
                <div className='inquiryConfirm-form'>
                    <h2 className='inquiry-contentTitle'>お問い合わせ 内容確認</h2>
                    <p className='inquiryConfirm-subtitle-first'>お問い合わせ内容はこちらで宜しいでしょうか？</p>
                    <p className='inquiryConfirm-subtitle-second'>よろしければ「送信する」ボタンを押して下さい。</p>
                    <div className='inquiry-formInputs row'>
                        <div className='mb-3'>
                            <p>お問い合わせ日: <span className='inquiryConfirm-fontBold' onChange={handleChange}>{ Inquiry.date }</span></p>
                            <p><i className='fas fa-signature me-2' />お名前: <span className='inquiryConfirm-fontBold' onChange={handleChange}>{ Inquiry.name }</span></p>
                            <p><i className='fas fa-signature me-2' />ふりがな: <span className='inquiryConfirm-fontBold' onChange={handleChange}>{ Inquiry.furigana }</span></p>
                            <p><i className='fas fa-envelope me-2' />メールアドレス: <span className='inquiryConfirm-fontBold' onChange={handleChange}>{ Inquiry.email }</span></p>
                            <p><i className='fas fa-phone me-2' />電話番号: <span className='inquiryConfirm-fontBold' onChange={handleChange}>{ Inquiry.tel }</span></p>
                            <p><i className='fas fa-children me-2' />性別: <span className='inquiryConfirm-fontBold' onChange={handleChange}>{ Inquiry.sex }</span></p>
                            <p><i className='fas fa-file-circle-question me-2' />お問い合わせ項目: <span className='inquiryConfirm-fontBold' onChange={handleChange}>{ Inquiry.item }</span></p>
                            <p><i className='fas fa-pencil me-2' />お問い合わせ内容</p>
                            <textarea className='form-control' name='content' maxLength='1000' rows='15' value={ Inquiry.content } onChange={handleChange} disabled></textarea>
                        </div>
                    </div>
                    <div className='inquiry-btnDiv'>
                        <Link to='/inquiry' state={{ date: Inquiry.date, name: Inquiry.name, furigana: Inquiry.furigana, email: Inquiry.email, tel: Inquiry.tel === '未登録' ? '' : Inquiry.tel, sex: Inquiry.sex, hope: Inquiry.hope, item: Inquiry.item, content: Inquiry.content }}><button className='btn inquiryConfirm-fix'>内容を修正する</button></Link>
                        <Link to='/inquiry/thanks'><button className='btn' onClick={handleSubmit}>送信する</button></Link>
                    </div>
                </div>
            </div>
        )
        default: return null;
    };
};

export default InquiryConfirm;