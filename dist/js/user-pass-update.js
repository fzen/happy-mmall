/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/dist/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/page/user-pass-update/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/_hogan.js@3.0.2@hogan.js/lib/compiler.js":
/*!***************************************************************!*\
  !*** ./node_modules/_hogan.js@3.0.2@hogan.js/lib/compiler.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/*\n *  Copyright 2011 Twitter, Inc.\n *  Licensed under the Apache License, Version 2.0 (the \"License\");\n *  you may not use this file except in compliance with the License.\n *  You may obtain a copy of the License at\n *\n *  http://www.apache.org/licenses/LICENSE-2.0\n *\n *  Unless required by applicable law or agreed to in writing, software\n *  distributed under the License is distributed on an \"AS IS\" BASIS,\n *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n *  See the License for the specific language governing permissions and\n *  limitations under the License.\n */\n\n(function (Hogan) {\n  // Setup regex  assignments\n  // remove whitespace according to Mustache spec\n  var rIsWhitespace = /\\S/,\n      rQuot = /\\\"/g,\n      rNewline =  /\\n/g,\n      rCr = /\\r/g,\n      rSlash = /\\\\/g,\n      rLineSep = /\\u2028/,\n      rParagraphSep = /\\u2029/;\n\n  Hogan.tags = {\n    '#': 1, '^': 2, '<': 3, '$': 4,\n    '/': 5, '!': 6, '>': 7, '=': 8, '_v': 9,\n    '{': 10, '&': 11, '_t': 12\n  };\n\n  Hogan.scan = function scan(text, delimiters) {\n    var len = text.length,\n        IN_TEXT = 0,\n        IN_TAG_TYPE = 1,\n        IN_TAG = 2,\n        state = IN_TEXT,\n        tagType = null,\n        tag = null,\n        buf = '',\n        tokens = [],\n        seenTag = false,\n        i = 0,\n        lineStart = 0,\n        otag = '{{',\n        ctag = '}}';\n\n    function addBuf() {\n      if (buf.length > 0) {\n        tokens.push({tag: '_t', text: new String(buf)});\n        buf = '';\n      }\n    }\n\n    function lineIsWhitespace() {\n      var isAllWhitespace = true;\n      for (var j = lineStart; j < tokens.length; j++) {\n        isAllWhitespace =\n          (Hogan.tags[tokens[j].tag] < Hogan.tags['_v']) ||\n          (tokens[j].tag == '_t' && tokens[j].text.match(rIsWhitespace) === null);\n        if (!isAllWhitespace) {\n          return false;\n        }\n      }\n\n      return isAllWhitespace;\n    }\n\n    function filterLine(haveSeenTag, noNewLine) {\n      addBuf();\n\n      if (haveSeenTag && lineIsWhitespace()) {\n        for (var j = lineStart, next; j < tokens.length; j++) {\n          if (tokens[j].text) {\n            if ((next = tokens[j+1]) && next.tag == '>') {\n              // set indent to token value\n              next.indent = tokens[j].text.toString()\n            }\n            tokens.splice(j, 1);\n          }\n        }\n      } else if (!noNewLine) {\n        tokens.push({tag:'\\n'});\n      }\n\n      seenTag = false;\n      lineStart = tokens.length;\n    }\n\n    function changeDelimiters(text, index) {\n      var close = '=' + ctag,\n          closeIndex = text.indexOf(close, index),\n          delimiters = trim(\n            text.substring(text.indexOf('=', index) + 1, closeIndex)\n          ).split(' ');\n\n      otag = delimiters[0];\n      ctag = delimiters[delimiters.length - 1];\n\n      return closeIndex + close.length - 1;\n    }\n\n    if (delimiters) {\n      delimiters = delimiters.split(' ');\n      otag = delimiters[0];\n      ctag = delimiters[1];\n    }\n\n    for (i = 0; i < len; i++) {\n      if (state == IN_TEXT) {\n        if (tagChange(otag, text, i)) {\n          --i;\n          addBuf();\n          state = IN_TAG_TYPE;\n        } else {\n          if (text.charAt(i) == '\\n') {\n            filterLine(seenTag);\n          } else {\n            buf += text.charAt(i);\n          }\n        }\n      } else if (state == IN_TAG_TYPE) {\n        i += otag.length - 1;\n        tag = Hogan.tags[text.charAt(i + 1)];\n        tagType = tag ? text.charAt(i + 1) : '_v';\n        if (tagType == '=') {\n          i = changeDelimiters(text, i);\n          state = IN_TEXT;\n        } else {\n          if (tag) {\n            i++;\n          }\n          state = IN_TAG;\n        }\n        seenTag = i;\n      } else {\n        if (tagChange(ctag, text, i)) {\n          tokens.push({tag: tagType, n: trim(buf), otag: otag, ctag: ctag,\n                       i: (tagType == '/') ? seenTag - otag.length : i + ctag.length});\n          buf = '';\n          i += ctag.length - 1;\n          state = IN_TEXT;\n          if (tagType == '{') {\n            if (ctag == '}}') {\n              i++;\n            } else {\n              cleanTripleStache(tokens[tokens.length - 1]);\n            }\n          }\n        } else {\n          buf += text.charAt(i);\n        }\n      }\n    }\n\n    filterLine(seenTag, true);\n\n    return tokens;\n  }\n\n  function cleanTripleStache(token) {\n    if (token.n.substr(token.n.length - 1) === '}') {\n      token.n = token.n.substring(0, token.n.length - 1);\n    }\n  }\n\n  function trim(s) {\n    if (s.trim) {\n      return s.trim();\n    }\n\n    return s.replace(/^\\s*|\\s*$/g, '');\n  }\n\n  function tagChange(tag, text, index) {\n    if (text.charAt(index) != tag.charAt(0)) {\n      return false;\n    }\n\n    for (var i = 1, l = tag.length; i < l; i++) {\n      if (text.charAt(index + i) != tag.charAt(i)) {\n        return false;\n      }\n    }\n\n    return true;\n  }\n\n  // the tags allowed inside super templates\n  var allowedInSuper = {'_t': true, '\\n': true, '$': true, '/': true};\n\n  function buildTree(tokens, kind, stack, customTags) {\n    var instructions = [],\n        opener = null,\n        tail = null,\n        token = null;\n\n    tail = stack[stack.length - 1];\n\n    while (tokens.length > 0) {\n      token = tokens.shift();\n\n      if (tail && tail.tag == '<' && !(token.tag in allowedInSuper)) {\n        throw new Error('Illegal content in < super tag.');\n      }\n\n      if (Hogan.tags[token.tag] <= Hogan.tags['$'] || isOpener(token, customTags)) {\n        stack.push(token);\n        token.nodes = buildTree(tokens, token.tag, stack, customTags);\n      } else if (token.tag == '/') {\n        if (stack.length === 0) {\n          throw new Error('Closing tag without opener: /' + token.n);\n        }\n        opener = stack.pop();\n        if (token.n != opener.n && !isCloser(token.n, opener.n, customTags)) {\n          throw new Error('Nesting error: ' + opener.n + ' vs. ' + token.n);\n        }\n        opener.end = token.i;\n        return instructions;\n      } else if (token.tag == '\\n') {\n        token.last = (tokens.length == 0) || (tokens[0].tag == '\\n');\n      }\n\n      instructions.push(token);\n    }\n\n    if (stack.length > 0) {\n      throw new Error('missing closing tag: ' + stack.pop().n);\n    }\n\n    return instructions;\n  }\n\n  function isOpener(token, tags) {\n    for (var i = 0, l = tags.length; i < l; i++) {\n      if (tags[i].o == token.n) {\n        token.tag = '#';\n        return true;\n      }\n    }\n  }\n\n  function isCloser(close, open, tags) {\n    for (var i = 0, l = tags.length; i < l; i++) {\n      if (tags[i].c == close && tags[i].o == open) {\n        return true;\n      }\n    }\n  }\n\n  function stringifySubstitutions(obj) {\n    var items = [];\n    for (var key in obj) {\n      items.push('\"' + esc(key) + '\": function(c,p,t,i) {' + obj[key] + '}');\n    }\n    return \"{ \" + items.join(\",\") + \" }\";\n  }\n\n  function stringifyPartials(codeObj) {\n    var partials = [];\n    for (var key in codeObj.partials) {\n      partials.push('\"' + esc(key) + '\":{name:\"' + esc(codeObj.partials[key].name) + '\", ' + stringifyPartials(codeObj.partials[key]) + \"}\");\n    }\n    return \"partials: {\" + partials.join(\",\") + \"}, subs: \" + stringifySubstitutions(codeObj.subs);\n  }\n\n  Hogan.stringify = function(codeObj, text, options) {\n    return \"{code: function (c,p,i) { \" + Hogan.wrapMain(codeObj.code) + \" },\" + stringifyPartials(codeObj) +  \"}\";\n  }\n\n  var serialNo = 0;\n  Hogan.generate = function(tree, text, options) {\n    serialNo = 0;\n    var context = { code: '', subs: {}, partials: {} };\n    Hogan.walk(tree, context);\n\n    if (options.asString) {\n      return this.stringify(context, text, options);\n    }\n\n    return this.makeTemplate(context, text, options);\n  }\n\n  Hogan.wrapMain = function(code) {\n    return 'var t=this;t.b(i=i||\"\");' + code + 'return t.fl();';\n  }\n\n  Hogan.template = Hogan.Template;\n\n  Hogan.makeTemplate = function(codeObj, text, options) {\n    var template = this.makePartials(codeObj);\n    template.code = new Function('c', 'p', 'i', this.wrapMain(codeObj.code));\n    return new this.template(template, text, this, options);\n  }\n\n  Hogan.makePartials = function(codeObj) {\n    var key, template = {subs: {}, partials: codeObj.partials, name: codeObj.name};\n    for (key in template.partials) {\n      template.partials[key] = this.makePartials(template.partials[key]);\n    }\n    for (key in codeObj.subs) {\n      template.subs[key] = new Function('c', 'p', 't', 'i', codeObj.subs[key]);\n    }\n    return template;\n  }\n\n  function esc(s) {\n    return s.replace(rSlash, '\\\\\\\\')\n            .replace(rQuot, '\\\\\\\"')\n            .replace(rNewline, '\\\\n')\n            .replace(rCr, '\\\\r')\n            .replace(rLineSep, '\\\\u2028')\n            .replace(rParagraphSep, '\\\\u2029');\n  }\n\n  function chooseMethod(s) {\n    return (~s.indexOf('.')) ? 'd' : 'f';\n  }\n\n  function createPartial(node, context) {\n    var prefix = \"<\" + (context.prefix || \"\");\n    var sym = prefix + node.n + serialNo++;\n    context.partials[sym] = {name: node.n, partials: {}};\n    context.code += 't.b(t.rp(\"' +  esc(sym) + '\",c,p,\"' + (node.indent || '') + '\"));';\n    return sym;\n  }\n\n  Hogan.codegen = {\n    '#': function(node, context) {\n      context.code += 'if(t.s(t.' + chooseMethod(node.n) + '(\"' + esc(node.n) + '\",c,p,1),' +\n                      'c,p,0,' + node.i + ',' + node.end + ',\"' + node.otag + \" \" + node.ctag + '\")){' +\n                      't.rs(c,p,' + 'function(c,p,t){';\n      Hogan.walk(node.nodes, context);\n      context.code += '});c.pop();}';\n    },\n\n    '^': function(node, context) {\n      context.code += 'if(!t.s(t.' + chooseMethod(node.n) + '(\"' + esc(node.n) + '\",c,p,1),c,p,1,0,0,\"\")){';\n      Hogan.walk(node.nodes, context);\n      context.code += '};';\n    },\n\n    '>': createPartial,\n    '<': function(node, context) {\n      var ctx = {partials: {}, code: '', subs: {}, inPartial: true};\n      Hogan.walk(node.nodes, ctx);\n      var template = context.partials[createPartial(node, context)];\n      template.subs = ctx.subs;\n      template.partials = ctx.partials;\n    },\n\n    '$': function(node, context) {\n      var ctx = {subs: {}, code: '', partials: context.partials, prefix: node.n};\n      Hogan.walk(node.nodes, ctx);\n      context.subs[node.n] = ctx.code;\n      if (!context.inPartial) {\n        context.code += 't.sub(\"' + esc(node.n) + '\",c,p,i);';\n      }\n    },\n\n    '\\n': function(node, context) {\n      context.code += write('\"\\\\n\"' + (node.last ? '' : ' + i'));\n    },\n\n    '_v': function(node, context) {\n      context.code += 't.b(t.v(t.' + chooseMethod(node.n) + '(\"' + esc(node.n) + '\",c,p,0)));';\n    },\n\n    '_t': function(node, context) {\n      context.code += write('\"' + esc(node.text) + '\"');\n    },\n\n    '{': tripleStache,\n\n    '&': tripleStache\n  }\n\n  function tripleStache(node, context) {\n    context.code += 't.b(t.t(t.' + chooseMethod(node.n) + '(\"' + esc(node.n) + '\",c,p,0)));';\n  }\n\n  function write(s) {\n    return 't.b(' + s + ');';\n  }\n\n  Hogan.walk = function(nodelist, context) {\n    var func;\n    for (var i = 0, l = nodelist.length; i < l; i++) {\n      func = Hogan.codegen[nodelist[i].tag];\n      func && func(nodelist[i], context);\n    }\n    return context;\n  }\n\n  Hogan.parse = function(tokens, text, options) {\n    options = options || {};\n    return buildTree(tokens, '', [], options.sectionTags || []);\n  }\n\n  Hogan.cache = {};\n\n  Hogan.cacheKey = function(text, options) {\n    return [text, !!options.asString, !!options.disableLambda, options.delimiters, !!options.modelGet].join('||');\n  }\n\n  Hogan.compile = function(text, options) {\n    options = options || {};\n    var key = Hogan.cacheKey(text, options);\n    var template = this.cache[key];\n\n    if (template) {\n      var partials = template.partials;\n      for (var name in partials) {\n        delete partials[name].instance;\n      }\n      return template;\n    }\n\n    template = this.generate(this.parse(this.scan(text, options.delimiters), text, options), text, options);\n    return this.cache[key] = template;\n  }\n})( true ? exports : undefined);\n\n\n//# sourceURL=webpack:///./node_modules/_hogan.js@3.0.2@hogan.js/lib/compiler.js?");

/***/ }),

