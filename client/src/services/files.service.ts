import $ = require("jquery");

export interface File {
    noteId: string;
    noteName: string;
    noteContent: string;
}

export interface Folder {
    files: File[];
    folder: Folder[]
}

export class FileService {
    getFileListing(projectId: string) : JQueryPromise<Folder[]>{
        var dfd = $.Deferred();
        
        dfd.resolve([
            ]);
        
        return dfd.promise();
    }
}