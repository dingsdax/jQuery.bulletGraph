// jquery random @http://blog.mastykarz.nl/jquery-random-filter/
jQuery.jQueryRandom = 0;
jQuery.extend(jQuery.expr[":"],
{
    random: function(a, i, m, r) {
        if (i == 0) {
            jQuery.jQueryRandom = Math.floor(Math.random() * r.length);
        };
        return i == jQuery.jQueryRandom;
    }
});

$(document).ready(function() {

    // bulletgraph with custom range labels
    $('select#metric1').bulletGraph({
        width: 400,
        height: 30,
        rangesLabels: ['empty', 'half', 'full'],
        nTick: 5
    });

    // bulletgraph with custom ranges & range labels
    $('select#metric2').bulletGraph({
        width: 200,
        height: 20,
        ranges: ['0%', '20%', '70%', '100%'],
        rangesLabels: ['low', 'medium', 'high'],
        sliderOptions: {
            disabled: true
        }
    });

    // multi bulletgraph with multiple targets, custom ranges & range labels
    $('select.multigraph').each(function(i, o) {
        // create labels/ticks on first and last bulletgraph
        switch (i) {
        case 0:
            jQuery(o).bulletGraph({
                showLabels:
                true,
                showTicks: false,
                tickMargin: '10px',
                width: 300,
                height: 25,
                ranges: ['0%', '20%', '50%', '85%', '100%'],
                rangesLabels: ['Beginner', 'Intermediate', 'Advanced', 'Expert']
            });
            break;
        case ($('select.multigraph').length - 1) :
            jQuery(o).bulletGraph({
                showLabels: false,
                showTicks: true,
                tickMargin: '10px',
                nTick: 10,
                width: 300,
                height: 25,
                ranges: ['0%', '20%', '50%', '85%', '100%'],
                rangesLabels: ['Beginner', 'Intermediate', 'Advanced', 'Expert']
            });
            break
        default:
            jQuery(o).bulletGraph({
                showLabels:
                false,
                showTicks: false,
                width: 300,
                height: 25,
                ranges: ['0%', '20%', '50%', '85%', '100%'],
                rangesLabels: ['Beginner', 'Intermediate', 'Advanced', 'Expert']
            });
            break;
        }
    });

    // set a random option for every select element
    $('select').each(function() {
        $(this).val($(this).children('option:random').attr('value'));
        $(this).change();
    });

});