import cb = require("./custom-binding");
import ko = require("knockout");
import $ = require("jquery");
import bootstrap = require("bootstrap");

export class TabBinding implements cb.CustomBinding {
   public Register(knockout : any){
       knockout.bindingHandlers.tab = {
           init: this.init,
           update: this.init
       };
   }
   
   private init = (element, valueAccessor, allBindings, viewModel, bindingContext) =>{
        $(element).attr("data-role", "tab");
        $(element).attr("data-toggle", "tab");
        $(element).attr("data-target", <string>ko.utils.unwrapObservable(valueAccessor()));
        
        $(element).click(function(){
            $(this).tab("show");
        });
   }
   
   private update = (element, valueAccessor, allBindings, viewModel, bindingContext) => {
        $(element).attr("data-target", <string>ko.utils.unwrapObservable(valueAccessor()));
   }
}