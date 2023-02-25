/* ↓React Imports ALL */
import React, { useEffect, useState } from 'react';

/* ↓高さのデフォルト値の設定 */
const PAGE_Y_OFFSET = 400;

const ToTop = () => {
    
    /* ↓デフォルト値は false */
    const [show, setShow] = useState(Boolean(false));

    /* ↓デフォルト値 高さ400 以上になったらステータスをtrueにする */
    const changeShow = () => {
        if (window.pageYOffset > PAGE_Y_OFFSET) {
            setShow(true);
        } else {
            setShow(false);
        };
    };

    /* ↓ページのトップにスムーズに戻る関数 */
    const onScrollTop = () => {
        window.scroll({ top: 0, behavior: 'smooth' });
    };

    /* ↓スクロールしたことを認識する */
    useEffect(() => {
        window.addEventListener('scroll', changeShow);
        return () => window.removeEventListener('scroll', changeShow);
    }, []);

    /* ↓trueになったらボタンを表示 */
    if (show)
        return (
            <div id='page_top'>
                <p onClick={onScrollTop}></p>
            </div>
        );
    else return null;
};

export default ToTop;