/***/ "./node_modules/_hogan.js@3.0.2@hogan.js/lib/hogan.js":
/*!************************************************************!*\
  !*** ./node_modules/_hogan.js@3.0.2@hogan.js/lib/hogan.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/*\n *  Copyright 2011 Twitter, Inc.\n *  Licensed under the Apache License, Version 2.0 (the \"License\");\n *  you may not use this file except in compliance with the License.\n *  You may obtain a copy of the License at\n *\n *  http://www.apache.org/licenses/LICENSE-2.0\n *\n *  Unless required by applicable law or agreed to in writing, software\n *  distributed under the License is distributed on an \"AS IS\" BASIS,\n *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n *  See the License for the specific language governing permissions and\n *  limitations under the License.\n */\n\n// This file is for use with Node.js. See dist/ for browser files.\n\nvar Hogan = __webpack_require__(/*! ./compiler */ \"./node_modules/_hogan.js@3.0.2@hogan.js/lib/compiler.js\");\nHogan.Template = __webpack_require__(/*! ./template */ \"./node_modules/_hogan.js@3.0.2@hogan.js/lib/template.js\").Template;\nHogan.template = Hogan.Template;\nmodule.exports = Hogan;\n\n\n//# sourceURL=webpack:///./node_modules/_hogan.js@3.0.2@hogan.js/lib/hogan.js?");

