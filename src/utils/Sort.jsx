/* ↓React Imports ALL */
import React, { useState, useRef } from 'react';

export const Sort = (props) => {

    const [open, setOPen] = useState(false);

    const toggle = () => {
        setOPen(!open);
    };

    const contentRef = useRef();
    
    return (
        <div>
            <button className='btn' onClick={toggle}>{props.label}</button>
            <div className='content-parent' ref={contentRef} style={open ? { height: contentRef.current.scrollHeight + 'px' } : { height: '0px' }}>
                <div className='content'>{props.children}</div>
            </div>
        </div>
    )
}
