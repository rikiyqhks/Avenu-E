/* ↓React Imports ALL */
import React, { useState, useEffect } from 'react';
import { Icon, Text, Tooltip } from '@chakra-ui/react';
import { BsBookmarkPlus, BsFillBookmarkFill } from 'react-icons/bs';

/* ↓Firebase Imports ALL */
import { collection, onSnapshot, query, orderBy, limit, writeBatch, doc } from 'firebase/firestore';
import { db } from '../../firebase/database';

/* ↓Layouts */
import './Package.css';

const Package = (props) => {

    /* ↓Firestoreから直接表示させる */
    const [packages, setPackages] = useState(Array());

    /* ↓ログイン中のユーザーデータを状態変数に保管 */
    const [userData, setUserData] = useState(Object());

    /* ↓state変数「loading」を定義 */
    const [loading, setLoading] = useState(Boolean(true));

    /* ↓内部関数のローディングが完了したときに発火する */
    useEffect(() => {
        /* ↓ユーザーが存在しなかった場合、ログインページに遷移させる */
        if (!props.user) {
            window.location = '/login';
        } else {
            /* ↓リアルタイムにデータベースからデータを取得 */
            onSnapshot(collection(db, 'users'), (users) => {
                users.docs.map((userDoc) => {
                    userDoc.data().email === props.user.email && (
                        setUserData(userDoc.data()),
                        onSnapshot(collection(db, 'packages'), (packages) => {
                            packages.docs.map((packageDoc) => {
                                userDoc.data().bookmarks.length > 0 ? (
                                    userDoc.data().bookmarks.includes(packageDoc.id) ? (
                                        /* ↓ブックマークしているデータの初期値はtrue */
                                        setIsBookmark((prevState) => ({ ...prevState, [packageDoc.id]: true }))
                                    ) : (
                                        /* ↓ブックマークしていないデータの初期値はfalse */
                                        setIsBookmark((prevState) => ({ ...prevState, [packageDoc.id]: false }))
                                    )
                                ) : (
                                    setIsBookmark((prevState) => ({ ...prevState, [packageDoc.id]: false }))
                                );
                            });
                        })
                    );
                });
            }),
            /* ↓リアルタイムにデータベースからデータを取得 */
            onSnapshot(query(collection(db, 'packages'), orderBy('createAt', 'desc'), limit(10)), (packages) => {
                setPackages(packages.docs.map((doc) => ({ ...doc.data() })));
                setLoading(false);
            }),
            /* ↓ページローディングを開始する */
            setLoading(false)
        };
    }, [props]);

    /* ↓ブックマークボタン表示制御用の状態変数 */
    const [isBookmark, setIsBookmark] = useState(Object());

    /* ↓ブックマーク関数 */
    const toggleBookmark = async(id) => {
        const batch = writeBatch(db);
        const userRef = doc(db, 'users', userData.id);
        !isBookmark[id] ? (
            batch.update(userRef, {'bookmarks': [...userData.bookmarks, id]})
        ) : (
            batch.update(userRef, {'bookmarks': userData.bookmarks.filter(bookmark => (bookmark.match(id)) == null)})
        )
        batch.commit();
        setIsBookmark((prevState) => ({ ...prevState, [id]: ![id] }));
    };

    switch (loading) {
        case false:
        return (
            <div className='package-wrapper'>
                <h2 className='package-title'>New Packages</h2>
                <p>最近登録されたアプリケーションです。</p>
                <div className='card-wrapper'>
                    {packages && (
                        packages.map((packages) => (
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
                                            <Text cursor='pointer' onClick={() => toggleBookmark(packages.id)}>
                                            <Icon
                                                as={isBookmark[packages.id] ? BsFillBookmarkFill : BsBookmarkPlus}
                                                mr='2.5'
                                                fontSize='22px'
                                                color={isBookmark[packages.id] ? '#80CBC4' : ''}
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
                        ))
                    )}
                </div>
                <div className='mt-30'>
                    <a href='https://kojin.dev/application/search'>
                        <button className='btn andMore'>
                            もっと見る...
                        </button>
                    </a>
                </div>
            </div>
        );
        default: return null;
    };
};

export default Package;