/***/ }),

/***/ "./node_modules/_hogan.js@3.0.2@hogan.js/lib/template.js":
/*!***************************************************************!*\
  !*** ./node_modules/_hogan.js@3.0.2@hogan.js/lib/template.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/*\n *  Copyright 2011 Twitter, Inc.\n *  Licensed under the Apache License, Version 2.0 (the \"License\");\n *  you may not use this file except in compliance with the License.\n *  You may obtain a copy of the License at\n *\n *  http://www.apache.org/licenses/LICENSE-2.0\n *\n *  Unless required by applicable law or agreed to in writing, software\n *  distributed under the License is distributed on an \"AS IS\" BASIS,\n *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n *  See the License for the specific language governing permissions and\n *  limitations under the License.\n */\n\nvar Hogan = {};\n\n(function (Hogan) {\n  Hogan.Template = function (codeObj, text, compiler, options) {\n    codeObj = codeObj || {};\n    this.r = codeObj.code || this.r;\n    this.c = compiler;\n    this.options = options || {};\n    this.text = text || '';\n    this.partials = codeObj.partials || {};\n    this.subs = codeObj.subs || {};\n    this.buf = '';\n  }\n\n  Hogan.Template.prototype = {\n    // render: replaced by generated code.\n    r: function (context, partials, indent) { return ''; },\n\n    // variable escaping\n    v: hoganEscape,\n\n    // triple stache\n    t: coerceToString,\n\n    render: function render(context, partials, indent) {\n      return this.ri([context], partials || {}, indent);\n    },\n\n    // render internal -- a hook for overrides that catches partials too\n    ri: function (context, partials, indent) {\n      return this.r(context, partials, indent);\n    },\n\n    // ensurePartial\n    ep: function(symbol, partials) {\n      var partial = this.partials[symbol];\n\n      // check to see that if we've instantiated this partial before\n      var template = partials[partial.name];\n      if (partial.instance && partial.base == template) {\n        return partial.instance;\n      }\n\n      if (typeof template == 'string') {\n        if (!this.c) {\n          throw new Error(\"No compiler available.\");\n        }\n        template = this.c.compile(template, this.options);\n      }\n\n      if (!template) {\n        return null;\n      }\n\n      // We use this to check whether the partials dictionary has changed\n      this.partials[symbol].base = template;\n\n      if (partial.subs) {\n        // Make sure we consider parent template now\n        if (!partials.stackText) partials.stackText = {};\n        for (key in partial.subs) {\n          if (!partials.stackText[key]) {\n            partials.stackText[key] = (this.activeSub !== undefined && partials.stackText[this.activeSub]) ? partials.stackText[this.activeSub] : this.text;\n          }\n        }\n        template = createSpecializedPartial(template, partial.subs, partial.partials,\n          this.stackSubs, this.stackPartials, partials.stackText);\n      }\n      this.partials[symbol].instance = template;\n\n      return template;\n    },\n\n    // tries to find a partial in the current scope and render it\n    rp: function(symbol, context, partials, indent) {\n      var partial = this.ep(symbol, partials);\n      if (!partial) {\n        return '';\n      }\n\n      return partial.ri(context, partials, indent);\n    },\n\n    // render a section\n    rs: function(context, partials, section) {\n      var tail = context[context.length - 1];\n\n      if (!isArray(tail)) {\n        section(context, partials, this);\n        return;\n      }\n\n      for (var i = 0; i < tail.length; i++) {\n        context.push(tail[i]);\n        section(context, partials, this);\n        context.pop();\n      }\n    },\n\n    // maybe start a section\n    s: function(val, ctx, partials, inverted, start, end, tags) {\n      var pass;\n\n      if (isArray(val) && val.length === 0) {\n        return false;\n      }\n\n      if (typeof val == 'function') {\n        val = this.ms(val, ctx, partials, inverted, start, end, tags);\n      }\n\n      pass = !!val;\n\n      if (!inverted && pass && ctx) {\n        ctx.push((typeof val == 'object') ? val : ctx[ctx.length - 1]);\n      }\n\n      return pass;\n    },\n\n    // find values with dotted names\n    d: function(key, ctx, partials, returnFound) {\n      var found,\n          names = key.split('.'),\n          val = this.f(names[0], ctx, partials, returnFound),\n          doModelGet = this.options.modelGet,\n          cx = null;\n\n      if (key === '.' && isArray(ctx[ctx.length - 2])) {\n        val = ctx[ctx.length - 1];\n      } else {\n        for (var i = 1; i < names.length; i++) {\n          found = findInScope(names[i], val, doModelGet);\n          if (found !== undefined) {\n            cx = val;\n            val = found;\n          } else {\n            val = '';\n          }\n        }\n      }\n\n      if (returnFound && !val) {\n        return false;\n      }\n\n      if (!returnFound && typeof val == 'function') {\n        ctx.push(cx);\n        val = this.mv(val, ctx, partials);\n        ctx.pop();\n      }\n\n      return val;\n    },\n\n    // find values with normal names\n    f: function(key, ctx, partials, returnFound) {\n      var val = false,\n          v = null,\n          found = false,\n          doModelGet = this.options.modelGet;\n\n      for (var i = ctx.length - 1; i >= 0; i--) {\n        v = ctx[i];\n        val = findInScope(key, v, doModelGet);\n        if (val !== undefined) {\n          found = true;\n          break;\n        }\n      }\n\n      if (!found) {\n        return (returnFound) ? false : \"\";\n      }\n\n      if (!returnFound && typeof val == 'function') {\n        val = this.mv(val, ctx, partials);\n      }\n\n      return val;\n    },\n\n    // higher order templates\n    ls: function(func, cx, partials, text, tags) {\n      var oldTags = this.options.delimiters;\n\n      this.options.delimiters = tags;\n      this.b(this.ct(coerceToString(func.call(cx, text)), cx, partials));\n      this.options.delimiters = oldTags;\n\n      return false;\n    },\n\n    // compile text\n    ct: function(text, cx, partials) {\n      if (this.options.disableLambda) {\n        throw new Error('Lambda features disabled.');\n      }\n      return this.c.compile(text, this.options).render(cx, partials);\n    },\n\n    // template result buffering\n    b: function(s) { this.buf += s; },\n\n    fl: function() { var r = this.buf; this.buf = ''; return r; },\n\n    // method replace section\n    ms: function(func, ctx, partials, inverted, start, end, tags) {\n      var textSource,\n          cx = ctx[ctx.length - 1],\n          result = func.call(cx);\n\n      if (typeof result == 'function') {\n        if (inverted) {\n          return true;\n        } else {\n          textSource = (this.activeSub && this.subsText && this.subsText[this.activeSub]) ? this.subsText[this.activeSub] : this.text;\n          return this.ls(result, cx, partials, textSource.substring(start, end), tags);\n        }\n      }\n\n      return result;\n    },\n\n    // method replace variable\n    mv: function(func, ctx, partials) {\n      var cx = ctx[ctx.length - 1];\n      var result = func.call(cx);\n\n      if (typeof result == 'function') {\n        return this.ct(coerceToString(result.call(cx)), cx, partials);\n      }\n\n      return result;\n    },\n\n    sub: function(name, context, partials, indent) {\n      var f = this.subs[name];\n      if (f) {\n        this.activeSub = name;\n        f(context, partials, this, indent);\n        this.activeSub = false;\n      }\n    }\n\n  };\n\n  //Find a key in an object\n  function findInScope(key, scope, doModelGet) {\n    var val;\n\n    if (scope && typeof scope == 'object') {\n\n      if (scope[key] !== undefined) {\n        val = scope[key];\n\n      // try lookup with get for backbone or similar model data\n      } else if (doModelGet && scope.get && typeof scope.get == 'function') {\n        val = scope.get(key);\n      }\n    }\n\n    return val;\n  }\n\n  function createSpecializedPartial(instance, subs, partials, stackSubs, stackPartials, stackText) {\n    function PartialTemplate() {};\n    PartialTemplate.prototype = instance;\n    function Substitutions() {};\n    Substitutions.prototype = instance.subs;\n    var key;\n    var partial = new PartialTemplate();\n    partial.subs = new Substitutions();\n    partial.subsText = {};  //hehe. substext.\n    partial.buf = '';\n\n    stackSubs = stackSubs || {};\n    partial.stackSubs = stackSubs;\n    partial.subsText = stackText;\n    for (key in subs) {\n      if (!stackSubs[key]) stackSubs[key] = subs[key];\n    }\n    for (key in stackSubs) {\n      partial.subs[key] = stackSubs[key];\n    }\n\n    stackPartials = stackPartials || {};\n    partial.stackPartials = stackPartials;\n    for (key in partials) {\n      if (!stackPartials[key]) stackPartials[key] = partials[key];\n    }\n    for (key in stackPartials) {\n      partial.partials[key] = stackPartials[key];\n    }\n\n    return partial;\n  }\n\n  var rAmp = /&/g,\n      rLt = /</g,\n      rGt = />/g,\n      rApos = /\\'/g,\n      rQuot = /\\\"/g,\n      hChars = /[&<>\\\"\\']/;\n\n  function coerceToString(val) {\n    return String((val === null || val === undefined) ? '' : val);\n  }\n\n  function hoganEscape(str) {\n    str = coerceToString(str);\n    return hChars.test(str) ?\n      str\n        .replace(rAmp, '&amp;')\n        .replace(rLt, '&lt;')\n        .replace(rGt, '&gt;')\n        .replace(rApos, '&#39;')\n        .replace(rQuot, '&quot;') :\n      str;\n  }\n\n  var isArray = Array.isArray || function(a) {\n    return Object.prototype.toString.call(a) === '[object Array]';\n  };\n\n})( true ? exports : undefined);\n\n\n//# sourceURL=webpack:///./node_modules/_hogan.js@3.0.2@hogan.js/lib/template.js?");

/***/ }),

/***/ "./src/page/common/crumb/index.css":
/*!*****************************************!*\
  !*** ./src/page/common/crumb/index.css ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("// removed by extract-text-webpack-plugin\n\n//# sourceURL=webpack:///./src/page/common/crumb/index.css?");

/***/ }),

