/* ↓React Imports ALL */
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/* Firebase Imports ALL */
import { collection, onSnapshot } from 'firebase/firestore';
import { db, resendEmailVerification } from '../../firebase/database';

/* Layouts */
import './Layouts.css';

const Subheader = (props) => {

    /* ↓現在のURLからURLオブジェクトを生成 */
    const url = new URL(window.location.href);

    /* ↓URLのパスを取得 */
    const urlPath = url.pathname;

    switch (urlPath) {
        case '/':
            return (
                <div>
                    {
                        props.user && (
                            props.user.emailVerified === false && (
                            <div className='subheader-attention'>
                                <p>※このアカウントはまだ、メールアドレス認証がされていません。</p><a onClick={resendEmailVerification}><p>( 認証メールの再送信はこちら )</p></a>
                            </div>
                            )
                        )
                    }
                </div>
            );
        /* ↓URLのパスが /inquiry の場合 お問い合わせフォーム用のヘッダをレンダリングする */
        case '/inquiry':
            return (
                <div className='subheader-title'>
                    <h4><i className='fas fa-envelopes-bulk me-2' /><a className='ms-2' href='/'>Top</a>/お問い合わせ</h4>
                </div>
            );
        /* ↓URLのパスが /inquiry/confirm の場合 お問い合わせ内容確認ページ用のヘッダをレンダリングする */
        case '/inquiry/confirm':
            return (
                <div className='subheader-title'>
                    <h4><i className='fas fa-envelopes-bulk me-2' /><a className='ms-2' href='/'>Top</a>/お問い合わせ内容確認</h4>
                </div>
            );
        /* ↓URLのパスが /inquiry/thanks の場合 お問い合わせ内容送信完了ページ用のヘッダをレンダリングする */
        case '/inquiry/thanks':
            return (
                <div className='subheader-title'>
                    <h4><i className='fas fa-envelopes-bulk me-2' /><a className='ms-2' href='/'>Top</a>/お問い合わせ内容送信完了</h4>
                </div>
            );
        /* ↓URLのパスが /scraps の場合 スクラップページ用のヘッダをレンダリングする */
        case '/scraps':
            return (
                <div>
                    <div className='subheader-title'>
                        <h4><i className='fas fa-scroll me-2' /><a className='ms-2' href='/'>Top</a>/スクラップ</h4>
                    </div>
                    {
                        props.user && (
                            props.user.emailVerified === false && (
                            <div className='subheader-attention'>
                                <p>※このアカウントはまだ、メールアドレス認証がされていません。</p><a onClick={resendEmailVerification}><p>( 認証メールの再送信はこちら )</p></a>
                            </div>
                            )
                        )
                    }
                </div>
            );
        /* ↓URLのパスが /scraps/post の場合 スクラップ投稿ページ用のヘッダをレンダリングする */
        case '/scraps/post':
            return (
                <div className='subheader-title'>
                    <h4><i className='fas fa-scroll me-2' /><a className='ms-2' href='/'>Top</a>/<a href='/scraps'>スクラップ</a>/スクラップの投稿</h4>
                    {
                        props.user && (
                            props.user.emailVerified === false && (
                            <div className='subheader-attention'>
                                <p>※このアカウントはまだ、メールアドレス認証がされていません。</p><a onClick={resendEmailVerification}><p>( 認証メールの再送信はこちら )</p></a>
                            </div>
                            )
                        )
                    }
                </div>
            );
        /* ↓URLのパスが /scraps/detail の場合 スクラップ詳細ページ用のヘッダをレンダリングする */
        case '/scraps/detail':
            return (
                <div>
                    <div className='subheader-title'>
                        <h4><i className='fas fa-scroll me-2' /><a className='ms-2' href='/'>Top</a>/<a href='/scraps'>スクラップ</a>/詳細</h4>
                    </div>
                    {
                        props.user && (
                            props.user.emailVerified === false && (
                            <div className='subheader-attention'>
                                <p>※このアカウントはまだ、メールアドレス認証がされていません。</p><a onClick={resendEmailVerification}><p>( 認証メールの再送信はこちら )</p></a>
                            </div>
                            )
                        )
                    }
                </div>
            );
        /* ↓URLのパスが /scraps/result の場合 スクラップ検索結果ページ用のヘッダをレンダリングする */
        case '/scraps/result':
            return (
                <div className='subheader-title'>
                    <h4><i className='fas fa-scroll me-2' /><a className='ms-2' href='/'>Top</a>/<a href='/scraps'>スクラップ</a>/検索結果</h4>
                    {
                        props.user && (
                            props.user.emailVerified === false && (
                            <div className='subheader-attention'>
                                <p>※このアカウントはまだ、メールアドレス認証がされていません。</p><a onClick={resendEmailVerification}><p>( 認証メールの再送信はこちら )</p></a>
                            </div>
                            )
                        )
                    }
                </div>
            );
        /* ↓URLのパスが /package の場合 パッケージ一覧ページ用のヘッダをレンダリングする */
        case '/package':
            return (
                <div>
                    <div className='subheader-title'>
                        <h4><i className='fas fa-cube me-2' /><a className='ms-2' href='/'>Top</a>/パッケージ</h4>
                    </div>
                    {
                        props.user && (
                            props.user.emailVerified === false && (
                            <div className='subheader-attention'>
                                <p>※このアカウントはまだ、メールアドレス認証がされていません。</p><a onClick={resendEmailVerification}><p>( 認証メールの再送信はこちら )</p></a>
                            </div>
                            )
                        )
                    }
                </div>
            );
        /* ↓URLのパスが /package/post の場合 パッケージ登録ページ用のヘッダをレンダリングする */
        case '/package/post':
            return (
                <div className='subheader-title'>
                    <h4><i className='fas fa-cube me-2' /><a className='ms-2' href='/'>Top</a>/<a href='/package'>パッケージ</a>/パッケージの登録</h4>
                </div>
            );
        /* ↓URLのパスが /package/detail の場合 パッケージ詳細ページ用のヘッダをレンダリングする */
        case '/package/detail':
            return (
                <div>
                    <div className='subheader-title'>
                        <h4><i className='fas fa-cube me-2' /><a className='ms-2' href='/'>Top</a>/<a href='/package'>パッケージ</a>/詳細</h4>
                    </div>
                    {
                        props.user && (
                            props.user.emailVerified === false && (
                            <div className='subheader-attention'>
                                <p>※このアカウントはまだ、メールアドレス認証がされていません。</p><a onClick={resendEmailVerification}><p>( 認証メールの再送信はこちら )</p></a>
                            </div>
                            )
                        )
                    }
                </div>
            );
        /* ↓URLのパスが /register の場合 登録ページ用のヘッダをレンダリングする */
        case '/register':
            return (
                <div className='subheader-title'>
                    <h4><i className='fas fa-earth-asia me-2' /><a className='ms-2' href='/'>Top</a>/新規会員登録</h4>
                </div>
            );
        /* ↓URLのパスが /login の場合 ログインページ用のヘッダをレンダリングする */
        case '/login':
            return (
                <div className='subheader-title'>
                    <h4><i className='fas fa-right-to-bracket me-2' /><a className='ms-2' href='/'>Top</a>/ログイン</h4>
                </div>
            );
        /* ↓URLのパスが /password/reset の場合 パスワードの再設定ページ用のヘッダをレンダリングする */
        case '/password/reset':
            return (
                <div>
                    <div className='subheader-title'>
                        <h4><i className='fa-solid fa-trash-can-arrow-up me-2' /><a className='ms-2' href='/'>Top</a>/パスワードの再設定</h4>
                    </div>
                    {
                        props.user && (
                            props.user.emailVerified === false && (
                            <div className='subheader-attention'>
                                <p>※このアカウントはまだ、メールアドレス認証がされていません。</p><a onClick={resendEmailVerification}><p>( 認証メールの再送信はこちら )</p></a>
                            </div>
                            )
                        )
                    }
                </div>
            );
        /* ↓URLのパスが /profile の場合 プロフィール用のヘッダをレンダリングする */
        case '/profile':
            const search_profile = useLocation().search;
            const query_profile = new URLSearchParams(search_profile).get('user');
            return (
                <div>
                    <div className='subheader-title'>
                        <h4><i className='fas fa-id-card me-2' /><a className='ms-2' href='/'>Top</a>/開発者プロフィール<span className='profile-name'>{query_profile}</span></h4>
                    </div>
                    {
                        props.user && (
                            props.user.emailVerified === false && (
                                <div className='subheader-attention'>
                                    <p>※このアカウントはまだ、メールアドレス認証がされていません。</p><a onClick={resendEmailVerification}><p>( 認証メールの再送信はこちら )</p></a>
                                </div>
                            )
                        )
                    }
                </div>
            );
        /* ↓URLのパスが /profile の場合 プロフィール用のヘッダをレンダリングする */
        case '/profile/edit':
            return (
                <div>
                    <div className='subheader-title'>
                        <h4><i className='fas fa-id-card me-2' /><a className='ms-2' href='/'>Top</a>/<a href={'/profile?user=' + props.user.displayName}>開発者プロフィール</a>/プロフィールの変更</h4>
                    </div>
                    {
                        props.user && (
                            props.user.emailVerified === false && (
                                <div className='subheader-attention'>
                                    <p>※このアカウントはまだ、メールアドレス認証がされていません。</p><a onClick={resendEmailVerification}><p>( 認証メールの再送信はこちら )</p></a>
                                </div>
                            )
                        )
                    }
                </div>
            );
        /* ↓URLのパスが /profile/metadata の場合 メタデータ編集用のヘッダをレンダリングする */
        case '/profile/metadata':
            return (
                <div>
                    <div className='subheader-title'>
                        <h4><i className='fas fa-id-card me-2' /><a className='ms-2' href='/'>Top</a>/メタデータの編集</h4>
                    </div>
                    {
                        props.user && (
                            props.user.emailVerified === false && (
                                <div className='subheader-attention'>
                                    <p>※このアカウントはまだ、メールアドレス認証がされていません。</p><a onClick={resendEmailVerification}><p>( 認証メールの再送信はこちら )</p></a>
                                </div>
                            )
                        )
                    }
                </div>
            );
        /* ↓URLのパスが /profile/metadata/bookmarks の場合 お気に入りのスクラップ用のヘッダをレンダリングする */
        case '/profile/metadata/bookmarks':
            return (
                <div className='subheader-title'>
                    <h4><i className='fa fa-star me-2' /><a className='ms-2' href='/'>Top</a>/<a href='/profile/metadata'>メタデータの編集</a>/ブックマークデータ</h4>
                </div>
            );
        /* ↓URLのパスが /profile/metadata/post-datas の場合 投稿データ用のヘッダをレンダリングする */
        case '/profile/metadata/post-datas':
            return (
                <div className='subheader-title'>
                    <h4><i className='fa fa-blog me-2' /><a className='ms-2' href='/'>Top</a>/<a href='/profile/metadata'>メタデータの編集</a>/投稿データ</h4>
                </div>
            );
        /* ↓URLのパスが /profile/reset/email の場合 メアドリセットページ用のヘッダをレンダリングする */
        case '/profile/reset/email':
            return (
                <div className='subheader-title'>
                    <h4><i className='fa fa-blog me-2' /><a className='ms-2' href='/'>Top</a>/<a href='/profile/metadata'>メタデータの編集</a>/E-Mailのリセット</h4>
                </div>
            );
        /* ↓URLのパスが /profile/reset/sns の場合 SNSリセットページ用のヘッダをレンダリングする */
        case '/profile/reset/sns':
            return (
                <div className='subheader-title'>
                    <h4><i className='fa fa-blog me-2' /><a className='ms-2' href='/'>Top</a>/<a href='/profile/metadata'>メタデータの編集</a>/SNS連携</h4>
                </div>
            );
        /* ↓URLのパスが /profile/reset/password の場合 パスワードリセットページ用のヘッダをレンダリングする */
        case '/profile/reset/password':
            return (
                <div className='subheader-title'>
                    <h4><i className='fa fa-blog me-2' /><a className='ms-2' href='/'>Top</a>/<a href='/profile/metadata'>メタデータの編集</a>/パスワードの再設定</h4>
                </div>
            );
        /* ↓URLのパスが /term の場合 利用規約用のヘッダをレンダリングする */
        case '/term':
            return (
                <div>
                    <div className='subheader-title'>
                        <h4><i className='fas fa-book-atlas me-2' /><a className='ms-2' href='/'>Top</a>/利用規約</h4>
                    </div>
                    {
                        props.user && (
                            props.user.emailVerified === false && (
                            <div className='subheader-attention'>
                                <p>※このアカウントはまだ、メールアドレス認証がされていません。</p><a onClick={resendEmailVerification}><p>( 認証メールの再送信はこちら )</p></a>
                            </div>
                            )
                        )
                    }
                </div>
            );
        /* ↓URLのパスが /help の場合 ヘルプ用のヘッダをレンダリングする */
        case '/help':
            return (
                <div>
                    <div className='subheader-title'>
                        <h4><i className='fas fa-handshake-angle me-2' /><a className='ms-2' href='/'>Top</a>/ヘルプ</h4>
                    </div>
                    {
                        props.user && (
                            props.user.emailVerified === false && (
                            <div className='subheader-attention'>
                                <p>※このアカウントはまだ、メールアドレス認証がされていません。</p><a onClick={resendEmailVerification}><p>( 認証メールの再送信はこちら )</p></a>
                            </div>
                            )
                        )
                    }
                </div>
            );
        /* ↓URLのパスが /help/format の場合 フォーマット用のヘッダをレンダリングする */
        case '/help/format':
            const [helpList, setHelpList] = useState([]);
            const search_format = useLocation().search;
            const query_format = new URLSearchParams(search_format).get('type');
            useEffect(() => {
                /* ↓データベースからデータを取得 */
                const helpData = collection(db, 'helps');
                /* ↓リアルタイムにデータベースからデータを取得 */
                onSnapshot(helpData, (help) => {
                    setHelpList(help.docs.map((doc) => ({ ...doc.data() })));
                });
            }, []);
            return (
                <div>
                    <div className='subheader-title'>
                        <h4>
                            <i className='fas fa-handshake-angle me-2' />
                            <a className='ms-2' href='/'>Top</a>/<a href='/help'>ヘルプ</a>/
                            {helpList && (
                                helpList.map((value) => (
                                    value.query === query_format && (
                                        value.title
                                    )
                                ))
                            )}
                        </h4>
                    </div>
                    {
                        props.user && (
                            props.user.emailVerified === false && (
                            <div className='subheader-attention'>
                                <p>※このアカウントはまだ、メールアドレス認証がされていません。</p><a onClick={resendEmailVerification}><p>( 認証メールの再送信はこちら )</p></a>
                            </div>
                            )
                        )
                    }
                </div>
            );
        /* ↓URLのパスが /privacypolicy の場合 プライバシーポリシー用のヘッダをレンダリングする */
        case '/privacypolicy':
            return (
                <div>
                    <div className='subheader-title'>
                        <h4><i className='fas fa-user-shield me-2' /><a className='ms-2' href='/'>Top</a>/プライバシーポリシー</h4>
                    </div>
                    {
                        props.user && (
                            props.user.emailVerified === false && (
                            <div className='subheader-attention'>
                                <p>※このアカウントはまだ、メールアドレス認証がされていません。</p><a onClick={resendEmailVerification}><p>( 認証メールの再送信はこちら )</p></a>
                            </div>
                            )
                        )
                    }
                </div>
            );
        /* ↓URLのパスが AdminURLPath の場合 お問い合わせ管理画面用のヘッダをレンダリングする */
        case '/admin/inquiry/list':
            return (
                <div className='subheader-title'>
                    <h4><i className='fas fa-list-check me-2' /><a className='ms-2' href='/'>Top</a>/お問い合わせ管理画面</h4>
                </div>
            );
        default: return null;
    };
};

export default Subheader;