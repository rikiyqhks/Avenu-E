/* ↓React Imports ALL */
import React, { useState, useEffect } from 'react';
import { Icon, Text, Tooltip } from '@chakra-ui/react';
import { AiOutlineHeart } from 'react-icons/ai';
import { BsHandThumbsUp, BsBookmarkPlus } from 'react-icons/bs';

/* ↓Layouts */
import './Account.css';
import '../Scraps/Scraps.css';
import '../Packages/Package.css';

/* ↓Firebase Imports ALL */
import { collection, onSnapshot, query, orderBy, doc } from 'firebase/firestore';
import { db } from '../../firebase/database';

/* ↓Utils */
import { MySwal } from '../../utils/Swal';

const Bookmarks = (props) => {

    /* ↓Firestoreから直接表示させる */
    const [scraps, setScraps] = useState(Array());
    const [packages, setPackages] = useState(Array());
    const [userData, setUserData] = useState(Object());

    /* ↓state変数「loading」を定義 */
    const [loading, setLoading] = useState(Boolean(true));

    /* ↓スクラップ制御用の状態変数 */
    const [isScrap, setIsScrap] = useState(Boolean(false));

    /* ↓スクラップ制御用の状態変数 */
    const [isPackage, setIsPackage] = useState(Boolean(false));

    const [status, setStatus] = useState(Boolean(false));

    /* ↓メール認証が確認できていないアカウントのみ発火する関数 */
    const noVerifiedAccount = async () => {
        await MySwal.fire({
            title: 'エラー aE-0307',
            html : '認証していないアカウントはこの機能をご利用できません。',
            icon : 'error',
            allowOutsideClick : false,
            allowEscapeKey : false,
        }).then(() => {
            window.location = '/package';
        });
    };

    useEffect(() => {
        /* ↓データベースからデータを取得 */
        const scrapData = collection(db, 'scraps');
        const packageData = collection(db, 'packages');
        /* ↓リアルタイムにデータベースからデータを取得 */
        onSnapshot(scrapData, (scrap) => {
            scrap.docs.map((doc) => (
                userData.likeScraps.includes(doc.id) && (
                    setScraps((prevState) => [ ...prevState, doc.data() ])
                )
            ));
        }),
        onSnapshot(packageData, (packages) => {
            packages.docs.map((doc) => (
                userData.bookmarks.includes(doc.id) && (
                    setPackages((prevState) => [ ...prevState, doc.data() ])
                )
            ));
        })
    }, [userData]);

    useEffect(() => {
        scraps.length > 0 ? (
            setIsScrap(true)
        ) : (
            setIsScrap(false)
        );
    }, [scraps]);

    useEffect(() => {
        packages.length > 0 ? (
            setIsPackage(true)
        ) : (
            setIsPackage(false)
        );
    }, [packages]);
    
    /* ↓内部関数のローディングが完了したときに発火する */
    useEffect(() => {
        /* ↓ユーザーが存在しなかった場合、ログインページに遷移させる */
        if (!props.user) {
            window.location = '/login';
        } else if (!props.user.emailVerified) {
            /* ↓メール未認証の場合エラーを返す */
            noVerifiedAccount();
        } else {
            /* ↓データベースからデータを取得 */
            const usersData = collection(db, 'users');
            /* ↓リアルタイムにデータベースからデータを取得 */
            onSnapshot(usersData, (users) => {
                users.docs.map((doc) => {
                    if(doc.data().email === props.user.email) setUserData(doc.data());
                });
            });
            /* ↓ページローディングを開始する */
            setLoading(false);
        };
    }, [props]);

    switch (loading) {
        case false:
            switch (status) {
                case false:
                    return (
                        <div>
                            {!loading && (
                                <div className='container d-flex flex-wrap justify-content-center py-3'>
                                    <button className='radio' onClick={() => setStatus(false)}><strong className='text-decoration-underline'>スクラップ</strong></button>
                                    <button className='radio' onClick={() => setStatus(true)}>パッケージ</button>
                                    {/* データベースに登録された質問内容を一つ一つ表示(ForEach構文に似たmap関数を使用) */}
                                    {scraps && (
                                        <div className='card-wrapper m-5'>
                                            {scraps.map((scraps, index) => (
                                                <div key={scraps.title} className='scrap'>
                                                    <a href={'/profile?user=' + scraps.userName}><img className='scrap-userIcon' src={scraps.userIcon} alt='userIcon' /></a>
                                                    <p className='scrap-userName'><i className='fas fa-circle-question' />質問投稿者 ⇢ <a href={'/profile?user=' + scraps.userName}>{scraps.userName}</a></p>
                                                    <p className='scrap-createAt'>{scraps.createAt}</p>
                                                    <div className='scrap-good ps-1'>
                                                        <Tooltip label='いいね！' bg='gray' p='0px 10px' fontSize='11px' color='white'>
                                                            <Text cursor='pointer'>
                                                            <Icon
                                                                as={BsHandThumbsUp}
                                                                mr='2.5'
                                                                fontSize='22px'
                                                                color=''
                                                            />
                                                            {scraps.goods}
                                                            </Text>
                                                        </Tooltip>
                                                    </div>
                                                    <div className='scrap-like ps-2'>
                                                        <Tooltip label='お気に入りに追加' bg='gray' p='0px 10px' fontSize='11px' color='white'>
                                                            <Text cursor='pointer'>
                                                            <Icon
                                                                as={AiOutlineHeart}
                                                                mr='2.5'
                                                                fontSize='22px'
                                                                color=''
                                                            />
                                                            {scraps.likes}
                                                            </Text>
                                                        </Tooltip>
                                                    </div>
                                                    <h1 className='scrap-title'>{scraps.title}</h1>
                                                    <p className='scrap-content' id='scrap-content'>{scraps.subtitle && scraps.subtitle.length > 20 ? (scraps.subtitle).slice(0,80)+'…' : scraps.subtitle}</p>
                                                    <p>使用言語: {scraps.languages && (scraps.languages.join(', '))}</p>
                                                    <p>その他: {scraps.others && (scraps.others.join(', '))}</p>
                                                    <div className={scraps.uid === props.user.uid ? 'scraps-btn-wrapper' : ''}>
                                                        <a href={'/scraps/detail?user=' + scraps.userName + '&id=' + scraps.id}><button className='btn'>詳細を確認</button></a>
                                                        {
                                                            scraps.uid === props.user.uid && (
                                                                <button className='btn btn-danger' onClick={() => deleteScrap(scraps.id)}><i className='fas fa-xmark me-2' />このスクラップを削除する</button>
                                                            )
                                                        }
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                    {!isScrap && (
                                        <div className='my-5 py-5'>
                                            <h3 className='text-secondary text-center my-5 py-5'>お気に入り登録しているスクラップが存在しません。</h3>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    );
                default:
                    return (
                        <div>
                            {!loading && (
                                <div className='container d-flex flex-wrap justify-content-center py-3'>
                                    <button className='radio' onClick={() => setStatus(false)}>スクラップ</button>
                                    <button className='radio' onClick={() => setStatus(true)}><strong className='text-decoration-underline'>パッケージ</strong></button>
                                    {/* データベースに登録された質問内容を一つ一つ表示(ForEach構文に似たmap関数を使用) */}
                                    {packages && (
                                        <div className='card-wrapper m-5'>
                                            {packages.map((packages) => (
                                            <div className='portfolio-card card-wrapper-cel' key={packages.title}>
                                                <div className='portfolio-thumnail'>
                                                    <a href={'package/detail?id=' + packages.id}>
                                                        <img src={packages.images[0]} alt='' className='portfolio-image' />
                                                    </a>
                                                </div>
                                                <div className='portfolio-detail'>
                                                    <h4 className='head-title head-title-middle'>
                                                        <a className='d-inline-block' href={'package/detail?id=' + packages.id}>{packages.title}</a>
                                                        <div className='d-inline-block ms-2'>
                                                            <Tooltip label='ブックマークに追加' bg='gray' p='0px 10px' fontSize='11px' color='white'>
                                                                <Text cursor='pointer'>
                                                                <Icon
                                                                    as={BsBookmarkPlus}
                                                                    mr='2.5'
                                                                    fontSize='22px'
                                                                    color=''
                                                                />
                                                                </Text>
                                                            </Tooltip>
                                                        </div>
                                                    </h4>
                                                    <p className='portfolio-overview text-muted p-0'>{packages.createAt}</p>
                                                    <div className='social-icon-list'>
                                                        {
                                                            packages.types.map((type, index) => (
                                                                <a href={'package/detail?id=' + packages.id} className='tags-listItem' key={type + '_' + index}>{type}</a>
                                                            ))
                                                        }   
                                                    </div>
                                                    <span className='line'></span>
                                                    <div className='m-1'>
                                                        <a className='d-inline-block' href={'/profile?user=' + packages.masterUserName}><img src={packages.masterUserIcon} className='package-masterUserIcon' /></a>
                                                        <div className='portfolio-note d-inline-block'>開発者名：<a href={'/profile?user=' + packages.masterUserName}>{packages.masterUserName}</a></div>
                                                    </div>
                                                    <p className='portfolio-overview'>{packages.content && packages.content.length > 150 ? (packages.content).slice(0,150)+'…' : packages.content}</p>
                                                </div>
                                            </div>
                                            ))}
                                        </div>
                                    )}
                                    {!isPackage && (
                                        <div className='my-5 py-5'>
                                            <h3 className='text-secondary text-center my-5 py-5'>ブックマークしているパッケージが存在しません。</h3>
                                        </div>
                                    )}
                                </div>
                            )};
                        </div>
                    );
            };
        default: return null;
    };
};

export default Bookmarks;