/***/ "./src/page/common/crumb/index.js":
/*!****************************************!*\
  !*** ./src/page/common/crumb/index.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("__webpack_require__(/*! ./index.css */ \"./src/page/common/crumb/index.css\")\n\n//# sourceURL=webpack:///./src/page/common/crumb/index.js?");

/***/ }),

/***/ "./src/page/common/footer/index.css":
/*!******************************************!*\
  !*** ./src/page/common/footer/index.css ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("// removed by extract-text-webpack-plugin\n\n//# sourceURL=webpack:///./src/page/common/footer/index.css?");

/***/ }),

/***/ "./src/page/common/footer/index.js":
/*!*****************************************!*\
  !*** ./src/page/common/footer/index.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("__webpack_require__(/*! ./index.css */ \"./src/page/common/footer/index.css\")\r\n\r\n\n\n//# sourceURL=webpack:///./src/page/common/footer/index.js?");

/***/ }),

/***/ "./src/page/common/header/index.css":
/*!******************************************!*\
  !*** ./src/page/common/header/index.css ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("// removed by extract-text-webpack-plugin\n\n//# sourceURL=webpack:///./src/page/common/header/index.css?");

/***/ }),

/***/ "./src/page/common/header/index.js":
/*!*****************************************!*\
  !*** ./src/page/common/header/index.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("__webpack_require__(/*! ./index.css */ \"./src/page/common/header/index.css\")\r\nvar _mm = __webpack_require__(/*! util/mm.js */ \"./src/util/mm.js\")\r\n\r\n// 通用页面头部\r\nvar header = {\r\n    init: function(){\r\n        this.onload()\r\n        this.bindEvent()\r\n    },\r\n    // 如果是通过搜索跳转到当前页面，将搜索关键词回填搜索框\r\n    onload: function(){\r\n        var keyword = _mm.getUrlParam('keyword')\r\n        if(keyword){\r\n            $('#search-input').val(keyword);\r\n        }\r\n    },\r\n    bindEvent: function (){ \r\n        var _this = this\r\n        // 点击按钮提交搜索\r\n        $('#search-btn').on('click', function () {\r\n            _this.searchSubmit()\r\n        })\r\n        // 输入框按回车提交搜索\r\n        $('#search-input').on('keyup',function (e) {\r\n            if(e.keyCode === 13){\r\n                _this.searchSubmit()\r\n            }\r\n        })\r\n    },\r\n    searchSubmit: function(){\r\n        var keyword = $('#search-input').val();\r\n        if(keyword){\r\n            window.location.href = './list.html?keyword='+keyword\r\n        }else {\r\n            _mm.goHome()\r\n        }\r\n    }\r\n}\r\nheader.init()\n\n//# sourceURL=webpack:///./src/page/common/header/index.js?");

