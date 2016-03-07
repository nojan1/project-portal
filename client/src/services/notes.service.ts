import $ = require("jquery");

export interface Note {
    noteId: string;
    noteName: string;
    noteContent: string;
}

export interface NoteSection {
    sectionName: string;
    notes: Note[];
    children: NoteSection[]
}

export class NoteService {
    getNotes(projectId: string) : JQueryPromise<NoteSection[]>{
        var dfd = $.Deferred();
        
        dfd.resolve([
            {
                sectionName: 'Section 1',
                notes: [
                    {
                        noteId: 'note1',
                        noteName: 'Note 1',
                        noteContent: '#Note 1'
                    },
                    {
                        noteId: 'note2',
                        noteName: 'Note 2',
                        noteContent: '#Note 2'
                    },
                    {
                        noteId: 'note3',
                        noteName: 'Note 3',
                        noteContent: '#Note 3'
                    },
                    {
                        noteId: 'note4',
                        noteName: 'Note 4',
                        noteContent: '#Note 4'
                    }
                ],
                children: []
            }
            ]);
        
        return dfd.promise();
    }
}