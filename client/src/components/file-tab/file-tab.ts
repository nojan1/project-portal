/// <amd-dependency path="text!./file-tab.html" />
import ko = require("knockout");
export var template: string = require("text!./file-tab.html");

import fs = require("../../services/files.service");
import common = require("../../services/common");

export class viewModel {
    private folderTree: common.TreeItem<fs.File>;
    
    public currentFolder = ko.observable<common.TreeItem<fs.File>>();
    public isRoot = ko.observable<boolean>(true);
    
    public navigate = (folder: common.TreeItem<fs.File>) => {
        currentFolder(folder);
        isRoot(false);
    }
    
    constructor (params: any) {
        new fs.FileService().getFileListing(params.projectId).then((folderTree) => {
            this.folderTree = folderTree;
            this.currentFolder(this.folderTree);
        });
    }

    public dispose() {
        // This runs when the component is torn down. Put here any logic necessary to clean up,
        // for example cancelling setTimeouts or disposing Knockout subscriptions/computeds.        
    }
}
