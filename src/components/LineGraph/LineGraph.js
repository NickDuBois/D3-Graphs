import React, { Component } from 'react';
import './LineGraph.css';
import * as d3 from "d3";


export default class LineGraph extends Component {

    componentDidMount() {


        /**
         * Common Definitions
         *
         * g is an element related to D3, it is short for Group.
         *
         *
         * enter, exit, update:
         *      DOM elements < data elements (enter)
         *      DOM elements > data elements (exit)
         *      DOM elements = data elements (update)
         *
         * There are places where you will see a selectAll( [Some element type] ) and it may look
         * like this will be returning 0 elements.  This is normally correct, think of it like
         * this, and yes this is VERY generalized:
         *      selectAll() = declaring a type, while also selecting any of those type if they exist.
         *
         *  this terminology will probably become clearer with a better understanding of the enter,exit
         *  update phases.
         *
         *
         */



        /**
         * OTHER NOTES
         *
         * A guideline I read early on is if you need to loop through your data outside of
         * D3 then you are probably doing something wrong.
         *
         * this being said, it is weird that the data is not first added to the d3 object.  I'd think that
         * a lot of the "scaffolding" code would make more sense if using actual data.
         *
         * The original example I based this off of was using randomly generated data, this is probably why it was
         * setup this way in the first place.
         *
         * There are "d3 layouts" that are pre defined "functions" that return data in a format matching the layout.
         */


        // ***************************************************************************************************************
        // ***************************************************************************************************************
        // Props passed in

        /*
        Note:

            this code assumes "data" is already in x,y format:
                [
                    {x: "?", y: "?"},
                    {x: "?", y: "?"},
                    {x: "?", y: "?"},
                ]

         */

        const {
            graphName,
            data,
            width,
            height,
            margin,
            smallestYAxisValue,
            smallestXAxisValue,
            largestYAxisValue,
            largestXAxisValue,
        } = this.props;

        // ***************************************************************************************************************
        // ***************************************************************************************************************
        // Defining graph properties.

        let DrawingAreaWidth = parseInt(width) + (parseInt(margin) * 2);
        let DrawingAreaHeight = parseInt(height) + (parseInt(margin) * 2);

        let CanvasAreaWidth = width;
        let CanvasAreaHeight = height;

        let graphStartX = margin;
        let graphStartY = margin;

        // 0,0 is in the bottom left corner of the chart for this graph.
        let x0 = 0;
        let y0 = height;

        let xAxisDataMin = smallestXAxisValue;
        let xAxisDataMax = largestXAxisValue;

        let xAxisPhysicalMin = x0;
        let xAxisPhysicalMax = CanvasAreaWidth;


        let yAxisDataMin = smallestYAxisValue;
        let yAxisDataMax = largestYAxisValue;

        // Y values are used in reverse as the higher number is at the top of the y axis.
        let yAxisPhysicalMin = 0;
        let yAxisPhysicalMax = y0;

        // ***************************************************************************************************************
        // ***************************************************************************************************************
        // Setup scales to insure data fits inside bounds of graph

        /**
            xScale and yScale are "functions" that take data, and translate it to fit
            with in the desired scale.
        */

        let xScale = d3.scaleTime()
            .domain([xAxisDataMin, xAxisDataMax])
            .range([xAxisPhysicalMin, xAxisPhysicalMax])
        ;

        let yScale = d3.scaleLinear()
            .domain([yAxisDataMin, yAxisDataMax])
            .range([yAxisPhysicalMax, yAxisPhysicalMin]) // Note: Reversed values!
        ;

        // ***************************************************************************************************************
        // ***************************************************************************************************************
        // Define and build graph area, move it with transition so that it has the defined margins.

        /**
            Create the "canvas" area.  Not to be confused with an html canvas element.    In this case,
            we are selecting an HTML element with the class of "chart" and appending a D3 Group (g) element to use
            for our graph.
         */
        let graphCanvasArea = d3.select("." + graphName)
            .append("svg")
                .attr("width", DrawingAreaWidth )
                .attr("height", DrawingAreaHeight )
            .append("g")
                .attr("transform", "translate(" + graphStartX + ", " + graphStartY + ")")
        ;

        // ***************************************************************************************************************
        // ***************************************************************************************************************
        // Add the x and y axis rulers per the scales already setup above

        /**
            We are not going to add the X axis.
            First we append a group, give that group a class of "x axis" (which is weird...)
            the transform call will move the "scale" into place.
            Call is saying hey, give me this.  And in this case it is saying give me a
            bottom axis, and fill it's scale with the predefined xScale (function) we set up above.
        */
        graphCanvasArea.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + CanvasAreaHeight + ")")
            .call(d3.axisBottom(xScale));

        /**
            We are not going to add the Y axis.
            First we append a group, give that group a class of "y axis" (which is weird...)
            we don't need to move it as it is starting at 0,0.
            Call is saying hey, give me this.  And in this case it is saying give me a
            bottom axis, and fill it's scale with the predefined yScale (function) we set up above.
        */
        graphCanvasArea.append("g")
            .attr("class", "y axis")
            .call(d3.axisLeft(yScale));


        // ***************************************************************************************************************
        // ***************************************************************************************************************
        // Start plotting data


        let aPlottedLineGroup = graphCanvasArea.append("g");

        /**
            This is pretty much a function.  When we add the line in the enter()
            stage, that feeds "data" into this line path generator.  In this case
            for both X and Y, we are returning a "scaled" version of that value
            using the scales we setup above.  This insures that no matter the value
            the point is within the bounds of the graph.
         */

        let line = d3.line()
            .x(function (d) {
                return xScale(d.x);    // set the x values for the line generator
            })
            .y(function (d) {
                return yScale(d.y);   // set the y values for the line generator
            })
        ;


        /**
            We now have everything setup and ready.  Lets send the data to a path, and use the
            above created line path function to plot the points!
         */
        aPlottedLineGroup.selectAll("path") // Remember, selectAll doesn't always return any elements, it's like doing "new".
            .data([data])
            .enter()
                .append("path")
                    .attr("d", line)
                    .attr("fill", "none")
                    .attr("stroke", "black")
                    .attr("stroke-width", 1)
        ;

    }

    render() {

        return (<div className={this.props.graphName + " chart"}></div>);
    }


}
