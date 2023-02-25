/* ↓Images */
import CompanyTop from '../images/toppage/company.svg';
import CompanyPCLogo from '../images/toppage/pc.png';
import Point01 from '../images/toppage/point01.png';
import CompanyApproach from '../images/toppage/company-approach.svg';
import Point02 from '../images/toppage/point02.png';
import CompanyCost from '../images/toppage/company-cost.svg';
import Point03 from '../images/toppage/point03.png';
import CompanySupport from '../images/toppage/company-support.svg';
import Step01 from '../images/toppage/step01.png';
import Step02 from '../images/toppage/step02.png';
import Step03 from '../images/toppage/step03.png';

const Company = () => {
    return (
            <div className='company-main'>
                <div>
                    {/* ■■ トップ部分 ■■　*/}
                    <div className='company-main-wrapper'>
                        <div className='company-main-contents'>
                            <div className='top-main-title'>
                                <h4 className='speech-bubble'>人材不足に悩むIT企業のために</h4>
                                <h1 className='top-title'>採用決定までのコスト</h1>
                                <h2 className='top-sub-title'>ITエンジニア採用プラットフォーム</h2>
                            </div>
                        <div className='top-main-title'>
                            <h1 className='top-number'>0<span>円</span></h1>
                        </div>
                        <div className='company-btn-wrapper'>
                            <a href='#company-inquiry' className='btn company-btn'>お問い合わせはこちら</a>
                        </div>
                    </div>
                    <div className='company-main-contents'>
                        <img src={ CompanyTop } alt='お問い合わせボタン' className='top-main-logo' />
                    </div>
                </div>


                {/* ■■ サービス概要 ■■　*/}
                <div className='company-summary-wrapper'>
                    <div className='heading'>
                        <h2>サービス<span>概要</span></h2>
                    </div>
                    <div className='company-summary-frame'>
                        <div className='company-summary-contents'>
                            <h3 className='company-summary-subTitle'>ITエンジニアと企業を繋ぐ<br></br>ポートフォリオ共有型採用プラットフォーム<br></br></h3>
                            <h2 className='company-summary-title'>「 Avenu-E 」</h2>
                        </div>
                        <div className='company-summary-explanation'>
                            <p>
                                Avenu-Eは、スキルをもったITエンジニアやエンジニア志望の人材が集う<br></br>
                                就職・転職サイトです。Avenu-Eでは、'ポートフォリオ（制作物のまとめ<br></br>
                                ）'を強みとしたサービスになっており、ポートフォリオを通して、開発実<br></br>
                                績や開発経験などのスキルの可視化'を行い、他の求人サイトではない自社<br></br>
                                にマッチした人材を探し出すことのできるサービスとなっています。
                            </p>
                        </div>
                    </div>
                    <div className='company-summary-frame'>
                        <div className='company-summary-contents'>
                            <img src={ CompanyPCLogo } alt='Avenu-E_PCロゴ' className='company-PC-logo' />
                        </div>
                    </div>
                </div>
                
                {/* ■■ サービスの強み ■■　*/}
                <div className='company-charm-wrapper'>
                    <div className='heading'>
                        <h2>ポートフォリオ共有型プラットフォーム<br></br><span>Avenu-E</span>　の魅力</h2>
                    </div>
                    {/* ポイント01 */}
                    <div>
                        <div className='company-charm-point01'>
                            <img src={ Point01 } alt='POINT01' className='company-charm-img' />
                            <h2 className='company-charm-title'>必要なスキルをもった人材に<br></br>ピンポイントでアプローチできる</h2>
                            <p>
                                'ポートフォリオ一覧'や'記事の投稿'などから、ユーザーの開発実<br></br>
                                績や開発経験を可視化できるため、自社に今必要なスキルをもった<br></br>
                                人材を探すことができます。
                            </p>
                        </div>
                        <div className='company-charm-point01-img'>
                            <img src={ CompanyApproach } alt='チャーム画像01' className='company-charm-main-img01' />
                        </div>
                    </div>

                    {/* ポイント02 */}
                    <div>
                        <div className='company-charm-point02-img'>
                            <img src={ CompanyCost } alt='チャーム画像02' className='company-charm-main-img02' />
                        </div>
                        <div className='company-charm-point02'>
                            <img src={ Point02 } alt='POINT02' className='company-charm-img' />
                            <h2 className='company-charm-title'>初期費用からスカウトまで<br></br>Avenu-Eの機能は全て無料</h2>
                            <p>
                                「初期費用」「求人掲載」「スカウト」「会社紹介」などの<br></br>
                                機能を利用するためのコストは一切かかりません。
                            </p>
                        </div>
                    </div>

                    {/* ポイント03 */}
                    <div>
                        <div className='company-charm-point03'>
                            <img src={ Point03 } alt='POINT03' className='company-charm-img' />
                            <h2 className='company-charm-title'>募集要件にマッチした人材を<br></br>推薦マッチできるサポートつき</h2>
                            <p>
                                Avenu-Eの初期段階では、企業様の要件にマッチした就職（転職）<br></br>
                                希望者との直接的な推薦を行っていきます。
                            </p>
                        </div>
                        <div className='company-charm-point03-img'>
                            <img src={ CompanySupport } alt='チャーム画像03' className='company-charm-main-img03' />
                        </div>
                    </div>
                </div>

                {/* 今後の展開 */}
                <div className='company-deployment-wrapper'>
                    <div className='heading'>
                        <h2>今後の<span>展開</span></h2>
                    </div>
                    <div className='company-deployment-frame'>
                        <div className='deployment-first'>
                            <div className='deployment-subtitle'>
                                <h3>Mission</h3>
                            </div>
                            <div className='deployment-title'>
                                <h2>'自信'と'誇り'を届ける会社を創る。</h2>
                            </div>
                            <div className='deployment-subtitle'>
                                <h3>Vision</h3>
                            </div>
                            <div className='deployment-title'>
                                <h2>
                                    ミライを創造する人の支えとなり、共に<br></br>
                                    新たな社会を実現する。
                                </h2>
                            </div>
                        </div>
                        <div className='deployment-second'>
                            <div className='deployment-contents'>
                                <p>
                                    Avenu-Eの目的は、「自分が活躍できる企業を探すエンジニア」と「自社の力になるエンジニアを探す企業」の架け橋になるサービスを作りたい！という想いから制作しました。<br></br>
                                    <br></br>
                                    近年、IT業界で問題視されている未来のITエンジニア不足や採用問題などで苦しむ企業様の悩みを、Avenu-Eを通して全力で解決したいと考えております。<br></br>
                                    <br></br>
                                    その為、今後とも実証実験を繰り返し行っていき、制作展を通して繋がりをもった企業様と一緒に価値のあるサービスにしていきたいと考えております。<br></br>
                                    <br></br>
                                    ご面倒ではございますが、Avenu-Eにご登録して頂けると幸いです。
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* お問い合わせ */}
                <div className='company-contact-wrapper' id='company-inquiry'>
                    <div className='heading'>
                        <h2><span>お問い合わせ</span></h2>
                    </div>
                    <div className='company-contact-frame'>
                        <div className='contact-first'>
                            <p>
                                右のフォームより必須事項、お問い合わせ内容をご入力ください。<br></br>
                            </p>
                            <div className='company-contact-step'>
                                <img src={ Step01 } alt='STEP01' className='company-contact-img' />
                                <h2 className='company-contact-title'>まずは、お問い合わせフォームに必要事項を入力</h2>
                            </div>
                            <div className='triangle-bottom'></div>
                            <div className='company-contact-step'>
                                <img src={ Step02 } alt='STEP02' className='company-contact-img' />
                                <h2 className='company-contact-title'>お問い合わせ完了後、1営業日以内に弊社の担当<br></br>者よりご連絡させていただきます</h2>
                            </div>
                            <div className='triangle-bottom'></div>
                            <div className='company-contact-step'>
                                <img src={ Step03 } alt='STEP03' className='company-contact-img' />
                                <h2 className='company-contact-title'>導入開始後、最短1営業日で求人掲載が可能とな<br></br>ります</h2>
                            </div>
                        </div>
                        <div className='contact-second'>
                            <dl>
                                <p>※ベータテスト版なので、事前登録になります。</p>
                                <dt>
                                    <span>必須</span>
                                    会社名
                                </dt>
                                <dd>
                                    <input type='organization' name='company' placeholder='例）株式会社Avenu-E' className='organization' />
                                </dd>
                                <dt>
                                    <span>必須</span>
                                    担当者名
                                </dt>
                                <dd>
                                    <input type='name' name='person-name' placeholder='例）草薙秀一' className='name' />
                                </dd>
                                <dt>
                                    <span>必須</span>
                                    携帯番号
                                </dt>
                                <dd>
                                    <input type='tel' name='phone-number' placeholder='例）03-1234-5678' className='tel' />
                                </dd>
                                <dt>
                                    <span>必須</span>
                                    メールアドレス
                                </dt>
                                <dd>
                                    <input type='email' name='email-address' placeholder='例）avenu-e@avenue.com' className='email' />
                                </dd>
                                <dt>
                                    <span>必須</span>
                                    お問い合わせ内容
                                </dt>
                                <dd>
                                    <textarea name='inquiry'></textarea>
                                </dd>
                                <p className='privacy'>
                                    プライバシーポリシーに基づいて、本ページにご記入いただいた個人情報につきましては、当社からの回答にて使用させていただきます。個人情報に関
                                    するお問い合わせ窓口は、
                                    <a target='_blank' href='#'>プライバシーポリシー</a>と
                                    <a target='_blank' href='#'>利用規約</a>
                                    をお読みくださいませ。
                                    <label className='my-checkbox'>
                                        <input type='checkbox' />
                                        <span className='checkmark'></span>
                                        利用規約に同意する
                                    </label>
                                </p>
                                <button type='submit' className='inquiry-btn'>問い合わせる</button>
                            </dl>
                        </div>
                    </div>
                </div>
            </div>
        </div>    
    );
};

export default Company;