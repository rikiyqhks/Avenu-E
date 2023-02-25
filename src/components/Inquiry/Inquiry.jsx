/* ↓React Imports ALL */
import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';

/* ↓Layouts */
import './Inquiry.css';

/* ↓Utils */
import { MySwal } from '../../utils/Swal';

const Inquiry = (props) => {

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
            /* ↓ページローディングを開始する */
            setLoading(false);
        };
    }, [props]);

    /* ↓日付オブジェクトを作成する */
    const dd = new Date();
    /* ↓「年」を取得する */
    const YYYY = dd.getFullYear();
    /* ↓「月」を取得する */
    const MM = dd.getMonth()+1;
    /* ↓「日」を取得する */
    const DD = dd.getDate();

    const { state } = useLocation();

    const [values, setValues] = useState({
        date: YYYY + '年' + MM + '月' + DD + '日',
        name: String(),
        furigana: String(),
        email: String(),
        tel: String(),
        sex: String(),
        hope: String(),
        item: String(),
        content: String(),
    });

    /* ↓内容の修正時に値を受け取りなおす */
    if (state) useEffect(() => {setValues(state)}, []);

    const handleInputChange = (e) => {
        const target = e.target;
        const value = target.value;
        const name = target.name;
        setValues({ ...values, [name]: value });
    };

    const inputErr = (key) => {
        switch (key)  {
            case '0201':
                MySwal.fire({
                    title: 'エラー aE-0201',
                    html : '入力不備があります。',
                    icon : 'error',
                    allowOutsideClick : false,
                    allowEscapeKey : false,
                });
                break;
            case '0202':
                MySwal.fire({
                    title: 'エラー aE-0202',
                    html : '入力したメールアドレスの形式が違います。',
                    icon : 'error',
                    allowOutsideClick : false,
                    allowEscapeKey : false,
                });
                break;
            case '0203':
                MySwal.fire({
                    title: 'エラー aE-0203',
                    html : '入力した電話番号の形式が違います。',
                    icon : 'error',
                    allowOutsideClick : false,
                    allowEscapeKey : false,
                });
                break;
            case '0204':
                MySwal.fire({
                    title: 'エラー aE-0204',
                    html : '質問内容は1000文字以内でご記入下さい。',
                    icon : 'error',
                    allowOutsideClick : false,
                    allowEscapeKey : false,
                });
                break;
            default: break;
        };
    };
    
    switch (loading) {
        case false:
        return (
            <div className='inquiry-wrapper'>
                <div className='bl-sect05'>
                    <div className='ly-cont'>
                        <ul className='un-step'>
                        <li className='un-step-item is-current'><span className='step'>STEP1</span><span className='txt'>情報の入力</span></li>
                        <li className='un-step-item'><span className='step'>STEP2</span><span className='txt'>入力内容の確認</span></li>
                        <li className='un-step-item'><span className='step'>STEP3</span><span className='txt'>送信完了</span></li>
                        </ul>
                    </div>
                </div>
                <div className='inquiry-form'>
                    <h2 className='inquiry-contentTitle'>お問い合わせ 内容入力</h2>
                    <p>
                        こちらではAvenu-Eのサービス、機能、デバッグ情報・改善、感想や意見に関するお問い合わせを承っています。<br />
                        下記のフォームに必要項目をご記入頂き、「確認画面へ」ボタンを押して下さい。
                    </p>
                    <div className='inquiry-formInputs row'>
                        <div className='mb-3'>
                            <p>お問い合わせ日: {YYYY + '年' + MM + '月' + DD + '日'}</p>
                        </div>
                        <div>
                            <label className='mb-2'><i className='fas fa-signature me-2' />お名前 <span className='mx-1 required'>必須</span></label>
                            <input className='form-control' type='text' name='name' placeholder='例）山田太郎' value={values.name} onChange={handleInputChange} />
                        </div>
                        <div>
                            <label className='mb-2'><i className='fas fa-signature me-2' />ふりがな <span className='mx-1 required'>必須</span></label>
                            <input className='form-control' type='text' name='furigana' placeholder='例）やまだたろう' value={values.furigana} onChange={handleInputChange} />
                        </div>
                        <div>
                            <label className='mb-2'><i className='fas fa-envelope me-2' />メールアドレス <span className='mx-1 required'>必須</span></label>
                            <input className='form-control' type='email' name='email' placeholder='例）guest@example.com' value={values.email} onChange={handleInputChange} />
                        </div>
                        <div>
                            <label className='mb-2'><i className='fas fa-phone me-2' />電話番号 ( - ハイフンなしで入力 ) <span className='mx-1 any'>任意</span></label>
                            <input className='form-control' type='tel' name='tel' placeholder='例）0000000000' value={values.tel} onChange={handleInputChange} />
                        </div>
                        <div>
                            <label className='mb-2'><i className='fas fa-children me-2' />性別 <span className='mx-1 required'>必須</span></label>
                            <input className='form-check-input inquiry-radio' type='radio' name='sex' value='男性' onChange={handleInputChange} checked={values.sex === '男性' ? (true) : ('')} />
                            <label className='ms-1'>男性</label>
                            <input className='form-check-input inquiry-radio' type='radio' name='sex' value='女性' onChange={handleInputChange} checked={values.sex === '女性' ? (true) : ('')} />
                            <label className='ms-1'>女性</label>
                            <input className='form-check-input inquiry-radio' type='radio' name='sex' value='その他' onChange={handleInputChange} checked={values.sex === 'その他' ? (true) : ('')} />
                            <label className='ms-1'>その他</label>
                        </div>
                        <div>
                            <label className='mb-2'><i className='fas fa-reply-all me-2' />回答の希望 <span className='mx-1 required'>必須</span></label>
                            <input className='form-check-input inquiry-radio' type='radio' name='hope' value='希望する' onChange={handleInputChange} checked={values.hope === '希望する' ? (true) : ('')} />
                            <label className='ms-1'>希望する</label>
                            <input className='form-check-input inquiry-radio' type='radio' name='hope' value='希望しない' onChange={handleInputChange} checked={values.hope === '希望しない' ? (true) : ('')} />
                            <label className='ms-1'>希望しない</label>
                        </div>
                        <div>
                            <label className='mb-2'><i className='fas fa-file-circle-question me-2' />お問い合わせ項目 <span className='mx-1 required'>必須</span></label>
                            <select className='form-select' name='item' value={values.item} onChange={handleInputChange}>
                                <option value=''>お問い合わせ項目を選択してください</option>
                                <option value='ご質問・お問い合わせ'>ご質問・お問い合わせ</option>
                                <option value='ご意見・ご感想'>ご意見・ご感想</option>
                            </select>
                        </div>
                        <div>
                            <label className='mb-2'><i className='fas fa-pencil me-2' />お問い合わせ内容 ( 1000文字以内 ) <span className='mx-1 required'>必須</span></label>
                            <textarea className='form-control' name='content' maxLength={1000} rows='15' placeholder='お問合せ内容を入力' value={values.content} onChange={handleInputChange}></textarea>
                        </div>
                    </div>
                    <div className='inquiry-btnDiv'>
                        {
                            /* ↓入力バリデーション */
                            values.date && values.name && values.furigana && values.sex && values.hope && values.item && values.content ? (
                                /* ↓メールアドレスバリデーション */
                                !values.email.match(/.+@.+\..+/) ? (
                                    <button className='btn' onClick={() => inputErr('0202')}>確認画面へ</button>
                                /* ↓電話番号バリデーション */
                                ) : values.tel !== '' && !values.tel.match(/^0\d{9,10}$/) ? (
                                    <button className='btn' onClick={() => inputErr('0203')}>確認画面へ</button>
                                /* ↓質問内容バリデーション */
                                ) : values.content.length > 1000 ? (
                                    <button className='btn' onClick={() => inputErr('0204')}>確認画面へ</button>
                                /* ↓電話番号未登録の場合、すべてが正しい場合のみリンクが付与されたボタンが表示される */
                                ) : values.tel === '' ? (
                                    <Link to='/inquiry/confirm' state={{ date: values.date, name: values.name, furigana: values.furigana, email: values.email, tel: '未登録', sex: values.sex, hope: values.hope, item: values.item, content: values.content }}><button className='btn'>確認画面へ</button></Link>
                                /* ↓すべてが正しい場合のみリンクが付与されたボタンが表示される */
                                ) : (
                                    <Link to='/inquiry/confirm' state={{ date: values.date, name: values.name, furigana: values.furigana, email: values.email, tel: values.tel, sex: values.sex, hope: values.hope, item: values.item, content: values.content }}><button className='btn'>確認画面へ</button></Link>
                                )
                            ) : (
                                /* ↓入力不備 */
                                <button className='btn' onClick={() => inputErr('0201')}>確認画面へ</button>
                            )
                        }
                    </div>
                </div>
            </div>
        );
        default: return null;   
    };
};

export default Inquiry;