import React, {useState} from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {

    const notesInitial = []

    const [notes, setNotes] = useState(notesInitial)

    const url = "http://localhost:8080/api/notes"

    //Get All Notes
    const getAllNotes = async () => {
        const response = await fetch(`${url}/fetchAllNotes`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'jwt_token': localStorage.getItem('jwt_token')            }
        });

        const json = await response.json()
        setNotes(json)
    }



    //Adding Note
    const addNote = async (title, description, tag) => {
        const response = await fetch(`${url}/addNote`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'jwt_token': localStorage.getItem('jwt_token')            },
            body: JSON.stringify({title, description, tag})
        });

        const json = await response.json()

        setNotes(notes.concat(json))
    }


    //Delete Note
    const deleteNote = async (id) => {
        const response = await fetch(`${url}/deleteNote/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'jwt_token': localStorage.getItem('jwt_token')
            }
        });

        const newNotes = notes.filter((note) => {return note._id !== id})
        setNotes(newNotes)
    }


    //Update Note
    const editNote = async (id, title, description, tag) => {

        const response = await fetch(`${url}/updateNote/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'jwt_token': localStorage.getItem('jwt_token')            },
            body: JSON.stringify({title, description, tag})
        });

        const newNotes = JSON.parse(JSON.stringify(notes))

        for(let index=0; index<newNotes.length; index++){
            if(newNotes[index]._id === id){
                newNotes[index].title = title
                newNotes[index].description = description
                newNotes[index].tag = tag
                break;
            }

        }

        setNotes(newNotes)

        // const json = await response.json()
        // console.log(json)

    }

    return (
        <NoteContext.Provider value={{notes, setNotes, addNote, deleteNote, editNote, getAllNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState