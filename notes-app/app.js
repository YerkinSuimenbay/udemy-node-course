const chalk = require('chalk');
const { argv } = require('yargs');
const yargs = require('yargs')
const {getNotes, addNote, removeNote, listNotes, readNote} = require('./notes')

const command = process.argv[2]
console.log(command, process.argv);
//Customize yargs version
yargs.version('1.1.0')

// Create add command
yargs.command({
    command: 'add',
    describe: 'Add a new note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        }, 
        body: {
            describe: 'Note body',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        console.log('Add the note...');
        addNote(argv.title, argv.body)
    }
})

// Create remove command
yargs.command({
    command: 'remove',
    describe: 'Remove the note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        console.log('Removing the note...');
        removeNote(argv.title)
    }
})

// Create list command
yargs.command({
    command: 'list',
    describe: 'List all notes',
    handler() {
        console.log('Listing all notes...');
        listNotes()
    }
})

// Create read command
yargs.command({
    command: 'read',
    describe: 'Read the note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        console.log('Reading the note...');
        readNote(argv.title)
    }
})

yargs.parse()
// console.log('YARGS_ARGV: ', yargs.argv);