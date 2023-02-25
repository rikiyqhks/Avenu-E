/* ↓React Imports ALL */
import React, { useCallback, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/* ↓Redux Imports ALL */
import { useDispatch } from 'react-redux';
import { useFirestoreConnect, useFirestore } from 'react-redux-firebase';
import { addLog } from '../../features/actions';

/* ↓Firebase Imports ALL */
import { collection, onSnapshot, Timestamp,
     doc, deleteDoc, getDoc, query, orderBy, limit } from 'firebase/firestore';
import { db } from '../../firebase/database';

/* ↓Layouts */
import './Inquiry.css';

/* ↓Utils */
import RandomURL from '../../utils/RandomURL';
import { MySwal } from '../../utils/Swal';
import { Sort } from '../../utils/Sort';

// クライアントデータ取得API
// const IPGeolocationAPI = require('ip-geolocation-api-javascript-sdk');
// let ipgeolocationApi = new IPGeolocationAPI('94357577b9974eabbbd5c69e8f8589f1', false); 

const InquiryManagementForm = (props) => {

    /* ↓state変数「loading」を定義 */
    const [loading, setLoading] = useState(Boolean(true));

    /* ↓メール認証が確認できていないアカウントのみ発火する関数 */
    const noVerifiedAccount = async () => {
        await MySwal.fire({
            title: 'エラー aE-0307',
            html : '認証していないアカウントはこの機能をご利用できません。',
            icon : 'error',
            allowOutsideClick : false,
            allowEscapeKey : false,
        }).then(() => {
            window.location = '/';
        });
    };

    // Firestore連携
    const firestore = useFirestore();
    useFirestoreConnect('serverlogs');

    // Redux連携
    const dispatch = useDispatch();
    const createLogs = useCallback(
        (log) => dispatch(addLog({ firestore }, log)),
        [firestore]
    );

    // IPアドレスのステート変数
    const [log, setLogs] = useState({
        IPv4: String(),
        countryArea: String(),
        countryName: String(),
        city: String(),
        zipcode: String(),
        isp: String(),
        logType: String(),
        loginedUid: String(),
        timestamp: String(),
    });

    // function handleResponse(json) {
    //     // APIからIPアドレスを取得する
    //     setLogs({IPv4: json.ip, countryArea: json.continent_name, countryName: json.country_name, city: json.city, zipcode: json.zipcode, isp: json.isp , logType: 'admin', loginedUid: 'test', timestamp: Timestamp.fromDate(new Date())});
    // };

    // Firestoreから直接表示させる
    const [inquiryList, displayInquiries] = useState(Array());

    // データベースからデータを取得
    const inquiryData = collection(db, 'inquiries');

    // 並び替えシステム
    const [inquiryOrderBy, setOrderbySys] = useState({
        order: 'desc', // 順番のデフォルト値 -> desc(降順)
        field: 'date', // フィールドのデフォルト値 -> date(日付順)
    });

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
            // リアルタイムにデータベースからデータを取得
            onSnapshot(query(inquiryData, orderBy(inquiryOrderBy.field, inquiryOrderBy.order), limit(10)), (inquiry) => {
                displayInquiries(inquiry.docs.map((doc) => ({ ...doc.data() })));
            })
            // お問い合わせ管理システムページにログインしたユーザの位置情報をログに保存
            // ipgeolocationApi.getGeolocation(handleResponse);
        };
    }, [props]);

    /* ↓トランザクションIDが存在しない場合不正なアクセスとみなす */
    if (!new URLSearchParams(useLocation().search).get('id')) {
        MySwal.fire({
            title: 'エラー aE-0307',
            html : '不正なアクセスです',
            icon : 'error',
            allowOutsideClick : false,
            allowEscapeKey : false,
        }).then(() => {
            window.location = '/';
        });
    }

    // JSONデータを検証してデータベースに追加
    // if (log.IPv4.trim() === '' || log.countryArea.trim() === '' || log.countryName.trim() === '' || log.city.trim() === '' || log.zipcode.trim() === '' ||   log.isp.trim() === '' || log.logType.trim() === '' || log.loginedUid.trim() === '') return;
    // createLogs(log);

    const deleteInquiry = (id) => {
        // 確認ダイアログ
        MySwal.fire({
            title: 'お問い合わせ内容の削除',
            html: '<strong>本当に実行してもよろしいですか？<br>※処理には数分かかります。</strong>',
            icon: 'warning',
            showCancelButton: true,
            allowOutsideClick : false,
            allowEscapeKey : false,
            confirmButtonText: '続ける',
            cancelButtonText: 'やめる',
            confirmButtonColor: '#d33',
            reverseButtons: true,
        }).then((result) => {
            // キャンセル時
            if (!result.value) {
                //何もしない
                return;
            }
            
            // 処理中ダイアログ
            let timerInterval;
            MySwal.fire({
                title: '処理中',
                html: '処理終了まで画面はそのままにしてください。<br>残り<b></b> milliseconds..',
                allowOutsideClick : false,
                showConfirmButton: false,
                timer: 2000,
                timerProgressBar: true,
                didOpen: () => {
                    MySwal.showLoading();
                    const b = MySwal.getHtmlContainer().querySelector('b');
                    timerInterval = setInterval(() => {
                        b.textContent = MySwal.getTimerLeft();
                    }, 100);
                },
                willClose: () => {
                    clearInterval(timerInterval);
                }
            }).then(async() => {
                await deleteDoc(doc(db, 'inquiries', id));
                // 完了ダイアログ
                MySwal.fire({
                    title: '処理終了',
                    html : 'ドキュメントが削除されました',
                    icon : 'success',
                    allowOutsideClick : false,
                    allowEscapeKey : false,
                });            
            });
        });
    };

    switch (loading) {
        case false:
        return (
            <div className='inquiryManagementForm-wrapper'>
                <div className='InquiryManagementForm-title'>
                    <p className='display-5 text-center mt-3'>お問い合わせ管理画面</p>
                </div>
                <div className='table-responsive-sm'>
                    <div className='inquiryManagementForm-btnWrapper'>
                        <Sort label={<div><i className='fas fa-filter me-2' />ドキュメントの並び替え</div>}>
                            <div className='d-flex'>
                                <h3>絞り込み</h3>
                                <a className='ms-2' href='/'>クリア</a>
                            </div>
                            <hr />
                            <h5>フィルタ条件のフィールド</h5>
                            <div className='inline-radio'>
                                <div><input type='radio' name='field' /><label>id</label></div>
                                <div><input type='radio' name='field' defaultChecked /><label>日付</label></div>
                                <div><input type='radio' name='field' /><label>名前</label></div>
                                <div><input type='radio' name='field' /><label>お問い合わせ項目</label></div>
                                <div><input type='radio' name='field' /><label>回答の希望</label></div>
                            </div>
                            <hr />
                            <h5>条件を追加</h5>
                            <p className='text-muted'>指定されたフィールドが条件を満たすドキュメントのみを表示</p>
                            <select className='form-select'>
                                <option value='0'>条件なし</option>
                                <option value='1'>(==) 次に等しい</option>
                                <option value='2'>(!=) 等しくない</option>
                                <option value='3'>(&gt;) 次の値より大きい</option>
                                <option value='4'>(&gt;=) 次の値以上</option>
                                <option value='5'>(&lt;) 次の値より小さい</option>
                                <option value='6'>(&lt;=) 次の値以下</option>
                            </select>
                            <input className='form-control mt-2' type='text' placeholder='文字列を入力' />
                            <hr />
                            <h5>検索結果を並び替える</h5>
                            <div className='inline-radio'>
                                <div><input type='radio' name='sort' /><label>昇順 (asc)</label></div>
                                <div><input type='radio' name='sort' defaultChecked /><label>降順 (desc)</label></div>
                            </div>
                            <div className='position-relative'><button className='btn position-absolute end-0'>絞り込み検索</button></div>
                        </Sort>
                        <button className='btn'><i className='fas fa-envelopes-bulk me-2' />メールで返信 </button>
                        <button className='btn' onClick={() => window.location.reload()}><i className='fas fa-rotate me-2' />ページの更新 </button>
                    </div>
                    <table className='table table-sm table-striped table-hover caption-top mb-5 text-center align-middle'>
                        <caption>お問い合わせ一覧 ( トランザクションid : {RandomURL.slice(1)} )</caption>
                        <thead className='table-dark'>
                            <tr className='table-title'>
                                <th scope='col'>#</th>
                                <th scope='col'>日付</th>
                                <th scope='col'>名前</th>
                                <th scope='col'>お問い合わせ項目</th>
                                <th scope='col'>回答の希望</th>
                                <th scope='col'>お問い合わせ内容</th>
                                <th scope='col'>削除</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* データベースに登録された質問内容を一つ一つ表示(ForEach構文に似たmap関数を使用) */}
                            {inquiryList ? (
                                inquiryList.map((inquiries, index) => (
                                    <tr key={inquiries.name + index}>
                                        <th scope='row'>{index + 1}</th>
                                        <td>{inquiries.date}</td>
                                        <td>{inquiries.name}</td>
                                        <td>{inquiries.item}</td>
                                        <td>{inquiries.hope}</td>
                                        <td>{inquiries.content}</td>
                                        <td>
                                            {/* {
                                                onSnapshot(collection(db, 'inquiries'), (snapshot) => {
                                                    displayInquiries(snapshot.docs.forEach((doc) => console.log({ ...doc.id })));
                                                })
                                            } */}
                                            <button className='btn btn-sm btn-danger' onClick={() => deleteInquiry(inquiries.id)}>削除</button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                // 動作確認できてない
                                <div>
                                    <i className='fas fa-spinner fa-pulse' />
                                    <h1>読み込み中です。</h1>
                                </div>
                            )}
                        </tbody>
                        <tfoot className='table-dark'>
                            <tr className='table-title'>
                                <th scope='col'>#</th>
                                <th scope='col'>日付</th>
                                <th scope='col'>名前</th>
                                <th scope='col'>お問い合わせ項目</th>
                                <th scope='col'>回答の希望</th>
                                <th scope='col'>お問い合わせ内容</th>
                                <th scope='col'>削除</th>
                            </tr>
                        </tfoot>
                    </table>
                    <div className='paginator'>
                        <button className='btn'>&lt; prev</button>
                        <button className='btn'>next &gt;</button>
                    </div>
                </div>
            </div>
        );
        default: return null;
    };
};

export default InquiryManagementForm;