import cb = require("./custom-binding");
import ko = require("knockout");
import $ = require("jquery");
import bootstrap = require("bootstrap");

export class MimetypeIconBinding implements cb.CustomBinding {
   public Register(knockout : any){
       knockout.bindingHandlers.mimeicon = {
           update: this.update
       };
   }

   private update = (element, valueAccessor, allBindings, viewModel, bindingContext) => {
       var mimetype = <string>ko.utils.unwrapObservable(valueAccessor());
       mimetype = mimetype.replace("/","-");
      
       $(element).attr("src", "images/mimetypes/" + mimetype + ".png");
       $(element).on("error", function(){
           var fallback = "images/mimetypes/unknown.png";
           
           if($(this).attr("src") != fallback){
               $(this).attr("src", fallback);
           }
       });
   }
}