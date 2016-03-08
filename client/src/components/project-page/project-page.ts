/// <amd-dependency path="text!./project-page.html" />
import ko = require("knockout");
export var template: string = require("text!./project-page.html");

import ns = require('../../services/notes.service');

export class viewModel {

    public message = ko.observable("Hello from the project-page component!");
    public notes = ko.observableArray<ns.Note>();
    public selectedNote = ko.observable<ns.Note>();

    public noteContentsMarkdown = ko.computed<string>(() => {
        if(this.selectedNote()){
            return "Markdown: " + this.selectedNote().noteContent; 
       }else{
           return "";
       }
    }, this);

    public selectNote = (note: ns.Note) => {
        this.selectedNote(note);
    }

    constructor (params: any) {
        this.message("Displaying project with id: " + params.projectId);
        
        new ns.NoteService().getNotes(params.projectId).then((noteSections) => {
            this.notes(noteSections[0].nodes);
            this.selectedNote(noteSections[0].nodes[0]);
        });
    }

    public dispose() {
        // This runs when the component is torn down. Put here any logic necessary to clean up,
        // for example cancelling setTimeouts or disposing Knockout subscriptions/computeds.        
    }
}
