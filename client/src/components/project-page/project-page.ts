/// <amd-dependency path="text!./project-page.html" />
import ko = require("knockout");
export var template: string = require("text!./project-page.html");
import md = require("markdown-it");
import tb = require('../../services/common');
import ns = require('../../services/notes.service');

export class viewModel {

    public message = ko.observable("Hello from the project-page component!");
    
    public inEditMode = ko.observable(false);
    
    public notes = ko.observableArray<tb.TreeItem<ns.Note>>();
    public selectedNote = ko.observable({
        noteId: '',
        noteName: ko.observable<string>(),
        noteContent: ko.observable<string>()  
    });

    public noteContentsMarkdown = ko.computed<string>(() => {
        if(this.selectedNote() && this.selectedNote().noteContent()){
            return md({
                        linkify: true,
                        typographer: true
                    }).render(this.selectedNote().noteContent()); 
       }else{
           return "";
       }
    }, this);

    public selectNote = (note: ns.Note) => {
        this.selectedNote().noteId = note.noteId;
        this.selectedNote().noteName(note.noteName);
        this.selectedNote().noteContent(note.noteContent);
    }

    public enterEditMode = () => {
        this.inEditMode(true);
    }

    public saveChanges = () => {
        if(this.selectedNote().noteId){
            //Edit
            // let noteToUpdate = ko.utils.arrayFirst(this.notes(), x => x.noteId == this.selectedNote().noteId);
            // noteToUpdate.noteName = this.selectedNote().noteName();
            // noteToUpdate.noteContent = this.selectedNote().noteContent();
        }else{
            //New
            
        }
        
        this.inEditMode(false);
    }

    constructor (params: any) {
        this.message(params.projectId);
        
        new ns.NoteService().getNotes(params.projectId).then((noteSections) => {
            this.notes(noteSections);
            this.selectNote(noteSections[0].nodes[0]);
        });
    }

    public dispose() {
        // This runs when the component is torn down. Put here any logic necessary to clean up,
        // for example cancelling setTimeouts or disposing Knockout subscriptions/computeds.        
    }
}
