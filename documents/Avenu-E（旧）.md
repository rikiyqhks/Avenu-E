# **Avenu-E 開発設計書**

## 簡易概要

    開発環境は
    Node.js 16.16.0
    Npm 8.5.2
    React 18.2.0
    Vite 3.0.7

    データベースとしてFirebaseのFirestoreを使用する

    データの連携方法として、Reduxを経由してステイトをストアに保存しデータベースに保存する

    決済システムの導入(FirebaseとStripeを連携、後々導入の検討をする)

    このサービスにおいてのアカウントはFirebase Authenticationを使用する

---

## ルール

    ワークをなるべく分担する

    Javascript全般でフロントとバックを管理できるようにする

    インターネットに公開時、HTTPセキュリティレスポンスヘッダを必ず記述する

    ドメインの確保

---

## リファレンス

[Figma HTML 設計図](https://www.figma.com/file/2qAaXXrWDQc8FbIfBxuL3e/Avenu-E?node-id=0%3A1)

[Stripe 決済サービス](https://stripe.com/jp)

[Firebase Google データ管理サービス](https://firebase.google.com/)

[BootStrap CSS フレームワークドキュメント](https://getbootstrap.jp/)

[Font Awesome ドキュメント](https://fontawesome.com/)

[Qiita 参考](https://qiita.com/)

[Menta 参考](https://menta.work/)

[Js URL パラメータの操作方法](https://skill-upupup-future.com/?p=1516)

[Firestore 並び替え](https://zenn.dev/tentel/articles/ea7d5c03e68e6d142d98)

[SweetAlert2 ポップアップライブラリ](https://keizokuma.com/sweetalert-keys-main/#i)

[Redux 値を別コンポーネントに送る](https://qiita.com/oda3104/items/de5489cd97ba674cbee5)

[Geolocation API](https://github.com/IPGeolocation/ip-geolocation-api-javascript-sdk)

[全文検索](https://qiita.com/oukayuka/items/d3cee72501a55e8be44a)

[cookie](https://tcd-theme.com/2021/11/javascript-cookie.html)

[Firebase Hosting](https://www.naka-sys.okinawa/vite-react-firebase-hosting/#st-toc-h-1)(https://qiita.com/_pipo_/items/2beb71eb3407775a1bf2)

[Authentication](https://ralacode.com/blog/post/react-firebase-authentication/)

---

## 構成

- アカウントを登録してログインしている間に以下のサービスが利用できる

  - Scrap (一般ユーザが躓いたことを質問できる場) [無料サービス]

    - 質問に回答、その質問にベストアンサーを付与できる。

  - Package (ポートフォリオを投稿できる場) [無料サービス]

- アカウントを登録しなくても利用できるサービス

  - Scrap を閲覧し、他者の回答を参考にできる

---

## Redux

![Reduxの説明画像](./src/images/references/redux_props_event.png)

---

## コンポーネント

- Basement

  - Home.jsx _(サービスのトップページとなる HTML)_
  - Community.jsx _(コミュニティサービスのページ)_
  - Questions.jsx _(質問をしたり回答したりできるページ)_
  - Corporates.jsx _(企業の一覧を閲覧できるページ)_
  - Services.jsx _(コースを開講、受講できるページ)_
  - Term.jsx _(利用規約を記載するページ)_
  - Privacypolicy.jsx _(プライバシーポリシーを記載するページ)_
  - Register.jsx _(アカウントを登録する為のページ)_
  - Login.jsx _(存在するアカウントへ接続する為のページ)_
  - Profile.jsx _(自分のプロフィールを閲覧、編集できるページ)_
  - Admin.jsx _(お問い合わせ内容一覧マネージメントシステムページへアクセスする為の中継)_

- Layouts

  - Header.jsx _(共通ヘッダーレイアウト)_
  - Subheader.jsx _(共通サブヘッダーのレイアウト)_
  - Footer.jsx _(共通フッターレイアウト)_
  - PostQ.jsx _(質問の投稿レイアウト)_
  - PostA.jsx _(記事の投稿レイアウト)_
  - SearchBar.jsx _(検索バーのレイアウト)_
  - ToTop.jsx _(ページのトップへ戻るボタンのレイアウト)_

- Inquiry

  - Inquiry.jsx _(お問い合わせページ)_
  - InquiryThanks.jsx _(お問い合わせ内容送信完了ページ)_
  - InquiryConfirm.jsx _(お問い合わせ内容確認ページ)_
  - InquiryManagementForm.jsx _(お問い合わせ内容一覧マネージメントシステムページ)_

- DOM
  - RandomURL.jsx _(お問い合わせ内容マネージメントシステムページに使用するランダム URL が生成できるクラス)_
  - ScrollToTop.jsx _(画面遷移時に自動的にページのトップへ移動できる関数)_

<!--

PostQ.jsxとPostA.jsxはそれぞれの親コンポーネントと
統合してレイアウトとしては廃止するかもしれない。

 -->

---

## コーディング規約

    変数名、クラス名 -> LCC, アンダースコア型

    ファイル名 -> UCC

    CSS -> PureCSS

    スペース、インデント等は十分に入れる

    セミコロンは必須

    カラーコード: #80CBC4 #303F9F

---

## URL ルーティング

    * <Home /> :/
        -> トップページ

    * <Community /> :/Community
        -> コミュニティページ

    * <Questions /> :/Questions
        -> 質問ページ

    * <Corporates /> :/Corporates
        -> 企業一覧ページ

    * <Services /> :/Services
        -> サービス一覧閲覧ページ

    * <Inquary /> :/Inquary
        -> お問い合わせページ

    * <InquaryConfirm /> :/Inquary/Confirm
        -> お問い合わせ内容確認ページ

    * <InquaryThanks /> :/Inquary/Thanks
        -> お問い合わせ内容送信完了ページ

    * <InquaryManagementForm /> :/{AdminUrlPath}?id=xxx
        -> お問い合わせ内容一覧マネージメントシステムページ

    * <Term /> :/Term
        -> 利用規約ページ

    * <PrivacyPolicy /> :/Privacypolicy
        -> プライバシーポリシーページ

    * <Register /> :/Register
        -> 新規会員登録ページ

    * <Login /> :/Login
        -> アカウント接続ページ

    * <Profile /> :/Profile
        -> マイプロフィールページ

    * <Admin /> :/Admin
        -> お問い合わせ内容一覧マネージメントシステムページの中継ページ

---

## バックエンド概要

- ## index.js
  - dispatch を行う為の props の作成、実行

#

- ## firebase.js
  - Firebase のデータベースの読み込み
    - Firestore のデータを init(初期化)して各ファイルにエクスポートする

#

- ## Router.js
  - 表示するページが多数ある為、ルーティング機能を所有してるライブラリ「React-Router-DOM」をインポートしてルーティングを管理する

#

- ## features/action.js
  - ポスト(投稿)のステイトの変化(ADD, UPDATE, DELETE)が行われた際、ストアに変化したことを伝えるアクションをデータとして受け取り一時保存する
  - 取得したデータを Dispatch する為にエクスポートする

#

- ## features/store.js
  - データを巡回保存させるための仮想データベースを作成する
    - 作成されたストアに情報が送られてくる Reducer から受け取れる(エンハンスできる)ようにミドルウェアの「Redux-thunk」を利用する
    - アプリとデータベースを仲介する為のリアルタイムデータ維持
  - ストアはあくまで仮想であり、データを取り出す場合は Firestore と連携して直接 Firestore から取得する必要がある

#

- ## features/Reducers/communityReducer.js
- ## features/Reducers/inquiryReducer.js
- ## features/Reducers/questionReducer.js
- ## features/Reducers/serviceReducer.js
- ## features/Reducers/serverlogReducer.js
  - ポスト(投稿)処理が無事に Dispatch されたら、情報を取得してストアに送り返す
    - 例外処理は必ず記述する

#

- ## features/Reducers/reducer.js
  - Firestore と連携する為の Reducer
    - Reducer からストアに更新された情報を送る際に、Firestore のデータベースにも情報の更新をかける必要がある

---

## お問い合わせ内容一覧マネージメントシステムページ

    UID -> r00teqwerty
    Password -> ROOTEQWERTY

---

## ERROR CODE

    * aE-0101
        -> Admin.jsxのログイン失敗エラー

    * aE-0201
        -> Inquiry.jsxの入力不備エラー

    * aE-0202
        -> Inquiry.jsxのメールアドレス書式エラー

    * aE-0203
        -> Inquiry.jsxの電話番号書式エラー

    * aE-0301
        -> EmailAuth.jsxの名前エラー

    * aE-0302
        -> EmailAuth.jsxのパスワードエラー

    * aE-0303
        -> EmailAuth.jsxのチェックボックスエラー

    * aE-0304
        -> EmailAuth.jsxのメールアドレスorパスワードエラー

    * aE-0305
        -> EmailAuth.jsxのメールアドレスエラー

    * aE-0306
        -> EmailAuth.jsxの認証メールエラー

    * aE-0307
        -> EmailAuth.jsxの未認証エラー

---

## Avenu-E アカウント

    ### Google Workspace e-mail

    * dev@avenu-e.com
        -> Github
            pas -> Avenu-E_Pa$$w0rdde#GithuB

    * contact@avenu-e.jp
        -> お問い合わせ用
            pas -> Avenu-E_Pa$$w0rdco#ContacT

---
