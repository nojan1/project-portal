import cb = require("./custom-binding");
import ko = require("knockout");
import md = require("markdown-it");
import $ = require("jquery");

export class MarkdownBinding implements cb.CustomBinding {
   public Register(knockout : any){
       knockout.bindingHandlers.markdown = {
           update: this.update
       };
   }
   private update = (element, valueAccessor, allBindings, viewModel, bindingContext) => {
        var text = ko.unwrap(valueAccessor());
        if(text && text.length > 0){
            var markdownText = md({
                                linkify: true,
                                typographer: true
                            }).render(text);
                            
            //ko.bindingHandlers.html.init(element, () => markdownText, null, null, null); 
            $(element).html(markdownText);
       }
   }
}