/* ↓Firebase Imports ALL */
import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc, writeBatch, deleteDoc } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAuth, createUserWithEmailAndPassword, updateProfile, sendEmailVerification, signOut,
    onAuthStateChanged, signInWithEmailAndPassword, updateEmail, EmailAuthProvider, reauthenticateWithCredential,
    deleteUser, updatePassword, GoogleAuthProvider, signInWithPopup, GithubAuthProvider, linkWithPopup, unlink,
    sendPasswordResetEmail } from 'firebase/auth';

/* ↓Utils */
import { MySwal } from '../utils/Swal';

/* ↓Firebase Config */
const firebaseConfig = {
    apiKey: 'AIzaSyDWCkNzZ2f3AuOp4AqgxgiI8G1XtF6HIHo',
    authDomain: 'avenu-e.firebaseapp.com',
    projectId: 'avenu-e',
    storageBucket: 'avenu-e.appspot.com',
    messagingSenderId: '243220346607',
    appId: '1:243220346607:web:634461e975371e8b4c4d1a',
    measurementId: 'G-RR5TS96545',
};

/* ↓FirebaseConfig Initialization */
const app = initializeApp(firebaseConfig);
/* ↓Get Firestore App */
const db = getFirestore(app);
/* ↓Firebase Authentication */
const auth = getAuth(app);
/* ↓Firebase Storage */
const firestorage = getStorage(app);
/* ↓Google Provider */
const googleProvider = new GoogleAuthProvider();
/* ↓Github Provider */
const githubProvider = new GithubAuthProvider();

/* ↓メール/パスワード認証のサインアップの実装 */
const signupWithEmailAndPassword = async (name, email, password) => {
    try {
        const user = await createUserWithEmailAndPassword(auth, email, password);
        updateProfile(auth.currentUser, {displayName: name});
        await sendEmailVerification(auth.currentUser);
        return user;
    } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        MySwal.fire({
            title: 'エラー aE-0304',
            html : '正規のメールアドレスではない、もしくはパスワードが間違っています。',
            icon : 'error',
            allowOutsideClick : false,
            allowEscapeKey : false
        });
        console.log(errorCode, errorMessage);
    };
};

/* ↓メール/パスワード認証のサインインの実装 */
const signinWithEmailAndPassword = async (email, password) => {
    try {
        const user = await signInWithEmailAndPassword(auth, email, password);
        MySwal.fire({
            title: 'ログイン完了。',
            html: `おかえりなさい、'${user.user.displayName}' さん！`,
            icon: 'success',
            allowOutsideClick : false,
            allowEscapeKey : false
        }).then(function() {
            window.location = '/';
        });
        return user;
    } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        MySwal.fire({
            title: 'エラー aE-0305',
            html : 'メールアドレス、またはパスワードが違います。',
            icon : 'error',
            allowOutsideClick : false,
            allowEscapeKey : false
        })
        console.log(errorCode, errorMessage);
    };
};

/* Googleログイン実装 */
const signInWithSns = async (provider) => {
    if (provider === 'google.com') {
        var providerId = googleProvider;
    } else if (provider === 'github.com') {
        var providerId = githubProvider;
    }
    await signInWithPopup(auth, providerId)
    .then(() => {
        MySwal.fire({
            title: 'ログイン完了。',
            html: `おかえりなさい、'${auth.currentUser.displayName}' さん！`,
            icon: 'success',
            allowOutsideClick : false,
            allowEscapeKey : false
        }).then(function() {
            window.location = '/';
        });
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.log(errorCode, errorMessage, email, credential);
    });
};

/* SNS連携実装 */
const linkWithSNS = async (provider) => {
    if (provider === 'google.com') {
        var providerId = googleProvider;
    } else if (provider === 'github.com') {
        var providerId = githubProvider;
    }
    linkWithPopup(auth.currentUser, providerId).then(async() => {
        /* ↓完了メッセージ */
        await MySwal.fire({
            title: '連係完了',
            html : `アカウントと${provider}が紐付けされました。`,
            icon : 'success',
            allowOutsideClick : false,
            allowEscapeKey : false
        }).then(() => {
            window.location.reload();
        });
    }).catch((error) => {
        console.error(error);
    });
};

/* SNS連携解除実装 */
const unlinkSNS = async (providerId) => {
    console.log(providerId)
    unlink(auth.currentUser, providerId).then(async() => {
        /* ↓完了メッセージ */
        await MySwal.fire({
            title: '連係解除完了',
            html : `${providerId}との連携が解除されました。`,
            icon : 'success',
            allowOutsideClick : false,
            allowEscapeKey : false
        }).then(() => {
            window.location.reload();
        });
    }).catch((error) => {
        console.error(error);
    });
};

/* ↓認証メールの再送信の実装 */
const resendEmailVerification = async () => {
    try {
        await sendEmailVerification(auth.currentUser);
        MySwal.fire({
            title: '送信完了。',
            html: '登録したメールアドレスに認証メールが送信されました。',
            icon: 'success',
            allowOutsideClick : false,
            allowEscapeKey : false
        })
    } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        MySwal.fire({
            title: 'エラー aE-0306',
            html : 'メールの送信が失敗しました。',
            icon : 'error',
            allowOutsideClick : false,
            allowEscapeKey : false
        })
        console.log(errorCode, errorMessage);
    };
};

/* ↓パスワードをリセットするメール送信の実装 */
const sendUserPasswordResetEmail = async (email) => {
    sendPasswordResetEmail(auth, email)
    .then(() => {
        MySwal.fire({
            title: '送信完了。',
            html: '入力したメールアドレスにメールが送信されました。',
            icon: 'success',
            allowOutsideClick : false,
            allowEscapeKey : false
        }).then(() => {
            window.location = '/';
        });
    })
    .catch((error) => {
        console.error(error);
    });
};


