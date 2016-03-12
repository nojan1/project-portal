/// <amd-dependency path="text!./file-tab.html" />
import ko = require("knockout");
export var template: string = require("text!./file-tab.html");

import fs = require("../../services/files.service");
import common = require("../../services/common");

export class viewModel {
    private folderTree: common.TreeItem<fs.File>;
    private folderHistory: common.TreeItem<fs.File>[];
    
    public currentFolder = ko.observable<common.TreeItem<fs.File>>();
    public isRoot = ko.computed(() => {
        this.currentFolder();
        return !this.folderHistory || this.folderHistory.length == 0;
    }, this);
    
    public currentPath = ko.computed(() => {
        this.currentFolder();
        
        if(this.folderHistory == null || this.folderHistory.length == 0){
            return "./";
        }else{
            return this.folderHistory.map((item) => item.title).join("/") + "/" + this.currentFolder().title;
        }
    }, this);
    
    public navigate = (folder: common.TreeItem<fs.File>) => {
        this.folderHistory.push(this.currentFolder());
        this.currentFolder(folder);
    }
    
    public navigateParent = () => {
        var parentFolder = this.folderHistory.pop();
        this.currentFolder(parentFolder);
    }
    
    public openFile = (file: fs.File) => {
        window.open(file.fullPath);
    }
    
    constructor (params: any) {
        new fs.FileService().getFileListing(params.projectId).then((folderTree) => {
            this.folderTree = folderTree;
            this.currentFolder(this.folderTree);
            
            this.folderHistory = [];
        });
    }

    public dispose() {
        // This runs when the component is torn down. Put here any logic necessary to clean up,
        // for example cancelling setTimeouts or disposing Knockout subscriptions/computeds.        
    }
}
