jQuery.fn.bulletGraph = function(settings) {
    // get select element
    var select = jQuery(this);
    // get name of metric
    var name = jQuery(this).attr('name');
    // get current value
    var value = select.val();
    // little grey color maker
    var colors = '0123456789abcdef';
    // little color maker
    var colorMaker = function(string) {
        var buff = string;
        for (var i = 1; i < 6; i++) {
            buff += string;
        }
        return '#' + buff;
    }
    // default options
    var options = jQuery.extend({
        // width of bulletgraph
        width: 300,
        // heigth of bulletgraph
        height: 25,
        // height/width of ticks
        tickHeight: 7,
        // array with range borders in %
        ranges: ['0%', '50%', '75%', '100%'],
        // array of labels for ranges (size=rangesLabels-1)
        rangesLabels: ['range 1', 'range 2', 'range 3'],
        // number of values in select element
        ticks: select.children($('option')),
        // show only every n-th tick
        nTick: 1,
        // steps for jquery ui slider
        steps: select.children($('option')),
        // show rangeLabels
        showLabels: true,
        // show ticks
        showTicks: true,
        // options for jquery ui slider
        sliderOptions: null
    },
    settings);

    // return bulletgraph, insert after select element
    // get orientation
    var horizontal = (options.width >= options.height);

    // get box and container
    var container = jQuery('<div></div>');
    container.addClass('containerbox');

    var box = jQuery('<div></div>');
    // delete old bulletGraphs if any
    $('#' + select.attr('id') + '_bulletGraphBox').remove();

    // set the container box
    box.attr('id', select.attr('id') + '_bulletGraphBox');
    box.addClass('bulletbox');
    box.width(options.width);
    box.height(options.height);

    // info field
    var info = jQuery('<div></div>');
    info.addClass('info');
    info.insertAfter(select.parent());
    info.height(options.height);
    info.css('line-height', options.height / 16);


    // if labels should be output
    if (options.showLabels) {
        // create range ticks
        jQuery.each(options.ranges,
        function(i, v) {
            // hack for 0
            if (v == '0%') {
                v = '-1px';
            }
            var curMark = jQuery('<div></div>');
            curMark.addClass('mark_range');
            curMark.addClass('mark_range_' + i);
            curMark.css('left', v);
            curMark.css('height', options.tickHeight);
            curMark.css('width', '1px');
            curMark.css('top', -options.tickHeight);
            box.append(curMark);
        });

        // create range labels
        var rangesLabels = options.rangesLabels.slice(0, options.ranges.length - 1);
        jQuery.each(rangesLabels,
        function(i, v) {
            var curCaption = jQuery('<div></div>');
            curCaption.addClass('caption_range');
            curCaption.addClass('caption_range_' + i);
            curCaption.css('left', options.ranges[i]);
            curCaption.css('width', (parseInt(options.ranges[i + 1].slice(0, -1)) - options.ranges[i].slice(0, -1)) + '%');
            curCaption.css('top', -options.tickHeight * 2);
            curCaption.text(v);
            box.append(curCaption);
        });
    }

    // add range elements within bulletgraph
    var ranges = options.ranges.slice(0, options.ranges.length - 1);
    jQuery.each(ranges,
    function(i, v) {
        var curRange = jQuery('<div></div>');
        curRange.addClass('range');
        curRange.addClass('range_' + i);
        var l = parseInt(v);
        if (l < 0) {
            l = 0;
        }
        curRange.css('left', l + '%');
        curRange.css('height', options.height);
        curRange.css('width', (parseInt(options.ranges[i + 1]) - l) + '%');
        // don't create right border on last range
        if (i < options.ranges.length - 1) {
            curRange.css('border-right', '1px solid #cccccc');
        }
        // make ranges lighter if range progresses
        var color1 = colorMaker(colors[i + 10]);
        var color2 = colorMaker(colors[i + 10 + 2]);
        // beautify
        curRange.css('background', color1);
        curRange.css('background', '-webkit-gradient(linear, left top, left bottom, from(' + color1 + '), to(' + color2 + '))');
        curRange.css('background', '-moz-linear-gradient(top,  ' + color1 + ',  ' + color2 + ')');
        curRange.css('background', '-o-linear-gradient(top,  ' + color1 + ',  ' + color2 + ')');
        curRange.css('filter', "progid:DXImageTransform.Microsoft.gradient(startColorstr='" + color1 + "', endColorstr='" + color2 + "')");
        box.append(curRange);
    });

    // create comparative target value handlers
    var target = select.data('target');
    var treshold = select.data('treshold');
    if (target != undefined) {
        var curTarget = jQuery('<div></div>');
        curTarget.addClass('target');
        curTarget.css('top', -options.tickHeight);
        curTarget.css('height', options.height + options.tickHeight * 2);
        curTarget.css('left', target + '%');
        // decide wether to show the bulletgraph or not based on treshold
        if (treshold != undefined) {
            if (target < treshold) {
                curTarget.css('display', 'none');
            } else {
                curTarget.css('display', 'block');
            }
        }
        box.append(curTarget);
    }

    // create element holding slider
    var actual = jQuery('<div></div>');
    actual.addClass('actual');
    actual.css('width', options.width - 1);
    actual.css('top', options.height / 4);
    actual.css('height', options.height / 2);
    box.append(actual);

    // if labels should be output
    if (options.showTicks) {
        // create bottom captions for ticks
        jQuery.each(options.ticks,
        function(i, v) {
            if (i % options.nTick == 0) {
                var curCaption = jQuery('<div></div>');
                curCaption.addClass('caption_bottom');
                curCaption.addClass('caption_bottom_' + i);
                curCaption.text(v.text);
                curCaption.css('width', '15px');
                curCaption.css('top', options.height + 7);
                curCaption.css('left', (options.width / (options.ticks.length - 1)) * i - 8);
                box.append(curCaption);
            }
        });

        // create button tick markers
        jQuery.each(options.ticks,
        function(i, v) {
            if (i % options.nTick == 0) {
                var curMark = jQuery('<div></div>');
                curMark.addClass('mark_bottom');
                curMark.addClass('mark_bottom_' + i);
                curMark.css('top', options.height);
                curMark.css('height', options.tickHeight);
                curMark.css('left', (options.width / (options.ticks.length - 1)) * i);
                if (i == 0) {
                    curMark.css('left', '-1px');
                }
                box.append(curMark);
            }
        });
    }
    // create jquery ui slider
    actual.slider(jQuery.extend(
    options.sliderOptions, {
        range: 'min',
        step: 100 / (options.steps.length - 1),
        animate: true
    }));
    // set height of slider range of this bulletgraph
    actual.children('.ui-slider-range').height(options.height / 2);
    // set height of slider handle of this bulletgraph
    var x = 2
    if ((!options.showLabels) || (!options.showTicks))
    x = 1;
    actual.children('.ui-slider-handle').height(options.height + options.tickHeight * 2);

    actual.slider("option", "value", select.val());
    // bind select value to slider value and vice versa
    select.bind('change keyup click',
    function() {
        info.html(select.val() * (100 / (options.steps.length - 1)));
        actual.slider("option", "value", select.val() * (100 / (options.steps.length - 1)));
    });
    actual.bind("slidechange",
    function(event, ui) {
        select.val(ui.value / (100 / (options.steps.length - 1)));
        info.html(ui.value / (100 / (options.steps.length - 1)));

    });

    // add box & info to container
    container.append(box);
    container.append(info);

    // insert container after select and hide select
    container.insertAfter(select);

}