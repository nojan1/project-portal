///<reference path='../../services/projects.service.ts'/>

/// <amd-dependency path="text!./home.html" />
import ko = require("knockout");
export var template: string = require("text!./home.html");

//import { ProjectService, Project } from '../../services/projects.service';

import ps = require('../../services/projects.service');

export class viewModel {
    constructor(){
        this.isLoading(true);
        var service = new ps.ProjectService();
        service.getProjects().then(p => {
            this.projects(p);
        }).always(() => {
           this.isLoading(false); 
        });
    }

    public displayNewProjectForm = ko.observable<boolean>(false);
    public newProjectName = ko.observable<string>("");
    public isLoading = ko.observable<boolean>(false);
    public projects = ko.observableArray<ps.Project>();

    public newProject = () => {
        this.isLoading(true);
        new ps.ProjectService().addProject(this.newProjectName())
            .done((project) => {
                this.projects.push(project);
                
                this.displayNewProjectForm(false);
                this.newProjectName("");
            })
            .fail((jqXHR, textStatus, errorThrown) => {
                alert("Error: " + errorThrown);
                console.error(jqXHR);
            }).always(() => {
                this.isLoading(false); 
            });
    }
    
    public openProject = (project: ps.Project) => {
        // alert(project.projectId);
        window.location.href = "#project/" + project.projectId;
    }
}
