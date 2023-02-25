/* ↓React Imports ALL */
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import remarkGfm from 'remark-gfm';

/* ↓Css */
import './Scraps.css';

/* ↓Firebase Imports ALL */
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebase/database';

const ScrapDetail = (props) => {

    /* ↓選択した質問データを状態変数に保管 */
    const [scrapsData, setScrapData] = useState(Object());

    /* ↓state変数「loading」を定義 */
    const [loading, setLoading] = useState(Boolean(true));

    const queryGet = () => {
        /* ↓クエリパラメータの取得 */
        const search = useLocation().search;
        const query = new URLSearchParams(search).get('id');
        useEffect(() => {
            /* ↓データベースからデータを取得 */
            const scrapsData = collection(db, 'scraps');
            /* ↓リアルタイムにデータベースからデータを取得 */
            onSnapshot(scrapsData, (scraps) => {
                scraps.docs.map((doc) => {
                    if(doc.id === query) setScrapData(doc.data());
                });
            });
        }, []);
    };

    queryGet();

    /* ↓内部関数のローディングが完了したときに発火する */
    useEffect(() => {
        /* ↓ユーザーが存在しなかった場合、ログインページに遷移させる */
        if (!props.user) {
            window.location = '/login'
        } else {
            /* ↓ページローディングを開始する */
            setLoading(false);
        };
    }, [props]);

    switch (loading) {
        case false:
        return (
            <div>
                <div className='flex'>
                    <div className='left'>
                    </div>
                    <div class='scrapDetail-center'>
                        <div className='center'>
                            <p className='icon'><img src={scrapsData.userIcon} alt='userIcon' width='30' height='30' />{scrapsData.userName}</p>
                            <p className='day'>投稿日<span className='mx-2'>{scrapsData.createAt}</span>更新日</p>
                            <h1><a id='title'>{scrapsData.title}</a></h1>
                            <div className='tag'>
                                <i className='fa fa-duotone fa-tag' />
                                {/* 押すとそのキーワードに飛ぶように取り合えずPタグでくくってる */}
                                {
                                    scrapsData.tags && scrapsData.tags.map((tag) => (
                                        <p>{tag}</p>
                                    ))
                                }
                            </div>
                            {/* この下から投稿内容を */}
                            <div id='content'>
                                <ReactMarkdown rehypePlugins={[rehypeHighlight]} remarkPlugins={[remarkGfm]}>
                                    {scrapsData.content}
                                </ReactMarkdown>
                            </div>
                        </div>
                    </div>
                    <div className='right'>
                        <div className='scroll'>
                            <h1>もくじ</h1>
                            {/* <a href='#何々'></a>で飛ぶ先を指定
                            <a id='何々'></a>が着地地点 */}
                            <ul>
                                <li><a href='#title' className='titleLink'>{scrapsData.title}</a></li>
                                <li><a href='#content'>概要</a></li>
                                <li><a href=''>初めに</a></li>
                                <li><a href=''>test2</a></li>
                                <li><a href=''>test4</a></li>
                                <li><a href=''>test5</a></li>
                                <li><a href=''>test</a></li>
                                <li><a href=''>test</a></li>
                                <li><a href=''>test</a></li>
                                <li><a href=''>test</a></li>
                                <li><a href=''>test</a></li>
                                <li><a href=''>test</a></li>
                                <li><a href=''>test</a></li>
                                <li><a href=''>test</a></li>
                                <li><a href=''>test</a></li>
                                <li><a href=''>test</a></li>
                                <li><a href=''>test</a></li>
                                <li><a href=''>test</a></li>
                                <li><a href=''>test</a></li>
                                <li></li><a href=''>testtesttesttestestestestetetetetetetet</a>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        );
        default: return null;
    };
};

export default ScrapDetail;