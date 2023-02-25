/* ↓React Imports ALL */
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import './Account.css'

/* ↓Firebase Imports ALL */
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebase/database';

const Profile = (props) => {
    
    /* ↓選択した質問データを状態変数に保管 */
    const [userData, setUserData] = useState(Object());
    const [userAppData, setUserAppData] = useState(Array());

    /* ↓state変数「loading」を定義 */
    const [loading, setLoading] = useState(Boolean(true));

    const search = useLocation().search;
    const query = new URLSearchParams(search).get('user');

    /* ↓内部関数のローディングが完了したときに発火する */
    useEffect(() => {
        /* ↓ユーザーが存在しなかった場合、ログインページに遷移させる */
        if (!props.user) {
            window.location = '/login';
        } else {
            /* ↓リアルタイムにデータベースからデータを取得 */
            onSnapshot(collection(db, 'users'), (user) => {
                user.docs.map((doc) => {
                    doc.data().displayName === query && ( setUserData(doc.data()) );
                });
            });
            /* ↓ページローディングを開始する */
            setLoading(false);
        };
    }, [props]);

    /* ↓ユーザーデータが入ったときに発火する */
    useEffect(() => {
        /* ↓リアルタイムにデータベースからデータを取得 */
        onSnapshot(collection(db, 'packages'), (packages) => {
            packages.docs.map((doc) => {
                doc.data().uid === userData.uid && (
                    setUserAppData((prevState) => ([...prevState, doc.data()]))
                );
            });
        });
    }, [userData]);

    switch (loading) {
        case false:
        return (
            <div className='profile-wrapper'>
                <div className='userInfo'>
                    <img className='masterUserIcon' src={userData.icon} alt='userIcon' />
                    <ul>
                        <li>
                            {
                                props.user && (
                                    props.user.email === userData.email && (
                                        <a className='btn btn-success my-3' href='/profile/edit'>プロフィールを変更する</a>
                                    )
                                )
                            }
                            <p>スキル</p>
                            <p>{userData.skill ? (userData.skill.join(', ')) : (<span className='text-muted'>このユーザはスキルを設定していません。</span>)}</p>
                        </li>
                        <li>
                            <p>自己紹介</p>
                            <p>{userData.introduce ? (String(userData.introduce).replaceAll(/\\n/g, '\n')) : (<span className='text-muted'>このユーザは自己紹介を設定していません。</span>)}</p>
                        </li>
                        {
                            userData.twitter && (
                                <li>
                                    <i className='fa-brands fa-twitter fa-lg icon' />
                                    <a href={userData.twitter} target='_blank' rel='nofollow noopener noreferrer'>@{userData.twitter.replace('https://twitter.com/', '')}</a>
                                </li>
                            )
                        }
                        {
                            userData.github && (
                                <li>
                                    <i className='fa-brands fa-github-alt fa-lg icon' />
                                    <a href={userData.github} target='_blank' rel='nofollow noopener noreferrer'>{userData.github.replace('https://github.com/', '')}</a>
                                </li>
                            )
                        }
                    </ul>
                    <p>{userData.pt} pt</p>
                    {
                        props.user && (
                            props.user.email === userData.email && (
                                <a href='/profile/metadata'>ユーザーメタデータの変更</a>
                            )
                        )
                    }
                </div>
                <div className='userApps'>
                    <h2 className='userApps-theme'>開発プロダクト一覧</h2>
                    <p className='text-center'>今までに開発したアプリケーション。</p>
                    {
                        userAppData.length > 0 ? (
                            userAppData.map((app, index) => (
                                <div className={index === 0 ? 'userApp' : 'userApp mt-3'} key={app.title}>
                                    <div className='userApp-info'>
                                        <h3 className='userApp-title mt-3'><a href={'package/detail?id=' + app.id}>{app.title}</a></h3>
                                        <div className='social-icon-wrapper'>
                                            <a className='social-top-icon'>{app.types ? app.types[0] : null}</a>
                                            <div className='social-icon-list'>
                                                {
                                                    app.types && (
                                                        app.types.map((type) => (
                                                        <a href='https://kojin.dev/application/search/Web%E3%82%B5%E3%82%A4%E3%83%88' className='tags-listItem' key={type}>{type}</a>
                                                        ))
                                                    )
                                                }
                                            </div>
                                            <span className='line'></span>
                                        </div>
                                        <h6 className='userApp-subtitle'>{app.subtitle}</h6>
                                        <p className='userApp-content'>{app.content}</p>
                                    </div>
                                    <div className='userApp-image'>
                                        <a href={'package/detail?id=' + app.id}>
                                            <img src={app.images && (app.images[0])} />
                                        </a>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <strong>※このユーザーが開発したアプリケーションは存在しません。</strong>
                        )
                    }
                </div>
            </div>
        );
        default: return null;
    };
};

export default Profile;