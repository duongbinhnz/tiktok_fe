import React from "react"

export const Notification: React.FC = () => {
    return (
        <>
            <div><div className="css-feuqz4" style={{ transition: 'top 1s linear', display: "flex", justifyContent: "center", fontFamily: 'ProximaNova, PingFangSC, sans-serif', fontWeight: 600, position: 'fixed', top: '-50px', left: '0px', color: 'rgb(255, 255, 255)', zIndex: 1002, width: '100%', pointerEvents: 'none', userSelect: 'none' }}><span><div className="css-feuqz4-notice" style={{ right: '50%', marginTop: '-8px' }}><div className="css-feuqz4-notice-content" style={{ backgroundColor: 'rgba(84, 84, 84, 0.92)', display: 'inline-block', padding: '10px 8px', pointerEvents: 'all', maxWidth: '100%', borderRadius: '2px' }}><div className="css-9aj0a0-DivMessageContainer e1wz89c90" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '50vw', direction: 'ltr', minWidth: '300px' }}><span>Login Success</span></div></div></div></span></div></div>
            <div><div className="css-feuqz5" style={{ transition: 'top 1s linear', display: "flex", justifyContent: "center", fontFamily: 'ProximaNova, PingFangSC, sans-serif', fontWeight: 600, position: 'fixed', top: '-50px', left: '0px', color: 'rgb(255, 255, 255)', zIndex: 1002, width: '100%', pointerEvents: 'none', userSelect: 'none' }}><span><div className="css-feuqz4-notice" style={{ right: '50%', marginTop: '-8px' }}><div className="css-feuqz4-notice-content" style={{ backgroundColor: 'rgba(84, 84, 84, 0.92)', display: 'inline-block', padding: '10px 8px', pointerEvents: 'all', maxWidth: '100%', borderRadius: '2px' }}><div className="css-9aj0a0-DivMessageContainer e1wz89c90" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '50vw', direction: 'ltr', minWidth: '300px' }}><span>Login Error</span></div></div></div></span></div></div>
        </>
    )
}