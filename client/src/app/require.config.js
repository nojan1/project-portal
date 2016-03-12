// require.js looks for the following global when initializing
var require = {
    baseUrl: ".",
    paths: {
        "bootstrap":            "bower_modules/components-bootstrap/js/bootstrap.min",
        "crossroads":           "bower_modules/crossroads/dist/crossroads.min",
        "hasher":               "bower_modules/hasher/dist/js/hasher.min",
        "jquery":               "bower_modules/jquery/dist/jquery",
        "knockout":             "bower_modules/knockout/dist/knockout",
        "knockout-projections": "bower_modules/knockout-projections/dist/knockout-projections",
        "signals":              "bower_modules/js-signals/dist/signals.min",
        "text":                 "bower_modules/requirejs-text/text",
        "markdown-it":          "bower_modules/markdown-it/dist/markdown-it.min",
        "jquery-file-upload":   "bower_modules/blueimp-file-upload/js/jquery.fileupload.js",
        "jquery-file-upload-iframe-transport":  "bower_modules/blueimp-file-upload/js/jquery.iframe-transport.js"
    },
    shim: {
        "bootstrap": { deps: ["jquery"] },
        "jquery-file-upload": { deps: ["jquery", "jquery-file-upload-iframe-transport"] }
    }
};
