import cb = require("./custom-binding");
import ko = require("knockout");
import $ = require("jquery");
import moment = require("moment");

export class DateBinding implements cb.CustomBinding {
   public Register(knockout : any){
       knockout.bindingHandlers.date = {
           init: this.processDate,
           update: this.processDate
       };
   }

   private processDate = (element, valueAccessor, allBindings, viewModel, bindingContext) =>{
        var rawDate = ko.utils.unwrapObservable(valueAccessor());
        var formatedDate = moment.unix(rawDate).format(); //TODO: Support custom format
        ko.bindingHandlers.text.update(element, () => formatedDate, allBindings, viewModel, bindingContext);
   }
}