import $ = require("jquery");

export interface Note {
    noteId: string;
    noteName: string;
    noteContent: string;
}

export interface NoteSection {
    notes: Note[];
    children: NoteSection[]
}

export class NoteService {
    getNotes(projectId: string) : JQueryPromise<NoteSection[]>{
        var dfd = $.Deferred();
        
        dfd.resolve([
            ]);
        
        return dfd.promise();
    }
}