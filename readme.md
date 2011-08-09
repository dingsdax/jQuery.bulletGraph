# jQuery Bullet Graph  #

A [jQuery](http://jquery.com/) plugin, turning a html select element into a bullet graph slider. [Bullet graphs](http://www.perceptualedge.com/articles/misc/Bullet_Graph_Design_Spec.pdf), developed by [Stephen Few](http://www.perceptualedge.com/), feature a single primary measure, a comparative measure. These measures are displayed in the context of qualitative and quantitative measures. Additionally the qualitative ranges are displayed as varying intensities of a single hue to make them discernible. This plugin creates a [pure css based bullet graph](http://www.usrecordings.com/test-lab/bullet-graph.htm) and makes the primary measure adjustable by incorporating a [jQuery UI slider](http://jqueryui.com/demos/slider/) element. The selected slider value corresponds to the selected option in the html select element.

## Usage ##
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

_for more usage and customization, please have a look at the source & examples code_


## Options ##

* **width** - of bulletgraph in pixel
* **height** - of bulletgrpah in pixel
* **tickHeight** - height of top/bottom ticks for labels and steps
* **ranges** - array of (qualitative) range borders in % - e.g. _['0%', '50%', '75%', '100%']_
* **rangeLabels** - array of (qualitative) labels for ranges (size=rangesLabels-1) - e.g. _['poor', 'satisfactory', 'good']_
* **ticks** - number of ticks to show at the bottom, usually the number of values in select element
* **nTick** - reduce number of ticks to show only every n-th tick
* **steps** - steps for jQuery UI slider
* **showLabels** - show quantitative labels and ticks on top
* **showTicks** - show ticks and qualitative labels at the bottom
* **sliderOptions** - options for the [jQuery UI slider](http://jqueryui.com/demos/slider/)

## other Implementations ##
[Google Charts API](http://dealerdiagnostics.com/blog/2008/05/create-bullet-graphs-with-google-charts-in-7-easy-steps/), [Google Spreadsheets](http://dealerdiagnostics.com/blog/2008/09/the-ddr-bullet-graph-gadget/), [Excel](http://www.exceluser.com/explore/bullet.htm), [WPF,WinForms](http://www.codeproject.com/KB/WPF/WpfWinFormsBulletGraphs.aspx), [CSS/HTML](http://www.usrecordings.com/test-lab/bullet-graph.htm), [jQuery Sparklines](http://omnipotent.net/jquery.sparkline/), [Protovis](http://mbostock.github.com/protovis/ex/bullet.html),...

