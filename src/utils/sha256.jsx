export const sha256 = async (str) =>  {

    /* ↓入力値を配列バッファーに変換 */
    const buff = new Uint8Array([].map.call(str, (c) => c.charCodeAt(0))).buffer;
    
    /* ↓ハッシュ値をライブラリ「crypto」を用いて計算 */
    const digest = await crypto.subtle.digest('SHA-256', buff);

    /* ↓配列バッファーからhexに変換 */
    return [].map.call(new Uint8Array(digest), x => ('00' + x.toString(16)).slice(-2)).join('');

};