/// <amd-dependency path="text!./note-tab.html" />
import ko = require("knockout");
import komapping = require("knockout-mapping");
export var template: string = require("text!./note-tab.html");

import tb = require('../../services/common');
import ns = require('../../services/notes.service');

export class viewModel {
    public inEditMode = ko.observable(false);
    
    public notes = ko.observableArray<tb.TreeItem<ns.Note>>();
    public selectedNote = ko.observable({
        noteId: '',
        noteName: ko.observable<string>(),
        noteContent: ko.observable<string>()  
    });
    
    public selectNote = (note: ns.Note) => {
        // this.selectedNote().noteContent(note.noteContent);
        // this.selectedNote().noteId = note.noteId;
        // this.selectedNote().noteName(note.noteName);
        
        this.selectedNote(komapping.fromJS(note));
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
        new ns.NoteService().getNotes(params.projectId()).then((noteSections) => {
            this.notes(noteSections);
            
            if(noteSections.length > 0 && noteSections[0].nodes.length > 0){
                this.selectNote(noteSections[0].nodes[0]);
            }
        });
    }

    public dispose() {
        // This runs when the component is torn down. Put here any logic necessary to clean up,
        // for example cancelling setTimeouts or disposing Knockout subscriptions/computeds.        
    }
}
