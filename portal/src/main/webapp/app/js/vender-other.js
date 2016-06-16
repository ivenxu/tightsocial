/*!
 * jQuery JavaScript Library v2.2.1
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2016-02-22T19:11Z
 */

(function( global, factory ) {

	if ( typeof module === "object" && typeof module.exports === "object" ) {
		// For CommonJS and CommonJS-like environments where a proper `window`
		// is present, execute the factory and get jQuery.
		// For environments that do not have a `window` with a `document`
		// (such as Node.js), expose a factory as module.exports.
		// This accentuates the need for the creation of a real `window`.
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info.
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "jQuery requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
}(typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

// Support: Firefox 18+
// Can't be in strict mode, several libs including ASP.NET trace
// the stack via arguments.caller.callee and Firefox dies if
// you try to trace through "use strict" call chains. (#13335)
//"use strict";
var arr = [];

var document = window.document;

var slice = arr.slice;

var concat = arr.concat;

var push = arr.push;

var indexOf = arr.indexOf;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var support = {};



var
	version = "2.2.1",

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {

		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init( selector, context );
	},

	// Support: Android<4.1
	// Make sure we trim BOM and NBSP
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

	// Matches dashed string for camelizing
	rmsPrefix = /^-ms-/,
	rdashAlpha = /-([\da-z])/gi,

	// Used by jQuery.camelCase as callback to replace()
	fcamelCase = function( all, letter ) {
		return letter.toUpperCase();
	};

jQuery.fn = jQuery.prototype = {

	// The current version of jQuery being used
	jquery: version,

	constructor: jQuery,

	// Start with an empty selector
	selector: "",

	// The default length of a jQuery object is 0
	length: 0,

	toArray: function() {
		return slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {
		return num != null ?

			// Return just the one element from the set
			( num < 0 ? this[ num + this.length ] : this[ num ] ) :

			// Return all the elements in a clean array
			slice.call( this );
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;
		ret.context = this.context;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	each: function( callback ) {
		return jQuery.each( this, callback );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map( this, function( elem, i ) {
			return callback.call( elem, i, elem );
		} ) );
	},

	slice: function() {
		return this.pushStack( slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[ j ] ] : [] );
	},

	end: function() {
		return this.prevObject || this.constructor();
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: push,
	sort: arr.sort,
	splice: arr.splice
};

jQuery.extend = jQuery.fn.extend = function() {
	var options, name, src, copy, copyIsArray, clone,
		target = arguments[ 0 ] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;

		// Skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !jQuery.isFunction( target ) ) {
		target = {};
	}

	// Extend jQuery itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {

		// Only deal with non-null/undefined values
		if ( ( options = arguments[ i ] ) != null ) {

			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject( copy ) ||
					( copyIsArray = jQuery.isArray( copy ) ) ) ) {

					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && jQuery.isArray( src ) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject( src ) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend( {

	// Unique for each copy of jQuery on the page
	expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

	// Assume jQuery is ready without the ready module
	isReady: true,

	error: function( msg ) {
		throw new Error( msg );
	},

	noop: function() {},

	isFunction: function( obj ) {
		return jQuery.type( obj ) === "function";
	},

	isArray: Array.isArray,

	isWindow: function( obj ) {
		return obj != null && obj === obj.window;
	},

	isNumeric: function( obj ) {

		// parseFloat NaNs numeric-cast false positives (null|true|false|"")
		// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
		// subtraction forces infinities to NaN
		// adding 1 corrects loss of precision from parseFloat (#15100)
		var realStringObj = obj && obj.toString();
		return !jQuery.isArray( obj ) && ( realStringObj - parseFloat( realStringObj ) + 1 ) >= 0;
	},

	isPlainObject: function( obj ) {

		// Not plain objects:
		// - Any object or value whose internal [[Class]] property is not "[object Object]"
		// - DOM nodes
		// - window
		if ( jQuery.type( obj ) !== "object" || obj.nodeType || jQuery.isWindow( obj ) ) {
			return false;
		}

		if ( obj.constructor &&
				!hasOwn.call( obj.constructor.prototype, "isPrototypeOf" ) ) {
			return false;
		}

		// If the function hasn't returned already, we're confident that
		// |obj| is a plain object, created by {} or constructed with new Object
		return true;
	},

	isEmptyObject: function( obj ) {
		var name;
		for ( name in obj ) {
			return false;
		}
		return true;
	},

	type: function( obj ) {
		if ( obj == null ) {
			return obj + "";
		}

		// Support: Android<4.0, iOS<6 (functionish RegExp)
		return typeof obj === "object" || typeof obj === "function" ?
			class2type[ toString.call( obj ) ] || "object" :
			typeof obj;
	},

	// Evaluates a script in a global context
	globalEval: function( code ) {
		var script,
			indirect = eval;

		code = jQuery.trim( code );

		if ( code ) {

			// If the code includes a valid, prologue position
			// strict mode pragma, execute code by injecting a
			// script tag into the document.
			if ( code.indexOf( "use strict" ) === 1 ) {
				script = document.createElement( "script" );
				script.text = code;
				document.head.appendChild( script ).parentNode.removeChild( script );
			} else {

				// Otherwise, avoid the DOM node creation, insertion
				// and removal by using an indirect global eval

				indirect( code );
			}
		}
	},

	// Convert dashed to camelCase; used by the css and data modules
	// Support: IE9-11+
	// Microsoft forgot to hump their vendor prefix (#9572)
	camelCase: function( string ) {
		return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
	},

	nodeName: function( elem, name ) {
		return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
	},

	each: function( obj, callback ) {
		var length, i = 0;

		if ( isArrayLike( obj ) ) {
			length = obj.length;
			for ( ; i < length; i++ ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		} else {
			for ( i in obj ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		}

		return obj;
	},

	// Support: Android<4.1
	trim: function( text ) {
		return text == null ?
			"" :
			( text + "" ).replace( rtrim, "" );
	},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArrayLike( Object( arr ) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
					[ arr ] : arr
				);
			} else {
				push.call( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		return arr == null ? -1 : indexOf.call( arr, elem, i );
	},

	merge: function( first, second ) {
		var len = +second.length,
			j = 0,
			i = first.length;

		for ( ; j < len; j++ ) {
			first[ i++ ] = second[ j ];
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, invert ) {
		var callbackInverse,
			matches = [],
			i = 0,
			length = elems.length,
			callbackExpect = !invert;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			callbackInverse = !callback( elems[ i ], i );
			if ( callbackInverse !== callbackExpect ) {
				matches.push( elems[ i ] );
			}
		}

		return matches;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var length, value,
			i = 0,
			ret = [];

		// Go through the array, translating each of the items to their new values
		if ( isArrayLike( elems ) ) {
			length = elems.length;
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}
		}

		// Flatten any nested arrays
		return concat.apply( [], ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// Bind a function to a context, optionally partially applying any
	// arguments.
	proxy: function( fn, context ) {
		var tmp, args, proxy;

		if ( typeof context === "string" ) {
			tmp = fn[ context ];
			context = fn;
			fn = tmp;
		}

		// Quick check to determine if target is callable, in the spec
		// this throws a TypeError, but we will just return undefined.
		if ( !jQuery.isFunction( fn ) ) {
			return undefined;
		}

		// Simulated bind
		args = slice.call( arguments, 2 );
		proxy = function() {
			return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
		};

		// Set the guid of unique handler to the same of original handler, so it can be removed
		proxy.guid = fn.guid = fn.guid || jQuery.guid++;

		return proxy;
	},

	now: Date.now,

	// jQuery.support is not used in Core but other projects attach their
	// properties to it so it needs to exist.
	support: support
} );

// JSHint would error on this code due to the Symbol not being defined in ES5.
// Defining this global in .jshintrc would create a danger of using the global
// unguarded in another place, it seems safer to just disable JSHint for these
// three lines.
/* jshint ignore: start */
if ( typeof Symbol === "function" ) {
	jQuery.fn[ Symbol.iterator ] = arr[ Symbol.iterator ];
}
/* jshint ignore: end */

// Populate the class2type map
jQuery.each( "Boolean Number String Function Array Date RegExp Object Error Symbol".split( " " ),
function( i, name ) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
} );

function isArrayLike( obj ) {

	// Support: iOS 8.2 (not reproducible in simulator)
	// `in` check used to prevent JIT error (gh-2145)
	// hasOwn isn't used here due to false negatives
	// regarding Nodelist length in IE
	var length = !!obj && "length" in obj && obj.length,
		type = jQuery.type( obj );

	if ( type === "function" || jQuery.isWindow( obj ) ) {
		return false;
	}

	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}
var Sizzle =
/*!
 * Sizzle CSS Selector Engine v2.2.1
 * http://sizzlejs.com/
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2015-10-17
 */
(function( window ) {

var i,
	support,
	Expr,
	getText,
	isXML,
	tokenize,
	compile,
	select,
	outermostContext,
	sortInput,
	hasDuplicate,

	// Local document vars
	setDocument,
	document,
	docElem,
	documentIsHTML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,

	// Instance-specific data
	expando = "sizzle" + 1 * new Date(),
	preferredDoc = window.document,
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
		}
		return 0;
	},

	// General-purpose constants
	MAX_NEGATIVE = 1 << 31,

	// Instance methods
	hasOwn = ({}).hasOwnProperty,
	arr = [],
	pop = arr.pop,
	push_native = arr.push,
	push = arr.push,
	slice = arr.slice,
	// Use a stripped-down indexOf as it's faster than native
	// http://jsperf.com/thor-indexof-vs-for/5
	indexOf = function( list, elem ) {
		var i = 0,
			len = list.length;
		for ( ; i < len; i++ ) {
			if ( list[i] === elem ) {
				return i;
			}
		}
		return -1;
	},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

	// Regular expressions

	// http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",

	// http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",

	// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + identifier + ")(?:" + whitespace +
		// Operator (capture 2)
		"*([*^$|!~]?=)" + whitespace +
		// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
		"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
		"*\\]",

	pseudos = ":(" + identifier + ")(?:\\((" +
		// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
		// 1. quoted (capture 3; capture 4 or capture 5)
		"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
		// 2. simple (capture 6)
		"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
		// 3. anything else (capture 2)
		".*" +
		")\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rwhitespace = new RegExp( whitespace + "+", "g" ),
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

	rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + identifier + ")" ),
		"CLASS": new RegExp( "^\\.(" + identifier + ")" ),
		"TAG": new RegExp( "^(" + identifier + "|[*])" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
			whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rnative = /^[^{]+\{\s*\[native \w/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rsibling = /[+~]/,
	rescape = /'|\\/g,

	// CSS escapes http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
	funescape = function( _, escaped, escapedWhitespace ) {
		var high = "0x" + escaped - 0x10000;
		// NaN means non-codepoint
		// Support: Firefox<24
		// Workaround erroneous numeric interpretation of +"0x"
		return high !== high || escapedWhitespace ?
			escaped :
			high < 0 ?
				// BMP codepoint
				String.fromCharCode( high + 0x10000 ) :
				// Supplemental Plane codepoint (surrogate pair)
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	},

	// Used for iframes
	// See setDocument()
	// Removing the function wrapper causes a "Permission Denied"
	// error in IE
	unloadHandler = function() {
		setDocument();
	};

// Optimize for push.apply( _, NodeList )
try {
	push.apply(
		(arr = slice.call( preferredDoc.childNodes )),
		preferredDoc.childNodes
	);
	// Support: Android<4.0
	// Detect silently failing push.apply
	arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
	push = { apply: arr.length ?

		// Leverage slice if possible
		function( target, els ) {
			push_native.apply( target, slice.call(els) );
		} :

		// Support: IE<9
		// Otherwise append directly
		function( target, els ) {
			var j = target.length,
				i = 0;
			// Can't trust NodeList.length
			while ( (target[j++] = els[i++]) ) {}
			target.length = j - 1;
		}
	};
}

function Sizzle( selector, context, results, seed ) {
	var m, i, elem, nid, nidselect, match, groups, newSelector,
		newContext = context && context.ownerDocument,

		// nodeType defaults to 9, since context defaults to document
		nodeType = context ? context.nodeType : 9;

	results = results || [];

	// Return early from calls with invalid selector or context
	if ( typeof selector !== "string" || !selector ||
		nodeType !== 1 && nodeType !== 9 && nodeType !== 11 ) {

		return results;
	}

	// Try to shortcut find operations (as opposed to filters) in HTML documents
	if ( !seed ) {

		if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
			setDocument( context );
		}
		context = context || document;

		if ( documentIsHTML ) {

			// If the selector is sufficiently simple, try using a "get*By*" DOM method
			// (excepting DocumentFragment context, where the methods don't exist)
			if ( nodeType !== 11 && (match = rquickExpr.exec( selector )) ) {

				// ID selector
				if ( (m = match[1]) ) {

					// Document context
					if ( nodeType === 9 ) {
						if ( (elem = context.getElementById( m )) ) {

							// Support: IE, Opera, Webkit
							// TODO: identify versions
							// getElementById can match elements by name instead of ID
							if ( elem.id === m ) {
								results.push( elem );
								return results;
							}
						} else {
							return results;
						}

					// Element context
					} else {

						// Support: IE, Opera, Webkit
						// TODO: identify versions
						// getElementById can match elements by name instead of ID
						if ( newContext && (elem = newContext.getElementById( m )) &&
							contains( context, elem ) &&
							elem.id === m ) {

							results.push( elem );
							return results;
						}
					}

				// Type selector
				} else if ( match[2] ) {
					push.apply( results, context.getElementsByTagName( selector ) );
					return results;

				// Class selector
				} else if ( (m = match[3]) && support.getElementsByClassName &&
					context.getElementsByClassName ) {

					push.apply( results, context.getElementsByClassName( m ) );
					return results;
				}
			}

			// Take advantage of querySelectorAll
			if ( support.qsa &&
				!compilerCache[ selector + " " ] &&
				(!rbuggyQSA || !rbuggyQSA.test( selector )) ) {

				if ( nodeType !== 1 ) {
					newContext = context;
					newSelector = selector;

				// qSA looks outside Element context, which is not what we want
				// Thanks to Andrew Dupont for this workaround technique
				// Support: IE <=8
				// Exclude object elements
				} else if ( context.nodeName.toLowerCase() !== "object" ) {

					// Capture the context ID, setting it first if necessary
					if ( (nid = context.getAttribute( "id" )) ) {
						nid = nid.replace( rescape, "\\$&" );
					} else {
						context.setAttribute( "id", (nid = expando) );
					}

					// Prefix every selector in the list
					groups = tokenize( selector );
					i = groups.length;
					nidselect = ridentifier.test( nid ) ? "#" + nid : "[id='" + nid + "']";
					while ( i-- ) {
						groups[i] = nidselect + " " + toSelector( groups[i] );
					}
					newSelector = groups.join( "," );

					// Expand context for sibling selectors
					newContext = rsibling.test( selector ) && testContext( context.parentNode ) ||
						context;
				}

				if ( newSelector ) {
					try {
						push.apply( results,
							newContext.querySelectorAll( newSelector )
						);
						return results;
					} catch ( qsaError ) {
					} finally {
						if ( nid === expando ) {
							context.removeAttribute( "id" );
						}
					}
				}
			}
		}
	}

	// All others
	return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Create key-value caches of limited size
 * @returns {function(string, object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var keys = [];

	function cache( key, value ) {
		// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
		if ( keys.push( key + " " ) > Expr.cacheLength ) {
			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return (cache[ key + " " ] = value);
	}
	return cache;
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created div and expects a boolean result
 */
function assert( fn ) {
	var div = document.createElement("div");

	try {
		return !!fn( div );
	} catch (e) {
		return false;
	} finally {
		// Remove from its parent by default
		if ( div.parentNode ) {
			div.parentNode.removeChild( div );
		}
		// release memory in IE
		div = null;
	}
}

/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function addHandle( attrs, handler ) {
	var arr = attrs.split("|"),
		i = arr.length;

	while ( i-- ) {
		Expr.attrHandle[ arr[i] ] = handler;
	}
}

/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck( a, b ) {
	var cur = b && a,
		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
			( ~b.sourceIndex || MAX_NEGATIVE ) -
			( ~a.sourceIndex || MAX_NEGATIVE );

	// Use IE sourceIndex if available on both nodes
	if ( diff ) {
		return diff;
	}

	// Check if b follows a
	if ( cur ) {
		while ( (cur = cur.nextSibling) ) {
			if ( cur === b ) {
				return -1;
			}
		}
	}

	return a ? 1 : -1;
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return (name === "input" || name === "button") && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
	return markFunction(function( argument ) {
		argument = +argument;
		return markFunction(function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ (j = matchIndexes[i]) ] ) {
					seed[j] = !(matches[j] = seed[j]);
				}
			}
		});
	});
}

/**
 * Checks a node for validity as a Sizzle context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */
function testContext( context ) {
	return context && typeof context.getElementsByTagName !== "undefined" && context;
}

// Expose support vars for convenience
support = Sizzle.support = {};

/**
 * Detects XML nodes
 * @param {Element|Object} elem An element or a document
 * @returns {Boolean} True iff elem is a non-HTML XML node
 */
isXML = Sizzle.isXML = function( elem ) {
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833)
	var documentElement = elem && (elem.ownerDocument || elem).documentElement;
	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
	var hasCompare, parent,
		doc = node ? node.ownerDocument || node : preferredDoc;

	// Return early if doc is invalid or already selected
	if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Update global variables
	document = doc;
	docElem = document.documentElement;
	documentIsHTML = !isXML( document );

	// Support: IE 9-11, Edge
	// Accessing iframe documents after unload throws "permission denied" errors (jQuery #13936)
	if ( (parent = document.defaultView) && parent.top !== parent ) {
		// Support: IE 11
		if ( parent.addEventListener ) {
			parent.addEventListener( "unload", unloadHandler, false );

		// Support: IE 9 - 10 only
		} else if ( parent.attachEvent ) {
			parent.attachEvent( "onunload", unloadHandler );
		}
	}

	/* Attributes
	---------------------------------------------------------------------- */

	// Support: IE<8
	// Verify that getAttribute really returns attributes and not properties
	// (excepting IE8 booleans)
	support.attributes = assert(function( div ) {
		div.className = "i";
		return !div.getAttribute("className");
	});

	/* getElement(s)By*
	---------------------------------------------------------------------- */

	// Check if getElementsByTagName("*") returns only elements
	support.getElementsByTagName = assert(function( div ) {
		div.appendChild( document.createComment("") );
		return !div.getElementsByTagName("*").length;
	});

	// Support: IE<9
	support.getElementsByClassName = rnative.test( document.getElementsByClassName );

	// Support: IE<10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programatically-set names,
	// so use a roundabout getElementsByName test
	support.getById = assert(function( div ) {
		docElem.appendChild( div ).id = expando;
		return !document.getElementsByName || !document.getElementsByName( expando ).length;
	});

	// ID find and filter
	if ( support.getById ) {
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var m = context.getElementById( id );
				return m ? [ m ] : [];
			}
		};
		Expr.filter["ID"] = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute("id") === attrId;
			};
		};
	} else {
		// Support: IE6/7
		// getElementById is not reliable as a find shortcut
		delete Expr.find["ID"];

		Expr.filter["ID"] =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== "undefined" &&
					elem.getAttributeNode("id");
				return node && node.value === attrId;
			};
		};
	}

	// Tag
	Expr.find["TAG"] = support.getElementsByTagName ?
		function( tag, context ) {
			if ( typeof context.getElementsByTagName !== "undefined" ) {
				return context.getElementsByTagName( tag );

			// DocumentFragment nodes don't have gEBTN
			} else if ( support.qsa ) {
				return context.querySelectorAll( tag );
			}
		} :

		function( tag, context ) {
			var elem,
				tmp = [],
				i = 0,
				// By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
				results = context.getElementsByTagName( tag );

			// Filter out possible comments
			if ( tag === "*" ) {
				while ( (elem = results[i++]) ) {
					if ( elem.nodeType === 1 ) {
						tmp.push( elem );
					}
				}

				return tmp;
			}
			return results;
		};

	// Class
	Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
		if ( typeof context.getElementsByClassName !== "undefined" && documentIsHTML ) {
			return context.getElementsByClassName( className );
		}
	};

	/* QSA/matchesSelector
	---------------------------------------------------------------------- */

	// QSA and matchesSelector support

	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
	rbuggyMatches = [];

	// qSa(:focus) reports false when true (Chrome 21)
	// We allow this because of a bug in IE8/9 that throws an error
	// whenever `document.activeElement` is accessed on an iframe
	// So, we allow :focus to pass through QSA all the time to avoid the IE error
	// See http://bugs.jquery.com/ticket/13378
	rbuggyQSA = [];

	if ( (support.qsa = rnative.test( document.querySelectorAll )) ) {
		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert(function( div ) {
			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explicitly
			// setting a boolean content attribute,
			// since its presence should be enough
			// http://bugs.jquery.com/ticket/12359
			docElem.appendChild( div ).innerHTML = "<a id='" + expando + "'></a>" +
				"<select id='" + expando + "-\r\\' msallowcapture=''>" +
				"<option selected=''></option></select>";

			// Support: IE8, Opera 11-12.16
			// Nothing should be selected when empty strings follow ^= or $= or *=
			// The test attribute must be unknown in Opera but "safe" for WinRT
			// http://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
			if ( div.querySelectorAll("[msallowcapture^='']").length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
			}

			// Support: IE8
			// Boolean attributes and "value" are not treated correctly
			if ( !div.querySelectorAll("[selected]").length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
			}

			// Support: Chrome<29, Android<4.4, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.8+
			if ( !div.querySelectorAll( "[id~=" + expando + "-]" ).length ) {
				rbuggyQSA.push("~=");
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":checked").length ) {
				rbuggyQSA.push(":checked");
			}

			// Support: Safari 8+, iOS 8+
			// https://bugs.webkit.org/show_bug.cgi?id=136851
			// In-page `selector#id sibing-combinator selector` fails
			if ( !div.querySelectorAll( "a#" + expando + "+*" ).length ) {
				rbuggyQSA.push(".#.+[+~]");
			}
		});

		assert(function( div ) {
			// Support: Windows 8 Native Apps
			// The type and name attributes are restricted during .innerHTML assignment
			var input = document.createElement("input");
			input.setAttribute( "type", "hidden" );
			div.appendChild( input ).setAttribute( "name", "D" );

			// Support: IE8
			// Enforce case-sensitivity of name attribute
			if ( div.querySelectorAll("[name=d]").length ) {
				rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":enabled").length ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Opera 10-11 does not throw on post-comma invalid pseudos
			div.querySelectorAll("*,:x");
			rbuggyQSA.push(",.*:");
		});
	}

	if ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||
		docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector) )) ) {

		assert(function( div ) {
			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			support.disconnectedMatch = matches.call( div, "div" );

			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( div, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		});
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
	rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

	/* Contains
	---------------------------------------------------------------------- */
	hasCompare = rnative.test( docElem.compareDocumentPosition );

	// Element contains another
	// Purposefully self-exclusive
	// As in, an element does not contain itself
	contains = hasCompare || rnative.test( docElem.contains ) ?
		function( a, b ) {
			var adown = a.nodeType === 9 ? a.documentElement : a,
				bup = b && b.parentNode;
			return a === bup || !!( bup && bup.nodeType === 1 && (
				adown.contains ?
					adown.contains( bup ) :
					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
			));
		} :
		function( a, b ) {
			if ( b ) {
				while ( (b = b.parentNode) ) {
					if ( b === a ) {
						return true;
					}
				}
			}
			return false;
		};

	/* Sorting
	---------------------------------------------------------------------- */

	// Document order sorting
	sortOrder = hasCompare ?
	function( a, b ) {

		// Flag for duplicate removal
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		// Sort on method existence if only one input has compareDocumentPosition
		var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
		if ( compare ) {
			return compare;
		}

		// Calculate position if both inputs belong to the same document
		compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
			a.compareDocumentPosition( b ) :

			// Otherwise we know they are disconnected
			1;

		// Disconnected nodes
		if ( compare & 1 ||
			(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

			// Choose the first element that is related to our preferred document
			if ( a === document || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
				return -1;
			}
			if ( b === document || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
				return 1;
			}

			// Maintain original order
			return sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;
		}

		return compare & 4 ? -1 : 1;
	} :
	function( a, b ) {
		// Exit early if the nodes are identical
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		var cur,
			i = 0,
			aup = a.parentNode,
			bup = b.parentNode,
			ap = [ a ],
			bp = [ b ];

		// Parentless nodes are either documents or disconnected
		if ( !aup || !bup ) {
			return a === document ? -1 :
				b === document ? 1 :
				aup ? -1 :
				bup ? 1 :
				sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;

		// If the nodes are siblings, we can do a quick check
		} else if ( aup === bup ) {
			return siblingCheck( a, b );
		}

		// Otherwise we need full lists of their ancestors for comparison
		cur = a;
		while ( (cur = cur.parentNode) ) {
			ap.unshift( cur );
		}
		cur = b;
		while ( (cur = cur.parentNode) ) {
			bp.unshift( cur );
		}

		// Walk down the tree looking for a discrepancy
		while ( ap[i] === bp[i] ) {
			i++;
		}

		return i ?
			// Do a sibling check if the nodes have a common ancestor
			siblingCheck( ap[i], bp[i] ) :

			// Otherwise nodes in our document sort first
			ap[i] === preferredDoc ? -1 :
			bp[i] === preferredDoc ? 1 :
			0;
	};

	return document;
};

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	// Make sure that attribute selectors are quoted
	expr = expr.replace( rattributeQuotes, "='$1']" );

	if ( support.matchesSelector && documentIsHTML &&
		!compilerCache[ expr + " " ] &&
		( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
		( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

		try {
			var ret = matches.call( elem, expr );

			// IE 9's matchesSelector returns false on disconnected nodes
			if ( ret || support.disconnectedMatch ||
					// As well, disconnected nodes are said to be in a document
					// fragment in IE 9
					elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch (e) {}
	}

	return Sizzle( expr, document, null, [ elem ] ).length > 0;
};

Sizzle.contains = function( context, elem ) {
	// Set document vars if needed
	if ( ( context.ownerDocument || context ) !== document ) {
		setDocument( context );
	}
	return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	var fn = Expr.attrHandle[ name.toLowerCase() ],
		// Don't get fooled by Object.prototype properties (jQuery #13807)
		val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
			fn( elem, name, !documentIsHTML ) :
			undefined;

	return val !== undefined ?
		val :
		support.attributes || !documentIsHTML ?
			elem.getAttribute( name ) :
			(val = elem.getAttributeNode(name)) && val.specified ?
				val.value :
				null;
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	hasDuplicate = !support.detectDuplicates;
	sortInput = !support.sortStable && results.slice( 0 );
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		while ( (elem = results[i++]) ) {
			if ( elem === results[ i ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}

	// Clear input after sorting to release objects
	// See https://github.com/jquery/sizzle/pull/225
	sortInput = null;

	return results;
};

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( !nodeType ) {
		// If no nodeType, this is expected to be an array
		while ( (node = elem[i++]) ) {
			// Do not traverse comment nodes
			ret += getText( node );
		}
	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
		// Use textContent for elements
		// innerText usage removed for consistency of new lines (jQuery #11153)
		if ( typeof elem.textContent === "string" ) {
			return elem.textContent;
		} else {
			// Traverse its children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				ret += getText( elem );
			}
		}
	} else if ( nodeType === 3 || nodeType === 4 ) {
		return elem.nodeValue;
	}
	// Do not include comment or processing instruction nodes

	return ret;
};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	attrHandle: {},

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[1] = match[1].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[3] = ( match[3] || match[4] || match[5] || "" ).replace( runescape, funescape );

			if ( match[2] === "~=" ) {
				match[3] = " " + match[3] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {
			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			match[1] = match[1].toLowerCase();

			if ( match[1].slice( 0, 3 ) === "nth" ) {
				// nth-* requires argument
				if ( !match[3] ) {
					Sizzle.error( match[0] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
				match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

			// other types prohibit arguments
			} else if ( match[3] ) {
				Sizzle.error( match[0] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var excess,
				unquoted = !match[6] && match[2];

			if ( matchExpr["CHILD"].test( match[0] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[3] ) {
				match[2] = match[4] || match[5] || "";

			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&
				// Get excess from tokenize (recursively)
				(excess = tokenize( unquoted, true )) &&
				// advance to the next closing parenthesis
				(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

				// excess is a negative index
				match[0] = match[0].slice( 0, excess );
				match[2] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {

		"TAG": function( nodeNameSelector ) {
			var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			return nodeNameSelector === "*" ?
				function() { return true; } :
				function( elem ) {
					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
				};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
				classCache( className, function( elem ) {
					return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "" );
				});
		},

		"ATTR": function( name, operator, check ) {
			return function( elem ) {
				var result = Sizzle.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.slice( -check.length ) === check :
					operator === "~=" ? ( " " + result.replace( rwhitespace, " " ) + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
					false;
			};
		},

		"CHILD": function( type, what, argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, context, xml ) {
					var cache, uniqueCache, outerCache, node, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType,
						diff = false;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( (node = node[ dir ]) ) {
									if ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) {

										return false;
									}
								}
								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) {

							// Seek `elem` from a previously-cached index

							// ...in a gzip-friendly way
							node = parent;
							outerCache = node[ expando ] || (node[ expando ] = {});

							// Support: IE <9 only
							// Defend against cloned attroperties (jQuery gh-1709)
							uniqueCache = outerCache[ node.uniqueID ] ||
								(outerCache[ node.uniqueID ] = {});

							cache = uniqueCache[ type ] || [];
							nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
							diff = nodeIndex && cache[ 2 ];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( (node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								(diff = nodeIndex = 0) || start.pop()) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									uniqueCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						} else {
							// Use previously-cached element index if available
							if ( useCache ) {
								// ...in a gzip-friendly way
								node = elem;
								outerCache = node[ expando ] || (node[ expando ] = {});

								// Support: IE <9 only
								// Defend against cloned attroperties (jQuery gh-1709)
								uniqueCache = outerCache[ node.uniqueID ] ||
									(outerCache[ node.uniqueID ] = {});

								cache = uniqueCache[ type ] || [];
								nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
								diff = nodeIndex;
							}

							// xml :nth-child(...)
							// or :nth-last-child(...) or :nth(-last)?-of-type(...)
							if ( diff === false ) {
								// Use the same loop as above to seek `elem` from the start
								while ( (node = ++nodeIndex && node && node[ dir ] ||
									(diff = nodeIndex = 0) || start.pop()) ) {

									if ( ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) &&
										++diff ) {

										// Cache the index of each encountered element
										if ( useCache ) {
											outerCache = node[ expando ] || (node[ expando ] = {});

											// Support: IE <9 only
											// Defend against cloned attroperties (jQuery gh-1709)
											uniqueCache = outerCache[ node.uniqueID ] ||
												(outerCache[ node.uniqueID ] = {});

											uniqueCache[ type ] = [ dirruns, diff ];
										}

										if ( node === elem ) {
											break;
										}
									}
								}
							}
						}

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},

		"PSEUDO": function( pseudo, argument ) {
			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction(function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf( seed, matched[i] );
							seed[ idx ] = !( matches[ idx ] = matched[i] );
						}
					}) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {
		// Potentially complex pseudos
		"not": markFunction(function( selector ) {
			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction(function( seed, matches, context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( (elem = unmatched[i]) ) {
							seed[i] = !(matches[i] = elem);
						}
					}
				}) :
				function( elem, context, xml ) {
					input[0] = elem;
					matcher( input, null, xml, results );
					// Don't keep the element (issue #299)
					input[0] = null;
					return !results.pop();
				};
		}),

		"has": markFunction(function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		}),

		"contains": markFunction(function( text ) {
			text = text.replace( runescape, funescape );
			return function( elem ) {
				return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
			};
		}),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction( function( lang ) {
			// lang value must be a valid identifier
			if ( !ridentifier.test(lang || "") ) {
				Sizzle.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( (elemLang = documentIsHTML ?
						elem.lang :
						elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
				return false;
			};
		}),

		// Miscellaneous
		"target": function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		"root": function( elem ) {
			return elem === docElem;
		},

		"focus": function( elem ) {
			return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
		},

		// Boolean properties
		"enabled": function( elem ) {
			return elem.disabled === false;
		},

		"disabled": function( elem ) {
			return elem.disabled === true;
		},

		"checked": function( elem ) {
			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
		},

		"selected": function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		"empty": function( elem ) {
			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
			//   but not by others (comment: 8; processing instruction: 7; etc.)
			// nodeType < 6 works because attributes (2) do not appear as children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeType < 6 ) {
					return false;
				}
			}
			return true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos["empty"]( elem );
		},

		// Element/input types
		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"text": function( elem ) {
			var attr;
			return elem.nodeName.toLowerCase() === "input" &&
				elem.type === "text" &&

				// Support: IE<8
				// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
				( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
		},

		// Position-in-collection
		"first": createPositionalPseudo(function() {
			return [ 0 ];
		}),

		"last": createPositionalPseudo(function( matchIndexes, length ) {
			return [ length - 1 ];
		}),

		"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		}),

		"even": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"odd": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		})
	}
};

Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || (match = rcomma.exec( soFar )) ) {
			if ( match ) {
				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[0].length ) || soFar;
			}
			groups.push( (tokens = []) );
		}

		matched = false;

		// Combinators
		if ( (match = rcombinators.exec( soFar )) ) {
			matched = match.shift();
			tokens.push({
				value: matched,
				// Cast descendant combinators to space
				type: match[0].replace( rtrim, " " )
			});
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
				(match = preFilters[ type ]( match ))) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					type: type,
					matches: match
				});
				soFar = soFar.slice( matched.length );
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :
			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );
};

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[i].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		checkNonElements = base && dir === "parentNode",
		doneName = done++;

	return combinator.first ?
		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( (elem = elem[ dir ]) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var oldCache, uniqueCache, outerCache,
				newCache = [ dirruns, doneName ];

			// We can't set arbitrary data on XML nodes, so they don't benefit from combinator caching
			if ( xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || (elem[ expando ] = {});

						// Support: IE <9 only
						// Defend against cloned attroperties (jQuery gh-1709)
						uniqueCache = outerCache[ elem.uniqueID ] || (outerCache[ elem.uniqueID ] = {});

						if ( (oldCache = uniqueCache[ dir ]) &&
							oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

							// Assign to newCache so results back-propagate to previous elements
							return (newCache[ 2 ] = oldCache[ 2 ]);
						} else {
							// Reuse newcache so results back-propagate to previous elements
							uniqueCache[ dir ] = newCache;

							// A match means we're done; a fail means we have to keep checking
							if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
								return true;
							}
						}
					}
				}
			}
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[i]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[0];
}

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[i], results );
	}
	return results;
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( (elem = unmatched[i]) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction(function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			matcherOut = matcher ?
				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results :
				matcherIn;

		// Find primary matches
		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml );
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( (elem = temp[i]) ) {
					matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {
					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) ) {
							// Restore matcherIn since elem is not yet a final match
							temp.push( (matcherIn[i] = elem) );
						}
					}
					postFinder( null, (matcherOut = []), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( (elem = matcherOut[i]) &&
						(temp = postFinder ? indexOf( seed, elem ) : preMap[i]) > -1 ) {

						seed[temp] = !(results[temp] = elem);
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	});
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[0].type ],
		implicitRelative = leadingRelative || Expr.relative[" "],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			var ret = ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				(checkContext = context).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );
			// Avoid hanging onto element (issue #299)
			checkContext = null;
			return ret;
		} ];

	for ( ; i < len; i++ ) {
		if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
			matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
		} else {
			matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {
				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[j].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector(
						// If the preceding token was a descendant combinator, insert an implicit any-element `*`
						tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
					).replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	var bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, outermost ) {
			var elem, j, matcher,
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				setMatched = [],
				contextBackup = outermostContext,
				// We must always have either seed elements or outermost context
				elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
				len = elems.length;

			if ( outermost ) {
				outermostContext = context === document || context || outermost;
			}

			// Add elements passing elementMatchers directly to results
			// Support: IE<9, Safari
			// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
			for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;
					if ( !context && elem.ownerDocument !== document ) {
						setDocument( elem );
						xml = !documentIsHTML;
					}
					while ( (matcher = elementMatchers[j++]) ) {
						if ( matcher( elem, context || document, xml) ) {
							results.push( elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {
					// They will have gone through all possible matchers
					if ( (elem = !matcher && elem) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// `i` is now the count of elements visited above, and adding it to `matchedCount`
			// makes the latter nonnegative.
			matchedCount += i;

			// Apply set filters to unmatched elements
			// NOTE: This can be skipped if there are no unmatched elements (i.e., `matchedCount`
			// equals `i`), unless we didn't visit _any_ elements in the above loop because we have
			// no element matchers and no seed.
			// Incrementing an initially-string "0" `i` allows `i` to remain a string only in that
			// case, which will result in a "00" `matchedCount` that differs from `i` but is also
			// numerically zero.
			if ( bySet && i !== matchedCount ) {
				j = 0;
				while ( (matcher = setMatchers[j++]) ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {
					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !(unmatched[i] || setMatched[i]) ) {
								setMatched[i] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					Sizzle.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {
		// Generate a function of recursive functions that can be used to check each element
		if ( !match ) {
			match = tokenize( selector );
		}
		i = match.length;
		while ( i-- ) {
			cached = matcherFromTokens( match[i] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );

		// Save selector and tokenization
		cached.selector = selector;
	}
	return cached;
};

/**
 * A low-level selection function that works with Sizzle's compiled
 *  selector functions
 * @param {String|Function} selector A selector or a pre-compiled
 *  selector function built with Sizzle.compile
 * @param {Element} context
 * @param {Array} [results]
 * @param {Array} [seed] A set of elements to match against
 */
select = Sizzle.select = function( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		compiled = typeof selector === "function" && selector,
		match = !seed && tokenize( (selector = compiled.selector || selector) );

	results = results || [];

	// Try to minimize operations if there is only one selector in the list and no seed
	// (the latter of which guarantees us context)
	if ( match.length === 1 ) {

		// Reduce context if the leading compound selector is an ID
		tokens = match[0] = match[0].slice( 0 );
		if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
				support.getById && context.nodeType === 9 && documentIsHTML &&
				Expr.relative[ tokens[1].type ] ) {

			context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
			if ( !context ) {
				return results;

			// Precompiled matchers will still verify ancestry, so step up a level
			} else if ( compiled ) {
				context = context.parentNode;
			}

			selector = selector.slice( tokens.shift().value.length );
		}

		// Fetch a seed set for right-to-left matching
		i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
		while ( i-- ) {
			token = tokens[i];

			// Abort if we hit a combinator
			if ( Expr.relative[ (type = token.type) ] ) {
				break;
			}
			if ( (find = Expr.find[ type ]) ) {
				// Search, expanding context for leading sibling combinators
				if ( (seed = find(
					token.matches[0].replace( runescape, funescape ),
					rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
				)) ) {

					// If seed is empty or no tokens remain, we can return early
					tokens.splice( i, 1 );
					selector = seed.length && toSelector( tokens );
					if ( !selector ) {
						push.apply( results, seed );
						return results;
					}

					break;
				}
			}
		}
	}

	// Compile and execute a filtering function if one is not provided
	// Provide `match` to avoid retokenization if we modified the selector above
	( compiled || compile( selector, match ) )(
		seed,
		context,
		!documentIsHTML,
		results,
		!context || rsibling.test( selector ) && testContext( context.parentNode ) || context
	);
	return results;
};

// One-time assignments

// Sort stability
support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

// Support: Chrome 14-35+
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = !!hasDuplicate;

// Initialize against the default document
setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert(function( div1 ) {
	// Should return 1, but returns 4 (following)
	return div1.compareDocumentPosition( document.createElement("div") ) & 1;
});

// Support: IE<8
// Prevent attribute/property "interpolation"
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !assert(function( div ) {
	div.innerHTML = "<a href='#'></a>";
	return div.firstChild.getAttribute("href") === "#" ;
}) ) {
	addHandle( "type|href|height|width", function( elem, name, isXML ) {
		if ( !isXML ) {
			return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
		}
	});
}

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
if ( !support.attributes || !assert(function( div ) {
	div.innerHTML = "<input/>";
	div.firstChild.setAttribute( "value", "" );
	return div.firstChild.getAttribute( "value" ) === "";
}) ) {
	addHandle( "value", function( elem, name, isXML ) {
		if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
			return elem.defaultValue;
		}
	});
}

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if ( !assert(function( div ) {
	return div.getAttribute("disabled") == null;
}) ) {
	addHandle( booleans, function( elem, name, isXML ) {
		var val;
		if ( !isXML ) {
			return elem[ name ] === true ? name.toLowerCase() :
					(val = elem.getAttributeNode( name )) && val.specified ?
					val.value :
				null;
		}
	});
}

return Sizzle;

})( window );



jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;
jQuery.expr[ ":" ] = jQuery.expr.pseudos;
jQuery.uniqueSort = jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;



var dir = function( elem, dir, until ) {
	var matched = [],
		truncate = until !== undefined;

	while ( ( elem = elem[ dir ] ) && elem.nodeType !== 9 ) {
		if ( elem.nodeType === 1 ) {
			if ( truncate && jQuery( elem ).is( until ) ) {
				break;
			}
			matched.push( elem );
		}
	}
	return matched;
};


var siblings = function( n, elem ) {
	var matched = [];

	for ( ; n; n = n.nextSibling ) {
		if ( n.nodeType === 1 && n !== elem ) {
			matched.push( n );
		}
	}

	return matched;
};


var rneedsContext = jQuery.expr.match.needsContext;

var rsingleTag = ( /^<([\w-]+)\s*\/?>(?:<\/\1>|)$/ );



var risSimple = /^.[^:#\[\.,]*$/;

// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
	if ( jQuery.isFunction( qualifier ) ) {
		return jQuery.grep( elements, function( elem, i ) {
			/* jshint -W018 */
			return !!qualifier.call( elem, i, elem ) !== not;
		} );

	}

	if ( qualifier.nodeType ) {
		return jQuery.grep( elements, function( elem ) {
			return ( elem === qualifier ) !== not;
		} );

	}

	if ( typeof qualifier === "string" ) {
		if ( risSimple.test( qualifier ) ) {
			return jQuery.filter( qualifier, elements, not );
		}

		qualifier = jQuery.filter( qualifier, elements );
	}

	return jQuery.grep( elements, function( elem ) {
		return ( indexOf.call( qualifier, elem ) > -1 ) !== not;
	} );
}

jQuery.filter = function( expr, elems, not ) {
	var elem = elems[ 0 ];

	if ( not ) {
		expr = ":not(" + expr + ")";
	}

	return elems.length === 1 && elem.nodeType === 1 ?
		jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [] :
		jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
			return elem.nodeType === 1;
		} ) );
};

jQuery.fn.extend( {
	find: function( selector ) {
		var i,
			len = this.length,
			ret = [],
			self = this;

		if ( typeof selector !== "string" ) {
			return this.pushStack( jQuery( selector ).filter( function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			} ) );
		}

		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, self[ i ], ret );
		}

		// Needed because $( selector, context ) becomes $( context ).find( selector )
		ret = this.pushStack( len > 1 ? jQuery.unique( ret ) : ret );
		ret.selector = this.selector ? this.selector + " " + selector : selector;
		return ret;
	},
	filter: function( selector ) {
		return this.pushStack( winnow( this, selector || [], false ) );
	},
	not: function( selector ) {
		return this.pushStack( winnow( this, selector || [], true ) );
	},
	is: function( selector ) {
		return !!winnow(
			this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test( selector ) ?
				jQuery( selector ) :
				selector || [],
			false
		).length;
	}
} );


// Initialize a jQuery object


// A central reference to the root jQuery(document)
var rootjQuery,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,

	init = jQuery.fn.init = function( selector, context, root ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// Method init() accepts an alternate rootjQuery
		// so migrate can support jQuery.sub (gh-2101)
		root = root || rootjQuery;

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector[ 0 ] === "<" &&
				selector[ selector.length - 1 ] === ">" &&
				selector.length >= 3 ) {

				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && ( match[ 1 ] || !context ) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[ 1 ] ) {
					context = context instanceof jQuery ? context[ 0 ] : context;

					// Option to run scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge( this, jQuery.parseHTML(
						match[ 1 ],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[ 1 ] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {

							// Properties of context are called as methods if possible
							if ( jQuery.isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[ 2 ] );

					// Support: Blackberry 4.6
					// gEBID returns nodes no longer in the document (#6963)
					if ( elem && elem.parentNode ) {

						// Inject the element directly into the jQuery object
						this.length = 1;
						this[ 0 ] = elem;
					}

					this.context = document;
					this.selector = selector;
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || root ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this.context = this[ 0 ] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( jQuery.isFunction( selector ) ) {
			return root.ready !== undefined ?
				root.ready( selector ) :

				// Execute immediately if ready is not present
				selector( jQuery );
		}

		if ( selector.selector !== undefined ) {
			this.selector = selector.selector;
			this.context = selector.context;
		}

		return jQuery.makeArray( selector, this );
	};

// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn;

// Initialize central reference
rootjQuery = jQuery( document );


var rparentsprev = /^(?:parents|prev(?:Until|All))/,

	// Methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.fn.extend( {
	has: function( target ) {
		var targets = jQuery( target, this ),
			l = targets.length;

		return this.filter( function() {
			var i = 0;
			for ( ; i < l; i++ ) {
				if ( jQuery.contains( this, targets[ i ] ) ) {
					return true;
				}
			}
		} );
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			matched = [],
			pos = rneedsContext.test( selectors ) || typeof selectors !== "string" ?
				jQuery( selectors, context || this.context ) :
				0;

		for ( ; i < l; i++ ) {
			for ( cur = this[ i ]; cur && cur !== context; cur = cur.parentNode ) {

				// Always skip document fragments
				if ( cur.nodeType < 11 && ( pos ?
					pos.index( cur ) > -1 :

					// Don't pass non-elements to Sizzle
					cur.nodeType === 1 &&
						jQuery.find.matchesSelector( cur, selectors ) ) ) {

					matched.push( cur );
					break;
				}
			}
		}

		return this.pushStack( matched.length > 1 ? jQuery.uniqueSort( matched ) : matched );
	},

	// Determine the position of an element within the set
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[ 0 ] && this[ 0 ].parentNode ) ? this.first().prevAll().length : -1;
		}

		// Index in selector
		if ( typeof elem === "string" ) {
			return indexOf.call( jQuery( elem ), this[ 0 ] );
		}

		// Locate the position of the desired element
		return indexOf.call( this,

			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[ 0 ] : elem
		);
	},

	add: function( selector, context ) {
		return this.pushStack(
			jQuery.uniqueSort(
				jQuery.merge( this.get(), jQuery( selector, context ) )
			)
		);
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter( selector )
		);
	}
} );

function sibling( cur, dir ) {
	while ( ( cur = cur[ dir ] ) && cur.nodeType !== 1 ) {}
	return cur;
}

jQuery.each( {
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, i, until ) {
		return dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, i, until ) {
		return dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, i, until ) {
		return dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return siblings( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return siblings( elem.firstChild );
	},
	contents: function( elem ) {
		return elem.contentDocument || jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var matched = jQuery.map( this, fn, until );

		if ( name.slice( -5 ) !== "Until" ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			matched = jQuery.filter( selector, matched );
		}

		if ( this.length > 1 ) {

			// Remove duplicates
			if ( !guaranteedUnique[ name ] ) {
				jQuery.uniqueSort( matched );
			}

			// Reverse order for parents* and prev-derivatives
			if ( rparentsprev.test( name ) ) {
				matched.reverse();
			}
		}

		return this.pushStack( matched );
	};
} );
var rnotwhite = ( /\S+/g );



// Convert String-formatted options into Object-formatted ones
function createOptions( options ) {
	var object = {};
	jQuery.each( options.match( rnotwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	} );
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		createOptions( options ) :
		jQuery.extend( {}, options );

	var // Flag to know if list is currently firing
		firing,

		// Last fire value for non-forgettable lists
		memory,

		// Flag to know if list was already fired
		fired,

		// Flag to prevent firing
		locked,

		// Actual callback list
		list = [],

		// Queue of execution data for repeatable lists
		queue = [],

		// Index of currently firing callback (modified by add/remove as needed)
		firingIndex = -1,

		// Fire callbacks
		fire = function() {

			// Enforce single-firing
			locked = options.once;

			// Execute callbacks for all pending executions,
			// respecting firingIndex overrides and runtime changes
			fired = firing = true;
			for ( ; queue.length; firingIndex = -1 ) {
				memory = queue.shift();
				while ( ++firingIndex < list.length ) {

					// Run callback and check for early termination
					if ( list[ firingIndex ].apply( memory[ 0 ], memory[ 1 ] ) === false &&
						options.stopOnFalse ) {

						// Jump to end and forget the data so .add doesn't re-fire
						firingIndex = list.length;
						memory = false;
					}
				}
			}

			// Forget the data if we're done with it
			if ( !options.memory ) {
				memory = false;
			}

			firing = false;

			// Clean up if we're done firing for good
			if ( locked ) {

				// Keep an empty list if we have data for future add calls
				if ( memory ) {
					list = [];

				// Otherwise, this object is spent
				} else {
					list = "";
				}
			}
		},

		// Actual Callbacks object
		self = {

			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {

					// If we have memory from a past run, we should fire after adding
					if ( memory && !firing ) {
						firingIndex = list.length - 1;
						queue.push( memory );
					}

					( function add( args ) {
						jQuery.each( args, function( _, arg ) {
							if ( jQuery.isFunction( arg ) ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && jQuery.type( arg ) !== "string" ) {

								// Inspect recursively
								add( arg );
							}
						} );
					} )( arguments );

					if ( memory && !firing ) {
						fire();
					}
				}
				return this;
			},

			// Remove a callback from the list
			remove: function() {
				jQuery.each( arguments, function( _, arg ) {
					var index;
					while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
						list.splice( index, 1 );

						// Handle firing indexes
						if ( index <= firingIndex ) {
							firingIndex--;
						}
					}
				} );
				return this;
			},

			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function( fn ) {
				return fn ?
					jQuery.inArray( fn, list ) > -1 :
					list.length > 0;
			},

			// Remove all callbacks from the list
			empty: function() {
				if ( list ) {
					list = [];
				}
				return this;
			},

			// Disable .fire and .add
			// Abort any current/pending executions
			// Clear all callbacks and values
			disable: function() {
				locked = queue = [];
				list = memory = "";
				return this;
			},
			disabled: function() {
				return !list;
			},

			// Disable .fire
			// Also disable .add unless we have memory (since it would have no effect)
			// Abort any pending executions
			lock: function() {
				locked = queue = [];
				if ( !memory ) {
					list = memory = "";
				}
				return this;
			},
			locked: function() {
				return !!locked;
			},

			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				if ( !locked ) {
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
					queue.push( args );
					if ( !firing ) {
						fire();
					}
				}
				return this;
			},

			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},

			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};


jQuery.extend( {

	Deferred: function( func ) {
		var tuples = [

				// action, add listener, listener list, final state
				[ "resolve", "done", jQuery.Callbacks( "once memory" ), "resolved" ],
				[ "reject", "fail", jQuery.Callbacks( "once memory" ), "rejected" ],
				[ "notify", "progress", jQuery.Callbacks( "memory" ) ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				then: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;
					return jQuery.Deferred( function( newDefer ) {
						jQuery.each( tuples, function( i, tuple ) {
							var fn = jQuery.isFunction( fns[ i ] ) && fns[ i ];

							// deferred[ done | fail | progress ] for forwarding actions to newDefer
							deferred[ tuple[ 1 ] ]( function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && jQuery.isFunction( returned.promise ) ) {
									returned.promise()
										.progress( newDefer.notify )
										.done( newDefer.resolve )
										.fail( newDefer.reject );
								} else {
									newDefer[ tuple[ 0 ] + "With" ](
										this === promise ? newDefer.promise() : this,
										fn ? [ returned ] : arguments
									);
								}
							} );
						} );
						fns = null;
					} ).promise();
				},

				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Keep pipe for back-compat
		promise.pipe = promise.then;

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 3 ];

			// promise[ done | fail | progress ] = list.add
			promise[ tuple[ 1 ] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add( function() {

					// state = [ resolved | rejected ]
					state = stateString;

				// [ reject_list | resolve_list ].disable; progress_list.lock
				}, tuples[ i ^ 1 ][ 2 ].disable, tuples[ 2 ][ 2 ].lock );
			}

			// deferred[ resolve | reject | notify ]
			deferred[ tuple[ 0 ] ] = function() {
				deferred[ tuple[ 0 ] + "With" ]( this === deferred ? promise : this, arguments );
				return this;
			};
			deferred[ tuple[ 0 ] + "With" ] = list.fireWith;
		} );

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( subordinate /* , ..., subordinateN */ ) {
		var i = 0,
			resolveValues = slice.call( arguments ),
			length = resolveValues.length,

			// the count of uncompleted subordinates
			remaining = length !== 1 ||
				( subordinate && jQuery.isFunction( subordinate.promise ) ) ? length : 0,

			// the master Deferred.
			// If resolveValues consist of only a single Deferred, just use that.
			deferred = remaining === 1 ? subordinate : jQuery.Deferred(),

			// Update function for both resolve and progress values
			updateFunc = function( i, contexts, values ) {
				return function( value ) {
					contexts[ i ] = this;
					values[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
					if ( values === progressValues ) {
						deferred.notifyWith( contexts, values );
					} else if ( !( --remaining ) ) {
						deferred.resolveWith( contexts, values );
					}
				};
			},

			progressValues, progressContexts, resolveContexts;

		// Add listeners to Deferred subordinates; treat others as resolved
		if ( length > 1 ) {
			progressValues = new Array( length );
			progressContexts = new Array( length );
			resolveContexts = new Array( length );
			for ( ; i < length; i++ ) {
				if ( resolveValues[ i ] && jQuery.isFunction( resolveValues[ i ].promise ) ) {
					resolveValues[ i ].promise()
						.progress( updateFunc( i, progressContexts, progressValues ) )
						.done( updateFunc( i, resolveContexts, resolveValues ) )
						.fail( deferred.reject );
				} else {
					--remaining;
				}
			}
		}

		// If we're not waiting on anything, resolve the master
		if ( !remaining ) {
			deferred.resolveWith( resolveContexts, resolveValues );
		}

		return deferred.promise();
	}
} );


// The deferred used on DOM ready
var readyList;

jQuery.fn.ready = function( fn ) {

	// Add the callback
	jQuery.ready.promise().done( fn );

	return this;
};

jQuery.extend( {

	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Hold (or release) the ready event
	holdReady: function( hold ) {
		if ( hold ) {
			jQuery.readyWait++;
		} else {
			jQuery.ready( true );
		}
	},

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );

		// Trigger any bound ready events
		if ( jQuery.fn.triggerHandler ) {
			jQuery( document ).triggerHandler( "ready" );
			jQuery( document ).off( "ready" );
		}
	}
} );

/**
 * The ready event handler and self cleanup method
 */
function completed() {
	document.removeEventListener( "DOMContentLoaded", completed );
	window.removeEventListener( "load", completed );
	jQuery.ready();
}

jQuery.ready.promise = function( obj ) {
	if ( !readyList ) {

		readyList = jQuery.Deferred();

		// Catch cases where $(document).ready() is called
		// after the browser event has already occurred.
		// Support: IE9-10 only
		// Older IE sometimes signals "interactive" too soon
		if ( document.readyState === "complete" ||
			( document.readyState !== "loading" && !document.documentElement.doScroll ) ) {

			// Handle it asynchronously to allow scripts the opportunity to delay ready
			window.setTimeout( jQuery.ready );

		} else {

			// Use the handy event callback
			document.addEventListener( "DOMContentLoaded", completed );

			// A fallback to window.onload, that will always work
			window.addEventListener( "load", completed );
		}
	}
	return readyList.promise( obj );
};

// Kick off the DOM ready check even if the user does not
jQuery.ready.promise();




// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
	var i = 0,
		len = elems.length,
		bulk = key == null;

	// Sets many values
	if ( jQuery.type( key ) === "object" ) {
		chainable = true;
		for ( i in key ) {
			access( elems, fn, i, key[ i ], true, emptyGet, raw );
		}

	// Sets one value
	} else if ( value !== undefined ) {
		chainable = true;

		if ( !jQuery.isFunction( value ) ) {
			raw = true;
		}

		if ( bulk ) {

			// Bulk operations run against the entire set
			if ( raw ) {
				fn.call( elems, value );
				fn = null;

			// ...except when executing function values
			} else {
				bulk = fn;
				fn = function( elem, key, value ) {
					return bulk.call( jQuery( elem ), value );
				};
			}
		}

		if ( fn ) {
			for ( ; i < len; i++ ) {
				fn(
					elems[ i ], key, raw ?
					value :
					value.call( elems[ i ], i, fn( elems[ i ], key ) )
				);
			}
		}
	}

	return chainable ?
		elems :

		// Gets
		bulk ?
			fn.call( elems ) :
			len ? fn( elems[ 0 ], key ) : emptyGet;
};
var acceptData = function( owner ) {

	// Accepts only:
	//  - Node
	//    - Node.ELEMENT_NODE
	//    - Node.DOCUMENT_NODE
	//  - Object
	//    - Any
	/* jshint -W018 */
	return owner.nodeType === 1 || owner.nodeType === 9 || !( +owner.nodeType );
};




function Data() {
	this.expando = jQuery.expando + Data.uid++;
}

Data.uid = 1;

Data.prototype = {

	register: function( owner, initial ) {
		var value = initial || {};

		// If it is a node unlikely to be stringify-ed or looped over
		// use plain assignment
		if ( owner.nodeType ) {
			owner[ this.expando ] = value;

		// Otherwise secure it in a non-enumerable, non-writable property
		// configurability must be true to allow the property to be
		// deleted with the delete operator
		} else {
			Object.defineProperty( owner, this.expando, {
				value: value,
				writable: true,
				configurable: true
			} );
		}
		return owner[ this.expando ];
	},
	cache: function( owner ) {

		// We can accept data for non-element nodes in modern browsers,
		// but we should not, see #8335.
		// Always return an empty object.
		if ( !acceptData( owner ) ) {
			return {};
		}

		// Check if the owner object already has a cache
		var value = owner[ this.expando ];

		// If not, create one
		if ( !value ) {
			value = {};

			// We can accept data for non-element nodes in modern browsers,
			// but we should not, see #8335.
			// Always return an empty object.
			if ( acceptData( owner ) ) {

				// If it is a node unlikely to be stringify-ed or looped over
				// use plain assignment
				if ( owner.nodeType ) {
					owner[ this.expando ] = value;

				// Otherwise secure it in a non-enumerable property
				// configurable must be true to allow the property to be
				// deleted when data is removed
				} else {
					Object.defineProperty( owner, this.expando, {
						value: value,
						configurable: true
					} );
				}
			}
		}

		return value;
	},
	set: function( owner, data, value ) {
		var prop,
			cache = this.cache( owner );

		// Handle: [ owner, key, value ] args
		if ( typeof data === "string" ) {
			cache[ data ] = value;

		// Handle: [ owner, { properties } ] args
		} else {

			// Copy the properties one-by-one to the cache object
			for ( prop in data ) {
				cache[ prop ] = data[ prop ];
			}
		}
		return cache;
	},
	get: function( owner, key ) {
		return key === undefined ?
			this.cache( owner ) :
			owner[ this.expando ] && owner[ this.expando ][ key ];
	},
	access: function( owner, key, value ) {
		var stored;

		// In cases where either:
		//
		//   1. No key was specified
		//   2. A string key was specified, but no value provided
		//
		// Take the "read" path and allow the get method to determine
		// which value to return, respectively either:
		//
		//   1. The entire cache object
		//   2. The data stored at the key
		//
		if ( key === undefined ||
				( ( key && typeof key === "string" ) && value === undefined ) ) {

			stored = this.get( owner, key );

			return stored !== undefined ?
				stored : this.get( owner, jQuery.camelCase( key ) );
		}

		// When the key is not a string, or both a key and value
		// are specified, set or extend (existing objects) with either:
		//
		//   1. An object of properties
		//   2. A key and value
		//
		this.set( owner, key, value );

		// Since the "set" path can have two possible entry points
		// return the expected data based on which path was taken[*]
		return value !== undefined ? value : key;
	},
	remove: function( owner, key ) {
		var i, name, camel,
			cache = owner[ this.expando ];

		if ( cache === undefined ) {
			return;
		}

		if ( key === undefined ) {
			this.register( owner );

		} else {

			// Support array or space separated string of keys
			if ( jQuery.isArray( key ) ) {

				// If "name" is an array of keys...
				// When data is initially created, via ("key", "val") signature,
				// keys will be converted to camelCase.
				// Since there is no way to tell _how_ a key was added, remove
				// both plain key and camelCase key. #12786
				// This will only penalize the array argument path.
				name = key.concat( key.map( jQuery.camelCase ) );
			} else {
				camel = jQuery.camelCase( key );

				// Try the string as a key before any manipulation
				if ( key in cache ) {
					name = [ key, camel ];
				} else {

					// If a key with the spaces exists, use it.
					// Otherwise, create an array by matching non-whitespace
					name = camel;
					name = name in cache ?
						[ name ] : ( name.match( rnotwhite ) || [] );
				}
			}

			i = name.length;

			while ( i-- ) {
				delete cache[ name[ i ] ];
			}
		}

		// Remove the expando if there's no more data
		if ( key === undefined || jQuery.isEmptyObject( cache ) ) {

			// Support: Chrome <= 35-45+
			// Webkit & Blink performance suffers when deleting properties
			// from DOM nodes, so set to undefined instead
			// https://code.google.com/p/chromium/issues/detail?id=378607
			if ( owner.nodeType ) {
				owner[ this.expando ] = undefined;
			} else {
				delete owner[ this.expando ];
			}
		}
	},
	hasData: function( owner ) {
		var cache = owner[ this.expando ];
		return cache !== undefined && !jQuery.isEmptyObject( cache );
	}
};
var dataPriv = new Data();

var dataUser = new Data();



//	Implementation Summary
//
//	1. Enforce API surface and semantic compatibility with 1.9.x branch
//	2. Improve the module's maintainability by reducing the storage
//		paths to a single mechanism.
//	3. Use the same single mechanism to support "private" and "user" data.
//	4. _Never_ expose "private" data to user code (TODO: Drop _data, _removeData)
//	5. Avoid exposing implementation details on user objects (eg. expando properties)
//	6. Provide a clear path for implementation upgrade to WeakMap in 2014

var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	rmultiDash = /[A-Z]/g;

function dataAttr( elem, key, data ) {
	var name;

	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {
		name = "data-" + key.replace( rmultiDash, "-$&" ).toLowerCase();
		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = data === "true" ? true :
					data === "false" ? false :
					data === "null" ? null :

					// Only convert to a number if it doesn't change the string
					+data + "" === data ? +data :
					rbrace.test( data ) ? jQuery.parseJSON( data ) :
					data;
			} catch ( e ) {}

			// Make sure we set the data so it isn't changed later
			dataUser.set( elem, key, data );
		} else {
			data = undefined;
		}
	}
	return data;
}

jQuery.extend( {
	hasData: function( elem ) {
		return dataUser.hasData( elem ) || dataPriv.hasData( elem );
	},

	data: function( elem, name, data ) {
		return dataUser.access( elem, name, data );
	},

	removeData: function( elem, name ) {
		dataUser.remove( elem, name );
	},

	// TODO: Now that all calls to _data and _removeData have been replaced
	// with direct calls to dataPriv methods, these can be deprecated.
	_data: function( elem, name, data ) {
		return dataPriv.access( elem, name, data );
	},

	_removeData: function( elem, name ) {
		dataPriv.remove( elem, name );
	}
} );

jQuery.fn.extend( {
	data: function( key, value ) {
		var i, name, data,
			elem = this[ 0 ],
			attrs = elem && elem.attributes;

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = dataUser.get( elem );

				if ( elem.nodeType === 1 && !dataPriv.get( elem, "hasDataAttrs" ) ) {
					i = attrs.length;
					while ( i-- ) {

						// Support: IE11+
						// The attrs elements can be null (#14894)
						if ( attrs[ i ] ) {
							name = attrs[ i ].name;
							if ( name.indexOf( "data-" ) === 0 ) {
								name = jQuery.camelCase( name.slice( 5 ) );
								dataAttr( elem, name, data[ name ] );
							}
						}
					}
					dataPriv.set( elem, "hasDataAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each( function() {
				dataUser.set( this, key );
			} );
		}

		return access( this, function( value ) {
			var data, camelKey;

			// The calling jQuery object (element matches) is not empty
			// (and therefore has an element appears at this[ 0 ]) and the
			// `value` parameter was not undefined. An empty jQuery object
			// will result in `undefined` for elem = this[ 0 ] which will
			// throw an exception if an attempt to read a data cache is made.
			if ( elem && value === undefined ) {

				// Attempt to get data from the cache
				// with the key as-is
				data = dataUser.get( elem, key ) ||

					// Try to find dashed key if it exists (gh-2779)
					// This is for 2.2.x only
					dataUser.get( elem, key.replace( rmultiDash, "-$&" ).toLowerCase() );

				if ( data !== undefined ) {
					return data;
				}

				camelKey = jQuery.camelCase( key );

				// Attempt to get data from the cache
				// with the key camelized
				data = dataUser.get( elem, camelKey );
				if ( data !== undefined ) {
					return data;
				}

				// Attempt to "discover" the data in
				// HTML5 custom data-* attrs
				data = dataAttr( elem, camelKey, undefined );
				if ( data !== undefined ) {
					return data;
				}

				// We tried really hard, but the data doesn't exist.
				return;
			}

			// Set the data...
			camelKey = jQuery.camelCase( key );
			this.each( function() {

				// First, attempt to store a copy or reference of any
				// data that might've been store with a camelCased key.
				var data = dataUser.get( this, camelKey );

				// For HTML5 data-* attribute interop, we have to
				// store property names with dashes in a camelCase form.
				// This might not apply to all properties...*
				dataUser.set( this, camelKey, value );

				// *... In the case of properties that might _actually_
				// have dashes, we need to also store a copy of that
				// unchanged property.
				if ( key.indexOf( "-" ) > -1 && data !== undefined ) {
					dataUser.set( this, key, value );
				}
			} );
		}, null, value, arguments.length > 1, null, true );
	},

	removeData: function( key ) {
		return this.each( function() {
			dataUser.remove( this, key );
		} );
	}
} );


jQuery.extend( {
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = dataPriv.get( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || jQuery.isArray( data ) ) {
					queue = dataPriv.access( elem, type, jQuery.makeArray( data ) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// Clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// Not public - generate a queueHooks object, or return the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return dataPriv.get( elem, key ) || dataPriv.access( elem, key, {
			empty: jQuery.Callbacks( "once memory" ).add( function() {
				dataPriv.remove( elem, [ type + "queue", key ] );
			} )
		} );
	}
} );

jQuery.fn.extend( {
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[ 0 ], type );
		}

		return data === undefined ?
			this :
			this.each( function() {
				var queue = jQuery.queue( this, type, data );

				// Ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[ 0 ] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			} );
	},
	dequeue: function( type ) {
		return this.each( function() {
			jQuery.dequeue( this, type );
		} );
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},

	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while ( i-- ) {
			tmp = dataPriv.get( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
} );
var pnum = ( /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/ ).source;

var rcssNum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" );


var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

var isHidden = function( elem, el ) {

		// isHidden might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;
		return jQuery.css( elem, "display" ) === "none" ||
			!jQuery.contains( elem.ownerDocument, elem );
	};



function adjustCSS( elem, prop, valueParts, tween ) {
	var adjusted,
		scale = 1,
		maxIterations = 20,
		currentValue = tween ?
			function() { return tween.cur(); } :
			function() { return jQuery.css( elem, prop, "" ); },
		initial = currentValue(),
		unit = valueParts && valueParts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

		// Starting value computation is required for potential unit mismatches
		initialInUnit = ( jQuery.cssNumber[ prop ] || unit !== "px" && +initial ) &&
			rcssNum.exec( jQuery.css( elem, prop ) );

	if ( initialInUnit && initialInUnit[ 3 ] !== unit ) {

		// Trust units reported by jQuery.css
		unit = unit || initialInUnit[ 3 ];

		// Make sure we update the tween properties later on
		valueParts = valueParts || [];

		// Iteratively approximate from a nonzero starting point
		initialInUnit = +initial || 1;

		do {

			// If previous iteration zeroed out, double until we get *something*.
			// Use string for doubling so we don't accidentally see scale as unchanged below
			scale = scale || ".5";

			// Adjust and apply
			initialInUnit = initialInUnit / scale;
			jQuery.style( elem, prop, initialInUnit + unit );

		// Update scale, tolerating zero or NaN from tween.cur()
		// Break the loop if scale is unchanged or perfect, or if we've just had enough.
		} while (
			scale !== ( scale = currentValue() / initial ) && scale !== 1 && --maxIterations
		);
	}

	if ( valueParts ) {
		initialInUnit = +initialInUnit || +initial || 0;

		// Apply relative offset (+=/-=) if specified
		adjusted = valueParts[ 1 ] ?
			initialInUnit + ( valueParts[ 1 ] + 1 ) * valueParts[ 2 ] :
			+valueParts[ 2 ];
		if ( tween ) {
			tween.unit = unit;
			tween.start = initialInUnit;
			tween.end = adjusted;
		}
	}
	return adjusted;
}
var rcheckableType = ( /^(?:checkbox|radio)$/i );

var rtagName = ( /<([\w:-]+)/ );

var rscriptType = ( /^$|\/(?:java|ecma)script/i );



// We have to close these tags to support XHTML (#13200)
var wrapMap = {

	// Support: IE9
	option: [ 1, "<select multiple='multiple'>", "</select>" ],

	// XHTML parsers do not magically insert elements in the
	// same way that tag soup parsers do. So we cannot shorten
	// this by omitting <tbody> or other required elements.
	thead: [ 1, "<table>", "</table>" ],
	col: [ 2, "<table><colgroup>", "</colgroup></table>" ],
	tr: [ 2, "<table><tbody>", "</tbody></table>" ],
	td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

	_default: [ 0, "", "" ]
};

// Support: IE9
wrapMap.optgroup = wrapMap.option;

wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;


function getAll( context, tag ) {

	// Support: IE9-11+
	// Use typeof to avoid zero-argument method invocation on host objects (#15151)
	var ret = typeof context.getElementsByTagName !== "undefined" ?
			context.getElementsByTagName( tag || "*" ) :
			typeof context.querySelectorAll !== "undefined" ?
				context.querySelectorAll( tag || "*" ) :
			[];

	return tag === undefined || tag && jQuery.nodeName( context, tag ) ?
		jQuery.merge( [ context ], ret ) :
		ret;
}


// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var i = 0,
		l = elems.length;

	for ( ; i < l; i++ ) {
		dataPriv.set(
			elems[ i ],
			"globalEval",
			!refElements || dataPriv.get( refElements[ i ], "globalEval" )
		);
	}
}


var rhtml = /<|&#?\w+;/;

function buildFragment( elems, context, scripts, selection, ignored ) {
	var elem, tmp, tag, wrap, contains, j,
		fragment = context.createDocumentFragment(),
		nodes = [],
		i = 0,
		l = elems.length;

	for ( ; i < l; i++ ) {
		elem = elems[ i ];

		if ( elem || elem === 0 ) {

			// Add nodes directly
			if ( jQuery.type( elem ) === "object" ) {

				// Support: Android<4.1, PhantomJS<2
				// push.apply(_, arraylike) throws on ancient WebKit
				jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

			// Convert non-html into a text node
			} else if ( !rhtml.test( elem ) ) {
				nodes.push( context.createTextNode( elem ) );

			// Convert html into DOM nodes
			} else {
				tmp = tmp || fragment.appendChild( context.createElement( "div" ) );

				// Deserialize a standard representation
				tag = ( rtagName.exec( elem ) || [ "", "" ] )[ 1 ].toLowerCase();
				wrap = wrapMap[ tag ] || wrapMap._default;
				tmp.innerHTML = wrap[ 1 ] + jQuery.htmlPrefilter( elem ) + wrap[ 2 ];

				// Descend through wrappers to the right content
				j = wrap[ 0 ];
				while ( j-- ) {
					tmp = tmp.lastChild;
				}

				// Support: Android<4.1, PhantomJS<2
				// push.apply(_, arraylike) throws on ancient WebKit
				jQuery.merge( nodes, tmp.childNodes );

				// Remember the top-level container
				tmp = fragment.firstChild;

				// Ensure the created nodes are orphaned (#12392)
				tmp.textContent = "";
			}
		}
	}

	// Remove wrapper from fragment
	fragment.textContent = "";

	i = 0;
	while ( ( elem = nodes[ i++ ] ) ) {

		// Skip elements already in the context collection (trac-4087)
		if ( selection && jQuery.inArray( elem, selection ) > -1 ) {
			if ( ignored ) {
				ignored.push( elem );
			}
			continue;
		}

		contains = jQuery.contains( elem.ownerDocument, elem );

		// Append to fragment
		tmp = getAll( fragment.appendChild( elem ), "script" );

		// Preserve script evaluation history
		if ( contains ) {
			setGlobalEval( tmp );
		}

		// Capture executables
		if ( scripts ) {
			j = 0;
			while ( ( elem = tmp[ j++ ] ) ) {
				if ( rscriptType.test( elem.type || "" ) ) {
					scripts.push( elem );
				}
			}
		}
	}

	return fragment;
}


( function() {
	var fragment = document.createDocumentFragment(),
		div = fragment.appendChild( document.createElement( "div" ) ),
		input = document.createElement( "input" );

	// Support: Android 4.0-4.3, Safari<=5.1
	// Check state lost if the name is set (#11217)
	// Support: Windows Web Apps (WWA)
	// `name` and `type` must use .setAttribute for WWA (#14901)
	input.setAttribute( "type", "radio" );
	input.setAttribute( "checked", "checked" );
	input.setAttribute( "name", "t" );

	div.appendChild( input );

	// Support: Safari<=5.1, Android<4.2
	// Older WebKit doesn't clone checked state correctly in fragments
	support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Support: IE<=11+
	// Make sure textarea (and checkbox) defaultValue is properly cloned
	div.innerHTML = "<textarea>x</textarea>";
	support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;
} )();


var
	rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
	rtypenamespace = /^([^.]*)(?:\.(.+)|)/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

// Support: IE9
// See #13393 for more info
function safeActiveElement() {
	try {
		return document.activeElement;
	} catch ( err ) { }
}

function on( elem, types, selector, data, fn, one ) {
	var origFn, type;

	// Types can be a map of types/handlers
	if ( typeof types === "object" ) {

		// ( types-Object, selector, data )
		if ( typeof selector !== "string" ) {

			// ( types-Object, data )
			data = data || selector;
			selector = undefined;
		}
		for ( type in types ) {
			on( elem, type, selector, data, types[ type ], one );
		}
		return elem;
	}

	if ( data == null && fn == null ) {

		// ( types, fn )
		fn = selector;
		data = selector = undefined;
	} else if ( fn == null ) {
		if ( typeof selector === "string" ) {

			// ( types, selector, fn )
			fn = data;
			data = undefined;
		} else {

			// ( types, data, fn )
			fn = data;
			data = selector;
			selector = undefined;
		}
	}
	if ( fn === false ) {
		fn = returnFalse;
	} else if ( !fn ) {
		return elem;
	}

	if ( one === 1 ) {
		origFn = fn;
		fn = function( event ) {

			// Can use an empty set, since event contains the info
			jQuery().off( event );
			return origFn.apply( this, arguments );
		};

		// Use same guid so caller can remove using origFn
		fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
	}
	return elem.each( function() {
		jQuery.event.add( this, types, fn, data, selector );
	} );
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	global: {},

	add: function( elem, types, handler, data, selector ) {

		var handleObjIn, eventHandle, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = dataPriv.get( elem );

		// Don't attach events to noData or text/comment nodes (but allow plain objects)
		if ( !elemData ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		if ( !( events = elemData.events ) ) {
			events = elemData.events = {};
		}
		if ( !( eventHandle = elemData.handle ) ) {
			eventHandle = elemData.handle = function( e ) {

				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== "undefined" && jQuery.event.triggered !== e.type ?
					jQuery.event.dispatch.apply( elem, arguments ) : undefined;
			};
		}

		// Handle multiple events separated by a space
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// There *must* be a type, no attaching namespace-only handlers
			if ( !type ) {
				continue;
			}

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend( {
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join( "." )
			}, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !( handlers = events[ type ] ) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener if the special events handler returns false
				if ( !special.setup ||
					special.setup.call( elem, data, namespaces, eventHandle ) === false ) {

					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

	},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {

		var j, origCount, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = dataPriv.hasData( elem ) && dataPriv.get( elem );

		if ( !elemData || !( events = elemData.events ) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[ 2 ] &&
				new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector ||
						selector === "**" && handleObj.selector ) ) {
					handlers.splice( j, 1 );

					if ( handleObj.selector ) {
						handlers.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( origCount && !handlers.length ) {
				if ( !special.teardown ||
					special.teardown.call( elem, namespaces, elemData.handle ) === false ) {

					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove data and the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			dataPriv.remove( elem, "handle events" );
		}
	},

	dispatch: function( event ) {

		// Make a writable jQuery.Event from the native event object
		event = jQuery.event.fix( event );

		var i, j, ret, matched, handleObj,
			handlerQueue = [],
			args = slice.call( arguments ),
			handlers = ( dataPriv.get( this, "events" ) || {} )[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[ 0 ] = event;
		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( ( matched = handlerQueue[ i++ ] ) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;

			j = 0;
			while ( ( handleObj = matched.handlers[ j++ ] ) &&
				!event.isImmediatePropagationStopped() ) {

				// Triggered event must either 1) have no namespace, or 2) have namespace(s)
				// a subset or equal to those in the bound event (both can have no namespace).
				if ( !event.rnamespace || event.rnamespace.test( handleObj.namespace ) ) {

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ( ( jQuery.event.special[ handleObj.origType ] || {} ).handle ||
						handleObj.handler ).apply( matched.elem, args );

					if ( ret !== undefined ) {
						if ( ( event.result = ret ) === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	handlers: function( event, handlers ) {
		var i, matches, sel, handleObj,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Support (at least): Chrome, IE9
		// Find delegate handlers
		// Black-hole SVG <use> instance trees (#13180)
		//
		// Support: Firefox<=42+
		// Avoid non-left-click in FF but don't block IE radio events (#3861, gh-2343)
		if ( delegateCount && cur.nodeType &&
			( event.type !== "click" || isNaN( event.button ) || event.button < 1 ) ) {

			for ( ; cur !== this; cur = cur.parentNode || this ) {

				// Don't check non-elements (#13208)
				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.nodeType === 1 && ( cur.disabled !== true || event.type !== "click" ) ) {
					matches = [];
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (#13203)
						sel = handleObj.selector + " ";

						if ( matches[ sel ] === undefined ) {
							matches[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) > -1 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matches[ sel ] ) {
							matches.push( handleObj );
						}
					}
					if ( matches.length ) {
						handlerQueue.push( { elem: cur, handlers: matches } );
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		if ( delegateCount < handlers.length ) {
			handlerQueue.push( { elem: this, handlers: handlers.slice( delegateCount ) } );
		}

		return handlerQueue;
	},

	// Includes some event props shared by KeyEvent and MouseEvent
	props: ( "altKey bubbles cancelable ctrlKey currentTarget detail eventPhase " +
		"metaKey relatedTarget shiftKey target timeStamp view which" ).split( " " ),

	fixHooks: {},

	keyHooks: {
		props: "char charCode key keyCode".split( " " ),
		filter: function( event, original ) {

			// Add which for key events
			if ( event.which == null ) {
				event.which = original.charCode != null ? original.charCode : original.keyCode;
			}

			return event;
		}
	},

	mouseHooks: {
		props: ( "button buttons clientX clientY offsetX offsetY pageX pageY " +
			"screenX screenY toElement" ).split( " " ),
		filter: function( event, original ) {
			var eventDoc, doc, body,
				button = original.button;

			// Calculate pageX/Y if missing and clientX/Y available
			if ( event.pageX == null && original.clientX != null ) {
				eventDoc = event.target.ownerDocument || document;
				doc = eventDoc.documentElement;
				body = eventDoc.body;

				event.pageX = original.clientX +
					( doc && doc.scrollLeft || body && body.scrollLeft || 0 ) -
					( doc && doc.clientLeft || body && body.clientLeft || 0 );
				event.pageY = original.clientY +
					( doc && doc.scrollTop  || body && body.scrollTop  || 0 ) -
					( doc && doc.clientTop  || body && body.clientTop  || 0 );
			}

			// Add which for click: 1 === left; 2 === middle; 3 === right
			// Note: button is not normalized, so don't use it
			if ( !event.which && button !== undefined ) {
				event.which = ( button & 1 ? 1 : ( button & 2 ? 3 : ( button & 4 ? 2 : 0 ) ) );
			}

			return event;
		}
	},

	fix: function( event ) {
		if ( event[ jQuery.expando ] ) {
			return event;
		}

		// Create a writable copy of the event object and normalize some properties
		var i, prop, copy,
			type = event.type,
			originalEvent = event,
			fixHook = this.fixHooks[ type ];

		if ( !fixHook ) {
			this.fixHooks[ type ] = fixHook =
				rmouseEvent.test( type ) ? this.mouseHooks :
				rkeyEvent.test( type ) ? this.keyHooks :
				{};
		}
		copy = fixHook.props ? this.props.concat( fixHook.props ) : this.props;

		event = new jQuery.Event( originalEvent );

		i = copy.length;
		while ( i-- ) {
			prop = copy[ i ];
			event[ prop ] = originalEvent[ prop ];
		}

		// Support: Cordova 2.5 (WebKit) (#13255)
		// All events should have a target; Cordova deviceready doesn't
		if ( !event.target ) {
			event.target = document;
		}

		// Support: Safari 6.0+, Chrome<28
		// Target should not be a text node (#504, #13143)
		if ( event.target.nodeType === 3 ) {
			event.target = event.target.parentNode;
		}

		return fixHook.filter ? fixHook.filter( event, originalEvent ) : event;
	},

	special: {
		load: {

			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		focus: {

			// Fire native event if possible so blur/focus sequence is correct
			trigger: function() {
				if ( this !== safeActiveElement() && this.focus ) {
					this.focus();
					return false;
				}
			},
			delegateType: "focusin"
		},
		blur: {
			trigger: function() {
				if ( this === safeActiveElement() && this.blur ) {
					this.blur();
					return false;
				}
			},
			delegateType: "focusout"
		},
		click: {

			// For checkbox, fire native event so checked state will be right
			trigger: function() {
				if ( this.type === "checkbox" && this.click && jQuery.nodeName( this, "input" ) ) {
					this.click();
					return false;
				}
			},

			// For cross-browser consistency, don't fire native .click() on links
			_default: function( event ) {
				return jQuery.nodeName( event.target, "a" );
			}
		},

		beforeunload: {
			postDispatch: function( event ) {

				// Support: Firefox 20+
				// Firefox doesn't alert if the returnValue field is not set.
				if ( event.result !== undefined && event.originalEvent ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	}
};

jQuery.removeEvent = function( elem, type, handle ) {

	// This "if" is needed for plain objects
	if ( elem.removeEventListener ) {
		elem.removeEventListener( type, handle );
	}
};

jQuery.Event = function( src, props ) {

	// Allow instantiation without the 'new' keyword
	if ( !( this instanceof jQuery.Event ) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = src.defaultPrevented ||
				src.defaultPrevented === undefined &&

				// Support: Android<4.0
				src.returnValue === false ?
			returnTrue :
			returnFalse;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || jQuery.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	constructor: jQuery.Event,
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;

		if ( e ) {
			e.preventDefault();
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;

		if ( e ) {
			e.stopPropagation();
		}
	},
	stopImmediatePropagation: function() {
		var e = this.originalEvent;

		this.isImmediatePropagationStopped = returnTrue;

		if ( e ) {
			e.stopImmediatePropagation();
		}

		this.stopPropagation();
	}
};

// Create mouseenter/leave events using mouseover/out and event-time checks
// so that event delegation works in jQuery.
// Do the same for pointerenter/pointerleave and pointerover/pointerout
//
// Support: Safari 7 only
// Safari sends mouseenter too often; see:
// https://code.google.com/p/chromium/issues/detail?id=470258
// for the description of the bug (it existed in older Chrome versions as well).
jQuery.each( {
	mouseenter: "mouseover",
	mouseleave: "mouseout",
	pointerenter: "pointerover",
	pointerleave: "pointerout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// For mouseenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || ( related !== target && !jQuery.contains( target, related ) ) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
} );

jQuery.fn.extend( {
	on: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn );
	},
	one: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {

			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ?
					handleObj.origType + "." + handleObj.namespace :
					handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {

			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {

			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each( function() {
			jQuery.event.remove( this, types, fn, selector );
		} );
	}
} );


var
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:-]+)[^>]*)\/>/gi,

	// Support: IE 10-11, Edge 10240+
	// In IE/Edge using regex groups here causes severe slowdowns.
	// See https://connect.microsoft.com/IE/feedback/details/1736512/
	rnoInnerhtml = /<script|<style|<link/i,

	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rscriptTypeMasked = /^true\/(.*)/,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;

// Manipulating tables requires a tbody
function manipulationTarget( elem, content ) {
	return jQuery.nodeName( elem, "table" ) &&
		jQuery.nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ?

		elem.getElementsByTagName( "tbody" )[ 0 ] ||
			elem.appendChild( elem.ownerDocument.createElement( "tbody" ) ) :
		elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	elem.type = ( elem.getAttribute( "type" ) !== null ) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	var match = rscriptTypeMasked.exec( elem.type );

	if ( match ) {
		elem.type = match[ 1 ];
	} else {
		elem.removeAttribute( "type" );
	}

	return elem;
}

function cloneCopyEvent( src, dest ) {
	var i, l, type, pdataOld, pdataCur, udataOld, udataCur, events;

	if ( dest.nodeType !== 1 ) {
		return;
	}

	// 1. Copy private data: events, handlers, etc.
	if ( dataPriv.hasData( src ) ) {
		pdataOld = dataPriv.access( src );
		pdataCur = dataPriv.set( dest, pdataOld );
		events = pdataOld.events;

		if ( events ) {
			delete pdataCur.handle;
			pdataCur.events = {};

			for ( type in events ) {
				for ( i = 0, l = events[ type ].length; i < l; i++ ) {
					jQuery.event.add( dest, type, events[ type ][ i ] );
				}
			}
		}
	}

	// 2. Copy user data
	if ( dataUser.hasData( src ) ) {
		udataOld = dataUser.access( src );
		udataCur = jQuery.extend( {}, udataOld );

		dataUser.set( dest, udataCur );
	}
}

// Fix IE bugs, see support tests
function fixInput( src, dest ) {
	var nodeName = dest.nodeName.toLowerCase();

	// Fails to persist the checked state of a cloned checkbox or radio button.
	if ( nodeName === "input" && rcheckableType.test( src.type ) ) {
		dest.checked = src.checked;

	// Fails to return the selected option to the default selected state when cloning options
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}

function domManip( collection, args, callback, ignored ) {

	// Flatten any nested arrays
	args = concat.apply( [], args );

	var fragment, first, scripts, hasScripts, node, doc,
		i = 0,
		l = collection.length,
		iNoClone = l - 1,
		value = args[ 0 ],
		isFunction = jQuery.isFunction( value );

	// We can't cloneNode fragments that contain checked, in WebKit
	if ( isFunction ||
			( l > 1 && typeof value === "string" &&
				!support.checkClone && rchecked.test( value ) ) ) {
		return collection.each( function( index ) {
			var self = collection.eq( index );
			if ( isFunction ) {
				args[ 0 ] = value.call( this, index, self.html() );
			}
			domManip( self, args, callback, ignored );
		} );
	}

	if ( l ) {
		fragment = buildFragment( args, collection[ 0 ].ownerDocument, false, collection, ignored );
		first = fragment.firstChild;

		if ( fragment.childNodes.length === 1 ) {
			fragment = first;
		}

		// Require either new content or an interest in ignored elements to invoke the callback
		if ( first || ignored ) {
			scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
			hasScripts = scripts.length;

			// Use the original fragment for the last item
			// instead of the first because it can end up
			// being emptied incorrectly in certain situations (#8070).
			for ( ; i < l; i++ ) {
				node = fragment;

				if ( i !== iNoClone ) {
					node = jQuery.clone( node, true, true );

					// Keep references to cloned scripts for later restoration
					if ( hasScripts ) {

						// Support: Android<4.1, PhantomJS<2
						// push.apply(_, arraylike) throws on ancient WebKit
						jQuery.merge( scripts, getAll( node, "script" ) );
					}
				}

				callback.call( collection[ i ], node, i );
			}

			if ( hasScripts ) {
				doc = scripts[ scripts.length - 1 ].ownerDocument;

				// Reenable scripts
				jQuery.map( scripts, restoreScript );

				// Evaluate executable scripts on first document insertion
				for ( i = 0; i < hasScripts; i++ ) {
					node = scripts[ i ];
					if ( rscriptType.test( node.type || "" ) &&
						!dataPriv.access( node, "globalEval" ) &&
						jQuery.contains( doc, node ) ) {

						if ( node.src ) {

							// Optional AJAX dependency, but won't run scripts if not present
							if ( jQuery._evalUrl ) {
								jQuery._evalUrl( node.src );
							}
						} else {
							jQuery.globalEval( node.textContent.replace( rcleanScript, "" ) );
						}
					}
				}
			}
		}
	}

	return collection;
}

function remove( elem, selector, keepData ) {
	var node,
		nodes = selector ? jQuery.filter( selector, elem ) : elem,
		i = 0;

	for ( ; ( node = nodes[ i ] ) != null; i++ ) {
		if ( !keepData && node.nodeType === 1 ) {
			jQuery.cleanData( getAll( node ) );
		}

		if ( node.parentNode ) {
			if ( keepData && jQuery.contains( node.ownerDocument, node ) ) {
				setGlobalEval( getAll( node, "script" ) );
			}
			node.parentNode.removeChild( node );
		}
	}

	return elem;
}

jQuery.extend( {
	htmlPrefilter: function( html ) {
		return html.replace( rxhtmlTag, "<$1></$2>" );
	},

	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var i, l, srcElements, destElements,
			clone = elem.cloneNode( true ),
			inPage = jQuery.contains( elem.ownerDocument, elem );

		// Fix IE cloning issues
		if ( !support.noCloneChecked && ( elem.nodeType === 1 || elem.nodeType === 11 ) &&
				!jQuery.isXMLDoc( elem ) ) {

			// We eschew Sizzle here for performance reasons: http://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			for ( i = 0, l = srcElements.length; i < l; i++ ) {
				fixInput( srcElements[ i ], destElements[ i ] );
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0, l = srcElements.length; i < l; i++ ) {
					cloneCopyEvent( srcElements[ i ], destElements[ i ] );
				}
			} else {
				cloneCopyEvent( elem, clone );
			}
		}

		// Preserve script evaluation history
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}

		// Return the cloned set
		return clone;
	},

	cleanData: function( elems ) {
		var data, elem, type,
			special = jQuery.event.special,
			i = 0;

		for ( ; ( elem = elems[ i ] ) !== undefined; i++ ) {
			if ( acceptData( elem ) ) {
				if ( ( data = elem[ dataPriv.expando ] ) ) {
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}

					// Support: Chrome <= 35-45+
					// Assign undefined instead of using delete, see Data#remove
					elem[ dataPriv.expando ] = undefined;
				}
				if ( elem[ dataUser.expando ] ) {

					// Support: Chrome <= 35-45+
					// Assign undefined instead of using delete, see Data#remove
					elem[ dataUser.expando ] = undefined;
				}
			}
		}
	}
} );

jQuery.fn.extend( {

	// Keep domManip exposed until 3.0 (gh-2225)
	domManip: domManip,

	detach: function( selector ) {
		return remove( this, selector, true );
	},

	remove: function( selector ) {
		return remove( this, selector );
	},

	text: function( value ) {
		return access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().each( function() {
					if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
						this.textContent = value;
					}
				} );
		}, null, value, arguments.length );
	},

	append: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.appendChild( elem );
			}
		} );
	},

	prepend: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.insertBefore( elem, target.firstChild );
			}
		} );
	},

	before: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		} );
	},

	after: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		} );
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; ( elem = this[ i ] ) != null; i++ ) {
			if ( elem.nodeType === 1 ) {

				// Prevent memory leaks
				jQuery.cleanData( getAll( elem, false ) );

				// Remove any remaining nodes
				elem.textContent = "";
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map( function() {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		} );
	},

	html: function( value ) {
		return access( this, function( value ) {
			var elem = this[ 0 ] || {},
				i = 0,
				l = this.length;

			if ( value === undefined && elem.nodeType === 1 ) {
				return elem.innerHTML;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				!wrapMap[ ( rtagName.exec( value ) || [ "", "" ] )[ 1 ].toLowerCase() ] ) {

				value = jQuery.htmlPrefilter( value );

				try {
					for ( ; i < l; i++ ) {
						elem = this[ i ] || {};

						// Remove element nodes and prevent memory leaks
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch ( e ) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function() {
		var ignored = [];

		// Make the changes, replacing each non-ignored context element with the new content
		return domManip( this, arguments, function( elem ) {
			var parent = this.parentNode;

			if ( jQuery.inArray( this, ignored ) < 0 ) {
				jQuery.cleanData( getAll( this ) );
				if ( parent ) {
					parent.replaceChild( elem, this );
				}
			}

		// Force callback invocation
		}, ignored );
	}
} );

jQuery.each( {
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1,
			i = 0;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone( true );
			jQuery( insert[ i ] )[ original ]( elems );

			// Support: QtWebKit
			// .get() because push.apply(_, arraylike) throws
			push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
} );


var iframe,
	elemdisplay = {

		// Support: Firefox
		// We have to pre-define these values for FF (#10227)
		HTML: "block",
		BODY: "block"
	};

/**
 * Retrieve the actual display of a element
 * @param {String} name nodeName of the element
 * @param {Object} doc Document object
 */

// Called only from within defaultDisplay
function actualDisplay( name, doc ) {
	var elem = jQuery( doc.createElement( name ) ).appendTo( doc.body ),

		display = jQuery.css( elem[ 0 ], "display" );

	// We don't have any data stored on the element,
	// so use "detach" method as fast way to get rid of the element
	elem.detach();

	return display;
}

/**
 * Try to determine the default display value of an element
 * @param {String} nodeName
 */
function defaultDisplay( nodeName ) {
	var doc = document,
		display = elemdisplay[ nodeName ];

	if ( !display ) {
		display = actualDisplay( nodeName, doc );

		// If the simple way fails, read from inside an iframe
		if ( display === "none" || !display ) {

			// Use the already-created iframe if possible
			iframe = ( iframe || jQuery( "<iframe frameborder='0' width='0' height='0'/>" ) )
				.appendTo( doc.documentElement );

			// Always write a new HTML skeleton so Webkit and Firefox don't choke on reuse
			doc = iframe[ 0 ].contentDocument;

			// Support: IE
			doc.write();
			doc.close();

			display = actualDisplay( nodeName, doc );
			iframe.detach();
		}

		// Store the correct default display
		elemdisplay[ nodeName ] = display;
	}

	return display;
}
var rmargin = ( /^margin/ );

var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );

var getStyles = function( elem ) {

		// Support: IE<=11+, Firefox<=30+ (#15098, #14150)
		// IE throws on elements created in popups
		// FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
		var view = elem.ownerDocument.defaultView;

		if ( !view || !view.opener ) {
			view = window;
		}

		return view.getComputedStyle( elem );
	};

var swap = function( elem, options, callback, args ) {
	var ret, name,
		old = {};

	// Remember the old values, and insert the new ones
	for ( name in options ) {
		old[ name ] = elem.style[ name ];
		elem.style[ name ] = options[ name ];
	}

	ret = callback.apply( elem, args || [] );

	// Revert the old values
	for ( name in options ) {
		elem.style[ name ] = old[ name ];
	}

	return ret;
};


var documentElement = document.documentElement;



( function() {
	var pixelPositionVal, boxSizingReliableVal, pixelMarginRightVal, reliableMarginLeftVal,
		container = document.createElement( "div" ),
		div = document.createElement( "div" );

	// Finish early in limited (non-browser) environments
	if ( !div.style ) {
		return;
	}

	// Support: IE9-11+
	// Style of cloned element affects source element cloned (#8908)
	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	container.style.cssText = "border:0;width:8px;height:0;top:0;left:-9999px;" +
		"padding:0;margin-top:1px;position:absolute";
	container.appendChild( div );

	// Executing both pixelPosition & boxSizingReliable tests require only one layout
	// so they're executed at the same time to save the second computation.
	function computeStyleTests() {
		div.style.cssText =

			// Support: Firefox<29, Android 2.3
			// Vendor-prefix box-sizing
			"-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;" +
			"position:relative;display:block;" +
			"margin:auto;border:1px;padding:1px;" +
			"top:1%;width:50%";
		div.innerHTML = "";
		documentElement.appendChild( container );

		var divStyle = window.getComputedStyle( div );
		pixelPositionVal = divStyle.top !== "1%";
		reliableMarginLeftVal = divStyle.marginLeft === "2px";
		boxSizingReliableVal = divStyle.width === "4px";

		// Support: Android 4.0 - 4.3 only
		// Some styles come back with percentage values, even though they shouldn't
		div.style.marginRight = "50%";
		pixelMarginRightVal = divStyle.marginRight === "4px";

		documentElement.removeChild( container );
	}

	jQuery.extend( support, {
		pixelPosition: function() {

			// This test is executed only once but we still do memoizing
			// since we can use the boxSizingReliable pre-computing.
			// No need to check if the test was already performed, though.
			computeStyleTests();
			return pixelPositionVal;
		},
		boxSizingReliable: function() {
			if ( boxSizingReliableVal == null ) {
				computeStyleTests();
			}
			return boxSizingReliableVal;
		},
		pixelMarginRight: function() {

			// Support: Android 4.0-4.3
			// We're checking for boxSizingReliableVal here instead of pixelMarginRightVal
			// since that compresses better and they're computed together anyway.
			if ( boxSizingReliableVal == null ) {
				computeStyleTests();
			}
			return pixelMarginRightVal;
		},
		reliableMarginLeft: function() {

			// Support: IE <=8 only, Android 4.0 - 4.3 only, Firefox <=3 - 37
			if ( boxSizingReliableVal == null ) {
				computeStyleTests();
			}
			return reliableMarginLeftVal;
		},
		reliableMarginRight: function() {

			// Support: Android 2.3
			// Check if div with explicit width and no margin-right incorrectly
			// gets computed margin-right based on width of container. (#3333)
			// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
			// This support function is only executed once so no memoizing is needed.
			var ret,
				marginDiv = div.appendChild( document.createElement( "div" ) );

			// Reset CSS: box-sizing; display; margin; border; padding
			marginDiv.style.cssText = div.style.cssText =

				// Support: Android 2.3
				// Vendor-prefix box-sizing
				"-webkit-box-sizing:content-box;box-sizing:content-box;" +
				"display:block;margin:0;border:0;padding:0";
			marginDiv.style.marginRight = marginDiv.style.width = "0";
			div.style.width = "1px";
			documentElement.appendChild( container );

			ret = !parseFloat( window.getComputedStyle( marginDiv ).marginRight );

			documentElement.removeChild( container );
			div.removeChild( marginDiv );

			return ret;
		}
	} );
} )();


function curCSS( elem, name, computed ) {
	var width, minWidth, maxWidth, ret,
		style = elem.style;

	computed = computed || getStyles( elem );
	ret = computed ? computed.getPropertyValue( name ) || computed[ name ] : undefined;

	// Support: Opera 12.1x only
	// Fall back to style even without computed
	// computed is undefined for elems on document fragments
	if ( ( ret === "" || ret === undefined ) && !jQuery.contains( elem.ownerDocument, elem ) ) {
		ret = jQuery.style( elem, name );
	}

	// Support: IE9
	// getPropertyValue is only needed for .css('filter') (#12537)
	if ( computed ) {

		// A tribute to the "awesome hack by Dean Edwards"
		// Android Browser returns percentage for some values,
		// but width seems to be reliably pixels.
		// This is against the CSSOM draft spec:
		// http://dev.w3.org/csswg/cssom/#resolved-values
		if ( !support.pixelMarginRight() && rnumnonpx.test( ret ) && rmargin.test( name ) ) {

			// Remember the original values
			width = style.width;
			minWidth = style.minWidth;
			maxWidth = style.maxWidth;

			// Put in the new values to get a computed value out
			style.minWidth = style.maxWidth = style.width = ret;
			ret = computed.width;

			// Revert the changed values
			style.width = width;
			style.minWidth = minWidth;
			style.maxWidth = maxWidth;
		}
	}

	return ret !== undefined ?

		// Support: IE9-11+
		// IE returns zIndex value as an integer.
		ret + "" :
		ret;
}


function addGetHookIf( conditionFn, hookFn ) {

	// Define the hook, we'll check on the first run if it's really needed.
	return {
		get: function() {
			if ( conditionFn() ) {

				// Hook not needed (or it's not possible to use it due
				// to missing dependency), remove it.
				delete this.get;
				return;
			}

			// Hook needed; redefine it so that the support test is not executed again.
			return ( this.get = hookFn ).apply( this, arguments );
		}
	};
}


var

	// Swappable if display is none or starts with table
	// except "table", "table-cell", or "table-caption"
	// See here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,

	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: "0",
		fontWeight: "400"
	},

	cssPrefixes = [ "Webkit", "O", "Moz", "ms" ],
	emptyStyle = document.createElement( "div" ).style;

// Return a css property mapped to a potentially vendor prefixed property
function vendorPropName( name ) {

	// Shortcut for names that are not vendor prefixed
	if ( name in emptyStyle ) {
		return name;
	}

	// Check for vendor prefixed names
	var capName = name[ 0 ].toUpperCase() + name.slice( 1 ),
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in emptyStyle ) {
			return name;
		}
	}
}

function setPositiveNumber( elem, value, subtract ) {

	// Any relative (+/-) values have already been
	// normalized at this point
	var matches = rcssNum.exec( value );
	return matches ?

		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 2 ] - ( subtract || 0 ) ) + ( matches[ 3 ] || "px" ) :
		value;
}

function augmentWidthOrHeight( elem, name, extra, isBorderBox, styles ) {
	var i = extra === ( isBorderBox ? "border" : "content" ) ?

		// If we already have the right measurement, avoid augmentation
		4 :

		// Otherwise initialize for horizontal or vertical properties
		name === "width" ? 1 : 0,

		val = 0;

	for ( ; i < 4; i += 2 ) {

		// Both box models exclude margin, so add it if we want it
		if ( extra === "margin" ) {
			val += jQuery.css( elem, extra + cssExpand[ i ], true, styles );
		}

		if ( isBorderBox ) {

			// border-box includes padding, so remove it if we want content
			if ( extra === "content" ) {
				val -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// At this point, extra isn't border nor margin, so remove border
			if ( extra !== "margin" ) {
				val -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		} else {

			// At this point, extra isn't content, so add padding
			val += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// At this point, extra isn't content nor padding, so add border
			if ( extra !== "padding" ) {
				val += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	return val;
}

function getWidthOrHeight( elem, name, extra ) {

	// Start with offset property, which is equivalent to the border-box value
	var valueIsBorderBox = true,
		val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
		styles = getStyles( elem ),
		isBorderBox = jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

	// Support: IE11 only
	// In IE 11 fullscreen elements inside of an iframe have
	// 100x too small dimensions (gh-1764).
	if ( document.msFullscreenElement && window.top !== window ) {

		// Support: IE11 only
		// Running getBoundingClientRect on a disconnected node
		// in IE throws an error.
		if ( elem.getClientRects().length ) {
			val = Math.round( elem.getBoundingClientRect()[ name ] * 100 );
		}
	}

	// Some non-html elements return undefined for offsetWidth, so check for null/undefined
	// svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
	// MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
	if ( val <= 0 || val == null ) {

		// Fall back to computed then uncomputed css if necessary
		val = curCSS( elem, name, styles );
		if ( val < 0 || val == null ) {
			val = elem.style[ name ];
		}

		// Computed unit is not pixels. Stop here and return.
		if ( rnumnonpx.test( val ) ) {
			return val;
		}

		// Check for style in case a browser which returns unreliable values
		// for getComputedStyle silently falls back to the reliable elem.style
		valueIsBorderBox = isBorderBox &&
			( support.boxSizingReliable() || val === elem.style[ name ] );

		// Normalize "", auto, and prepare for extra
		val = parseFloat( val ) || 0;
	}

	// Use the active box-sizing model to add/subtract irrelevant styles
	return ( val +
		augmentWidthOrHeight(
			elem,
			name,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles
		)
	) + "px";
}

function showHide( elements, show ) {
	var display, elem, hidden,
		values = [],
		index = 0,
		length = elements.length;

	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}

		values[ index ] = dataPriv.get( elem, "olddisplay" );
		display = elem.style.display;
		if ( show ) {

			// Reset the inline display of this element to learn if it is
			// being hidden by cascaded rules or not
			if ( !values[ index ] && display === "none" ) {
				elem.style.display = "";
			}

			// Set elements which have been overridden with display: none
			// in a stylesheet to whatever the default browser style is
			// for such an element
			if ( elem.style.display === "" && isHidden( elem ) ) {
				values[ index ] = dataPriv.access(
					elem,
					"olddisplay",
					defaultDisplay( elem.nodeName )
				);
			}
		} else {
			hidden = isHidden( elem );

			if ( display !== "none" || !hidden ) {
				dataPriv.set(
					elem,
					"olddisplay",
					hidden ? display : jQuery.css( elem, "display" )
				);
			}
		}
	}

	// Set the display of most of the elements in a second loop
	// to avoid the constant reflow
	for ( index = 0; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}
		if ( !show || elem.style.display === "none" || elem.style.display === "" ) {
			elem.style.display = show ? values[ index ] || "" : "none";
		}
	}

	return elements;
}

jQuery.extend( {

	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {

					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;
				}
			}
		}
	},

	// Don't automatically add "px" to these possibly-unitless properties
	cssNumber: {
		"animationIterationCount": true,
		"columnCount": true,
		"fillOpacity": true,
		"flexGrow": true,
		"flexShrink": true,
		"fontWeight": true,
		"lineHeight": true,
		"opacity": true,
		"order": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {
		"float": "cssFloat"
	},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {

		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = jQuery.camelCase( name ),
			style = elem.style;

		name = jQuery.cssProps[ origName ] ||
			( jQuery.cssProps[ origName ] = vendorPropName( origName ) || origName );

		// Gets hook for the prefixed version, then unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// Convert "+=" or "-=" to relative numbers (#7345)
			if ( type === "string" && ( ret = rcssNum.exec( value ) ) && ret[ 1 ] ) {
				value = adjustCSS( elem, name, ret );

				// Fixes bug #9237
				type = "number";
			}

			// Make sure that null and NaN values aren't set (#7116)
			if ( value == null || value !== value ) {
				return;
			}

			// If a number was passed in, add the unit (except for certain CSS properties)
			if ( type === "number" ) {
				value += ret && ret[ 3 ] || ( jQuery.cssNumber[ origName ] ? "" : "px" );
			}

			// Support: IE9-11+
			// background-* props affect original clone's values
			if ( !support.clearCloneStyle && value === "" && name.indexOf( "background" ) === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !( "set" in hooks ) ||
				( value = hooks.set( elem, value, extra ) ) !== undefined ) {

				style[ name ] = value;
			}

		} else {

			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks &&
				( ret = hooks.get( elem, false, extra ) ) !== undefined ) {

				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra, styles ) {
		var val, num, hooks,
			origName = jQuery.camelCase( name );

		// Make sure that we're working with the right name
		name = jQuery.cssProps[ origName ] ||
			( jQuery.cssProps[ origName ] = vendorPropName( origName ) || origName );

		// Try prefixed name followed by the unprefixed name
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}

		// Convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Make numeric if forced or a qualifier was provided and val looks numeric
		if ( extra === "" || extra ) {
			num = parseFloat( val );
			return extra === true || isFinite( num ) ? num || 0 : val;
		}
		return val;
	}
} );

jQuery.each( [ "height", "width" ], function( i, name ) {
	jQuery.cssHooks[ name ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {

				// Certain elements can have dimension info if we invisibly show them
				// but it must have a current display style that would benefit
				return rdisplayswap.test( jQuery.css( elem, "display" ) ) &&
					elem.offsetWidth === 0 ?
						swap( elem, cssShow, function() {
							return getWidthOrHeight( elem, name, extra );
						} ) :
						getWidthOrHeight( elem, name, extra );
			}
		},

		set: function( elem, value, extra ) {
			var matches,
				styles = extra && getStyles( elem ),
				subtract = extra && augmentWidthOrHeight(
					elem,
					name,
					extra,
					jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
					styles
				);

			// Convert to pixels if value adjustment is needed
			if ( subtract && ( matches = rcssNum.exec( value ) ) &&
				( matches[ 3 ] || "px" ) !== "px" ) {

				elem.style[ name ] = value;
				value = jQuery.css( elem, name );
			}

			return setPositiveNumber( elem, value, subtract );
		}
	};
} );

jQuery.cssHooks.marginLeft = addGetHookIf( support.reliableMarginLeft,
	function( elem, computed ) {
		if ( computed ) {
			return ( parseFloat( curCSS( elem, "marginLeft" ) ) ||
				elem.getBoundingClientRect().left -
					swap( elem, { marginLeft: 0 }, function() {
						return elem.getBoundingClientRect().left;
					} )
				) + "px";
		}
	}
);

// Support: Android 2.3
jQuery.cssHooks.marginRight = addGetHookIf( support.reliableMarginRight,
	function( elem, computed ) {
		if ( computed ) {
			return swap( elem, { "display": "inline-block" },
				curCSS, [ elem, "marginRight" ] );
		}
	}
);

// These hooks are used by animate to expand properties
jQuery.each( {
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},

				// Assumes a single number if not a string
				parts = typeof value === "string" ? value.split( " " ) : [ value ];

			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( !rmargin.test( prefix ) ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
} );

jQuery.fn.extend( {
	css: function( name, value ) {
		return access( this, function( elem, name, value ) {
			var styles, len,
				map = {},
				i = 0;

			if ( jQuery.isArray( name ) ) {
				styles = getStyles( elem );
				len = name.length;

				for ( ; i < len; i++ ) {
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				}

				return map;
			}

			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	},
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state ) {
		if ( typeof state === "boolean" ) {
			return state ? this.show() : this.hide();
		}

		return this.each( function() {
			if ( isHidden( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		} );
	}
} );


function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || jQuery.easing._default;
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			// Use a property on the element directly when it is not a DOM element,
			// or when there is no matching style property that exists.
			if ( tween.elem.nodeType !== 1 ||
				tween.elem[ tween.prop ] != null && tween.elem.style[ tween.prop ] == null ) {
				return tween.elem[ tween.prop ];
			}

			// Passing an empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails.
			// Simple values such as "10px" are parsed to Float;
			// complex values such as "rotate(1rad)" are returned as-is.
			result = jQuery.css( tween.elem, tween.prop, "" );

			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {

			// Use step hook for back compat.
			// Use cssHook if its there.
			// Use .style if available and use plain properties where available.
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.nodeType === 1 &&
				( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null ||
					jQuery.cssHooks[ tween.prop ] ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Support: IE9
// Panic based approach to setting things on disconnected nodes
Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p * Math.PI ) / 2;
	},
	_default: "swing"
};

jQuery.fx = Tween.prototype.init;

// Back Compat <1.8 extension point
jQuery.fx.step = {};




var
	fxNow, timerId,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rrun = /queueHooks$/;

// Animations created synchronously will run synchronously
function createFxNow() {
	window.setTimeout( function() {
		fxNow = undefined;
	} );
	return ( fxNow = jQuery.now() );
}

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		i = 0,
		attrs = { height: type };

	// If we include width, step value is 1 to do all cssExpand values,
	// otherwise step value is 2 to skip over Left and Right
	includeWidth = includeWidth ? 1 : 0;
	for ( ; i < 4 ; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

function createTween( value, prop, animation ) {
	var tween,
		collection = ( Animation.tweeners[ prop ] || [] ).concat( Animation.tweeners[ "*" ] ),
		index = 0,
		length = collection.length;
	for ( ; index < length; index++ ) {
		if ( ( tween = collection[ index ].call( animation, prop, value ) ) ) {

			// We're done with this property
			return tween;
		}
	}
}

function defaultPrefilter( elem, props, opts ) {
	/* jshint validthis: true */
	var prop, value, toggle, tween, hooks, oldfire, display, checkDisplay,
		anim = this,
		orig = {},
		style = elem.style,
		hidden = elem.nodeType && isHidden( elem ),
		dataShow = dataPriv.get( elem, "fxshow" );

	// Handle queue: false promises
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always( function() {

			// Ensure the complete handler is called before this completes
			anim.always( function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			} );
		} );
	}

	// Height/width overflow pass
	if ( elem.nodeType === 1 && ( "height" in props || "width" in props ) ) {

		// Make sure that nothing sneaks out
		// Record all 3 overflow attributes because IE9-10 do not
		// change the overflow attribute when overflowX and
		// overflowY are set to the same value
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Set display property to inline-block for height/width
		// animations on inline elements that are having width/height animated
		display = jQuery.css( elem, "display" );

		// Test default display if display is currently "none"
		checkDisplay = display === "none" ?
			dataPriv.get( elem, "olddisplay" ) || defaultDisplay( elem.nodeName ) : display;

		if ( checkDisplay === "inline" && jQuery.css( elem, "float" ) === "none" ) {
			style.display = "inline-block";
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		anim.always( function() {
			style.overflow = opts.overflow[ 0 ];
			style.overflowX = opts.overflow[ 1 ];
			style.overflowY = opts.overflow[ 2 ];
		} );
	}

	// show/hide pass
	for ( prop in props ) {
		value = props[ prop ];
		if ( rfxtypes.exec( value ) ) {
			delete props[ prop ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {

				// If there is dataShow left over from a stopped hide or show
				// and we are going to proceed with show, we should pretend to be hidden
				if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
					hidden = true;
				} else {
					continue;
				}
			}
			orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );

		// Any non-fx value stops us from restoring the original display value
		} else {
			display = undefined;
		}
	}

	if ( !jQuery.isEmptyObject( orig ) ) {
		if ( dataShow ) {
			if ( "hidden" in dataShow ) {
				hidden = dataShow.hidden;
			}
		} else {
			dataShow = dataPriv.access( elem, "fxshow", {} );
		}

		// Store state if its toggle - enables .stop().toggle() to "reverse"
		if ( toggle ) {
			dataShow.hidden = !hidden;
		}
		if ( hidden ) {
			jQuery( elem ).show();
		} else {
			anim.done( function() {
				jQuery( elem ).hide();
			} );
		}
		anim.done( function() {
			var prop;

			dataPriv.remove( elem, "fxshow" );
			for ( prop in orig ) {
				jQuery.style( elem, prop, orig[ prop ] );
			}
		} );
		for ( prop in orig ) {
			tween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );

			if ( !( prop in dataShow ) ) {
				dataShow[ prop ] = tween.start;
				if ( hidden ) {
					tween.end = tween.start;
					tween.start = prop === "width" || prop === "height" ? 1 : 0;
				}
			}
		}

	// If this is a noop like .hide().hide(), restore an overwritten display value
	} else if ( ( display === "none" ? defaultDisplay( elem.nodeName ) : display ) === "inline" ) {
		style.display = display;
	}
}

function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = jQuery.camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( jQuery.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// Not quite $.extend, this won't overwrite existing keys.
			// Reusing 'index' because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

function Animation( elem, properties, options ) {
	var result,
		stopped,
		index = 0,
		length = Animation.prefilters.length,
		deferred = jQuery.Deferred().always( function() {

			// Don't match elem in the :animated selector
			delete tick.elem;
		} ),
		tick = function() {
			if ( stopped ) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),

				// Support: Android 2.3
				// Archaic crash bug won't allow us to use `1 - ( 0.5 || 0 )` (#12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length ; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ] );

			if ( percent < 1 && length ) {
				return remaining;
			} else {
				deferred.resolveWith( elem, [ animation ] );
				return false;
			}
		},
		animation = deferred.promise( {
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, {
				specialEasing: {},
				easing: jQuery.easing._default
			}, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
						animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,

					// If we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
				if ( stopped ) {
					return this;
				}
				stopped = true;
				for ( ; index < length ; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// Resolve when we played the last frame; otherwise, reject
				if ( gotoEnd ) {
					deferred.notifyWith( elem, [ animation, 1, 0 ] );
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		} ),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length ; index++ ) {
		result = Animation.prefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			if ( jQuery.isFunction( result.stop ) ) {
				jQuery._queueHooks( animation.elem, animation.opts.queue ).stop =
					jQuery.proxy( result.stop, result );
			}
			return result;
		}
	}

	jQuery.map( props, createTween, animation );

	if ( jQuery.isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	jQuery.fx.timer(
		jQuery.extend( tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		} )
	);

	// attach callbacks from options
	return animation.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );
}

jQuery.Animation = jQuery.extend( Animation, {
	tweeners: {
		"*": [ function( prop, value ) {
			var tween = this.createTween( prop, value );
			adjustCSS( tween.elem, prop, rcssNum.exec( value ), tween );
			return tween;
		} ]
	},

	tweener: function( props, callback ) {
		if ( jQuery.isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.match( rnotwhite );
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length ; index++ ) {
			prop = props[ index ];
			Animation.tweeners[ prop ] = Animation.tweeners[ prop ] || [];
			Animation.tweeners[ prop ].unshift( callback );
		}
	},

	prefilters: [ defaultPrefilter ],

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			Animation.prefilters.unshift( callback );
		} else {
			Animation.prefilters.push( callback );
		}
	}
} );

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			jQuery.isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
	};

	opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ?
		opt.duration : opt.duration in jQuery.fx.speeds ?
			jQuery.fx.speeds[ opt.duration ] : jQuery.fx.speeds._default;

	// Normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( jQuery.isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.fn.extend( {
	fadeTo: function( speed, to, easing, callback ) {

		// Show any hidden elements after setting opacity to 0
		return this.filter( isHidden ).css( "opacity", 0 ).show()

			// Animate to the value specified
			.end().animate( { opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {

				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Empty animations, or finishing resolves immediately
				if ( empty || dataPriv.get( this, "finish" ) ) {
					anim.stop( true );
				}
			};
			doAnimation.finish = doAnimation;

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue && type !== false ) {
			this.queue( type || "fx", [] );
		}

		return this.each( function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = dataPriv.get( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this &&
					( type == null || timers[ index ].queue === type ) ) {

					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// Start the next in the queue if the last step wasn't forced.
			// Timers currently will call their complete callbacks, which
			// will dequeue but only if they were gotoEnd.
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		} );
	},
	finish: function( type ) {
		if ( type !== false ) {
			type = type || "fx";
		}
		return this.each( function() {
			var index,
				data = dataPriv.get( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// Enable finishing flag on private data
			data.finish = true;

			// Empty the queue first
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.stop ) {
				hooks.stop.call( this, true );
			}

			// Look for any active animations, and finish them
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}

			// Look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}

			// Turn off finishing flag
			delete data.finish;
		} );
	}
} );

jQuery.each( [ "toggle", "show", "hide" ], function( i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
} );

// Generate shortcuts for custom animations
jQuery.each( {
	slideDown: genFx( "show" ),
	slideUp: genFx( "hide" ),
	slideToggle: genFx( "toggle" ),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
} );

jQuery.timers = [];
jQuery.fx.tick = function() {
	var timer,
		i = 0,
		timers = jQuery.timers;

	fxNow = jQuery.now();

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];

		// Checks the timer has not already been removed
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
	fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
	jQuery.timers.push( timer );
	if ( timer() ) {
		jQuery.fx.start();
	} else {
		jQuery.timers.pop();
	}
};

jQuery.fx.interval = 13;
jQuery.fx.start = function() {
	if ( !timerId ) {
		timerId = window.setInterval( jQuery.fx.tick, jQuery.fx.interval );
	}
};

jQuery.fx.stop = function() {
	window.clearInterval( timerId );

	timerId = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,

	// Default speed
	_default: 400
};


// Based off of the plugin by Clint Helfers, with permission.
// http://web.archive.org/web/20100324014747/http://blindsignals.com/index.php/2009/07/jquery-delay/
jQuery.fn.delay = function( time, type ) {
	time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
	type = type || "fx";

	return this.queue( type, function( next, hooks ) {
		var timeout = window.setTimeout( next, time );
		hooks.stop = function() {
			window.clearTimeout( timeout );
		};
	} );
};


( function() {
	var input = document.createElement( "input" ),
		select = document.createElement( "select" ),
		opt = select.appendChild( document.createElement( "option" ) );

	input.type = "checkbox";

	// Support: iOS<=5.1, Android<=4.2+
	// Default value for a checkbox should be "on"
	support.checkOn = input.value !== "";

	// Support: IE<=11+
	// Must access selectedIndex to make default options select
	support.optSelected = opt.selected;

	// Support: Android<=2.3
	// Options inside disabled selects are incorrectly marked as disabled
	select.disabled = true;
	support.optDisabled = !opt.disabled;

	// Support: IE<=11+
	// An input loses its value after becoming a radio
	input = document.createElement( "input" );
	input.value = "t";
	input.type = "radio";
	support.radioValue = input.value === "t";
} )();


var boolHook,
	attrHandle = jQuery.expr.attrHandle;

jQuery.fn.extend( {
	attr: function( name, value ) {
		return access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each( function() {
			jQuery.removeAttr( this, name );
		} );
	}
} );

jQuery.extend( {
	attr: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set attributes on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === "undefined" ) {
			return jQuery.prop( elem, name, value );
		}

		// All attributes are lowercase
		// Grab necessary hook if one is defined
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			name = name.toLowerCase();
			hooks = jQuery.attrHooks[ name ] ||
				( jQuery.expr.match.bool.test( name ) ? boolHook : undefined );
		}

		if ( value !== undefined ) {
			if ( value === null ) {
				jQuery.removeAttr( elem, name );
				return;
			}

			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			elem.setAttribute( name, value + "" );
			return value;
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		ret = jQuery.find.attr( elem, name );

		// Non-existent attributes return null, we normalize to undefined
		return ret == null ? undefined : ret;
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !support.radioValue && value === "radio" &&
					jQuery.nodeName( elem, "input" ) ) {
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	},

	removeAttr: function( elem, value ) {
		var name, propName,
			i = 0,
			attrNames = value && value.match( rnotwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( ( name = attrNames[ i++ ] ) ) {
				propName = jQuery.propFix[ name ] || name;

				// Boolean attributes get special treatment (#10870)
				if ( jQuery.expr.match.bool.test( name ) ) {

					// Set corresponding property to false
					elem[ propName ] = false;
				}

				elem.removeAttribute( name );
			}
		}
	}
} );

// Hooks for boolean attributes
boolHook = {
	set: function( elem, value, name ) {
		if ( value === false ) {

			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else {
			elem.setAttribute( name, name );
		}
		return name;
	}
};
jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {
	var getter = attrHandle[ name ] || jQuery.find.attr;

	attrHandle[ name ] = function( elem, name, isXML ) {
		var ret, handle;
		if ( !isXML ) {

			// Avoid an infinite loop by temporarily removing this function from the getter
			handle = attrHandle[ name ];
			attrHandle[ name ] = ret;
			ret = getter( elem, name, isXML ) != null ?
				name.toLowerCase() :
				null;
			attrHandle[ name ] = handle;
		}
		return ret;
	};
} );




var rfocusable = /^(?:input|select|textarea|button)$/i,
	rclickable = /^(?:a|area)$/i;

jQuery.fn.extend( {
	prop: function( name, value ) {
		return access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		return this.each( function() {
			delete this[ jQuery.propFix[ name ] || name ];
		} );
	}
} );

jQuery.extend( {
	prop: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set properties on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {

			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			return ( elem[ name ] = value );
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		return elem[ name ];
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {

				// elem.tabIndex doesn't always return the
				// correct value when it hasn't been explicitly set
				// http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
				// Use proper attribute retrieval(#12072)
				var tabindex = jQuery.find.attr( elem, "tabindex" );

				return tabindex ?
					parseInt( tabindex, 10 ) :
					rfocusable.test( elem.nodeName ) ||
						rclickable.test( elem.nodeName ) && elem.href ?
							0 :
							-1;
			}
		}
	},

	propFix: {
		"for": "htmlFor",
		"class": "className"
	}
} );

if ( !support.optSelected ) {
	jQuery.propHooks.selected = {
		get: function( elem ) {
			var parent = elem.parentNode;
			if ( parent && parent.parentNode ) {
				parent.parentNode.selectedIndex;
			}
			return null;
		}
	};
}

jQuery.each( [
	"tabIndex",
	"readOnly",
	"maxLength",
	"cellSpacing",
	"cellPadding",
	"rowSpan",
	"colSpan",
	"useMap",
	"frameBorder",
	"contentEditable"
], function() {
	jQuery.propFix[ this.toLowerCase() ] = this;
} );




var rclass = /[\t\r\n\f]/g;

function getClass( elem ) {
	return elem.getAttribute && elem.getAttribute( "class" ) || "";
}

jQuery.fn.extend( {
	addClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).addClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		if ( typeof value === "string" && value ) {
			classes = value.match( rnotwhite ) || [];

			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );
				cur = elem.nodeType === 1 &&
					( " " + curValue + " " ).replace( rclass, " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " ";
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = jQuery.trim( cur );
					if ( curValue !== finalValue ) {
						elem.setAttribute( "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).removeClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		if ( !arguments.length ) {
			return this.attr( "class", "" );
		}

		if ( typeof value === "string" && value ) {
			classes = value.match( rnotwhite ) || [];

			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );

				// This expression is here for better compressibility (see addClass)
				cur = elem.nodeType === 1 &&
					( " " + curValue + " " ).replace( rclass, " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {

						// Remove *all* instances
						while ( cur.indexOf( " " + clazz + " " ) > -1 ) {
							cur = cur.replace( " " + clazz + " ", " " );
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = jQuery.trim( cur );
					if ( curValue !== finalValue ) {
						elem.setAttribute( "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value;

		if ( typeof stateVal === "boolean" && type === "string" ) {
			return stateVal ? this.addClass( value ) : this.removeClass( value );
		}

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( i ) {
				jQuery( this ).toggleClass(
					value.call( this, i, getClass( this ), stateVal ),
					stateVal
				);
			} );
		}

		return this.each( function() {
			var className, i, self, classNames;

			if ( type === "string" ) {

				// Toggle individual class names
				i = 0;
				self = jQuery( this );
				classNames = value.match( rnotwhite ) || [];

				while ( ( className = classNames[ i++ ] ) ) {

					// Check each className given, space separated list
					if ( self.hasClass( className ) ) {
						self.removeClass( className );
					} else {
						self.addClass( className );
					}
				}

			// Toggle whole class name
			} else if ( value === undefined || type === "boolean" ) {
				className = getClass( this );
				if ( className ) {

					// Store className if set
					dataPriv.set( this, "__className__", className );
				}

				// If the element has a class name or if we're passed `false`,
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				if ( this.setAttribute ) {
					this.setAttribute( "class",
						className || value === false ?
						"" :
						dataPriv.get( this, "__className__" ) || ""
					);
				}
			}
		} );
	},

	hasClass: function( selector ) {
		var className, elem,
			i = 0;

		className = " " + selector + " ";
		while ( ( elem = this[ i++ ] ) ) {
			if ( elem.nodeType === 1 &&
				( " " + getClass( elem ) + " " ).replace( rclass, " " )
					.indexOf( className ) > -1
			) {
				return true;
			}
		}

		return false;
	}
} );




var rreturn = /\r/g;

jQuery.fn.extend( {
	val: function( value ) {
		var hooks, ret, isFunction,
			elem = this[ 0 ];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] ||
					jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if ( hooks &&
					"get" in hooks &&
					( ret = hooks.get( elem, "value" ) ) !== undefined
				) {
					return ret;
				}

				ret = elem.value;

				return typeof ret === "string" ?

					// Handle most common string cases
					ret.replace( rreturn, "" ) :

					// Handle cases where value is null/undef or number
					ret == null ? "" : ret;
			}

			return;
		}

		isFunction = jQuery.isFunction( value );

		return this.each( function( i ) {
			var val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( isFunction ) {
				val = value.call( this, i, jQuery( this ).val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";

			} else if ( typeof val === "number" ) {
				val += "";

			} else if ( jQuery.isArray( val ) ) {
				val = jQuery.map( val, function( value ) {
					return value == null ? "" : value + "";
				} );
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !( "set" in hooks ) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		} );
	}
} );

jQuery.extend( {
	valHooks: {
		option: {
			get: function( elem ) {

				// Support: IE<11
				// option.value not trimmed (#14858)
				return jQuery.trim( elem.value );
			}
		},
		select: {
			get: function( elem ) {
				var value, option,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one" || index < 0,
					values = one ? null : [],
					max = one ? index + 1 : options.length,
					i = index < 0 ?
						max :
						one ? index : 0;

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// IE8-9 doesn't update selected after form reset (#2551)
					if ( ( option.selected || i === index ) &&

							// Don't return options that are disabled or in a disabled optgroup
							( support.optDisabled ?
								!option.disabled : option.getAttribute( "disabled" ) === null ) &&
							( !option.parentNode.disabled ||
								!jQuery.nodeName( option.parentNode, "optgroup" ) ) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				return values;
			},

			set: function( elem, value ) {
				var optionSet, option,
					options = elem.options,
					values = jQuery.makeArray( value ),
					i = options.length;

				while ( i-- ) {
					option = options[ i ];
					if ( option.selected =
							jQuery.inArray( jQuery.valHooks.option.get( option ), values ) > -1
					) {
						optionSet = true;
					}
				}

				// Force browsers to behave consistently when non-matching value is set
				if ( !optionSet ) {
					elem.selectedIndex = -1;
				}
				return values;
			}
		}
	}
} );

// Radios and checkboxes getter/setter
jQuery.each( [ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {
			if ( jQuery.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery( elem ).val(), value ) > -1 );
			}
		}
	};
	if ( !support.checkOn ) {
		jQuery.valHooks[ this ].get = function( elem ) {
			return elem.getAttribute( "value" ) === null ? "on" : elem.value;
		};
	}
} );




// Return jQuery for attributes-only inclusion


var rfocusMorph = /^(?:focusinfocus|focusoutblur)$/;

jQuery.extend( jQuery.event, {

	trigger: function( event, data, elem, onlyHandlers ) {

		var i, cur, tmp, bubbleType, ontype, handle, special,
			eventPath = [ elem || document ],
			type = hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split( "." ) : [];

		cur = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf( "." ) > -1 ) {

			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split( "." );
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf( ":" ) < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
		event.isTrigger = onlyHandlers ? 2 : 3;
		event.namespace = namespaces.join( "." );
		event.rnamespace = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === ( elem.ownerDocument || document ) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		i = 0;
		while ( ( cur = eventPath[ i++ ] ) && !event.isPropagationStopped() ) {

			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = ( dataPriv.get( cur, "events" ) || {} )[ event.type ] &&
				dataPriv.get( cur, "handle" );
			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && handle.apply && acceptData( cur ) ) {
				event.result = handle.apply( cur, data );
				if ( event.result === false ) {
					event.preventDefault();
				}
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if ( ( !special._default ||
				special._default.apply( eventPath.pop(), data ) === false ) &&
				acceptData( elem ) ) {

				// Call a native DOM method on the target with the same name name as the event.
				// Don't do default actions on window, that's where global variables be (#6170)
				if ( ontype && jQuery.isFunction( elem[ type ] ) && !jQuery.isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;
					elem[ type ]();
					jQuery.event.triggered = undefined;

					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}

		return event.result;
	},

	// Piggyback on a donor event to simulate a different one
	simulate: function( type, elem, event ) {
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{
				type: type,
				isSimulated: true

				// Previously, `originalEvent: {}` was set here, so stopPropagation call
				// would not be triggered on donor event, since in our own
				// jQuery.event.stopPropagation function we had a check for existence of
				// originalEvent.stopPropagation method, so, consequently it would be a noop.
				//
				// But now, this "simulate" function is used only for events
				// for which stopPropagation() is noop, so there is no need for that anymore.
				//
				// For the 1.x branch though, guard for "click" and "submit"
				// events is still used, but was moved to jQuery.event.stopPropagation function
				// because `originalEvent` should point to the original event for the constancy
				// with other events and for more focused logic
			}
		);

		jQuery.event.trigger( e, null, elem );

		if ( e.isDefaultPrevented() ) {
			event.preventDefault();
		}
	}

} );

jQuery.fn.extend( {

	trigger: function( type, data ) {
		return this.each( function() {
			jQuery.event.trigger( type, data, this );
		} );
	},
	triggerHandler: function( type, data ) {
		var elem = this[ 0 ];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	}
} );


jQuery.each( ( "blur focus focusin focusout load resize scroll unload click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup error contextmenu" ).split( " " ),
	function( i, name ) {

	// Handle event binding
	jQuery.fn[ name ] = function( data, fn ) {
		return arguments.length > 0 ?
			this.on( name, null, data, fn ) :
			this.trigger( name );
	};
} );

jQuery.fn.extend( {
	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	}
} );




support.focusin = "onfocusin" in window;


// Support: Firefox
// Firefox doesn't have focus(in | out) events
// Related ticket - https://bugzilla.mozilla.org/show_bug.cgi?id=687787
//
// Support: Chrome, Safari
// focus(in | out) events fire after focus & blur events,
// which is spec violation - http://www.w3.org/TR/DOM-Level-3-Events/#events-focusevent-event-order
// Related ticket - https://code.google.com/p/chromium/issues/detail?id=449857
if ( !support.focusin ) {
	jQuery.each( { focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler on the document while someone wants focusin/focusout
		var handler = function( event ) {
			jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ) );
		};

		jQuery.event.special[ fix ] = {
			setup: function() {
				var doc = this.ownerDocument || this,
					attaches = dataPriv.access( doc, fix );

				if ( !attaches ) {
					doc.addEventListener( orig, handler, true );
				}
				dataPriv.access( doc, fix, ( attaches || 0 ) + 1 );
			},
			teardown: function() {
				var doc = this.ownerDocument || this,
					attaches = dataPriv.access( doc, fix ) - 1;

				if ( !attaches ) {
					doc.removeEventListener( orig, handler, true );
					dataPriv.remove( doc, fix );

				} else {
					dataPriv.access( doc, fix, attaches );
				}
			}
		};
	} );
}
var location = window.location;

var nonce = jQuery.now();

var rquery = ( /\?/ );



// Support: Android 2.3
// Workaround failure to string-cast null input
jQuery.parseJSON = function( data ) {
	return JSON.parse( data + "" );
};


// Cross-browser xml parsing
jQuery.parseXML = function( data ) {
	var xml;
	if ( !data || typeof data !== "string" ) {
		return null;
	}

	// Support: IE9
	try {
		xml = ( new window.DOMParser() ).parseFromString( data, "text/xml" );
	} catch ( e ) {
		xml = undefined;
	}

	if ( !xml || xml.getElementsByTagName( "parsererror" ).length ) {
		jQuery.error( "Invalid XML: " + data );
	}
	return xml;
};


var
	rhash = /#.*$/,
	rts = /([?&])_=[^&]*/,
	rheaders = /^(.*?):[ \t]*([^\r\n]*)$/mg,

	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = "*/".concat( "*" ),

	// Anchor tag for parsing the document origin
	originAnchor = document.createElement( "a" );
	originAnchor.href = location.href;

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType,
			i = 0,
			dataTypes = dataTypeExpression.toLowerCase().match( rnotwhite ) || [];

		if ( jQuery.isFunction( func ) ) {

			// For each dataType in the dataTypeExpression
			while ( ( dataType = dataTypes[ i++ ] ) ) {

				// Prepend if requested
				if ( dataType[ 0 ] === "+" ) {
					dataType = dataType.slice( 1 ) || "*";
					( structure[ dataType ] = structure[ dataType ] || [] ).unshift( func );

				// Otherwise append
				} else {
					( structure[ dataType ] = structure[ dataType ] || [] ).push( func );
				}
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

	var inspected = {},
		seekingTransport = ( structure === transports );

	function inspect( dataType ) {
		var selected;
		inspected[ dataType ] = true;
		jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
			var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
			if ( typeof dataTypeOrTransport === "string" &&
				!seekingTransport && !inspected[ dataTypeOrTransport ] ) {

				options.dataTypes.unshift( dataTypeOrTransport );
				inspect( dataTypeOrTransport );
				return false;
			} else if ( seekingTransport ) {
				return !( selected = dataTypeOrTransport );
			}
		} );
		return selected;
	}

	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var key, deep,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};

	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || ( deep = {} ) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}

	return target;
}

/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {

	var ct, type, finalDataType, firstDataType,
		contents = s.contents,
		dataTypes = s.dataTypes;

	// Remove auto dataType and get content-type in the process
	while ( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader( "Content-Type" );
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {

		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[ 0 ] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}

		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
function ajaxConvert( s, response, jqXHR, isSuccess ) {
	var conv2, current, conv, tmp, prev,
		converters = {},

		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice();

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	current = dataTypes.shift();

	// Convert to each sequential dataType
	while ( current ) {

		if ( s.responseFields[ current ] ) {
			jqXHR[ s.responseFields[ current ] ] = response;
		}

		// Apply the dataFilter if provided
		if ( !prev && isSuccess && s.dataFilter ) {
			response = s.dataFilter( response, s.dataType );
		}

		prev = current;
		current = dataTypes.shift();

		if ( current ) {

		// There's only work to do if current dataType is non-auto
			if ( current === "*" ) {

				current = prev;

			// Convert response if prev dataType is non-auto and differs from current
			} else if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						tmp = conv2.split( " " );
						if ( tmp[ 1 ] === current ) {

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {

								// Condense equivalence converters
								if ( conv === true ) {
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.unshift( tmp[ 1 ] );
								}
								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s.throws ) {
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return {
								state: "parsererror",
								error: conv ? e : "No conversion from " + prev + " to " + current
							};
						}
					}
				}
			}
		}
	}

	return { state: "success", data: response };
}

jQuery.extend( {

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {},

	ajaxSettings: {
		url: location.href,
		type: "GET",
		isLocal: rlocalProtocol.test( location.protocol ),
		global: true,
		processData: true,
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

		accepts: {
			"*": allTypes,
			text: "text/plain",
			html: "text/html",
			xml: "application/xml, text/xml",
			json: "application/json, text/javascript"
		},

		contents: {
			xml: /\bxml\b/,
			html: /\bhtml/,
			json: /\bjson\b/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText",
			json: "responseJSON"
		},

		// Data converters
		// Keys separate source (or catchall "*") and destination types with a single space
		converters: {

			// Convert anything to text
			"* text": String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": jQuery.parseJSON,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			url: true,
			context: true
		}
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		return settings ?

			// Building a settings object
			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

			// Extending ajaxSettings
			ajaxExtend( jQuery.ajaxSettings, target );
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var transport,

			// URL without anti-cache param
			cacheURL,

			// Response headers
			responseHeadersString,
			responseHeaders,

			// timeout handle
			timeoutTimer,

			// Url cleanup var
			urlAnchor,

			// To know if global events are to be dispatched
			fireGlobals,

			// Loop variable
			i,

			// Create the final options object
			s = jQuery.ajaxSetup( {}, options ),

			// Callbacks context
			callbackContext = s.context || s,

			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context &&
				( callbackContext.nodeType || callbackContext.jquery ) ?
					jQuery( callbackContext ) :
					jQuery.event,

			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks( "once memory" ),

			// Status-dependent callbacks
			statusCode = s.statusCode || {},

			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},

			// The jqXHR state
			state = 0,

			// Default abort message
			strAbort = "canceled",

			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( state === 2 ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while ( ( match = rheaders.exec( responseHeadersString ) ) ) {
								responseHeaders[ match[ 1 ].toLowerCase() ] = match[ 2 ];
							}
						}
						match = responseHeaders[ key.toLowerCase() ];
					}
					return match == null ? null : match;
				},

				// Raw string
				getAllResponseHeaders: function() {
					return state === 2 ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function( name, value ) {
					var lname = name.toLowerCase();
					if ( !state ) {
						name = requestHeadersNames[ lname ] = requestHeadersNames[ lname ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( !state ) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function( map ) {
					var code;
					if ( map ) {
						if ( state < 2 ) {
							for ( code in map ) {

								// Lazy-add the new callback in a way that preserves old ones
								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
							}
						} else {

							// Execute the appropriate callbacks
							jqXHR.always( map[ jqXHR.status ] );
						}
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					var finalText = statusText || strAbort;
					if ( transport ) {
						transport.abort( finalText );
					}
					done( 0, finalText );
					return this;
				}
			};

		// Attach deferreds
		deferred.promise( jqXHR ).complete = completeDeferred.add;
		jqXHR.success = jqXHR.done;
		jqXHR.error = jqXHR.fail;

		// Remove hash character (#7531: and string promotion)
		// Add protocol if not provided (prefilters might expect it)
		// Handle falsy url in the settings object (#10093: consistency with old signature)
		// We also use the url parameter if available
		s.url = ( ( url || s.url || location.href ) + "" ).replace( rhash, "" )
			.replace( rprotocol, location.protocol + "//" );

		// Alias method option to type as per ticket #12004
		s.type = options.method || options.type || s.method || s.type;

		// Extract dataTypes list
		s.dataTypes = jQuery.trim( s.dataType || "*" ).toLowerCase().match( rnotwhite ) || [ "" ];

		// A cross-domain request is in order when the origin doesn't match the current origin.
		if ( s.crossDomain == null ) {
			urlAnchor = document.createElement( "a" );

			// Support: IE8-11+
			// IE throws exception if url is malformed, e.g. http://example.com:80x/
			try {
				urlAnchor.href = s.url;

				// Support: IE8-11+
				// Anchor's host property isn't correctly set when s.url is relative
				urlAnchor.href = urlAnchor.href;
				s.crossDomain = originAnchor.protocol + "//" + originAnchor.host !==
					urlAnchor.protocol + "//" + urlAnchor.host;
			} catch ( e ) {

				// If there is an error parsing the URL, assume it is crossDomain,
				// it can be rejected by the transport if it is invalid
				s.crossDomain = true;
			}
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( state === 2 ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		// Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)
		fireGlobals = jQuery.event && s.global;

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger( "ajaxStart" );
		}

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Save the URL in case we're toying with the If-Modified-Since
		// and/or If-None-Match header later on
		cacheURL = s.url;

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// If data is available, append data to url
			if ( s.data ) {
				cacheURL = ( s.url += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data );

				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Add anti-cache in url if needed
			if ( s.cache === false ) {
				s.url = rts.test( cacheURL ) ?

					// If there is already a '_' parameter, set its value
					cacheURL.replace( rts, "$1_=" + nonce++ ) :

					// Otherwise add one to the end
					cacheURL + ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + nonce++;
			}
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			if ( jQuery.lastModified[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
			}
			if ( jQuery.etag[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[ 0 ] ] ?
				s.accepts[ s.dataTypes[ 0 ] ] +
					( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend &&
			( s.beforeSend.call( callbackContext, jqXHR, s ) === false || state === 2 ) ) {

			// Abort if not done already and return
			return jqXHR.abort();
		}

		// Aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		for ( i in { success: 1, error: 1, complete: 1 } ) {
			jqXHR[ i ]( s[ i ] );
		}

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;

			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}

			// If request was aborted inside ajaxSend, stop there
			if ( state === 2 ) {
				return jqXHR;
			}

			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = window.setTimeout( function() {
					jqXHR.abort( "timeout" );
				}, s.timeout );
			}

			try {
				state = 1;
				transport.send( requestHeaders, done );
			} catch ( e ) {

				// Propagate exception as error if not done
				if ( state < 2 ) {
					done( -1, e );

				// Simply rethrow otherwise
				} else {
					throw e;
				}
			}
		}

		// Callback for when everything is done
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Called once
			if ( state === 2 ) {
				return;
			}

			// State is "done" now
			state = 2;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				window.clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Determine if successful
			isSuccess = status >= 200 && status < 300 || status === 304;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// Convert no matter what (that way responseXXX fields are always set)
			response = ajaxConvert( s, response, jqXHR, isSuccess );

			// If successful, handle type chaining
			if ( isSuccess ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {
					modified = jqXHR.getResponseHeader( "Last-Modified" );
					if ( modified ) {
						jQuery.lastModified[ cacheURL ] = modified;
					}
					modified = jqXHR.getResponseHeader( "etag" );
					if ( modified ) {
						jQuery.etag[ cacheURL ] = modified;
					}
				}

				// if no content
				if ( status === 204 || s.type === "HEAD" ) {
					statusText = "nocontent";

				// if not modified
				} else if ( status === 304 ) {
					statusText = "notmodified";

				// If we have data, let's convert it
				} else {
					statusText = response.state;
					success = response.data;
					error = response.error;
					isSuccess = !error;
				}
			} else {

				// Extract error from statusText and normalize for non-aborts
				error = statusText;
				if ( status || !statusText ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
					[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );

				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger( "ajaxStop" );
				}
			}
		}

		return jqXHR;
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	}
} );

jQuery.each( [ "get", "post" ], function( i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {

		// Shift arguments if data argument was omitted
		if ( jQuery.isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		// The url can be an options object (which then must have .url)
		return jQuery.ajax( jQuery.extend( {
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		}, jQuery.isPlainObject( url ) && url ) );
	};
} );


jQuery._evalUrl = function( url ) {
	return jQuery.ajax( {
		url: url,

		// Make this explicit, since user can override this through ajaxSetup (#11264)
		type: "GET",
		dataType: "script",
		async: false,
		global: false,
		"throws": true
	} );
};


jQuery.fn.extend( {
	wrapAll: function( html ) {
		var wrap;

		if ( jQuery.isFunction( html ) ) {
			return this.each( function( i ) {
				jQuery( this ).wrapAll( html.call( this, i ) );
			} );
		}

		if ( this[ 0 ] ) {

			// The elements to wrap the target around
			wrap = jQuery( html, this[ 0 ].ownerDocument ).eq( 0 ).clone( true );

			if ( this[ 0 ].parentNode ) {
				wrap.insertBefore( this[ 0 ] );
			}

			wrap.map( function() {
				var elem = this;

				while ( elem.firstElementChild ) {
					elem = elem.firstElementChild;
				}

				return elem;
			} ).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each( function( i ) {
				jQuery( this ).wrapInner( html.call( this, i ) );
			} );
		}

		return this.each( function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		} );
	},

	wrap: function( html ) {
		var isFunction = jQuery.isFunction( html );

		return this.each( function( i ) {
			jQuery( this ).wrapAll( isFunction ? html.call( this, i ) : html );
		} );
	},

	unwrap: function() {
		return this.parent().each( function() {
			if ( !jQuery.nodeName( this, "body" ) ) {
				jQuery( this ).replaceWith( this.childNodes );
			}
		} ).end();
	}
} );


jQuery.expr.filters.hidden = function( elem ) {
	return !jQuery.expr.filters.visible( elem );
};
jQuery.expr.filters.visible = function( elem ) {

	// Support: Opera <= 12.12
	// Opera reports offsetWidths and offsetHeights less than zero on some elements
	// Use OR instead of AND as the element is not visible if either is true
	// See tickets #10406 and #13132
	return elem.offsetWidth > 0 || elem.offsetHeight > 0 || elem.getClientRects().length > 0;
};




var r20 = /%20/g,
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( jQuery.isArray( obj ) ) {

		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {

				// Treat each array item as a scalar.
				add( prefix, v );

			} else {

				// Item is non-scalar (array or object), encode its numeric index.
				buildParams(
					prefix + "[" + ( typeof v === "object" && v != null ? i : "" ) + "]",
					v,
					traditional,
					add
				);
			}
		} );

	} else if ( !traditional && jQuery.type( obj ) === "object" ) {

		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {

		// Serialize scalar item.
		add( prefix, obj );
	}
}

// Serialize an array of form elements or a set of
// key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, value ) {

			// If value is a function, invoke it and return its value
			value = jQuery.isFunction( value ) ? value() : ( value == null ? "" : value );
			s[ s.length ] = encodeURIComponent( key ) + "=" + encodeURIComponent( value );
		};

	// Set traditional to true for jQuery <= 1.3.2 behavior.
	if ( traditional === undefined ) {
		traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
	}

	// If an array was passed in, assume that it is an array of form elements.
	if ( jQuery.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {

		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		} );

	} else {

		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" ).replace( r20, "+" );
};

jQuery.fn.extend( {
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map( function() {

			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		} )
		.filter( function() {
			var type = this.type;

			// Use .is( ":disabled" ) so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !rcheckableType.test( type ) );
		} )
		.map( function( i, elem ) {
			var val = jQuery( this ).val();

			return val == null ?
				null :
				jQuery.isArray( val ) ?
					jQuery.map( val, function( val ) {
						return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
					} ) :
					{ name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		} ).get();
	}
} );


jQuery.ajaxSettings.xhr = function() {
	try {
		return new window.XMLHttpRequest();
	} catch ( e ) {}
};

var xhrSuccessStatus = {

		// File protocol always yields status code 0, assume 200
		0: 200,

		// Support: IE9
		// #1450: sometimes IE returns 1223 when it should be 204
		1223: 204
	},
	xhrSupported = jQuery.ajaxSettings.xhr();

support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
support.ajax = xhrSupported = !!xhrSupported;

jQuery.ajaxTransport( function( options ) {
	var callback, errorCallback;

	// Cross domain only allowed if supported through XMLHttpRequest
	if ( support.cors || xhrSupported && !options.crossDomain ) {
		return {
			send: function( headers, complete ) {
				var i,
					xhr = options.xhr();

				xhr.open(
					options.type,
					options.url,
					options.async,
					options.username,
					options.password
				);

				// Apply custom fields if provided
				if ( options.xhrFields ) {
					for ( i in options.xhrFields ) {
						xhr[ i ] = options.xhrFields[ i ];
					}
				}

				// Override mime type if needed
				if ( options.mimeType && xhr.overrideMimeType ) {
					xhr.overrideMimeType( options.mimeType );
				}

				// X-Requested-With header
				// For cross-domain requests, seeing as conditions for a preflight are
				// akin to a jigsaw puzzle, we simply never set it to be sure.
				// (it can always be set on a per-request basis or even using ajaxSetup)
				// For same-domain requests, won't change header if already provided.
				if ( !options.crossDomain && !headers[ "X-Requested-With" ] ) {
					headers[ "X-Requested-With" ] = "XMLHttpRequest";
				}

				// Set headers
				for ( i in headers ) {
					xhr.setRequestHeader( i, headers[ i ] );
				}

				// Callback
				callback = function( type ) {
					return function() {
						if ( callback ) {
							callback = errorCallback = xhr.onload =
								xhr.onerror = xhr.onabort = xhr.onreadystatechange = null;

							if ( type === "abort" ) {
								xhr.abort();
							} else if ( type === "error" ) {

								// Support: IE9
								// On a manual native abort, IE9 throws
								// errors on any property access that is not readyState
								if ( typeof xhr.status !== "number" ) {
									complete( 0, "error" );
								} else {
									complete(

										// File: protocol always yields status 0; see #8605, #14207
										xhr.status,
										xhr.statusText
									);
								}
							} else {
								complete(
									xhrSuccessStatus[ xhr.status ] || xhr.status,
									xhr.statusText,

									// Support: IE9 only
									// IE9 has no XHR2 but throws on binary (trac-11426)
									// For XHR2 non-text, let the caller handle it (gh-2498)
									( xhr.responseType || "text" ) !== "text"  ||
									typeof xhr.responseText !== "string" ?
										{ binary: xhr.response } :
										{ text: xhr.responseText },
									xhr.getAllResponseHeaders()
								);
							}
						}
					};
				};

				// Listen to events
				xhr.onload = callback();
				errorCallback = xhr.onerror = callback( "error" );

				// Support: IE9
				// Use onreadystatechange to replace onabort
				// to handle uncaught aborts
				if ( xhr.onabort !== undefined ) {
					xhr.onabort = errorCallback;
				} else {
					xhr.onreadystatechange = function() {

						// Check readyState before timeout as it changes
						if ( xhr.readyState === 4 ) {

							// Allow onerror to be called first,
							// but that will not handle a native abort
							// Also, save errorCallback to a variable
							// as xhr.onerror cannot be accessed
							window.setTimeout( function() {
								if ( callback ) {
									errorCallback();
								}
							} );
						}
					};
				}

				// Create the abort callback
				callback = callback( "abort" );

				try {

					// Do send the request (this may raise an exception)
					xhr.send( options.hasContent && options.data || null );
				} catch ( e ) {

					// #14683: Only rethrow if this hasn't been notified as an error yet
					if ( callback ) {
						throw e;
					}
				}
			},

			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
} );




// Install script dataType
jQuery.ajaxSetup( {
	accepts: {
		script: "text/javascript, application/javascript, " +
			"application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /\b(?:java|ecma)script\b/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
} );

// Handle cache's special case and crossDomain
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
	}
} );

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function( s ) {

	// This transport only deals with cross domain requests
	if ( s.crossDomain ) {
		var script, callback;
		return {
			send: function( _, complete ) {
				script = jQuery( "<script>" ).prop( {
					charset: s.scriptCharset,
					src: s.url
				} ).on(
					"load error",
					callback = function( evt ) {
						script.remove();
						callback = null;
						if ( evt ) {
							complete( evt.type === "error" ? 404 : 200, evt.type );
						}
					}
				);

				// Use native DOM manipulation to avoid our domManip AJAX trickery
				document.head.appendChild( script[ 0 ] );
			},
			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
} );




var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup( {
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
		this[ callback ] = true;
		return callback;
	}
} );

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
			"url" :
			typeof s.data === "string" &&
				( s.contentType || "" )
					.indexOf( "application/x-www-form-urlencoded" ) === 0 &&
				rjsonp.test( s.data ) && "data"
		);

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;

		// Insert callback into url or form data
		if ( jsonProp ) {
			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
		} else if ( s.jsonp !== false ) {
			s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		s.converters[ "script json" ] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// Force json dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		overwritten = window[ callbackName ];
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always( function() {

			// If previous value didn't exist - remove it
			if ( overwritten === undefined ) {
				jQuery( window ).removeProp( callbackName );

			// Otherwise restore preexisting value
			} else {
				window[ callbackName ] = overwritten;
			}

			// Save back as free
			if ( s[ callbackName ] ) {

				// Make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// Save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && jQuery.isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		} );

		// Delegate to script
		return "script";
	}
} );




// Support: Safari 8+
// In Safari 8 documents created via document.implementation.createHTMLDocument
// collapse sibling forms: the second one becomes a child of the first one.
// Because of that, this security measure has to be disabled in Safari 8.
// https://bugs.webkit.org/show_bug.cgi?id=137337
support.createHTMLDocument = ( function() {
	var body = document.implementation.createHTMLDocument( "" ).body;
	body.innerHTML = "<form></form><form></form>";
	return body.childNodes.length === 2;
} )();


// Argument "data" should be string of html
// context (optional): If specified, the fragment will be created in this context,
// defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
jQuery.parseHTML = function( data, context, keepScripts ) {
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	if ( typeof context === "boolean" ) {
		keepScripts = context;
		context = false;
	}

	// Stop scripts or inline event handlers from being executed immediately
	// by using document.implementation
	context = context || ( support.createHTMLDocument ?
		document.implementation.createHTMLDocument( "" ) :
		document );

	var parsed = rsingleTag.exec( data ),
		scripts = !keepScripts && [];

	// Single tag
	if ( parsed ) {
		return [ context.createElement( parsed[ 1 ] ) ];
	}

	parsed = buildFragment( [ data ], context, scripts );

	if ( scripts && scripts.length ) {
		jQuery( scripts ).remove();
	}

	return jQuery.merge( [], parsed.childNodes );
};


// Keep a copy of the old load method
var _load = jQuery.fn.load;

/**
 * Load a url into a page
 */
jQuery.fn.load = function( url, params, callback ) {
	if ( typeof url !== "string" && _load ) {
		return _load.apply( this, arguments );
	}

	var selector, type, response,
		self = this,
		off = url.indexOf( " " );

	if ( off > -1 ) {
		selector = jQuery.trim( url.slice( off ) );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( jQuery.isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}

	// If we have elements to modify, make the request
	if ( self.length > 0 ) {
		jQuery.ajax( {
			url: url,

			// If "type" variable is undefined, then "GET" method will be used.
			// Make value of this field explicit since
			// user can override it through ajaxSetup method
			type: type || "GET",
			dataType: "html",
			data: params
		} ).done( function( responseText ) {

			// Save response for use in complete callback
			response = arguments;

			self.html( selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery( "<div>" ).append( jQuery.parseHTML( responseText ) ).find( selector ) :

				// Otherwise use the full result
				responseText );

		// If the request succeeds, this function gets "data", "status", "jqXHR"
		// but they are ignored because response was set above.
		// If it fails, this function gets "jqXHR", "status", "error"
		} ).always( callback && function( jqXHR, status ) {
			self.each( function() {
				callback.apply( self, response || [ jqXHR.responseText, status, jqXHR ] );
			} );
		} );
	}

	return this;
};




// Attach a bunch of functions for handling common AJAX events
jQuery.each( [
	"ajaxStart",
	"ajaxStop",
	"ajaxComplete",
	"ajaxError",
	"ajaxSuccess",
	"ajaxSend"
], function( i, type ) {
	jQuery.fn[ type ] = function( fn ) {
		return this.on( type, fn );
	};
} );




jQuery.expr.filters.animated = function( elem ) {
	return jQuery.grep( jQuery.timers, function( fn ) {
		return elem === fn.elem;
	} ).length;
};




/**
 * Gets a window from an element
 */
function getWindow( elem ) {
	return jQuery.isWindow( elem ) ? elem : elem.nodeType === 9 && elem.defaultView;
}

jQuery.offset = {
	setOffset: function( elem, options, i ) {
		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
			position = jQuery.css( elem, "position" ),
			curElem = jQuery( elem ),
			props = {};

		// Set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		curOffset = curElem.offset();
		curCSSTop = jQuery.css( elem, "top" );
		curCSSLeft = jQuery.css( elem, "left" );
		calculatePosition = ( position === "absolute" || position === "fixed" ) &&
			( curCSSTop + curCSSLeft ).indexOf( "auto" ) > -1;

		// Need to be able to calculate position if either
		// top or left is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;

		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( jQuery.isFunction( options ) ) {

			// Use jQuery.extend here to allow modification of coordinates argument (gh-1848)
			options = options.call( elem, i, jQuery.extend( {}, curOffset ) );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );

		} else {
			curElem.css( props );
		}
	}
};

jQuery.fn.extend( {
	offset: function( options ) {
		if ( arguments.length ) {
			return options === undefined ?
				this :
				this.each( function( i ) {
					jQuery.offset.setOffset( this, options, i );
				} );
		}

		var docElem, win,
			elem = this[ 0 ],
			box = { top: 0, left: 0 },
			doc = elem && elem.ownerDocument;

		if ( !doc ) {
			return;
		}

		docElem = doc.documentElement;

		// Make sure it's not a disconnected DOM node
		if ( !jQuery.contains( docElem, elem ) ) {
			return box;
		}

		box = elem.getBoundingClientRect();
		win = getWindow( doc );
		return {
			top: box.top + win.pageYOffset - docElem.clientTop,
			left: box.left + win.pageXOffset - docElem.clientLeft
		};
	},

	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset,
			elem = this[ 0 ],
			parentOffset = { top: 0, left: 0 };

		// Fixed elements are offset from window (parentOffset = {top:0, left: 0},
		// because it is its only offset parent
		if ( jQuery.css( elem, "position" ) === "fixed" ) {

			// Assume getBoundingClientRect is there when computed position is fixed
			offset = elem.getBoundingClientRect();

		} else {

			// Get *real* offsetParent
			offsetParent = this.offsetParent();

			// Get correct offsets
			offset = this.offset();
			if ( !jQuery.nodeName( offsetParent[ 0 ], "html" ) ) {
				parentOffset = offsetParent.offset();
			}

			// Add offsetParent borders
			parentOffset.top += jQuery.css( offsetParent[ 0 ], "borderTopWidth", true );
			parentOffset.left += jQuery.css( offsetParent[ 0 ], "borderLeftWidth", true );
		}

		// Subtract parent offsets and element margins
		return {
			top: offset.top - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true )
		};
	},

	// This method will return documentElement in the following cases:
	// 1) For the element inside the iframe without offsetParent, this method will return
	//    documentElement of the parent window
	// 2) For the hidden or detached element
	// 3) For body or html element, i.e. in case of the html node - it will return itself
	//
	// but those exceptions were never presented as a real life use-cases
	// and might be considered as more preferable results.
	//
	// This logic, however, is not guaranteed and can change at any point in the future
	offsetParent: function() {
		return this.map( function() {
			var offsetParent = this.offsetParent;

			while ( offsetParent && jQuery.css( offsetParent, "position" ) === "static" ) {
				offsetParent = offsetParent.offsetParent;
			}

			return offsetParent || documentElement;
		} );
	}
} );

// Create scrollLeft and scrollTop methods
jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
	var top = "pageYOffset" === prop;

	jQuery.fn[ method ] = function( val ) {
		return access( this, function( elem, method, val ) {
			var win = getWindow( elem );

			if ( val === undefined ) {
				return win ? win[ prop ] : elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : win.pageXOffset,
					top ? val : win.pageYOffset
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length );
	};
} );

// Support: Safari<7-8+, Chrome<37-44+
// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// Blink bug: https://code.google.com/p/chromium/issues/detail?id=229280
// getComputedStyle returns percent when specified for top/left/bottom/right;
// rather than make the css module depend on the offset module, just check for it here
jQuery.each( [ "top", "left" ], function( i, prop ) {
	jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
		function( elem, computed ) {
			if ( computed ) {
				computed = curCSS( elem, prop );

				// If curCSS returns percentage, fallback to offset
				return rnumnonpx.test( computed ) ?
					jQuery( elem ).position()[ prop ] + "px" :
					computed;
			}
		}
	);
} );


// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name },
		function( defaultExtra, funcName ) {

		// Margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return access( this, function( elem, type, value ) {
				var doc;

				if ( jQuery.isWindow( elem ) ) {

					// As of 5/8/2012 this will yield incorrect results for Mobile Safari, but there
					// isn't a whole lot we can do. See pull request at this URL for discussion:
					// https://github.com/jquery/jquery/pull/764
					return elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
					// whichever is greatest
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?

					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable, null );
		};
	} );
} );


jQuery.fn.extend( {

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {

		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ?
			this.off( selector, "**" ) :
			this.off( types, selector || "**", fn );
	},
	size: function() {
		return this.length;
	}
} );

jQuery.fn.andSelf = jQuery.fn.addBack;




// Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.

// Note that for maximum portability, libraries that are not jQuery should
// declare themselves as anonymous modules, and avoid setting a global if an
// AMD loader is present. jQuery is a special case. For more information, see
// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

if ( typeof define === "function" && define.amd ) {
	define( "jquery", [], function() {
		return jQuery;
	} );
}



var

	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$;

jQuery.noConflict = function( deep ) {
	if ( window.$ === jQuery ) {
		window.$ = _$;
	}

	if ( deep && window.jQuery === jQuery ) {
		window.jQuery = _jQuery;
	}

	return jQuery;
};

// Expose jQuery and $ identifiers, even in AMD
// (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
if ( !noGlobal ) {
	window.jQuery = window.$ = jQuery;
}

return jQuery;
}));

/*!
 * Bootstrap v3.3.6 (http://getbootstrap.com)
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under the MIT license
 */

if (typeof jQuery === 'undefined') {
  throw new Error('Bootstrap\'s JavaScript requires jQuery')
}

+function ($) {
  'use strict';
  var version = $.fn.jquery.split(' ')[0].split('.')
  if ((version[0] < 2 && version[1] < 9) || (version[0] == 1 && version[1] == 9 && version[2] < 1) || (version[0] > 2)) {
    throw new Error('Bootstrap\'s JavaScript requires jQuery version 1.9.1 or higher, but lower than version 3')
  }
}(jQuery);

/* ========================================================================
 * Bootstrap: transition.js v3.3.6
 * http://getbootstrap.com/javascript/#transitions
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // CSS TRANSITION SUPPORT (Shoutout: http://www.modernizr.com/)
  // ============================================================

  function transitionEnd() {
    var el = document.createElement('bootstrap')

    var transEndEventNames = {
      WebkitTransition : 'webkitTransitionEnd',
      MozTransition    : 'transitionend',
      OTransition      : 'oTransitionEnd otransitionend',
      transition       : 'transitionend'
    }

    for (var name in transEndEventNames) {
      if (el.style[name] !== undefined) {
        return { end: transEndEventNames[name] }
      }
    }

    return false // explicit for ie8 (  ._.)
  }

  // http://blog.alexmaccaw.com/css-transitions
  $.fn.emulateTransitionEnd = function (duration) {
    var called = false
    var $el = this
    $(this).one('bsTransitionEnd', function () { called = true })
    var callback = function () { if (!called) $($el).trigger($.support.transition.end) }
    setTimeout(callback, duration)
    return this
  }

  $(function () {
    $.support.transition = transitionEnd()

    if (!$.support.transition) return

    $.event.special.bsTransitionEnd = {
      bindType: $.support.transition.end,
      delegateType: $.support.transition.end,
      handle: function (e) {
        if ($(e.target).is(this)) return e.handleObj.handler.apply(this, arguments)
      }
    }
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: alert.js v3.3.6
 * http://getbootstrap.com/javascript/#alerts
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // ALERT CLASS DEFINITION
  // ======================

  var dismiss = '[data-dismiss="alert"]'
  var Alert   = function (el) {
    $(el).on('click', dismiss, this.close)
  }

  Alert.VERSION = '3.3.6'

  Alert.TRANSITION_DURATION = 150

  Alert.prototype.close = function (e) {
    var $this    = $(this)
    var selector = $this.attr('data-target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
    }

    var $parent = $(selector)

    if (e) e.preventDefault()

    if (!$parent.length) {
      $parent = $this.closest('.alert')
    }

    $parent.trigger(e = $.Event('close.bs.alert'))

    if (e.isDefaultPrevented()) return

    $parent.removeClass('in')

    function removeElement() {
      // detach from parent, fire event then clean up data
      $parent.detach().trigger('closed.bs.alert').remove()
    }

    $.support.transition && $parent.hasClass('fade') ?
      $parent
        .one('bsTransitionEnd', removeElement)
        .emulateTransitionEnd(Alert.TRANSITION_DURATION) :
      removeElement()
  }


  // ALERT PLUGIN DEFINITION
  // =======================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.alert')

      if (!data) $this.data('bs.alert', (data = new Alert(this)))
      if (typeof option == 'string') data[option].call($this)
    })
  }

  var old = $.fn.alert

  $.fn.alert             = Plugin
  $.fn.alert.Constructor = Alert


  // ALERT NO CONFLICT
  // =================

  $.fn.alert.noConflict = function () {
    $.fn.alert = old
    return this
  }


  // ALERT DATA-API
  // ==============

  $(document).on('click.bs.alert.data-api', dismiss, Alert.prototype.close)

}(jQuery);

/* ========================================================================
 * Bootstrap: button.js v3.3.6
 * http://getbootstrap.com/javascript/#buttons
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // BUTTON PUBLIC CLASS DEFINITION
  // ==============================

  var Button = function (element, options) {
    this.$element  = $(element)
    this.options   = $.extend({}, Button.DEFAULTS, options)
    this.isLoading = false
  }

  Button.VERSION  = '3.3.6'

  Button.DEFAULTS = {
    loadingText: 'loading...'
  }

  Button.prototype.setState = function (state) {
    var d    = 'disabled'
    var $el  = this.$element
    var val  = $el.is('input') ? 'val' : 'html'
    var data = $el.data()

    state += 'Text'

    if (data.resetText == null) $el.data('resetText', $el[val]())

    // push to event loop to allow forms to submit
    setTimeout($.proxy(function () {
      $el[val](data[state] == null ? this.options[state] : data[state])

      if (state == 'loadingText') {
        this.isLoading = true
        $el.addClass(d).attr(d, d)
      } else if (this.isLoading) {
        this.isLoading = false
        $el.removeClass(d).removeAttr(d)
      }
    }, this), 0)
  }

  Button.prototype.toggle = function () {
    var changed = true
    var $parent = this.$element.closest('[data-toggle="buttons"]')

    if ($parent.length) {
      var $input = this.$element.find('input')
      if ($input.prop('type') == 'radio') {
        if ($input.prop('checked')) changed = false
        $parent.find('.active').removeClass('active')
        this.$element.addClass('active')
      } else if ($input.prop('type') == 'checkbox') {
        if (($input.prop('checked')) !== this.$element.hasClass('active')) changed = false
        this.$element.toggleClass('active')
      }
      $input.prop('checked', this.$element.hasClass('active'))
      if (changed) $input.trigger('change')
    } else {
      this.$element.attr('aria-pressed', !this.$element.hasClass('active'))
      this.$element.toggleClass('active')
    }
  }


  // BUTTON PLUGIN DEFINITION
  // ========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.button')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.button', (data = new Button(this, options)))

      if (option == 'toggle') data.toggle()
      else if (option) data.setState(option)
    })
  }

  var old = $.fn.button

  $.fn.button             = Plugin
  $.fn.button.Constructor = Button


  // BUTTON NO CONFLICT
  // ==================

  $.fn.button.noConflict = function () {
    $.fn.button = old
    return this
  }


  // BUTTON DATA-API
  // ===============

  $(document)
    .on('click.bs.button.data-api', '[data-toggle^="button"]', function (e) {
      var $btn = $(e.target)
      if (!$btn.hasClass('btn')) $btn = $btn.closest('.btn')
      Plugin.call($btn, 'toggle')
      if (!($(e.target).is('input[type="radio"]') || $(e.target).is('input[type="checkbox"]'))) e.preventDefault()
    })
    .on('focus.bs.button.data-api blur.bs.button.data-api', '[data-toggle^="button"]', function (e) {
      $(e.target).closest('.btn').toggleClass('focus', /^focus(in)?$/.test(e.type))
    })

}(jQuery);

/* ========================================================================
 * Bootstrap: carousel.js v3.3.6
 * http://getbootstrap.com/javascript/#carousel
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // CAROUSEL CLASS DEFINITION
  // =========================

  var Carousel = function (element, options) {
    this.$element    = $(element)
    this.$indicators = this.$element.find('.carousel-indicators')
    this.options     = options
    this.paused      = null
    this.sliding     = null
    this.interval    = null
    this.$active     = null
    this.$items      = null

    this.options.keyboard && this.$element.on('keydown.bs.carousel', $.proxy(this.keydown, this))

    this.options.pause == 'hover' && !('ontouchstart' in document.documentElement) && this.$element
      .on('mouseenter.bs.carousel', $.proxy(this.pause, this))
      .on('mouseleave.bs.carousel', $.proxy(this.cycle, this))
  }

  Carousel.VERSION  = '3.3.6'

  Carousel.TRANSITION_DURATION = 600

  Carousel.DEFAULTS = {
    interval: 5000,
    pause: 'hover',
    wrap: true,
    keyboard: true
  }

  Carousel.prototype.keydown = function (e) {
    if (/input|textarea/i.test(e.target.tagName)) return
    switch (e.which) {
      case 37: this.prev(); break
      case 39: this.next(); break
      default: return
    }

    e.preventDefault()
  }

  Carousel.prototype.cycle = function (e) {
    e || (this.paused = false)

    this.interval && clearInterval(this.interval)

    this.options.interval
      && !this.paused
      && (this.interval = setInterval($.proxy(this.next, this), this.options.interval))

    return this
  }

  Carousel.prototype.getItemIndex = function (item) {
    this.$items = item.parent().children('.item')
    return this.$items.index(item || this.$active)
  }

  Carousel.prototype.getItemForDirection = function (direction, active) {
    var activeIndex = this.getItemIndex(active)
    var willWrap = (direction == 'prev' && activeIndex === 0)
                || (direction == 'next' && activeIndex == (this.$items.length - 1))
    if (willWrap && !this.options.wrap) return active
    var delta = direction == 'prev' ? -1 : 1
    var itemIndex = (activeIndex + delta) % this.$items.length
    return this.$items.eq(itemIndex)
  }

  Carousel.prototype.to = function (pos) {
    var that        = this
    var activeIndex = this.getItemIndex(this.$active = this.$element.find('.item.active'))

    if (pos > (this.$items.length - 1) || pos < 0) return

    if (this.sliding)       return this.$element.one('slid.bs.carousel', function () { that.to(pos) }) // yes, "slid"
    if (activeIndex == pos) return this.pause().cycle()

    return this.slide(pos > activeIndex ? 'next' : 'prev', this.$items.eq(pos))
  }

  Carousel.prototype.pause = function (e) {
    e || (this.paused = true)

    if (this.$element.find('.next, .prev').length && $.support.transition) {
      this.$element.trigger($.support.transition.end)
      this.cycle(true)
    }

    this.interval = clearInterval(this.interval)

    return this
  }

  Carousel.prototype.next = function () {
    if (this.sliding) return
    return this.slide('next')
  }

  Carousel.prototype.prev = function () {
    if (this.sliding) return
    return this.slide('prev')
  }

  Carousel.prototype.slide = function (type, next) {
    var $active   = this.$element.find('.item.active')
    var $next     = next || this.getItemForDirection(type, $active)
    var isCycling = this.interval
    var direction = type == 'next' ? 'left' : 'right'
    var that      = this

    if ($next.hasClass('active')) return (this.sliding = false)

    var relatedTarget = $next[0]
    var slideEvent = $.Event('slide.bs.carousel', {
      relatedTarget: relatedTarget,
      direction: direction
    })
    this.$element.trigger(slideEvent)
    if (slideEvent.isDefaultPrevented()) return

    this.sliding = true

    isCycling && this.pause()

    if (this.$indicators.length) {
      this.$indicators.find('.active').removeClass('active')
      var $nextIndicator = $(this.$indicators.children()[this.getItemIndex($next)])
      $nextIndicator && $nextIndicator.addClass('active')
    }

    var slidEvent = $.Event('slid.bs.carousel', { relatedTarget: relatedTarget, direction: direction }) // yes, "slid"
    if ($.support.transition && this.$element.hasClass('slide')) {
      $next.addClass(type)
      $next[0].offsetWidth // force reflow
      $active.addClass(direction)
      $next.addClass(direction)
      $active
        .one('bsTransitionEnd', function () {
          $next.removeClass([type, direction].join(' ')).addClass('active')
          $active.removeClass(['active', direction].join(' '))
          that.sliding = false
          setTimeout(function () {
            that.$element.trigger(slidEvent)
          }, 0)
        })
        .emulateTransitionEnd(Carousel.TRANSITION_DURATION)
    } else {
      $active.removeClass('active')
      $next.addClass('active')
      this.sliding = false
      this.$element.trigger(slidEvent)
    }

    isCycling && this.cycle()

    return this
  }


  // CAROUSEL PLUGIN DEFINITION
  // ==========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.carousel')
      var options = $.extend({}, Carousel.DEFAULTS, $this.data(), typeof option == 'object' && option)
      var action  = typeof option == 'string' ? option : options.slide

      if (!data) $this.data('bs.carousel', (data = new Carousel(this, options)))
      if (typeof option == 'number') data.to(option)
      else if (action) data[action]()
      else if (options.interval) data.pause().cycle()
    })
  }

  var old = $.fn.carousel

  $.fn.carousel             = Plugin
  $.fn.carousel.Constructor = Carousel


  // CAROUSEL NO CONFLICT
  // ====================

  $.fn.carousel.noConflict = function () {
    $.fn.carousel = old
    return this
  }


  // CAROUSEL DATA-API
  // =================

  var clickHandler = function (e) {
    var href
    var $this   = $(this)
    var $target = $($this.attr('data-target') || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '')) // strip for ie7
    if (!$target.hasClass('carousel')) return
    var options = $.extend({}, $target.data(), $this.data())
    var slideIndex = $this.attr('data-slide-to')
    if (slideIndex) options.interval = false

    Plugin.call($target, options)

    if (slideIndex) {
      $target.data('bs.carousel').to(slideIndex)
    }

    e.preventDefault()
  }

  $(document)
    .on('click.bs.carousel.data-api', '[data-slide]', clickHandler)
    .on('click.bs.carousel.data-api', '[data-slide-to]', clickHandler)

  $(window).on('load', function () {
    $('[data-ride="carousel"]').each(function () {
      var $carousel = $(this)
      Plugin.call($carousel, $carousel.data())
    })
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: collapse.js v3.3.6
 * http://getbootstrap.com/javascript/#collapse
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // COLLAPSE PUBLIC CLASS DEFINITION
  // ================================

  var Collapse = function (element, options) {
    this.$element      = $(element)
    this.options       = $.extend({}, Collapse.DEFAULTS, options)
    this.$trigger      = $('[data-toggle="collapse"][href="#' + element.id + '"],' +
                           '[data-toggle="collapse"][data-target="#' + element.id + '"]')
    this.transitioning = null

    if (this.options.parent) {
      this.$parent = this.getParent()
    } else {
      this.addAriaAndCollapsedClass(this.$element, this.$trigger)
    }

    if (this.options.toggle) this.toggle()
  }

  Collapse.VERSION  = '3.3.6'

  Collapse.TRANSITION_DURATION = 350

  Collapse.DEFAULTS = {
    toggle: true
  }

  Collapse.prototype.dimension = function () {
    var hasWidth = this.$element.hasClass('width')
    return hasWidth ? 'width' : 'height'
  }

  Collapse.prototype.show = function () {
    if (this.transitioning || this.$element.hasClass('in')) return

    var activesData
    var actives = this.$parent && this.$parent.children('.panel').children('.in, .collapsing')

    if (actives && actives.length) {
      activesData = actives.data('bs.collapse')
      if (activesData && activesData.transitioning) return
    }

    var startEvent = $.Event('show.bs.collapse')
    this.$element.trigger(startEvent)
    if (startEvent.isDefaultPrevented()) return

    if (actives && actives.length) {
      Plugin.call(actives, 'hide')
      activesData || actives.data('bs.collapse', null)
    }

    var dimension = this.dimension()

    this.$element
      .removeClass('collapse')
      .addClass('collapsing')[dimension](0)
      .attr('aria-expanded', true)

    this.$trigger
      .removeClass('collapsed')
      .attr('aria-expanded', true)

    this.transitioning = 1

    var complete = function () {
      this.$element
        .removeClass('collapsing')
        .addClass('collapse in')[dimension]('')
      this.transitioning = 0
      this.$element
        .trigger('shown.bs.collapse')
    }

    if (!$.support.transition) return complete.call(this)

    var scrollSize = $.camelCase(['scroll', dimension].join('-'))

    this.$element
      .one('bsTransitionEnd', $.proxy(complete, this))
      .emulateTransitionEnd(Collapse.TRANSITION_DURATION)[dimension](this.$element[0][scrollSize])
  }

  Collapse.prototype.hide = function () {
    if (this.transitioning || !this.$element.hasClass('in')) return

    var startEvent = $.Event('hide.bs.collapse')
    this.$element.trigger(startEvent)
    if (startEvent.isDefaultPrevented()) return

    var dimension = this.dimension()

    this.$element[dimension](this.$element[dimension]())[0].offsetHeight

    this.$element
      .addClass('collapsing')
      .removeClass('collapse in')
      .attr('aria-expanded', false)

    this.$trigger
      .addClass('collapsed')
      .attr('aria-expanded', false)

    this.transitioning = 1

    var complete = function () {
      this.transitioning = 0
      this.$element
        .removeClass('collapsing')
        .addClass('collapse')
        .trigger('hidden.bs.collapse')
    }

    if (!$.support.transition) return complete.call(this)

    this.$element
      [dimension](0)
      .one('bsTransitionEnd', $.proxy(complete, this))
      .emulateTransitionEnd(Collapse.TRANSITION_DURATION)
  }

  Collapse.prototype.toggle = function () {
    this[this.$element.hasClass('in') ? 'hide' : 'show']()
  }

  Collapse.prototype.getParent = function () {
    return $(this.options.parent)
      .find('[data-toggle="collapse"][data-parent="' + this.options.parent + '"]')
      .each($.proxy(function (i, element) {
        var $element = $(element)
        this.addAriaAndCollapsedClass(getTargetFromTrigger($element), $element)
      }, this))
      .end()
  }

  Collapse.prototype.addAriaAndCollapsedClass = function ($element, $trigger) {
    var isOpen = $element.hasClass('in')

    $element.attr('aria-expanded', isOpen)
    $trigger
      .toggleClass('collapsed', !isOpen)
      .attr('aria-expanded', isOpen)
  }

  function getTargetFromTrigger($trigger) {
    var href
    var target = $trigger.attr('data-target')
      || (href = $trigger.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '') // strip for ie7

    return $(target)
  }


  // COLLAPSE PLUGIN DEFINITION
  // ==========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.collapse')
      var options = $.extend({}, Collapse.DEFAULTS, $this.data(), typeof option == 'object' && option)

      if (!data && options.toggle && /show|hide/.test(option)) options.toggle = false
      if (!data) $this.data('bs.collapse', (data = new Collapse(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.collapse

  $.fn.collapse             = Plugin
  $.fn.collapse.Constructor = Collapse


  // COLLAPSE NO CONFLICT
  // ====================

  $.fn.collapse.noConflict = function () {
    $.fn.collapse = old
    return this
  }


  // COLLAPSE DATA-API
  // =================

  $(document).on('click.bs.collapse.data-api', '[data-toggle="collapse"]', function (e) {
    var $this   = $(this)

    if (!$this.attr('data-target')) e.preventDefault()

    var $target = getTargetFromTrigger($this)
    var data    = $target.data('bs.collapse')
    var option  = data ? 'toggle' : $this.data()

    Plugin.call($target, option)
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: dropdown.js v3.3.6
 * http://getbootstrap.com/javascript/#dropdowns
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // DROPDOWN CLASS DEFINITION
  // =========================

  var backdrop = '.dropdown-backdrop'
  var toggle   = '[data-toggle="dropdown"]'
  var Dropdown = function (element) {
    $(element).on('click.bs.dropdown', this.toggle)
  }

  Dropdown.VERSION = '3.3.6'

  function getParent($this) {
    var selector = $this.attr('data-target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && /#[A-Za-z]/.test(selector) && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
    }

    var $parent = selector && $(selector)

    return $parent && $parent.length ? $parent : $this.parent()
  }

  function clearMenus(e) {
    if (e && e.which === 3) return
    $(backdrop).remove()
    $(toggle).each(function () {
      var $this         = $(this)
      var $parent       = getParent($this)
      var relatedTarget = { relatedTarget: this }

      if (!$parent.hasClass('open')) return

      if (e && e.type == 'click' && /input|textarea/i.test(e.target.tagName) && $.contains($parent[0], e.target)) return

      $parent.trigger(e = $.Event('hide.bs.dropdown', relatedTarget))

      if (e.isDefaultPrevented()) return

      $this.attr('aria-expanded', 'false')
      $parent.removeClass('open').trigger($.Event('hidden.bs.dropdown', relatedTarget))
    })
  }

  Dropdown.prototype.toggle = function (e) {
    var $this = $(this)

    if ($this.is('.disabled, :disabled')) return

    var $parent  = getParent($this)
    var isActive = $parent.hasClass('open')

    clearMenus()

    if (!isActive) {
      if ('ontouchstart' in document.documentElement && !$parent.closest('.navbar-nav').length) {
        // if mobile we use a backdrop because click events don't delegate
        $(document.createElement('div'))
          .addClass('dropdown-backdrop')
          .insertAfter($(this))
          .on('click', clearMenus)
      }

      var relatedTarget = { relatedTarget: this }
      $parent.trigger(e = $.Event('show.bs.dropdown', relatedTarget))

      if (e.isDefaultPrevented()) return

      $this
        .trigger('focus')
        .attr('aria-expanded', 'true')

      $parent
        .toggleClass('open')
        .trigger($.Event('shown.bs.dropdown', relatedTarget))
    }

    return false
  }

  Dropdown.prototype.keydown = function (e) {
    if (!/(38|40|27|32)/.test(e.which) || /input|textarea/i.test(e.target.tagName)) return

    var $this = $(this)

    e.preventDefault()
    e.stopPropagation()

    if ($this.is('.disabled, :disabled')) return

    var $parent  = getParent($this)
    var isActive = $parent.hasClass('open')

    if (!isActive && e.which != 27 || isActive && e.which == 27) {
      if (e.which == 27) $parent.find(toggle).trigger('focus')
      return $this.trigger('click')
    }

    var desc = ' li:not(.disabled):visible a'
    var $items = $parent.find('.dropdown-menu' + desc)

    if (!$items.length) return

    var index = $items.index(e.target)

    if (e.which == 38 && index > 0)                 index--         // up
    if (e.which == 40 && index < $items.length - 1) index++         // down
    if (!~index)                                    index = 0

    $items.eq(index).trigger('focus')
  }


  // DROPDOWN PLUGIN DEFINITION
  // ==========================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.dropdown')

      if (!data) $this.data('bs.dropdown', (data = new Dropdown(this)))
      if (typeof option == 'string') data[option].call($this)
    })
  }

  var old = $.fn.dropdown

  $.fn.dropdown             = Plugin
  $.fn.dropdown.Constructor = Dropdown


  // DROPDOWN NO CONFLICT
  // ====================

  $.fn.dropdown.noConflict = function () {
    $.fn.dropdown = old
    return this
  }


  // APPLY TO STANDARD DROPDOWN ELEMENTS
  // ===================================

  $(document)
    .on('click.bs.dropdown.data-api', clearMenus)
    .on('click.bs.dropdown.data-api', '.dropdown form', function (e) { e.stopPropagation() })
    .on('click.bs.dropdown.data-api', toggle, Dropdown.prototype.toggle)
    .on('keydown.bs.dropdown.data-api', toggle, Dropdown.prototype.keydown)
    .on('keydown.bs.dropdown.data-api', '.dropdown-menu', Dropdown.prototype.keydown)

}(jQuery);

/* ========================================================================
 * Bootstrap: modal.js v3.3.6
 * http://getbootstrap.com/javascript/#modals
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // MODAL CLASS DEFINITION
  // ======================

  var Modal = function (element, options) {
    this.options             = options
    this.$body               = $(document.body)
    this.$element            = $(element)
    this.$dialog             = this.$element.find('.modal-dialog')
    this.$backdrop           = null
    this.isShown             = null
    this.originalBodyPad     = null
    this.scrollbarWidth      = 0
    this.ignoreBackdropClick = false

    if (this.options.remote) {
      this.$element
        .find('.modal-content')
        .load(this.options.remote, $.proxy(function () {
          this.$element.trigger('loaded.bs.modal')
        }, this))
    }
  }

  Modal.VERSION  = '3.3.6'

  Modal.TRANSITION_DURATION = 300
  Modal.BACKDROP_TRANSITION_DURATION = 150

  Modal.DEFAULTS = {
    backdrop: true,
    keyboard: true,
    show: true
  }

  Modal.prototype.toggle = function (_relatedTarget) {
    return this.isShown ? this.hide() : this.show(_relatedTarget)
  }

  Modal.prototype.show = function (_relatedTarget) {
    var that = this
    var e    = $.Event('show.bs.modal', { relatedTarget: _relatedTarget })

    this.$element.trigger(e)

    if (this.isShown || e.isDefaultPrevented()) return

    this.isShown = true

    this.checkScrollbar()
    this.setScrollbar()
    this.$body.addClass('modal-open')

    this.escape()
    this.resize()

    this.$element.on('click.dismiss.bs.modal', '[data-dismiss="modal"]', $.proxy(this.hide, this))

    this.$dialog.on('mousedown.dismiss.bs.modal', function () {
      that.$element.one('mouseup.dismiss.bs.modal', function (e) {
        if ($(e.target).is(that.$element)) that.ignoreBackdropClick = true
      })
    })

    this.backdrop(function () {
      var transition = $.support.transition && that.$element.hasClass('fade')

      if (!that.$element.parent().length) {
        that.$element.appendTo(that.$body) // don't move modals dom position
      }

      that.$element
        .show()
        .scrollTop(0)

      that.adjustDialog()

      if (transition) {
        that.$element[0].offsetWidth // force reflow
      }

      that.$element.addClass('in')

      that.enforceFocus()

      var e = $.Event('shown.bs.modal', { relatedTarget: _relatedTarget })

      transition ?
        that.$dialog // wait for modal to slide in
          .one('bsTransitionEnd', function () {
            that.$element.trigger('focus').trigger(e)
          })
          .emulateTransitionEnd(Modal.TRANSITION_DURATION) :
        that.$element.trigger('focus').trigger(e)
    })
  }

  Modal.prototype.hide = function (e) {
    if (e) e.preventDefault()

    e = $.Event('hide.bs.modal')

    this.$element.trigger(e)

    if (!this.isShown || e.isDefaultPrevented()) return

    this.isShown = false

    this.escape()
    this.resize()

    $(document).off('focusin.bs.modal')

    this.$element
      .removeClass('in')
      .off('click.dismiss.bs.modal')
      .off('mouseup.dismiss.bs.modal')

    this.$dialog.off('mousedown.dismiss.bs.modal')

    $.support.transition && this.$element.hasClass('fade') ?
      this.$element
        .one('bsTransitionEnd', $.proxy(this.hideModal, this))
        .emulateTransitionEnd(Modal.TRANSITION_DURATION) :
      this.hideModal()
  }

  Modal.prototype.enforceFocus = function () {
    $(document)
      .off('focusin.bs.modal') // guard against infinite focus loop
      .on('focusin.bs.modal', $.proxy(function (e) {
        if (this.$element[0] !== e.target && !this.$element.has(e.target).length) {
          this.$element.trigger('focus')
        }
      }, this))
  }

  Modal.prototype.escape = function () {
    if (this.isShown && this.options.keyboard) {
      this.$element.on('keydown.dismiss.bs.modal', $.proxy(function (e) {
        e.which == 27 && this.hide()
      }, this))
    } else if (!this.isShown) {
      this.$element.off('keydown.dismiss.bs.modal')
    }
  }

  Modal.prototype.resize = function () {
    if (this.isShown) {
      $(window).on('resize.bs.modal', $.proxy(this.handleUpdate, this))
    } else {
      $(window).off('resize.bs.modal')
    }
  }

  Modal.prototype.hideModal = function () {
    var that = this
    this.$element.hide()
    this.backdrop(function () {
      that.$body.removeClass('modal-open')
      that.resetAdjustments()
      that.resetScrollbar()
      that.$element.trigger('hidden.bs.modal')
    })
  }

  Modal.prototype.removeBackdrop = function () {
    this.$backdrop && this.$backdrop.remove()
    this.$backdrop = null
  }

  Modal.prototype.backdrop = function (callback) {
    var that = this
    var animate = this.$element.hasClass('fade') ? 'fade' : ''

    if (this.isShown && this.options.backdrop) {
      var doAnimate = $.support.transition && animate

      this.$backdrop = $(document.createElement('div'))
        .addClass('modal-backdrop ' + animate)
        .appendTo(this.$body)

      this.$element.on('click.dismiss.bs.modal', $.proxy(function (e) {
        if (this.ignoreBackdropClick) {
          this.ignoreBackdropClick = false
          return
        }
        if (e.target !== e.currentTarget) return
        this.options.backdrop == 'static'
          ? this.$element[0].focus()
          : this.hide()
      }, this))

      if (doAnimate) this.$backdrop[0].offsetWidth // force reflow

      this.$backdrop.addClass('in')

      if (!callback) return

      doAnimate ?
        this.$backdrop
          .one('bsTransitionEnd', callback)
          .emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION) :
        callback()

    } else if (!this.isShown && this.$backdrop) {
      this.$backdrop.removeClass('in')

      var callbackRemove = function () {
        that.removeBackdrop()
        callback && callback()
      }
      $.support.transition && this.$element.hasClass('fade') ?
        this.$backdrop
          .one('bsTransitionEnd', callbackRemove)
          .emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION) :
        callbackRemove()

    } else if (callback) {
      callback()
    }
  }

  // these following methods are used to handle overflowing modals

  Modal.prototype.handleUpdate = function () {
    this.adjustDialog()
  }

  Modal.prototype.adjustDialog = function () {
    var modalIsOverflowing = this.$element[0].scrollHeight > document.documentElement.clientHeight

    this.$element.css({
      paddingLeft:  !this.bodyIsOverflowing && modalIsOverflowing ? this.scrollbarWidth : '',
      paddingRight: this.bodyIsOverflowing && !modalIsOverflowing ? this.scrollbarWidth : ''
    })
  }

  Modal.prototype.resetAdjustments = function () {
    this.$element.css({
      paddingLeft: '',
      paddingRight: ''
    })
  }

  Modal.prototype.checkScrollbar = function () {
    var fullWindowWidth = window.innerWidth
    if (!fullWindowWidth) { // workaround for missing window.innerWidth in IE8
      var documentElementRect = document.documentElement.getBoundingClientRect()
      fullWindowWidth = documentElementRect.right - Math.abs(documentElementRect.left)
    }
    this.bodyIsOverflowing = document.body.clientWidth < fullWindowWidth
    this.scrollbarWidth = this.measureScrollbar()
  }

  Modal.prototype.setScrollbar = function () {
    var bodyPad = parseInt((this.$body.css('padding-right') || 0), 10)
    this.originalBodyPad = document.body.style.paddingRight || ''
    if (this.bodyIsOverflowing) this.$body.css('padding-right', bodyPad + this.scrollbarWidth)
  }

  Modal.prototype.resetScrollbar = function () {
    this.$body.css('padding-right', this.originalBodyPad)
  }

  Modal.prototype.measureScrollbar = function () { // thx walsh
    var scrollDiv = document.createElement('div')
    scrollDiv.className = 'modal-scrollbar-measure'
    this.$body.append(scrollDiv)
    var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth
    this.$body[0].removeChild(scrollDiv)
    return scrollbarWidth
  }


  // MODAL PLUGIN DEFINITION
  // =======================

  function Plugin(option, _relatedTarget) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.modal')
      var options = $.extend({}, Modal.DEFAULTS, $this.data(), typeof option == 'object' && option)

      if (!data) $this.data('bs.modal', (data = new Modal(this, options)))
      if (typeof option == 'string') data[option](_relatedTarget)
      else if (options.show) data.show(_relatedTarget)
    })
  }

  var old = $.fn.modal

  $.fn.modal             = Plugin
  $.fn.modal.Constructor = Modal


  // MODAL NO CONFLICT
  // =================

  $.fn.modal.noConflict = function () {
    $.fn.modal = old
    return this
  }


  // MODAL DATA-API
  // ==============

  $(document).on('click.bs.modal.data-api', '[data-toggle="modal"]', function (e) {
    var $this   = $(this)
    var href    = $this.attr('href')
    var $target = $($this.attr('data-target') || (href && href.replace(/.*(?=#[^\s]+$)/, ''))) // strip for ie7
    var option  = $target.data('bs.modal') ? 'toggle' : $.extend({ remote: !/#/.test(href) && href }, $target.data(), $this.data())

    if ($this.is('a')) e.preventDefault()

    $target.one('show.bs.modal', function (showEvent) {
      if (showEvent.isDefaultPrevented()) return // only register focus restorer if modal will actually get shown
      $target.one('hidden.bs.modal', function () {
        $this.is(':visible') && $this.trigger('focus')
      })
    })
    Plugin.call($target, option, this)
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: tooltip.js v3.3.6
 * http://getbootstrap.com/javascript/#tooltip
 * Inspired by the original jQuery.tipsy by Jason Frame
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // TOOLTIP PUBLIC CLASS DEFINITION
  // ===============================

  var Tooltip = function (element, options) {
    this.type       = null
    this.options    = null
    this.enabled    = null
    this.timeout    = null
    this.hoverState = null
    this.$element   = null
    this.inState    = null

    this.init('tooltip', element, options)
  }

  Tooltip.VERSION  = '3.3.6'

  Tooltip.TRANSITION_DURATION = 150

  Tooltip.DEFAULTS = {
    animation: true,
    placement: 'top',
    selector: false,
    template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
    trigger: 'hover focus',
    title: '',
    delay: 0,
    html: false,
    container: false,
    viewport: {
      selector: 'body',
      padding: 0
    }
  }

  Tooltip.prototype.init = function (type, element, options) {
    this.enabled   = true
    this.type      = type
    this.$element  = $(element)
    this.options   = this.getOptions(options)
    this.$viewport = this.options.viewport && $($.isFunction(this.options.viewport) ? this.options.viewport.call(this, this.$element) : (this.options.viewport.selector || this.options.viewport))
    this.inState   = { click: false, hover: false, focus: false }

    if (this.$element[0] instanceof document.constructor && !this.options.selector) {
      throw new Error('`selector` option must be specified when initializing ' + this.type + ' on the window.document object!')
    }

    var triggers = this.options.trigger.split(' ')

    for (var i = triggers.length; i--;) {
      var trigger = triggers[i]

      if (trigger == 'click') {
        this.$element.on('click.' + this.type, this.options.selector, $.proxy(this.toggle, this))
      } else if (trigger != 'manual') {
        var eventIn  = trigger == 'hover' ? 'mouseenter' : 'focusin'
        var eventOut = trigger == 'hover' ? 'mouseleave' : 'focusout'

        this.$element.on(eventIn  + '.' + this.type, this.options.selector, $.proxy(this.enter, this))
        this.$element.on(eventOut + '.' + this.type, this.options.selector, $.proxy(this.leave, this))
      }
    }

    this.options.selector ?
      (this._options = $.extend({}, this.options, { trigger: 'manual', selector: '' })) :
      this.fixTitle()
  }

  Tooltip.prototype.getDefaults = function () {
    return Tooltip.DEFAULTS
  }

  Tooltip.prototype.getOptions = function (options) {
    options = $.extend({}, this.getDefaults(), this.$element.data(), options)

    if (options.delay && typeof options.delay == 'number') {
      options.delay = {
        show: options.delay,
        hide: options.delay
      }
    }

    return options
  }

  Tooltip.prototype.getDelegateOptions = function () {
    var options  = {}
    var defaults = this.getDefaults()

    this._options && $.each(this._options, function (key, value) {
      if (defaults[key] != value) options[key] = value
    })

    return options
  }

  Tooltip.prototype.enter = function (obj) {
    var self = obj instanceof this.constructor ?
      obj : $(obj.currentTarget).data('bs.' + this.type)

    if (!self) {
      self = new this.constructor(obj.currentTarget, this.getDelegateOptions())
      $(obj.currentTarget).data('bs.' + this.type, self)
    }

    if (obj instanceof $.Event) {
      self.inState[obj.type == 'focusin' ? 'focus' : 'hover'] = true
    }

    if (self.tip().hasClass('in') || self.hoverState == 'in') {
      self.hoverState = 'in'
      return
    }

    clearTimeout(self.timeout)

    self.hoverState = 'in'

    if (!self.options.delay || !self.options.delay.show) return self.show()

    self.timeout = setTimeout(function () {
      if (self.hoverState == 'in') self.show()
    }, self.options.delay.show)
  }

  Tooltip.prototype.isInStateTrue = function () {
    for (var key in this.inState) {
      if (this.inState[key]) return true
    }

    return false
  }

  Tooltip.prototype.leave = function (obj) {
    var self = obj instanceof this.constructor ?
      obj : $(obj.currentTarget).data('bs.' + this.type)

    if (!self) {
      self = new this.constructor(obj.currentTarget, this.getDelegateOptions())
      $(obj.currentTarget).data('bs.' + this.type, self)
    }

    if (obj instanceof $.Event) {
      self.inState[obj.type == 'focusout' ? 'focus' : 'hover'] = false
    }

    if (self.isInStateTrue()) return

    clearTimeout(self.timeout)

    self.hoverState = 'out'

    if (!self.options.delay || !self.options.delay.hide) return self.hide()

    self.timeout = setTimeout(function () {
      if (self.hoverState == 'out') self.hide()
    }, self.options.delay.hide)
  }

  Tooltip.prototype.show = function () {
    var e = $.Event('show.bs.' + this.type)

    if (this.hasContent() && this.enabled) {
      this.$element.trigger(e)

      var inDom = $.contains(this.$element[0].ownerDocument.documentElement, this.$element[0])
      if (e.isDefaultPrevented() || !inDom) return
      var that = this

      var $tip = this.tip()

      var tipId = this.getUID(this.type)

      this.setContent()
      $tip.attr('id', tipId)
      this.$element.attr('aria-describedby', tipId)

      if (this.options.animation) $tip.addClass('fade')

      var placement = typeof this.options.placement == 'function' ?
        this.options.placement.call(this, $tip[0], this.$element[0]) :
        this.options.placement

      var autoToken = /\s?auto?\s?/i
      var autoPlace = autoToken.test(placement)
      if (autoPlace) placement = placement.replace(autoToken, '') || 'top'

      $tip
        .detach()
        .css({ top: 0, left: 0, display: 'block' })
        .addClass(placement)
        .data('bs.' + this.type, this)

      this.options.container ? $tip.appendTo(this.options.container) : $tip.insertAfter(this.$element)
      this.$element.trigger('inserted.bs.' + this.type)

      var pos          = this.getPosition()
      var actualWidth  = $tip[0].offsetWidth
      var actualHeight = $tip[0].offsetHeight

      if (autoPlace) {
        var orgPlacement = placement
        var viewportDim = this.getPosition(this.$viewport)

        placement = placement == 'bottom' && pos.bottom + actualHeight > viewportDim.bottom ? 'top'    :
                    placement == 'top'    && pos.top    - actualHeight < viewportDim.top    ? 'bottom' :
                    placement == 'right'  && pos.right  + actualWidth  > viewportDim.width  ? 'left'   :
                    placement == 'left'   && pos.left   - actualWidth  < viewportDim.left   ? 'right'  :
                    placement

        $tip
          .removeClass(orgPlacement)
          .addClass(placement)
      }

      var calculatedOffset = this.getCalculatedOffset(placement, pos, actualWidth, actualHeight)

      this.applyPlacement(calculatedOffset, placement)

      var complete = function () {
        var prevHoverState = that.hoverState
        that.$element.trigger('shown.bs.' + that.type)
        that.hoverState = null

        if (prevHoverState == 'out') that.leave(that)
      }

      $.support.transition && this.$tip.hasClass('fade') ?
        $tip
          .one('bsTransitionEnd', complete)
          .emulateTransitionEnd(Tooltip.TRANSITION_DURATION) :
        complete()
    }
  }

  Tooltip.prototype.applyPlacement = function (offset, placement) {
    var $tip   = this.tip()
    var width  = $tip[0].offsetWidth
    var height = $tip[0].offsetHeight

    // manually read margins because getBoundingClientRect includes difference
    var marginTop = parseInt($tip.css('margin-top'), 10)
    var marginLeft = parseInt($tip.css('margin-left'), 10)

    // we must check for NaN for ie 8/9
    if (isNaN(marginTop))  marginTop  = 0
    if (isNaN(marginLeft)) marginLeft = 0

    offset.top  += marginTop
    offset.left += marginLeft

    // $.fn.offset doesn't round pixel values
    // so we use setOffset directly with our own function B-0
    $.offset.setOffset($tip[0], $.extend({
      using: function (props) {
        $tip.css({
          top: Math.round(props.top),
          left: Math.round(props.left)
        })
      }
    }, offset), 0)

    $tip.addClass('in')

    // check to see if placing tip in new offset caused the tip to resize itself
    var actualWidth  = $tip[0].offsetWidth
    var actualHeight = $tip[0].offsetHeight

    if (placement == 'top' && actualHeight != height) {
      offset.top = offset.top + height - actualHeight
    }

    var delta = this.getViewportAdjustedDelta(placement, offset, actualWidth, actualHeight)

    if (delta.left) offset.left += delta.left
    else offset.top += delta.top

    var isVertical          = /top|bottom/.test(placement)
    var arrowDelta          = isVertical ? delta.left * 2 - width + actualWidth : delta.top * 2 - height + actualHeight
    var arrowOffsetPosition = isVertical ? 'offsetWidth' : 'offsetHeight'

    $tip.offset(offset)
    this.replaceArrow(arrowDelta, $tip[0][arrowOffsetPosition], isVertical)
  }

  Tooltip.prototype.replaceArrow = function (delta, dimension, isVertical) {
    this.arrow()
      .css(isVertical ? 'left' : 'top', 50 * (1 - delta / dimension) + '%')
      .css(isVertical ? 'top' : 'left', '')
  }

  Tooltip.prototype.setContent = function () {
    var $tip  = this.tip()
    var title = this.getTitle()

    $tip.find('.tooltip-inner')[this.options.html ? 'html' : 'text'](title)
    $tip.removeClass('fade in top bottom left right')
  }

  Tooltip.prototype.hide = function (callback) {
    var that = this
    var $tip = $(this.$tip)
    var e    = $.Event('hide.bs.' + this.type)

    function complete() {
      if (that.hoverState != 'in') $tip.detach()
      that.$element
        .removeAttr('aria-describedby')
        .trigger('hidden.bs.' + that.type)
      callback && callback()
    }

    this.$element.trigger(e)

    if (e.isDefaultPrevented()) return

    $tip.removeClass('in')

    $.support.transition && $tip.hasClass('fade') ?
      $tip
        .one('bsTransitionEnd', complete)
        .emulateTransitionEnd(Tooltip.TRANSITION_DURATION) :
      complete()

    this.hoverState = null

    return this
  }

  Tooltip.prototype.fixTitle = function () {
    var $e = this.$element
    if ($e.attr('title') || typeof $e.attr('data-original-title') != 'string') {
      $e.attr('data-original-title', $e.attr('title') || '').attr('title', '')
    }
  }

  Tooltip.prototype.hasContent = function () {
    return this.getTitle()
  }

  Tooltip.prototype.getPosition = function ($element) {
    $element   = $element || this.$element

    var el     = $element[0]
    var isBody = el.tagName == 'BODY'

    var elRect    = el.getBoundingClientRect()
    if (elRect.width == null) {
      // width and height are missing in IE8, so compute them manually; see https://github.com/twbs/bootstrap/issues/14093
      elRect = $.extend({}, elRect, { width: elRect.right - elRect.left, height: elRect.bottom - elRect.top })
    }
    var elOffset  = isBody ? { top: 0, left: 0 } : $element.offset()
    var scroll    = { scroll: isBody ? document.documentElement.scrollTop || document.body.scrollTop : $element.scrollTop() }
    var outerDims = isBody ? { width: $(window).width(), height: $(window).height() } : null

    return $.extend({}, elRect, scroll, outerDims, elOffset)
  }

  Tooltip.prototype.getCalculatedOffset = function (placement, pos, actualWidth, actualHeight) {
    return placement == 'bottom' ? { top: pos.top + pos.height,   left: pos.left + pos.width / 2 - actualWidth / 2 } :
           placement == 'top'    ? { top: pos.top - actualHeight, left: pos.left + pos.width / 2 - actualWidth / 2 } :
           placement == 'left'   ? { top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left - actualWidth } :
        /* placement == 'right' */ { top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left + pos.width }

  }

  Tooltip.prototype.getViewportAdjustedDelta = function (placement, pos, actualWidth, actualHeight) {
    var delta = { top: 0, left: 0 }
    if (!this.$viewport) return delta

    var viewportPadding = this.options.viewport && this.options.viewport.padding || 0
    var viewportDimensions = this.getPosition(this.$viewport)

    if (/right|left/.test(placement)) {
      var topEdgeOffset    = pos.top - viewportPadding - viewportDimensions.scroll
      var bottomEdgeOffset = pos.top + viewportPadding - viewportDimensions.scroll + actualHeight
      if (topEdgeOffset < viewportDimensions.top) { // top overflow
        delta.top = viewportDimensions.top - topEdgeOffset
      } else if (bottomEdgeOffset > viewportDimensions.top + viewportDimensions.height) { // bottom overflow
        delta.top = viewportDimensions.top + viewportDimensions.height - bottomEdgeOffset
      }
    } else {
      var leftEdgeOffset  = pos.left - viewportPadding
      var rightEdgeOffset = pos.left + viewportPadding + actualWidth
      if (leftEdgeOffset < viewportDimensions.left) { // left overflow
        delta.left = viewportDimensions.left - leftEdgeOffset
      } else if (rightEdgeOffset > viewportDimensions.right) { // right overflow
        delta.left = viewportDimensions.left + viewportDimensions.width - rightEdgeOffset
      }
    }

    return delta
  }

  Tooltip.prototype.getTitle = function () {
    var title
    var $e = this.$element
    var o  = this.options

    title = $e.attr('data-original-title')
      || (typeof o.title == 'function' ? o.title.call($e[0]) :  o.title)

    return title
  }

  Tooltip.prototype.getUID = function (prefix) {
    do prefix += ~~(Math.random() * 1000000)
    while (document.getElementById(prefix))
    return prefix
  }

  Tooltip.prototype.tip = function () {
    if (!this.$tip) {
      this.$tip = $(this.options.template)
      if (this.$tip.length != 1) {
        throw new Error(this.type + ' `template` option must consist of exactly 1 top-level element!')
      }
    }
    return this.$tip
  }

  Tooltip.prototype.arrow = function () {
    return (this.$arrow = this.$arrow || this.tip().find('.tooltip-arrow'))
  }

  Tooltip.prototype.enable = function () {
    this.enabled = true
  }

  Tooltip.prototype.disable = function () {
    this.enabled = false
  }

  Tooltip.prototype.toggleEnabled = function () {
    this.enabled = !this.enabled
  }

  Tooltip.prototype.toggle = function (e) {
    var self = this
    if (e) {
      self = $(e.currentTarget).data('bs.' + this.type)
      if (!self) {
        self = new this.constructor(e.currentTarget, this.getDelegateOptions())
        $(e.currentTarget).data('bs.' + this.type, self)
      }
    }

    if (e) {
      self.inState.click = !self.inState.click
      if (self.isInStateTrue()) self.enter(self)
      else self.leave(self)
    } else {
      self.tip().hasClass('in') ? self.leave(self) : self.enter(self)
    }
  }

  Tooltip.prototype.destroy = function () {
    var that = this
    clearTimeout(this.timeout)
    this.hide(function () {
      that.$element.off('.' + that.type).removeData('bs.' + that.type)
      if (that.$tip) {
        that.$tip.detach()
      }
      that.$tip = null
      that.$arrow = null
      that.$viewport = null
    })
  }


  // TOOLTIP PLUGIN DEFINITION
  // =========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.tooltip')
      var options = typeof option == 'object' && option

      if (!data && /destroy|hide/.test(option)) return
      if (!data) $this.data('bs.tooltip', (data = new Tooltip(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.tooltip

  $.fn.tooltip             = Plugin
  $.fn.tooltip.Constructor = Tooltip


  // TOOLTIP NO CONFLICT
  // ===================

  $.fn.tooltip.noConflict = function () {
    $.fn.tooltip = old
    return this
  }

}(jQuery);

/* ========================================================================
 * Bootstrap: popover.js v3.3.6
 * http://getbootstrap.com/javascript/#popovers
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // POPOVER PUBLIC CLASS DEFINITION
  // ===============================

  var Popover = function (element, options) {
    this.init('popover', element, options)
  }

  if (!$.fn.tooltip) throw new Error('Popover requires tooltip.js')

  Popover.VERSION  = '3.3.6'

  Popover.DEFAULTS = $.extend({}, $.fn.tooltip.Constructor.DEFAULTS, {
    placement: 'right',
    trigger: 'click',
    content: '',
    template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
  })


  // NOTE: POPOVER EXTENDS tooltip.js
  // ================================

  Popover.prototype = $.extend({}, $.fn.tooltip.Constructor.prototype)

  Popover.prototype.constructor = Popover

  Popover.prototype.getDefaults = function () {
    return Popover.DEFAULTS
  }

  Popover.prototype.setContent = function () {
    var $tip    = this.tip()
    var title   = this.getTitle()
    var content = this.getContent()

    $tip.find('.popover-title')[this.options.html ? 'html' : 'text'](title)
    $tip.find('.popover-content').children().detach().end()[ // we use append for html objects to maintain js events
      this.options.html ? (typeof content == 'string' ? 'html' : 'append') : 'text'
    ](content)

    $tip.removeClass('fade top bottom left right in')

    // IE8 doesn't accept hiding via the `:empty` pseudo selector, we have to do
    // this manually by checking the contents.
    if (!$tip.find('.popover-title').html()) $tip.find('.popover-title').hide()
  }

  Popover.prototype.hasContent = function () {
    return this.getTitle() || this.getContent()
  }

  Popover.prototype.getContent = function () {
    var $e = this.$element
    var o  = this.options

    return $e.attr('data-content')
      || (typeof o.content == 'function' ?
            o.content.call($e[0]) :
            o.content)
  }

  Popover.prototype.arrow = function () {
    return (this.$arrow = this.$arrow || this.tip().find('.arrow'))
  }


  // POPOVER PLUGIN DEFINITION
  // =========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.popover')
      var options = typeof option == 'object' && option

      if (!data && /destroy|hide/.test(option)) return
      if (!data) $this.data('bs.popover', (data = new Popover(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.popover

  $.fn.popover             = Plugin
  $.fn.popover.Constructor = Popover


  // POPOVER NO CONFLICT
  // ===================

  $.fn.popover.noConflict = function () {
    $.fn.popover = old
    return this
  }

}(jQuery);

/* ========================================================================
 * Bootstrap: scrollspy.js v3.3.6
 * http://getbootstrap.com/javascript/#scrollspy
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // SCROLLSPY CLASS DEFINITION
  // ==========================

  function ScrollSpy(element, options) {
    this.$body          = $(document.body)
    this.$scrollElement = $(element).is(document.body) ? $(window) : $(element)
    this.options        = $.extend({}, ScrollSpy.DEFAULTS, options)
    this.selector       = (this.options.target || '') + ' .nav li > a'
    this.offsets        = []
    this.targets        = []
    this.activeTarget   = null
    this.scrollHeight   = 0

    this.$scrollElement.on('scroll.bs.scrollspy', $.proxy(this.process, this))
    this.refresh()
    this.process()
  }

  ScrollSpy.VERSION  = '3.3.6'

  ScrollSpy.DEFAULTS = {
    offset: 10
  }

  ScrollSpy.prototype.getScrollHeight = function () {
    return this.$scrollElement[0].scrollHeight || Math.max(this.$body[0].scrollHeight, document.documentElement.scrollHeight)
  }

  ScrollSpy.prototype.refresh = function () {
    var that          = this
    var offsetMethod  = 'offset'
    var offsetBase    = 0

    this.offsets      = []
    this.targets      = []
    this.scrollHeight = this.getScrollHeight()

    if (!$.isWindow(this.$scrollElement[0])) {
      offsetMethod = 'position'
      offsetBase   = this.$scrollElement.scrollTop()
    }

    this.$body
      .find(this.selector)
      .map(function () {
        var $el   = $(this)
        var href  = $el.data('target') || $el.attr('href')
        var $href = /^#./.test(href) && $(href)

        return ($href
          && $href.length
          && $href.is(':visible')
          && [[$href[offsetMethod]().top + offsetBase, href]]) || null
      })
      .sort(function (a, b) { return a[0] - b[0] })
      .each(function () {
        that.offsets.push(this[0])
        that.targets.push(this[1])
      })
  }

  ScrollSpy.prototype.process = function () {
    var scrollTop    = this.$scrollElement.scrollTop() + this.options.offset
    var scrollHeight = this.getScrollHeight()
    var maxScroll    = this.options.offset + scrollHeight - this.$scrollElement.height()
    var offsets      = this.offsets
    var targets      = this.targets
    var activeTarget = this.activeTarget
    var i

    if (this.scrollHeight != scrollHeight) {
      this.refresh()
    }

    if (scrollTop >= maxScroll) {
      return activeTarget != (i = targets[targets.length - 1]) && this.activate(i)
    }

    if (activeTarget && scrollTop < offsets[0]) {
      this.activeTarget = null
      return this.clear()
    }

    for (i = offsets.length; i--;) {
      activeTarget != targets[i]
        && scrollTop >= offsets[i]
        && (offsets[i + 1] === undefined || scrollTop < offsets[i + 1])
        && this.activate(targets[i])
    }
  }

  ScrollSpy.prototype.activate = function (target) {
    this.activeTarget = target

    this.clear()

    var selector = this.selector +
      '[data-target="' + target + '"],' +
      this.selector + '[href="' + target + '"]'

    var active = $(selector)
      .parents('li')
      .addClass('active')

    if (active.parent('.dropdown-menu').length) {
      active = active
        .closest('li.dropdown')
        .addClass('active')
    }

    active.trigger('activate.bs.scrollspy')
  }

  ScrollSpy.prototype.clear = function () {
    $(this.selector)
      .parentsUntil(this.options.target, '.active')
      .removeClass('active')
  }


  // SCROLLSPY PLUGIN DEFINITION
  // ===========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.scrollspy')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.scrollspy', (data = new ScrollSpy(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.scrollspy

  $.fn.scrollspy             = Plugin
  $.fn.scrollspy.Constructor = ScrollSpy


  // SCROLLSPY NO CONFLICT
  // =====================

  $.fn.scrollspy.noConflict = function () {
    $.fn.scrollspy = old
    return this
  }


  // SCROLLSPY DATA-API
  // ==================

  $(window).on('load.bs.scrollspy.data-api', function () {
    $('[data-spy="scroll"]').each(function () {
      var $spy = $(this)
      Plugin.call($spy, $spy.data())
    })
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: tab.js v3.3.6
 * http://getbootstrap.com/javascript/#tabs
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // TAB CLASS DEFINITION
  // ====================

  var Tab = function (element) {
    // jscs:disable requireDollarBeforejQueryAssignment
    this.element = $(element)
    // jscs:enable requireDollarBeforejQueryAssignment
  }

  Tab.VERSION = '3.3.6'

  Tab.TRANSITION_DURATION = 150

  Tab.prototype.show = function () {
    var $this    = this.element
    var $ul      = $this.closest('ul:not(.dropdown-menu)')
    var selector = $this.data('target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
    }

    if ($this.parent('li').hasClass('active')) return

    var $previous = $ul.find('.active:last a')
    var hideEvent = $.Event('hide.bs.tab', {
      relatedTarget: $this[0]
    })
    var showEvent = $.Event('show.bs.tab', {
      relatedTarget: $previous[0]
    })

    $previous.trigger(hideEvent)
    $this.trigger(showEvent)

    if (showEvent.isDefaultPrevented() || hideEvent.isDefaultPrevented()) return

    var $target = $(selector)

    this.activate($this.closest('li'), $ul)
    this.activate($target, $target.parent(), function () {
      $previous.trigger({
        type: 'hidden.bs.tab',
        relatedTarget: $this[0]
      })
      $this.trigger({
        type: 'shown.bs.tab',
        relatedTarget: $previous[0]
      })
    })
  }

  Tab.prototype.activate = function (element, container, callback) {
    var $active    = container.find('> .active')
    var transition = callback
      && $.support.transition
      && ($active.length && $active.hasClass('fade') || !!container.find('> .fade').length)

    function next() {
      $active
        .removeClass('active')
        .find('> .dropdown-menu > .active')
          .removeClass('active')
        .end()
        .find('[data-toggle="tab"]')
          .attr('aria-expanded', false)

      element
        .addClass('active')
        .find('[data-toggle="tab"]')
          .attr('aria-expanded', true)

      if (transition) {
        element[0].offsetWidth // reflow for transition
        element.addClass('in')
      } else {
        element.removeClass('fade')
      }

      if (element.parent('.dropdown-menu').length) {
        element
          .closest('li.dropdown')
            .addClass('active')
          .end()
          .find('[data-toggle="tab"]')
            .attr('aria-expanded', true)
      }

      callback && callback()
    }

    $active.length && transition ?
      $active
        .one('bsTransitionEnd', next)
        .emulateTransitionEnd(Tab.TRANSITION_DURATION) :
      next()

    $active.removeClass('in')
  }


  // TAB PLUGIN DEFINITION
  // =====================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.tab')

      if (!data) $this.data('bs.tab', (data = new Tab(this)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.tab

  $.fn.tab             = Plugin
  $.fn.tab.Constructor = Tab


  // TAB NO CONFLICT
  // ===============

  $.fn.tab.noConflict = function () {
    $.fn.tab = old
    return this
  }


  // TAB DATA-API
  // ============

  var clickHandler = function (e) {
    e.preventDefault()
    Plugin.call($(this), 'show')
  }

  $(document)
    .on('click.bs.tab.data-api', '[data-toggle="tab"]', clickHandler)
    .on('click.bs.tab.data-api', '[data-toggle="pill"]', clickHandler)

}(jQuery);

/* ========================================================================
 * Bootstrap: affix.js v3.3.6
 * http://getbootstrap.com/javascript/#affix
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // AFFIX CLASS DEFINITION
  // ======================

  var Affix = function (element, options) {
    this.options = $.extend({}, Affix.DEFAULTS, options)

    this.$target = $(this.options.target)
      .on('scroll.bs.affix.data-api', $.proxy(this.checkPosition, this))
      .on('click.bs.affix.data-api',  $.proxy(this.checkPositionWithEventLoop, this))

    this.$element     = $(element)
    this.affixed      = null
    this.unpin        = null
    this.pinnedOffset = null

    this.checkPosition()
  }

  Affix.VERSION  = '3.3.6'

  Affix.RESET    = 'affix affix-top affix-bottom'

  Affix.DEFAULTS = {
    offset: 0,
    target: window
  }

  Affix.prototype.getState = function (scrollHeight, height, offsetTop, offsetBottom) {
    var scrollTop    = this.$target.scrollTop()
    var position     = this.$element.offset()
    var targetHeight = this.$target.height()

    if (offsetTop != null && this.affixed == 'top') return scrollTop < offsetTop ? 'top' : false

    if (this.affixed == 'bottom') {
      if (offsetTop != null) return (scrollTop + this.unpin <= position.top) ? false : 'bottom'
      return (scrollTop + targetHeight <= scrollHeight - offsetBottom) ? false : 'bottom'
    }

    var initializing   = this.affixed == null
    var colliderTop    = initializing ? scrollTop : position.top
    var colliderHeight = initializing ? targetHeight : height

    if (offsetTop != null && scrollTop <= offsetTop) return 'top'
    if (offsetBottom != null && (colliderTop + colliderHeight >= scrollHeight - offsetBottom)) return 'bottom'

    return false
  }

  Affix.prototype.getPinnedOffset = function () {
    if (this.pinnedOffset) return this.pinnedOffset
    this.$element.removeClass(Affix.RESET).addClass('affix')
    var scrollTop = this.$target.scrollTop()
    var position  = this.$element.offset()
    return (this.pinnedOffset = position.top - scrollTop)
  }

  Affix.prototype.checkPositionWithEventLoop = function () {
    setTimeout($.proxy(this.checkPosition, this), 1)
  }

  Affix.prototype.checkPosition = function () {
    if (!this.$element.is(':visible')) return

    var height       = this.$element.height()
    var offset       = this.options.offset
    var offsetTop    = offset.top
    var offsetBottom = offset.bottom
    var scrollHeight = Math.max($(document).height(), $(document.body).height())

    if (typeof offset != 'object')         offsetBottom = offsetTop = offset
    if (typeof offsetTop == 'function')    offsetTop    = offset.top(this.$element)
    if (typeof offsetBottom == 'function') offsetBottom = offset.bottom(this.$element)

    var affix = this.getState(scrollHeight, height, offsetTop, offsetBottom)

    if (this.affixed != affix) {
      if (this.unpin != null) this.$element.css('top', '')

      var affixType = 'affix' + (affix ? '-' + affix : '')
      var e         = $.Event(affixType + '.bs.affix')

      this.$element.trigger(e)

      if (e.isDefaultPrevented()) return

      this.affixed = affix
      this.unpin = affix == 'bottom' ? this.getPinnedOffset() : null

      this.$element
        .removeClass(Affix.RESET)
        .addClass(affixType)
        .trigger(affixType.replace('affix', 'affixed') + '.bs.affix')
    }

    if (affix == 'bottom') {
      this.$element.offset({
        top: scrollHeight - height - offsetBottom
      })
    }
  }


  // AFFIX PLUGIN DEFINITION
  // =======================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.affix')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.affix', (data = new Affix(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.affix

  $.fn.affix             = Plugin
  $.fn.affix.Constructor = Affix


  // AFFIX NO CONFLICT
  // =================

  $.fn.affix.noConflict = function () {
    $.fn.affix = old
    return this
  }


  // AFFIX DATA-API
  // ==============

  $(window).on('load', function () {
    $('[data-spy="affix"]').each(function () {
      var $spy = $(this)
      var data = $spy.data()

      data.offset = data.offset || {}

      if (data.offsetBottom != null) data.offset.bottom = data.offsetBottom
      if (data.offsetTop    != null) data.offset.top    = data.offsetTop

      Plugin.call($spy, data)
    })
  })

}(jQuery);

window.PDK||(function(window){function copy(a,b,c,d){for(var e in b)(c||"undefined"==typeof a[e])&&(a[e]=d?d(b[e]):b[e]);return a}function create(a,b){for(var c=window.PDK,d=a?a.split("."):[],e=d.length,f=0;e>f;f++){var g=d[f],h=c[g];h||(h=b&&f+1==e?b:{},c[g]=h),c=h}return c}function include(a,b,c){return copy("string"==typeof a?create(a):a,b,c)}function log(a){_logging&&window.console&&window.console.log(a)}function guid(){return"p"+(Math.random()*(1<<30)).toString(16).replace(".","")}window.PDK={};var document=window.document,_appId=null,_session=null,_logging=!0,_domains={api:"https://api.pinterest.com/",www:"https://www.pinterest.com/"};include(PDK,{me:function(){var a,b=Api.__PREFIX+"me/",c=Array.prototype.slice.call(arguments),d=c.shift();d&&"string"==typeof d?a=d:"function"==typeof d&&c.unshift(d),a&&(b+=0===a.indexOf("/")?a.substr(1):a),c.unshift(b),PDK.request.apply(void 0,c)},request:function(){var a,b,c,d=Array.prototype.slice.call(arguments),e=d.shift(),f=d.shift();if(!e)return void log("Cannot make a request without specifying a path.");for("/"===e[0]&&(e=e.substr(1)),-1===e.indexOf(Api.__PREFIX)&&(e=Api.__PREFIX+e),-1===e.indexOf("/",e.length-1)&&(e+="/");f;){var g=typeof f;if("string"!==g||a)if("function"!==g||c){if("object"!==g||b)return void log("Invalid argument passed to api:"+f);b=f}else c=f;else a=f.toLowerCase();f=d.shift()}return a=a||"get",b=b||{},Api.__SUPPORTED_METHODS.indexOf(a)<0?void log("Invalid method passed to api:"+a):void Api.oauthRequest(e,a,b,c)}});var Api={__SUPPORTED_METHODS:["get","post","delete","put","patch"],__PREFIX:"v1/",__AUTHORIZATION_HEADER:"Authorization",triggerRequest:function(a,b,c,d,e,f){var g=f||c;window.XMLHttpRequest?a.open(b,g,!0):window.XDomainRequest&&a.open(b,g),a.setRequestHeader(Api.__AUTHORIZATION_HEADER,"BEARER "+e),a.send(d)},executeCorsRequest:function(a,b,c,d,e,f,g){var h,i,j=QS.encode(d),k=_domains.api+a;j&&(k+=(a.indexOf("?")>-1?"&":"?")+j),window.XMLHttpRequest?(h=new window.XMLHttpRequest,"withCredentials"in h&&(h.onerror=g,h.onreadystatechange=function(){4===h.readyState&&(h.status>=200&&h.status<400?Api.invokeXHRCallback(h,b,k,c,e,f):(i=h.status,Api.invokeXHRCallback(h,b,k,c,e,f,i)))},Api.triggerRequest(h,b,k,e,c))):window.XDomainRequest?(h=new window.XDomainRequest,h.onerror=g,h.onload=function(){Api.invokeXHRCallback(h,b,k,c,e,f)},Api.triggerRequest(h,b,k,e,c)):g(new Error("CORS not supported"))},invokeXHRCallback:function(a,b,c,d,e,f,g){var h,i,j={};if(f=f||function(){},g)j.error="An error occured with status code: "+g;else if(a.responseText)try{j=JSON.parse(a.responseText)||j,h=j.page,h&&h.next&&(i=h.next,j.hasNext=!0),j.hasNext&&(j.next=function(){Api.triggerRequest(a,b,c,e,d,i)})}catch(k){j.error=k&&k.message}else j.error="The request did not return a valid response";"function"==typeof f&&f(j)},oauthRequest:function(a,b,c,d){var e;if(c.accessToken?(e=c.accessToken,delete c.accessToken):e=Auth.getAccessToken(),!e)return void log("A request was made on behalf of a user before they were authenticated.");var f=null;c.data&&(f=QS.encode(c.data),delete c.data);try{Api.executeCorsRequest(a,b,e,c,f,d,function(a){var b="The request did not complete because of a failure on the network level.";a&&a.message&&(b=a.message),log(b)})}catch(g){log("Unable to create the request.")}}};include(PDK,{login:function(a,b){var c;if(a.scope){var d=Auth.getCurrentScope();d&&!Auth.isNewPermRequested(a.scope,d)&&(c="The current user is already authenticated")}else c="Cannot login without providing scope as an option";return c?void b({error:c}):(a=copy({method:"auth.login"},a||{}),void UI.createCall(a,b))},logout:function(a){var b=Auth.setSession(null);b.session&&(b.error="The active users session was not cleared."),"function"!=typeof a&&(a=function(){}),a(b)},getSession:function(){return _session},setSession:function(a,b){var c;a&&(c=Auth.setSession(a)),"function"==typeof b&&b(c)}});var Auth={_PERMS:["read_public","write_public","read_private","write_private","read_relationships","write_relationships"],setSession:function(a){var b=!_session&&a,c=_session&&!a,d=b||c||_session&&a&&_session.accessToken!==a.accessToken,e={session:a};return _session=a,d&&Cookie.isEnabled()&&Cookie.set(a),e},getAccessToken:function(){return _session?_session.accessToken:null},getCurrentScope:function(){return _session?_session.scope:null},getUserId:function(){var a=_session;return a&&a.user?a.user.userId||"":void 0},parseScope:function(a){var b=[];if(!a)return void log("No permissions specified.");for(var c=a.split(","),d=0;d<c.length;d++){var e=c[d].trim().toLowerCase();if(-1===Auth._PERMS.indexOf(e))return void log("Unsupported permission: "+c[d]+".");b.push(e)}return b.join(",")},isNewPermRequested:function(a,b){if(!b)return!0;for(var c=a.split(","),d=0;d<c.length;d++)if(-1===b.indexOf(c[d]))return!0;return!1}};include(PDK,{init:function(a){a=copy(a||{},{logging:!0}),_appId=a.appId,a.logging||(_logging=!1),_appId&&(Cookie.setEnabled(a.cookie),a.session=a.session||Cookie.load(),Auth.setSession(a.session))}}),window.setTimeout(function(){window.pAsyncInit&&pAsyncInit()},0),include(PDK,{pin:function(a,b,c,d){var e={method:"pin",media:a,description:b,url:c};UI.createCall(e,d)}});var UI={Methods:{},_active:{},_defaultCb:{},popupInterval:{},createCall:function(a,b){if(!a.method)return void log('"method" is a required parameter for ui call.');var c=UI.Methods[a.method.toLowerCase()],d=guid();if(!c)return void log("Unknown method: "+a.method);copy(a,{redirect_uri:UI.getRedirectUri()});var e={cb:b,id:d,size:c.size||{},url:_domains.api+c.url,params:a};if(!c.transform||(e=c.transform(e))){delete e.params.method,e.id in UI._defaultCb||(UI._defaultCb[e.id]=e.cb);var f=QS.encode(e.params);f&&(e.url+="?"+f),UI.popup(e)}},getRedirectUri:function(){return window.location.href.split("#")[0]},popup:function(a){var b,c="undefined"!=typeof window.screenX?window.screenX:window.screenLeft,d="undefined"!=typeof window.screenY?window.screenY:window.screenTop,e="undefined"!=typeof window.outerWidth?window.outerWidth:document.documentElement.clientWidth,f="undefined"!=typeof window.outerHeight?window.outerHeight:document.documentElement.clientHeight-22,g=a.size.width,h=a.size.height,i=parseInt(c+(e-g)/2,10),j=parseInt(d+(f-h)/2.5,10),k="width="+g+",height="+h+",left="+i+",top="+j,l=window.location,m=!1;l&&(l=l.origin||l.protocol+"//"+l.host),UI._active[a.id]={win:window.open(a.url,a.id,k),useRedirect:a.useRedirect,redirect_uri_origin:l},b=function(b){if(!m){if(b.origin+"/"!==_domains.api)return;UI._active[a.id]&&UI._active[a.id].win&&UI._active[a.id].win.close(),window.removeEventListener("message",arguments.callee,!1),UI.triggerEvent(a.id,b.data),m=!0}},a.useRedirect||window.addEventListener("message",b,!1),a.id in UI._active&&UI.monitorPopup()},triggerEvent:function(a,b){if(!UI._active[a]||!UI._defaultCb[a])return void log("There was no default callback for this UI method");var c=UI._defaultCb[a];if(!b){var d=UI._active[a].redirected_uri;b=QS.getParamsFromURL(d)}delete UI._active[a],delete UI._defaultCb[a],c=c||function(){},"function"==typeof c&&c(b)},monitorPopup:function(){var a=!0;for(var b in UI._active)if(UI._active.hasOwnProperty(b)&&b in UI._defaultCb){var c=UI._active[b],d=c.win;try{var e=d.location;d.closed?(a=!1,UI.triggerEvent(b)):c.useRedirect&&UI.isRedirectedToSameOrigin(e,c.redirect_uri_origin)&&(c.redirected_uri=e.href,d.close())}catch(f){log(f)}}a&&!UI.popupInterval[b]?UI.popupInterval[b]=window.setInterval(UI.monitorPopup,100):!a&&UI.popupInterval[b]&&(window.clearInterval(UI.popupInterval[b]),UI.popupInterval[b]=null)},isRedirectedToSameOrigin:function(a,b){try{return 0===a.href.indexOf(b)}catch(c){return!1}}};UI.Methods={"auth.login":{size:{width:627,height:440},url:"oauth",transform:function(a){if(!_appId)return void log("Trying to login before initializing.");var b=Auth.parseScope(a.params.scope);if(b)return a.useRedirect=!window.postMessage||/(iPhone|iPod|iPad).*AppleWebKit(?!.*Version)/i.test(navigator.userAgent)||-1!==navigator.userAgent.indexOf("MSIE")||navigator.appVersion.indexOf("Trident/")>0,UI._defaultCb[a.id]=function(c){var d={};if(c&&c.access_token){var e={accessToken:decodeURIComponent(c.access_token),scope:b};d=Auth.setSession(e)}a.cb(d)},copy(a.params,{client_id:_appId,response_type:"token",redirect_type:a.useRedirect?"uri":"js",scope:b},!0),a}},pin:{size:{width:760,height:565},url:"pin/create/button",transform:function(a){return a.url=_domains.www+this.url,a.useRedirect=!0,a}}};var Cookie={_domain:null,_enabled:!1,setEnabled:function(a){Cookie._enabled=a},isEnabled:function(){return Cookie._enabled},load:function(){var a,b=document.cookie.match("\\bps_"+_appId+'="([^;]*)\\b');return b&&(a=QS.decode(b[1]),Cookie._domain=a.base_domain),a},setRaw:function(a,b,c){document.cookie="ps_"+_appId+'="'+a+'"'+(a&&0===b?"":"; expires="+new Date(1e3*b).toGMTString())+"; path=/"+(c?"; domain=."+c:""),Cookie._domain=c},set:function(a){a?Cookie.setRaw(QS.encode(a),0,a.base_domain):Cookie.clear()},clear:function(){Cookie.setRaw("",0,Cookie._domain)}},QS={encode:function(a,b,c){b=void 0===b?"&":b,c=c===!1?function(a){return a}:encodeURIComponent;var d=[];for(var e in a)a.hasOwnProperty(e)&&(val=a[e],null!==val&&"undefined"!=typeof val&&d.push(c(e)+"="+c(val)));return d.sort(),d.join(b)},decode:function(a){for(var b,c=decodeURIComponent,d={},e=a.split("&"),f=0;f<e.length;f++)b=e[f].split(/=(.+)?/),b&&b[0]&&(d[c(b[0])]=c(b[1]));return d},getParamsFromURL:function(a){if(a){var b=a.split("?")[1];if(b)return QS.decode(b)}}};})(window);
/*1458458755,,JIT Construction: v2239045,en_US*/

/**
 * Copyright Facebook Inc.
 *
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
try {window.FB || (function(window, fb_fif_window) {  var apply = Function.prototype.apply;  function bindContext(fn, thisArg) {    return function _sdkBound() {      return apply.call(fn, thisArg, arguments);    };  }  var global = {    __type: 'JS_SDK_SANDBOX',    window: window,    document: window.document  };  var sandboxWhitelist = [    'setTimeout',    'setInterval',    'clearTimeout',    'clearInterval'  ];  for (var i = 0; i < sandboxWhitelist.length; i++) {    global[sandboxWhitelist[i]] = bindContext(      window[sandboxWhitelist[i]],      window    );  }  (function() {    var self = window;    var __DEV__ = 0;    function emptyFunction() {};    var __transform_includes = {};    var __annotator, __bodyWrapper;    var __w, __t;    var undefined;    with (this) {      (function(){var a={},b=function(i,j){if(!i&&!j)return null;var k={};if(typeof i!=='undefined')k.type=i;if(typeof j!=='undefined')k.signature=j;return k;},c=function(i,j){return b(i&&/^[A-Z]/.test(i)?i:undefined,j&&(j.params&&j.params.length||j.returns)?'function('+(j.params?j.params.map(function(k){return (/\?/.test(k)?'?'+k.replace('?',''):k);}).join(','):'')+')'+(j.returns?':'+j.returns:''):undefined);},d=function(i,j,k){return i;},e=function(i,j,k){if('sourcemeta' in __transform_includes)i.__SMmeta=j;if('typechecks' in __transform_includes){var l=c(j?j.name:undefined,k);if(l)__w(i,l);}return i;},f=function(i,j,k){return k.apply(i,j);},g=function(i,j,k,l){if(l&&l.params)__t.apply(i,l.params);var m=k.apply(i,j);if(l&&l.returns)__t([m,l.returns]);return m;},h=function(i,j,k,l,m){if(m){if(!m.callId)m.callId=m.module+':'+(m.line||0)+':'+(m.column||0);var n=m.callId;a[n]=(a[n]||0)+1;}return k.apply(i,j);};if(typeof __transform_includes==='undefined'){__annotator=d;__bodyWrapper=f;}else{__annotator=e;if('codeusage' in __transform_includes){__annotator=d;__bodyWrapper=h;__bodyWrapper.getCodeUsage=function(){return a;};__bodyWrapper.clearCodeUsage=function(){a={};};}else if('typechecks' in __transform_includes){__bodyWrapper=g;}else __bodyWrapper=f;}})();
__t=function(a){return a[0];};__w=function(a){return a;};
var require,__d;(function(a){var b={},c={},d=['global','require','requireDynamic','requireLazy','module','exports'];require=function(e,f){if(c.hasOwnProperty(e))return c[e];if(!b.hasOwnProperty(e)){if(f)return null;throw new Error('Module '+e+' has not been defined');}var g=b[e],h=g.deps,i=g.factory.length,j,k=[];for(var l=0;l<i;l++){switch(h[l]){case 'module':j=g;break;case 'exports':j=g.exports;break;case 'global':j=a;break;case 'require':j=require;break;case 'requireDynamic':j=null;break;case 'requireLazy':j=null;break;default:j=require.call(null,h[l]);}k.push(j);}g.factory.apply(a,k);c[e]=g.exports;return g.exports;};require.__markCompiled=function(){};__d=function(e,f,g,h){if(typeof g=='function'){b[e]={factory:g,deps:d.concat(f),exports:{}};if(h===3)require.call(null,e);}else c[e]=g;};})(this);
__d('ES5Array',[],function a(b,c,d,e,f,g){if(c.__markCompiled)c.__markCompiled();var h={};h.isArray=function(i){return Object.prototype.toString.call(i)=='[object Array]';};f.exports=h;},null);
__d('ES5ArrayPrototype',[],function a(b,c,d,e,f,g){if(c.__markCompiled)c.__markCompiled();var h={};h.map=function(i,j){if(typeof i!='function')throw new TypeError();var k,l=this.length,m=new Array(l);for(k=0;k<l;++k)if(k in this)m[k]=i.call(j,this[k],k,this);return m;};h.forEach=function(i,j){h.map.call(this,i,j);};h.filter=function(i,j){if(typeof i!='function')throw new TypeError();var k,l,m=this.length,n=[];for(k=0;k<m;++k)if(k in this){l=this[k];if(i.call(j,l,k,this))n.push(l);}return n;};h.every=function(i,j){if(typeof i!='function')throw new TypeError();var k=new Object(this),l=k.length;for(var m=0;m<l;m++)if(m in k)if(!i.call(j,k[m],m,k))return false;return true;};h.some=function(i,j){if(typeof i!='function')throw new TypeError();var k=new Object(this),l=k.length;for(var m=0;m<l;m++)if(m in k)if(i.call(j,k[m],m,k))return true;return false;};h.indexOf=function(i,j){var k=this.length;j|=0;if(j<0)j+=k;for(;j<k;j++)if(j in this&&this[j]===i)return j;return -1;};f.exports=h;},null);
__d("ES5Date",[],function a(b,c,d,e,f,g){if(c.__markCompiled)c.__markCompiled();var h={};h.now=function(){return new Date().getTime();};f.exports=h;},null);
__d('ES5FunctionPrototype',[],function a(b,c,d,e,f,g){if(c.__markCompiled)c.__markCompiled();var h={};h.bind=function(i){if(typeof this!='function')throw new TypeError('Bind must be called on a function');var j=this,k=Array.prototype.slice.call(arguments,1);function l(){return j.apply(i,k.concat(Array.prototype.slice.call(arguments)));}l.displayName='bound:'+(j.displayName||j.name||'(?)');l.toString=function m(){return 'bound: '+j;};return l;};f.exports=h;},null);
__d('ie8DontEnum',[],function a(b,c,d,e,f,g){if(c.__markCompiled)c.__markCompiled();var h=['toString','toLocaleString','valueOf','hasOwnProperty','isPrototypeOf','prototypeIsEnumerable','constructor'],i={}.hasOwnProperty,j=function(){};if({toString:true}.propertyIsEnumerable('toString'))j=function(k,l){for(var m=0;m<h.length;m++){var n=h[m];if(i.call(k,n))l(n);}};f.exports=j;},null);
__d('ES5Object',['ie8DontEnum'],function a(b,c,d,e,f,g,h){if(c.__markCompiled)c.__markCompiled();var i={}.hasOwnProperty,j={};function k(){}j.create=function(l){var m=typeof l;if(m!='object'&&m!='function')throw new TypeError('Object prototype may only be a Object or null');k.prototype=l;return new k();};j.keys=function(l){var m=typeof l;if(m!='object'&&m!='function'||l===null)throw new TypeError('Object.keys called on non-object');var n=[];for(var o in l)if(i.call(l,o))n.push(o);h(l,function(p){return n.push(p);});return n;};f.exports=j;},null);
__d('ES5StringPrototype',[],function a(b,c,d,e,f,g){if(c.__markCompiled)c.__markCompiled();var h={};h.trim=function(){if(this==null)throw new TypeError('String.prototype.trim called on null or undefined');return String.prototype.replace.call(this,/^\s+|\s+$/g,'');};h.startsWith=function(i){var j=String(this);if(this==null)throw new TypeError('String.prototype.startsWith called on null or undefined');var k=arguments.length>1?Number(arguments[1]):0;if(isNaN(k))k=0;var l=Math.min(Math.max(k,0),j.length);return j.indexOf(String(i),k)==l;};h.endsWith=function(i){var j=String(this);if(this==null)throw new TypeError('String.prototype.endsWith called on null or undefined');var k=j.length,l=String(i),m=arguments.length>1?Number(arguments[1]):k;if(isNaN(m))m=0;var n=Math.min(Math.max(m,0),k),o=n-l.length;if(o<0)return false;return j.lastIndexOf(l,o)==o;};h.contains=function(i){if(this==null)throw new TypeError('String.prototype.contains called on null or undefined');var j=String(this),k=arguments.length>1?Number(arguments[1]):0;if(isNaN(k))k=0;return j.indexOf(String(i),k)!=-1;};h.repeat=function(i){if(this==null)throw new TypeError('String.prototype.repeat called on null or undefined');var j=String(this),k=i?Number(i):0;if(isNaN(k))k=0;if(k<0||k===Infinity)throw RangeError();if(k===1)return j;if(k===0)return '';var l='';while(k){if(k&1)l+=j;if(k>>=1)j+=j;}return l;};f.exports=h;},null);
__d('ES6Array',[],function a(b,c,d,e,f,g){'use strict';if(c.__markCompiled)c.__markCompiled();var h={from:function(i){if(i==null)throw new TypeError('Object is null or undefined');var j=arguments[1],k=arguments[2],l=this,m=Object(i),n=typeof Symbol==='function'?typeof Symbol==='function'?Symbol.iterator:'@@iterator':'@@iterator',o=typeof j==='function',p=typeof m[n]==='function',q=0,r,s;if(p){r=typeof l==='function'?new l():[];var t=m[n](),u;while(!(u=t.next()).done){s=u.value;if(o)s=j.call(k,s,q);r[q]=s;q+=1;}r.length=q;return r;}var v=m.length;if(isNaN(v)||v<0)v=0;r=typeof l==='function'?new l(v):new Array(v);while(q<v){s=m[q];if(o)s=j.call(k,s,q);r[q]=s;q+=1;}r.length=q;return r;}};f.exports=h;},null);
__d('ES6ArrayPrototype',[],function a(b,c,d,e,f,g){if(c.__markCompiled)c.__markCompiled();var h={find:function(i,j){if(this==null)throw new TypeError('Array.prototype.find called on null or undefined');if(typeof i!=='function')throw new TypeError('predicate must be a function');var k=h.findIndex.call(this,i,j);return k===-1?void 0:this[k];},findIndex:function(i,j){if(this==null)throw new TypeError('Array.prototype.findIndex called on null or undefined');if(typeof i!=='function')throw new TypeError('predicate must be a function');var k=Object(this),l=k.length>>>0;for(var m=0;m<l;m++)if(i.call(j,k[m],m,k))return m;return -1;},fill:function(i){if(this==null)throw new TypeError('Array.prototype.fill called on null or undefined');var j=Object(this),k=j.length>>>0,l=arguments[1],m=l>>0,n=m<0?Math.max(k+m,0):Math.min(m,k),o=arguments[2],p=o===undefined?k:o>>0,q=p<0?Math.max(k+p,0):Math.min(p,k);while(n<q){j[n]=i;n++;}return j;}};f.exports=h;},null);
__d('ES6DatePrototype',[],function a(b,c,d,e,f,g){if(c.__markCompiled)c.__markCompiled();function h(j){return (j<10?'0':'')+j;}var i={toISOString:function(){if(!isFinite(this))throw new Error('Invalid time value');var j=this.getUTCFullYear();j=(j<0?'-':j>9999?'+':'')+('00000'+Math.abs(j)).slice(0<=j&&j<=9999?-4:-6);return j+'-'+h(this.getUTCMonth()+1)+'-'+h(this.getUTCDate())+'T'+h(this.getUTCHours())+':'+h(this.getUTCMinutes())+':'+h(this.getUTCSeconds())+'.'+(this.getUTCMilliseconds()/1000).toFixed(3).slice(2,5)+'Z';}};f.exports=i;},null);
__d('ES6Number',[],function a(b,c,d,e,f,g){if(c.__markCompiled)c.__markCompiled();var h=Math.pow(2,-52),i=Math.pow(2,53)-1,j=-1*i,k={isFinite:function(l){return typeof l=='number'&&isFinite(l);},isNaN:function(l){return typeof l=='number'&&isNaN(l);},isInteger:function(l){return this.isFinite(l)&&Math.floor(l)===l;},isSafeInteger:function(l){return this.isFinite(l)&&l>=this.MIN_SAFE_INTEGER&&l<=this.MAX_SAFE_INTEGER&&Math.floor(l)===l;},EPSILON:h,MAX_SAFE_INTEGER:i,MIN_SAFE_INTEGER:j};f.exports=k;},null);
__d('ES6Object',['ie8DontEnum'],function a(b,c,d,e,f,g,h){if(c.__markCompiled)c.__markCompiled();var i={}.hasOwnProperty,j={assign:function(k){if(k==null)throw new TypeError('Object.assign target cannot be null or undefined');k=Object(k);for(var l=arguments.length,m=Array(l>1?l-1:0),n=1;n<l;n++)m[n-1]=arguments[n];for(var o=0;o<m.length;o++){var p=m[o];if(p==null)continue;p=Object(p);for(var q in p)if(i.call(p,q))k[q]=p[q];h(p,function(r){return k[r]=p[r];});}return k;},is:function(k,l){if(k===l){return k!==0||1/k===1/l;}else return k!==k&&l!==l;}};f.exports=j;},null);
__d('ES7Object',['ie8DontEnum'],function a(b,c,d,e,f,g,h){if(c.__markCompiled)c.__markCompiled();var i={}.hasOwnProperty,j={};j.entries=function(k){if(k==null)throw new TypeError('Object.entries called on non-object');var l=[];for(var m in k)if(i.call(k,m))l.push([m,k[m]]);h(k,function(n){return l.push([n,k[n]]);});return l;};j.values=function(k){if(k==null)throw new TypeError('Object.values called on non-object');var l=[];for(var m in k)if(i.call(k,m))l.push(k[m]);h(k,function(n){return l.push(k[n]);});return l;};f.exports=j;},null);
__d('ES7StringPrototype',[],function a(b,c,d,e,f,g){if(c.__markCompiled)c.__markCompiled();var h={};h.trimLeft=function(){return this.replace(/^\s+/,'');};h.trimRight=function(){return this.replace(/\s+$/,'');};f.exports=h;},null);
/**
 * @providesModule JSON3
 * @preserve-header
 *
 *! JSON v3.2.3 | http://bestiejs.github.com/json3 | Copyright 2012, Kit Cambridge | http://kit.mit-license.org
 */__d("JSON3",[],function a(b,c,d,e,f,g){c.__markCompiled&&c.__markCompiled();(function(){var h={}.toString,i,j,k,l=f.exports={},m='{"A":[1,true,false,null,"\\u0000\\b\\n\\f\\r\\t"]}',n,o,p,q,r,s,t,u,v,w,x,y,z,aa,ba,ca=new Date(-3509827334573292),da,ea,fa;try{ca=ca.getUTCFullYear()==-109252&&ca.getUTCMonth()===0&&ca.getUTCDate()==1&&ca.getUTCHours()==10&&ca.getUTCMinutes()==37&&ca.getUTCSeconds()==6&&ca.getUTCMilliseconds()==708;}catch(ga){}if(!ca){da=Math.floor;ea=[0,31,59,90,120,151,181,212,243,273,304,334];fa=function(ha,ia){return ea[ia]+365*(ha-1970)+da((ha-1969+(ia=+(ia>1)))/4)-da((ha-1901+ia)/100)+da((ha-1601+ia)/400);};}if(typeof JSON=="object"&&JSON){l.stringify=JSON.stringify;l.parse=JSON.parse;}if((n=typeof l.stringify=="function"&&!fa)){(ca=function(){return 1;}).toJSON=ca;try{n=l.stringify(0)==="0"&&l.stringify(new Number())==="0"&&l.stringify(new String())=='""'&&l.stringify(h)===k&&l.stringify(k)===k&&l.stringify()===k&&l.stringify(ca)==="1"&&l.stringify([ca])=="[1]"&&l.stringify([k])=="[null]"&&l.stringify(null)=="null"&&l.stringify([k,h,null])=="[null,null,null]"&&l.stringify({result:[ca,true,false,null,"\0\b\n\f\r\t"]})==m&&l.stringify(null,ca)==="1"&&l.stringify([1,2],null,1)=="[\n 1,\n 2\n]"&&l.stringify(new Date(-8.64e+15))=='"-271821-04-20T00:00:00.000Z"'&&l.stringify(new Date(8.64e+15))=='"+275760-09-13T00:00:00.000Z"'&&l.stringify(new Date(-62198755200000))=='"-000001-01-01T00:00:00.000Z"'&&l.stringify(new Date(-1))=='"1969-12-31T23:59:59.999Z"';}catch(ga){n=false;}}if(typeof l.parse=="function")try{if(l.parse("0")===0&&!l.parse(false)){ca=l.parse(m);if((s=ca.A.length==5&&ca.A[0]==1)){try{s=!l.parse('"\t"');}catch(ga){}if(s)try{s=l.parse("01")!=1;}catch(ga){}}}}catch(ga){s=false;}ca=m=null;if(!n||!s){if(!(i={}.hasOwnProperty))i=function(ha){var ia={},ja;if((ia.__proto__=null,ia.__proto__={toString:1},ia).toString!=h){i=function(ka){var la=this.__proto__,ma=ka in (this.__proto__=null,this);this.__proto__=la;return ma;};}else{ja=ia.constructor;i=function(ka){var la=(this.constructor||ja).prototype;return ka in this&&!(ka in la&&this[ka]===la[ka]);};}ia=null;return i.call(this,ha);};j=function(ha,ia){var ja=0,ka,la,ma,na;(ka=function(){this.valueOf=0;}).prototype.valueOf=0;la=new ka();for(ma in la)if(i.call(la,ma))ja++;ka=la=null;if(!ja){la=["valueOf","toString","toLocaleString","propertyIsEnumerable","isPrototypeOf","hasOwnProperty","constructor"];na=function(oa,pa){var qa=h.call(oa)=="[object Function]",ra,sa;for(ra in oa)if(!(qa&&ra=="prototype")&&i.call(oa,ra))pa(ra);for(sa=la.length;ra=la[--sa];i.call(oa,ra)&&pa(ra));};}else if(ja==2){na=function(oa,pa){var qa={},ra=h.call(oa)=="[object Function]",sa;for(sa in oa)if(!(ra&&sa=="prototype")&&!i.call(qa,sa)&&(qa[sa]=1)&&i.call(oa,sa))pa(sa);};}else na=function(oa,pa){var qa=h.call(oa)=="[object Function]",ra,sa;for(ra in oa)if(!(qa&&ra=="prototype")&&i.call(oa,ra)&&!(sa=ra==="constructor"))pa(ra);if(sa||i.call(oa,(ra="constructor")))pa(ra);};return na(ha,ia);};if(!n){o={"\\":"\\\\",'"':'\\"',"\b":"\\b","\f":"\\f","\n":"\\n","\r":"\\r","\t":"\\t"};p=function(ha,ia){return ("000000"+(ia||0)).slice(-ha);};q=function(ha){var ia='"',ja=0,ka;for(;ka=ha.charAt(ja);ja++)ia+='\\"\b\f\n\r\t'.indexOf(ka)>-1?o[ka]:ka<" "?"\\u00"+p(2,ka.charCodeAt(0).toString(16)):ka;return ia+'"';};r=function(ha,ia,ja,ka,la,ma,na){var oa=ia[ha],pa,qa,ra,sa,ta,ua,va,wa,xa,ya,za,ab,bb,cb,db;if(typeof oa=="object"&&oa){pa=h.call(oa);if(pa=="[object Date]"&&!i.call(oa,"toJSON")){if(oa>-1/0&&oa<1/0){if(fa){sa=da(oa/86400000);for(qa=da(sa/365.2425)+1970-1;fa(qa+1,0)<=sa;qa++);for(ra=da((sa-fa(qa,0))/30.42);fa(qa,ra+1)<=sa;ra++);sa=1+sa-fa(qa,ra);ta=(oa%86400000+86400000)%86400000;ua=da(ta/3600000)%24;va=da(ta/60000)%60;wa=da(ta/1000)%60;xa=ta%1000;}else{qa=oa.getUTCFullYear();ra=oa.getUTCMonth();sa=oa.getUTCDate();ua=oa.getUTCHours();va=oa.getUTCMinutes();wa=oa.getUTCSeconds();xa=oa.getUTCMilliseconds();}oa=(qa<=0||qa>=10000?(qa<0?"-":"+")+p(6,qa<0?-qa:qa):p(4,qa))+"-"+p(2,ra+1)+"-"+p(2,sa)+"T"+p(2,ua)+":"+p(2,va)+":"+p(2,wa)+"."+p(3,xa)+"Z";}else oa=null;}else if(typeof oa.toJSON=="function"&&((pa!="[object Number]"&&pa!="[object String]"&&pa!="[object Array]")||i.call(oa,"toJSON")))oa=oa.toJSON(ha);}if(ja)oa=ja.call(ia,ha,oa);if(oa===null)return "null";pa=h.call(oa);if(pa=="[object Boolean]"){return ""+oa;}else if(pa=="[object Number]"){return oa>-1/0&&oa<1/0?""+oa:"null";}else if(pa=="[object String]")return q(oa);if(typeof oa=="object"){for(bb=na.length;bb--;)if(na[bb]===oa)throw TypeError();na.push(oa);ya=[];cb=ma;ma+=la;if(pa=="[object Array]"){for(ab=0,bb=oa.length;ab<bb;db||(db=true),ab++){za=r(ab,oa,ja,ka,la,ma,na);ya.push(za===k?"null":za);}return db?(la?"[\n"+ma+ya.join(",\n"+ma)+"\n"+cb+"]":("["+ya.join(",")+"]")):"[]";}else{j(ka||oa,function(eb){var fb=r(eb,oa,ja,ka,la,ma,na);if(fb!==k)ya.push(q(eb)+":"+(la?" ":"")+fb);db||(db=true);});return db?(la?"{\n"+ma+ya.join(",\n"+ma)+"\n"+cb+"}":("{"+ya.join(",")+"}")):"{}";}na.pop();}};l.stringify=function(ha,ia,ja){var ka,la,ma,na,oa,pa;if(typeof ia=="function"||typeof ia=="object"&&ia)if(h.call(ia)=="[object Function]"){la=ia;}else if(h.call(ia)=="[object Array]"){ma={};for(na=0,oa=ia.length;na<oa;pa=ia[na++],((h.call(pa)=="[object String]"||h.call(pa)=="[object Number]")&&(ma[pa]=1)));}if(ja)if(h.call(ja)=="[object Number]"){if((ja-=ja%1)>0)for(ka="",ja>10&&(ja=10);ka.length<ja;ka+=" ");}else if(h.call(ja)=="[object String]")ka=ja.length<=10?ja:ja.slice(0,10);return r("",(pa={},pa[""]=ha,pa),la,ma,ka,"",[]);};}if(!s){t=String.fromCharCode;u={"\\":"\\",'"':'"',"/":"/",b:"\b",t:"\t",n:"\n",f:"\f",r:"\r"};v=function(){aa=ba=null;throw SyntaxError();};w=function(){var ha=ba,ia=ha.length,ja,ka,la,ma,na;while(aa<ia){ja=ha.charAt(aa);if("\t\r\n ".indexOf(ja)>-1){aa++;}else if("{}[]:,".indexOf(ja)>-1){aa++;return ja;}else if(ja=='"'){for(ka="@",aa++;aa<ia;){ja=ha.charAt(aa);if(ja<" "){v();}else if(ja=="\\"){ja=ha.charAt(++aa);if('\\"/btnfr'.indexOf(ja)>-1){ka+=u[ja];aa++;}else if(ja=="u"){la=++aa;for(ma=aa+4;aa<ma;aa++){ja=ha.charAt(aa);if(!(ja>="0"&&ja<="9"||ja>="a"&&ja<="f"||ja>="A"&&ja<="F"))v();}ka+=t("0x"+ha.slice(la,aa));}else v();}else{if(ja=='"')break;ka+=ja;aa++;}}if(ha.charAt(aa)=='"'){aa++;return ka;}v();}else{la=aa;if(ja=="-"){na=true;ja=ha.charAt(++aa);}if(ja>="0"&&ja<="9"){if(ja=="0"&&(ja=ha.charAt(aa+1),ja>="0"&&ja<="9"))v();na=false;for(;aa<ia&&(ja=ha.charAt(aa),ja>="0"&&ja<="9");aa++);if(ha.charAt(aa)=="."){ma=++aa;for(;ma<ia&&(ja=ha.charAt(ma),ja>="0"&&ja<="9");ma++);if(ma==aa)v();aa=ma;}ja=ha.charAt(aa);if(ja=="e"||ja=="E"){ja=ha.charAt(++aa);if(ja=="+"||ja=="-")aa++;for(ma=aa;ma<ia&&(ja=ha.charAt(ma),ja>="0"&&ja<="9");ma++);if(ma==aa)v();aa=ma;}return +ha.slice(la,aa);}if(na)v();if(ha.slice(aa,aa+4)=="true"){aa+=4;return true;}else if(ha.slice(aa,aa+5)=="false"){aa+=5;return false;}else if(ha.slice(aa,aa+4)=="null"){aa+=4;return null;}v();}}return "$";};x=function(ha){var ia,ja,ka;if(ha=="$")v();if(typeof ha=="string"){if(ha.charAt(0)=="@")return ha.slice(1);if(ha=="["){ia=[];for(;;ja||(ja=true)){ha=w();if(ha=="]")break;if(ja)if(ha==","){ha=w();if(ha=="]")v();}else v();if(ha==",")v();ia.push(x(ha));}return ia;}else if(ha=="{"){ia={};for(;;ja||(ja=true)){ha=w();if(ha=="}")break;if(ja)if(ha==","){ha=w();if(ha=="}")v();}else v();if(ha==","||typeof ha!="string"||ha.charAt(0)!="@"||w()!=":")v();ia[ha.slice(1)]=x(w());}return ia;}v();}return ha;};z=function(ha,ia,ja){var ka=y(ha,ia,ja);if(ka===k){delete ha[ia];}else ha[ia]=ka;};y=function(ha,ia,ja){var ka=ha[ia],la;if(typeof ka=="object"&&ka)if(h.call(ka)=="[object Array]"){for(la=ka.length;la--;)z(ka,la,ja);}else j(ka,function(ma){z(ka,ma,ja);});return ja.call(ha,ia,ka);};l.parse=function(ha,ia){aa=0;ba=ha;var ja=x(w());if(w()!="$")v();aa=ba=null;return ia&&h.call(ia)=="[object Function]"?y((ca={},ca[""]=ja,ca),"",ia):ja;};}}}).call(this);},null);
__d('ES',['ES5ArrayPrototype','ES5FunctionPrototype','ES5StringPrototype','ES5Array','ES5Object','ES5Date','JSON3','ES6Array','ES6Object','ES6ArrayPrototype','ES6DatePrototype','ES6Number','ES7StringPrototype','ES7Object'],function a(b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u){if(c.__markCompiled)c.__markCompiled();var v={}.toString,w={'JSON.stringify':n.stringify,'JSON.parse':n.parse},x={'Array.prototype':h,'Function.prototype':i,'String.prototype':j,Object:l,Array:k,Date:m},y={Object:p,'Array.prototype':q,'Date.prototype':r,Number:s,Array:o},z={Object:u,'String.prototype':t};function aa(ca){for(var da in ca){if(!ca.hasOwnProperty(da))continue;var ea=ca[da],fa=da.split('.'),ga=fa.length==2?window[fa[0]][fa[1]]:window[da];for(var ha in ea){if(!ea.hasOwnProperty(ha))continue;if(typeof ea[ha]!=='function'){w[da+'.'+ha]=ea[ha];continue;}var ia=ga[ha];w[da+'.'+ha]=ia&&/\{\s+\[native code\]\s\}/.test(ia)?ia:ea[ha];}}}aa(x);aa(y);aa(z);function ba(ca,da,ea){var fa=ea?v.call(ca).slice(8,-1)+'.prototype':ca,ga=w[fa+'.'+da]||ca[da];if(typeof ga==='function'){for(var ha=arguments.length,ia=Array(ha>3?ha-3:0),ja=3;ja<ha;ja++)ia[ja-3]=arguments[ja];return ga.apply(ca,ia);}else if(ga)return ga;throw new Error('Polyfill '+fa+' does not have implementation of '+da);}f.exports=ba;},null);
__d('sdk.babelHelpers',['ES5FunctionPrototype','ES5Object','ES6Object'],function a(b,c,d,e,f,g,h,i,j){if(c.__markCompiled)c.__markCompiled();var k={},l=Object.prototype.hasOwnProperty;k.inherits=function(m,n){j.assign(m,n);m.prototype=i.create(n&&n.prototype);m.prototype.constructor=m;m.__superConstructor__=n;return n;};k._extends=j.assign;k['extends']=k._extends;k.objectWithoutProperties=function(m,n){var o={};for(var p in m){if(!l.call(m,p)||n.indexOf(p)>=0)continue;o[p]=m[p];}return o;};k.taggedTemplateLiteralLoose=function(m,n){m.raw=n;return m;};k.bind=h.bind;f.exports=k;},null);      var ES = require('ES');      var babelHelpers = require('sdk.babelHelpers');      __d("UrlMapConfig",[],{"www":"www.facebook.com","m":"m.facebook.com","connect":"connect.facebook.net","business":"business.facebook.com","api_https":"api.facebook.com","api_read_https":"api-read.facebook.com","graph_https":"graph.facebook.com","fbcdn_http":"fbstatic-a.akamaihd.net","fbcdn_https":"fbstatic-a.akamaihd.net","cdn_http":"staticxx.facebook.com","cdn_https":"staticxx.facebook.com"});__d("JSSDKRuntimeConfig",[],{"locale":"en_US","rtl":false,"revision":"2239045"});__d("JSSDKConfig",[],{"bustCache":true,"tagCountLogRate":0.01,"errorHandling":{"rate":4},"usePluginPipe":true,"features":{"dialog_resize_refactor":true,"one_comment_controller":true,"allow_non_canvas_app_events":false,"event_subscriptions_log":{"rate":0.01,"value":10000},"should_force_single_dialog_instance":true,"js_sdk_force_status_on_load":true,"kill_fragment":true,"xfbml_profile_pic_server":true,"error_handling":{"rate":4},"e2e_ping_tracking":{"rate":1.0e-6},"getloginstatus_tracking":{"rate":0.001},"xd_timeout":{"rate":4,"value":30000},"use_bundle":false,"launch_payment_dialog_via_pac":{"rate":100},"plugin_tags_blacklist":["recommendations_bar","registration","activity","recommendations","facepile"],"should_log_response_error":true},"api":{"mode":"warn","whitelist":["AppEvents","AppEvents.EventNames","AppEvents.ParameterNames","AppEvents.activateApp","AppEvents.logEvent","AppEvents.logPurchase","Canvas","Canvas.Prefetcher","Canvas.Prefetcher.addStaticResource","Canvas.Prefetcher.setCollectionMode","Canvas.getPageInfo","Canvas.hideFlashElement","Canvas.scrollTo","Canvas.setAutoGrow","Canvas.setDoneLoading","Canvas.setSize","Canvas.setUrlHandler","Canvas.showFlashElement","Canvas.startTimer","Canvas.stopTimer","Event","Event.subscribe","Event.unsubscribe","Music.flashCallback","Music.init","Music.send","Payment","Payment.cancelFlow","Payment.continueFlow","Payment.init","Payment.lockForProcessing","Payment.parse","Payment.setSize","Payment.unlockForProcessing","ThirdPartyProvider","ThirdPartyProvider.init","ThirdPartyProvider.sendData","UA","UA.nativeApp","XFBML","XFBML.RecommendationsBar","XFBML.RecommendationsBar.markRead","XFBML.parse","addFriend","api","getAccessToken","getAuthResponse","getLoginStatus","getUserID","init","login","logout","publish","share","ui"]},"initSitevars":{"enableMobileComments":1,"iframePermissions":{"read_stream":false,"manage_mailbox":false,"manage_friendlists":false,"read_mailbox":false,"publish_checkins":true,"status_update":true,"photo_upload":true,"video_upload":true,"sms":false,"create_event":true,"rsvp_event":true,"offline_access":true,"email":true,"xmpp_login":false,"create_note":true,"share_item":true,"export_stream":false,"publish_stream":true,"publish_likes":true,"ads_management":false,"contact_email":true,"access_private_data":false,"read_insights":false,"read_requests":false,"read_friendlists":true,"manage_pages":false,"physical_login":false,"manage_groups":false,"read_deals":false}}});__d("JSSDKXDConfig",[],{"XdUrl":"\/connect\/xd_arbiter.php?version=42","XdBundleUrl":"\/connect\/xd_arbiter\/r\/0BGYRe_rlT9.js?version=42","Flash":{"path":"https:\/\/connect.facebook.net\/rsrc.php\/v1\/yW\/r\/yOZN1vHw3Z_.swf"},"useCdn":true});__d("JSSDKCssConfig",[],{"rules":".fb_hidden{position:absolute;top:-10000px;z-index:10001}.fb_reposition{overflow:hidden;position:relative}.fb_invisible{display:none}.fb_reset{background:none;border:0;border-spacing:0;color:#000;cursor:auto;direction:ltr;font-family:\"lucida grande\", tahoma, verdana, arial, sans-serif;font-size:11px;font-style:normal;font-variant:normal;font-weight:normal;letter-spacing:normal;line-height:1;margin:0;overflow:visible;padding:0;text-align:left;text-decoration:none;text-indent:0;text-shadow:none;text-transform:none;visibility:visible;white-space:normal;word-spacing:normal}.fb_reset>div{overflow:hidden}.fb_link img{border:none}\u0040keyframes fb_transform{from{opacity:0;transform:scale(.95)}to{opacity:1;transform:scale(1)}}.fb_animate{animation:fb_transform .3s forwards}\n.fb_dialog{background:rgba(82, 82, 82, .7);position:absolute;top:-10000px;z-index:10001}.fb_reset .fb_dialog_legacy{overflow:visible}.fb_dialog_advanced{padding:10px;-moz-border-radius:8px;-webkit-border-radius:8px;border-radius:8px}.fb_dialog_content{background:#fff;color:#333}.fb_dialog_close_icon{background:url(https:\/\/fbstatic-a.akamaihd.net\/rsrc.php\/v2\/yq\/r\/IE9JII6Z1Ys.png) no-repeat scroll 0 0 transparent;_background-image:url(https:\/\/fbstatic-a.akamaihd.net\/rsrc.php\/v2\/yL\/r\/s816eWC-2sl.gif);cursor:pointer;display:block;height:15px;position:absolute;right:18px;top:17px;width:15px}.fb_dialog_mobile .fb_dialog_close_icon{top:5px;left:5px;right:auto}.fb_dialog_padding{background-color:transparent;position:absolute;width:1px;z-index:-1}.fb_dialog_close_icon:hover{background:url(https:\/\/fbstatic-a.akamaihd.net\/rsrc.php\/v2\/yq\/r\/IE9JII6Z1Ys.png) no-repeat scroll 0 -15px transparent;_background-image:url(https:\/\/fbstatic-a.akamaihd.net\/rsrc.php\/v2\/yL\/r\/s816eWC-2sl.gif)}.fb_dialog_close_icon:active{background:url(https:\/\/fbstatic-a.akamaihd.net\/rsrc.php\/v2\/yq\/r\/IE9JII6Z1Ys.png) no-repeat scroll 0 -30px transparent;_background-image:url(https:\/\/fbstatic-a.akamaihd.net\/rsrc.php\/v2\/yL\/r\/s816eWC-2sl.gif)}.fb_dialog_loader{background-color:#f6f7f8;border:1px solid #606060;font-size:24px;padding:20px}.fb_dialog_top_left,.fb_dialog_top_right,.fb_dialog_bottom_left,.fb_dialog_bottom_right{height:10px;width:10px;overflow:hidden;position:absolute}.fb_dialog_top_left{background:url(https:\/\/fbstatic-a.akamaihd.net\/rsrc.php\/v2\/ye\/r\/8YeTNIlTZjm.png) no-repeat 0 0;left:-10px;top:-10px}.fb_dialog_top_right{background:url(https:\/\/fbstatic-a.akamaihd.net\/rsrc.php\/v2\/ye\/r\/8YeTNIlTZjm.png) no-repeat 0 -10px;right:-10px;top:-10px}.fb_dialog_bottom_left{background:url(https:\/\/fbstatic-a.akamaihd.net\/rsrc.php\/v2\/ye\/r\/8YeTNIlTZjm.png) no-repeat 0 -20px;bottom:-10px;left:-10px}.fb_dialog_bottom_right{background:url(https:\/\/fbstatic-a.akamaihd.net\/rsrc.php\/v2\/ye\/r\/8YeTNIlTZjm.png) no-repeat 0 -30px;right:-10px;bottom:-10px}.fb_dialog_vert_left,.fb_dialog_vert_right,.fb_dialog_horiz_top,.fb_dialog_horiz_bottom{position:absolute;background:#525252;filter:alpha(opacity=70);opacity:.7}.fb_dialog_vert_left,.fb_dialog_vert_right{width:10px;height:100\u0025}.fb_dialog_vert_left{margin-left:-10px}.fb_dialog_vert_right{right:0;margin-right:-10px}.fb_dialog_horiz_top,.fb_dialog_horiz_bottom{width:100\u0025;height:10px}.fb_dialog_horiz_top{margin-top:-10px}.fb_dialog_horiz_bottom{bottom:0;margin-bottom:-10px}.fb_dialog_iframe{line-height:0}.fb_dialog_content .dialog_title{background:#6d84b4;border:1px solid #3a5795;color:#fff;font-size:14px;font-weight:bold;margin:0}.fb_dialog_content .dialog_title>span{background:url(https:\/\/fbstatic-a.akamaihd.net\/rsrc.php\/v2\/yd\/r\/Cou7n-nqK52.gif) no-repeat 5px 50\u0025;float:left;padding:5px 0 7px 26px}body.fb_hidden{-webkit-transform:none;height:100\u0025;margin:0;overflow:visible;position:absolute;top:-10000px;left:0;width:100\u0025}.fb_dialog.fb_dialog_mobile.loading{background:url(https:\/\/fbstatic-a.akamaihd.net\/rsrc.php\/v2\/ya\/r\/3rhSv5V8j3o.gif) white no-repeat 50\u0025 50\u0025;min-height:100\u0025;min-width:100\u0025;overflow:hidden;position:absolute;top:0;z-index:10001}.fb_dialog.fb_dialog_mobile.loading.centered{width:auto;height:auto;min-height:initial;min-width:initial;background:none}.fb_dialog.fb_dialog_mobile.loading.centered #fb_dialog_loader_spinner{width:100\u0025}.fb_dialog.fb_dialog_mobile.loading.centered .fb_dialog_content{background:none}.loading.centered #fb_dialog_loader_close{color:#fff;display:block;padding-top:20px;clear:both;font-size:18px}#fb-root #fb_dialog_ipad_overlay{background:rgba(0, 0, 0, .45);position:absolute;bottom:0;left:0;right:0;top:0;width:100\u0025;min-height:100\u0025;z-index:10000}#fb-root #fb_dialog_ipad_overlay.hidden{display:none}.fb_dialog.fb_dialog_mobile.loading iframe{visibility:hidden}.fb_dialog_content .dialog_header{-webkit-box-shadow:white 0 1px 1px -1px inset;background:-webkit-gradient(linear, 0\u0025 0\u0025, 0\u0025 100\u0025, from(#738ABA), to(#2C4987));border-bottom:1px solid;border-color:#1d4088;color:#fff;font:14px Helvetica, sans-serif;font-weight:bold;text-overflow:ellipsis;text-shadow:rgba(0, 30, 84, .296875) 0 -1px 0;vertical-align:middle;white-space:nowrap}.fb_dialog_content .dialog_header table{-webkit-font-smoothing:subpixel-antialiased;height:43px;width:100\u0025}.fb_dialog_content .dialog_header td.header_left{font-size:12px;padding-left:5px;vertical-align:middle;width:60px}.fb_dialog_content .dialog_header td.header_right{font-size:12px;padding-right:5px;vertical-align:middle;width:60px}.fb_dialog_content .touchable_button{background:-webkit-gradient(linear, 0\u0025 0\u0025, 0\u0025 100\u0025, from(#4966A6), color-stop(.5, #355492), to(#2A4887));border:1px solid #2f477a;-webkit-background-clip:padding-box;-webkit-border-radius:3px;-webkit-box-shadow:rgba(0, 0, 0, .117188) 0 1px 1px inset, rgba(255, 255, 255, .167969) 0 1px 0;display:inline-block;margin-top:3px;max-width:85px;line-height:18px;padding:4px 12px;position:relative}.fb_dialog_content .dialog_header .touchable_button input{border:none;background:none;color:#fff;font:12px Helvetica, sans-serif;font-weight:bold;margin:2px -12px;padding:2px 6px 3px 6px;text-shadow:rgba(0, 30, 84, .296875) 0 -1px 0}.fb_dialog_content .dialog_header .header_center{color:#fff;font-size:16px;font-weight:bold;line-height:18px;text-align:center;vertical-align:middle}.fb_dialog_content .dialog_content{background:url(https:\/\/fbstatic-a.akamaihd.net\/rsrc.php\/v2\/y9\/r\/jKEcVPZFk-2.gif) no-repeat 50\u0025 50\u0025;border:1px solid #555;border-bottom:0;border-top:0;height:150px}.fb_dialog_content .dialog_footer{background:#f6f7f8;border:1px solid #555;border-top-color:#ccc;height:40px}#fb_dialog_loader_close{float:left}.fb_dialog.fb_dialog_mobile .fb_dialog_close_button{text-shadow:rgba(0, 30, 84, .296875) 0 -1px 0}.fb_dialog.fb_dialog_mobile .fb_dialog_close_icon{visibility:hidden}#fb_dialog_loader_spinner{animation:rotateSpinner 1.2s linear infinite;background-color:transparent;background-image:url(https:\/\/fbstatic-a.akamaihd.net\/rsrc.php\/v2\/yD\/r\/t-wz8gw1xG1.png);background-repeat:no-repeat;background-position:50\u0025 50\u0025;height:24px;width:24px}\u0040keyframes rotateSpinner{0\u0025{transform:rotate(0deg)}100\u0025{transform:rotate(360deg)}}\n.fb_iframe_widget{display:inline-block;position:relative}.fb_iframe_widget span{display:inline-block;position:relative;text-align:justify}.fb_iframe_widget iframe{position:absolute}.fb_iframe_widget_fluid_desktop,.fb_iframe_widget_fluid_desktop span,.fb_iframe_widget_fluid_desktop iframe{max-width:100\u0025}.fb_iframe_widget_fluid_desktop iframe{min-width:220px;position:relative}.fb_iframe_widget_lift{z-index:1}.fb_hide_iframes iframe{position:relative;left:-10000px}.fb_iframe_widget_loader{position:relative;display:inline-block}.fb_iframe_widget_fluid{display:inline}.fb_iframe_widget_fluid span{width:100\u0025}.fb_iframe_widget_loader iframe{min-height:32px;z-index:2;zoom:1}.fb_iframe_widget_loader .FB_Loader{background:url(https:\/\/fbstatic-a.akamaihd.net\/rsrc.php\/v2\/y9\/r\/jKEcVPZFk-2.gif) no-repeat;height:32px;width:32px;margin-left:-16px;position:absolute;left:50\u0025;z-index:4}","components":["css:fb.css.base","css:fb.css.dialog","css:fb.css.iframewidget"]});__d("ApiClientConfig",[],{"FlashRequest":{"swfUrl":"https:\/\/connect.facebook.net\/rsrc.php\/v1\/yd\/r\/mxzow1Sdmxr.swf"}});__d("JSSDKCanvasPrefetcherConfig",[],{"blacklist":[144959615576466],"sampleRate":500});__d("JSSDKPluginPipeConfig",[],{"threshold":0,"enabledApps":{"209753825810663":1,"187288694643718":1}});      __d("DOMWrapper",[],function a(b,c,d,e,f,g){if(c.__markCompiled)c.__markCompiled();var h,i,j={setRoot:function(k){h=k;},getRoot:function(){return h||document.body;},setWindow:function(k){i=k;},getWindow:function(){return i||self;}};f.exports=j;},null);
__d('dotAccess',[],function a(b,c,d,e,f,g){if(c.__markCompiled)c.__markCompiled();function h(i,j,k){var l=j.split('.');do{var m=l.shift();i=i[m]||k&&(i[m]={});}while(l.length&&i);return i;}f.exports=h;},null);
__d('guid',[],function a(b,c,d,e,f,g){if(c.__markCompiled)c.__markCompiled();function h(){return 'f'+(Math.random()*(1<<30)).toString(16).replace('.','');}f.exports=h;},null);
__d('wrapFunction',[],function a(b,c,d,e,f,g){if(c.__markCompiled)c.__markCompiled();var h={};function i(j,k,l){k=k||'default';return function(){var m=k in h?h[k](j,l):j;return m.apply(this,arguments);};}i.setWrapper=function(j,k){k=k||'default';h[k]=j;};f.exports=i;},null);
__d('GlobalCallback',['DOMWrapper','dotAccess','guid','wrapFunction'],function a(b,c,d,e,f,g,h,i,j,k){if(c.__markCompiled)c.__markCompiled();var l,m,n={setPrefix:function(o){l=i(h.getWindow(),o,true);m=o;},create:function(o,p){if(!l)this.setPrefix('__globalCallbacks');var q=j();l[q]=k(o,'entry',p||'GlobalCallback');return m+'.'+q;},remove:function(o){var p=o.substring(m.length+1);delete l[p];}};f.exports=n;},null);
__d("sprintf",[],function a(b,c,d,e,f,g){if(c.__markCompiled)c.__markCompiled();function h(i){for(var j=arguments.length,k=Array(j>1?j-1:0),l=1;l<j;l++)k[l-1]=arguments[l];var m=0;return i.replace(/%s/g,function(n){return k[m++];});}f.exports=h;},null);
__d('Log',['sprintf'],function a(b,c,d,e,f,g,h){if(c.__markCompiled)c.__markCompiled();var i={DEBUG:3,INFO:2,WARNING:1,ERROR:0};function j(l,m){var n=Array.prototype.slice.call(arguments,2),o=h.apply(null,n),p=window.console;if(p&&k.level>=m)p[l in p?l:'log'](o);}var k={level:-1,Level:i,debug:ES(j,'bind',true,null,'debug',i.DEBUG),info:ES(j,'bind',true,null,'info',i.INFO),warn:ES(j,'bind',true,null,'warn',i.WARNING),error:ES(j,'bind',true,null,'error',i.ERROR)};f.exports=k;},null);
__d("ObservableMixin",[],function a(b,c,d,e,f,g){if(c.__markCompiled)c.__markCompiled();function h(){this.__observableEvents={};}h.prototype={inform:function(i){var j=Array.prototype.slice.call(arguments,1),k=Array.prototype.slice.call(this.getSubscribers(i));for(var l=0;l<k.length;l++){if(k[l]===null)continue;try{k[l].apply(this,j);}catch(m){setTimeout(function(){throw m;},0);}}return this;},getSubscribers:function(i){return this.__observableEvents[i]||(this.__observableEvents[i]=[]);},clearSubscribers:function(i){if(i)this.__observableEvents[i]=[];return this;},clearAllSubscribers:function(){this.__observableEvents={};return this;},subscribe:function(i,j){var k=this.getSubscribers(i);k.push(j);return this;},unsubscribe:function(i,j){var k=this.getSubscribers(i);for(var l=0;l<k.length;l++)if(k[l]===j){k.splice(l,1);break;}return this;},monitor:function(i,j){if(!j()){var k=ES(function(l){if(j.apply(j,arguments))this.unsubscribe(i,k);},"bind",true,this);this.subscribe(i,k);}return this;}};f.exports=h;},null);
__d('UrlMap',['UrlMapConfig'],function a(b,c,d,e,f,g,h){if(c.__markCompiled)c.__markCompiled();var i={resolve:function(j,k){var l=typeof k=='undefined'?location.protocol.replace(':',''):k?'https':'http';if(j in h)return l+'://'+h[j];if(typeof k=='undefined'&&j+'_'+l in h)return l+'://'+h[j+'_'+l];if(k!==true&&j+'_http' in h)return 'http://'+h[j+'_http'];if(k!==false&&j+'_https' in h)return 'https://'+h[j+'_https'];}};f.exports=i;},null);
__d('QueryString',[],function a(b,c,d,e,f,g){if(c.__markCompiled)c.__markCompiled();function h(l){var m=[];ES(ES('Object','keys',false,l).sort(),'forEach',true,function(n){var o=l[n];if(typeof o==='undefined')return;if(o===null){m.push(n);return;}m.push(encodeURIComponent(n)+'='+encodeURIComponent(o));});return m.join('&');}function i(l,m){var n={};if(l==='')return n;var o=l.split('&');for(var p=0;p<o.length;p++){var q=o[p].split('=',2),r=decodeURIComponent(q[0]);if(m&&n.hasOwnProperty(r))throw new URIError('Duplicate key: '+r);n[r]=q.length===2?decodeURIComponent(q[1]):null;}return n;}function j(l,m){return l+(ES(l,'indexOf',true,'?')!==-1?'&':'?')+(typeof m==='string'?m:k.encode(m));}var k={encode:h,decode:i,appendToUrl:j};f.exports=k;},null);
__d("ManagedError",[],function a(b,c,d,e,f,g){if(c.__markCompiled)c.__markCompiled();function h(i,j){Error.prototype.constructor.call(this,i);this.message=i;this.innerError=j;}h.prototype=new Error();h.prototype.constructor=h;f.exports=h;},null);
__d('AssertionError',['ManagedError'],function a(b,c,d,e,f,g,h){if(c.__markCompiled)c.__markCompiled();function i(j){h.prototype.constructor.apply(this,arguments);}i.prototype=new h();i.prototype.constructor=i;f.exports=i;},null);
__d('Assert',['AssertionError','sprintf'],function a(b,c,d,e,f,g,h,i){if(c.__markCompiled)c.__markCompiled();function j(o,p){if(typeof o!=='boolean'||!o)throw new h(p);return o;}function k(o,p,q){var r;if(p===undefined){r='undefined';}else if(p===null){r='null';}else{var s=Object.prototype.toString.call(p);r=/\s(\w*)/.exec(s)[1].toLowerCase();}j(ES(o,'indexOf',true,r)!==-1,q||i('Expression is of type %s, not %s',r,o));return p;}function l(o,p,q){j(p instanceof o,q||'Expression not instance of type');return p;}function m(o,p){n['is'+o]=p;n['maybe'+o]=function(q,r){if(q!=null)p(q,r);};}var n={isInstanceOf:l,isTrue:j,isTruthy:function(o,p){return j(!!o,p);},type:k,define:function(o,p){o=o.substring(0,1).toUpperCase()+o.substring(1).toLowerCase();m(o,function(q,r){j(p(q),r);});}};ES(['Array','Boolean','Date','Function','Null','Number','Object','Regexp','String','Undefined'],'forEach',true,function(o){m(o,ES(k,'bind',true,null,o.toLowerCase()));});f.exports=n;},null);
__d('Type',['Assert'],function a(b,c,d,e,f,g,h){if(c.__markCompiled)c.__markCompiled();function i(){var m=this.__mixins;if(m)for(var n=0;n<m.length;n++)m[n].apply(this,arguments);}function j(m,n){if(n instanceof m)return true;if(n instanceof i)for(var o=0;o<n.__mixins.length;o++)if(n.__mixins[o]==m)return true;return false;}function k(m,n){var o=m.prototype;if(!ES('Array','isArray',false,n))n=[n];for(var p=0;p<n.length;p++){var q=n[p];if(typeof q=='function'){o.__mixins.push(q);q=q.prototype;}ES(ES('Object','keys',false,q),'forEach',true,function(r){o[r]=q[r];});}}function l(m,n,o){var p=n&&n.hasOwnProperty('constructor')?n.constructor:function(){this.parent.apply(this,arguments);};h.isFunction(p);if(m&&m.prototype instanceof i===false)throw new Error('parent type does not inherit from Type');m=m||i;function q(){}q.prototype=m.prototype;p.prototype=new q();if(n)ES('Object','assign',false,p.prototype,n);p.prototype.constructor=p;p.parent=m;p.prototype.__mixins=m.prototype.__mixins?Array.prototype.slice.call(m.prototype.__mixins):[];if(o)k(p,o);p.prototype.parent=function(){this.parent=m.prototype.parent;m.apply(this,arguments);};p.prototype.parentCall=function(r){return m.prototype[r].apply(this,Array.prototype.slice.call(arguments,1));};p.extend=function(r,s){return l(this,r,s);};return p;}ES('Object','assign',false,i.prototype,{instanceOf:function(m){return j(m,this);}});ES('Object','assign',false,i,{extend:function(m,n){return typeof m==='function'?l.apply(null,arguments):l(null,m,n);},instanceOf:j});f.exports=i;},null);
__d('sdk.Model',['Type','ObservableMixin'],function a(b,c,d,e,f,g,h,i){if(c.__markCompiled)c.__markCompiled();var j=h.extend({constructor:function(k){this.parent();var l={},m=this;ES(ES('Object','keys',false,k),'forEach',true,function(n){l[n]=k[n];m['set'+n]=function(o){if(o===l[n])return this;l[n]=o;m.inform(n+'.change',o);return m;};m['get'+n]=function(){return l[n];};});}},i);f.exports=j;},null);
__d('sdk.Runtime',['sdk.Model','JSSDKRuntimeConfig'],function a(b,c,d,e,f,g,h,i){if(c.__markCompiled)c.__markCompiled();var j={UNKNOWN:0,PAGETAB:1,CANVAS:2,PLATFORM:4},k=new h({AccessToken:'',ClientID:'',CookieUserID:'',Environment:j.UNKNOWN,Initialized:false,IsVersioned:false,KidDirectedSite:undefined,Locale:i.locale,LoggedIntoFacebook:undefined,LoginStatus:undefined,Revision:i.revision,Rtl:i.rtl,Scope:undefined,Secure:undefined,UseCookie:false,UserID:'',Version:undefined});ES('Object','assign',false,k,{ENVIRONMENTS:j,isEnvironment:function(l){var m=this.getEnvironment();return (l|m)===m;},isCanvasEnvironment:function(){return this.isEnvironment(j.CANVAS)||this.isEnvironment(j.PAGETAB);}});(function(){var l=/app_runner/.test(window.name)?j.PAGETAB:/iframe_canvas/.test(window.name)?j.CANVAS:j.UNKNOWN;if((l|j.PAGETAB)===l)l=l|j.CANVAS;k.setEnvironment(l);})();f.exports=k;},null);
__d('sdk.Cookie',['QueryString','sdk.Runtime'],function a(b,c,d,e,f,g,h,i){if(c.__markCompiled)c.__markCompiled();var j=null;function k(n,o,p){n=n+i.getClientID();var q=j&&j!=='.';if(q){document.cookie=n+'=; expires=Wed, 04 Feb 2004 08:00:00 GMT;';document.cookie=n+'=; expires=Wed, 04 Feb 2004 08:00:00 GMT;'+'domain='+location.hostname+';';}var r=new Date(p).toGMTString();document.cookie=n+'='+o+(o&&p===0?'':'; expires='+r)+'; path=/'+(q?'; domain='+j:'');}function l(n){n=n+i.getClientID();var o=new RegExp('\\b'+n+'=([^;]*)\\b');return o.test(document.cookie)?RegExp.$1:null;}var m={setDomain:function(n){j=n;var o=h.encode({base_domain:j&&j!=='.'?j:''}),p=new Date();p.setFullYear(p.getFullYear()+1);k('fbm_',o,p.getTime());},getDomain:function(){return j;},loadMeta:function(){var n=l('fbm_');if(n){var o=h.decode(n);if(!j)j=o.base_domain;return o;}},loadSignedRequest:function(){return l('fbsr_');},setSignedRequestCookie:function(n,o){if(!n)throw new Error('Value passed to Cookie.setSignedRequestCookie '+'was empty.');k('fbsr_',n,o);},clearSignedRequestCookie:function(){k('fbsr_','',0);},setRaw:k,getRaw:l};f.exports=m;},null);
__d('Miny',[],function a(b,c,d,e,f,g){if(c.__markCompiled)c.__markCompiled();var h='Miny1',i='wxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-_'.split(''),j={encode:function(k){if(/^$|[~\\]|__proto__/.test(k))return k;var l=k.match(/\w+|\W+/g),m,n=ES('Object','create',false,null);for(m=0;m<l.length;m++)n[l[m]]=(n[l[m]]||0)+1;var o=ES('Object','keys',false,n);o.sort(function(r,s){return n[s]-n[r];});for(m=0;m<o.length;m++){var p=(m-m%32)/32;n[o[m]]=p?p.toString(32)+i[m%32]:i[m%32];}var q='';for(m=0;m<l.length;m++)q+=n[l[m]];o.unshift(h,o.length);o.push(q);return o.join('~');}};f.exports=j;},null);
__d('sdk.UA',[],function a(b,c,d,e,f,g){if(c.__markCompiled)c.__markCompiled();var h=navigator.userAgent,i={iphone:/\b(iPhone|iP[ao]d)/.test(h),ipad:/\b(iP[ao]d)/.test(h),android:/Android/i.test(h),nativeApp:/FBAN\/\w+;/i.test(h)},j=/Mobile/i.test(h),k={ie:'',firefox:'',chrome:'',webkit:'',osx:''},l=/(?:MSIE.(\d+\.\d+))|(?:(?:Firefox|GranParadiso|Iceweasel).(\d+\.\d+))|(?:AppleWebKit.(\d+(?:\.\d+)?))|(?:Trident\/\d+\.\d+.*rv:(\d+\.\d+))/.exec(h);if(l){k.ie=l[1]?parseFloat(l[1]):l[4]?parseFloat(l[4]):'';k.firefox=l[2]||'';k.webkit=l[3]||'';if(l[3]){var m=/(?:Chrome\/(\d+\.\d+))/.exec(h);k.chrome=m?m[1]:'';}}var n=/(?:Mac OS X (\d+(?:[._]\d+)?))/.exec(h);if(n)k.osx=n[1];function o(q){return ES(q.split('.'),'map',true,function(r){return parseFloat(r);});}var p={};ES(ES('Object','keys',false,k),'map',true,function(q){p[q]=function(){return parseFloat(k[q]);};p[q].getVersionParts=function(){return o(k[q]);};});ES(ES('Object','keys',false,i),'map',true,function(q){p[q]=function(){return i[q];};});p.mobile=function(){return i.iphone||i.ipad||i.android||j;};f.exports=p;},null);
__d('getBlankIframeSrc',['sdk.UA'],function a(b,c,d,e,f,g,h){if(c.__markCompiled)c.__markCompiled();function i(){return h.ie()<10?'javascript:false':'about:blank';}f.exports=i;},null);
__d('insertIframe',['GlobalCallback','getBlankIframeSrc','guid'],function a(b,c,d,e,f,g,h,i,j){if(c.__markCompiled)c.__markCompiled();function k(l){l.id=l.id||j();l.name=l.name||j();var m=false,n=false,o=function(){if(m&&!n){n=true;l.onload&&l.onload(l.root.firstChild);}},p=h.create(o);if(document.attachEvent){var q='<iframe'+' id="'+l.id+'"'+' name="'+l.name+'"'+(l.title?' title="'+l.title+'"':'')+(l.className?' class="'+l.className+'"':'')+' style="border:none;'+(l.width?'width:'+l.width+'px;':'')+(l.height?'height:'+l.height+'px;':'')+'"'+' src="'+i()+'"'+' frameborder="0"'+' scrolling="no"'+' allowtransparency="true"'+' onload="'+p+'()"'+'></iframe>';l.root.innerHTML='<iframe src="'+i()+'"'+' frameborder="0"'+' scrolling="no"'+' style="height:1px"></iframe>';m=true;setTimeout(function(){l.root.innerHTML=q;l.root.firstChild.src=l.url;l.onInsert&&l.onInsert(l.root.firstChild);},0);}else{var r=document.createElement('iframe');r.id=l.id;r.name=l.name;r.onload=o;r.scrolling='no';r.style.border='none';r.style.overflow='hidden';if(l.title)r.title=l.title;if(l.className)r.className=l.className;if(l.height!==undefined)r.style.height=l.height+'px';if(l.width!==undefined)if(l.width=='100%'){r.style.width=l.width;}else r.style.width=l.width+'px';l.root.appendChild(r);m=true;r.src=l.url;l.onInsert&&l.onInsert(r);}}f.exports=k;},null);
__d('sdk.domReady',[],function a(b,c,d,e,f,g){if(c.__markCompiled)c.__markCompiled();var h,i="readyState" in document?/loaded|complete/.test(document.readyState):!!document.body;function j(){if(!h)return;var m;while(m=h.shift())m();h=null;}function k(m){if(h){h.push(m);return;}else m();}if(!i){h=[];if(document.addEventListener){document.addEventListener('DOMContentLoaded',j,false);window.addEventListener('load',j,false);}else if(document.attachEvent){document.attachEvent('onreadystatechange',j);window.attachEvent('onload',j);}if(document.documentElement.doScroll&&window==window.top){var l=function(){try{document.documentElement.doScroll('left');}catch(m){setTimeout(l,0);return;}j();};l();}}f.exports=k;},3);
__d('sdk.Content',['Log','sdk.UA','sdk.domReady'],function a(b,c,d,e,f,g,h,i,j){if(c.__markCompiled)c.__markCompiled();var k,l,m={append:function(n,o){if(!o)if(!k){k=o=document.getElementById('fb-root');if(!o){h.warn('The "fb-root" div has not been created, auto-creating');k=o=document.createElement('div');o.id='fb-root';if(i.ie()||!document.body){j(function(){document.body.appendChild(o);});}else document.body.appendChild(o);}o.className+=' fb_reset';}else o=k;if(typeof n=='string'){var p=document.createElement('div');o.appendChild(p).innerHTML=n;return p;}else return o.appendChild(n);},appendHidden:function(n){if(!o){var o=document.createElement('div'),p=o.style;p.position='absolute';p.top='-10000px';p.width=p.height=0;o=m.append(o);}return m.append(n,o);},submitToTarget:function(n,o){var p=document.createElement('form');p.action=n.url;p.target=n.target;p.method=o?'GET':'POST';m.appendHidden(p);for(var q in n.params)if(n.params.hasOwnProperty(q)){var r=n.params[q];if(r!==null&&r!==undefined){var s=document.createElement('input');s.name=q;s.value=r;p.appendChild(s);}}p.submit();p.parentNode.removeChild(p);}};f.exports=m;},null);
__d('sdk.Impressions',['sdk.Content','Miny','QueryString','sdk.Runtime','UrlMap','getBlankIframeSrc','guid','insertIframe'],function a(b,c,d,e,f,g,h,i,j,k,l,m,n,o){if(c.__markCompiled)c.__markCompiled();function p(r){var s=k.getClientID();if(!r.api_key&&s)r.api_key=s;r.kid_directed_site=k.getKidDirectedSite();var t=l.resolve('www',true)+'/impression.php/'+n()+'/',u=j.appendToUrl(t,r);if(u.length>2000)if(r.payload&&typeof r.payload==='string'){var v=i.encode(r.payload);if(v&&v.length<r.payload.length){r.payload=v;u=j.appendToUrl(t,r);}}if(u.length<=2000){var w=new Image();w.src=u;}else{var x=n(),y=h.appendHidden('');o({url:m(),root:y,name:x,className:'fb_hidden fb_invisible',onload:function(){y.parentNode.removeChild(y);}});h.submitToTarget({url:t,target:x,params:r});}}var q={log:function(r,s){if(!s.source)s.source='jssdk';p({lid:r,payload:ES('JSON','stringify',false,s)});},impression:p};f.exports=q;},null);
__d('sdk.Scribe',['QueryString','sdk.Runtime','UrlMap'],function a(b,c,d,e,f,g,h,i,j){if(c.__markCompiled)c.__markCompiled();function k(m,n){if(typeof n.extra=='object')n.extra.revision=i.getRevision();new Image().src=h.appendToUrl(j.resolve('www',true)+'/common/scribe_endpoint.php',{c:m,m:ES('JSON','stringify',false,n)});}var l={log:k};f.exports=l;},null);
__d('Base64',[],function a(b,c,d,e,f,g){if(c.__markCompiled)c.__markCompiled();var h='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';function i(m){m=m.charCodeAt(0)<<16|m.charCodeAt(1)<<8|m.charCodeAt(2);return String.fromCharCode(h.charCodeAt(m>>>18),h.charCodeAt(m>>>12&63),h.charCodeAt(m>>>6&63),h.charCodeAt(m&63));}var j='>___?456789:;<=_______'+'\x00\x01\x02\x03\x04\x05\x06\x07\b\t\n\x0b\f\r\x0e\x0f\x10\x11\x12\x13\x14\x15\x16\x17\x18\x19'+'______\x1a\x1b\x1c\x1d\x1e\x1f !"#$%&\'()*+,-./0123';function k(m){m=j.charCodeAt(m.charCodeAt(0)-43)<<18|j.charCodeAt(m.charCodeAt(1)-43)<<12|j.charCodeAt(m.charCodeAt(2)-43)<<6|j.charCodeAt(m.charCodeAt(3)-43);return String.fromCharCode(m>>>16,m>>>8&255,m&255);}var l={encode:function(m){m=unescape(encodeURI(m));var n=(m.length+2)%3;m=(m+'\0\0'.slice(n)).replace(/[\s\S]{3}/g,i);return m.slice(0,m.length+n-2)+'=='.slice(n);},decode:function(m){m=m.replace(/[^A-Za-z0-9+\/]/g,'');var n=m.length+3&3;m=(m+'AAA'.slice(n)).replace(/..../g,k);m=m.slice(0,m.length+n-3);try{return decodeURIComponent(escape(m));}catch(o){throw new Error('Not valid UTF-8');}},encodeObject:function(m){return l.encode(ES('JSON','stringify',false,m));},decodeObject:function(m){return ES('JSON','parse',false,l.decode(m));},encodeNums:function(m){return String.fromCharCode.apply(String,ES(m,'map',true,function(n){return h.charCodeAt((n|-(n>63))&-(n>0)&63);}));}};f.exports=l;},null);
__d('sdk.SignedRequest',['Base64'],function a(b,c,d,e,f,g,h){if(c.__markCompiled)c.__markCompiled();function i(k){if(!k)return null;var l=k.split('.',2)[1].replace(/\-/g,'+').replace(/\_/g,'/');return h.decodeObject(l);}var j={parse:i};f.exports=j;},null);
__d('URIRFC3986',[],function a(b,c,d,e,f,g){if(c.__markCompiled)c.__markCompiled();var h=new RegExp('^'+'([^:/?#]+:)?'+'(//'+'([^\\\\/?#@]*@)?'+'('+'\\[[A-Fa-f0-9:.]+\\]|'+'[^\\/?#:]*'+')'+'(:[0-9]*)?'+')?'+'([^?#]*)'+'(\\?[^#]*)?'+'(#.*)?'),i={parse:function(j){if(ES(j,'trim',true)==='')return null;var k=j.match(h),l={};l.uri=k[0]?k[0]:null;l.scheme=k[1]?k[1].substr(0,k[1].length-1):null;l.authority=k[2]?k[2].substr(2):null;l.userinfo=k[3]?k[3].substr(0,k[3].length-1):null;l.host=k[2]?k[4]:null;l.port=k[5]?k[5].substr(1)?parseInt(k[5].substr(1),10):null:null;l.path=k[6]?k[6]:null;l.query=k[7]?k[7].substr(1):null;l.fragment=k[8]?k[8].substr(1):null;l.isGenericURI=l.authority===null&&!!l.scheme;return l;}};f.exports=i;},null);
__d('createObjectFrom',[],function a(b,c,d,e,f,g){if(c.__markCompiled)c.__markCompiled();function h(i,j){var k={},l=ES('Array','isArray',false,j);if(j===undefined)j=true;for(var m=i.length-1;m>=0;m--)k[i[m]]=l?j[m]:j;return k;}f.exports=h;},null);
__d('URISchemes',['createObjectFrom'],function a(b,c,d,e,f,g,h){if(c.__markCompiled)c.__markCompiled();var i=h(['blob','fb','fb-ama','fb-messenger','fb-page-messages','fbcf','fbconnect','fbmobilehome','fbrpc','file','ftp','http','https','mailto','ms-app','intent','itms','itms-apps','itms-services','market','svn+ssh','fbstaging','tel','sms','pebblejs','sftp','whatsapp']),j={isAllowed:function(k){if(!k)return true;return i.hasOwnProperty(k.toLowerCase());}};f.exports=j;},null);
__d('eprintf',[],function a(b,c,d,e,f,g){if(c.__markCompiled)c.__markCompiled();var h=function(i){var j=ES(Array.prototype.slice.call(arguments),'map',true,function(m){return String(m);}),k=i.split('%s').length-1;if(k!==j.length-1)return h('eprintf args number mismatch: %s',ES('JSON','stringify',false,j));var l=1;return i.replace(/%s/g,function(m){return String(j[l++]);});};f.exports=h;},null);
__d('ex',['eprintf'],function a(b,c,d,e,f,g,h){if(c.__markCompiled)c.__markCompiled();var i=function(){for(var j=arguments.length,k=Array(j),l=0;l<j;l++)k[l]=arguments[l];k=ES(k,'map',true,function(m){return String(m);});if(k[0].split('%s').length!==k.length)return i('ex args number mismatch: %s',ES('JSON','stringify',false,k));return i._prefix+ES('JSON','stringify',false,k)+i._suffix;};i._prefix='<![EX[';i._suffix=']]>';f.exports=i;},null);
__d('invariant',['ex','sprintf'],function a(b,c,d,e,f,g,h,i){'use strict';if(c.__markCompiled)c.__markCompiled();var j=h;function k(l,m){if(!l){var n=undefined;if(m===undefined){n=new Error('Minified exception occurred; use the non-minified dev environment '+'for the full error message and additional helpful warnings.');}else{var o=[m];for(var p=2,q=arguments.length;p<q;p++)o.push(arguments[p]);n=new Error(j.apply(null,o));n.name='Invariant Violation';n.messageWithParams=o;}n.framesToPop=1;throw n;}}f.exports=k;},null);
__d('URIBase',['URIRFC3986','URISchemes','ex','invariant'],function a(b,c,d,e,f,g,h,i,j,k){if(c.__markCompiled)c.__markCompiled();var l=new RegExp('[\\x00-\\x2c\\x2f\\x3b-\\x40\\x5c\\x5e\\x60\\x7b-\\x7f'+'\\uFDD0-\\uFDEF\\uFFF0-\\uFFFF'+'\\u2047\\u2048\\uFE56\\uFE5F\\uFF03\\uFF0F\\uFF1F]'),m=new RegExp('^(?:[^/]*:|'+'[\\x00-\\x1f]*/[\\x00-\\x1f]*/)');function n(q,r,s,t){if(!r)return true;if(r instanceof p){q.setProtocol(r.getProtocol());q.setDomain(r.getDomain());q.setPort(r.getPort());q.setPath(r.getPath());q.setQueryData(t.deserialize(t.serialize(r.getQueryData())));q.setFragment(r.getFragment());q.setForceFragmentSeparator(r.getForceFragmentSeparator());return true;}r=ES(r.toString(),'trim',true);var u=h.parse(r)||{};if(!s&&!i.isAllowed(u.scheme))return false;q.setProtocol(u.scheme||'');if(!s&&l.test(u.host))return false;q.setDomain(u.host||'');q.setPort(u.port||'');q.setPath(u.path||'');if(s){q.setQueryData(t.deserialize(u.query)||{});}else try{q.setQueryData(t.deserialize(u.query)||{});}catch(v){return false;}q.setFragment(u.fragment||'');if(u.fragment==='')q.setForceFragmentSeparator(true);if(u.userinfo!==null)if(s){throw new Error(j('URI.parse: invalid URI (userinfo is not allowed in a URI): %s',q.toString()));}else return false;if(!q.getDomain()&&ES(q.getPath(),'indexOf',true,'\\')!==-1)if(s){throw new Error(j('URI.parse: invalid URI (no domain but multiple back-slashes): %s',q.toString()));}else return false;if(!q.getProtocol()&&m.test(r))if(s){throw new Error(j('URI.parse: invalid URI (unsafe protocol-relative URLs): %s',q.toString()));}else return false;return true;}var o=[];function p(q,r){'use strict';!r?k(0):undefined;this.$URIBase1=r;this.$URIBase2='';this.$URIBase3='';this.$URIBase4='';this.$URIBase5='';this.$URIBase6='';this.$URIBase7={};this.$URIBase8=false;n(this,q,true,r);}p.prototype.setProtocol=function(q){'use strict';!i.isAllowed(q)?k(0):undefined;this.$URIBase2=q;return this;};p.prototype.getProtocol=function(q){'use strict';return this.$URIBase2;};p.prototype.setSecure=function(q){'use strict';return this.setProtocol(q?'https':'http');};p.prototype.isSecure=function(){'use strict';return this.getProtocol()==='https';};p.prototype.setDomain=function(q){'use strict';if(l.test(q))throw new Error(j('URI.setDomain: unsafe domain specified: %s for url %s',q,this.toString()));this.$URIBase3=q;return this;};p.prototype.getDomain=function(){'use strict';return this.$URIBase3;};p.prototype.setPort=function(q){'use strict';this.$URIBase4=q;return this;};p.prototype.getPort=function(){'use strict';return this.$URIBase4;};p.prototype.setPath=function(q){'use strict';this.$URIBase5=q;return this;};p.prototype.getPath=function(){'use strict';return this.$URIBase5;};p.prototype.addQueryData=function(q,r){'use strict';if(Object.prototype.toString.call(q)==='[object Object]'){ES('Object','assign',false,this.$URIBase7,q);}else this.$URIBase7[q]=r;return this;};p.prototype.setQueryData=function(q){'use strict';this.$URIBase7=q;return this;};p.prototype.getQueryData=function(){'use strict';return this.$URIBase7;};p.prototype.removeQueryData=function(q){'use strict';if(!ES('Array','isArray',false,q))q=[q];for(var r=0,s=q.length;r<s;++r)delete this.$URIBase7[q[r]];return this;};p.prototype.setFragment=function(q){'use strict';this.$URIBase6=q;this.setForceFragmentSeparator(false);return this;};p.prototype.getFragment=function(){'use strict';return this.$URIBase6;};p.prototype.setForceFragmentSeparator=function(q){'use strict';this.$URIBase8=q;return this;};p.prototype.getForceFragmentSeparator=function(){'use strict';return this.$URIBase8;};p.prototype.isEmpty=function(){'use strict';return !(this.getPath()||this.getProtocol()||this.getDomain()||this.getPort()||ES('Object','keys',false,this.getQueryData()).length>0||this.getFragment());};p.prototype.toString=function(){'use strict';var q=this;for(var r=0;r<o.length;r++)q=o[r](q);return q.$URIBase9();};p.prototype.$URIBase9=function(){'use strict';var q='',r=this.getProtocol();if(r)q+=r+'://';var s=this.getDomain();if(s)q+=s;var t=this.getPort();if(t)q+=':'+t;var u=this.getPath();if(u){q+=u;}else if(q)q+='/';var v=this.$URIBase1.serialize(this.getQueryData());if(v)q+='?'+v;var w=this.getFragment();if(w){q+='#'+w;}else if(this.getForceFragmentSeparator())q+='#';return q;};p.registerFilter=function(q){'use strict';o.push(q);};p.prototype.getOrigin=function(){'use strict';var q=this.getPort();return this.getProtocol()+'://'+this.getDomain()+(q?':'+q:'');};p.isValidURI=function(q,r){return n(new p(null,r),q,false,r);};f.exports=p;},null);
__d('sdk.URI',['Assert','QueryString','URIBase'],function a(b,c,d,e,f,g,h,i,j){var k,l;if(c.__markCompiled)c.__markCompiled();var m=/\.facebook\.com$/,n={serialize:function(p){return p?i.encode(p):'';},deserialize:function(p){return p?i.decode(p):{};}};k=babelHelpers.inherits(o,j);l=k&&k.prototype;function o(p){'use strict';h.isString(p,'The passed argument was of invalid type.');l.constructor.call(this,p,n);}o.prototype.isFacebookURI=function(){'use strict';return m.test(this.getDomain());};o.prototype.valueOf=function(){'use strict';return this.toString();};f.exports=o;},null);
__d('Queue',[],function a(b,c,d,e,f,g){if(c.__markCompiled)c.__markCompiled();var h={};function i(j){'use strict';this._opts=babelHelpers['extends']({interval:0,processor:null},j);this._queue=[];this._stopped=true;}i.prototype._dispatch=function(j){'use strict';if(this._stopped||this._queue.length===0)return;if(!this._opts.processor){this._stopped=true;throw new Error('No processor available');}if(this._opts.interval){this._opts.processor.call(this,this._queue.shift());this._timeout=setTimeout(ES(this._dispatch,'bind',true,this),this._opts.interval);}else while(this._queue.length)this._opts.processor.call(this,this._queue.shift());};i.prototype.enqueue=function(j){'use strict';if(this._opts.processor&&!this._stopped){this._opts.processor.call(this,j);}else this._queue.push(j);return this;};i.prototype.start=function(j){'use strict';if(j)this._opts.processor=j;this._stopped=false;this._dispatch();return this;};i.prototype.isStarted=function(){'use strict';return !this._stopped;};i.prototype.dispatch=function(){'use strict';this._dispatch(true);};i.prototype.stop=function(j){'use strict';this._stopped=true;if(j)clearTimeout(this._timeout);return this;};i.prototype.merge=function(j,k){'use strict';this._queue[k?'unshift':'push'].apply(this._queue,j._queue);j._queue=[];this._dispatch();return this;};i.prototype.getLength=function(){'use strict';return this._queue.length;};i.get=function(j,k){'use strict';var l;if(j in h){l=h[j];}else l=h[j]=new i(k);return l;};i.exists=function(j){'use strict';return j in h;};i.remove=function(j){'use strict';return delete h[j];};f.exports=i;},null);
__d('DOMEventListener',['wrapFunction'],function a(b,c,d,e,f,g,h){if(c.__markCompiled)c.__markCompiled();var i,j;if(window.addEventListener){i=function(l,m,n){n.wrapper=h(n,'entry','DOMEventListener.add '+m);l.addEventListener(m,n.wrapper,false);};j=function(l,m,n){l.removeEventListener(m,n.wrapper,false);};}else if(window.attachEvent){i=function(l,m,n){n.wrapper=h(n,'entry','DOMEventListener.add '+m);l.attachEvent('on'+m,n.wrapper);};j=function(l,m,n){l.detachEvent('on'+m,n.wrapper);};}else j=i=function(){};var k={add:function(l,m,n){i(l,m,n);return {remove:function(){j(l,m,n);l=null;}};},remove:j};f.exports=k;},null);
__d('UserAgent_DEPRECATED',[],function a(b,c,d,e,f,g){if(c.__markCompiled)c.__markCompiled();var h=false,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w;function x(){if(h)return;h=true;var z=navigator.userAgent,aa=/(?:MSIE.(\d+\.\d+))|(?:(?:Firefox|GranParadiso|Iceweasel).(\d+\.\d+))|(?:Opera(?:.+Version.|.)(\d+\.\d+))|(?:AppleWebKit.(\d+(?:\.\d+)?))|(?:Trident\/\d+\.\d+.*rv:(\d+\.\d+))/.exec(z),ba=/(Mac OS X)|(Windows)|(Linux)/.exec(z);t=/\b(iPhone|iP[ao]d)/.exec(z);u=/\b(iP[ao]d)/.exec(z);r=/Android/i.exec(z);v=/FBAN\/\w+;/i.exec(z);w=/Mobile/i.exec(z);s=!!/Win64/.exec(z);if(aa){i=aa[1]?parseFloat(aa[1]):aa[5]?parseFloat(aa[5]):NaN;if(i&&document&&document.documentMode)i=document.documentMode;var ca=/(?:Trident\/(\d+.\d+))/.exec(z);n=ca?parseFloat(ca[1])+4:i;j=aa[2]?parseFloat(aa[2]):NaN;k=aa[3]?parseFloat(aa[3]):NaN;l=aa[4]?parseFloat(aa[4]):NaN;if(l){aa=/(?:Chrome\/(\d+\.\d+))/.exec(z);m=aa&&aa[1]?parseFloat(aa[1]):NaN;}else m=NaN;}else i=j=k=m=l=NaN;if(ba){if(ba[1]){var da=/(?:Mac OS X (\d+(?:[._]\d+)?))/.exec(z);o=da?parseFloat(da[1].replace('_','.')):true;}else o=false;p=!!ba[2];q=!!ba[3];}else o=p=q=false;}var y={ie:function(){return x()||i;},ieCompatibilityMode:function(){return x()||n>i;},ie64:function(){return y.ie()&&s;},firefox:function(){return x()||j;},opera:function(){return x()||k;},webkit:function(){return x()||l;},safari:function(){return y.webkit();},chrome:function(){return x()||m;},windows:function(){return x()||p;},osx:function(){return x()||o;},linux:function(){return x()||q;},iphone:function(){return x()||t;},mobile:function(){return x()||t||u||r||w;},nativeApp:function(){return x()||v;},android:function(){return x()||r;},ipad:function(){return x()||u;}};f.exports=y;},null);
__d('htmlSpecialChars',[],function a(b,c,d,e,f,g){if(c.__markCompiled)c.__markCompiled();var h=/&/g,i=/</g,j=/>/g,k=/"/g,l=/'/g;function m(n){if(typeof n=='undefined'||n===null||!n.toString)return '';if(n===false){return '0';}else if(n===true)return '1';return n.toString().replace(h,'&amp;').replace(k,'&quot;').replace(l,'&#039;').replace(i,'&lt;').replace(j,'&gt;');}f.exports=m;},null);
__d('Flash',['DOMEventListener','DOMWrapper','QueryString','UserAgent_DEPRECATED','guid','htmlSpecialChars'],function a(b,c,d,e,f,g,h,i,j,k,l,m){if(c.__markCompiled)c.__markCompiled();var n={},o,p=i.getWindow().document;function q(v){var w=p.getElementById(v);if(w)w.parentNode.removeChild(w);delete n[v];}function r(){for(var v in n)if(n.hasOwnProperty(v))q(v);}function s(v){return v.replace(/\d+/g,function(w){return '000'.substring(w.length)+w;});}function t(v){if(!o){if(k.ie()>=9)h.add(window,'unload',r);o=true;}n[v]=v;}var u={embed:function(v,w,x,y){var z=l();v=m(v).replace(/&amp;/g,'&');x=babelHelpers['extends']({allowscriptaccess:'always',flashvars:y,movie:v},x);if(typeof x.flashvars=='object')x.flashvars=j.encode(x.flashvars);var aa=[];for(var ba in x)if(x.hasOwnProperty(ba)&&x[ba])aa.push('<param name="'+m(ba)+'" value="'+m(x[ba])+'">');var ca=w.appendChild(p.createElement('span')),da='<object '+(k.ie()?'classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" ':'type="application/x-shockwave-flash"')+'data="'+v+'" '+(x.height?'height="'+x.height+'" ':'')+(x.width?'width="'+x.width+'" ':'')+'id="'+z+'">'+aa.join('')+'</object>';ca.innerHTML=da;var ea=ca.firstChild;t(z);return ea;},remove:q,getVersion:function(){var v='Shockwave Flash',w='application/x-shockwave-flash',x='ShockwaveFlash.ShockwaveFlash',y;if(navigator.plugins&&typeof navigator.plugins[v]=='object'){var z=navigator.plugins[v].description;if(z&&navigator.mimeTypes&&navigator.mimeTypes[w]&&navigator.mimeTypes[w].enabledPlugin)y=z.match(/\d+/g);}if(!y)try{y=new ActiveXObject(x).GetVariable('$version').match(/(\d+),(\d+),(\d+),(\d+)/);y=Array.prototype.slice.call(y,1);}catch(aa){}return y;},getVersionString:function(){var v=u.getVersion();return v?v.join('.'):'';},checkMinVersion:function(v){var w=u.getVersion();if(!w)return false;return s(w.join('.'))>=s(v);},isAvailable:function(){return !!u.getVersion();}};f.exports=u;},null);
__d("emptyFunction",[],function a(b,c,d,e,f,g){if(c.__markCompiled)c.__markCompiled();function h(j){return function(){return j;};}function i(){}i.thatReturns=h;i.thatReturnsFalse=h(false);i.thatReturnsTrue=h(true);i.thatReturnsNull=h(null);i.thatReturnsThis=function(){return this;};i.thatReturnsArgument=function(j){return j;};f.exports=i;},null);
__d('XDM',['DOMEventListener','DOMWrapper','emptyFunction','Flash','GlobalCallback','guid','Log','UserAgent_DEPRECATED','wrapFunction'],function a(b,c,d,e,f,g,h,i,j,k,l,m,n,o,p){if(c.__markCompiled)c.__markCompiled();var q={},r={transports:[]},s=i.getWindow();function t(w){var x={},y=w.length,z=r.transports;while(y--)x[w[y]]=1;y=z.length;while(y--){var aa=z[y],ba=q[aa];if(!x[aa]&&ba.isAvailable())return aa;}}var u={register:function(w,x){n.debug('Registering %s as XDM provider',w);r.transports.push(w);q[w]=x;},create:function(w){if(!w.whenReady&&!w.onMessage){n.error('An instance without whenReady or onMessage makes no sense');throw new Error('An instance without whenReady or '+'onMessage makes no sense');}if(!w.channel){n.warn('Missing channel name, selecting at random');w.channel=m();}if(!w.whenReady)w.whenReady=j;if(!w.onMessage)w.onMessage=j;var x=w.transport||t(w.blacklist||[]),y=q[x];if(y&&y.isAvailable()){n.debug('%s is available',x);y.init(w);return x;}}};u.register('flash',(function(){var w=false,x,y=false,z=15000,aa;return {isAvailable:function(){return k.checkMinVersion('8.0.24');},init:function(ba){n.debug('init flash: '+ba.channel);var ca={send:function(fa,ga,ha,ia){n.debug('sending to: %s (%s)',ga,ia);x.postMessage(fa,ga,ia);}};if(w){ba.whenReady(ca);return;}var da=ba.root.appendChild(s.document.createElement('div')),ea=l.create(function(){l.remove(ea);clearTimeout(aa);n.info('xdm.swf called the callback');var fa=l.create(function(ga,ha){ga=decodeURIComponent(ga);ha=decodeURIComponent(ha);n.debug('received message %s from %s',ga,ha);ba.onMessage(ga,ha);},'xdm.swf:onMessage');x.init(ba.channel,fa);ba.whenReady(ca);},'xdm.swf:load');x=k.embed(ba.flashUrl,da,null,{protocol:location.protocol.replace(':',''),host:location.host,callback:ea,log:y});aa=setTimeout(function(){n.warn('The Flash component did not load within %s ms - '+'verify that the container is not set to hidden or invisible '+'using CSS as this will cause some browsers to not load '+'the components',z);},z);w=true;}};})());var v=/\.facebook\.com(\/|$)/;u.register('postmessage',(function(){var w=false;return {isAvailable:function(){return !!s.postMessage;},init:function(x){n.debug('init postMessage: '+x.channel);var y='_FB_'+x.channel,z={send:function(aa,ba,ca,da){if(s===ca){n.error('Invalid windowref, equal to window (self)');throw new Error();}n.debug('sending to: %s (%s)',ba,da);var ea=function(){ca.postMessage('_FB_'+da+aa,ba);};if(o.ie()==8||o.ieCompatibilityMode()){setTimeout(ea,0);}else ea();}};if(w){x.whenReady(z);return;}h.add(s,'message',p(function(event){var aa=event.data,ba=event.origin||'native';if(!/^(https?:\/\/|native$)/.test(ba)){n.debug('Received message from invalid origin type: %s',ba);return;}if(ba!=='native'&&!(v.test(location.hostname)||v.test(event.origin)))return;if(typeof aa!='string'){n.warn('Received message of type %s from %s, expected a string',typeof aa,ba);return;}n.debug('received message %s from %s',aa,ba);if(aa.substring(0,y.length)==y)aa=aa.substring(y.length);x.onMessage(aa,ba);},'entry','onMessage'));x.whenReady(z);w=true;}};})());f.exports=u;},null);
__d('isFacebookURI',[],function a(b,c,d,e,f,g){if(c.__markCompiled)c.__markCompiled();var h=null,i=['http','https'];function j(k){if(!h)h=new RegExp('(^|\\.)facebook\\.com$','i');if(k.isEmpty()&&k.toString()!=='#')return false;if(!k.getDomain()&&!k.getProtocol())return true;return ES(i,'indexOf',true,k.getProtocol())!==-1&&h.test(k.getDomain());}j.setRegex=function(k){h=k;};f.exports=j;},null);
__d('sdk.Event',[],function a(b,c,d,e,f,g){if(c.__markCompiled)c.__markCompiled();var h={SUBSCRIBE:'event.subscribe',UNSUBSCRIBE:'event.unsubscribe',subscribers:function(){if(!this._subscribersMap)this._subscribersMap={};return this._subscribersMap;},subscribe:function(i,j){var k=this.subscribers();if(!k[i]){k[i]=[j];}else if(ES(k[i],'indexOf',true,j)==-1)k[i].push(j);if(i!=this.SUBSCRIBE&&i!=this.UNSUBSCRIBE)this.fire(this.SUBSCRIBE,i,k[i]);},unsubscribe:function(i,j){var k=this.subscribers()[i];if(k)ES(k,'forEach',true,function(l,m){if(l==j)k.splice(m,1);});if(i!=this.SUBSCRIBE&&i!=this.UNSUBSCRIBE)this.fire(this.UNSUBSCRIBE,i,k);},monitor:function(i,j){if(!j()){var k=this,l=function(){if(j.apply(j,arguments))k.unsubscribe(i,l);};this.subscribe(i,l);}},clear:function(i){delete this.subscribers()[i];},fire:function(i){var j=Array.prototype.slice.call(arguments,1),k=this.subscribers()[i];if(k)ES(k,'forEach',true,function(l){if(l)l.apply(this,j);});}};f.exports=h;},null);
__d('JSONRPC',['Log'],function a(b,c,d,e,f,g,h){if(c.__markCompiled)c.__markCompiled();function i(j){'use strict';this.$JSONRPC1=0;this.$JSONRPC2={};this.remote=ES(function(k){this.$JSONRPC3=k;return this.remote;},'bind',true,this);this.local={};this.$JSONRPC4=j;}i.prototype.stub=function(j){'use strict';this.remote[j]=ES(function(){var k={jsonrpc:'2.0',method:j};for(var l=arguments.length,m=Array(l),n=0;n<l;n++)m[n]=arguments[n];if(typeof m[m.length-1]=='function'){k.id=++this.$JSONRPC1;this.$JSONRPC2[k.id]=m.pop();}k.params=m;this.$JSONRPC4(ES('JSON','stringify',false,k),this.$JSONRPC3||{method:j});},'bind',true,this);};i.prototype.read=function(j,k){'use strict';var l=ES('JSON','parse',false,j),m=l.id;if(!l.method){if(!this.$JSONRPC2[m]){h.warn('Could not find callback %s',m);return;}var n=this.$JSONRPC2[m];delete this.$JSONRPC2[m];delete l.id;delete l.jsonrpc;n(l);return;}var o=this,p=this.local[l.method],q;if(m){q=function(t,u){var v={jsonrpc:'2.0',id:m};v[t]=u;setTimeout(function(){o.$JSONRPC4(ES('JSON','stringify',false,v),k);},0);};}else q=function(){};if(!p){h.error('Method "%s" has not been defined',l.method);q('error',{code:-32601,message:'Method not found',data:l.method});return;}l.params.push(ES(q,'bind',true,null,'result'));l.params.push(ES(q,'bind',true,null,'error'));try{var s=p.apply(k||null,l.params);if(typeof s!=='undefined')q('result',s);}catch(r){h.error('Invokation of RPC method %s resulted in the error: %s',l.method,r.message);q('error',{code:-32603,message:'Internal error',data:r.message});}};f.exports=i;},null);
__d('sdk.RPC',['Assert','JSONRPC','Queue'],function a(b,c,d,e,f,g,h,i,j){if(c.__markCompiled)c.__markCompiled();var k=new j(),l=new i(function(n){k.enqueue(n);}),m={local:l.local,remote:l.remote,stub:ES(l.stub,'bind',true,l),setInQueue:function(n){h.isInstanceOf(j,n);n.start(function(o){l.read(o);});},getOutQueue:function(){return k;}};f.exports=m;},null);
__d('hasNamePropertyBug',['guid','UserAgent_DEPRECATED'],function a(b,c,d,e,f,g,h,i){if(c.__markCompiled)c.__markCompiled();var j=i.ie()?undefined:false;function k(){var m=document.createElement("form"),n=m.appendChild(document.createElement("input"));n.name=h();j=n!==m.elements[n.name];m=n=null;return j;}function l(){return typeof j==='undefined'?k():j;}f.exports=l;},null);
__d('sdk.createIframe',['DOMEventListener','getBlankIframeSrc','guid','hasNamePropertyBug'],function a(b,c,d,e,f,g,h,i,j,k){if(c.__markCompiled)c.__markCompiled();function l(m){m=ES('Object','assign',false,{},m);var n,o=m.name||j(),p=m.root,q=m.style||{border:'none'},r=m.url,s=m.onload,t=m.onerror;if(k()){n=document.createElement('<iframe name="'+o+'"/>');}else{n=document.createElement("iframe");n.name=o;}delete m.style;delete m.name;delete m.url;delete m.root;delete m.onload;delete m.onerror;var u=ES('Object','assign',false,{frameBorder:0,allowTransparency:true,allowFullscreen:true,scrolling:'no'},m);if(u.width)n.width=u.width+'px';if(u.height)n.height=u.height+'px';delete u.height;delete u.width;for(var v in u)if(u.hasOwnProperty(v))n.setAttribute(v,u[v]);ES('Object','assign',false,n.style,q);n.src=i();p.appendChild(n);if(s)var w=h.add(n,'load',function(){w.remove();s();});if(t)var x=h.add(n,'error',function(){x.remove();t();});n.src=r;return n;}f.exports=l;},null);
__d('sdk.feature',['JSSDKConfig','invariant'],function a(b,c,d,e,f,g,h,i){if(c.__markCompiled)c.__markCompiled();function j(k,l){!(arguments.length>=2)?i(0):undefined;if(h.features&&k in h.features){var m=h.features[k];if(typeof m==='object'&&typeof m.rate==='number'){if(m.rate&&Math.random()*100<=m.rate){return m.value||true;}else return m.value?null:false;}else return m;}return l;}f.exports=j;},null);
__d('sdk.XD',['sdk.Content','sdk.Event','Log','QueryString','Queue','sdk.RPC','sdk.Runtime','sdk.Scribe','sdk.URI','UrlMap','JSSDKXDConfig','XDM','isFacebookURI','sdk.createIframe','sdk.feature','guid'],function a(b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w){if(c.__markCompiled)c.__markCompiled();var x=new l(),y=new l(),z=new l(),aa,ba,ca=w(),da=r.useCdn?'cdn':'www',ea=v('use_bundle',false)?r.XdBundleUrl:r.XdUrl,fa=q.resolve(da,false)+ea,ga=q.resolve(da,true)+ea,ha=w(),ia=location.protocol+'//'+location.host,ja,ka=false,la='Facebook Cross Domain Communication Frame',ma={},na=new l();m.setInQueue(na);function oa(ua){j.info('Remote XD can talk to facebook.com (%s)',ua);n.setEnvironment(ua==='canvas'?n.ENVIRONMENTS.CANVAS:n.ENVIRONMENTS.PAGETAB);}function pa(ua,va){if(!va){j.error('No senderOrigin');throw new Error();}var wa=/^https?/.exec(va)[0];switch(ua.xd_action){case 'proxy_ready':var xa,ya;if(wa=='https'){xa=z;ya=ba;n.setLoggedIntoFacebook(ua.logged_in==='true');}else{xa=y;ya=aa;}if(ua.registered){oa(ua.registered);x=xa.merge(x);}j.info('Proxy ready, starting queue %s containing %s messages',wa+'ProxyQueue',xa.getLength());xa.start(function(ab){ja.send(typeof ab==='string'?ab:k.encode(ab),va,ya.contentWindow,ha+'_'+wa);});break;case 'plugin_ready':j.info('Plugin %s ready, protocol: %s',ua.name,wa);ma[ua.name]={protocol:wa};if(l.exists(ua.name)){var za=l.get(ua.name);j.debug('Enqueuing %s messages for %s in %s',za.getLength(),ua.name,wa+'ProxyQueue');(wa=='https'?z:y).merge(za);}break;}if(ua.data)qa(ua.data,va);}function qa(ua,va){if(va&&va!=='native'&&!t(new p(va)))return;if(typeof ua=='string'){if(/^FB_RPC:/.test(ua)){na.enqueue(ua.substring(7));return;}if(ua.substring(0,1)=='{'){try{ua=ES('JSON','parse',false,ua);}catch(wa){j.warn('Failed to decode %s as JSON',ua);return;}}else ua=k.decode(ua);}if(!va)if(ua.xd_sig==ca)va=ua.xd_origin;if(ua.xd_action){pa(ua,va);return;}if(ua.access_token)n.setSecure(/^https/.test(ia));if(ua.cb){var xa=ta._callbacks[ua.cb];if(!ta._forever[ua.cb])delete ta._callbacks[ua.cb];if(xa)xa(ua);}}function ra(ua,va){if(ua=='facebook'){va.relation='parent.parent';x.enqueue(va);}else{va.relation='parent.frames["'+ua+'"]';var wa=ma[ua];if(wa){j.debug('Enqueuing message for plugin %s in %s',ua,wa.protocol+'ProxyQueue');(wa.protocol=='https'?z:y).enqueue(va);}else{j.debug('Buffering message for plugin %s',ua);l.get(ua).enqueue(va);}}}m.getOutQueue().start(function(ua){ra('facebook','FB_RPC:'+ua);});function sa(ua){if(ka)return;var va=h.appendHidden(document.createElement('div')),wa=s.create({blacklist:null,root:va,channel:ha,flashUrl:r.Flash.path,whenReady:function(xa){ja=xa;var ya={channel:ha,origin:location.protocol+'//'+location.host,transport:wa,xd_name:ua},za='#'+k.encode(ya);if(n.getSecure()!==true)aa=u({url:fa+za,name:'fb_xdm_frame_http',id:'fb_xdm_frame_http',root:va,'aria-hidden':true,title:la,tabindex:-1});ba=u({url:ga+za,name:'fb_xdm_frame_https',id:'fb_xdm_frame_https',root:va,'aria-hidden':true,title:la,tabindex:-1});},onMessage:qa});if(!wa)o.log('jssdk_error',{appId:n.getClientID(),error:'XD_TRANSPORT',extra:{message:'Failed to create a valid transport'}});ka=true;}var ta={rpc:m,_callbacks:{},_forever:{},_channel:ha,_origin:ia,onMessage:qa,recv:qa,init:sa,sendToFacebook:ra,inform:function(ua,va,wa,xa){ra('facebook',{method:ua,params:ES('JSON','stringify',false,va||{}),behavior:xa||'p',relation:wa});},handler:function(ua,va,wa,xa){var ya='#'+k.encode({cb:this.registerCallback(ua,wa,xa),origin:ia+'/'+ha,domain:location.hostname,relation:va||'opener'});return (location.protocol=='https:'?ga:fa)+ya;},registerCallback:function(ua,va,wa){wa=wa||w();if(va)ta._forever[wa]=true;ta._callbacks[wa]=ua;return wa;},getXDArbiterURL:function(ua){return ua?ga:fa;}};i.subscribe('init:post',function(ua){sa(ua.xdProxyName);var va=v('xd_timeout',false);if(va)setTimeout(function(){var wa=ba&&!!aa==y.isStarted()&&!!ba==z.isStarted();if(!wa)o.log('jssdk_error',{appId:n.getClientID(),error:'XD_INITIALIZATION',extra:{message:'Failed to initialize in '+va+'ms'}});},va);});f.exports=ta;},null);
__d('sdk.getContextType',['sdk.Runtime','sdk.UA'],function a(b,c,d,e,f,g,h,i){if(c.__markCompiled)c.__markCompiled();function j(){if(i.nativeApp())return 3;if(i.mobile())return 2;if(h.isEnvironment(h.ENVIRONMENTS.CANVAS))return 5;return 1;}f.exports=j;},null);
__d('sdk.Auth',['sdk.Cookie','sdk.createIframe','DOMWrapper','sdk.feature','sdk.getContextType','guid','sdk.Impressions','Log','ObservableMixin','sdk.Runtime','sdk.Scribe','sdk.SignedRequest','UrlMap','sdk.URI','sdk.XD'],function a(b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v){if(c.__markCompiled)c.__markCompiled();var w='fblo_',x=365*24*60*60*1000,y,z,aa=new p();function ba(ja,ka){var la=q.getUserID(),ma='';if(ja)if(ja.userID){ma=ja.userID;}else if(ja.signedRequest){var na=s.parse(ja.signedRequest);if(na&&na.user_id)ma=na.user_id;}var oa=q.getLoginStatus(),pa=oa==='unknown'&&ja||q.getUseCookie()&&q.getCookieUserID()!==ma,qa=la&&!ja,ra=ja&&la&&la!=ma,sa=ja!=y,ta=ka!=(oa||'unknown');q.setLoginStatus(ka);q.setAccessToken(ja&&ja.accessToken||null);q.setUserID(ma);y=ja;var ua={authResponse:ja,status:ka};if(qa||ra)aa.inform('logout',ua);if(pa||ra)aa.inform('login',ua);if(sa)aa.inform('authresponse.change',ua);if(ta)aa.inform('status.change',ua);return ua;}function ca(){return y;}function da(ja,ka,la){return function(ma){var na;if(ma&&ma.access_token){var oa=s.parse(ma.signed_request);ka={accessToken:ma.access_token,userID:oa.user_id,expiresIn:parseInt(ma.expires_in,10),signedRequest:ma.signed_request};if(ma.granted_scopes)ka.grantedScopes=ma.granted_scopes;if(q.getUseCookie()){var pa=ka.expiresIn===0?0:ES('Date','now',false)+ka.expiresIn*1000,qa=h.getDomain();if(!qa&&ma.base_domain)h.setDomain('.'+ma.base_domain);h.setSignedRequestCookie(ma.signed_request,pa);ea();}na='connected';ba(ka,na);}else if(la==='logout'||la==='login_status'){if(ma.error&&ma.error==='not_authorized'){na='not_authorized';}else na='unknown';ba(null,na);if(q.getUseCookie())h.clearSignedRequestCookie();if(la==='logout'){fa();r.log('jssdk_error',{appId:q.getClientID(),error:'PLATFORM_AUTH_LOGOUT',extra:{args:{fblo:true}}});}}if(ma&&ma.https==1)q.setSecure(true);if(ja)ja({authResponse:ka,status:q.getLoginStatus()});return ka;};}function ea(){h.setRaw(w,'',0);}function fa(){h.setRaw(w,'y',ES('Date','now',false)+x);}function ga(ja){var ka,la=ES('Date','now',false);if(z){clearTimeout(z);z=null;}var ma=h.getRaw(w)==='y';if(k('getloginstatus_tracking',true))r.log('jssdk_error',{appId:q.getClientID(),error:'PLATFORM_AUTH_GETLOGINSTATUS',extra:{args:{fblo:ma}}});if(ma){var na='unknown';ba(null,na);if(ja)ja({authResponse:null,status:na});return;}var oa=da(ja,y,'login_status'),pa=new u(t.resolve('www',true)+'/connect/ping').setQueryData({client_id:q.getClientID(),response_type:'token,signed_request,code',domain:location.hostname,origin:l(),redirect_uri:v.handler(function(qa){if(k('e2e_ping_tracking',true)){var ra={init:la,close:ES('Date','now',false),method:'ping'};o.debug('e2e: %s',ES('JSON','stringify',false,ra));n.log(114,{payload:ra});}ka.parentNode.removeChild(ka);if(oa(qa))z=setTimeout(function(){ga(function(){});},1200000);},'parent'),sdk:'joey',kid_directed_site:q.getKidDirectedSite()});ka=i({root:j.getRoot(),name:m(),url:pa.toString(),style:{display:'none'}});}var ha;function ia(ja,ka){if(!q.getClientID()){o.warn('FB.getLoginStatus() called before calling FB.init().');return;}if(ja)if(!ka&&ha=='loaded'){ja({status:q.getLoginStatus(),authResponse:ca()});return;}else aa.subscribe('FB.loginStatus',ja);if(!ka&&ha=='loading')return;ha='loading';var la=function(ma){ha='loaded';aa.inform('FB.loginStatus',ma);aa.clearSubscribers('FB.loginStatus');};ga(la);}ES('Object','assign',false,aa,{removeLogoutState:ea,getLoginStatus:ia,fetchLoginStatus:ga,setAuthResponse:ba,getAuthResponse:ca,parseSignedRequest:s.parse,xdResponseWrapper:da});f.exports=aa;},null);
__d('sdk.DOM',['Assert','sdk.UA','sdk.domReady'],function a(b,c,d,e,f,g,h,i,j){if(c.__markCompiled)c.__markCompiled();var k={};function l(z,aa){var ba=z.getAttribute(aa)||z.getAttribute(aa.replace(/_/g,'-'))||z.getAttribute(aa.replace(/-/g,'_'))||z.getAttribute(aa.replace(/-/g,''))||z.getAttribute(aa.replace(/_/g,''))||z.getAttribute('data-'+aa)||z.getAttribute('data-'+aa.replace(/_/g,'-'))||z.getAttribute('data-'+aa.replace(/-/g,'_'))||z.getAttribute('data-'+aa.replace(/-/g,''))||z.getAttribute('data-'+aa.replace(/_/g,''));return ba?String(ba):null;}function m(z,aa){var ba=l(z,aa);return ba?/^(true|1|yes|on)$/.test(ba):null;}function n(z,aa){h.isTruthy(z,'element not specified');h.isString(aa);try{return String(z[aa]);}catch(ba){throw new Error('Could not read property '+aa+' : '+ba.message);}}function o(z,aa){h.isTruthy(z,'element not specified');h.isString(aa);try{z.innerHTML=aa;}catch(ba){throw new Error('Could not set innerHTML : '+ba.message);}}function p(z,aa){h.isTruthy(z,'element not specified');h.isString(aa);var ba=' '+n(z,'className')+' ';return ES(ba,'indexOf',true,' '+aa+' ')>=0;}function q(z,aa){h.isTruthy(z,'element not specified');h.isString(aa);if(!p(z,aa))z.className=n(z,'className')+' '+aa;}function r(z,aa){h.isTruthy(z,'element not specified');h.isString(aa);var ba=new RegExp('\\s*'+aa,'g');z.className=ES(n(z,'className').replace(ba,''),'trim',true);}function s(z,aa,ba){h.isString(z);aa=aa||document.body;ba=ba||'*';if(aa.querySelectorAll)return ES('Array','from',false,aa.querySelectorAll(ba+'.'+z));var ca=aa.getElementsByTagName(ba),da=[];for(var ea=0,fa=ca.length;ea<fa;ea++)if(p(ca[ea],z))da[da.length]=ca[ea];return da;}function t(z,aa){h.isTruthy(z,'element not specified');h.isString(aa);aa=aa.replace(/-(\w)/g,function(da,ea){return ea.toUpperCase();});var ba=z.currentStyle||document.defaultView.getComputedStyle(z,null),ca=ba[aa];if(/backgroundPosition?/.test(aa)&&/top|left/.test(ca))ca='0%';return ca;}function u(z,aa,ba){h.isTruthy(z,'element not specified');h.isString(aa);aa=aa.replace(/-(\w)/g,function(ca,da){return da.toUpperCase();});z.style[aa]=ba;}function v(z,aa){var ba=true;for(var ca=0,da;da=aa[ca++];)if(!(da in k)){ba=false;k[da]=true;}if(ba)return;if(i.ie()<11){try{document.createStyleSheet().cssText=z;}catch(ea){if(document.styleSheets[0])document.styleSheets[0].cssText+=z;}}else{var fa=document.createElement('style');fa.type='text/css';fa.textContent=z;document.getElementsByTagName('head')[0].appendChild(fa);}}function w(){var z=document.documentElement&&document.compatMode=='CSS1Compat'?document.documentElement:document.body;return {scrollTop:z.scrollTop||document.body.scrollTop,scrollLeft:z.scrollLeft||document.body.scrollLeft,width:window.innerWidth?window.innerWidth:z.clientWidth,height:window.innerHeight?window.innerHeight:z.clientHeight};}function x(z){h.isTruthy(z,'element not specified');var aa=0,ba=0;do{aa+=z.offsetLeft;ba+=z.offsetTop;}while(z=z.offsetParent);return {x:aa,y:ba};}var y={containsCss:p,addCss:q,removeCss:r,getByClass:s,getStyle:t,setStyle:u,getAttr:l,getBoolAttr:m,getProp:n,html:o,addCssRules:v,getViewportInfo:w,getPosition:x,ready:j};f.exports=y;},null);
__d('normalizeError',['sdk.UA'],function a(b,c,d,e,f,g,h){if(c.__markCompiled)c.__markCompiled();function i(j){var k={line:j.lineNumber||j.line,message:j.message,name:j.name,script:j.fileName||j.sourceURL||j.script,stack:j.stackTrace||j.stack};k._originalError=j;var l=/([\w:\.\/]+\.js):(\d+)/.exec(j.stack);if(h.chrome()&&l){k.script=l[1];k.line=parseInt(l[2],10);}for(var m in k)k[m]==null&&delete k[m];return k;}f.exports=i;},null);
__d('sdk.ErrorHandling',['ManagedError','sdk.Runtime','sdk.Scribe','sdk.feature','normalizeError','wrapFunction'],function a(b,c,d,e,f,g,h,i,j,k,l,m){if(c.__markCompiled)c.__markCompiled();var n=k('error_handling',false),o='';function p(u){var v=u._originalError;delete u._originalError;j.log('jssdk_error',{appId:i.getClientID(),error:u.name||u.message,extra:u});throw v;}function q(u,v){return function(){if(!n)return u.apply(this,arguments);try{o=v;return u.apply(this,arguments);}catch(w){if(w instanceof h)throw w;var x=l(w);x.entry=v;var y=ES(Array.prototype.slice.call(arguments),'map',true,function(z){var aa=Object.prototype.toString.call(z);return (/^\[object (String|Number|Boolean|Object|Date)\]$/.test(aa)?z:z.toString());});x.args=ES('JSON','stringify',false,y).substring(0,200);p(x);}finally{o='';}};}function r(u){if(!u.__wrapper)u.__wrapper=function(){try{return u.apply(this,arguments);}catch(v){window.setTimeout(function(){throw v;},0);return false;}};return u.__wrapper;}function s(u,v){return function(w,x){var y=v+':'+(o||'[global]')+':'+(w.name||'[anonymous]'+(arguments.callee.caller.name?'('+arguments.callee.caller.name+')':''));return u(m(w,'entry',y),x);};}if(n){setTimeout=s(setTimeout,'setTimeout');setInterval=s(setInterval,'setInterval');m.setWrapper(q,'entry');}var t={guard:q,unguard:r};f.exports=t;},null);
__d('sdk.Insights',['sdk.Impressions'],function a(b,c,d,e,f,g,h){if(c.__markCompiled)c.__markCompiled();var i={TYPE:{NOTICE:'notice',WARNING:'warn',ERROR:'error'},CATEGORY:{DEPRECATED:'deprecated',APIERROR:'apierror'},log:function(j,k,l){var m={source:'jssdk',type:j,category:k,payload:l};h.log(113,m);},impression:h.impression};f.exports=i;},null);
__d('FB',['sdk.Auth','JSSDKCssConfig','dotAccess','sdk.domReady','sdk.DOM','sdk.ErrorHandling','sdk.Content','DOMWrapper','GlobalCallback','sdk.Insights','Log','sdk.Runtime','sdk.Scribe','JSSDKConfig'],function a(b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u){if(c.__markCompiled)c.__markCompiled();var v,w,x=j(u,'api.mode'),y={};v=window.FB={};var z={};r.level=0;p.setPrefix('FB.__globalCallbacks');var aa=document.createElement('div');o.setRoot(aa);k(function(){r.info('domReady');n.appendHidden(aa);if(i.rules)l.addCssRules(i.rules,i.components);});s.subscribe('AccessToken.change',function(da){if(!da&&s.getLoginStatus()==='connected')h.getLoginStatus(null,true);});if(j(u,'api.whitelist.length')){w={};ES(u.api.whitelist,'forEach',true,function(da){w[da]=1;});}function ba(da,ea,fa,ga){var ha;if(/^_/.test(fa)){ha='hide';}else if(w&&!w[ea])ha=x;switch(ha){case 'hide':return;case 'stub':return function(){r.warn('The method FB.%s has been removed from the JS SDK.',ea);};default:return m.guard(function(){if(ha==='warn'){r.warn('The method FB.%s is not officially supported by '+'Facebook and access to it will soon be removed.',ea);if(!y.hasOwnProperty(ea)){q.log(q.TYPE.WARNING,q.CATEGORY.DEPRECATED,'FB.'+ea);t.log('jssdk_error',{appId:s.getClientID(),error:'Private method used',extra:{args:ea}});y[ea]=true;}}function ia(pa){if(ES('Array','isArray',false,pa))return ES(pa,'map',true,ia);if(pa&&typeof pa==='object'&&pa.__wrapped)return pa.__wrapped;return typeof pa==='function'&&/^function/.test(pa.toString())?m.unguard(pa):pa;}var ja=ES(Array.prototype.slice.call(arguments),'map',true,ia),ka=da.apply(ga,ja),la,ma=true;if(ka&&typeof ka==='object'){la=ES('Object','create',false,ka);la.__wrapped=ka;for(var na in ka){var oa=ka[na];if(typeof oa!=='function'||na==='constructor')continue;ma=false;la[na]=ba(oa,ea+':'+na,na,ka);}}if(!ma)return la;return ma?ka:la;},ea);}}function ca(da,ea){var fa=da?j(v,da,true):v;ES(ES('Object','keys',false,ea),'forEach',true,function(ga){var ha=ea[ga];if(typeof ha==='function'){var ia=(da?da+'.':'')+ga,ja=ba(ha,ia,ga,ea);if(ja)fa[ga]=ja;}else if(typeof ha==='object'){ia=(da?da+'.':'')+ga;if(w&&w[ia])fa[ga]=ha;}});}s.setSecure((function(){var da=/iframe_canvas|app_runner/.test(window.name),ea=/dialog/.test(window.name);if(location.protocol=='https:'&&(window==top||!(da||ea)))return true;if(/_fb_https?/.test(window.name))return ES(window.name,'indexOf',true,'_fb_https')!=-1;})());ES('Object','assign',false,z,{provide:ca});f.exports=z;},null);
__d('ArgumentError',['ManagedError'],function a(b,c,d,e,f,g,h){if(c.__markCompiled)c.__markCompiled();function i(j,k){h.prototype.constructor.apply(this,arguments);}i.prototype=new h();i.prototype.constructor=i;f.exports=i;},null);
__d('errorCode',[],function a(b,c,d,e,f,g){'use strict';if(c.__markCompiled)c.__markCompiled();function h(i){throw new Error('errorCode'+'("'+i+'"): This should not happen. Oh noes!');}f.exports=h;},null);
__d('CORSRequest',['wrapFunction','QueryString','errorCode'],function a(b,c,d,e,f,g,h,i,j){if(c.__markCompiled)c.__markCompiled();function k(n,o){if(!self.XMLHttpRequest)return null;var p=new XMLHttpRequest(),q=function(){};if('withCredentials' in p){p.open(n,o,true);p.setRequestHeader('Content-type','application/x-www-form-urlencoded');}else if(self.XDomainRequest){p=new XDomainRequest();try{p.open(n,o);p.onprogress=p.ontimeout=q;}catch(r){return null;}}else return null;var s={send:function(v){p.send(v);}},t=h(function(){t=q;if('onload' in s)s.onload(p);},'entry','XMLHttpRequest:load'),u=h(function(){u=q;if('onerror' in s)s.onerror(p);},'entry','XMLHttpRequest:error');p.onload=function(){t();};p.onerror=function(){u();};p.onreadystatechange=function(){if(p.readyState==4)if(p.status==200){t();}else u();};return s;}function l(n,o,p,q){p.suppress_http_code=1;var r=i.encode(p);if(o!='post'){n=i.appendToUrl(n,r);r='';}var s=k(o,n);if(!s)return false;s.onload=function(t){q(ES('JSON','parse',false,t.responseText));};s.onerror=function(t){if(t.responseText){q(ES('JSON','parse',false,t.responseText));}else q({error:{code:1,error_subcode:1357045,message:'unknown error (empty response)',status:t.status,type:'http'}});};s.send(r);return true;}var m={execute:l};f.exports=m;},null);
__d('FlashRequest',['DOMWrapper','Flash','GlobalCallback','QueryString','Queue'],function a(b,c,d,e,f,g,h,i,j,k,l){if(c.__markCompiled)c.__markCompiled();var m,n={},o,p;function q(){if(!o)throw new Error('swfUrl has not been set');var t=j.create(function(){m.start(function(v){var w=p.execute(v.method,v.url,v.body);if(!w)throw new Error('Could create request');n[w]=v.callback;});}),u=j.create(function(v,w,x){var y;try{y=ES('JSON','parse',false,decodeURIComponent(x));}catch(z){y={error:{type:'SyntaxError',message:z.message,status:w,raw:x}};}n[v](y);delete n[v];});p=i.embed(o,h.getRoot(),null,{log:false,initCallback:t,requestCallback:u});}function r(t,u,v,w){v.suppress_http_code=1;if(!v.method)v.method=u;var x=k.encode(v);if(u==='get'&&t.length+x.length<2000){t=k.appendToUrl(t,x);x='';}else u='post';if(!m){if(!i.isAvailable())return false;m=new l();q();}m.enqueue({method:u,url:t,body:x,callback:w});return true;}var s={setSwfUrl:function(t){o=t;},execute:r};f.exports=s;},null);
__d('JSONPRequest',['DOMWrapper','GlobalCallback','QueryString'],function a(b,c,d,e,f,g,h,i,j){if(c.__markCompiled)c.__markCompiled();var k=2000;function l(n,o,p,q){var r=document.createElement('script'),s=function(u){s=function(){};i.remove(p.callback);q(u);r.parentNode.removeChild(r);};p.callback=i.create(s);if(!p.method)p.method=o;n=j.appendToUrl(n,p);if(n.length>k){i.remove(p.callback);return false;}r.onerror=function(){s({error:{type:'http',message:'unknown error'}});};var t=function(){setTimeout(function(){s({error:{type:'http',message:'unknown error'}});},0);};if(r.addEventListener){r.addEventListener('load',t,false);}else r.onreadystatechange=function(){if(/loaded|complete/.test(this.readyState))t();};r.src=n;h.getRoot().appendChild(r);return true;}var m={execute:l,MAX_QUERYSTRING_LENGTH:k};f.exports=m;},null);
__d('flattenObject',[],function a(b,c,d,e,f,g){if(c.__markCompiled)c.__markCompiled();function h(i){var j={};for(var k in i)if(i.hasOwnProperty(k)){var l=i[k];if(null===l||undefined===l){continue;}else if(typeof l=='string'){j[k]=l;}else j[k]=ES('JSON','stringify',false,l);}return j;}f.exports=h;},null);
__d('ApiClient',['ArgumentError','Assert','CORSRequest','FlashRequest','flattenObject','JSONPRequest','Log','ObservableMixin','QueryString','sprintf','sdk.URI','UrlMap','ApiClientConfig','invariant'],function a(b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u){if(c.__markCompiled)c.__markCompiled();var v,w,x,y=m.MAX_QUERYSTRING_LENGTH,z={get:true,post:true,'delete':true,put:true},aa={fql_query:true,fql_multiquery:true,friends_get:true,notifications_get:true,stream_get:true,users_getinfo:true},ba=['jsonp','cors','flash'],ca=[],da=[],ea=null,fa=0,ga=[],ha=0,ia=50,ja=105440539523;function ka(ua,va,wa,xa){var ya=ha!==0&&fa>=ha;if(ya){ga.push(function(){return ka(ua,va,wa,xa);});sa.inform('request.queued',ua,va,wa);return;}fa++;if(x)wa=ES('Object','assign',false,{},x,wa);wa.access_token=wa.access_token||v;wa.pretty=wa.pretty||0;wa=l(wa);var za={jsonp:m,cors:j,flash:k},ab;if(wa.transport){ab=[wa.transport];delete wa.transport;}else ab=ba;for(var bb=0;bb<ab.length;bb++){var cb=za[ab[bb]],db=ES('Object','assign',false,{},wa);if(cb.execute(ua,va,db,xa))return;}xa({error:{type:'no-transport',message:'Could not find a usable transport for request'}});}function la(ua,va,wa,xa,ya,za){if(za&&za.error)sa.inform('request.error',va,wa,xa,za,ES('Date','now',false)-ya);sa.inform('request.complete',va,wa,xa,za,ES('Date','now',false)-ya);fa--;if(ua)ua(za);var ab=ga.length>0&&fa<ha;if(ab){var bb=ga.shift();bb();}}function ma(ua){var va=ua.shift();i.isString(va,'Invalid path');if(!/^https?/.test(va)&&va.charAt(0)!=='/')va='/'+va;var wa,xa={};try{wa=new r(va);}catch(ya){throw new h(ya.message,ya);}ES(ua,'forEach',true,function(cb){return xa[typeof cb]=cb;});var za=(xa.string||'get').toLowerCase();i.isTrue(z.hasOwnProperty(za),q('Invalid method passed to ApiClient: %s',za));var ab=xa['function'];if(!ab)n.warn('No callback passed to the ApiClient');if(xa.object)wa.addQueryData(l(xa.object));var bb=wa.getQueryData();bb.method=za;return {uri:wa,callback:ab,params:bb};}function na(){for(var ua=arguments.length,va=Array(ua),wa=0;wa<ua;wa++)va[wa]=arguments[wa];var xa=ma(va),ya=xa.uri,za=xa.callback,ab=xa.params,bb=ab.method;if(ta(ya,bb))bb='post';var cb=ya.getProtocol()&&ya.getDomain()?ya.setQueryData({}).toString():s.resolve('graph')+ya.getPath();sa.inform('request.prepare',cb,ab);ka(cb,bb=='get'?'get':'post',ab,ES(la,'bind',true,null,za,ya.getPath(),bb,ab,ES('Date','now',false)));}function oa(ua){var va=ma(ua),wa=va.uri,xa=va.callback,ya=va.params.method,za,ab=wa.removeQueryData('method').toString();if(ya.toLowerCase()=='post'){za=p.encode(wa.getQueryData());ab=wa.setQueryData({}).toString();}return {body:za,callback:xa,method:ya,relative_url:ab};}function pa(){for(var ua=arguments.length,va=Array(ua),wa=0;wa<ua;wa++)va[wa]=arguments[wa];var xa=oa(va),ya=xa.body,za=xa.callback,ab=xa.method,bb=xa.relative_url,cb={method:ab,relative_url:bb};if(ya)cb.body=ya;ca.push(cb);da.push(za);if(ca.length==ia){if(ea)clearTimeout(ea);qa();}else if(!ea)ea=setTimeout(qa,0);}function qa(){!(ca.length>0)?u(0):undefined;!(ca.length===da.length)?u(0):undefined;var ua=ca,va=da;ca=[];da=[];ea=null;if(ua.length===1){var wa=ua[0],xa=va[0],ya=wa.body?p.decode(wa.body):null;na(wa.relative_url,wa.method,ya,xa);return;}na('/','POST',{batch:ua,include_headers:false,batch_app_id:w||ja},function(za){if(ES('Array','isArray',false,za)){ES(za,'forEach',true,function(ab,bb){va[bb](ES('JSON','parse',false,ab.body));});}else ES(va,'forEach',true,function(ab){return (ab({error:{message:'Fatal: batch call failed.'}}));});});}function ra(ua,va){i.isObject(ua);i.isString(ua.method,'method missing');if(!va)n.warn('No callback passed to the ApiClient');var wa=ua.method.toLowerCase().replace('.','_');ua.format='json-strings';ua.api_key=w;var xa=wa in aa?'api_read':'api',ya=s.resolve(xa)+'/restserver.php',za=ES(la,'bind',true,null,va,'/restserver.php','get',ua,ES('Date','now',false));ka(ya,'get',ua,za);}var sa=ES('Object','assign',false,new o(),{setAccessToken:function(ua){v=ua;},setAccessTokenForClientID:function(ua,va){if(!(v&&w&&w!==va))v=ua;},getAccessToken:function(){return v;},setClientID:function(ua){w=ua;},setDefaultParams:function(ua){x=ua;},setDefaultTransports:function(ua){ba=ua;},setMaxConcurrentRequests:function(ua){ha=ua;},getCurrentlyExecutingRequestCount:function(){return fa;},getQueuedRequestCount:function(){return ga.length;},rest:ra,graph:na,scheduleBatchCall:pa,prepareBatchParams:oa});function ta(ua,va){return ua.toString().length>y&&va==='get';}k.setSwfUrl(t.FlashRequest.swfUrl);f.exports=sa;},null);
__d('sdk.PlatformVersioning',['sdk.Runtime','ManagedError'],function a(b,c,d,e,f,g,h,i){if(c.__markCompiled)c.__markCompiled();var j=/^v\d+\.\d\d?$/,k={REGEX:j,assertVersionIsSet:function(){if(!h.getVersion())throw new i('init not called with valid version');},assertValidVersion:function(l){if(!j.test(l))throw new i('invalid version specified');}};f.exports=k;},null);
__d('sdk.api',['ApiClient','sdk.PlatformVersioning','sdk.Runtime','sdk.Scribe','sdk.URI','sdk.feature'],function a(b,c,d,e,f,g,h,i,j,k,l,m){if(c.__markCompiled)c.__markCompiled();var n=m('should_log_response_error',false),o;j.subscribe('ClientID.change',function(q){return h.setClientID(q);});j.subscribe('AccessToken.change',function(q){o=q;h.setAccessToken(q);});h.setDefaultParams({sdk:'joey'});h.subscribe('request.complete',function(q,r,s,t){var u=false;if(t&&typeof t=='object')if(t.error){if(t.error=='invalid_token'||t.error.type=='OAuthException'&&t.error.code==190)u=true;}else if(t.error_code)if(t.error_code=='190')u=true;if(u&&o===j.getAccessToken())j.setAccessToken(null);});h.subscribe('request.complete',function(q,r,s,t){if((q=='/me/permissions'&&r==='delete'||q=='/restserver.php'&&s.method=='Auth.revokeAuthorization')&&t===true)j.setAccessToken(null);});h.subscribe('request.error',function(q,r,s,t){if(n&&t.error.type==='http')k.log('jssdk_error',{appId:j.getClientID(),error:'transport',extra:{name:'transport',message:ES('JSON','stringify',false,t.error)}});});function p(q){if(typeof q==='string'){if(j.getIsVersioned()){i.assertVersionIsSet();if(!/https?/.test(q)&&q.charAt(0)!=='/')q='/'+q;q=new l(q).setDomain(null).setProtocol(null).toString();if(!i.REGEX.test(q.substring(1,ES(q,'indexOf',true,'/',1))))q='/'+j.getVersion()+q;var r=[q].concat(Array.prototype.slice.call(arguments,1));h.graph.apply(h,r);}else h.graph.apply(h,arguments);}else h.rest.apply(h,arguments);}f.exports=p;},null);
__d('legacy:fb.api',['FB','sdk.api'],function a(b,c,d,e,f,g,h,i){if(c.__markCompiled)c.__markCompiled();h.provide('',{api:i});},3);
__d('sdk.AppEvents',['Assert','sdk.Impressions','sdk.Runtime'],function a(b,c,d,e,f,g,h,i,j){if(c.__markCompiled)c.__markCompiled();var k={COMPLETED_REGISTRATION:'fb_mobile_complete_registration',VIEWED_CONTENT:'fb_mobile_content_view',SEARCHED:'fb_mobile_search',RATED:'fb_mobile_rate',COMPLETED_TUTORIAL:'fb_mobile_tutorial_completion',ADDED_TO_CART:'fb_mobile_add_to_cart',ADDED_TO_WISHLIST:'fb_mobile_add_to_wishlist',INITIATED_CHECKOUT:'fb_mobile_initiated_checkout',ADDED_PAYMENT_INFO:'fb_mobile_add_payment_info',ACHIEVED_LEVEL:'fb_mobile_level_achieved',UNLOCKED_ACHIEVEMENT:'fb_mobile_achievement_unlocked',SPENT_CREDITS:'fb_mobile_spent_credits'},l={ACTIVATED_APP:'fb_mobile_activate_app',PURCHASED:'fb_mobile_purchase'},m={CURRENCY:'fb_currency',REGISTRATION_METHOD:'fb_registration_method',CONTENT_TYPE:'fb_content_type',CONTENT_ID:'fb_content_id',SEARCH_STRING:'fb_search_string',SUCCESS:'fb_success',MAX_RATING_VALUE:'fb_max_rating_value',PAYMENT_INFO_AVAILABLE:'fb_payment_info_available',NUM_ITEMS:'fb_num_items',LEVEL:'fb_level',DESCRIPTION:'fb_description'},n=40,o='^[0-9a-zA-Z_]+[0-9a-zA-Z _-]*$';function p(t,u,v,w){h.isTrue(q(u),'Invalid event name: '+u+'. '+'It must be between 1 and '+n+' characters, '+'and must be contain only alphanumerics, _, - or spaces, '+'starting with alphanumeric or _.');var x={ae:1,ev:u,vts:v,canvas:j.isCanvasEnvironment()?1:0};if(w)x.cd=w;i.impression({api_key:t,payload:ES('JSON','stringify',false,x)});}function q(t){if(t===null||t.length===0||t.length>n||!new RegExp(o).test(t))return false;return true;}function r(t,u,v,w){var x={};x[m.CURRENCY]=v;p(t,l.PURCHASED,u,babelHelpers['extends']({},w,x));}function s(t){p(t,l.ACTIVATED_APP);}f.exports={activateApp:s,logEvent:p,logPurchase:r,isValidEventName:q,EventNames:k,ParameterNames:m};},null);
__d('legacy:fb.appevents',['Assert','sdk.AppEvents','FB','sdk.feature','sdk.Runtime'],function a(b,c,d,e,f,g,h,i,j,k,l){if(c.__markCompiled)c.__markCompiled();j.provide('AppEvents',{logEvent:function(m,n,o){h.isTrue(k('allow_non_canvas_app_events',false)||l.isCanvasEnvironment(),'You can only use this function in Facebook Canvas environment');h.isString(m,'Invalid eventName');h.maybeNumber(n,'Invalid valueToSum');h.maybeObject(o,'Invalid params');var p=l.getClientID();h.isTrue(p!==null&&p.length>0,'You need to call FB.init() with App ID first.');i.logEvent(p,m,n,o);},logPurchase:function(m,n,o){h.isTrue(k('allow_non_canvas_app_events',false)||l.isCanvasEnvironment(),'You can only use this function in Facebook Canvas environment');h.isNumber(m,'Invalid purchaseAmount');h.isString(n,'Invalid currency');h.maybeObject(o,'Invalid params');var p=l.getClientID();h.isTrue(p!==null&&p.length>0,'You need to call FB.init() with App ID first.');i.logPurchase(p,m,n,o);},activateApp:function(){h.isTrue(k('allow_non_canvas_app_events',false)||l.isCanvasEnvironment(),'You can only use this function in Facebook Canvas environment');var m=l.getClientID();h.isTrue(m!==null&&m.length>0,'You need to call FB.init() with App ID first.');i.activateApp(m);},EventNames:i.EventNames,ParameterNames:i.ParameterNames});},3);
__d('resolveURI',[],function a(b,c,d,e,f,g){if(c.__markCompiled)c.__markCompiled();function h(i){if(!i)return window.location.href;i=i.replace(/&/g,'&amp;').replace(/"/g,'&quot;');var j=document.createElement('div');j.innerHTML='<a href="'+i+'"></a>';return j.firstChild.href;}f.exports=h;},null);
__d('sdk.Canvas.Environment',['sdk.RPC'],function a(b,c,d,e,f,g,h){if(c.__markCompiled)c.__markCompiled();function i(l){h.remote.getPageInfo(function(m){l(m.result);});}function j(l,m){h.remote.scrollTo({x:l||0,y:m||0});}h.stub('getPageInfo');h.stub('scrollTo');var k={getPageInfo:i,scrollTo:j};f.exports=k;},null);
__d('sdk.DialogUtils',['sdk.Content','sdk.DOM','DOMEventListener','sdk.UA','sdk.feature'],function a(b,c,d,e,f,g,h,i,j,k,l){'use strict';if(c.__markCompiled)c.__markCompiled();var m={isOrientationPotrait:function(){return window.innerWidth<window.innerHeight;},addDoubleClickAction:function(n,o,p){var q=null;return j.add(n,'click',function(){if(q!==null){clearTimeout(q);q=null;o();}q=setTimeout(function(){q=null;},p);});},addMobileOrientationChangeAction:function(n){if(!k.mobile())return null;var event='onorientationchange' in window?'orientationchange':'resize',o=function(p){return setTimeout(function(q){return n(q);},50);};return j.add(window,event,o);},applyScreenDimensions:function(n){if(n==null)return;var o=i.getViewportInfo();n.style.minHeight=o.height||o.width?o.height+'px':'';n.style.top=o.scrollTop?o.scrollTop+'px':'';},setDialogPositionToCenter:function(n,o,p){var q=function(aa){return typeof aa==='number'?aa:parseInt(aa,10);},r=i.getViewportInfo(),s=q(n.offsetWidth),t=q(n.offsetHeight),u=r.scrollLeft+(r.width-s)/2,v=(r.height-t)/2.5;if(u<v)v=u;var w=r.height-t-v,x=(r.height-t)/2;if(p)x=p.scrollTop-p.offsetTop+(p.clientHeight-t)/2;if(x<v){x=v;}else if(x>w)x=w;x+=r.scrollTop;if(k.mobile()){var y=100;if(o){y+=(r.height-t)/2;i.addCss(document.body,'fb_reposition');}else{i.addCss(document.body,'fb_hidden');if(l('dialog_resize_refactor',false))document.body.style.width='auto';x=10000;}var z=i.getByClass('fb_dialog_padding',n);if(z.length)z[0].style.height=y+'px';}n.style.left=(u>0?u:0)+'px';n.style.top=(x>0?x:0)+'px';},setDialogPositionToTop:function(n,o,p){this.setDialogPositionToCenter(n,o,p);var q=i.getViewportInfo(),r=q.scrollTop+(q.height-n.offsetHeight)*.05;i.setStyle(n,'top',r+'px');},setDialogPositionToTopRight:function(n,o,p){this.setDialogPositionToCenter(n,o,p);var q=i.getViewportInfo(),r=(q.height-n.offsetHeight)*.05;r=r>20?20:r;var s=q.scrollTop+r,t=q.scrollLeft+q.width-r-n.offsetWidth;i.setStyle(n,'top',s+'px');i.setStyle(n,'left',t+'px');},setupNewDarkOverlay:function(){var n=document.createElement('div');n.setAttribute('id','fb_dialog_ipad_overlay');this.applyScreenDimensions(n);return n;},setupNewDialog:function(n){n=n||{};var o=document.createElement('div');if(n.closeIcon&&n.onClose){var p=document.createElement('a');p.className='fb_dialog_close_icon';j.add(p,'click',n.onClose);o.appendChild(p);}var q='fb_dialog';q+=' '+(n.classes||'');if(k.ie()){q+=' fb_dialog_legacy';ES(['vert_left','vert_right','horiz_top','horiz_bottom','top_left','top_right','bottom_left','bottom_right'],'forEach',true,function(u){var v=document.createElement('span');v.className='fb_dialog_'+u;o.appendChild(v);});}else q+=k.mobile()?' fb_dialog_mobile':' fb_dialog_advanced';o.className=q;if(n.width){var r=parseInt(n.width,10);if(!isNaN(r))o.style.width=r+'px';}var s=document.createElement('div');if(n.content)h.append(n.content,s);s.className='fb_dialog_content';o.appendChild(s);if(k.mobile()){var t=document.createElement('div');t.className='fb_dialog_padding';o.appendChild(t);}return {dialogElement:o,contentRoot:s};}};f.exports=m;},null);
__d('sdk.fbt',[],function a(b,c,d,e,f,g){if(c.__markCompiled)c.__markCompiled();var h={_:function(i){return typeof i==='string'?i:i[0];}};f.exports=h;},null);
__d('sdk.Dialog',['sdk.Canvas.Environment','sdk.Content','sdk.DialogUtils','sdk.DOM','DOMEventListener','ObservableMixin','sdk.Runtime','Type','sdk.UA','sdk.fbt','sdk.feature'],function a(b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r){if(c.__markCompiled)c.__markCompiled();var s=30,t=590,u=500,v=240,w=575;function x(){if(r('dialog_resize_refactor',false)){var aa=k.getViewportInfo();if(aa.height&&aa.width)return {width:Math.min(aa.width,u),height:Math.min(aa.height,t)};}return null;}var y=o.extend({constructor:function aa(ba,ca){this.parent();this.id=ba;this.display=ca;this._e2e={};if(!z._dialogs){z._dialogs={};z._addOrientationHandler();}z._dialogs[ba]=this;this.trackEvent('init');},trackEvent:function(aa,ba){if(this._e2e[aa])return this;this._e2e[aa]=ba||ES('Date','now',false);if(aa=='close')this.inform('e2e:end',this._e2e);return this;},trackEvents:function(aa){if(typeof aa==='string')aa=ES('JSON','parse',false,aa);for(var ba in aa)if(aa.hasOwnProperty(ba))this.trackEvent(ba,aa[ba]);return this;}},m),z={newInstance:function(aa,ba){return new y(aa,ba);},_dialogs:null,_lastYOffset:0,_overlayListeners:[],_loaderEl:null,_overlayEl:null,_stack:[],_active:null,_forceTabletStyle:null,_closeOnOverlayTap:null,_positionDialogAtTopWhenPortrait:null,get:function(aa){return z._dialogs[aa];},_findRoot:function(aa){while(aa){if(k.containsCss(aa,'fb_dialog'))return aa;aa=aa.parentNode;}},_createWWWLoader:function(aa){aa=aa?aa:460;return z.create({content:'<div class="dialog_title">'+'  <a id="fb_dialog_loader_close">'+'    <div class="fb_dialog_close_icon"></div>'+'  </a>'+'  <span>Facebook</span>'+'  <div style="clear:both;"></div>'+'</div>'+'<div class="dialog_content"></div>'+'<div class="dialog_footer"></div>',width:aa});},_createMobileLoader:function(){var aa;if(p.nativeApp()){aa='<div class="dialog_header"></div>';}else if(z.isTabletStyle()){aa='<div class="overlayLoader">'+'<div id="fb_dialog_loader_spinner"></div>'+'<a id="fb_dialog_loader_close" href="#">'+q._("Cancel")+'</a>'+'</div>';}else aa='<div class="dialog_header">'+'<table>'+'  <tbody>'+'    <tr>'+'      <td class="header_left">'+'        <label class="touchable_button">'+'          <input type="submit" value="'+q._("Cancel")+'"'+'            id="fb_dialog_loader_close"/>'+'        </label>'+'      </td>'+'      <td class="header_center">'+'        <div>'+'         '+q._("Loading...")+'        </div>'+'      </td>'+'      <td class="header_right">'+'      </td>'+'    </tr>'+'  </tbody>'+'</table>'+'</div>';return z.create({classes:'loading'+(z.isTabletStyle()?' centered':''),content:aa});},_restoreBodyPosition:function(){var aa=document.body;if(z.isTabletStyle()){k.removeCss(aa,'fb_reposition');}else k.removeCss(aa,'fb_hidden');},_setDialogOverlayStyle:function(){j.applyScreenDimensions(z._overlayEl);},_showTabletOverlay:function(aa){if(!z.isTabletStyle())return;if(!z._overlayEl){z._overlayEl=j.setupNewDarkOverlay();i.append(z._overlayEl,null);}if(z._closeOnOverlayTap){var ba=j.addDoubleClickAction(z._overlayEl,ES(aa,'bind',true,this),5000);z._overlayListeners.push(ba);}z._overlayEl.className='';},_hideTabletOverlay:function(){if(z.isTabletStyle()){z._overlayEl.className='hidden';ES(z._overlayListeners,'forEach',true,function(aa){return aa.remove();});z._overlayListeners=[];}},showLoader:function(aa,ba){if(!aa)aa=function(){};var ca=function(){z._hideLoader();z._restoreBodyPosition();z._hideTabletOverlay();aa();};z._showTabletOverlay(ca);if(!z._loaderEl)z._loaderEl=z._findRoot(p.mobile()?z._createMobileLoader():z._createWWWLoader(ba));var da=document.getElementById('fb_dialog_loader_close');if(da){k.removeCss(da,'fb_hidden');var ea=l.add(da,'click',ca);z._overlayListeners.push(ea);}z._makeActive(z._loaderEl);},setCloseOnOverlayTap:function(aa){z._closeOnOverlayTap=!!aa;},setPositionDialogAtTopWhenPortrait:function(aa){z._positionDialogAtTopWhenPortrait=!!aa;},_hideLoader:function(){if(z._loaderEl&&z._loaderEl==z._active)z._loaderEl.style.top='-10000px';},_makeActive:function(aa){z._setDialogSizes();z._lowerActive();z._active=aa;if(n.isEnvironment(n.ENVIRONMENTS.CANVAS))h.getPageInfo(function(ba){z._centerActive(ba);});z._centerActive();},_lowerActive:function(){if(!z._active)return;z._active.style.top='-10000px';z._active=null;},_removeStacked:function(aa){z._stack=ES(z._stack,'filter',true,function(ba){return ba!=aa;});},_centerActive:function(aa){var ba=z._active;if(!ba)return;if(z._positionDialogAtTopWhenPortrait&&j.isOrientationPotrait()){j.setDialogPositionToTop(ba,z.isTabletStyle(),aa);}else j.setDialogPositionToCenter(ba,z.isTabletStyle(),aa);},_setDialogSizes:function(){var aa=arguments.length<=0||arguments[0]===undefined?false:arguments[0];if(!p.mobile())return;for(var ba in z._dialogs)if(z._dialogs.hasOwnProperty(ba)){var ca=document.getElementById(ba);if(ca){ca.style.width=z.getDefaultSize().width+'px';if(!aa)ca.style.height=z.getDefaultSize().height+'px';}}},getDefaultSize:function(){if(p.mobile()){var aa=x();if(aa){if(k.getViewportInfo().width<=aa.width)aa.width=k.getViewportInfo().width-s;if(k.getViewportInfo().height<=aa.height)aa.height=k.getViewportInfo().height-s;return aa;}if(p.ipad())return {width:u,height:t};if(p.android()){return {width:screen.availWidth,height:screen.availHeight};}else{var ba=window.innerWidth,ca=window.innerHeight,da=ba/ca>1.2;return {width:ba,height:Math.max(ca,da?screen.width:screen.height)};}}return {width:w,height:v};},_handleOrientationChange:function(){var aa=r('dialog_resize_refactor',false)?k.getViewportInfo().width:screen.availWidth;z._availScreenWidth=aa;if(z.isTabletStyle()){z._setDialogSizes(true);z._centerActive();z._setDialogOverlayStyle();}else{var ba=z.getDefaultSize().width;for(var ca in z._dialogs)if(z._dialogs.hasOwnProperty(ca)){var da=document.getElementById(ca);if(da)da.style.width=ba+'px';}}},_addOrientationHandler:function(){if(!p.mobile())return null;z._availScreenWidth=r('dialog_resize_refactor',false)?k.getViewportInfo().width:screen.availWidth;j.addMobileOrientationChangeAction(z._handleOrientationChange);},create:function(aa){var ba=j.setupNewDialog(aa);i.append(ba.dialogElement);if(aa.visible)z.show(ba.dialogElement);return ba.contentRoot;},show:function(aa){var ba=z._findRoot(aa);if(ba){z._removeStacked(ba);z._hideLoader();z._makeActive(ba);z._stack.push(ba);if('fbCallID' in aa)z.get(aa.fbCallID).inform('iframe_show').trackEvent('show');}},hide:function(aa){var ba=z._findRoot(aa);z._hideLoader();if(ba==z._active){z._lowerActive();z._restoreBodyPosition();z._hideTabletOverlay();if('fbCallID' in aa)z.get(aa.fbCallID).inform('iframe_hide').trackEvent('hide');}},remove:function(aa){aa=z._findRoot(aa);if(aa){var ba=z._active==aa;z._removeStacked(aa);if(ba){z._hideLoader();if(z._stack.length>0){z.show(z._stack.pop());}else{z._lowerActive();z._restoreBodyPosition();z._hideTabletOverlay();}}else if(z._active===null&&z._stack.length>0)z.show(z._stack.pop());setTimeout(function(){aa.parentNode.removeChild(aa);},3000);}},isActive:function(aa){var ba=z._findRoot(aa);return ba&&ba===z._active;},setForceTabletStyle:function(aa){z._forceTabletStyle=!!aa;},isTabletStyle:function(){var aa;if(!p.mobile())return false;if(z._forceTabletStyle)return true;if(r('dialog_resize_refactor',false)){var ba=x();aa=ba&&(ba.height>=t||ba.width>=u);}else aa=!!p.ipad();return aa;}};f.exports=z;},null);
__d('sdk.Frictionless',['sdk.Auth','sdk.api','sdk.Event','sdk.Dialog'],function a(b,c,d,e,f,g,h,i,j,k){if(c.__markCompiled)c.__markCompiled();var l={_allowedRecipients:{},_useFrictionless:false,_updateRecipients:function(){l._allowedRecipients={};i('/me/apprequestformerrecipients',function(m){if(!m||m.error)return;ES(m.data,'forEach',true,function(n){l._allowedRecipients[n.recipient_id]=true;});});},init:function(){l._useFrictionless=true;h.getLoginStatus(function(m){if(m.status=='connected')l._updateRecipients();});j.subscribe('auth.login',function(m){if(m.authResponse)l._updateRecipients();});},_processRequestResponse:function(m,n){return function(o){var p=o&&o.updated_frictionless;if(l._useFrictionless&&p)l._updateRecipients();if(o){if(!n&&o.frictionless){k._hideLoader();k._restoreBodyPosition();k._hideIPadOverlay();}delete o.frictionless;delete o.updated_frictionless;}m&&m(o);};},isAllowed:function(m){if(!m)return false;if(typeof m==='number')return m in l._allowedRecipients;if(typeof m==='string')m=m.split(',');m=ES(m,'map',true,function(p){return ES(String(p),'trim',true);});var n=true,o=false;ES(m,'forEach',true,function(p){n=n&&p in l._allowedRecipients;o=true;});return n&&o;}};j.subscribe('init:post',function(m){if(m.frictionlessRequests)l.init();});f.exports=l;},null);
__d('sdk.Native',['Log','sdk.UA'],function a(b,c,d,e,f,g,h,i){if(c.__markCompiled)c.__markCompiled();var j='fbNativeReady',k={onready:function(l){if(!i.nativeApp()){h.error('FB.Native.onready only works when the page is rendered '+'in a WebView of the native Facebook app. Test if this is the '+'case calling FB.UA.nativeApp()');return;}if(window.__fbNative&&!this.nativeReady)ES('Object','assign',false,this,window.__fbNative);if(this.nativeReady){l();}else{var m=function(n){window.removeEventListener(j,m);this.onready(l);};window.addEventListener(j,m,false);}}};f.exports=k;},null);
__d('sdk.UIServer',['sdk.Auth','sdk.Content','sdk.DOM','sdk.Dialog','sdk.Event','sdk.Frictionless','Log','sdk.Native','QueryString','sdk.RPC','sdk.Runtime','JSSDKConfig','sdk.UA','UrlMap','sdk.XD','createObjectFrom','sdk.feature','sdk.fbt','flattenObject','sdk.getContextType','guid','insertIframe','resolveURI'],function a(b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,aa,ba,ca,da){if(c.__markCompiled)c.__markCompiled();var ea={transform:function(ka){if(ka.params.display==='touch'&&ja.canIframe(ka.params)&&window.postMessage){ka.params.channel=ja._xdChannelHandler(ka.id,'parent');if(!t.nativeApp())ka.params.in_iframe=1;return ka;}else return ja.genericTransform(ka);},getXdRelation:function(ka){var la=ka.display;if(la==='touch'&&window.postMessage&&ka.in_iframe)return 'parent';return ja.getXdRelation(ka);}},fa={'stream.share':{size:{width:670,height:340},url:'sharer.php',transform:function(ka){if(!ka.params.u)ka.params.u=window.location.toString();ka.params.display='popup';return ka;}},apprequests:{transform:function(ka){ka=ea.transform(ka);ka.params.frictionless=m&&m._useFrictionless;if(ka.params.frictionless){if(m.isAllowed(ka.params.to)){ka.params.display='iframe';ka.params.in_iframe=true;ka.hideLoader=true;}ka.cb=m._processRequestResponse(ka.cb,ka.hideLoader);}ka.closeIcon=false;return ka;},getXdRelation:ea.getXdRelation},'permissions.oauth':{url:'dialog/oauth',size:{width:t.mobile()?null:475,height:t.mobile()?null:183},transform:function(ka){if(!r.getClientID()){n.error('FB.login() called before FB.init().');return;}if(h.getAuthResponse()&&!ka.params.scope&&!ka.params.auth_type){n.error('FB.login() called when user is already connected.');ka.cb&&ka.cb({status:r.getLoginStatus(),authResponse:h.getAuthResponse()});return;}var la=ka.cb,ma=ka.id;delete ka.cb;var na=ES('Object','keys',false,ES('Object','assign',false,ka.params.response_type?w(ka.params.response_type.split(',')):{},{token:true,signed_request:true})).join(',');if(ka.params.display==='async'){ES('Object','assign',false,ka.params,{client_id:r.getClientID(),origin:aa(),response_type:na,domain:location.hostname});ka.cb=h.xdResponseWrapper(la,h.getAuthResponse(),'permissions.oauth');}else ES('Object','assign',false,ka.params,{client_id:r.getClientID(),redirect_uri:da(ja.xdHandler(la,ma,'opener',h.getAuthResponse(),'permissions.oauth')),origin:aa(),response_type:na,domain:location.hostname});return ka;}},'auth.logout':{url:'logout.php',transform:function(ka){if(!r.getClientID()){n.error('FB.logout() called before calling FB.init().');}else if(!h.getAuthResponse()){n.error('FB.logout() called without an access token.');}else{ka.params.next=ja.xdHandler(ka.cb,ka.id,'parent',h.getAuthResponse(),'logout');return ka;}}},'login.status':{url:'dialog/oauth',transform:function(ka){var la=ka.cb,ma=ka.id;delete ka.cb;ES('Object','assign',false,ka.params,{client_id:r.getClientID(),redirect_uri:ja.xdHandler(la,ma,'parent',h.getAuthResponse(),'login_status'),origin:aa(),response_type:'token,signed_request,code',domain:location.hostname});return ka;}},pay:{size:{width:555,height:120},connectDisplay:'popup'}},ga={};function ha(ka,la){ga[la]=true;return function(ma){delete ga[la];ka(ma);};}function ia(ka){if(!x('should_force_single_dialog_instance',true))return false;var la=ka.method.toLowerCase();if(la==='pay'&&ka.display==='async')return true;return false;}var ja={Methods:fa,_loadedNodes:{},_defaultCb:{},_resultToken:'"xxRESULTTOKENxx"',genericTransform:function(ka){if(ka.params.display=='dialog'||ka.params.display=='iframe')ES('Object','assign',false,ka.params,{display:'iframe',channel:ja._xdChannelHandler(ka.id,'parent.parent')},true);return ka;},checkOauthDisplay:function(ka){var la=ka.scope||ka.perms||r.getScope();if(!la)return ka.display;var ma=la.split(/\s|,/g);for(var na=0;na<ma.length;na++)if(!s.initSitevars.iframePermissions[ES(ma[na],'trim',true)])return 'popup';return ka.display;},prepareCall:function(ka,la){var ma=ka.method.toLowerCase(),na=ja.Methods.hasOwnProperty(ma)?ES('Object','assign',false,{},ja.Methods[ma]):{},oa=ba(),pa=r.getSecure()||ma!=='auth.status'&&ma!='login.status';ES('Object','assign',false,ka,{app_id:r.getClientID(),locale:r.getLocale(),sdk:'joey',access_token:pa&&r.getAccessToken()||undefined});if(ma==='share'||ma==='share_open_graph')if(ka.iframe_test)na=ES('Object','assign',false,{},ea);ka.display=ja.getDisplayMode(na,ka);if(!na.url)na.url='dialog/'+ma;if((na.url=='dialog/oauth'||na.url=='dialog/permissions.request')&&(ka.display=='iframe'||ka.display=='touch'&&ka.in_iframe))ka.display=ja.checkOauthDisplay(ka);if(ka.display=='popup')delete ka.access_token;if(r.getIsVersioned()&&na.url.substring(0,7)==='dialog/')na.url=ka.version+'/'+na.url;if(ia(ka)){if(ga[ma]){var qa='Dialog "'+ma+'" is trying to run more than once.';n.warn(qa);la({error_code:-100,error_message:qa});return;}la=ha(la,ma);}var ra={cb:la,id:oa,size:na.size||ja.getDefaultSize(),url:u.resolve(ka.display=='touch'?'m':'www',pa)+'/'+na.url,params:ka,name:ma,dialog:k.newInstance(oa,ka.display)},sa=na.transform?na.transform:ja.genericTransform;if(sa){ra=sa(ra);if(!ra)return;}if(ka.display==='touch'&&ka.in_iframe)ra.params.parent_height=window.innerHeight;var ta=na.getXdRelation||ja.getXdRelation,ua=ta(ra.params);if(!(ra.id in ja._defaultCb)&&!('next' in ra.params)&&!('redirect_uri' in ra.params))ra.params.next=ja._xdResult(ra.cb,ra.id,ua,true);if(ua==='parent')ES('Object','assign',false,ra.params,{channel_url:ja._xdChannelHandler(oa,'parent.parent')},true);ra=ja.prepareParams(ra);return ra;},prepareParams:function(ka){if(ka.params.display!=='async')delete ka.params.method;ka.params=z(ka.params);var la=p.encode(ka.params);if(!t.nativeApp()&&ja.urlTooLongForIE(ka.url+'?'+la)){ka.post=true;}else if(la)ka.url+='?'+la;return ka;},urlTooLongForIE:function(ka){return t.ie()&&t.ie()<=8&&ka.length>2048;},getDisplayMode:function(ka,la){if(la.display==='hidden'||la.display==='none')return la.display;var ma=r.isEnvironment(r.ENVIRONMENTS.CANVAS)||r.isEnvironment(r.ENVIRONMENTS.PAGETAB);if(ma&&!la.display)return 'async';if(t.mobile()||la.display==='touch')return 'touch';if(la.display=='iframe'||la.display=='dialog')if(!ja.canIframe(la)){n.error('"dialog" mode can only be used when the user is connected.');return 'popup';}if(ka.connectDisplay&&!ma)return ka.connectDisplay;return la.display||(ja.canIframe(la)?'dialog':'popup');},canIframe:function(ka){if(r.getAccessToken())return true;if(t.mobile()&&r.getLoggedIntoFacebook())return !!ka.iframe_test;return false;},getXdRelation:function(ka){var la=ka.display;if(la==='popup'||la==='touch')return 'opener';if(la==='dialog'||la==='iframe'||la==='hidden'||la==='none')return 'parent';if(la==='async')return 'parent.frames['+window.name+']';},popup:function(ka){var la=typeof window.screenX!='undefined'?window.screenX:window.screenLeft,ma=typeof window.screenY!='undefined'?window.screenY:window.screenTop,na=typeof window.outerWidth!='undefined'?window.outerWidth:document.documentElement.clientWidth,oa=typeof window.outerHeight!='undefined'?window.outerHeight:document.documentElement.clientHeight-22,pa=t.mobile()?null:ka.size.width,qa=t.mobile()?null:ka.size.height,ra=la<0?window.screen.width+la:la,sa=parseInt(ra+(na-pa)/2,10),ta=parseInt(ma+(oa-qa)/2.5,10),ua=[];if(pa!==null)ua.push('width='+pa);if(qa!==null)ua.push('height='+qa);ua.push('left='+sa);ua.push('top='+ta);ua.push('scrollbars=1');if(ka.name=='permissions.request'||ka.name=='permissions.oauth')ua.push('location=1,toolbar=0');ua=ua.join(',');var va;if(ka.post){va=window.open('about:blank',ka.id,ua);if(va){ja.setLoadedNode(ka,va,'popup');i.submitToTarget({url:ka.url,target:ka.id,params:ka.params});}}else{va=window.open(ka.url,ka.id,ua);if(va)ja.setLoadedNode(ka,va,'popup');}if(!va)return;if(ka.id in ja._defaultCb)ja._popupMonitor();},setLoadedNode:function(ka,la,ma){if(ma==='iframe')la.fbCallID=ka.id;la={node:la,type:ma,fbCallID:ka.id};ja._loadedNodes[ka.id]=la;},getLoadedNode:function(ka){var la=typeof ka=='object'?ka.id:ka,ma=ja._loadedNodes[la];return ma?ma.node:null;},hidden:function(ka){ka.className='FB_UI_Hidden';ka.root=i.appendHidden('');ja._insertIframe(ka);},iframe:function(ka){ka.className='FB_UI_Dialog';if(ka.params.iframe_test){k.setForceTabletStyle(true);k.setCloseOnOverlayTap(true);k.setPositionDialogAtTopWhenPortrait(true);}var la=function(){var ma=ES('JSON','stringify',false,{error_code:4201,error_message:y._("User canceled the Dialog flow")});ja._triggerDefault(ka.id,ma);};ka.root=k.create({onClose:la,closeIcon:ka.closeIcon===undefined?true:ka.closeIcon,classes:k.isTabletStyle()?'centered':''});if(!ka.hideLoader)k.showLoader(la,ka.size.width);j.addCss(ka.root,'fb_dialog_iframe');ja._insertIframe(ka);},touch:function(ka){if(ka.params&&ka.params.in_iframe){if(ka.ui_created){k.showLoader(function(){ja._triggerDefault(ka.id,null);},0);}else ja.iframe(ka);}else if(t.nativeApp()&&!ka.ui_created){ka.frame=ka.id;o.onready(function(){ja.setLoadedNode(ka,o.open(ka.url+'#cb='+ka.frameName),'native');});ja._popupMonitor();}else if(!ka.ui_created)ja.popup(ka);},async:function(ka){ka.params.redirect_uri=location.protocol+'//'+location.host+location.pathname;delete ka.params.access_token;q.remote.showDialog(ka.params,function(la){var ma=la.result;if(ma&&ma.e2e){var na=k.get(ka.id);na.trackEvents(ma.e2e);na.trackEvent('close');delete ma.e2e;}ka.cb(ma);});},getDefaultSize:function(){return k.getDefaultSize();},_insertIframe:function(ka){ja._loadedNodes[ka.id]=false;var la=function(ma){if(ka.id in ja._loadedNodes)ja.setLoadedNode(ka,ma,'iframe');};if(ka.post){ca({url:'about:blank',root:ka.root,className:ka.className,width:ka.size.width,height:ka.size.height,id:ka.id,onInsert:la,onload:function(ma){i.submitToTarget({url:ka.url,target:ma.name,params:ka.params});}});}else ca({url:ka.url,root:ka.root,className:ka.className,width:ka.size.width,height:ka.size.height,id:ka.id,name:ka.frameName,onInsert:la});},_handleResizeMessage:function(ka,la){var ma=ja.getLoadedNode(ka);if(!ma)return;if(la.height)ma.style.height=la.height+'px';if(la.width)ma.style.width=la.width+'px';v.inform('resize.ack',la||{},'parent.frames['+ma.name+']');if(!k.isActive(ma)){k.show(ma);}else k._centerActive();},_triggerDefault:function(ka,la){var ma={frame:ka};if(la)ma.result=la;ja._xdRecv(ma,ja._defaultCb[ka]||function(){});},_popupMonitor:function(){var ka;for(var la in ja._loadedNodes)if(ja._loadedNodes.hasOwnProperty(la)&&la in ja._defaultCb){var ma=ja._loadedNodes[la];if(ma.type!='popup'&&ma.type!='native')continue;var na=ma.node;try{if(na.closed){ja._triggerDefault(la,null);}else ka=true;}catch(oa){}}if(ka&&!ja._popupInterval){ja._popupInterval=setInterval(ja._popupMonitor,100);}else if(!ka&&ja._popupInterval){clearInterval(ja._popupInterval);ja._popupInterval=null;}},_xdChannelHandler:function(ka,la){return v.handler(function(ma){var na=ja.getLoadedNode(ka);if(!na)return;if(ma.type=='resize'){ja._handleResizeMessage(ka,ma);}else if(ma.type=='hide'){k.hide(na);}else if(ma.type=='rendered'){var oa=k._findRoot(na);k.show(oa);}else if(ma.type=='fireevent')l.fire(ma.event);},la,true,null);},_xdNextHandler:function(ka,la,ma,na){if(na)ja._defaultCb[la]=ka;return v.handler(function(oa){ja._xdRecv(oa,ka);},ma)+'&frame='+la;},_xdRecv:function(ka,la){var ma=ja.getLoadedNode(ka.frame);if(ma)if(ma.close){try{ma.close();if(/iPhone.*Version\/(5|6)/.test(navigator.userAgent)&&RegExp.$1!=='5')window.focus();ja._popupCount--;}catch(na){}}else if(j.containsCss(ma,'FB_UI_Hidden')){setTimeout(function(){ma.parentNode.parentNode.removeChild(ma.parentNode);},3000);}else if(j.containsCss(ma,'FB_UI_Dialog'))k.remove(ma);delete ja._loadedNodes[ka.frame];delete ja._defaultCb[ka.frame];if(ka.e2e){var oa=k.get(ka.frame);oa.trackEvents(ka.e2e);oa.trackEvent('close');delete ka.e2e;}la(ka);},_xdResult:function(ka,la,ma,na){return (ja._xdNextHandler(function(oa){ka&&ka(oa.result&&oa.result!=ja._resultToken&&ES('JSON','parse',false,oa.result));},la,ma,na)+'&result='+encodeURIComponent(ja._resultToken));},xdHandler:function(ka,la,ma,na,oa){return ja._xdNextHandler(h.xdResponseWrapper(ka,na,oa),la,ma,true);}};q.stub('showDialog');f.exports=ja;},null);
__d('sdk.ui',['Assert','sdk.Impressions','Log','sdk.PlatformVersioning','sdk.Runtime','sdk.UIServer','sdk.feature'],function a(b,c,d,e,f,g,h,i,j,k,l,m,n){if(c.__markCompiled)c.__markCompiled();function o(p,q){h.isObject(p);h.maybeFunction(q);if(l.getIsVersioned()){k.assertVersionIsSet();if(p.version){k.assertValidVersion(p.version);}else p.version=l.getVersion();}p=ES('Object','assign',false,{},p);if(!p.method){j.error('"method" is a required parameter for FB.ui().');return null;}if(p.method=='pay.prompt')p.method='pay';var r=p.method;if(p.redirect_uri){j.warn('When using FB.ui, you should not specify a redirect_uri.');delete p.redirect_uri;}if((r=='permissions.request'||r=='permissions.oauth')&&(p.display=='iframe'||p.display=='dialog'))p.display=m.checkOauthDisplay(p);var s=n('e2e_tracking',true);if(s)p.e2e={};var t=m.prepareCall(p,q||function(){});if(!t)return null;var u=t.params.display;if(u==='dialog'){u='iframe';}else if(u==='none')u='hidden';var v=m[u];if(!v){j.error('"display" must be one of "popup", '+'"dialog", "iframe", "touch", "async", "hidden", or "none"');return null;}if(s)t.dialog.subscribe('e2e:end',function(w){w.method=r;w.display=u;j.debug('e2e: %s',ES('JSON','stringify',false,w));i.log(114,{payload:w});});v(t);return t.dialog;}f.exports=o;},null);
__d('legacy:fb.auth',['sdk.Auth','sdk.Cookie','sdk.Event','FB','Log','sdk.Runtime','sdk.SignedRequest','sdk.ui'],function a(b,c,d,e,f,g,h,i,j,k,l,m,n,o){if(c.__markCompiled)c.__markCompiled();k.provide('',{getLoginStatus:function(){return h.getLoginStatus.apply(h,arguments);},getAuthResponse:function(){return h.getAuthResponse();},getAccessToken:function(){return m.getAccessToken()||null;},getUserID:function(){return m.getUserID()||m.getCookieUserID();},login:function(p,q){if(q&&q.perms&&!q.scope){q.scope=q.perms;delete q.perms;l.warn('OAuth2 specification states that \'perms\' '+'should now be called \'scope\'.  Please update.');}var r=m.isEnvironment(m.ENVIRONMENTS.CANVAS)||m.isEnvironment(m.ENVIRONMENTS.PAGETAB);o(babelHelpers['extends']({method:'permissions.oauth',display:r?'async':'popup',domain:location.hostname},q||{}),p);},logout:function(p){o({method:'auth.logout',display:'hidden'},p);}});h.subscribe('logout',ES(j.fire,'bind',true,j,'auth.logout'));h.subscribe('login',ES(j.fire,'bind',true,j,'auth.login'));h.subscribe('authresponse.change',ES(j.fire,'bind',true,j,'auth.authResponseChange'));h.subscribe('status.change',ES(j.fire,'bind',true,j,'auth.statusChange'));j.subscribe('init:post',function(p){if(p.status)h.getLoginStatus();if(m.getClientID())if(p.authResponse){h.setAuthResponse(p.authResponse,'connected');}else if(m.getUseCookie()){var q=i.loadSignedRequest(),r;if(q){try{r=n.parse(q);}catch(s){i.clearSignedRequestCookie();}if(r&&r.user_id)m.setCookieUserID(r.user_id);}i.loadMeta();}});},3);
__d('sdk.Canvas.IframeHandling',['DOMWrapper','sdk.RPC'],function a(b,c,d,e,f,g,h,i){if(c.__markCompiled)c.__markCompiled();var j=null,k;function l(){var p=h.getWindow().document,q=p.body,r=p.documentElement,s=Math.max(q.offsetTop,0),t=Math.max(r.offsetTop,0),u=q.scrollHeight+s,v=q.offsetHeight+s,w=r.scrollHeight+t,x=r.offsetHeight+t;return Math.max(u,v,w,x);}function m(p){if(typeof p!='object')p={};var q=0,r=0;if(!p.height){p.height=l();q=16;r=4;}if(!p.frame)p.frame=window.name||'iframe_canvas';if(k){var s=k.height,t=p.height-s;if(t<=r&&t>=-q)return false;}k=p;i.remote.setSize(p);return true;}function n(p,q){if(q===undefined&&typeof p==='number'){q=p;p=true;}if(p||p===undefined){if(j===null)j=setInterval(function(){m();},q||100);m();}else if(j!==null){clearInterval(j);j=null;}}i.stub('setSize');var o={setSize:m,setAutoGrow:n};f.exports=o;},null);
__d('sdk.Canvas.Navigation',['sdk.RPC'],function a(b,c,d,e,f,g,h){if(c.__markCompiled)c.__markCompiled();function i(k){h.local.navigate=function(l){k({path:l});};h.remote.setNavigationEnabled(true);}h.stub('setNavigationEnabled');var j={setUrlHandler:i};f.exports=j;},null);
__d('sdk.Canvas.Plugin',['Log','sdk.RPC','sdk.Runtime','sdk.UA','sdk.api'],function a(b,c,d,e,f,g,h,i,j,k,l){if(c.__markCompiled)c.__markCompiled();var m='CLSID:D27CDB6E-AE6D-11CF-96B8-444553540000',n='CLSID:444785F1-DE89-4295-863A-D46C3A781394',o=null,p=k.osx()&&k.osx.getVersionParts(),q=!(p&&p[0]>10&&p[1]>10&&(k.chrome()>=31||k.webkit()>=537.71||k.firefox()>=25));function r(ba){ba._hideunity_savedstyle={};ba._hideunity_savedstyle.left=ba.style.left;ba._hideunity_savedstyle.position=ba.style.position;ba._hideunity_savedstyle.width=ba.style.width;ba._hideunity_savedstyle.height=ba.style.height;ba.style.left='-10000px';ba.style.position='absolute';ba.style.width='1px';ba.style.height='1px';}function s(ba){if(ba._hideunity_savedstyle){ba.style.left=ba._hideunity_savedstyle.left;ba.style.position=ba._hideunity_savedstyle.position;ba.style.width=ba._hideunity_savedstyle.width;ba.style.height=ba._hideunity_savedstyle.height;}}function t(ba){ba._old_visibility=ba.style.visibility;ba.style.visibility='hidden';}function u(ba){ba.style.visibility=ba._old_visibility||'';delete ba._old_visibility;}function v(ba){var ca=ba.type?ba.type.toLowerCase():null,da=ca==='application/x-shockwave-flash'||ba.classid&&ba.classid.toUpperCase()==m;if(!da)return false;var ea=/opaque|transparent/i;if(ea.test(ba.getAttribute('wmode')))return false;for(var fa=0;fa<ba.childNodes.length;fa++){var ga=ba.childNodes[fa];if(/param/i.test(ga.nodeName)&&/wmode/i.test(ga.name)&&ea.test(ga.value))return false;}return true;}function w(ba){var ca=ba.type?ba.type.toLowerCase():null;return ca==='application/vnd.unity'||ba.classid&&ba.classid.toUpperCase()==n;}function x(ba){var ca=ES('Array','from',false,window.document.getElementsByTagName('object'));ca=ca.concat(ES('Array','from',false,window.document.getElementsByTagName('embed')));var da=false,ea=false;ES(ca,'forEach',true,function(ga){var ha=v(ga),ia=q&&w(ga);if(!ha&&!ia)return;da=da||ha;ea=ea||ia;var ja=function(){if(ba.state==='opened'){if(ha){t(ga);}else r(ga);}else if(ha){u(ga);}else s(ga);};if(o){h.info('Calling developer specified callback');var ka={state:ba.state,elem:ga};o(ka);setTimeout(ja,200);}else ja();});if(Math.random()<=1/1000){var fa={unity:ea,flash:da};l(j.getClientID()+'/occludespopups','post',fa);}}i.local.hidePluginObjects=function(){h.info('hidePluginObjects called');x({state:'opened'});};i.local.showPluginObjects=function(){h.info('showPluginObjects called');x({state:'closed'});};i.local.showFlashObjects=i.local.showPluginObjects;i.local.hideFlashObjects=i.local.hidePluginObjects;function y(){t();r();}function z(){u();s();}var aa={_setHidePluginCallback:function(ba){o=ba;},hidePluginElement:y,showPluginElement:z};f.exports=aa;},null);
__d('sdk.Canvas.Tti',['sdk.RPC','sdk.Runtime'],function a(b,c,d,e,f,g,h,i){if(c.__markCompiled)c.__markCompiled();function j(o,p){var q={appId:i.getClientID(),time:ES('Date','now',false),name:p},r=[q];if(o)r.push(function(s){o(s.result);});h.remote.logTtiMessage.apply(null,r);}function k(){j(null,'StartIframeAppTtiTimer');}function l(o){j(o,'StopIframeAppTtiTimer');}function m(o){j(o,'RecordIframeAppTti');}h.stub('logTtiMessage');var n={setDoneLoading:m,startTimer:k,stopTimer:l};f.exports=n;},null);
__d('legacy:fb.canvas',['Assert','sdk.Canvas.Environment','sdk.Event','FB','sdk.Canvas.IframeHandling','sdk.Canvas.Navigation','sdk.Canvas.Plugin','sdk.RPC','sdk.Runtime','sdk.Canvas.Tti'],function a(b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q){if(c.__markCompiled)c.__markCompiled();k.provide('Canvas',{setSize:function(r){h.maybeObject(r,'Invalid argument');return l.setSize.apply(null,arguments);},setAutoGrow:function(){return l.setAutoGrow.apply(null,arguments);},getPageInfo:function(r){h.isFunction(r,'Invalid argument');return i.getPageInfo.apply(null,arguments);},scrollTo:function(r,s){h.maybeNumber(r,'Invalid argument');h.maybeNumber(s,'Invalid argument');return i.scrollTo.apply(null,arguments);},setDoneLoading:function(r){h.maybeFunction(r,'Invalid argument');return q.setDoneLoading.apply(null,arguments);},startTimer:function(){return q.startTimer.apply(null,arguments);},stopTimer:function(r){h.maybeFunction(r,'Invalid argument');return q.stopTimer.apply(null,arguments);},getHash:function(r){h.isFunction(r,'Invalid argument');return m.getHash.apply(null,arguments);},setHash:function(r){h.isString(r,'Invalid argument');return m.setHash.apply(null,arguments);},setUrlHandler:function(r){h.isFunction(r,'Invalid argument');return m.setUrlHandler.apply(null,arguments);}});o.local.fireEvent=ES(j.fire,'bind',true,j);j.subscribe('init:post',function(r){if(p.isEnvironment(p.ENVIRONMENTS.CANVAS)){h.isTrue(!r.hideFlashCallback||!r.hidePluginCallback,'cannot specify deprecated hideFlashCallback and new hidePluginCallback');n._setHidePluginCallback(r.hidePluginCallback||r.hideFlashCallback);}});},3);
__d('sdk.Canvas.Prefetcher',['JSSDKCanvasPrefetcherConfig','sdk.Runtime','sdk.api'],function a(b,c,d,e,f,g,h,i,j){if(c.__markCompiled)c.__markCompiled();var k={AUTOMATIC:0,MANUAL:1},l=h.sampleRate,m=h.blacklist,n=k.AUTOMATIC,o=[];function p(){var u={object:'data',link:'href',script:'src'};if(n==k.AUTOMATIC)ES(ES('Object','keys',false,u),'forEach',true,function(v){var w=u[v];ES(ES('Array','from',false,document.getElementsByTagName(v)),'forEach',true,function(x){if(x[w])o.push(x[w]);});});if(o.length===0)return;j(i.getClientID()+'/staticresources','post',{urls:ES('JSON','stringify',false,o),is_https:location.protocol==='https:'});o=[];}function q(){if(!i.isEnvironment(i.ENVIRONMENTS.CANVAS)||!i.getClientID()||!l)return;if(Math.random()>1/l||m=='*'||~ES(m,'indexOf',true,i.getClientID()))return;setTimeout(p,30000);}function r(u){n=u;}function s(u){o.push(u);}var t={COLLECT_AUTOMATIC:k.AUTOMATIC,COLLECT_MANUAL:k.MANUAL,addStaticResource:s,setCollectionMode:r,_maybeSample:q};f.exports=t;},null);
__d('legacy:fb.canvas.prefetcher',['FB','sdk.Canvas.Prefetcher','sdk.Event','sdk.Runtime'],function a(b,c,d,e,f,g,h,i,j,k){if(c.__markCompiled)c.__markCompiled();h.provide('Canvas.Prefetcher',i);j.subscribe('init:post',function(l){if(k.isEnvironment(k.ENVIRONMENTS.CANVAS))i._maybeSample();});},3);
__d('legacy:fb.canvas.presence',['sdk.RPC','sdk.Event'],function a(b,c,d,e,f,g,h,i){if(c.__markCompiled)c.__markCompiled();i.subscribe(i.SUBSCRIBE,j);i.subscribe(i.UNSUBSCRIBE,k);h.stub('useFriendsOnline');function j(l,m){if(l!='canvas.friendsOnlineUpdated')return;if(m.length===1)h.remote.useFriendsOnline(true);}function k(l,m){if(l!='canvas.friendsOnlineUpdated')return;if(m.length===0)h.remote.useFriendsOnline(false);}},3);
__d('legacy:fb.canvas.syncrequests',['sdk.RPC','sdk.Event'],function a(b,c,d,e,f,g,h,i){if(c.__markCompiled)c.__markCompiled();h.stub('initPendingSyncRequests');function j(k,l){if(k!='canvas.syncRequestUpdated')return;h.remote.initPendingSyncRequests();i.unsubscribe(i.SUBSCRIBE,j);}i.subscribe(i.SUBSCRIBE,j);},3);
__d('legacy:fb.event',['FB','sdk.Event','sdk.Runtime','sdk.Scribe','sdk.feature'],function a(b,c,d,e,f,g,h,i,j,k,l){if(c.__markCompiled)c.__markCompiled();var m=[],n=null,o=l('event_subscriptions_log',false);h.provide('Event',{subscribe:function(p,q){if(o){m.push(p);if(!n)n=setTimeout(function(){k.log('jssdk_error',{appId:j.getClientID(),error:'EVENT_SUBSCRIPTIONS_LOG',extra:{line:0,name:'EVENT_SUBSCRIPTIONS_LOG',script:'N/A',stack:'N/A',message:m.sort().join(',')}});m.length=0;n=null;},o);}return i.subscribe(p,q);},unsubscribe:ES(i.unsubscribe,'bind',true,i)});},3);
__d('legacy:fb.frictionless',['FB','sdk.Frictionless'],function a(b,c,d,e,f,g,h,i){if(c.__markCompiled)c.__markCompiled();h.provide('Frictionless',i);},3);
__d('sdk.init',['sdk.Cookie','sdk.ErrorHandling','sdk.Event','sdk.Impressions','Log','ManagedError','sdk.PlatformVersioning','QueryString','sdk.Runtime','sdk.URI','sdk.feature'],function a(b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r){if(c.__markCompiled)c.__markCompiled();function s(u){var v=typeof u=='number'&&u>0||typeof u=='string'&&/^[0-9a-f]{21,}$|^[0-9]{1,21}$/.test(u);if(v)return u.toString();l.warn('Invalid App Id: Must be a number or numeric string representing '+'the application id.');return null;}function t(u){if(p.getInitialized())l.warn('FB.init has already been called - this could indicate a problem');if(p.getIsVersioned()){if(Object.prototype.toString.call(u)!=='[object Object]')throw new m('Invalid argument');if(u.authResponse)l.warn('Setting authResponse is not supported');if(!u.version)u.version=new q(location.href).getQueryData().sdk_version;n.assertValidVersion(u.version);p.setVersion(u.version);}else{if(/number|string/.test(typeof u)){l.warn('FB.init called with invalid parameters');u={apiKey:u};}u=ES('Object','assign',false,{status:true},u||{});}var v=s(u.appId||u.apiKey);if(v!==null)p.setClientID(v);if('scope' in u)p.setScope(u.scope);if(u.cookie){p.setUseCookie(true);if(typeof u.cookie==='string')h.setDomain(u.cookie);}if(u.kidDirectedSite)p.setKidDirectedSite(true);p.setInitialized(true);if(r('js_sdk_impression_on_load',true))k.log(115,{});j.fire('init:post',u);}setTimeout(function(){var u=/(connect\.facebook\.net|\.facebook\.com\/assets.php).*?#(.*)/;ES(ES('Array','from',false,fb_fif_window.document.getElementsByTagName('script')),'forEach',true,function(v){if(v.src){var w=u.exec(v.src);if(w){var x=o.decode(w[2]);for(var y in x)if(x.hasOwnProperty(y)){var z=x[y];if(z=='0')x[y]=0;}t(x);}}});if(window.fbAsyncInit&&!window.fbAsyncInit.hasRun){window.fbAsyncInit.hasRun=true;i.unguard(window.fbAsyncInit)();}},0);f.exports=t;},null);
__d('legacy:fb.init',['FB','sdk.init'],function a(b,c,d,e,f,g,h,i){if(c.__markCompiled)c.__markCompiled();h.provide('',{init:i});},3);
__d('legacy:fb.ui',['FB','sdk.ui'],function a(b,c,d,e,f,g,h,i){if(c.__markCompiled)c.__markCompiled();h.provide('',{ui:i});},3);
__d('legacy:fb.versioned-sdk',['sdk.Runtime'],function a(b,c,d,e,f,g,h){if(c.__markCompiled)c.__markCompiled();h.setIsVersioned(true);},3);
__d("runOnce",[],function a(b,c,d,e,f,g){if(c.__markCompiled)c.__markCompiled();function h(i){var j,k;return function(){if(!j){j=true;k=i();}return k;};}f.exports=h;},null);
__d('XFBML',['Assert','sdk.DOM','Log','ObservableMixin','sdk.UA','runOnce'],function a(b,c,d,e,f,g,h,i,j,k,l,m){if(c.__markCompiled)c.__markCompiled();var n={},o={},p=0,q=new k();function r(y,z){return ES(y[z]+'','trim',true);}function s(y){return y.scopeName?y.scopeName+':'+y.nodeName:'';}function t(y){return n[r(y,'nodeName').toLowerCase()]||n[s(y).toLowerCase()];}function u(y){var z=ES(r(y,'className').split(/\s+/),'filter',true,function(aa){return o.hasOwnProperty(aa);});if(z.length===0)return undefined;if(y.getAttribute('fb-xfbml-state')||!y.childNodes||y.childNodes.length===0||y.childNodes.length===1&&y.childNodes[0].nodeType===3||y.children.length===1&&r(y.children[0],'className')==='fb-xfbml-parse-ignore')return o[z[0]];}function v(y){var z={};ES(ES('Array','from',false,y.attributes),'forEach',true,function(aa){z[r(aa,'name')]=r(aa,'value');});return z;}function w(y,z,aa){var ba=document.createElement('div');i.addCss(y,z+'-'+aa);ES(ES('Array','from',false,y.childNodes),'forEach',true,function(ca){ba.appendChild(ca);});ES(ES('Array','from',false,y.attributes),'forEach',true,function(ca){ba.setAttribute(ca.name,ca.value);});y.parentNode.replaceChild(ba,y);return ba;}function x(y,z,aa){h.isTrue(y&&y.nodeType&&y.nodeType===1&&!!y.getElementsByTagName,'Invalid DOM node passed to FB.XFBML.parse()');h.isFunction(z,'Invalid callback passed to FB.XFBML.parse()');var ba=++p;j.info('XFBML Parsing Start %s',ba);var ca=1,da=0,ea=function(){ca--;if(ca===0){j.info('XFBML Parsing Finish %s, %s tags found',ba,da);z();q.inform('render',ba,da);}h.isTrue(ca>=0,'onrender() has been called too many times');};ES(ES('Array','from',false,y.getElementsByTagName('*')),'forEach',true,function(ga){if(!aa&&ga.getAttribute('fb-xfbml-state'))return;if(ga.nodeType!==1)return;var ha=t(ga)||u(ga);if(!ha)return;if(l.ie()<9&&ga.scopeName)ga=w(ga,ha.xmlns,ha.localName);ca++;da++;var ia=new ha.ctor(ga,ha.xmlns,ha.localName,v(ga));ia.subscribe('render',m(function(){ga.setAttribute('fb-xfbml-state','rendered');ea();}));var ja=function(){if(ga.getAttribute('fb-xfbml-state')=='parsed'){q.subscribe('render.queue',ja);}else{ga.setAttribute('fb-xfbml-state','parsed');ia.process();}};ja();});q.inform('parse',ba,da);var fa=30000;setTimeout(function(){if(ca>0)j.warn('%s tags failed to render in %s ms',ca,fa);},fa);ea();}q.subscribe('render',function(){var y=q.getSubscribers('render.queue');q.clearSubscribers('render.queue');ES(y,'forEach',true,function(z){z();});});ES('Object','assign',false,q,{registerTag:function(y){var z=y.xmlns+':'+y.localName;h.isUndefined(n[z],z+' already registered');n[z]=y;o[y.xmlns+'-'+y.localName]=y;},parse:function(y,z){x(y||document.body,z||function(){},true);},parseNew:function(){x(document.body,function(){},false);}});f.exports=q;},null);
__d('PluginPipe',['sdk.Content','sdk.feature','guid','insertIframe','Miny','ObservableMixin','JSSDKPluginPipeConfig','sdk.Runtime','sdk.UA','UrlMap','XFBML'],function a(b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r){if(c.__markCompiled)c.__markCompiled();var s=new m(),t=n.threshold,u=[];function v(){return !!(i('plugin_pipe',false)&&o.getSecure()!==undefined&&(p.chrome()||p.firefox())&&n.enabledApps[o.getClientID()]);}function w(){var y=u;u=[];if(y.length<=t){ES(y,'forEach',true,function(ba){k(ba.config);});return;}var z=y.length+1;function aa(){z--;if(z===0)x(y);}ES(y,'forEach',true,function(ba){var ca={};for(var da in ba.config)ca[da]=ba.config[da];ca.url=q.resolve('www',o.getSecure())+'/plugins/plugin_pipe_shell.php';ca.onload=aa;k(ca);});aa();}r.subscribe('parse',w);function x(y){var z=document.createElement('span');h.appendHidden(z);var aa={};ES(y,'forEach',true,function(fa){aa[fa.config.name]={plugin:fa.tag,params:fa.params};});var ba=ES('JSON','stringify',false,aa),ca=l.encode(ba);ES(y,'forEach',true,function(fa){var ga=document.getElementsByName(fa.config.name)[0];ga.onload=fa.config.onload;});var da=q.resolve('www',o.getSecure())+'/plugins/pipe.php',ea=j();k({url:'about:blank',root:z,name:ea,className:'fb_hidden fb_invisible',onload:function(){h.submitToTarget({url:da,target:ea,params:{plugins:ca.length<ba.length?ca:ba}});}});}ES('Object','assign',false,s,{add:function(y){var z=v();z&&u.push({config:y._config,tag:y._tag,params:y._params});return z;}});f.exports=s;},null);
__d('IframePlugin',['sdk.Auth','sdk.DOM','sdk.Event','Log','ObservableMixin','sdk.PlatformVersioning','PluginPipe','QueryString','sdk.Runtime','Type','sdk.UA','sdk.URI','UrlMap','sdk.XD','sdk.createIframe','sdk.feature','guid','resolveURI'],function a(b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y){if(c.__markCompiled)c.__markCompiled();var z={skin:'string',font:'string',width:'px',height:'px',ref:'string',color_scheme:'string'};function aa(ia,ja,ka){if(ja||ja===0)if(ja==='100%'){ia.style.width='100%';}else ia.style.width=ja+'px';if(ka||ka===0)ia.style.height=ka+'px';}function ba(ia){return function(ja){var ka={width:ja.width,height:ja.height,pluginID:ia};j.fire('xfbml.resize',ka);};}var ca={string:function(ia){return ia;},bool:function(ia){return ia?/^(?:true|1|yes|on)$/i.test(ia):undefined;},url:function(ia){return y(ia);},url_maybe:function(ia){return ia?y(ia):ia;},hostname:function(ia){return ia||window.location.hostname;},px:function(ia){return (/^(\d+)(?:px)?$/.test(ia)?parseInt(RegExp.$1,10):undefined);},text:function(ia){return ia;}};function da(ia,ja){var ka=ia[ja]||ia[ja.replace(/_/g,'-')]||ia[ja.replace(/_/g,'')]||ia['data-'+ja]||ia['data-'+ja.replace(/_/g,'-')]||ia['data-'+ja.replace(/_/g,'')]||undefined;return ka;}function ea(ia,ja,ka,la){ES(ES('Object','keys',false,ia),'forEach',true,function(ma){if(ia[ma]=='text'&&!ka[ma]){ka[ma]=ja.textContent||ja.innerText||'';ja.setAttribute(ma,ka[ma]);}la[ma]=ca[ia[ma]](da(ka,ma));});}function fa(ia){if(ia==='100%')return '100%';return ia||ia==='0'||ia===0?parseInt(ia,10):undefined;}function ga(ia){if(ia)aa(ia,0,0);}var ha=q.extend({constructor:function(ia,ja,ka,la){this.parent();ka=ka.replace(/-/g,'_');var ma=da(la,'plugin_id');this.subscribe('xd.resize',ba(ma));this.subscribe('xd.resize.flow',ba(ma));this.subscribe('xd.resize.flow',ES(function(sa){ES('Object','assign',false,this._iframeOptions.root.style,{verticalAlign:'bottom',overflow:''});aa(this._iframeOptions.root,fa(sa.width),fa(sa.height));this.updateLift();clearTimeout(this._timeoutID);},'bind',true,this));this.subscribe('xd.resize',ES(function(sa){ES('Object','assign',false,this._iframeOptions.root.style,{verticalAlign:'bottom',overflow:''});aa(this._iframeOptions.root,fa(sa.width),fa(sa.height));aa(this._iframe,fa(sa.width),fa(sa.height));this._isIframeResized=true;this.updateLift();clearTimeout(this._timeoutID);},'bind',true,this));this.subscribe('xd.resize.iframe',ES(function(sa){if(sa.reposition==='true'&&w('reposition_iframe',false))this.reposition(fa(sa.width));aa(this._iframe,fa(sa.width),fa(sa.height));this._isIframeResized=true;this.updateLift();clearTimeout(this._timeoutID);},'bind',true,this));this.subscribe('xd.sdk_event',function(sa){var ta=ES('JSON','parse',false,sa.data);ta.pluginID=ma;j.fire(sa.event,ta,ia);});var na=p.getSecure()||window.location.protocol=='https:',oa=t.resolve('www',na)+'/plugins/'+ka+'.php?',pa={};ea(this.getParams(),ia,la,pa);ea(z,ia,la,pa);ES('Object','assign',false,pa,{app_id:p.getClientID(),locale:p.getLocale(),sdk:'joey',kid_directed_site:p.getKidDirectedSite(),channel:u.handler(ES(function(sa){return this.inform('xd.'+sa.type,sa);},'bind',true,this),'parent.parent',true)});pa.container_width=ia.offsetWidth;i.addCss(ia,'fb_iframe_widget');var qa=x();this.subscribe('xd.verify',function(sa){u.sendToFacebook(qa,{method:'xd/verify',params:ES('JSON','stringify',false,sa.token)});});this.subscribe('xd.refreshLoginStatus',ES(function(){h.removeLogoutState();h.getLoginStatus(ES(this.inform,'bind',true,this,'login.status'),true);},'bind',true,this));var ra=document.createElement('span');ES('Object','assign',false,ra.style,{verticalAlign:'top',width:'0px',height:'0px',overflow:'hidden'});this._element=ia;this._ns=ja;this._tag=ka;this._params=pa;this._config=this.getConfig();this._iframeOptions={root:ra,url:oa+o.encode(pa),name:qa,width:this._config.mobile_fullsize&&r.mobile()?void 0:pa.width||1000,height:pa.height||1000,style:{border:'none',visibility:'hidden'},title:this._ns+':'+this._tag+' Facebook Social Plugin',onload:ES(function(){return this.inform('render');},'bind',true,this),onerror:ES(function(){return ga(this._iframe);},'bind',true,this)};if(this.isFluid()){i.addCss(this._element,'fb_iframe_widget_fluid_desktop');if(!pa.width&&this._config.full_width){this._element.style.width='100%';this._iframeOptions.root.style.width='100%';this._iframeOptions.style.width='100%';this._params.container_width=this._element.offsetWidth;this._iframeOptions.url=oa+o.encode(this._params);}}},process:function(){if(p.getIsVersioned()){m.assertVersionIsSet();var ia=new s(this._iframeOptions.url);this._iframeOptions.url=ia.setPath('/'+p.getVersion()+ia.getPath()).toString();}var ja=ES('Object','assign',false,{},this._params);delete ja.channel;var ka=o.encode(ja);if(this._element.getAttribute('fb-iframe-plugin-query')==ka){k.info('Skipping render: %s:%s %s',this._ns,this._tag,ka);this.inform('render');return;}this._element.setAttribute('fb-iframe-plugin-query',ka);this.subscribe('render',ES(function(){this._iframe.style.visibility='visible';if(!this._isIframeResized)ga(this._iframe);},'bind',true,this));while(this._element.firstChild)this._element.removeChild(this._element.firstChild);this._element.appendChild(this._iframeOptions.root);var la=r.mobile()?120:45;this._timeoutID=setTimeout(ES(function(){ga(this._iframe);k.warn('%s:%s failed to resize in %ss',this._ns,this._tag,la);},'bind',true,this),la*1000);if(!n.add(this))this._iframe=v(this._iframeOptions);if(r.mobile()){i.addCss(this._element,'fb_iframe_widget_fluid');if(!this._iframeOptions.width){ES('Object','assign',false,this._element.style,{display:'block',width:'100%',height:'auto'});ES('Object','assign',false,this._iframeOptions.root.style,{width:'100%',height:'auto'});var ma={height:'auto',position:'static',width:'100%'};if(r.iphone()||r.ipad())ES('Object','assign',false,ma,{width:'220px','min-width':'100%'});ES('Object','assign',false,this._iframe.style,ma);}}},getConfig:function(){return {};},isFluid:function(){var ia=this.getConfig();return ia.fluid;},reposition:function(ia){var ja=i.getPosition(this._iframe).x,ka=i.getViewportInfo().width,la=parseInt(i.getStyle(this._iframe,'width'),10),ma={};if(ja+ia>ka&&ja>ia){this._iframe.style.left=parseInt(i.getStyle(this._iframe,'width'),10)-ia+'px';this._isRepositioned=true;ma.type='reposition';}else if(this._isRepositioned&&la-ia!==0){this._iframe.style.left='0px';this._isRepositioned=false;ma.type='restore';}else return;u.sendToFacebook(this._iframe.name,{method:'xd/reposition',params:ES('JSON','stringify',false,ma)});},updateLift:function(){var ia=this._iframe.style.width===this._iframeOptions.root.style.width&&this._iframe.style.height===this._iframeOptions.root.style.height;i[ia?'removeCss':'addCss'](this._iframe,'fb_iframe_widget_lift');}},l);ha.getVal=da;ha.withParams=function(ia,ja){return ha.extend({getParams:function(){return ia;},getConfig:function(){return ja?ja:{};}});};f.exports=ha;},null);
__d('PluginConfig',['sdk.feature'],function a(b,c,d,e,f,g,h){if(c.__markCompiled)c.__markCompiled();var i={messengerpreconfirmation:{mobile_fullsize:true},messengeraccountconfirmation:{mobile_fullsize:true},messengerbusinesslink:{mobile_fullsize:true},messengertoggle:{mobile_fullsize:true},messengermessageus:{mobile_fullsize:true},post:{fluid:h('fluid_embed',false),mobile_fullsize:true}};f.exports=i;},null);
__d('PluginTags',[],function a(b,c,d,e,f,g){if(c.__markCompiled)c.__markCompiled();var h={composer:{action_type:'string',action_properties:'string'},create_event_button:{},follow:{href:'url',layout:'string',show_faces:'bool'},like:{href:'url',layout:'string',show_faces:'bool',share:'bool',action:'string',send:'bool'},like_box:{href:'string',show_faces:'bool',header:'bool',stream:'bool',force_wall:'bool',show_border:'bool',id:'string',connections:'string',profile_id:'string',name:'string'},page:{href:'string',hide_cta:'bool',hide_cover:'bool',small_header:'bool',adapt_container_width:'bool',show_facepile:'bool',show_posts:'bool',tabs:'string'},messengerpreconfirmation:{messenger_app_id:'string',page_id:'string'},messengeraccountconfirmation:{messenger_app_id:'string',page_id:'string',state:'string'},messengerbusinesslink:{messenger_app_id:'string',page_id:'string',state:'string'},messengertoggle:{messenger_app_id:'string',page_id:'string',token:'string',psid:'string'},messengermessageus:{messenger_app_id:'string',page_id:'string',color:'string',size:'string'},page_events:{href:'url'},post:{href:'url',show_text:'bool'},profile_pic:{uid:'string',linked:'bool',href:'string',size:'string',facebook_logo:'bool'},send:{href:'url'},send_to_mobile:{max_rows:'string',show_faces:'bool',size:'string'}},i={subscribe:'follow',fan:'like_box',likebox:'like_box'};ES(ES('Object','keys',false,i),'forEach',true,function(j){h[j]=h[i[j]];});f.exports=h;},null);
__d('sdk.Arbiter',[],function a(b,c,d,e,f,g){if(c.__markCompiled)c.__markCompiled();var h={BEHAVIOR_EVENT:'e',BEHAVIOR_PERSISTENT:'p',BEHAVIOR_STATE:'s'};f.exports=h;},null);
__d('sdk.XFBML.Element',['sdk.DOM','Type','ObservableMixin'],function a(b,c,d,e,f,g,h,i,j){if(c.__markCompiled)c.__markCompiled();var k=i.extend({constructor:function(l){this.parent();this.dom=l;},fire:function(){this.inform.apply(this,arguments);},getAttribute:function(l,m,n){var o=h.getAttr(this.dom,l);return o?n?n(o):o:m;},_getBoolAttribute:function(l,m){var n=h.getBoolAttr(this.dom,l);return n===null?m:n;},_getPxAttribute:function(l,m){return this.getAttribute(l,m,function(n){var o=parseInt(n,10);return isNaN(o)?m:o;});},_getLengthAttribute:function(l,m){return this.getAttribute(l,m,function(n){if(n==='100%')return n;var o=parseInt(n,10);return isNaN(o)?m:o;});},_getAttributeFromList:function(l,m,n){return this.getAttribute(l,m,function(o){o=o.toLowerCase();return ES(n,'indexOf',true,o)>-1?o:m;});},isValid:function(){for(var l=this.dom;l;l=l.parentNode)if(l==document.body)return true;},clear:function(){h.html(this.dom,'');}},j);f.exports=k;},null);
__d('sdk.XFBML.IframeWidget',['sdk.Arbiter','sdk.Auth','sdk.Content','sdk.DOM','sdk.Event','sdk.XFBML.Element','guid','insertIframe','QueryString','sdk.Runtime','sdk.ui','UrlMap','sdk.XD'],function a(b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t){if(c.__markCompiled)c.__markCompiled();var u=m.extend({_iframeName:null,_showLoader:true,_refreshOnAuthChange:false,_allowReProcess:false,_fetchPreCachedLoader:false,_visibleAfter:'load',_widgetPipeEnabled:false,_borderReset:false,_repositioned:false,getUrlBits:function(){throw new Error('Inheriting class needs to implement getUrlBits().');},setupAndValidate:function(){return true;},oneTimeSetup:function(){},getSize:function(){},getIframeName:function(){return this._iframeName;},getIframeTitle:function(){return 'Facebook Social Plugin';},getChannelUrl:function(){if(!this._channelUrl){var y=this;this._channelUrl=t.handler(function(z){y.fire('xd.'+z.type,z);},'parent.parent',true);}return this._channelUrl;},getIframeNode:function(){return this.dom.getElementsByTagName('iframe')[0];},arbiterInform:function(event,y,z){t.sendToFacebook(this.getIframeName(),{method:event,params:ES('JSON','stringify',false,y||{}),behavior:z||h.BEHAVIOR_PERSISTENT});},_arbiterInform:function(event,y,z){var aa='parent.frames["'+this.getIframeNode().name+'"]';t.inform(event,y,aa,z);},getDefaultWebDomain:function(){return s.resolve('www');},process:function(y){if(this._done){if(!this._allowReProcess&&!y)return;this.clear();}else this._oneTimeSetup();this._done=true;this._iframeName=this.getIframeName()||this._iframeName||n();if(!this.setupAndValidate()){this.fire('render');return;}if(this._showLoader)this._addLoader();k.addCss(this.dom,'fb_iframe_widget');if(this._visibleAfter!='immediate'){k.addCss(this.dom,'fb_hide_iframes');}else this.subscribe('iframe.onload',ES(this.fire,'bind',true,this,'render'));var z=this.getSize()||{},aa=this.getFullyQualifiedURL();if(z.width=='100%')k.addCss(this.dom,'fb_iframe_widget_fluid');this.clear();o({url:aa,root:this.dom.appendChild(document.createElement('span')),name:this._iframeName,title:this.getIframeTitle(),className:q.getRtl()?'fb_rtl':'fb_ltr',height:z.height,width:z.width,onload:ES(this.fire,'bind',true,this,'iframe.onload')});this._resizeFlow(z);this.loaded=false;this.subscribe('iframe.onload',ES(function(){this.loaded=true;if(!this._isResizeHandled)k.addCss(this.dom,'fb_hide_iframes');},'bind',true,this));},generateWidgetPipeIframeName:function(){v++;return 'fb_iframe_'+v;},getFullyQualifiedURL:function(){var y=this._getURL();y+='?'+p.encode(this._getQS());if(y.length>2000){y='about:blank';var z=ES(function(){this._postRequest();this.unsubscribe('iframe.onload',z);},'bind',true,this);this.subscribe('iframe.onload',z);}return y;},_getWidgetPipeShell:function(){return s.resolve('www')+'/common/widget_pipe_shell.php';},_oneTimeSetup:function(){this.subscribe('xd.resize',ES(this._handleResizeMsg,'bind',true,this));this.subscribe('xd.resize',ES(this._bubbleResizeEvent,'bind',true,this));this.subscribe('xd.resize.iframe',ES(this._resizeIframe,'bind',true,this));this.subscribe('xd.resize.flow',ES(this._resizeFlow,'bind',true,this));this.subscribe('xd.resize.flow',ES(this._bubbleResizeEvent,'bind',true,this));this.subscribe('xd.refreshLoginStatus',function(){i.getLoginStatus(function(){},true);});this.subscribe('xd.logout',function(){r({method:'auth.logout',display:'hidden'},function(){});});if(this._refreshOnAuthChange)this._setupAuthRefresh();if(this._visibleAfter=='load')this.subscribe('iframe.onload',ES(this._makeVisible,'bind',true,this));this.subscribe('xd.verify',ES(function(y){this.arbiterInform('xd/verify',y.token);},'bind',true,this));this.oneTimeSetup();},_makeVisible:function(){this._removeLoader();k.removeCss(this.dom,'fb_hide_iframes');this.fire('render');},_setupAuthRefresh:function(){i.getLoginStatus(ES(function(y){var z=y.status;l.subscribe('auth.statusChange',ES(function(aa){if(!this.isValid())return;if(z=='unknown'||aa.status=='unknown')this.process(true);z=aa.status;},'bind',true,this));},'bind',true,this));},_handleResizeMsg:function(y){if(!this.isValid())return;this._resizeIframe(y);this._resizeFlow(y);if(!this._borderReset){this.getIframeNode().style.border='none';this._borderReset=true;}this._isResizeHandled=true;this._makeVisible();},_bubbleResizeEvent:function(y){var z={height:y.height,width:y.width,pluginID:this.getAttribute('plugin-id')};l.fire('xfbml.resize',z);},_resizeIframe:function(y){var z=this.getIframeNode();if(y.reposition==="true")this._repositionIframe(y);y.height&&(z.style.height=y.height+'px');y.width&&(z.style.width=y.width+'px');this._updateIframeZIndex();},_resizeFlow:function(y){var z=this.dom.getElementsByTagName('span')[0];y.height&&(z.style.height=y.height+'px');y.width&&(z.style.width=y.width+'px');this._updateIframeZIndex();},_updateIframeZIndex:function(){var y=this.dom.getElementsByTagName('span')[0],z=this.getIframeNode(),aa=z.style.height===y.style.height&&z.style.width===y.style.width,ba=aa?'removeCss':'addCss';k[ba](z,'fb_iframe_widget_lift');},_repositionIframe:function(y){var z=this.getIframeNode(),aa=parseInt(k.getStyle(z,'width'),10),ba=k.getPosition(z).x,ca=k.getViewportInfo().width,da=parseInt(y.width,10);if(ba+da>ca&&ba>da){z.style.left=aa-da+'px';this.arbiterInform('xd/reposition',{type:'horizontal'});this._repositioned=true;}else if(this._repositioned){z.style.left='0px';this.arbiterInform('xd/reposition',{type:'restore'});this._repositioned=false;}},_addLoader:function(){if(!this._loaderDiv){k.addCss(this.dom,'fb_iframe_widget_loader');this._loaderDiv=document.createElement('div');this._loaderDiv.className='FB_Loader';this.dom.appendChild(this._loaderDiv);}},_removeLoader:function(){if(this._loaderDiv){k.removeCss(this.dom,'fb_iframe_widget_loader');if(this._loaderDiv.parentNode)this._loaderDiv.parentNode.removeChild(this._loaderDiv);this._loaderDiv=null;}},_getQS:function(){return ES('Object','assign',false,{api_key:q.getClientID(),locale:q.getLocale(),sdk:'joey',kid_directed_site:q.getKidDirectedSite(),ref:this.getAttribute('ref')},this.getUrlBits().params);},_getURL:function(){var y=this.getDefaultWebDomain(),z='';return y+'/plugins/'+z+this.getUrlBits().name+'.php';},_postRequest:function(){j.submitToTarget({url:this._getURL(),target:this.getIframeNode().name,params:this._getQS()});}}),v=0,w={};function x(){var y={};for(var z in w){var aa=w[z];y[z]={widget:aa.getUrlBits().name,params:aa._getQS()};}return y;}f.exports=u;},null);
__d('sdk.XFBML.Comments',['sdk.Event','sdk.XFBML.IframeWidget','QueryString','sdk.Runtime','JSSDKConfig','sdk.UA','UrlMap'],function a(b,c,d,e,f,g,h,i,j,k,l,m,n){if(c.__markCompiled)c.__markCompiled();var o=i.extend({_visibleAfter:'immediate',_refreshOnAuthChange:true,setupAndValidate:function(){var p={channel_url:this.getChannelUrl(),colorscheme:this.getAttribute('colorscheme'),skin:this.getAttribute('skin'),numposts:this.getAttribute('num-posts',10),width:this._getLengthAttribute('width'),href:this.getAttribute('href'),permalink:this.getAttribute('permalink'),publish_feed:this.getAttribute('publish_feed'),order_by:this.getAttribute('order_by'),mobile:this._getBoolAttribute('mobile'),version:this.getAttribute('version')};if(!p.width&&!p.permalink)p.width=550;if(l.initSitevars.enableMobileComments&&m.mobile()&&p.mobile!==false){p.mobile=true;delete p.width;}if(!p.skin)p.skin=p.colorscheme;if(!p.href){p.migrated=this.getAttribute('migrated');p.xid=this.getAttribute('xid');p.title=this.getAttribute('title',document.title);p.url=this.getAttribute('url',document.URL);p.quiet=this.getAttribute('quiet');p.reverse=this.getAttribute('reverse');p.simple=this.getAttribute('simple');p.css=this.getAttribute('css');p.notify=this.getAttribute('notify');if(!p.xid){var q=ES(document.URL,'indexOf',true,'#');if(q>0){p.xid=encodeURIComponent(document.URL.substring(0,q));}else p.xid=encodeURIComponent(document.URL);}if(p.migrated)p.href=n.resolve('www')+'/plugins/comments_v1.php?'+'app_id='+k.getClientID()+'&xid='+encodeURIComponent(p.xid)+'&url='+encodeURIComponent(p.url);}else{var r=this.getAttribute('fb_comment_id');if(!r){r=j.decode(document.URL.substring(ES(document.URL,'indexOf',true,'?')+1)).fb_comment_id;if(r&&ES(r,'indexOf',true,'#')>0)r=r.substring(0,ES(r,'indexOf',true,'#'));}if(r){p.fb_comment_id=r;this.subscribe('render',ES(function(){if(!window.location.hash)window.location.hash=this.getIframeNode().id;},'bind',true,this));}}if(!p.version)p.version=k.getVersion();this._attr=p;return true;},oneTimeSetup:function(){this.subscribe('xd.sdk_event',function(p){h.fire(p.event,ES('JSON','parse',false,p.data));});},getSize:function(){if(!this._attr.permalink)return {width:this._attr.mobile?'100%':this._attr.width,height:100};},getUrlBits:function(){return {name:'comments',params:this._attr};},getDefaultWebDomain:function(){return n.resolve('www',true);}});f.exports=o;},null);
__d('sdk.XFBML.CommentsCount',['ApiClient','sdk.DOM','sdk.XFBML.Element','sprintf'],function a(b,c,d,e,f,g,h,i,j,k){if(c.__markCompiled)c.__markCompiled();var l=j.extend({process:function(){i.addCss(this.dom,'fb_comments_count_zero');var m=this.getAttribute('href',window.location.href);h.scheduleBatchCall('/v2.1/'+encodeURIComponent(m),{fields:'share'},ES(function(n){var o=n.share&&n.share.comment_count||0;i.html(this.dom,k('<span class="fb_comments_count">%s</span>',o));if(o>0)i.removeCss(this.dom,'fb_comments_count_zero');this.fire('render');},'bind',true,this));}});f.exports=l;},null);
__d('safeEval',[],function a(b,c,d,e,f,g){if(c.__markCompiled)c.__markCompiled();function h(i,j){if(i===null||typeof i==='undefined')return;if(typeof i!=='string')return i;if(/^\w+$/.test(i)&&typeof window[i]==='function')return window[i].apply(null,j||[]);return Function('return eval("'+i.replace(/"/g,'\\"')+'");').apply(null,j||[]);}f.exports=h;},null);
__d('sdk.Helper',['sdk.ErrorHandling','sdk.Event','UrlMap','safeEval','sprintf'],function a(b,c,d,e,f,g,h,i,j,k,l){if(c.__markCompiled)c.__markCompiled();var m={isUser:function(n){return n<2.2e+09||n>=1e+14&&n<=100099999989999||n>=8.9e+13&&n<=89999999999999||n>=6.000001e+13&&n<=60000019999999;},upperCaseFirstChar:function(n){if(n.length>0){return n.substr(0,1).toUpperCase()+n.substr(1);}else return n;},getProfileLink:function(n,o,p){if(!p&&n)p=l('%s/profile.php?id=%s',j.resolve('www'),n.uid||n.id);if(p)o=l('<a class="fb_link" href="%s">%s</a>',p,o);return o;},invokeHandler:function(n,o,p){if(n)if(typeof n==='string'){h.unguard(k)(n,p);}else if(n.apply)h.unguard(n).apply(o,p||[]);},fireEvent:function(n,o){var p=o._attr.href;o.fire(n,p);i.fire(n,p,o);},executeFunctionByName:function(n){var o=Array.prototype.slice.call(arguments,1),p=n.split("."),q=p.pop(),r=window;for(var s=0;s<p.length;s++)r=r[p[s]];return r[q].apply(this,o);}};f.exports=m;},null);
__d('sdk.XFBML.LoginButton',['sdk.Helper','IframePlugin','Log','sdk.ui'],function a(b,c,d,e,f,g,h,i,j,k){if(c.__markCompiled)c.__markCompiled();var l=i.extend({constructor:function(m,n,o,p){this.parent(m,n,o,p);var q=i.getVal(p,'on_login'),r=null;if(q){r=function(s){if(s.error_code){j.debug('Plugin Return Error (%s): %s',s.error_code,s.error_message||s.error_description);return;}h.invokeHandler(q,null,[s]);};this.subscribe('login.status',r);}this.subscribe('xd.login_button_native_open',function(s){k(ES('JSON','parse',false,s.params),r);});},getParams:function(){return {scope:'string',perms:'string',size:'string',login_text:'text',show_faces:'bool',max_rows:'string',show_login_face:'bool',registration_url:'url_maybe',auto_logout_link:'bool',one_click:'bool',show_banner:'bool',auth_type:'string',default_audience:'string'};}});f.exports=l;},null);
__d('escapeHTML',[],function a(b,c,d,e,f,g){if(c.__markCompiled)c.__markCompiled();var h=/[&<>"'\/]/g,i={'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;','/':'&#x2F;'};function j(k){return k.replace(h,function(l){return i[l];});}f.exports=j;},null);
__d('sdk.XFBML.Name',['ApiClient','escapeHTML','sdk.Event','sdk.XFBML.Element','sdk.Helper','Log','sdk.Runtime'],function a(b,c,d,e,f,g,h,i,j,k,l,m,n){if(c.__markCompiled)c.__markCompiled();var o=({}).hasOwnProperty,p=k.extend({process:function(){ES('Object','assign',false,this,{_uid:this.getAttribute('uid'),_firstnameonly:this._getBoolAttribute('first-name-only'),_lastnameonly:this._getBoolAttribute('last-name-only'),_possessive:this._getBoolAttribute('possessive'),_reflexive:this._getBoolAttribute('reflexive'),_objective:this._getBoolAttribute('objective'),_linked:this._getBoolAttribute('linked',true),_subjectId:this.getAttribute('subject-id')});if(!this._uid){m.error('"uid" is a required attribute for <fb:name>');this.fire('render');return;}var q=[];if(this._firstnameonly){q.push('first_name');}else if(this._lastnameonly){q.push('last_name');}else q.push('name');if(this._subjectId){q.push('gender');if(this._subjectId==n.getUserID())this._reflexive=true;}j.monitor('auth.statusChange',ES(function(){if(!this.isValid()){this.fire('render');return true;}if(!this._uid||this._uid=='loggedinuser')this._uid=n.getUserID();if(!this._uid)return;h.scheduleBatchCall('/v1.0/'+this._uid,{fields:q.join(',')},ES(function(r){if(o.call(r,'error')){m.warn('The name is not found for ID: '+this._uid);return;}if(this._subjectId==this._uid){this._renderPronoun(r);}else this._renderOther(r);this.fire('render');},'bind',true,this));},'bind',true,this));},_renderPronoun:function(q){var r='',s=this._objective;if(this._subjectId){s=true;if(this._subjectId===this._uid)this._reflexive=true;}if(this._uid==n.getUserID()&&this._getBoolAttribute('use-you',true)){if(this._possessive){if(this._reflexive){r='your own';}else r='your';}else if(this._reflexive){r='yourself';}else r='you';}else switch(q.gender){case 'male':if(this._possessive){r=this._reflexive?'his own':'his';}else if(this._reflexive){r='himself';}else if(s){r='him';}else r='he';break;case 'female':if(this._possessive){r=this._reflexive?'her own':'her';}else if(this._reflexive){r='herself';}else if(s){r='her';}else r='she';break;default:if(this._getBoolAttribute('use-they',true)){if(this._possessive){if(this._reflexive){r='their own';}else r='their';}else if(this._reflexive){r='themselves';}else if(s){r='them';}else r='they';}else if(this._possessive){if(this._reflexive){r='his/her own';}else r='his/her';}else if(this._reflexive){r='himself/herself';}else if(s){r='him/her';}else r='he/she';break;}if(this._getBoolAttribute('capitalize',false))r=l.upperCaseFirstChar(r);this.dom.innerHTML=r;},_renderOther:function(q){var r='',s='';if(this._uid==n.getUserID()&&this._getBoolAttribute('use-you',true)){if(this._reflexive){if(this._possessive){r='your own';}else r='yourself';}else if(this._possessive){r='your';}else r='you';}else if(q){if(null===q.first_name)q.first_name='';if(null===q.last_name)q.last_name='';if(this._firstnameonly&&q.first_name!==undefined){r=i(q.first_name);}else if(this._lastnameonly&&q.last_name!==undefined)r=i(q.last_name);if(!r)r=i(q.name);if(r!==''&&this._possessive)r+='\'s';}if(!r)r=i(this.getAttribute('if-cant-see','Facebook User'));if(r){if(this._getBoolAttribute('capitalize',false))r=l.upperCaseFirstChar(r);if(q&&this._linked){s=l.getProfileLink(q,r,this.getAttribute('href',null));}else s=r;}this.dom.innerHTML=s;}});f.exports=p;},null);
__d('sdk.XFBML.ShareButton',['IframePlugin','sdk.ui'],function a(b,c,d,e,f,g,h,i){'use strict';if(c.__markCompiled)c.__markCompiled();var j=h.extend({constructor:function(k,l,m,n){this.parent(k,l,m,n);this.subscribe('xd.shareTriggerIframe',function(o){var p=ES('JSON','parse',false,o.data);i({method:'share',href:p.href,iframe_test:true});});},getParams:function(){return {href:'url',layout:'string',type:'string'};}});f.exports=j;},null);
__d('sdk.XFBML.Video',['Assert','sdk.Event','IframePlugin','ObservableMixin','sdk.XD'],function a(b,c,d,e,f,g,h,i,j,k,l){if(c.__markCompiled)c.__markCompiled();function m(p){'use strict';this.$VideoCache1=p.isMuted;this.$VideoCache2=p.volume;this.$VideoCache3=p.timePosition;this.$VideoCache4=p.duration;}m.prototype.update=function(p){'use strict';if(p.isMuted!==undefined)this.$VideoCache1=p.isMuted;if(p.volume!==undefined)this.$VideoCache2=p.volume;if(p.timePosition!==undefined)this.$VideoCache3=p.timePosition;if(p.duration!==undefined)this.$VideoCache4=p.duration;};m.prototype.isMuted=function(){'use strict';return this.$VideoCache1;};m.prototype.getVolume=function(){'use strict';return this.$VideoCache1?0:this.$VideoCache2;};m.prototype.getCurrentPosition=function(){'use strict';return this.$VideoCache3;};m.prototype.getDuration=function(){'use strict';return this.$VideoCache4;};function n(p,q,r){'use strict';this.$VideoController1=p;this.$VideoController2=q;this.$VideoController3=r;}n.prototype.play=function(){'use strict';l.sendToFacebook(this.$VideoController1,{method:'play',params:ES('JSON','stringify',false,{})});};n.prototype.pause=function(){'use strict';l.sendToFacebook(this.$VideoController1,{method:'pause',params:ES('JSON','stringify',false,{})});};n.prototype.seek=function(p){'use strict';h.isNumber(p,'Invalid argument');l.sendToFacebook(this.$VideoController1,{method:'seek',params:ES('JSON','stringify',false,{target:p})});};n.prototype.mute=function(){'use strict';l.sendToFacebook(this.$VideoController1,{method:'mute',params:ES('JSON','stringify',false,{})});};n.prototype.unmute=function(){'use strict';l.sendToFacebook(this.$VideoController1,{method:'unmute',params:ES('JSON','stringify',false,{})});};n.prototype.setVolume=function(p){'use strict';h.isNumber(p,'Invalid argument');l.sendToFacebook(this.$VideoController1,{method:'setVolume',params:ES('JSON','stringify',false,{volume:p})});};n.prototype.isMuted=function(){'use strict';return this.$VideoController3.isMuted();};n.prototype.getVolume=function(){'use strict';return this.$VideoController3.getVolume();};n.prototype.getCurrentPosition=function(){'use strict';return this.$VideoController3.getCurrentPosition();};n.prototype.getDuration=function(){'use strict';return this.$VideoController3.getDuration();};n.prototype.subscribe=function(event,p){'use strict';h.isString(event,'Invalid argument');h.isFunction(p,'Invalid argument');this.$VideoController2.subscribe(event,p);return {release:ES(function(){this.$VideoController2.unsubscribe(event,p);},'bind',true,this)};};var o=j.extend({constructor:function(p,q,r,s){this.parent(p,q,r,s);this._videoController=null;this._sharedObservable=null;this._sharedVideoCache=null;this.subscribe('xd.onVideoAPIReady',function(t){this._sharedObservable=new k();this._sharedVideoCache=new m(ES('JSON','parse',false,t.data));this._videoController=new n(this._iframeOptions.name,this._sharedObservable,this._sharedVideoCache);i.fire('xfbml.ready',{type:'video',id:s.id,instance:this._videoController});});this.subscribe('xd.stateChange',function(t){this._sharedObservable.inform(t.state);});this.subscribe('xd.cachedStateUpdateRequest',function(t){this._sharedVideoCache.update(ES('JSON','parse',false,t.data));});},getParams:function(){return {allowfullscreen:'bool',autoplay:'bool',controls:'bool',href:'url',show_text:'bool'};},getConfig:function(){return {fluid:true,full_width:true};}});f.exports=o;},null);
__d('legacy:fb.xfbml',['Assert','sdk.Event','FB','IframePlugin','PluginConfig','PluginTags','XFBML','sdk.domReady','sdk.feature','wrapFunction','sdk.XFBML.Comments','sdk.XFBML.CommentsCount','sdk.XFBML.LoginButton','sdk.XFBML.Name','sdk.XFBML.ShareButton','sdk.XFBML.Video'],function a(b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q){if(c.__markCompiled)c.__markCompiled();var r={comments:c('sdk.XFBML.Comments'),comments_count:c('sdk.XFBML.CommentsCount'),login_button:c('sdk.XFBML.LoginButton'),name:c('sdk.XFBML.Name'),share_button:c('sdk.XFBML.ShareButton'),video:c('sdk.XFBML.Video')},s=p('plugin_tags_blacklist',[]);ES(ES('Object','keys',false,m),'forEach',true,function(u){if(ES(s,'indexOf',true,u)!==-1)return;n.registerTag({xmlns:'fb',localName:u.replace(/_/g,'-'),ctor:k.withParams(m[u],l[u])});});ES(ES('Object','keys',false,r),'forEach',true,function(u){if(ES(s,'indexOf',true,u)!==-1)return;n.registerTag({xmlns:'fb',localName:u.replace(/_/g,'-'),ctor:r[u]});});j.provide('XFBML',{parse:function(u){h.maybeXfbml(u,'Invalid argument');if(u&&u.nodeType===9)u=u.body;return n.parse.apply(null,arguments);}});n.subscribe('parse',ES(i.fire,'bind',true,i,'xfbml.parse'));n.subscribe('render',ES(i.fire,'bind',true,i,'xfbml.render'));i.subscribe('init:post',function(u){if(u.xfbml)setTimeout(q(ES(o,'bind',true,null,n.parse),'entry','init:post:xfbml.parse'),0);});h.define('Xfbml',function(u){return (u.nodeType===1||u.nodeType===9)&&typeof u.nodeName==='string';});try{if(document.namespaces&&!document.namespaces.item.fb)document.namespaces.add('fb');}catch(t){}},3);
    }  }).call(global);})(window.inDapIF ? parent.window : window, window);} catch (e) {new Image().src="https:\/\/www.facebook.com\/" + 'common/scribe_endpoint.php?c=jssdk_error&m='+encodeURIComponent('{"error":"LOAD", "extra": {"name":"'+e.name+'","line":"'+(e.lineNumber||e.line)+'","script":"'+(e.fileName||e.sourceURL||e.script)+'","stack":"'+(e.stackTrace||e.stack)+'","revision":"2239045","namespace":"FB","message":"'+e.message+'"}}');}