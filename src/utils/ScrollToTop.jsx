/* ↓React Imports ALL */
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () =>  {
    
    const { pathname } = useLocation();
    
    /* ↓画面遷移した時に滑らかにページのトップへスライドさせる */
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return null;

};

export default ScrollToTop;