/* ↓React Imports ALL */
import React, { useCallback, useState, useEffect } from 'react';
import { TagsInput } from 'react-tag-input-component';
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import remarkGfm from 'remark-gfm';
import { Icon, Text, Tooltip } from '@chakra-ui/react';
import { AiOutlineHeart } from 'react-icons/ai';
import { BsHandThumbsUp } from 'react-icons/bs';

/* ↓Utils */
import { MySwal } from '../../utils/Swal';

/* ↓Css */
import './Scraps.css';

/* ↓Redux and Firebase Imports ALL */
import { useDispatch } from 'react-redux';
import { useFirestoreConnect, useFirestore } from 'react-redux-firebase';
import { addScrap } from '../../features/actions';

/* ↓Images */
import ScrapPosts from '../../images/scrapPost.svg';

const ScrapPost = (props) => {

    /* ↓state変数「language」を定義 */
    const [language, setLanguage] = useState(Array());

    /* ↓state変数「other」を定義 */
    const [others, setOthers] = useState(Array());

    /* ↓state変数「loading」を定義 */
    const [loading, setLoading] = useState(Boolean(true));

    /* ↓メール認証が確認できていないアカウントのみ発火する関数 */
    const noVerifiedAccount = async() => {
        await MySwal.fire({
            title: 'エラー aE-0307',
            html : '認証していないアカウントはこの機能をご利用できません。',
            icon : 'error',
            allowOutsideClick : false,
            allowEscapeKey : false
        }).then(() => {
            window.location = '/scraps';
        });
    };

    /* ↓Firestore連携 */
    const firestore = useFirestore();
    useFirestoreConnect('scraps');

    /* ↓Redux連携 */
    const dispatch = useDispatch();
    const createScrap = useCallback(
        (scrap) => dispatch(addScrap({ firestore }, scrap)),
        [firestore]
    );

    /* ↓Redux経由でFirestoreにデータを追加する */
    const [scrap, setScrap] = useState({
        title: String(),
        subtitle: String(),
        createAt: String(),
        content: String(),
        languages: Array(),
        others: Array(),
        userName: String(),
        userIcon: String(),
        goods: Number(),
        likes: Number(),
        id: String(),
        uid: String(),
    });

    useEffect(() => {
        setScrap((prevState) => ({ ...prevState, languages: language }))
    }, [language || others])

    useEffect(() => {
        setScrap((prevState) => ({ ...prevState, others: others }))
    }, [others])

    /* ↓入力したデータを取得してデータベースに追加する */
    const handleChange = (e) => {
        setScrap({ ...scrap, [e.target.id]: e.target.value });
    };
    
    const handleSubmit = async(e) => {
        /* ↓submitされた時にページが更新されない */
        e.preventDefault();
        try {
            /* ↓JSONデータを検証してデータベースに追加 */
            if (scrap.title.trim() === '' || scrap.subtitle.trim() === '' || scrap.createAt.trim() === '' || scrap.content.trim() === '') return;
            createScrap(scrap);
            /* ↓投稿完了メッセージ */
            await MySwal.fire({
                title: '投稿完了',
                html : 'スクラップが投稿されました。',
                icon : 'success',
                allowOutsideClick : false,
                allowEscapeKey : false,
            }).then(() => {
                window.location = '/scraps';
            });
        } catch(error) {
            /* ↓失敗メッセージ */
            await MySwal.fire({
                title: 'aE-0405',
                html : 'スクラップの投稿中にエラーが発生しました。',
                icon : 'error',
                allowOutsideClick : false,
                allowEscapeKey : false,
            });
        };
    };

    /* ↓日付オブジェクトを作成する */
    const dd = new Date();

    /* ↓「年」を取得する */
    const YYYY = dd.getFullYear();

    /* ↓「月」を取得する */
    const MM = dd.getMonth()+1;
    
    /* ↓「日」を取得する */
    const DD = dd.getDate();

    scrap.createAt = YYYY + '年' + MM + '月' + DD + '日';

    /* ↓内部関数のローディングが完了したときに発火する */
    useEffect(() => {
        /* ↓ユーザーが存在しなかった場合、ログインページに遷移させる */
        if (!props.user) {
            window.location = '/login';
        } else if (!props.user.emailVerified) {
            /* ↓メール未認証の場合エラーを返す */
            noVerifiedAccount();
        } else {
            /* ↓ページローディングを開始する */
            setLoading(false);
            setScrap({userName: props.user.displayName, userIcon: props.user.photoURL, uid: props.user.uid, goods: 0, likes: 0});
        };
    }, [props]);

    switch (loading) {
        case false:
            return (
                <div className='post-wrapper'>
                    <div className='container py-5 border col-6 p-5 bg-light'>
                        <div>
                            <h2 className='d-inline-block'><span className='post-title'>疑問</span>を<span className='post-title'>スクラップ</span>に残してみよう。</h2>
                            <img className='d-inline-block' src={ ScrapPosts } width='250' alt='ScrapPost' />
                            <p className='text-secondary'>投稿作成日: {YYYY + '年' + MM + '月' + DD + '日'}</p>
                        </div>
                        <div className='row'>
                            <div className='col-md'>
                                <form onSubmit={handleSubmit}>
                                    <div className='form-group mb-3'>
                                        <label><h3 className='d-inline-block me-2'>タイトル</h3><small className='text-secondary text-decoration-underline'>...スクラップの表題（最大20文字）</small></label>
                                        <input className='form-control' id='title' type='text' placeholder='タイトル' value={scrap.title} onChange={handleChange} />
                                    </div>
                                    <div className='form-group mb-3'>
                                        <label><h3 className='d-inline-block me-2'>サブタイトル</h3><small className='text-secondary text-decoration-underline'>...一覧に表示されるコンテンツ（最大50文字）</small></label>
                                        <textarea className='form-control' id='subtitle' placeholder='サブタイトル' value={scrap.subtitle} onChange={handleChange} />
                                    </div>
                                    <div className='form-group mb-3'>
                                        <label><h3 className='d-inline-block me-2'>記事内容</h3><small className='text-secondary text-decoration-underline'>...記事に書き込む内容（Markdown対応）</small></label>
                                        <p>*Markdownの記述方法に関しては<a href='/scraps/detail?user=RikiYa&id=vfabbc6HoE7WPKaP1aM6' target='_blank' rel='nofollow noopener noreferrer'>こちらを参照</a>ください。</p>
                                        <textarea className='form-control' id='content' placeholder='記事内容' value={scrap.content} onChange={handleChange} />
                                    </div>
                                    <div className='form-group mb-3'>
                                        <label><h3 className='d-inline-block me-2'>言語</h3><small className='text-secondary text-decoration-underline'>...記事に関連する言語</small></label>
                                        <TagsInput
                                            classNames='tag-form'
                                            value={language}
                                            onChange={setLanguage}
                                            name='language'
                                            placeHolder='言語の追加'
                                        />
                                    </div>
                                    <div className='form-group mb-3'>
                                        <label><h3 className='d-inline-block me-2'>その他</h3><small className='text-secondary text-decoration-underline'>...開発環境やその他タグ</small></label>
                                        <TagsInput
                                            classNames='tag-form'
                                            value={others}
                                            onChange={setOthers}
                                            name='others'
                                            placeHolder='その他、開発環境など'
                                        />
                                    </div>
                                    <hr />
                                    <div className='text-center'>
                                        <a className='btn btn-secondary me-4' href='/scraps'>やめる</a>
                                        <button className='btn btn-success'>投稿する</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className='container py-5 border col-6 bg-light preview-wrapper'>
                        <div className='mb-5'>
                            <h3 className='fw-bold text-secondary'>スクラップのプレビュー</h3>
                        </div>
                        <div className='scrap'>
                            <a><img className='scrap-userIcon' src={scrap.userIcon} alt='userIcon' /></a>
                            <p className='scrap-userName'><i className='fas fa-circle-question' />スクラップ投稿者 ⇢ <a className='text-primary'>{scrap.userName}</a></p>
                            <p className='scrap-createAt'>{scrap.createAt}</p>
                            <div className='scrap-good ps-1'>
                                <Tooltip label='いいね！' bg='gray' p='0px 10px' fontSize='11px' color='white'>
                                    <Text cursor='pointer'>
                                    <Icon
                                        as={BsHandThumbsUp}
                                        mr='2.5'
                                        fontSize='22px'
                                    />
                                    0
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
                                    />
                                    0
                                    </Text>
                                </Tooltip>
                            </div>
                            <h1 className='scrap-title'>{scrap.title ? scrap.title : 'タイトルを入力'}</h1>
                            <p className='scrap-content' id='scrap-content'>{scrap.subtitle ? scrap.subtitle && scrap.subtitle.length > 20 ? (scrap.subtitle).slice(0,80)+'…' : scrap.subtitle : 'サブタイトルを入力'}</p>
                            <p>言語: {language}</p>
                            <p>その他: {others}</p>
                            <div className='scraps-btn-wrapper'>
                                <a><button className='btn'>詳細を確認</button></a>
                                <button className='btn btn-danger'><i className='fas fa-xmark me-2' />このスクラップを削除する</button>
                            </div>
                        </div>
                        <div className='mx-5'>
                            <ReactMarkdown rehypePlugins={[rehypeHighlight]} remarkPlugins={[remarkGfm]}>
                                {scrap.content}
                            </ReactMarkdown>
                        </div>
                    </div>
                </div>
            );
        default: return null;
    };
};

export default ScrapPost;