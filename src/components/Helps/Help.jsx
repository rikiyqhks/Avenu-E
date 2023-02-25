/* ↓React Imports ALL */
import React from 'react';

/* ↓Layouts */
import './Helps.css';

const Help = () => {

    return (
        <>
            <div className='help-wrapper_category'>
                <div className='help-wrapper_left'>
                    <section className='help-wrapper_section'>
                        <h3 className='help-wrapper_section_heading'>
                            Avenu-Eとは
                        </h3>
                        <ul>
                            <li className='help-wrapper_section_title'>
                                <a href='/help/format?type=origin'>Avenu-Eのサービス名の由来</a>
                            </li>
                            <li className='help-wrapper_section_title'>
                                <a href='/help/format?type=explanation'>Avenu-Eとは</a>
                            </li>
                            <li className='help-wrapper_section_title'>
                                <a href='/help/format?type=mind'>Avenu-Eへの想い</a>
                            </li>
                        </ul>
    
                        <h3 className='help-wrapper_section_heading'>
                            ユーザー設定について
                        </h3>
                        <ul>
                            <li className='help-wrapper_section_title'>
                                <a href='/help/format?type=cancel'>アカウント連携の解除</a>
                            </li>
                            <li className='help-wrapper_section_title'>
                                <a href='/help/format?type=icon'>アイコン画像の設定</a>
                            </li>
                            <li className='help-wrapper_section_title'>
                                <a href='/help/format?type=email'>メールアドレスの変更</a>
                            </li>
                            <li className='help-wrapper_section_title'>
                                <a href='/help/format?type=leave'>退会方法</a>
                            </li>
                        </ul>
    
                        <h3 className='help-wrapper_section_heading'>
                            認証等
                        </h3>
                        <ul>
                            <li className='help-wrapper_section_title'>
                                <a href='/help/format?type=forgot_ps'>パスワードを忘れてしまった場合</a>
                            </li>
                            <li className='help-wrapper_section_title'>
                                <a href='/help/format?type=relogin'>Google・GitHub連携を解除してしまった際の再ログイン方法</a>
                            </li>
                        </ul>
    
                        <h3 className='help-wrapper_section_heading'>
                            ポートフォリオに関して
                        </h3>
                        <ul>
                            <li className='help-wrapper_section_title'>
                                <a href='/help/format?type=portfolio_post'>ポートフォリオを投稿する</a>
                            </li>
                            <li className='help-wrapper_section_title'>
                                <a href='/help/format?type=portfolio_edit'>ポートフォリオを編集する</a>
                            </li>
                            <li className='help-wrapper_section_title'>
                                <a href='/help/format?type=portfolio_remove'>ポートフォリオを削除する</a>
                            </li>
                        </ul>
                    </section>
                </div>
                <div className='help-wrapper_right'>
                    <section className='help-wrapper_section'>
                        <h3 className='help-wrapper_section_heading'>
                            機能
                        </h3>
                        <ul>
                            <li className='help-wrapper_section_title'>
                                <a href='/help/format?type=scrap'>スクラップ機能</a>
                            </li>
                            <li className='help-wrapper_section_title'>
                                <a href='/help/format?type=package'>パッケージ機能</a>
                            </li>
                            <li className='help-wrapper_section_title'>
                                <a href='/help/format?type=good'>いいね機能</a>
                            </li>
                            <li className='help-wrapper_section_title'>
                                <a href='/help/format?type=markdown'>Markdownの記述マニュアル</a>
                            </li>
                        </ul>
    
                        <h3 className='help-wrapper_section_heading'>
                            法律、規約について
                        </h3>
                        <ul>
                            <li className='help-wrapper_section_title'>
                                <a href='/help/format?type=copyright'>著作物に関する注意点</a>
                            </li>
                            <li className='help-wrapper_section_title'>
                                <a href='/help/format?type=copy'>無断転載された場合の対処について</a>
                            </li>
                            <li className='help-wrapper_section_title'>
                                <a href='/help/format?type=permission'>肖像権・パブリシティ権について</a>
                            </li>
                        </ul>
    
                        <h3 className='help-wrapper_section_heading'>
                            その他
                        </h3>
                        <ul>
                            <li className='help-wrapper_section_title'>
                                <a href='/help/format?type=others'>当社が不適切と判断した違反について</a>
                            </li>
                        </ul>
                    </section>
                </div>
            </div>
        </>
    );
};

export default Help;