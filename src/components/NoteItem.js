import React, {useContext} from 'react'
import Context from '../context/notes/NoteContext'

const NoteItem = (props) => {

    const context = useContext(Context)

    const {note, updateNote} = props
    const {deleteNote} = context

    return (
        <div className={"col-md-3 my-2"}>
            <div className="card">
                    <div className="card-body">
                        <div className={"d-flex align-items-center"}>
                            <h5 className="card-title">{note.title}</h5>
                            <i className="fa-solid fa-trash mx-2" onClick={() => { deleteNote(note._id)
                            props.showAlert('Note Deleted Successfully', 'success')}}></i>
                            <i className="fa-solid fa-pen-to-square mx-2" onClick={() => { updateNote(note) }}></i>
                        </div>
                        <p className="card-text">{note.description}</p>
                    </div>
            </div>
        </div>
    )
}

export default NoteItem