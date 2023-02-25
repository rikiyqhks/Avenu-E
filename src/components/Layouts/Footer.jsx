/* ↓React Imports ALL */
import React from 'react';

/* ↓Images */
import TitleLogo from '../../images/logo/Avenu-E Main Logo.svg';

/* ↓Layouts */
import './Layouts.css';

/* Utils */
import { MySwal } from '../../utils/Swal';

const Footer = (props) => {

    /* ↓メール認証が確認できていないアカウントのみ発火する関数 */
    const noVerifiedAccount = async () => {""
        await MySwal.fire({
            title: 'エラー aE-0307',
            html : '認証していないアカウントはこの機能をご利用できません。',
            icon : 'error',
            allowOutsideClick : false,
            allowEscapeKey : false
        })
    }

    return (
        <footer>
            <div className='footer-menu'>
                <div className='text-center py-5'>
                    <a href='/'><img className='footer-logo' src={ TitleLogo } alt='AvenueLogo' /></a>
                </div>
                <div className='footer-guide'>
                    <nav>
                        <ul>
                            <li><button onClick={props.user && !props.user.emailVerified ? (() => noVerifiedAccount()) : null}><a href={!props.user ? '/login' : !props.user.emailVerified ? null : '/inquiry'}><p className='footer-texts'>ご意見</p></a></button></li>
                            <li><button><a href='/help'><p className='footer-texts'>ヘルプ</p></a></button></li>
                        </ul>
                    </nav>
                    <nav>
                        <ul>
                            <li><button><a href='/term'><p className='footer-texts'>利用規約</p></a></button></li>
                            <li><button><a href='/privacypolicy'><p className='footer-texts'>プライバシーポリシー</p></a></button></li>
                        </ul>
                    </nav>
                    <nav>
                        <ul>
                            <li><button onClick={props.user && !props.user.emailVerified ? (() => noVerifiedAccount()) : null}><a href={!props.user ? '/login' : !props.user.emailVerified ? null : 'https://github.com/users/Avenu-E/projects/4'} target={props.user ? props.user.emailVerified ? '_blank' : '_self' : '_self'} rel={props.user ? props.user.emailVerified ? 'nofollow noopener noreferrer' : 'canonical' : 'canonical'}><p className='footer-texts'>開発ロードマップ</p></a></button></li>
                            <li><button onClick={props.user && !props.user.emailVerified ? (() => noVerifiedAccount()) : null}><a href={!props.user ? '/login' : !props.user.emailVerified ? null : '/admin'}><p className='footer-texts'>管理者ログイン</p></a></button></li>
                        </ul>
                    </nav>
                </div>
                <hr className='w-50 m-auto' />
            </div>
            <div className='footer-trademark'>
                <p>©2023 Avenu-E</p>
            </div>
        </footer>
    );
};

export default Footer;