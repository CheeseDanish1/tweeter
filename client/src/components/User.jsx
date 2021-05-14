import React from 'react'
import {getUserById} from '../utils/api'
import {useParams} from 'react-router-dom'
import Post from './Post'

export default function User({user}) {
    const [userPage, setUserPage] = React.useState(null)
    const [loading, setLoading] = React.useState(true)
    const {id} = useParams()

    React.useEffect(() => {
        getUserById(id).then(({data}) => {
            setUserPage(data.user)
            setLoading(false)
        })
    })

    if (loading) return <p>Loading...</p>
    if (!loading && !userPage) return <p>Uset not found</p>
    return !loading && (
        <div>
            <p><b>Username</b>: {userPage.username}</p><br />
            <div className="posts">
                {userPage.posts.map((post) => <Post user={user} post={post} key={post.id} />)}
            </div>
        </div>
    )
}
