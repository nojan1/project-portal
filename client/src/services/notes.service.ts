import $ = require("jquery");
import common = require("./common");

export interface Note {
    noteId: string;
    noteName: string;
    noteContent: string;
}

export class NoteService {
    public getNotes(projectId: string) : JQueryPromise<common.TreeItem<Note>[]>{
        var dfd = $.Deferred();
        
        // dfd.resolve([
        //     {
        //         title: 'Section 1',
        //         nodes: [
        //             {
        //                 noteId: 'note1',
        //                 noteName: 'Note 1',
        //                 noteContent: '# Note 1\n This is note 1'
        //             },
        //             {
        //                 noteId: 'note2',
        //                 noteName: 'Note 2',
        //                 noteContent: '# Note 2\n This is note 2'
        //             },
        //             {
        //                 noteId: 'note3',
        //                 noteName: 'Note 3',
        //                 noteContent: '# Note 3\n This is note 3'
        //             },
        //             {
        //                 noteId: 'note4',
        //                 noteName: 'Note 4',
        //                 noteContent: '# Note 4\n This is note 4'
        //             }
        //         ],
        //         children: []
        //     }
        //     ]);
        
        $.getJSON("/api/project/" + projectId + "/notes")
            .done((data : Note[]) => {
                dfd.resolve([
                    {
                        //TODO: Implement tree structure for notes
                        title: "Notes",
                        nodes: data,
                        children: []
                    }
                ]);
            })
            .fail((xhr: JQueryXHR) => {
                dfd.reject(xhr);
            })
        
        return dfd.promise();
    }
    
    public newNote = (projectId: string, noteName: string, noteContent: string) : JQueryPromise<Note> => {
        var note : Note = {
            noteId: noteName.replace(" ", "-"),
            noteName: noteName,
            noteContent: noteContent
        };
        
        return this.updateNote(projectId, note);
    }
    
    public updateNote = (projectId: string, note: Note) : JQueryPromise<Note> => {
        return $.post("/api/project/" + projectId + "/notes", ko.toJS(note));
    }
    
    public deleteNote = (projectId: string, noteId: string) : JQueryPromise<boolean> => {
        return $.ajax(<any>{
           url: "",
           method: "DELETE" 
        });
    }
}