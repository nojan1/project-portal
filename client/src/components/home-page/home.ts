///<reference path='../../services/projects.service.ts'/>

/// <amd-dependency path="text!./home.html" />
import ko = require("knockout");
export var template: string = require("text!./home.html");

//import { ProjectService, Project } from '../../services/projects.service';

import ps = require('../../services/projects.service');

export class viewModel {
    constructor(){
        var service = new ps.ProjectService();
        service.getProjects().then(p => {
            ko.utils.arrayPushAll(this.projects, p);
        });
    }
    
    public message = ko.observable("Welcome to project-portal!");

    public projects = ko.observableArray<ps.Project>();

    public newProject = () => {
        alert('create new project');
    }
    
    public openProject = (project: ps.Project) => {
        alert(project.projectId);
    }
}
