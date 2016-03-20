/// <amd-dependency path="text!./loading-indicator.html" />
import ko = require("knockout");
import $ = require("jquery");
export var template: string = require("text!./loading-indicator.html");

export interface LoadingState {
    isLoading: boolean;
}

export class viewModel {
    
    public loadingUsageCounter = ko.observable<number>(0);
    public isLoading = ko.computed<boolean>(() => {
        return this.loadingUsageCounter() > 0;
    }, this);
    
    constructor (params: any) {
        $(document).on('loadingstate:changed', (e: any, loadingState: LoadingState) => {
             this.loadingUsageCounter(this.loadingUsageCounter() + (loadingState.isLoading ? 1 : -1));
        });
    }

    public dispose() {
        // This runs when the component is torn down. Put here any logic necessary to clean up,
        // for example cancelling setTimeouts or disposing Knockout subscriptions/computeds.        
    }
}
