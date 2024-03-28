import {
    Avatar,
    AvatarFallback,
    AvatarImage,
  } from "@/components/ui/avatar"
import { User } from 'next-auth'
import React from 'react'

type Props = {
    user: User
}

const UserAvatar = ({ user }: Props) => {
    return (
        <Avatar>
            {user.image ? (
                <AvatarImage  src={user.image} alt='image profile' referrerPolicy='no-referrer'/>
                
            ) : (
                <AvatarFallback><span className='sr-only'>{user.name}</span></AvatarFallback>
            )}
        </Avatar>
    )
}

export default UserAvatar