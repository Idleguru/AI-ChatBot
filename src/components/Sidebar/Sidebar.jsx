import { React, useContext, useState } from 'react'
import './Sidebar.css'
import { assets } from '../../assets/assets'
import { Context } from '../../context/Context'
import runChat from '../../config/Gemini'

const Sidebar = () => {

    const [exteneded, setexteneded] = useState(false)
    const { onSent, prevPrompt, setrecentPrompt, newChat } = useContext(Context)
    const loadPrompt = async (prompt) => {
        setrecentPrompt(prompt)
        await onSent(prompt)
    }

    return (
        <>
            <div className="Sidebar">

                <div className="top">
                    <img onClick={() => setexteneded(!exteneded)} src={assets.menu_icon} alt="" className="menu" />
                    <div onClick={()=>newChat()} className="new-chat">
                        <img src={assets.plus_icon} alt="" />

                        {exteneded ? <p>New Chat</p> : null}
                    </div>

                    {exteneded ?
                        <div className="recent">
                            <p className="recent-title">Recent</p>
                            {prevPrompt.map((item, index) => {
                                return (
                                    <div onClick={() => loadPrompt(item)} className="recent-entry">
                                        <img src={assets.message_icon} alt="" />
                                        <p>{item.slice(0, 16)}...</p>
                                    </div>

                                )
                            })}

                        </div> : null}

                </div>


                <div className="bottom">
                    <div className="bottom-item recent-entry">
                        <img src={assets.question_icon} alt="" />
                        {exteneded ? <p>Help</p> : null}
                    </div>
                    <div className="bottom-item recent-entry">
                        <img src={assets.history_icon} alt="" />
                        {exteneded ? <p>Activity</p> : null}
                    </div>
                    <div className="bottom-item recent-entry">
                        <img src={assets.setting_icon} alt="" />
                        {exteneded ? <p>Settings</p> : null}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Sidebar