/* ↓React Imports ALL */
import React, { useState, useEffect } from 'react';
import { Icon, Text, Tooltip } from '@chakra-ui/react';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { BsHandThumbsUp, BsHandThumbsUpFill } from 'react-icons/bs';

/* ↓Layouts */
import './Account.css';
import '../Scraps/Scraps.css';
import '../Packages/Package.css';

/* ↓Firebase Imports ALL */
import { collection, onSnapshot, query, orderBy, doc, deleteDoc } from 'firebase/firestore';
import { db } from '../../firebase/database';

/* ↓Utils */
import { MySwal } from '../../utils/Swal';

const PostedDatas = (props) => {

    /* ↓Firestoreから直接表示させる */
    const [scraps, setScraps] = useState(Array());
    const [userData, setUserData] = useState(Object());

    /* ↓state変数「loading」を定義 */
    const [loading, setLoading] = useState(Boolean(true));

    /* ↓スクラップのuidの状態変数 */
    const [scrapUids, setScrapUids] = useState(Array());

    /* ↓スクラップ制御用の状態変数 */
    const [isScrap, setIsScrap] = useState(Boolean(false));

    /* ↓お気に入りボタン表示制御用の状態変数 */
    const [isLike] = useState(Array());

    /* ↓いいねボタン表示制御用の状態変数 */
    const [isGood] = useState(Array());

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

    /* ↓スクラップを削除する */
    const deleteScrap = async (id) => {
        MySwal.fire({
            title: 'スクラップの削除',
            html: '<strong>本当に実行してもよろしいですか？</strong>',
            icon: 'warning',
            showCancelButton: true,
            allowOutsideClick : false,
            allowEscapeKey : false,
            confirmButtonText: '続ける',
            cancelButtonText: 'やめる',
            confirmButtonColor: '#d33',
            reverseButtons: true,
        }).then(async (result) => {
            if (!result.value) {
                return;
            }
            await deleteDoc(doc(db, 'scraps', id));
            MySwal.fire({
                title: '処理終了',
                html : '選択したスクラップが削除されました。',
                icon : 'success',
                allowOutsideClick : false,
                allowEscapeKey : false,
            }).then(() => {
                window.location.reload();
            });
        });
    };

    useEffect(() => {
        /* ↓データベースからデータを取得 */
        const scrapData = collection(db, 'scraps');
        /* ↓リアルタイムにデータベースからデータを取得 */
        onSnapshot(scrapData, (scrap) => {
            setScraps(scrap.docs.map((doc) => (doc.data())));
        });
    }, [userData])

    useEffect(() => {
        scraps && (
            scraps.map((scrap) => {
                !scrapUids.includes(scrap.uid) && (
                    setScrapUids((prevState) => [ ...prevState, scrap.uid ])
                )
            })
        );
        scrapUids.includes(props.user.uid) ? (
            setIsScrap(true)
        ) : (
            setIsScrap(false)
        );
    }, [scraps]);
    
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
            return (
                <div className='scraps-wrapper'>
                    {!loading && (
                        <div className='container d-flex flex-wrap justify-content-center py-3'>
                            {/* データベースに登録された質問内容を一つ一つ表示(ForEach構文に似たmap関数を使用) */}
                            {scraps && (
                                scraps.map((scraps, index) => (
                                    scraps.uid === props.user.uid && (
                                        <div key={scraps.title} className='scrap'>
                                            <a href={'/profile?user=' + scraps.userName}><img className='scrap-userIcon' src={scraps.userIcon} alt='userIcon' /></a>
                                            <p className='scrap-userName'><i className='fas fa-circle-question' />質問投稿者 ⇢ <a href={'/profile?user=' + scraps.userName}>{scraps.userName}</a></p>
                                            <p className='scrap-createAt'>{scraps.createAt}</p>
                                            <div className='scrap-good ps-1'>
                                                <Tooltip label='いいね！' bg='gray' p='0px 10px' fontSize='11px' color='white'>
                                                    <Text cursor='pointer'>
                                                    <Icon
                                                        as={isGood[index] ? BsHandThumbsUpFill : BsHandThumbsUp}
                                                        mr='2.5'
                                                        fontSize='22px'
                                                        color={isGood[index] ? '#80CBC4' : ''}
                                                    />
                                                    {scraps.goods}
                                                    </Text>
                                                </Tooltip>
                                            </div>
                                            <div className='scrap-like ps-2'>
                                                <Tooltip label='お気に入りに追加' bg='gray' p='0px 10px' fontSize='11px' color='white'>
                                                    <Text cursor='pointer'>
                                                    <Icon
                                                        as={isLike[index] ? AiFillHeart : AiOutlineHeart}
                                                        mr='2.5'
                                                        fontSize='22px'
                                                        color={isLike[index] ? 'red' : ''}
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
                                    )
                                ))
                            )}
                            {!isScrap && (
                                <div className='my-5 py-5'>
                                    <h3 className='text-secondary text-center my-5 py-5'>投稿データが存在しません。</h3>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            )
        default: return null;
    };
};

export default PostedDatas;