import React, { useState } from "react";
import { useEffect } from "react";

const ProfileStatus = (props) => {

    // state = { editMode: false, status: this.props.status }

    // componentDidUpdate(prevProps, prevState){ if(prevProps.status !== this.props.status) this.setState({ status: this.props.status }) }

    let [editMode, setEditMode] = useState(false)
    let [status, setStatus] = useState('')

    const toggleEditMode = () => {
        if(editMode) {
            props.updateStatus(status)
            setEditMode(false)
        } else {
            setEditMode(true)
        }
    }
    useEffect(() => {
        setStatus(props.status)
    }, [props.status])
    const onStatusChange = (status) => {
        setStatus(status.currentTarget.value)
    }

    return (
        <div>
            {!editMode 
            ? <span onDoubleClick={toggleEditMode}>{!status ? 'you dont have status' : status}</span> 
            : <input onChange={onStatusChange} autoFocus onBlur={toggleEditMode} value={status}/>}
        </div>
    )
}

export default ProfileStatus