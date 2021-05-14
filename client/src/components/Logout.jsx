import React from 'react'
import {logout} from '../utils/api'

export default function Logout({setUser, style}) {
    return (
        <button style={style} onClick={async () => { 
            const r = await logout()
            window.location.href="/login"
            console.log(r.data)
        }} className="logout">
            Logout
        </button>
    )
} 