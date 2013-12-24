/* 
 * gridly.js
 * by John Tajima, Copyright 2013
 * MIT License
 *
 * A simple jQuery plugin for arranging div elements into a grid
 *
 * 
 */

(function($){

  $.fn.gridly = function(options) {
    var curr_options = {}
    curr_options['rows']        = $(this).data('rows');
    curr_options['cols']        = $(this).data('cols');
    curr_options['width']       = $(this).data('width');
    curr_options['height']      = $(this).data('height');
    curr_options['orientation'] = $(this).data('orientation');
    curr_options['fixed']       = $(this).data('fixed');
    curr_options['gutter']      = $(this).data('gutter');

    $.fn.gridly.opts      = $.extend({}, $.fn.gridly.defaults, curr_options, options);
    $.fn.gridly.opts.grid = this;

    // set resize listener on window
    $(window).on('resize', resizeGrid);
    console.log($.fn.gridly.opts)
    resizeGrid();

    return this;
  };

  // defaults
  $.fn.gridly.defaults = {
    width: 1920,
    height: 1080,
    rows: 4,
    cols: 6,
    orientation: 'horizontal',
    fixed: true,   // fixed size by pixel
    gutter: 0
  };

  // current option values
  $.fn.gridly.opts = {}

  // private methods
  // --------------------

  // load pins into vertical columns
  function resizeGrid() {
    var grid        = $.fn.gridly.opts.grid;
    var width       = $.fn.gridly.opts.width;
    var height      = $.fn.gridly.opts.height;
    var curr_width  = $(grid).outerWidth();
    var curr_height = $(grid).outerHeight();
    var vertical    = ($.fn.gridly.opts.orientation === 'vertical');
    
    // only resize if not fixed
    if ($.fn.gridly.opts.fixed !== true) {
      if (vertical) {
        $(grid).css('width', curr_height * (height/width));
      } else {
        $(grid).css('height', curr_width * (height/width));
      }
    };

    layoutCells();
  }

  function layoutCells() {
    var grid        = $.fn.gridly.opts.grid;
    var rows        = $.fn.gridly.opts.rows;
    var cols        = $.fn.gridly.opts.cols;
    var width       = $.fn.gridly.opts.width;
    var height      = $.fn.gridly.opts.height;
    var curr_width  = $(grid).outerWidth();
    var curr_height = $(grid).outerHeight();
    var vertical    = ($.fn.gridly.opts.orientation === 'vertical');
    var gutter      = $.fn.gridly.opts.gutter;

    if (gutter > 0) {
      curr_width = curr_width - (gutter * 2);
      curr_height = curr_height - (gutter * 2);
    }

    var cell_width  = vertical ? (curr_width / rows) : (curr_width / cols);
    var cell_height = vertical ? (curr_height / cols) : (curr_height / rows);
    
    if (gutter > 0) {
      cell_width = cell_width - (gutter*2);
      cell_height = cell_height - (gutter*2);
    }

    $(grid).find('.cell').each(function(){      
      var x = parseInt($(this).data('col'), 10) - 1;
      var y = parseInt($(this).data('row'), 10) - 1;
      var w = parseInt($(this).data('width') || 1, 10);
      var h = parseInt($(this).data('height') || 1, 10);

      var topPos, leftPos, newWidth, newHeight;
      var gutterWidth = gutter * 2;
      if (gutter > 0) {
        leftPos = gutterWidth;
        if (x > 0) {
          leftPos += x * (cell_width + gutterWidth);
        }

        newWidth = w * cell_width;
        if (w > 1) {
          newWidth += (w-1) * gutterWidth;
        } 

        topPos = gutterWidth;
        if (y > 0) {
          topPos += y * (cell_height + gutterWidth);
        }
        
        newHeight = h * cell_height;
        if (h > 1) {
          newHeight += (h-1) * gutterWidth;
        } 

      } else {
        topPos    = y * cell_height;
        leftPos   = x * cell_width;
        newWidth  = w * cell_width;
        newHeight = h * cell_height;
      }

      $(this).css({
        position: 'absolute',
        top: topPos + 'px', 
        left: leftPos + "px", 
        width: newWidth + 'px', 
        height: newHeight + "px"
      })
    });
  }


})(jQuery);