/***/ }),

/***/ "./src/page/common/nav-side/index.css":
/*!********************************************!*\
  !*** ./src/page/common/nav-side/index.css ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("// removed by extract-text-webpack-plugin\n\n//# sourceURL=webpack:///./src/page/common/nav-side/index.css?");

/***/ }),

/***/ "./src/page/common/nav-side/index.js":
/*!*******************************************!*\
  !*** ./src/page/common/nav-side/index.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("__webpack_require__(/*! ./index.css */ \"./src/page/common/nav-side/index.css\")\r\nvar _mm = __webpack_require__(/*! util/mm.js */ \"./src/util/mm.js\")\r\nvar template = __webpack_require__(/*! ./template.string */ \"./src/page/common/nav-side/template.string\")\r\n\r\nvar navSide = {\r\n    options: {\r\n        // 当前页面\r\n        name: 'user-center',\r\n        navList: [\r\n            {name: 'user-center', desc: '个人中心', href: './user-center.html'},\r\n            {name: 'order-list', desc: '我的订单', href: './order-list.html'},\r\n            {name: 'pass-update', desc: '修改密码', href: './user-pass-update.html'},\r\n            {name: 'about', desc: '关于MMALL', href: './about.html'}\r\n        ]\r\n    },\r\n    init: function(options){\r\n        // 合并选项\r\n        $.extend(this.options, options)\r\n        this.renderNav(template,this.options.navList)\r\n    },\r\n    renderNav: function () {\r\n        // 找出active类\r\n        for(var i=0, navListLength=this.options.navList.length; i<navListLength; i++){\r\n            if(this.options.navList[i].name === this.options.name){\r\n                this.options.navList[i].isActive = true\r\n            }\r\n        }\r\n        // 渲染模版\r\n        var navHtml = _mm.renderHtml(template,{navList:this.options.navList})\r\n        $('.nav-side').html(navHtml)\r\n    }\r\n    \r\n}\r\n\r\nmodule.exports = navSide\n\n//# sourceURL=webpack:///./src/page/common/nav-side/index.js?");

