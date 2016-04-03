import cb = require("./custom-binding");
import ko = require("knockout");
import md = require("markdown-it");
import $ = require("jquery");

export class MarkdownBinding implements cb.CustomBinding {
   public Register(knockout : any){
       knockout.bindingHandlers.markdown = {
           init: this.init,
           update: this.init
       };
   }
   
   public renderMarkdown(element, text){
       if(text && text.length > 0){
            var markdownText = md({
                                linkify: true,
                                typographer: true
                            }).render(text);
                            
            //ko.bindingHandlers.html.init(element, () => markdownText, null, null, null); 
            $(element).html(markdownText);
       }
   }
  
   private init = (element, valueAccessor, allBindings, viewModel, bindingContext) =>{
        this.renderMarkdown(element, ko.utils.unwrapObservable(valueAccessor()));
   }
   
   private update = (element, valueAccessor, allBindings, viewModel, bindingContext) => {
        this.renderMarkdown(element, ko.utils.unwrapObservable(valueAccessor()));
   }
}