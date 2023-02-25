class GetRandomStr {

    /* ↓使用したい文字をセット */
    CHARACTERS ='abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ01234567890'; 

    /* ↓全文字の長さ（ワーク用）*/
    CHARACTERS_LENGTH = this.CHARACTERS.length;

    /* ↓Uint8の最大値　乱数を受け取る入れ物をUint32にするなら4294967295 */
    RANDOM_VALUE_MAX = 255;

    /* ↓乱数の有効値の範囲　これより大きい値がでたら切り捨てる（上記文字列の出現確率を均等にするため）*/
    VALID_RANGE = Math.floor((this.RANDOM_VALUE_MAX+1) / this.CHARACTERS_LENGTH) * this.CHARACTERS_LENGTH - 1;
    
    getRandomStr(intLength) {

        /* ↓ランダムな文字列を取得する */
        let ret = String();
        
        /* ↓文字の候補が乱数の最大値より大きかったらエラーとして空白を返す */
        if (this.RANDOM_VALUE_MAX < this.CHARACTERS_LENGTH) {
            return '';
        }
  
        if(intLength <= 0) {
            return '';
        }
  
        while(ret.length < intLength) {
            /* ↓乱数の入れ物（有効範囲を超えた場合切り捨てるので２倍の数取得しています) */
            /* ↓得られる値が65536バイトを超えるとgetRandomValues()側でエラーになります */
            const arr = new Uint8Array(intLength * 2);
        
            /* ↓乱数取得 */
            crypto.getRandomValues(arr);
        
            /* ↓文字生成 */
            for(let i = 0; i < arr.length; i++) {
                /* ↓乱数有効長チェック */
                if(this.VALID_RANGE < arr[i]) {
                    continue;
                }
                ret+=this.CHARACTERS[arr[i] % this.CHARACTERS_LENGTH];
            }
        }
    
        return(ret.substring(0,intLength));
    };
  
    getRandomHex(intHexLength,blnUpper=false) {
        /* 
            ↓16進の値を取得する
            ↓16進数の文字列ならUint8Arrayの値そのままで生成できます
            ↓intHexLengthは16進の単位で指定してください（文字長は倍になります） 
        */
        let ret = String();
    
        if(intHexLength <= 0) {
            return '';
        }
    
        const arr = new Uint8Array(intHexLength);
    
        /* ↓乱数取得 */
        crypto.getRandomValues(arr);
    
        for(let i = 0; i < arr.length; i++) {
            ret +=arr[i].toString(16);
        }
  
        if (blnUpper) {
            return ret.toUpperCase();
        } else {
            return ret;
        }
    };

};

let r = new GetRandomStr();
const RandomURL = r.getRandomStr(50)

export default RandomURL;