import cb = require("./custom-binding");

import treeType = require("../services/common");
import ko = require("knockout");

export class TreeBinding implements cb.CustomBinding {
    
    private nodeTemplate : string;
    
   public Register(knockout : any){
       knockout.bindingHandlers.tree = {
           init: this.init,
           update: this.init
       };
   }
   
   private buildTree(element : JQuery, value : treeType.TreeItem<any>[]){
        ko.utils.arrayForEach(value, (item) => {
            var pseudoElement = element;
            if(item.title){
                var rootTitle = $("<li>");
                rootTitle.text(item.title)
                rootTitle.addClass("root-title");
                element.append(rootTitle);
                
                pseudoElement = $("<ul>");
            }
            
            if(item.children && item.children.length > 0){
                var subList = $("<ul>");
                this.buildTree(subList, item.children);
                pseudoElement.append(subList);
            }
            
            if(item.nodes && item.nodes.length > 0){
                ko.utils.arrayForEach(item.nodes, (node) => {
                    var nodeTitle = $("<li>");
                    nodeTitle.text(node);
                    pseudoElement.append(nodeTitle);
                });
            }
            
            if(item.title){
                element.append(pseudoElement);
            }
        });
   }
   
   private init = (element, valueAccessor, allBindings, viewModel, bindingContext) =>{
       this.nodeTemplate = $(element).html();
       $(element).html():
       this.buildTree($(element), ko.unwrap(valueAccessor)()());
   }
   
   private update = (element, valueAccessor, allBindings, viewModel, bindingContext) => {
       $(element).html("");
       this.buildTree($(element), ko.unwrap(valueAccessor)()());
   }
}