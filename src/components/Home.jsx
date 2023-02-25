/* ↓Images */
import Portfolio from '../images/toppage/portfolio-uplode.svg';
import Worry from '../images/toppage/worry.svg';
import Skill from '../images/toppage/skill.svg';
import Appeal from '../images/toppage/appeal.svg';
import Meet from '../images/toppage/meet.svg';
import Register from '../images/toppage/Register.svg';
import Upload from '../images/toppage/Upload.svg';
import Offers from '../images/toppage/Offers.svg';
import PerosnalSettings from '../images/toppage/personal-settings.svg';

const Home = (props) => {
    return (
        <div>
            <div className='main-wrapper'>
                <img className='top-image' src={ Portfolio } width='450' height='450' alt='Worry' />
                <div className='top-wrapper'>
                    <h1>あなたの<span>開発実績</span>を、<span>企業</span>へ届ける。</h1>
                    <p>Avenu-Eは、エンジニアの為の情報共有、求人・転職サービスです。</p>
                    <p>自身が手がけたポートフォリオや個人開発などの成果物をアップして、他ユーザーからの評価や企業からのオファーをもらえるプラットフォームです。</p>
                    <p>また、他ユーザーのポートフォリオを閲覧できたり、ユーザー間での評価を催合うことが可能です。</p>
                    <h4 className='sub'>今すぐあなたのポートフォリオをアップしよう。</h4>
                </div>
                <div className='btn-wrapper'>
                    {
                        !props.user && (
                            <a href='/register' className='btn home-btn'>今すぐ無料登録をする</a>
                        )
                    }
                    <a href='/company' className='btn btn-dark'>採用したい企業様はこちら</a>
                </div>
            </div>

            {/* ■■ 説明部分 ■■　*/}
            <div className='explaination-wrapper'>
                <div className='heading'>
                    <h2><span>ポートフォリオ共有型</span>プラットフォーム Avenu-E</h2>
                </div>
                <div>
                    <img className='explaination-image' src={ Worry } width='450' height='450' alt='Worry' />
                    <ul>
                        <li className='explaination-texts'><i className='fas fa-circle-check' />自身のスキルレベルを把握したい。</li>
                        <li className='explaination-texts'><i className='fas fa-circle-check' />実務未経験でも採用されたい。</li>
                        <li className='explaination-texts'><i className='fas fa-circle-check' />自分に合った企業で働きたい。</li>
                    </ul>
                </div>
                <h2 className='explaination-content'><i className='fas fa-code-compare' /> Avenu-Eではそんな悩みを解決できます。</h2>
            </div>  

            {/*　■■ 利用する理由　■■ */}
            <div className='service-wrapper'>
                <div className='gland'>
                    <div className='heading'>
                        <h2>Avenu-Eが選ばれている <span>理由</span></h2>
                    </div>
                    <div className='reasons'>
                        <div className='reason1'>
                            <div className='reason-icon'>
                                <img className='reason-image' src={ Skill } width='300' height='300' alt='SkillImage' />    
                            </div>
                            <div className='reason1-text'>
                                <h4>企業にスキルを比較できる</h4>
                                <p className='txt-contents'>
                                    他のユーザーのポートフォリオを閲覧することができるため、自身のスキルレベルを可視化することができます。また、いいね制度を導入したことで他ユーザーからの反応等も見ることができます。
                                </p>
                            </div>
                        </div>
                        <div className='reason2'>
                            <div className='reason-icon'>
                                <img className='reason-image' src={ Appeal } width='300' height='300' alt='AppealImage' />
                            </div>
                            <div className='reason2-text'>
                                <h4>自身のスキルをアピールできる</h4>
                                <p className='txt-contents'>初学者や未経験者の方でもポートフォリオが評価されれば、企業からのスカウトを受け取ることができるため、実務経験などがなくても企業へのアピールがしやすくなります。</p>
                            </div>
                        </div>
                        <div className='reason3'>
                            <div className='reason-icon'>
                                <img className='reason-image' src={ Meet } width='300' height='300' alt='MeetImage' />
                            </div>
                            <div className='reason3-text'>
                                <h4>自分に合った企業とマッチング</h4>
                                <p className='txt-contents'>自身が手がけたポートフォリオの技術スタックに応じて、企業があなたを選定しスカウトするため、大きなミスマッチを防ぐことができます。</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/*　■■ Avenu-Eの使い方　■■ */}
            <div className='howtouse-wrapper'>
                <div className='gland'>
                    <div className='heading'>
                        <h2>Avenu-Eの <span>使い方</span></h2>
                    </div>
                    <div className='horizontal'>
                        <div className='howtouses'>
                            <div className='howtouse'>
                                <div className='howtouse-icon'>
                                    <img src={ Register } width='200' height='200' alt='RegisterImage' />
                                    <p>Step1</p>
                                    <h4>無料会員登録をする</h4>
                                </div>
                            </div>
                        </div>
                        <div className='triangle-right'></div>
                        <div className='howtouses'>
                            <div className='howtouse'>
                                <div className='howtouse-icon'>
                                    <img src={ PerosnalSettings } width='200' height='200' alt='UploadImage' />
                                    <p>Step2</p>
                                    <h4>マイページを設定</h4>
                                </div>
                            </div>
                        </div>
                        <div className='triangle-right'></div>
                        <div className='howtouses'>
                            <div className='howtouse'>
                                <div className='howtouse-icon'>
                                    <img src={ Upload } width='200' height='200' alt='UploadImage' />
                                    <p>Step3</p>
                                    <h4>ポートフォリオを投稿</h4>
                                </div>
                            </div>
                        </div>
                        <div className='triangle-right'></div>
                        <div className='howtouses'>
                            <div className='howtouse'>
                                <div className='howtouse-icon'>
                                    <img src={ Offers } width='200' height='200' alt='OffersImage' />
                                    <p>Step4</p>
                                    <h4>企業からオファーが届く</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ■■　今すぐ始めよう ■■ */}
            {
                !props.user && (
                    <div className='letsdo-wrapper'>
                        <div className='heading'>
                            <h2>まずはユーザー登録から始めよう</h2>
                        </div>
                        <div className='btn-wrapper'>
                            <a href='/register' className='btn home-btn'>今すぐ無料登録をする</a>
                        </div>
                        <div>
                            <a href='/company'>採用したい企業様はこちら</a>
                        </div>
                    </div>
                )
            }
        </div>
    );
};

export default Home;