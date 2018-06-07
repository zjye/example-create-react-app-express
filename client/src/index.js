import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import log4js from "log4javascript";

window.myLogger = log4js.getLogger();
const ajaxAppender = new log4js.AjaxAppender("/api/logger");
const layout = new log4js.JsonLayout();
log4js.setShowStackTraces(true);
layout.batchHeader = "";
layout.batchFooter = "";
ajaxAppender.setLayout(layout);
ajaxAppender.addHeader("Content-Type", "application/json");
window.myLogger.addAppender(ajaxAppender);
window.myLogger.addAppender(new log4js.BrowserConsoleAppender());

window.onerror = function(message, source, lineno, colno, error) {
  var errorMsg = `${message} at ${source}`;
  window.myLogger.error(errorMsg, error);
  return true;
};

ReactDOM.render(<App />, document.getElementById("root"));
registerServiceWorker();
