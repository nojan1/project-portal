import $ = require("jquery");
import common = require("./common");

export interface File {
    fileName: string;
}

export class FileService {
    getFileListing(projectId: string) : JQueryPromise<common.TreeItem<File>[]>{
        var dfd = $.Deferred();
        
        dfd.resolve([
            ]);
        
        return dfd.promise();
    }
}