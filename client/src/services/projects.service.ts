import $ = require("jquery");

export interface Project {
    projectId: string;
    projectName: string;
    lastAccess: Date;
}

export class ProjectService {
    getProjects() : JQueryPromise<Project[]>{
        // var dfd = $.Deferred();
        
        // dfd.resolve([
        //     {
        //         projectId: "magic-mirror",
        //         projectName: "Magic mirror",
        //         lastAccess: new Date()
        //     },
        //     {
        //         projectId: "retropie-console",
        //         projectName: "Retropie console",
        //         lastAccess: new Date()
        //     },
        //     {
        //         projectId: "color-mixer",
        //         projectName: "Color mixer",
        //         lastAccess: new Date()
        //     }
        //     ]);
        
        // return dfd.promise();
        
        return $.getJSON("/api/projects");
    }
    
    addProject(projectName: string) : JQueryPromise<Project> { 
        return $.ajax({
            type: "POST",
            url: "/api/projects",
            data: JSON.stringify({projectName: projectName}),
            contentType: "application/json"
        });
    }
}