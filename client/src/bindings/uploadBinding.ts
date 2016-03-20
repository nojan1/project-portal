import cb = require("./custom-binding");
import ko = require("knockout");
import $ = require("jquery");
import bootstrap = require("bootstrap");
import upload = require("jquery-file-upload");

export class UploadBinding implements cb.CustomBinding {
   public Register(knockout : any){
       knockout.bindingHandlers.upload = {
           init: this.init,
           update: this.init
       };
   }
   
   private init = (element, valueAccessor, allBindings, viewModel, bindingContext) =>{
        (<any>$(element)).fileupload(ko.utils.unwrapObservable(valueAccessor()));
   }
   
   private update = (element, valueAccessor, allBindings, viewModel, bindingContext) => {
        
   }
}