/* ↓メールアドレスの更新の実装 */
const updateUserEmail = async (newEmail, userProvidedPassword, id) => {
    try {
        /* ↓ログイン中のアカウントの再認証 */
        const credential = EmailAuthProvider.credential(auth.currentUser.email, userProvidedPassword);
        await reauthenticateWithCredential(auth.currentUser, credential).then(async () => {
            /* ↓Authentication上のメールアドレスの更新 */
            await updateEmail(auth.currentUser, newEmail);
            /* ↓データベース上のメールアドレスの更新 */
            const batch = writeBatch(db);
            const userRef = doc(db, 'users', id);
            batch.update(userRef, {'email': newEmail});
            await batch.commit();
            /* ↓更新完了メッセージ */
            await MySwal.fire({
                title: '更新完了。',
                html : 'メールアドレスが新しくなりました。',
                icon : 'success',
                allowOutsideClick : false,
                allowEscapeKey : false
            }).then(() => {
                window.location = '/';
            });
        })
    } catch (error) {
        await MySwal.fire({
            title: 'エラー aE-0403',
            html : 'アカウントの接続にエラーが発生しました。',
            icon : 'error',
            allowOutsideClick : false,
            allowEscapeKey : false
        })
    };
};

/* ↓パスワードの更新の実装 */
const updateUserPassword = async (newPassword, userProvidedPassword, id) => {
    try {
        /* ↓ログイン中のアカウントの再認証 */
        const credential = EmailAuthProvider.credential(auth.currentUser.email, userProvidedPassword);
        await reauthenticateWithCredential(auth.currentUser, credential).then(async () => {
            /* ↓Authentication上のパスワードの更新 */
            await updatePassword(auth.currentUser, newPassword);
            /* ↓データベース上のパスワードの更新 */
            const batch = writeBatch(db);
            const userRef = doc(db, 'users', id);
            batch.update(userRef, {'password': newPassword});
            await batch.commit();
            /* ↓更新完了メッセージ */
            await MySwal.fire({
                title: '更新完了。',
                html : 'パスワードが新しくなりました。',
                icon : 'success',
                allowOutsideClick : false,
                allowEscapeKey : false
            }).then(function() {
                window.location = '/';
            });
        })
    } catch (error) {
        await MySwal.fire({
            title: 'エラー aE-0403',
            html : 'アカウントの接続にエラーが発生しました。',
            icon : 'error',
            allowOutsideClick : false,
            allowEscapeKey : false
        })
    };
};

/* ↓ログアウトの実装 */
const logout = async () => {
    MySwal.fire({
        title: 'ログアウトの実行。',
        html : '再度ログインしていただく必要がございます。',
        icon : 'warning',
        showCancelButton: true,
        confirmButtonText: '続ける',
        cancelButtonText: 'やめる',
        allowOutsideClick : false,
        allowEscapeKey : false
    }).then((result) => {
        if (result.value) {
            signOut(auth);
            MySwal.fire(
                'ログアウト完了。',
                'トップページに遷移します。',
                'success'
            ).then(function() {
                window.location = '/';
            });
        };
    });
};

/* ↓アカウント削除の実装 */
const withdrawal = async (userData) => {
    MySwal.fire({
        title: 'Avenu-Eから退会する',
        html : `<input type='text' id='uid' class='swal2-input' placeholder='UID（ユーザー識別子）' autocomplete='off'>
        <input type='text' id='password' class='swal2-input' placeholder='パスワード' autocomplete='off'>`,
        icon : 'warning',
        showCancelButton: true,
        confirmButtonText: '続ける',
        cancelButtonText: 'やめる',
        allowOutsideClick : false,
        allowEscapeKey : false,
        focusConfirm: false,
        preConfirm: () => {
            const uid = MySwal.getPopup().querySelector('#uid').value;
            const password = MySwal.getPopup().querySelector('#password').value;
            if (!uid || !password) {
                MySwal.showValidationMessage(`UIDとパスワードを入力してください`);
            } else if (uid !== auth.currentUser.uid || password !== userData.password) {
                MySwal.showValidationMessage(`UIDもしくはパスワードが間違っています`);
            } else {
                return { uid: uid, password: password };
            }
        }
    }).then(async (result) => {
        if (result.value) {
            // 処理中ダイアログ
            MySwal.fire({
                title: '処理中',
                html: '処理終了まで画面はそのままにしてください。',
                allowOutsideClick : false,
                showConfirmButton: false,
                timer: 1000,
            }).then(async () => {
                /* ↓ログイン中のアカウントの再認証 */
                const credential = EmailAuthProvider.credential(auth.currentUser.email, result.value.password);
                await reauthenticateWithCredential(auth.currentUser, credential).then(async () => {
                    await deleteDoc(doc(db, 'users', userData.id));
                    await deleteUser(auth.currentUser);
                    MySwal.fire({
                        title: 'Avenu-Eから退会しました',
                        html: 'また機会があればご利用ください。',
                        icon: 'success'
                    }).then(() => {
                        window.location = '/';
                    });
                });
            })
        };
    });
};

export { db, auth, firestorage, signupWithEmailAndPassword, onAuthStateChanged,
        logout, signinWithEmailAndPassword, resendEmailVerification, updateUserEmail,
        updateProfile, updateUserPassword, withdrawal, signInWithSns, linkWithSNS, unlinkSNS,
        sendUserPasswordResetEmail };