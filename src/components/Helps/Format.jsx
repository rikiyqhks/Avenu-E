/* ↓React Imports ALL */
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';

/* ↓Firebase Imports ALL */
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebase/database';

/* ↓Layouts */
import './Help'

const Format = () => {

    /* ↓クエリパラメータの取得 */
    const search = useLocation().search;
    const query = new URLSearchParams(search).get('type');

    /* ↓state変数「helpList」を定義 */
    const [helpList, setHelpList] = useState(Array());

    /* ↓state変数「loading」を定義 */
    const [loading, setLoading] = useState(Boolean(true));

    useEffect(() => {
        /* ↓データベースからデータを取得 */
        const helpData = collection(db, 'helps');
        /* ↓リアルタイムにデータベースからデータを取得 */
        onSnapshot(helpData, (help) => {
            setHelpList(help.docs.map((doc) => ({ ...doc.data() })));
            setLoading(false);
        });
    }, []);

    return (
        !loading && (
            <>
                <div className='help-format_category'>
                    {helpList && (
                            helpList.map((value) => (
                                value.query === query && (
                                    <div key={query}>
                                        <section className='help-format_section' />
                                        <h2 className='help-format_section_heading'>{value.title}</h2>
                                        <hr />
                                        <ReactMarkdown>
                                            {value.explanation}
                                        </ReactMarkdown>
                                    </div>
                                )
                            ))
                        )
                    }
                </div>
            </>
        )
    );
};

export default Format;