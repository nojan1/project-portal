///<reference path='../../services/projects.service.ts'/>

/// <amd-dependency path="text!./home.html" />
import ko = require("knockout");
export var template: string = require("text!./home.html");
import $ = require("jquery");
//import { ProjectService, Project } from '../../services/projects.service';

import ps = require('../../services/projects.service');

export class viewModel {
    constructor(){
        $(document).trigger('loadingstate:changed', {isLoading: true});
        var service = new ps.ProjectService();
        service.getProjects().then(p => {
            this.projects(p);
        }).always(() => {
           $(document).trigger('loadingstate:changed', {isLoading: false});
        });
    }

    public displayNewProjectForm = ko.observable<boolean>(false);
    public newProjectName = ko.observable<string>("");
    public projects = ko.observableArray<ps.Project>();

    public newProject = () => {
        $(document).trigger('loadingstate:changed', {isLoading: true});
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
                $(document).trigger('loadingstate:changed', {isLoading: false}); 
            });
    }
    
    public openProject = (project: ps.Project) => {
        // alert(project.projectId);
        window.location.href = "#project/" + project.projectId;
    }
}