/***/ }),

/***/ "./src/page/common/nav-side/template.string":
/*!**************************************************!*\
  !*** ./src/page/common/nav-side/template.string ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = \"{{#navList}} {{#isActive}} <li class=\\\"nav-item active\\\"> {{/isActive}} {{^isActive}} </li><li class=\\\"nav-item\\\"> {{/isActive}} <a href=\\\"{{href}}\\\" class=\\\"link\\\">{{desc}}</a> </li> {{/navList}}\";\n\n//# sourceURL=webpack:///./src/page/common/nav-side/template.string?");

/***/ }),

/***/ "./src/page/common/nav/index.css":
/*!***************************************!*\
  !*** ./src/page/common/nav/index.css ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("// removed by extract-text-webpack-plugin\n\n//# sourceURL=webpack:///./src/page/common/nav/index.css?");

/***/ }),

/***/ "./src/page/common/nav/index.js":
/*!**************************************!*\
  !*** ./src/page/common/nav/index.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("__webpack_require__(/*! ./index.css */ \"./src/page/common/nav/index.css\")\r\nvar _mm = __webpack_require__(/*! util/mm.js */ \"./src/util/mm.js\")\r\nvar _user = __webpack_require__(/*! service/user-service.js */ \"./src/service/user-service.js\")\r\nvar _cart = __webpack_require__(/*! service/cart-service.js */ \"./src/service/cart-service.js\")\r\n\r\n// 导航条\r\nvar nav = {\r\n    init: function(){\r\n        this.bindEvent()\r\n        this.loadUserInfo()\r\n        this.loadCartCount()\r\n        return this\r\n    },\r\n    bindEvent: function(){\r\n        // 登录点击事件\r\n        $('.js-login').on('click',function(){\r\n            _mm.doLogin()\r\n        })\r\n        // 注册点击事件\r\n        $('.js-register').on('click',function(){\r\n            window.location.href = './register.html'\r\n        })\r\n        // 退出登录点击事件\r\n        $('.js-logout').on('click',function(){\r\n            _user.logout(\r\n                function(res){\r\n                    window.location.reload()\r\n                },\r\n                function(errMsg){\r\n                    _mm.errorTips(errMsg)\r\n                }\r\n            )\r\n        })\r\n    },\r\n    // 加载用户信息\r\n    loadUserInfo: function(){\r\n        _user.checkLogin(\r\n            // 已登录\r\n            function(res){\r\n                $('.user.not-login').hide()\r\n                    .siblings('.user.login').show()\r\n                    .find('.username').text(res.username)\r\n            },\r\n            // 未登录\r\n            function(){}\r\n        )\r\n    },\r\n    // 加载购物车数量\r\n    loadCartCount: function(){\r\n        _cart.getCartCount(\r\n            // 获取成功\r\n            function(res){\r\n                $('.nav .cart-count').text(res)\r\n            },\r\n            // 获取失败\r\n            function(errMsg){\r\n                $('.nav .cart-count').text(0)                \r\n            }\r\n        )\r\n    }\r\n}\r\n\r\nmodule.exports = nav.init()\n\n//# sourceURL=webpack:///./src/page/common/nav/index.js?");

/***/ }),

/***/ "./src/page/user-pass-update/index.css":
/*!*********************************************!*\
  !*** ./src/page/user-pass-update/index.css ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("// removed by extract-text-webpack-plugin\n\n//# sourceURL=webpack:///./src/page/user-pass-update/index.css?");

/***/ }),

