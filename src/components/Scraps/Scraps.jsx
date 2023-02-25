/* ↓React Imports ALL */
import React, { useState, useEffect } from 'react';
import { Icon, Text, Tooltip } from '@chakra-ui/react';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { BsHandThumbsUp, BsHandThumbsUpFill } from 'react-icons/bs';

/* ↓Firebase Imports ALL */
import { collection, onSnapshot, query, orderBy, limit, deleteDoc, doc, writeBatch } from 'firebase/firestore';
import { db } from '../../firebase/database';

/* ↓Layouts */
import './Scraps.css';

/* ↓Utils */
import { MySwal } from '../../utils/Swal';

const Scrap = (props) => {

    /* ↓Firestoreから直接表示させる */
    const [userData, setUserData] = useState(Object());
    const [scraps, setScraps] = useState(Array());
    const [userList, setUsers] = useState(Array());

    /* ↓state変数「loading」を定義 */
    const [loading, setLoading] = useState(Boolean(true));

    /* ↓お気に入りボタン表示制御用の状態変数 */
    const [isLike, setIsLike] = useState(Object());

    /* ↓いいねボタン表示制御用の状態変数 */
    const [isGood, setIsGood] = useState(Object());

    /* ↓お気に入り関数 */
    const toggleLike = (id, likes) => {
        const batch = writeBatch(db);
        const scrapRef = doc(db, 'scraps', id);
        const userRef = doc(db, 'users', userData.id);
        !isLike[id] ? (
            batch.update(scrapRef, {'likes': likes + 1}),
            batch.update(userRef, {'likeScraps': [...userData.likeScraps, id]})
        ) : (
            batch.update(scrapRef, {'likes': likes - 1}),
            batch.update(userRef, {'likeScraps': userData.likeScraps.filter(like => (like.match(id)) == null)})
        );
        batch.commit();
        setIsLike((prevState) => ({ ...prevState, [id]: ![id] }));
    };

    /* ↓いいね関数 */
    const toggleGood = async(id, goods) => {
        const batch = writeBatch(db);
        const scrapRef = doc(db, 'scraps', id);
        const userRef = doc(db, 'users', userData.id);
        !isGood[id] ? (
            batch.update(scrapRef, {'goods': goods + 1}),
            batch.update(userRef, {'goodScraps': [...userData.goodScraps, id]})
        ) : (
            batch.update(scrapRef, {'goods': goods - 1}),
            batch.update(userRef, {'goodScraps': userData.goodScraps.filter(good => (good.match(id)) == null)})
        );
        batch.commit();
        setIsGood((prevState) => ({ ...prevState, [id]: ![id] }));
    };

    /* ↓内部関数のローディングが完了したときに発火する */
    useEffect(() => {
        /* ↓ユーザーが存在しなかった場合、ログインページに遷移させる */
        if (!props.user) {
            window.location = '/login';
        } else {
            /* ↓データベースからデータを取得 */
            const questionData = collection(db, 'scraps');
            const userData = collection(db, 'users');
            /* ↓リアルタイムにデータベースからデータを取得 */
            onSnapshot(query(questionData, orderBy('createAt', 'desc')), (scrap) => {
                setScraps(scrap.docs.map((doc) => ({ ...doc.data() })));
            });
            /* ↓ユーザーランキング(pt降順並び替え) */
            onSnapshot(query(userData, orderBy('pt', 'desc'), limit(10)), (user) => {
                setUsers(user.docs.map((doc) => ({ ...doc.data() })));
            });
            /* ↓リアルタイムにデータベースからデータを取得 */
            onSnapshot(collection(db, 'users'), (users) => {
                users.docs.map((userDoc) => {
                    userDoc.data().email === props.user.email && (
                        setUserData(userDoc.data()),
                        onSnapshot(collection(db, 'scraps'), (scraps) => {
                            scraps.docs.map((scrapDoc) => {
                                userDoc.data().likeScraps.length > 0 ? (
                                    userDoc.data().likeScraps.includes(scrapDoc.id) ? (
                                        /* ↓いいねしているデータの初期値はtrue */
                                        setIsLike((prevState) => ({ ...prevState, [scrapDoc.id]: true }))
                                    ) : (
                                        /* ↓いいねしていないデータの初期値はfalse */
                                        setIsLike((prevState) => ({ ...prevState, [scrapDoc.id]: false }))
                                    )
                                ) : (
                                    setIsLike((prevState) => ({ ...prevState, [scrapDoc.id]: false }))
                                );
                                userDoc.data().goodScraps ? (
                                    userDoc.data().goodScraps.includes(scrapDoc.id) ? (
                                        /* ↓いいねしているデータの初期値はtrue */
                                        setIsGood((prevState) => ({ ...prevState, [scrapDoc.id]: true }))
                                    ) : (
                                        /* ↓いいねしていないデータの初期値はfalse */
                                        setIsGood((prevState) => ({ ...prevState, [scrapDoc.id]: false }))
                                    )
                                ) : (
                                    setIsGood((prevState) => ({ ...prevState, [scrapDoc.id]: false }))
                                );
                            });
                        })
                    );
                });
            });
            /* ↓ローディングを開始する */
            setLoading(false);
        }
    }, [props]);

    /* ↓スクラップを削除する */
    const deleteScrap = async(id) => {
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
        }).then(async(result) => {
            if (!result.value) {
                return;
            };
            await deleteDoc(doc(db, 'scraps', id));
            MySwal.fire({
                title: '処理終了',
                html : '選択したスクラップが削除されました。',
                icon : 'success',
                allowOutsideClick : false,
                allowEscapeKey : false,
            });            
        });
    };

    switch (loading) {
        case false:
            return (
                <div className='scraps-wrapper'>
                    <div className='displayQuestions'>
                        <div className='flexbox'>
                            <div className='Ranking'>
                                <h3>ユーザーランキング</h3>
                                {/* データベースに登録された質問内容を一つ一つ表示(ForEach構文に似たmap関数を使用) */}
                                {userList && (
                                    userList.map((users, index) => (
                                        <div key={users.displayName} className='user ranking-wrapper'>
                                            <a href={'/profile?user=' + users.displayName}>
                                                {
                                                    index + 1 === 1 ?
                                                    (
                                                        <div className='fs-4 fw-bold'>
                                                            <i className='fa-sharp fa-solid fa-crown me-2 ranking-first d-inline' />
                                                            <p className='d-inline text-dark'>{index + 1} 位　<img className='ranking-userIcon' src={users.icon} alt='userIcon' />{users.displayName}<span className='mx-2'>{users.pt}</span>points</p>
                                                        </div>
                                                    )
                                                    : index + 1 === 2 ?
                                                    (
                                                        <div className='fs-5 fw-bold'>
                                                            <i className='fa-sharp fa-solid fa-crown me-2 ranking-second d-inline' />
                                                            <p className='d-inline text-dark'>{index + 1} 位　<img className='ranking-userIcon' src={users.icon} alt='userIcon' />{users.displayName}<span className='mx-2'>{users.pt}</span>points</p>
                                                        </div>
                                                    )
                                                    : index + 1 === 3 ?
                                                    (
                                                        <div className='fs-6 fw-bold'>
                                                            <i className='fa-sharp fa-solid fa-crown me-2 ranking-third d-inline' />
                                                            <p className='d-inline text-dark'>{index + 1} 位　<img className='ranking-userIcon' src={users.icon} alt='userIcon' />{users.displayName}<span className='mx-2'>{users.pt}</span>points</p>
                                                        </div>
                                                    )
                                                    :
                                                    <div>
                                                        <p className='d-inline text-dark'>{index + 1} 位　<img className='ranking-userIcon' src={users.icon} alt='userIcon' />{users.displayName}<span className='mx-2'>{users.pt}</span>points</p>
                                                    </div>
                                                }
                                                <hr className='ranking-bottomHr' />
                                            </a>
                                        </div>
                                    ))
                                )}
                            </div>
                            <div className='Scraps'>
                                <h2 className='scraps-title'>Scraps Board</h2>
                                <p className='text-center'>疑問をエンジニアに相談できます。</p>
                                {/* データベースに登録された質問内容を一つ一つ表示(ForEach構文に似たmap関数を使用) */}
                                {scraps && (
                                    scraps.map((scraps) => (
                                        <div key={scraps.title} className='scrap'>
                                            <a href={'/profile?user=' + scraps.userName}><img className='scrap-userIcon' src={scraps.userIcon} alt='userIcon' /></a>
                                            <p className='scrap-userName'><i className='fas fa-circle-question' />スクラップ投稿者 ⇢ <a href={'/profile?user=' + scraps.userName}>{scraps.userName}</a></p>
                                            <p className='scrap-createAt'>{scraps.createAt}</p>
                                            <div className='scrap-good ps-1'>
                                                <Tooltip label='いいね！' bg='gray' p='0px 10px' fontSize='11px' color='white'>
                                                    <Text cursor='pointer' onClick={() => toggleGood(scraps.id, scraps.goods)}>
                                                    <Icon
                                                        as={isGood[scraps.id] ? BsHandThumbsUpFill : BsHandThumbsUp}
                                                        mr='2.5'
                                                        fontSize='22px'
                                                        color={isGood[scraps.id] ? '#80CBC4' : ''}
                                                    />
                                                    {scraps.goods}
                                                    </Text>
                                                </Tooltip>
                                            </div>
                                            <div className='scrap-like ps-2'>
                                                <Tooltip label='お気に入りに追加' bg='gray' p='0px 10px' fontSize='11px' color='white'>
                                                    <Text cursor='pointer' onClick={() => toggleLike(scraps.id, scraps.likes)}>
                                                    <Icon
                                                        as={isLike[scraps.id] ? AiFillHeart : AiOutlineHeart}
                                                        mr='2.5'
                                                        fontSize='22px'
                                                        color={isLike[scraps.id] ? 'red' : ''}
                                                    />
                                                    {scraps.likes}
                                                    </Text>
                                                </Tooltip>
                                            </div>
                                            <h1 className='scrap-title'>{scraps.title}</h1>
                                            <p className='scrap-content' id='scrap-content'>{scraps.subtitle && scraps.subtitle.length > 20 ? (scraps.subtitle).slice(0,80)+'…' : scraps.subtitle}</p>
                                            <p>言語: {scraps.languages && (scraps.languages.join(', '))}</p>
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
                                    ))
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            );
        default: return null;
    };
};

export default Scrap;