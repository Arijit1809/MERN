import React from 'react'
import { useSelector } from 'react-redux'
import './OtherPosts.scss'
export default function OtherPosts({children}){
    const { posts, isLoading } = useSelector((state) => state.posts);
    return(
        <div className="other-posts">
            <h1 style={{marginBottom:"20px"}}>Posts on this page</h1>
            {posts.map(({name,title},index)=>{
                return(
                    <a className="post-ref" href={`#${index+1}`} key={index}>
                        <div>
                            <span>{title} by {name}</span> 
                        </div>
                    </a>
                )
            })}
            {children}
        </div>
    )
}

