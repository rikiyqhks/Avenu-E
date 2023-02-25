/* ↓React Imports ALL */
import React, { useEffect, useState } from 'react';

/* ↓Firebase Imports ALL */
import { db, withdrawal } from '../../firebase/database';
import { collection, onSnapshot } from 'firebase/firestore';

/* ↓Layouts */
import './Account.css';

/* ↓Images */
import Email from '../../images/account/email.svg';
import Tel from '../../images/account/tel.svg';
import Password from '../../images/account/password.svg';
import Profile from '../../images/account/profile.svg';
import Favorite from '../../images/account/favorite.svg';
import Post from '../../images/account/post.svg';

const EditMetadata = (props) => {

    const [userData, setUserData] = useState(Object());

    /* ↓state変数「loading」を定義 */
    const [loading, setLoading] = useState(Boolean(true));

    /* ↓データベースからデータを取得 */
    const usersData = collection(db, 'users');

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
            /* ↓リアルタイムにデータベースからデータを取得 */
            onSnapshot(usersData, (users) => {
                users.docs.map((doc) => {
                    if(doc.data().email === props.user.email) setUserData(doc.data());
                });
            })
        };
    }, [!loading]);

    switch (loading) {
        case false:
        return (
            <div className='container my-5'>
                <div className='mb-4'>
                    <h6>ユーザー識別子: {props.user && props.user.uid}</h6>
                    <h6>データベースID: {props.user && userData.id}</h6>
                    <h6>メール認証: {props.user && props.user.emailVerified ? '認証済み' : '未認証'}</h6>
                </div>
                <div className='ya-card-row'>
                    <div className='ya-card-cell'>
                        <a href='/profile/reset/email' className='ya-card__whole-card-link'>
                            <div data-card-identifier='YourOrders' className='a-box ya-card--rich'>
                                <div className='a-box-inner'>
                                    <div className='a-row'>
                                        <div className='a-column a-span3'>
                                            <img className='metaImg' alt='メールアドレス' src={Email} />
                                        </div>
                                        <div className='a-column a-span9 a-span-last'>
                                            <h2 className='a-spacing-none ya-card__heading--rich a-text-normal'>E-Mail</h2>
                                            <div><span className='a-color-secondary'>メールアドレスの変更</span></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </a>
                    </div>
                    <div className='ya-card-cell'>
                        <a href='/profile/reset/sns' className='ya-card__whole-card-link'>
                            <div data-card-identifier='SignInAndSecurity' className='a-box ya-card--rich'>
                                <div className='a-box-inner'>
                                    <div className='a-row'>
                                        <div className='a-column a-span3'>
                                            <img className='metaImg' alt='SNS連携' src={Tel} />
                                        </div>
                                        <div className='a-column a-span9 a-span-last'>
                                            <h2 className='a-spacing-none ya-card__heading--rich a-text-normal'>SNS連携</h2>
                                            <div><span className='a-color-secondary'>アカウントとSNSを紐付ける</span></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </a>
                    </div>
                    <div className='ya-card-cell'>
                        <a href='/profile/reset/password' className='ya-card__whole-card-link'>
                            <div data-card-identifier='PrimeConsumer' className='a-box ya-card--rich'>
                                <div className='a-box-inner'>
                                    <div className='a-row'>
                                        <div className='a-column a-span3'>
                                            <img className='metaImg' alt='ログインとセキュリティ' src={Password} />
                                        </div>
                                        <div className='a-column a-span9 a-span-last'>
                                            <h2 className='a-spacing-none ya-card__heading--rich a-text-normal'>ログインとセキュリティ</h2>
                                            <div><span className='a-color-secondary'>パスワードの変更</span></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </a>
                    </div>
                </div>
                <div className='ya-card-row'>
                    <div className='ya-card-cell'>
                        <a href='/profile/metadata/bookmarks' className='ya-card__whole-card-link'>
                            <div data-card-identifier='PrimeConsumer' className='a-box ya-card--rich'>
                                <div className='a-box-inner'>
                                    <div className='a-row'>
                                        <div className='a-column a-span3'>
                                            <img className='metaImg' alt='ブックマークデータ' src={Favorite} />
                                        </div>
                                        <div className='a-column a-span9 a-span-last'>
                                            <h2 className='a-spacing-none ya-card__heading--rich a-text-normal'>ブックマークデータ</h2>
                                            <div><span className='a-color-secondary'>お気に入りのスクラップ・パッケージの確認</span></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </a>
                    </div>
                    <div className='ya-card-cell'>
                        <a href='/profile/metadata/post-datas' className='ya-card__whole-card-link'>
                            <div data-card-identifier='PrimeConsumer' className='a-box ya-card--rich'>
                                <div className='a-box-inner'>
                                    <div className='a-row'>
                                        <div className='a-column a-span3'>
                                            <img className='metaImg' alt='投稿データ' src={Post} />
                                        </div>
                                        <div className='a-column a-span9 a-span-last'>
                                            <h2 className='a-spacing-none ya-card__heading--rich a-text-normal'>投稿データ</h2>
                                            <div><span className='a-color-secondary'>投稿したスクラップ・パッケージの編集</span></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </a>
                    </div>
                    <div className='ya-card-cell'>
                        <a className='ya-card__whole-card-link' onClick={() => withdrawal(userData)}>
                            <div data-card-identifier='AddressesAnd1Click' className='a-box ya-card--rich'>
                                <div className='a-box-inner'>
                                    <div className='a-row'>
                                        <div className='a-column a-span3'>
                                            <img className='metaImg' alt='退会' src={Profile} />
                                        </div>
                                        <div className='a-column a-span9 a-span-last'>
                                            <h2 className='a-spacing-none ya-card__heading--rich a-text-normal'>退会</h2>
                                            <div><span className='a-color-secondary'>アカウントを削除する</span></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        );
        default: return null;
    };
};

export default EditMetadata;