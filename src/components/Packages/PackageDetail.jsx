/* ↓React Imports ALL */
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/* ↓Firebase Imports ALL */
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebase/database';

/* ↓Layouts */
import './Package.css';

const PackageDetail = (props) => {

    /* ↓Firestoreから直接表示させる */
    const [data, setData] = useState(Object());

    /* ↓state変数「loading」を定義 */
    const [loading, setLoading] = useState(Boolean(true));

    /* ↓内部関数のローディングが完了したときに発火する */
    useEffect(() => {
        /* ↓ユーザーが存在しなかった場合、ログインページに遷移させる */
        if (!props.user) {
            window.location = '/login';
        } else {
            /* ↓ページローディングを開始する */
            setLoading(false);
        };
    }, [props]);

    const queryGet = () => {
        /* ↓クエリパラメータの取得 */
        const search = useLocation().search;
        const query = new URLSearchParams(search).get('id');
        useEffect(() => {
            /* ↓データベースからデータを取得 */
            const packagesData = collection(db, 'packages');
            /* ↓リアルタイムにデータベースからデータを取得 */
            onSnapshot(packagesData, (packages) => {
                packages.docs.map((doc) => {
                    if(doc.id === query) setData(doc.data());
                })
            })
        }, []);
    };

    queryGet();

    switch (loading) {
        case false:
        return (
            <div>
                {!loading && (
                    <div className='packageDetail-wrapper'>
                        <div className='packageDetail-top'>
                            <h2 className='packageDetail-title'>{data.title}</h2>
                            <div className='social-icon-list'>
                                {
                                    data.types && (
                                        data.types.map((type, index) => (
                                            <a className='tags-listItem' key={type + '_' + index}>{type}</a>
                                        ))
                                    )
                                }
                            </div>
                            <p>{data.subtitle}</p>

                            <div className='packageDetail-thumbnail'>
                                <img src={data.images} alt='' width='480' height='auto'/>
                            </div>
                            <div className='packageDetail-developer'>
                                開発者：<a href={'/profile?user=' + data.masterUserName}>{data.masterUserName}</a>
                            </div>
                        </div>
                        <div className='packageDetail-summary'>
                            <div className='packageDetail-overview'>
                                <div className='overview-head'>
                                    <h2 className='overview-head-title'>概要</h2>
                                </div>
                                <div>
                                    <p>アプリケーションURL</p>
                                    <p>{data.content}</p>
                                </div>
                            </div>
                            <div className='packageDetail-skill'>
                                <div className='skill-head'>
                                    <h2 className='skill-head-title'>利用している技術</h2>
                                </div>
                                <div>
                                    <p>{data.types && data.types.join(', ')}</p>
                                </div>
                            </div>
                            <div className='packageDetail-system'>
                                <div className='system-head'>
                                    <h2 className='system-head-title'>システム構成</h2>
                                </div>
                                <div>
                                    <p>{data.structure}</p>
                                </div>
                            </div>
                            <div className='packageDetail-movie'>
                                <div className='movie-head'>
                                    <h2 className='movie-head-title'>動画</h2>
                                </div>
                                <div>
                                    {/* (if) data.movieが存在したら ? 表示したいもの : (else なかったら) 表示させるテキスト */}
                                    <p>{data.movie ? '動画URL:　' + data.movie : '動画のURLが存在しません。'}</p>
                                </div>
                            </div>
                            <div className='packageDetail-story'>
                                <div className='story-head'>
                                    <h2 className='story-head-title'>開発ストーリー</h2>
                                    <p>{data.story ? data.story : '開発ストーリーが存在しません。'}</p>
                                </div>
                            </div>
                            <div className='packageDetail-link'>
                                <div className='link-head'>
                                    <h2 className='link-head-title'>関連リンク</h2>
                                </div>
                                <div>
                                    {
                                        data.link && (
                                            data.link.link_1 && (
                                                <p>URL名前:　{data.link.link_1}</p>
                                            ),
                                            data.link.link_2 && (
                                                <p>URL名前:　{data.link.link_2}</p>
                                            ),
                                            data.link.link_3 && (
                                                <p>URL名前:　{data.link.link_3}</p>
                                            ),
                                            data.link.link_4 && (
                                                <p>URL名前:　{data.link.link_4}</p>
                                            ),
                                            data.link.link_5 && (
                                                <p>URL名前:　{data.link.link_5}</p>
                                            )
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        );
        default: return null;
    };
};

export default PackageDetail;