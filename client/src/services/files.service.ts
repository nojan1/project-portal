import $ = require("jquery");
import common = require("./common");

export interface File {
    fileName: string;
    fullPath: string;
    mimeType: string;
}

export class FileService {
    getFileListing(projectId: string) : JQueryPromise<common.TreeItem<File>>{
        var dfd = $.Deferred();
        
        dfd.resolve(
            {
                title: "root",
                children: [
                    {
                        title: "Sub folder",
                        nodes: [
                            {
                                fileName: "File3.txt",
                                mimeType: "text/plain"
                            },
                            {
                                fileName: "File4.txt",
                                mimeType: "text/plain"
                            }
                        ]
                    },
                    {
                        title: "Sub folder 1",
                        nodes: [
                            {
                                fileName: "File3.txt",
                                mimeType: "text/plain"
                            },
                            {
                                fileName: "File4.txt",
                                mimeType: "text/plain"
                            }
                        ]
                    },
                    {
                        title: "Sub folder 2",
                        nodes: [
                            {
                                fileName: "File3.txt",
                                mimeType: "text/plain"
                            },
                            {
                                fileName: "File4.txt",
                                mimeType: "text/plain"
                            }
                        ]
                    }
                ],
                nodes: [
                    {
                        fileName: "File1.css",
                        mimeType: "text/css"
                    },
                    {
                        fileName: "File2.erb",
                        mimeType: "text/plain"
                    },
                    {
                        fileName: "File1.css",
                        mimeType: "text/css"
                    },
                    {
                        fileName: "File2.erb",
                        mimeType: "text/plain",
                        fullPath: "http://google.se"
                    },
                    {
                        fileName: "File1.css",
                        mimeType: "text/css"
                    },
                    {
                        fileName: "File2.erb",
                        mimeType: "text/plain"
                    },
                    {
                        fileName: "File1.css",
                        mimeType: "text/css"
                    },
                    {
                        fileName: "File2.erb",
                        mimeType: "text/plain"
                    }
                ]
            });
        
        return dfd.promise();
    }
}