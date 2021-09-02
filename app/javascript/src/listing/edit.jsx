import React, {useState, useEffect} from 'react';

export default function Edit (props) {
    const [editing, setEditing] = useState(false);
    
    const editingHandler = () => {
        setEditing( () => {
            if (editing) {
                props.changeHandler();
            }
            return !editing
        })
    }
    
    return (
        <button type="button" className="btn btn-link" onClick={editingHandler}>{editing? "Done": "Edit >"}</button>
    )
}
