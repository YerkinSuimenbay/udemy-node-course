const chalk = require('chalk')
const fs = require('fs')

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch (error) {
        return []
    }
}

const saveNotes = notes => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

const addNote = (title, body) => {
    const notes = loadNotes()

    // --- CHECK IF NOTE TITLE ALREADY TAKEN ---
    // MY WAY
    // for (note of notes) {
    //     if (note.title === title) {
    //         console.log('Note title already taken');
    //         return
    //     }
    // }
    // notes.push({title, body})
    // saveNotes(notes)
    // console.log('New note added');
    
    // TUTORIAL WAY
    const duplicateNote = notes.find(note => note.title === title)
    if (duplicateNote) {
        console.log(chalk.red.inverse('Note title already taken!'))
    } else {
        notes.push({title, body})
        saveNotes(notes)
        console.log(chalk.green.inverse('New note added!'))
    }   
}

const removeNote = title => {
    try {
        const notes = loadNotes()
        const notesFiltered = notes.filter(note => note.title !== title)
        if (notesFiltered.length === notes.length) throw new Error(chalk.red.inverse(`There is no note with title ${title}`))
        console.log(chalk.green.inverse(`The note with title ${title} removed`));
        saveNotes(notesFiltered)        
    } catch (error) {
        console.log(error.message);
    }
}

const listNotes = () => {
    const notes = loadNotes()
    console.log(chalk.inverse('Your notes:'));
    notes.forEach(note => console.log(note.title))
}

const readNote = title => {
    const notes = loadNotes()
    const note = notes.find(note => note.title === title)

debugger

    if (note) {
        console.log(chalk.bgGray('Note:'))
        console.log('Title: ', note.title)
        console.log('Body: ', note.body)
    }
    else console.log(chalk.bgRed('No note was found'))
}

module.exports = {addNote, removeNote, listNotes, readNote}