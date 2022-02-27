import React from 'react'

const Alert = (props) => {

    const capitalize = (word) => {
        let lower = word.toLowerCase();
        return lower.charAt(0).toUpperCase() + lower.slice(1);
    }

    return (
        props.alert &&
        <div className={"container"}>
            <div className={`alert alert-${props.alert.type} alert-dismissible fade show my-3`} role="alert">
                <strong>{props.alert.type!=='danger' && capitalize(props.alert.type)+' : ' }</strong>{props.alert.message}
            </div>
        </div>
    )
}

export default Alert;