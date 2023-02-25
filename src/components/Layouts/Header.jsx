/* ↓React Imports ALL */
import React from 'react';

/* ↓Firebase Imports ALL */
import { logout } from '../../firebase/database';

/* ↓Images */
import TitleLogo from '../../images/logo/Avenu-E Main Logo.svg';

/* ↓Layouts */
import './Layouts.css';

const Header = (props) => {

    /* ↓現在のURLからURLオブジェクトを生成 */
    const url = new URL(window.location.href);

    /* ↓URLのパスを取得 */
    const urlPath = url.pathname;

    switch (urlPath) {
        /* ↓URLのパスが / の場合 トップページ用のヘッダをレンダリングする */
        case '/':
            return (
                <nav className='navbar navbar-expand-xl navbar-light py-0'>       
                    <div className='container-xl'>
                        <div className='navbar-brand'>
                            <a href='/'><img className='header-logo' src={ TitleLogo } alt='Avenu-E_Logo' /></a>
                        </div>
                        <button className='navbar-toggler' type='button' data-toggle='collapse' data-target='#navbarContent' aria-controls='navbarContent' aria-expanded='false' aria-label='レスポンシブナビゲーション'>
                            <span className='navbar-toggler-icon'></span>
                            <span className='toggler__txt'>メニュー</span>
                        </button>
                        <div className='navbar-collapse collapse flex-column align-items-end pb-3 pb-xl-0' id='navbarContent'>
                            <ul className='nav__main navbar-nav order-md-2 mt-3'>
                                <li className='nav-item active' id='top_nav'>
                                    <a className='nav-link px-4' href='/'>トップ</a>
                                </li>
                                <li className='nav-item' id='questions_nav'>
                                    <a className='nav-link px-4' href='/scraps'>スクラップ</a>
                                </li>
                                <li className='nav-item' id='community_nav'>
                                    <a className='nav-link px-4' href='/package'>パッケージ</a>
                                </li>
                            </ul>
                            <ul className='nav__sub navbar-nav navbar-right order-md-1 align-items-center d-block d-xl-flex'>
                                <li className='nav-item'>
                                    <a className='nav-link px-4 px-md-4' href='/inquiry'><i className='fas fa-caret-right d-md-inline me-2' />お問い合わせ </a>
                                </li>
                                <li className='nav-item'>
                                    <a className='nav-link px-4 px-md-4' href='/term'><i className='fas fa-caret-right d-md-inline me-2' />ご利用規約 </a>
                                </li>
                                {
                                    props.user ?
                                        <li className='nav-item'>
                                            <a className='nav-btn btn btn-rounded px-5 login__btn mx-2 mt-2' href={'/profile?user=' + props.user.displayName}>マイページ</a>
                                            <button className='nav-btn btn btn-rounded px-5 register__btn mx-2 mt-2' onClick={logout}>ログアウト</button>
                                        </li>
                                    :
                                        <li className='nav-item'>
                                            <a className='nav-btn btn btn-rounded px-5 login__btn mx-2 mt-2' href='/login'>ログイン</a>
                                            <a className='nav-btn btn btn-rounded px-5 register__btn mx-2 mt-2' href='/register'>新規会員登録</a>
                                        </li>
                                }
                            </ul>
                        </div>
                    </div>
                </nav>
            );

        /* ↓URLのパスが /scraps の場合 質問ページ用のヘッダをレンダリングする */
        case '/scraps':
        case '/scraps/post':
        case '/scraps/detail':
        case '/scraps/result':
            return (
                <nav className='navbar navbar-expand-xl navbar-light py-0'>
                    <div className='container-xl'>
                        <div className='navbar-brand'>
                            <a href='/'><img className='header-logo' src={ TitleLogo } alt='Avenu-E_Logo' /></a>
                        </div>
                        <button className='navbar-toggler' type='button' data-toggle='collapse' data-target='#navbarContent' aria-controls='navbarContent' aria-expanded='false' aria-label='レスポンシブナビゲーション'>
                            <span className='navbar-toggler-icon'></span> <span className='toggler__txt'>メニュー</span>
                        </button>
                        <div className='navbar-collapse collapse flex-column align-items-end pb-3 pb-xl-0' id='navbarContent'>
                            <ul className='nav__main navbar-nav order-md-2 mt-3'>
                                <li className='nav-item' id='top_nav'>
                                    <a className='nav-link px-4' href='/'>トップ</a>
                                </li>
                                <li className='nav-item active' id='questions_nav'>
                                    <a className='nav-link px-4' href='/scraps'>スクラップ</a>
                                </li>
                                <li className='nav-item' id='community_nav'>
                                    <a className='nav-link px-4' href='/package'>パッケージ</a>
                                </li>
                            </ul>
                            <ul className='nav__sub navbar-nav navbar-right order-md-1 align-items-center d-block d-xl-flex'>
                                <li className='nav-item'>
                                    <a className='nav-link px-4 px-md-4' href='/inquiry'><i className='fas fa-caret-right d-md-inline me-2' />お問い合わせ </a>
                                </li>
                                <li className='nav-item'>
                                    <a className='nav-link px-4 px-md-4' href='/term'><i className='fas fa-caret-right d-md-inline me-2' />ご利用規約 </a>
                                </li>
                                <li className='nav-item'>
                                    <a className='nav-btn btn btn-rounded px-5 login__btn mx-2 mt-2' href={props.user && '/profile?user=' + props.user.displayName}>マイページ</a>
                                    <a className='nav-btn btn btn-rounded px-5 post__btn mx-2 mt-2' href={props.user && '/scraps/post?user=' + props.user.uid}>スクラップを投稿する</a>
                                    <button className='nav-btn btn btn-rounded px-5 register__btn mx-2 mt-2' onClick={logout}>ログアウト</button>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            );

        /* ↓URLのパスが /package の場合 ポートフォリオ一覧ページ用のヘッダをレンダリングする */
        case '/package':
        case '/package/post':
        case '/package/detail':
            return (
                <nav className='navbar navbar-expand-xl navbar-light py-0'>
                    <div className='container-xl'>
                        <div className='navbar-brand'>
                            <a href='/'><img className='header-logo' src={ TitleLogo } alt='Avenu-E_Logo' /></a>
                        </div>
                        <button className='navbar-toggler' type='button' data-toggle='collapse' data-target='#navbarContent' aria-controls='navbarContent' aria-expanded='false' aria-label='レスポンシブナビゲーション'>
                            <span className='navbar-toggler-icon'></span> <span className='toggler__txt'>メニュー</span>
                        </button>
                        <div className='navbar-collapse collapse flex-column align-items-end pb-3 pb-xl-0' id='navbarContent'>
                            <ul className='nav__main navbar-nav order-md-2 mt-3'>
                                <li className='nav-item' id='top_nav'>
                                    <a className='nav-link px-4' href='/'>トップ</a>
                                </li>
                                <li className='nav-item' id='questions_nav'>
                                    <a className='nav-link px-4' href='/scraps'>スクラップ</a>
                                </li>
                                <li className='nav-item active' id='community_nav'>
                                    <a className='nav-link px-4' href='/package'>パッケージ</a>
                                </li>
                            </ul>
                            <ul className='nav__sub navbar-nav navbar-right order-md-1 align-items-center d-block d-xl-flex'>
                                <li className='nav-item'>
                                    <a className='nav-link px-4 px-md-4' href='/inquiry'><i className='fas fa-caret-right d-md-inline me-2' />お問い合わせ </a>
                                </li>
                                <li className='nav-item'>
                                    <a className='nav-link px-4 px-md-4' href='/term'><i className='fas fa-caret-right d-md-inline me-2' />ご利用規約 </a>
                                </li>
                                {
                                    props.user ?
                                        <li className='nav-item'>
                                            <a className='nav-btn btn btn-rounded px-5 login__btn mx-2 mt-2' href={props.user && '/profile?user=' + props.user.displayName}>マイページ</a>
                                            <a className='nav-btn btn btn-rounded px-5 post__btn mx-2 mt-2' href={props.user && '/package/post?user=' + props.user.uid}>パッケージを登録する</a>
                                            <button className='nav-btn btn btn-rounded px-5 register__btn mx-2 mt-2' onClick={logout}>ログアウト</button>
                                        </li>
                                    :
                                        <li className='nav-item'>
                                            <a className='nav-btn btn btn-rounded px-5 login__btn mx-2 mt-2' href='/login'>ログイン</a>
                                            <a className='nav-btn btn btn-rounded px-5 register__btn mx-2 mt-2' href='/register'>新規会員登録</a>
                                        </li>
                                }
                            </ul>
                        </div>
                    </div>
                </nav>
            );

        /* ↓URLのパスが /login の場合 ログインページ用のヘッダをレンダリングする */
        case '/login':
            return (
                <nav className='navbar navbar-expand-xl navbar-light py-0'>
                    <div className='container-xl'>
                        <div className='navbar-brand'>
                            <a href='/'><img className='header-logo' src={ TitleLogo } alt='Avenu-E_Logo' /></a>
                        </div>
                        <button className='navbar-toggler' type='button' data-toggle='collapse' data-target='#navbarContent' aria-controls='navbarContent' aria-expanded='false' aria-label='レスポンシブナビゲーション'>
                            <span className='navbar-toggler-icon'></span> <span className='toggler__txt'>メニュー</span>
                        </button>
                        <div className='navbar-collapse collapse flex-column align-items-end pb-3 pb-xl-0' id='navbarContent'>
                            <ul className='nav__main navbar-nav order-md-2 mt-3'>
                                <li className='nav-item' id='top_nav'>
                                    <a className='nav-link px-4' href='/'>トップ</a>
                                </li>
                                <li className='nav-item' id='questions_nav'>
                                    <a className='nav-link px-4' href='/scraps'>スクラップ</a>
                                </li>
                                <li className='nav-item' id='community_nav'>
                                    <a className='nav-link px-4' href='/package'>パッケージ</a>
                                </li>
                            </ul>
                            <ul className='nav__sub navbar-nav navbar-right order-md-1 align-items-center d-block d-xl-flex'>
                                <li className='nav-item'>
                                    <a className='nav-link px-4 px-md-4' href='/inquiry'><i className='fas fa-caret-right d-md-inline me-2' />お問い合わせ </a>
                                </li>
                                <li className='nav-item'>
                                    <a className='nav-link px-4 px-md-4' href='/term'><i className='fas fa-caret-right d-md-inline me-2' />ご利用規約 </a>
                                </li>
                                <li className='nav-item'>
                                    <a className='nav-btn btn btn-rounded px-5 register__btn mx-2 mt-2' href='/register'>新規会員登録</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            );

        /* ↓URLのパスが /register の場合 新規会員登録ページ用のヘッダをレンダリングする */
        case '/register':
            return (
                <nav className='navbar navbar-expand-xl navbar-light py-0'>
                    <div className='container-xl'>
                        <div className='navbar-brand'>
                            <a href='/'><img className='header-logo' src={ TitleLogo } alt='Avenu-E_Logo' /></a>
                        </div>
                        <button className='navbar-toggler' type='button' data-toggle='collapse' data-target='#navbarContent' aria-controls='navbarContent' aria-expanded='false' aria-label='レスポンシブナビゲーション'>
                            <span className='navbar-toggler-icon'></span> <span className='toggler__txt'>メニュー</span>
                        </button>
                        <div className='navbar-collapse collapse flex-column align-items-end pb-3 pb-xl-0' id='navbarContent'>
                            <ul className='nav__main navbar-nav order-md-2 mt-3'>
                                <li className='nav-item' id='top_nav'>
                                    <a className='nav-link px-4' href='/'>トップ</a>
                                </li>
                                <li className='nav-item' id='questions_nav'>
                                    <a className='nav-link px-4' href='/scraps'>スクラップ</a>
                                </li>
                                <li className='nav-item' id='community_nav'>
                                    <a className='nav-link px-4' href='/package'>パッケージ</a>
                                </li>
                            </ul>
                            <ul className='nav__sub navbar-nav navbar-right order-md-1 align-items-center d-block d-xl-flex'>
                                <li className='nav-item'>
                                    <a className='nav-link px-4 px-md-4' href='/inquiry'><i className='fas fa-caret-right d-md-inline me-2' />お問い合わせ </a>
                                </li>
                                <li className='nav-item'>
                                    <a className='nav-link px-4 px-md-4' href='/term'><i className='fas fa-caret-right d-md-inline me-2' />ご利用規約 </a>
                                </li>
                                <li className='nav-item'>
                                    <a className='nav-btn btn btn-rounded px-5 login__btn mx-2 mt-2' href='/login'>ログイン</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            );

        /* ↓URLのパスが /admin の場合 お問い合わせ管理画面ログインページ用のヘッダをレンダリングする */
        case '/admin':
            return (
                <nav className='navbar navbar-expand-xl navbar-light py-0'>
                    <a className='ms-5' href='/'><img className='header-logo' src={ TitleLogo } alt='Avenu-E_Logo' /></a>
                </nav>
            );

        /* ↓その他ヘッダのレンダリング */
        case '/company':
        case '/privacypolicy':
        case '/term':
        case '/inquiry':
        case '/inquiry/confirm':
        case '/inquiry/thanks':
        case '/password/reset':
        case '/profile':
        case '/profile/edit':
        case '/profile/metadata':
        case '/profile/metadata/bookmarks':
        case '/profile/metadata/post-datas':
        case '/profile/reset/email':
        case '/profile/reset/sns':
        case '/profile/reset/password':
        case '/help':
        case '/help/format':
        case '/admin/inquiry/list':
            return (
                <nav className='navbar navbar-expand-xl navbar-light py-0'>
                    <div className='container-xl'>
                        <div className='navbar-brand'>
                            <a href='/'><img className='header-logo' src={ TitleLogo } alt='Avenu-E_Logo' /></a>
                        </div>
                        <button className='navbar-toggler' type='button' data-toggle='collapse' data-target='#navbarContent' aria-controls='navbarContent' aria-expanded='false' aria-label='レスポンシブナビゲーション'>
                            <span className='navbar-toggler-icon'></span> <span className='toggler__txt'>メニュー</span>
                        </button>
                        <div className='navbar-collapse collapse flex-column align-items-end pb-3 pb-xl-0' id='navbarContent'>
                            <ul className='nav__main navbar-nav order-md-2 mt-3'>
                                <li className='nav-item' id='top_nav'>
                                    <a className='nav-link px-4' href='/'>トップ</a>
                                </li>
                                <li className='nav-item' id='questions_nav'>
                                    <a className='nav-link px-4' href='/scraps'>スクラップ</a>
                                </li>
                                <li className='nav-item' id='community_nav'>    
                                    <a className='nav-link px-4' href='/package'>パッケージ</a>
                                </li>
                            </ul>
                            <ul className='nav__sub navbar-nav navbar-right order-md-1 align-items-center d-block d-xl-flex'>
                                <li className='nav-item'>
                                    <a className='nav-link px-4 px-md-4' href='/inquiry'><i className='fas fa-caret-right d-md-inline me-2' />お問い合わせ </a>
                                </li>
                                <li className='nav-item'>
                                    <a className='nav-link px-4 px-md-4' href='/term'><i className='fas fa-caret-right d-md-inline me-2' />ご利用規約 </a>
                                </li>
                                {
                                    props.user ?
                                        <li className='nav-item'>
                                            <a className='nav-btn btn btn-rounded px-5 login__btn mx-2 mt-2' href={'/profile?user=' + props.user.displayName}>マイページ</a>
                                            <button className='nav-btn btn btn-rounded px-5 register__btn mx-2 mt-2' onClick={logout}>ログアウト</button>
                                        </li>
                                    :
                                        <li className='nav-item'>
                                            <a className='nav-btn btn btn-rounded px-5 login__btn mx-2 mt-2' href='/login'>ログイン</a>
                                            <a className='nav-btn btn btn-rounded px-5 register__btn mx-2 mt-2' href='/register'>新規会員登録</a>
                                        </li>
                                }
                            </ul>
                        </div>
                    </div>
                </nav>
            );
        default: return null;
    };
};

export default Header;