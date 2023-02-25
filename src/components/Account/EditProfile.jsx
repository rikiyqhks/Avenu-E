/* ↓React Imports ALL */
import React, { useEffect, useState } from 'react';
import { TagsInput } from 'react-tag-input-component';

/* ↓Firebase Imports ALL */
import { collection, doc, onSnapshot, updateDoc, writeBatch } from 'firebase/firestore';
import { auth, db, firestorage, updateProfile } from '../../firebase/database';
import { getDownloadURL, ref, uploadBytes, deleteObject } from 'firebase/storage';

/* ↓Utils */
import { MySwal } from '../../utils/Swal';

import './Account.css'

const EditProfile = (props) => {

    /* ↓データベースからデータを取得 */
    const usersData = collection(db, 'users');

    /* ↓選択した質問データを状態変数に保管 */
    const [userData, setUserData] = useState(Object());

    /* ↓state変数「languagesList」を定義 */
    const [languagesList, setLanguages] = useState(Array());

    /* ↓state変数「loading」を定義 */
    const [loading, setLoading] = useState(Boolean(true));

    /* ↓state変数「image」を定義 */
    const [image, setImage] = useState(null);

    /* ↓state変数「values」を定義 */
    const [values, setValues] = useState({
        displayName: String(),
        introduce: String(),
        twitter: String(),
        github: String(),
    });

    /* ↓state変数「skill」を定義 */
    const [skill, setSkill] = useState(Array());

    /* ↓変更後のプロフィール画像のプレビュー */
    const [previewImg, setPreviewImg] = useState(String());
    const languagesData = collection(db, 'languages');

    /* ↓内部関数のローディングが完了したときに発火する */
    useEffect(() => {
        /* ↓ユーザーが存在しなかった場合、ログインページに遷移させる */
        if (!props.user) {
            window.location = '/login';
        } else if (!props.user.emailVerified) {
            /* ↓メール未認証の場合エラーを返す */
            noVerifiedAccount();
        } else {
            /* ↓リアルタイムにデータベースからデータを取得 */
            onSnapshot(usersData, (users) => {
                users.docs.map((doc) => {
                    if(doc.data().email === props.user.email) setUserData(doc.data());
                });
            }),
            /* ↓リアルタイムにデータベースからデータを取得 */
            onSnapshot(languagesData, (language) => {
                setLanguages(language.docs.map((doc) => ({ ...doc.data().name })));
            })
            /* ↓ページローディングを開始する */
            setLoading(false);
        };
    }, [props]);

    useEffect(() => {
        setValues({
            'displayName': userData.displayName,
            'introduce': userData.introduce,
            'twitter': String(userData.twitter).replace('https://twitter.com/', ''),
            'github': String(userData.github).replace('https://github.com/', ''),
        });
        userData.skill && (
            setSkill(userData.skill.map((skill) => (skill)))
        );
    }, [userData]);

    /* ↓関数「handleSubmit」を定義 */
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (values.introduce.length <= 50) {
            try {
                if (image) {
                    /* ↓Firebase Storageの更新 */
                    const imageRef = ref(firestorage, image.icon.name);
                    uploadBytes(imageRef, image.icon).then(() => {
                        const gsReference = ref(firestorage, `gs://avenu-e.appspot.com/${image.icon.name}`);
                        getDownloadURL(gsReference)
                        .then(async (url) => {
                            /* ↓データベースからデータを取得 */
                            const scrapsData = collection(db, 'scraps');
                            /* ↓リアルタイムにデータベースからデータを取得 */
                            onSnapshot(scrapsData, (scrap) => {
                                scrap.docs.map(async (doc) => {
                                    if (doc.data().uid === props.user.uid) {
                                        const scrapRef = collection(db, 'scraps', doc.id);
                                        await updateDoc(scrapRef, {userIcon: url, userName: props.user.displayName});
                                    };
                                });
                            });
                            updateProfile(auth.currentUser, {photoURL: url, displayName: values.displayName});
                            /* ↓データベース上の更新 */
                            // await deleteObject(ref(firestorage, userData.icon));
                            const batch = writeBatch(db);
                            const userRef = doc(db, 'users', userData.id);
                            batch.update(userRef, {'icon': url, 'displayName': values.displayName, 'skill': skill, 'introduce': values.introduce,
                            'twitter': 'https://twitter.com/' + values.twitter, 'github': 'https://github.com/' + values.github});
                            await batch.commit();
                            /* ↓更新完了メッセージ */
                            await MySwal.fire({
                                title: '更新完了',
                                html : 'プロフィールが新しくなりました。',
                                icon : 'success',
                                allowOutsideClick : false,
                                allowEscapeKey : false,
                            }).then(() => {
                                window.location = `/profile?user=${props.user.displayName}`;
                            });
                        })
                        .catch((err) => {
                            console.log(err);
                        });
                    });
                } else {
                    updateProfile(auth.currentUser, {displayName: values.displayName});
                    /* ↓データベースからデータを取得 */
                    const scrapsData = collection(db, 'scraps');
                    /* ↓リアルタイムにデータベースからデータを取得 */
                    onSnapshot(scrapsData, (scrap) => {
                        scrap.docs.map(async (docs) => {
                            if (docs.data().uid === props.user.uid) {
                                const scrapRef = doc(db, 'scraps', docs.id);
                                await updateDoc(scrapRef, {userName: values.displayName});
                            };
                        });
                    });
                    /* ↓データベース上の更新 */
                    const batch = writeBatch(db);
                    const userRef = doc(db, 'users', userData.id);
                    batch.update(userRef, {'displayName': values.displayName, 'skill': skill, 'introduce': values.introduce,
                    'twitter': values.twitter.trim() && ('https://twitter.com/' + values.twitter), 'github': values.github.trim() && ('https://github.com/' + values.github)});
                    await batch.commit();
                    /* ↓更新完了メッセージ */
                    await MySwal.fire({
                        title: '更新完了。',
                        html : 'プロフィールが新しくなりました。',
                        icon : 'success',
                        allowOutsideClick : false,
                        allowEscapeKey : false
                    }).then(() => {
                        window.location = `/profile?user=${props.user.displayName}`;
                    });
                }
            } catch(error) {
                /* ↓失敗メッセージ */
                await MySwal.fire({
                    title: error,
                    html : 'アカウント変更が正常に実行されませんでした。',
                    icon : 'error',
                    allowOutsideClick : false,
                    allowEscapeKey : false,
                });
            }    
        } else {
            MySwal.fire({
                title: '',
                html : '自己紹介は50文字以内でご記入ください。',
                icon : 'error',
                allowOutsideClick : false,
                allowEscapeKey : false,
            });
        };
    };

    /* ↓アイコンのイメージファイルが選択されたときに状態変数に格納 */
    const handleFileChange = (e) => {
        setImage({icon: e.target.files[0]});
        const reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = () => {
            setPreviewImg(reader.result);
        };
    };

    const handleInputChange = (e) => {
        const target = e.target;
        const value = target.value;
        const name = target.name;
        setValues({ ...values, [name]: value });
    };

    switch (loading) {
        case false:
        return (
            <form className='container my-5' onSubmit={handleSubmit}>
                <div className='editProfile-wrapper'>
                    <div className='text-center'>
                        <label className='edit-masterUserIcon-wrapper'>
                            <i className='fa-solid fa-camera fa-3x' />
                            <img className='masterUserIcon' src={previewImg ? previewImg : userData.icon} />
                            <input className='d-none' type='file' accept='image/*' onChange={handleFileChange} />
                        </label>
                    </div>
                    <div className='w-50 m-auto'>
                        <div className='mb-2'>
                            <label className='form-label'>名前</label>
                            <input className='form-control' type='text' name='displayName' value={values.displayName} onChange={handleInputChange} placeholder='ユーザー名' />
                        </div>
                        <div className='mb-2'>
                            <label className='form-label'>スキル</label>
                            <TagsInput
                                classNames='tag-form'
                                value={skill}
                                onChange={setSkill}
                                name='skills'
                                placeHolder='タグの追加'
                            />
                        </div>
                        <div className='mb-2 sns-wrapper'>
                            <label className='form-label'>SNS</label>
                            <div className='input-group mb-2'>
                                <i className='fa-brands fa-twitter fa-2x me-2 icon' />
                                <span className='input-group-text'>https://twitter.com/</span>
                                <input className='form-control' type='text' name='twitter' value={values.twitter} onChange={handleInputChange} placeholder='Twitter ユーザー名' />
                            </div>
                            <div className='input-group mb-2'>
                                <i className='fa-brands fa-github-alt fa-2x me-2 icon' />
                                <span className='input-group-text'>https://github.com/</span>
                                <input className='form-control' type='text' name='github' value={values.github} onChange={handleInputChange} placeholder='GitHub ユーザー名' />
                            </div>
                        </div>
                        <div className='mb-2'>
                            <label className='form-label'>自己紹介</label>
                            <textarea className='form-control' name='introduce' value={values.introduce} onChange={handleInputChange} maxLength={50} placeholder='自己紹介内容 ( 50文字以内 )' />
                        </div>
                        
                    </div>
                    <div className='text-center mt-4'>
                        <a className='btn btn-secondary me-4' href={'/profile?user=' + props.user.displayName}>やめる</a>
                        <button className='btn btn-success ms-4'>保存する</button>
                    </div>
                </div>
            </form>
        );
        default: return null;
    };
};

export default EditProfile;