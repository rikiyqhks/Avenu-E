/* ↓React Imports ALL */
import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';

/* ↓Images */
import Question from '../../images/searchbar/question.svg';
import Community from '../../images/searchbar/community.svg';

/* ↓Firebase Imports ALL */
import { collection, onSnapshot, query, orderBy, limit } from 'firebase/firestore';
import { db } from '../../firebase/database';

/* ↓Layouts */
import './Layouts.css';

const SearchBar = () => {

    /* ↓↓現在のURLからURLオブジェクトを生成 */
    const url = new URL(window.location.href);

    /* ↓↓URLのパスを取得 */
    const urlPath = url.pathname;

    /* ↓検索欄の入力値を保持 */
    const [values, setValues] = useState(String());

    /* ↓検索人気言語ランキング */
    const [famousLangs, setFamousLangs] = useState(Array());

    useMemo(() => {
        /* ↓降順で言語をデータベースから取得 */
        onSnapshot(query(collection(db, 'languages'), orderBy('searchNum', 'desc'), limit(10)), (languages) => {
            languages.docs.map((language) => {
                setFamousLangs((prevState) => ([...prevState, language.data()]));
            });
        });
    }, []);

    const handleInputChange = (e) => {
        const target = e.target;
        const value = target.value;
        setValues(value);
    };

    switch (urlPath) {
        /* ↓URLのパスが / の場合 トップページ用のヘッダをレンダリングする */
        case '/scraps':
        case '/scraps/result':
            return (
                <div className='container mt-4'>
                    <div className='row d-flex justify-content-center'>
                        <div className='col-md-9'>
                            <div className='card'>
                                <img className='question-image' src={ Question } alt='QuestionImage' />
                                <h3 className='heading mt-3 text-center'>どのような事でお悩みですか？</h3>
                                <div className='engine-wrapper'>
                                    <div className='search'>
                                        <input type='text' className='search-input' placeholder='キーワードを入力' name='bigram' onChange={handleInputChange} value={values} />
                                        <Link className='search-icon' to={`/scraps/result?status=${values}`} state={values}><i className='fa fa-search' /></Link>
                                    </div> 
                                </div>
                                <table><caption className='mt-2'>人気検索一覧</caption></table>
                                <div className='row g-1 px-4 mb-5 scrollContents'>
                                    {
                                        famousLangs.map((lang) => (
                                            <div className='col-md-2' key={lang.name} onClick={() => setValues(lang.name)}>
                                                <div className='card-inner p-3 d-flex flex-column align-items-center'>
                                                    <img src={lang.image} width='50' alt='a' />
                                                    <div className='text-center mg-text'>
                                                        <span className='mg-text'>{lang.name}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr className='search-bottomHr' />
                </div>
            );
        case '/package':
            return (
                <div className='container mt-4'>
                    <div className='row d-flex justify-content-center'>
                        <div className='col-md-9'>
                            <div className='card p-4 mt-3'>
                                <img className='community-image' src={ Community } alt='CommunityImage' />
                                <h3 className='heading mt-3 text-center'>気になるプロダクトを見つける</h3>
                                <div className='engine-wrapper'>
                                    <div className='search'>
                                    <input type='text' className='search-input' placeholder='キーワードを入力' name='' />
                                        <a href='/package' className='search-icon'><i className='fa fa-search' /></a>
                                    </div> 
                                </div>
                                <table><caption className='mt-2'>人気検索一覧</caption></table>
                                <div className='row g-1 px-4 mb-5 scrollContents'>
                                    {
                                        famousLangs.map((lang) => (
                                            <div className='col-md-2' key={lang.name} onClick={() => setValues(lang.name)}>
                                                <div className='card-inner p-3 d-flex flex-column align-items-center'>
                                                    <img src={lang.image} width='50' alt='a' />
                                                    <div className='text-center mg-text'>
                                                        <span className='mg-text'>{lang.name}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr className='search-bottomHr' />
                </div>
            );
        default: return null;
    };
};

export default SearchBar;