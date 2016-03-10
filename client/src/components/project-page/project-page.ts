/// <amd-dependency path="text!./project-page.html" />
import ko = require("knockout");
export var template: string = require("text!./project-page.html");


export class viewModel {

    public message = ko.observable("Hello from the project-page component!");
    public projectId = ko.observable();
   
    constructor (params: any) {
        this.message(params.projectId);
        this.projectId(params.projectId);
    }

    public dispose() {
        // This runs when the component is torn down. Put here any logic necessary to clean up,
        // for example cancelling setTimeouts or disposing Knockout subscriptions/computeds.        
    }
}