/***/ "./src/page/user-pass-update/index.js":
/*!********************************************!*\
  !*** ./src/page/user-pass-update/index.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("__webpack_require__(/*! page/common/nav/index.js */ \"./src/page/common/nav/index.js\")\r\n__webpack_require__(/*! page/common/header/index.js */ \"./src/page/common/header/index.js\")\r\n__webpack_require__(/*! page/common/footer/index.js */ \"./src/page/common/footer/index.js\")\r\n__webpack_require__(/*! page/common/crumb/index.js */ \"./src/page/common/crumb/index.js\")\r\n__webpack_require__(/*! ./index.css */ \"./src/page/user-pass-update/index.css\")\r\nvar navSide = __webpack_require__(/*! page/common/nav-side/index.js */ \"./src/page/common/nav-side/index.js\")\r\nvar _mm = __webpack_require__(/*! util/mm.js */ \"./src/util/mm.js\")\r\nvar _user = __webpack_require__(/*! service/user-service.js */ \"./src/service/user-service.js\")\r\n\r\n\r\nvar page = {\r\n    init: function(){\r\n        // 初始化左侧边栏\r\n        navSide.init({\r\n            name: 'pass-update'\r\n        })\r\n        // 监听提交事件\r\n        this.bindEvent()\r\n    },\r\n    bindEvent: function(){\r\n        _this = this\r\n        $('.btn-submit').on('click',function(){\r\n            var userInfo = {\r\n                oldPassword: $.trim($('#oldPassword').val()),\r\n                newPassword: $.trim($('#newPassword').val()),\r\n                checkNewPassword: $.trim($('#checkNewPassword').val())\r\n            }\r\n            validateResult = _this.formValidate(userInfo)\r\n            if (validateResult.status){\r\n                _user.resetPasswordOnLogin({\r\n                    passwordOld: userInfo.oldPassword,\r\n                    passwordNew: userInfo.newPassword\r\n                },function(){\r\n                    window.location.href = './result.html?type=updatePassword'\r\n                },function(msg){\r\n                    _mm.errorTips(msg)\r\n                })\r\n            }else {\r\n                _mm.errorTips(validateResult.msg)\r\n            }\r\n        })\r\n    },\r\n    formValidate: function(formData){\r\n        var result = {\r\n            status: false,\r\n            msg: ''\r\n        }\r\n        if(formData.oldPassword.length<6 || formData.newPassword.length<6 || formData.checkNewPassword.length<6){\r\n            result.msg = '密码长度不少于6位！'\r\n            return result\r\n        }\r\n        if(formData.newPassword != formData.checkNewPassword){\r\n            result.msg = '两次密码输入不一致！'\r\n            return result\r\n        }\r\n\r\n        result.status = true\r\n        return result\r\n    }\r\n}\r\n\r\npage.init()\r\n\n\n//# sourceURL=webpack:///./src/page/user-pass-update/index.js?");

/***/ }),

/***/ "./src/service/cart-service.js":
/*!*************************************!*\
  !*** ./src/service/cart-service.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var _mm = __webpack_require__(/*! util/mm.js */ \"./src/util/mm.js\")\r\n\r\nvar _cart = {\r\n    // 获取购物车商品数量\r\n    getCartCount: function(resolve,reject){\r\n        _mm.request({\r\n            url: _mm.getServerUrl('/cart/get_cart_product_count.do'),\r\n            success: resolve,\r\n            error: reject\r\n        })\r\n    },\r\n    // 添加到购物车\r\n    addToCart: function(productInfo,resolve,reject) {\r\n        _mm.request({\r\n            url: _mm.getServerUrl('/cart/add.do'),\r\n            data: productInfo,\r\n            success: resolve,\r\n            error: reject,\r\n        })\r\n    }\r\n}\r\n\r\nmodule.exports = _cart\n\n//# sourceURL=webpack:///./src/service/cart-service.js?");

/***/ }),

