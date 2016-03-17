import $ = require("jquery");
import ko = require("knockout");
import bootstrap = require("bootstrap");
import router = require("./router");

import tb = require("../bindings/treeBinding");
import md = require("../bindings/markdownBinding");
import tab = require("../bindings/tabBinding");
import mimeicon = require("../bindings/mimetypeIconBinding");
import upload = require("../bindings/uploadBinding");

// Components can be packaged as AMD modules, such as the following:
ko.components.register('nav-bar', { require: 'components/nav-bar/nav-bar' });
ko.components.register('home-page', { require: 'components/home-page/home' });

// ... or for template-only components, you can just point to a .html file directly:
ko.components.register('about-page', {
  template: { require: 'text!components/about-page/about.html' }
});

ko.components.register('project-page', { require: 'components/project-page/project-page' });
ko.components.register('note-tab', { require: 'components/note-tab/note-tab' });
ko.components.register('file-tab', { require: 'components/file-tab/file-tab' });



// [Scaffolded component registrations will be inserted here. To retain this feature, don't remove this comment.]

// Setup custom bindings
new tb.TreeBinding().Register(ko);
new md.MarkdownBinding().Register(ko);
new tab.TabBinding().Register(ko);
new mimeicon.MimetypeIconBinding().Register(ko);
new upload.UploadBinding().Register(ko);

$.getJSON("config.json")
    .done((configValues:any) => {
        $.ajaxSetup({
            beforeSend: (jxhr: JQueryXHR, ajaxSettings: JQueryAjaxSettings) => {
                ajaxSettings.url = configValues.API_BASE_DOMAIN + ajaxSettings.url;
            }
        })

        // Start the application
        ko.applyBindings({ route: router.currentRoute });
    })


