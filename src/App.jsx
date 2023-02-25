/* ↓React Imports ALL */
import React, { useEffect, useState } from 'react';
import { Routers } from './Routers';
import nprogress from 'nprogress';
import 'nprogress/nprogress.css';

/* ↓Css */
import './App.css';

/* ↓Firebase Imports ALL */
import { onAuthStateChanged, auth, db } from './firebase/database';
import { doc, collection, onSnapshot, writeBatch } from 'firebase/firestore';

export default function App() {
    /* ↓state変数「user」を定義 */
    const [user, setUser] = useState(String());
    /* ↓state変数「emailVerified」を定義 */
    const [emailVerified, setEmailVerified] = useState(Boolean(false));
    /* ↓state変数「loading」を定義 */
    const [loading, setLoading] = useState(Boolean(true));

    nprogress.configure({ showSpinner: false, speed: 800, minimum: 1 });

    /* ↓ログインしているかどうかを判定する */
    useEffect(() => {
        nprogress.start();
        onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            currentUser && setEmailVerified(currentUser.emailVerified);
            setLoading(false);
        });
        return () => {
            nprogress.done();
        };
    }, []);

    /* ↓ユーザーのメアド認証が完了しているかつ、Firestoreのuidがnullのときにuidを入れる */
    useEffect(() => {
        if (user) {
            const usersData = collection(db, 'users');
            onSnapshot(usersData, (users) => {
                users.docs.map(async (docs) => {
                    if (docs.data().email === user.email && docs.data().uid === '' && emailVerified) {
                        /* ↓データベース上の更新 */
                        const batch = writeBatch(db);
                        const userRef = doc(db, 'users', docs.id);
                        batch.update(userRef, {'uid': user.uid});
                        await batch.commit();
                    };
                });
            });
        };
    }, [loading]);

    return (
        !loading && (
            <div>
                <Routers user={user} />
            </div>
        )
    );
};