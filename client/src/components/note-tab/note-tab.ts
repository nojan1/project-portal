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
        this.selectedNote(komapping.fromJS(note));
    }

    public newNote = () => {
        this.selectedNote(komapping.fromJS({}));
        this.enterEditMode();
    }

    public enterEditMode = () => {
        this.inEditMode(true);
    }

    public saveChanges = () => {
        if(!this.selectedNote().noteName() && this.selectedNote().noteContent()){
            alert("No data entered");
            return;
        }
        
        if(this.selectedNote().noteId){
            //Edit
            
        }else{
            //New
            $(document).trigger('loadingstate:changed', {isLoading: true});
            new ns.NoteService().newNote(this.params.projectId(),
                                         this.selectedNote().noteName(),
                                         this.selectedNote().noteContent())
                .done((note: ns.Note) => {
                    this.notes()[0].nodes.push(note);
                    this.selectedNote(komapping.fromJS(note));
                })
                .fail((data: any, error: string, errorThrown: string) => {
                    alert("Error when creating note! " + error + ": " + errorThrown);
                })
                .always(() => {
                   $(document).trigger('loadingstate:changed', {isLoading: false}); 
                });
        }
        
        this.inEditMode(false);
    }

    constructor (private params: any) {
        $(document).trigger('loadingstate:changed', {isLoading: true});
        new ns.NoteService().getNotes(params.projectId()).then((noteSections) => {
            this.notes(noteSections);
            
            if(noteSections.length > 0 && noteSections[0].nodes.length > 0){
                this.selectNote(noteSections[0].nodes[0]);
            }
        })
        .always(() => {
            $(document).trigger('loadingstate:changed', {isLoading: false}); 
        });
    }

    public dispose() {
        // This runs when the component is torn down. Put here any logic necessary to clean up,
        // for example cancelling setTimeouts or disposing Knockout subscriptions/computeds.        
    }
}
