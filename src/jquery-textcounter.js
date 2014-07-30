/**
 * jQuery Text Counter
 * @author Rogério Lino <rogeriolino.com>
 */
;(function($) {

    "use strict";
        
    $.fn.textCounter = function(prop) {
        prop = prop || {};
    
        this.each(function(i, e) {
            var elem = $(e);
            elem.maxlength = maxlength(elem, prop);
            elem.output = output(elem, prop);
            elem.on('keyup', function() {
                var value = elem.val();
                if (value.length >= elem.maxlength) {
                    value = value.substring(0, elem.maxlength);
                }
                elem.val(value);
                updateOutput(elem);
                if (prop.change && typeof(prop.change) === 'function') {
                    var pct = value.length / elem.maxlength * 100;
                    prop.change(elem, value.length, pct);
                }
            });
            updateOutput(elem);
        });
        
        return this;
    
    }
    
    function updateOutput(elem) {
        elem.output.text(elem.maxlength - elem.val().length);
    }
    
    function maxlength(elem, prop) {
        var p = 'maxlength';
        if (elem.prop(p) > 0) {
            return elem.prop(p);
        } else {
            return Math.max(config(elem, prop, p), 0);
        }
    }
    
    function output(elem, prop) {
        return $(config(elem, prop, 'output'));
    }
    
    function config(elem, prop, key) {
        if (elem.data(key)) {
            return elem.data(key);
        } else {
            return prop[key];
        }
    }
    
})(jQuery);