/***/ "./src/service/user-service.js":
/*!*************************************!*\
  !*** ./src/service/user-service.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var _mm = __webpack_require__(/*! util/mm.js */ \"./src/util/mm.js\")\r\n\r\nvar _user = {\r\n    // 用户注册\r\n    register: function(userInfo,resolve,reject){\r\n        _mm.request({\r\n            method: 'POST',\r\n            url: _mm.getServerUrl('/user/register.do'),\r\n            data: userInfo,\r\n            success: resolve,\r\n            error: reject\r\n        })\r\n    },\r\n    // 用户登录\r\n    login: function(userInfo,resolve,reject){\r\n        _mm.request({\r\n            method: 'POST',\r\n            url: _mm.getServerUrl('/user/login.do'),\r\n            data: userInfo,\r\n            success: resolve,\r\n            error: reject\r\n        })\r\n    },\r\n    // 退出登录\r\n    logout: function(resolve,reject){\r\n        _mm.request({\r\n            method: 'POST',\r\n            url: _mm.getServerUrl('/user/logout.do'),\r\n            success: resolve,\r\n            error: reject\r\n        })\r\n    },\r\n    // 检查登录状态\r\n    checkLogin: function(resolve,reject){\r\n        _mm.request({\r\n            method: 'POST',\r\n            url: _mm.getServerUrl('/user/get_user_info.do'),\r\n            success: resolve,\r\n            error: reject\r\n        })\r\n    },\r\n    // 找回密码--获取用户密码提示问题\r\n    getQuestion: function (username,resolve, reject) { console.log(username)\r\n        _mm.request({  \r\n            method: 'POST',\r\n            url: _mm.getServerUrl('/user/forget_get_question.do'),\r\n            data: {\r\n                username: username\r\n            },\r\n            success: resolve,\r\n            error: reject\r\n        })\r\n    },\r\n    // 找回密码--验证密码提示答案\r\n    checkAnswer: function (userInfo,resolve, reject) {\r\n        _mm.request({\r\n            method: 'POST',\r\n            url: _mm.getServerUrl('/user/forget_check_answer.do'),\r\n            data: userInfo,\r\n            success: resolve,\r\n            error: reject\r\n        })\r\n    },\r\n    // 找回密码--重置密码\r\n    resetPassword: function (userInfo, resolve, reject) {\r\n        _mm.request({\r\n            method: 'POST',\r\n            url: _mm.getServerUrl('/user/forget_reset_password.do'),\r\n            data: userInfo,\r\n            success: resolve,\r\n            error: reject\r\n        })\r\n    },\r\n    // 登录状态下--重置密码\r\n    resetPasswordOnLogin: function (userInfo, resolve, reject) {\r\n        _mm.request({\r\n            method: 'POST',\r\n            url: _mm.getServerUrl('/user/reset_password.do'),\r\n            data: userInfo,\r\n            success: resolve,\r\n            error: reject\r\n        })\r\n    },\r\n    // 登录状态更新个人信息\r\n    updateInfo: function (userInfo, resolve, reject) {\r\n        _mm.request({\r\n            method: 'POST',\r\n            url: _mm.getServerUrl('/user/update_information.do'),\r\n            data: userInfo,\r\n            success: resolve,\r\n            error: reject\r\n        })\r\n    },\r\n    // 获取全部用户信息\r\n    getUserInfo: function (resolve, reject) {\r\n        _mm.request({\r\n            method: 'POST',\r\n            url: _mm.getServerUrl('/user/get_information.do'),\r\n            success: resolve,\r\n            error: reject\r\n        })\r\n    },    \r\n    // 检查用户名是否可用\r\n    checkUserName: function(username,resolve,reject){\r\n        _mm.request({\r\n            method: 'POST',\r\n            url: _mm.getServerUrl('/user/check_valid.do'),\r\n            data: {\r\n                type: 'username',\r\n                str: username\r\n            },\r\n            success: resolve,\r\n            error: reject\r\n        })\r\n    }\r\n}\r\n\r\nmodule.exports = _user\n\n//# sourceURL=webpack:///./src/service/user-service.js?");

/***/ }),

/***/ "./src/util/mm.js":
/*!************************!*\
  !*** ./src/util/mm.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var Hogan = __webpack_require__(/*! hogan.js */ \"./node_modules/_hogan.js@3.0.2@hogan.js/lib/hogan.js\")\r\n\r\nvar conf = {\r\n    serverHost: ''\r\n}\r\n\r\nvar _mm = {\r\n    // 封装网络请求工具\r\n    request: function(param){\r\n        var _this = this\r\n        $.ajax({\r\n            type: param.method || 'get',\r\n            url: param.url || '',\r\n            dataType: param.type || 'json',\r\n            data: param.data || '',\r\n            // 这里是网络请求成功\r\n            success: function(res){  \r\n                // 这里是与后端约定status为0时成功\r\n                if(res.status === 0){\r\n                    typeof param.success === 'function' && param.success(res.data, res.msg)\r\n                // 后端返回 10 说明需要登录，跳转到登录页面\r\n                }else if(res.status === 10){\r\n                    _this.doLogin()\r\n                //请求数据错误\r\n                }else if(res.status === 1){\r\n                    typeof param.error === 'function' && param.error(res.msg)\r\n                }\r\n            },\r\n            error: function(err){\r\n                typeof param.error === 'function' && param.error(err.statusText)\r\n            }\r\n        })\r\n    },\r\n    // 获取服务器地址\r\n    getServerUrl: function(path){\r\n        return conf.serverHost + path\r\n    },\r\n    // 获取url参数\r\n    getUrlParam: function(name){\r\n        var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')    // 匹配 以 name 开头或 & 开头，那后面接 = ，= 后面是任意个不是 & 的字符，最后碰到&或到尾部停止。\r\n        var result =  window.location.search.slice(1).match(reg)  // match方法如果能匹配到的话，返回一个数组，数组第一项是匹配到的结果，后面依次是正则里括号中匹配的内容，再后面是index和input两个固定参数\r\n        return result ? decodeURIComponent(result[2]) : null\r\n    },\r\n    // 渲染html模版\r\n    renderHtml: function(htmlTemplate,data){\r\n        var template = Hogan.compile(htmlTemplate)\r\n        var result = template.render(data)\r\n        return result\r\n    },\r\n    // 成功提示\r\n    successTips: function(msg){\r\n        alert(msg||'操作成功！')\r\n    },\r\n    // 错误提示\r\n    errorTips: function(msg){\r\n        alert(msg||'哪里不对了吧')\r\n    },\r\n    // 字段验证，支持是非空判断、手机号判断、邮箱判断\r\n    validate: function(value,type){\r\n        var value = $.trim(value)\r\n        // 非空验证\r\n        if(type === 'required'){\r\n            return !!value\r\n        }\r\n        // 手机号验证\r\n        if(type === 'phone'){\r\n            return /^1\\d{10}$/.test(value)\r\n        }\r\n        // 邮箱验证\r\n        if(type === 'email'){\r\n            return /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\\.[a-zA-Z0-9_-]+)+$/.test(value)\r\n        }\r\n    },\r\n    // 跳转到登录页面，并将当前页面url作为查询参数传递，以便登录成功后跳转回当前页面\r\n    doLogin: function(){\r\n        window.location.href = './user-login.html?redirect=' + encodeURIComponent(window.location.href) \r\n    },\r\n    // 跳转到主页\r\n    goHome: function(){\r\n        window.location.href = './index.html'\r\n    }\r\n}\r\n\r\nmodule.exports = _mm\n\n//# sourceURL=webpack:///./src/util/mm.js?");

/***/ })

/******/ });