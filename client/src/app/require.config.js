// require.js looks for the following global when initializing
var require = {
    baseUrl: ".",
    paths: {
        "bootstrap":                            "bower_modules/components-bootstrap/js/bootstrap.min",
        "crossroads":                           "bower_modules/crossroads/dist/crossroads.min",
        "hasher":                               "bower_modules/hasher/dist/js/hasher.min",
        "jquery":                               "bower_modules/jquery/dist/jquery",
        "knockout":                             "bower_modules/knockout/dist/knockout",
        "knockout-mapping":                     "bower_modules/knockout-mapping/build/output/knockout.mapping-latest",
        "knockout-projections":                 "bower_modules/knockout-projections/dist/knockout-projections",
        "signals":                              "bower_modules/js-signals/dist/signals.min",
        "text":                                 "bower_modules/requirejs-text/text",
        "markdown-it":                          "bower_modules/markdown-it/dist/markdown-it.min",
        "jquery-file-upload":                   "bower_modules/blueimp-file-upload/js/jquery.fileupload",
        "jquery-file-upload-iframe-transport":  "bower_modules/blueimp-file-upload/js/jquery.iframe-transport",
        "jquery.ui.widget":                     "bower_modules/blueimp-file-upload/js/vendor/jquery.ui.widget",
        "moment":                               "bower_modules/moment/min/moment-with-locales"
    },
    shim: {
        "bootstrap": { deps: ["jquery"] },
        "jquery-file-upload": { deps: ["jquery", "jquery-file-upload-iframe-transport"] }
    }
};
