import React from 'react'

const ProjectItem = (props) => {
    const handleClick = (id) => {
        props.getId(id)
    }

    return (
        <div className="note">
            <p className="title">{props.title}</p>
            <p className="content">{props.content}</p>
            {/* <p className="whatsappLink">{props.whatsappLink}</p> */}
            <button><a href={props.whatsappLink}>Join Whatsapp Group</a></button>
            <button onClick={() => handleClick(props.id)}>delete</button>
        </div>
    )
}

export default ProjectItem
