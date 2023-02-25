/* ↓React Imports ALL */
import React, { useCallback, useState, useEffect } from 'react';
import { TagsInput } from 'react-tag-input-component';

/* ↓Utils */
import { MySwal } from '../../utils/Swal';

/* ↓Redux and Firebase Imports ALL */
import { collection, onSnapshot } from 'firebase/firestore';
import { useDispatch } from 'react-redux';
import { useFirestoreConnect, useFirestore } from 'react-redux-firebase';
import { addPackage } from '../../features/actions';
import { db } from '../../firebase/database';

/* ↓Layouts */
import './Package.css';

/* ↓Images */
import Upload from '../../images/packages/image-upload.png';

const PackagePost = (props) => {

    /* ↓state変数「languagesList」を定義 */
    const [languagesList, setLanguages] = useState(Array());

    /* ↓state変数「loading」を定義 */
    const [loading, setLoading] = useState(Boolean(true));

    /* ↓変更後のプロフィール画像のプレビュー */
    const [previewImg, setPreviewImg] = useState({
        preview_1: String(),
        preview_2: String(),
        preview_3: String(),
        preview_4: String(),
    });

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

    /* ↓Firestore連携 */
    const firestore = useFirestore();
    useFirestoreConnect('packages');

    /* ↓Redux連携 */
    const dispatch = useDispatch();
    const createPackage = useCallback(
        (packages) => dispatch(addPackage({ firestore }, packages)),
        [firestore]
    );

    /* ↓Redux経由でFirestoreにデータを追加する */
    const [packages, setPackages] = useState({
        status: String(), //必須
        title: String(), //必須
        subtitle: String(), //必須
        url: String(),
        github: String(),
        createAt: String(), //必須
        content: String(), //必須
        images: Array(), //必須
        movie: String(),
        structure: String(),
        material: String(), //必須
        types: Array(),
        story: String(),
        link: Array(),
        masterUserName: props.user.displayName, //必須
        masterUserIcon: props.user.photoURL, //必須
        id: String(), //必須
        uid: props.user.uid, //必須
        developReport: Object(),
    });

    const [tags, setTags] = useState(Array());
    const [links, setLinks] = useState({
        link_1: String(),
        link_2: String(),
        link_3: String(),
        link_4: String(),
        link_5: String(),
    });

    /* ↓日付オブジェクトを作成する */
    const dd = new Date();
    /* ↓「年」を取得する */
    const YYYY = dd.getFullYear();
    /* ↓「月」を取得する */
    const MM = dd.getMonth()+1;
    /* ↓「日」を取得する */
    const DD = dd.getDate();
    packages.createAt = YYYY + '年' + MM + '月' + DD + '日';

    /* ↓入力したデータを取得してデータベースに追加する */
    const handleChange = (e) => {
        setPackages({ ...packages, [e.target.id]: e.target.value });
    };

    /* バリデーションチェック */
    const valCheck = () => {
        if (packages.status && packages.title && packages.title < 50 && packages.subtitle && packages.subtitle < 50 && packages.createAt && packages.content
            && packages.content < 100 && packages.images && packages.material && packages.masterUserName && packages.masterUserIcon && packages.uid) {
                return true;
            } else {
                MySwal.fire({
                    title: 'エラー aE-0201',
                    html : '入力不備があります。',
                    icon : 'error',
                    allowOutsideClick : false,
                    allowEscapeKey : false,
                });
            };
    };
    
    const handleSubmit = async (e) => {
        /* ↓submitされた時にページが更新されない */
        e.preventDefault();
        if (valCheck()) {
            try {
                /* ↓JSONデータを検証してデータベースに追加 */
                if (packages.title.trim() === '' || packages.createAt.trim() === '' || packages.content.trim() === '' || packages.status.trim() === '') return;
                createPackage(packages);
                /* ↓投稿完了メッセージ */
                await MySwal.fire({
                    title: '投稿完了',
                    html : 'パッケージが投稿されました。',
                    icon : 'success',
                    allowOutsideClick : false,
                    allowEscapeKey : false,
                }).then(() => {
                    window.location = '/package';
                });
            } catch(error) {
                console.error(error);
                /* ↓失敗メッセージ */
                await MySwal.fire({
                    title: 'aE-0405',
                    html : 'パッケージの投稿中にエラーが発生しました。',
                    icon : 'error',
                    allowOutsideClick : false,
                    allowEscapeKey : false,
                });
            };
        };
    };

    /* ↓内部関数のローディングが完了したときに発火する */
    useEffect(() => {
        /* ↓ユーザーが存在しなかった場合、ログインページに遷移させる */
        if (!props.user) {
            window.location = '/login';
        } else if (!props.user.emailVerified) {
            /* ↓メール未認証の場合エラーを返す */
            noVerifiedAccount();
        } else {
            const languagesData = collection(db, 'languages');
            /* ↓リアルタイムにデータベースからデータを取得 */
            onSnapshot(languagesData, (language) => {
                setLanguages(language.docs.map((doc) => ({ ...doc.data().name })));
            });
            /* ↓ページローディングを開始する */
            setLoading(false);
        };
    }, [props]);

    /* ↓サムネイルのイメージファイルが選択されたときに状態変数に格納 */
    const handleFileChange = (e) => {
        const reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = () => {
            setPreviewImg({ ...previewImg, [e.target.name]: reader.result });
            setPackages({ ...packages, images: [ ...packages.images, reader.result ] });
        }
    };

    const handleLinkChange = (e) => {
        setLinks({ ...links, [e.target.id]: e.target.value });
    };

    useEffect(() => {
        setPackages({ ...packages, tags: tags });
    }, [tags]);

    useEffect(() => {
        setPackages({ ...packages, link: links });
    }, [links]);

    switch (loading) {
        case false:
            return (
                <div className='post-wrapper'>
                    <div className='container my-5'>
                        <form className='package-base' onSubmit={handleSubmit}>
                            <div className='package-contents'>
                                <p>投稿作成日: {YYYY + '年' + MM + '月' + DD + '日'}</p>
                            </div>
                            <div className='package-contents'>
                                <span className='package-must'>必須</span>作品ステータス<br />
                                <div className='status-control'>
                                    <input className='form-check-input ms-3' type='radio' id='status' name='status' value='アイデア' onChange={handleChange} />
                                    <label className='ms-1'>アイデア</label>
                                    <input className='form-check-input ms-3' type='radio' id='status' name='status' value='開発中' onChange={handleChange} />
                                    <label className='ms-1'>開発中</label>
                                    <input className='form-check-input ms-3' type='radio' id='status' name='status' value='完成' onChange={handleChange} />
                                    <label className='ms-1'>完成</label>
                                </div>
                            </div>
                            <div className='package-contents'>
                                <span className='package-must'>必須</span>作品タイトル
                                <input id='title' className='form-control' type='text' placeholder='50字まで入力できます。' value={packages.title} onChange={handleChange} maxLength={50} />
                            </div>
                            <div className='package-contents'>
                                <span className='package-must'>必須</span>作品サブタイトル
                                <input id='subtitle' className='form-control' type='text' placeholder='50字まで入力できます。' value={packages.subtitle} onChange={handleChange} maxLength={50} />
                            </div>
                            <div className='package-contents'>
                                <span className='package-free'>任意</span>作品のURL
                                <input id='url' className='form-control' type='text' placeholder='作品の公式URL、アプリストアのURLなどを入力してください。' value={packages.url} onChange={handleChange} />
                            </div>
                            <div className='package-contents'>
                                <span className='package-free'>任意</span>GitHubのURL
                                <input id='github' className='form-control' type='text' placeholder='GithubのURLを入力してください。' value={packages.github} onChange={handleChange} />
                            </div>
                            <div className='package-contents'>
                                <span className='package-must'>必須</span>概要
                                <textarea id='content' className='form-control' type='text' placeholder='100字以内で入力しましょう。例）開発した作品を投稿すれば、企業が閲覧してくれるアプリケーション。など' value={packages.content} onChange={handleChange} aria-describedby='contentHelp' maxLength={100} />
                            </div>
                            <div className='package-contents mb-0'>
                                <span className='package-must'>必須</span>サムネイル画像<br />
                                <p>4枚まで登録可能。1枚目がメイン画像として採用されます。
                                </p>
                                <label className='me-2'>
                                    {
                                        previewImg.preview_1 ? (
                                            <img className='preview-thumbnail' src={previewImg.preview_1} />
                                        ) : (
                                            <img className='preview-thumbnail' src={Upload} />
                                        )
                                    }
                                    <input className='d-none' type='file' accept='image/*' onChange={handleFileChange} name='preview_1' />
                                </label>
                                <label className='me-2'>
                                    {
                                        previewImg.preview_2 ? (
                                            <img className='preview-thumbnail' src={previewImg.preview_2} />
                                        ) : (
                                            <img className='preview-thumbnail' src={Upload} />
                                        )
                                    }
                                    <input className='d-none' type='file' accept='image/*' onChange={handleFileChange} name='preview_2' />
                                </label>
                                <label className='me-2'>
                                    {
                                        previewImg.preview_3 ? (
                                            <img className='preview-thumbnail' src={previewImg.preview_3} />
                                        ) : (
                                            <img className='preview-thumbnail' src={Upload} />
                                        )
                                    }
                                    <input className='d-none' type='file' accept='image/*' onChange={handleFileChange} name='preview_3' />
                                </label>
                                <label className='me-2'>
                                    {
                                        previewImg.preview_4 ? (
                                            <img className='preview-thumbnail' src={previewImg.preview_4} />
                                        ) : (
                                            <img className='preview-thumbnail' src={Upload} />
                                        )
                                    }
                                    <input className='d-none' type='file' accept='image/*' onChange={handleFileChange} name='preview_4' />
                                </label>
                            </div>
                            <div className='package-contents'>
                                <span className='package-free'>任意</span>動画のURL
                                <p>YouTube、もしくはVimeoのURLを入力ください。</p>
                                <input id='movie' className='form-control' type='text' placeholder='例）https://www.youtube.com/watch?=***' value={packages.movie} onChange={handleChange} />
                            </div>
                            <div className='package-contents'>
                                <span className='package-free'>任意</span>システム構成
                                <p>どうやって作ったかを画像、Markdown記法やHTMLで解説ください。</p>
                                <input id='structure' className='form-control' type='text' placeholder='システム構成' value={packages.structure} onChange={handleChange} />
                            </div>
                            <div className='package-contents'>
                                <span className='package-must'>必須</span>利用している技術
                                <p>使用するAPI、ツール、デバイスなどを３文字以上入力し、候補から選択ください。</p>
                                <input id='material' className='form-control' type='text' placeholder='開発素材' value={packages.material} onChange={handleChange} />
                            </div>
                            <div className='package-contents'>
                                <span className='package-free'>任意</span><label className='form-label'>タグ</label>
                                <label className='form-label'>使用したプログラミング技術を表すタグ</label>
                                <TagsInput
                                    value={packages.tags}
                                    onChange={setTags}
                                    name='tags'
                                    placeHolder='タグの追加'
                                />
                            </div>
                            <div className='package-contents'>
                                <span className='package-free'>任意</span>開発ストーリー
                                <p>Markdown記法やHTMLで入力できます。 作品の特徴や技術的こだわりなど、作品について伝えたいことをご自由にお書きください。</p>
                                <input id='story' className='form-control' type='text' placeholder='例）' value={packages.story} onChange={handleChange} />
                            </div>
                            <div className='package-contents'>
                                <span className='package-free'>任意</span>関連リンク
                                <p>この作品に関係の深いページ（技術ブログ、イベントブログ、受賞記事、関連作品など）あれば入力ください。</p>
                                <input id='link_1' className='form-control' type='text' placeholder='例）https://www.〇〇〇.com/〇〇〇' onChange={handleLinkChange} />
                                <input id='link_2' className='form-control' type='text' placeholder='例）https://www.〇〇〇.com/〇〇〇' onChange={handleLinkChange} />
                                <input id='link_3' className='form-control' type='text' placeholder='例）https://www.〇〇〇.com/〇〇〇' onChange={handleLinkChange} />
                                <input id='link_4' className='form-control' type='text' placeholder='例）https://www.〇〇〇.com/〇〇〇' onChange={handleLinkChange} />
                                <input id='link_5' className='form-control' type='text' placeholder='例）https://www.〇〇〇.com/〇〇〇' onChange={handleLinkChange} />
                            </div>
                            <hr />
                            <div className='text-center'>
                                <a className='btn btn-secondary me-4' href='/package'>やめる</a>
                                <button className='btn btn-success'>登録する</button>
                            </div>
                        </form>
                    </div>
                </div>
            );
        default: return null;
    };
};

export default PackagePost;