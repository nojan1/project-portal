/// <amd-dependency path="text!./note-tab.html" />
import ko = require("knockout");
export var template: string = require("text!./note-tab.html");

export class viewModel {

    public message = ko.observable("Hello from the note-tab component!");

    constructor (params: any) {

    }

    public dispose() {
        // This runs when the component is torn down. Put here any logic necessary to clean up,
        // for example cancelling setTimeouts or disposing Knockout subscriptions/computeds.        
    }
}
