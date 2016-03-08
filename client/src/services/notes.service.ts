import $ = require("jquery");
import common = require("./common");

export interface Note {
    noteId: string;
    noteName: string;
    noteContent: string;
}

export class NoteService {
    getNotes(projectId: string) : JQueryPromise<common.TreeItem<Note>[]>{
        var dfd = $.Deferred();
        
        dfd.resolve([
            {
                title: 'Section 1',
                nodes: [
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