import React, {Component} from 'react';
import './App.css';

import _ from 'underscore';

//import myData from './JsonData/DS1 Execution'; // <--- use this to import data.

import LineGraph from "./components/LineGraph/LineGraph";
import moment from "moment";
import MultiLineGraph from "./components/MultiLineGraph/MultiLineGraph";

class App extends Component {

    render() {


        // *************************************************************************************************************

        let testData = [
                {"SentDate": "10/8/2018", "ActivityTime": "09:31:06.779", "AvgPx": "62.534466"},
                {"SentDate": "10/8/2018", "ActivityTime": "10:07:42.641", "AvgPx": "42.515943"},
                {"SentDate": "10/8/2018", "ActivityTime": "11:27:06.612", "AvgPx": "43.512464"},
                {"SentDate": "10/8/2018", "ActivityTime": "11:37:22.341", "AvgPx": "40.432153"},
                {"SentDate": "10/8/2018", "ActivityTime": "12:27:46.642", "AvgPx": "45.513453"},
                {"SentDate": "10/8/2018", "ActivityTime": "13:37:41.441", "AvgPx": "31.132943"},
                {"SentDate": "10/8/2018", "ActivityTime": "14:47:46.631", "AvgPx": "82.515943"},
                {"SentDate": "10/8/2018", "ActivityTime": "15:37:56.548", "AvgPx": "28.515343"},
                {"SentDate": "10/8/2018", "ActivityTime": "15:40:41.843", "AvgPx": "13.225943"},
                {"SentDate": "10/8/2018", "ActivityTime": "16:57:76.341", "AvgPx": "62.534466"},
        ];


        // *************************************************************************************************************

        let data = testData.map(data => {   // use the test data above.
            return {
                x: moment(moment(data.SentDate).format("YYYY-MM-DD") + "T" + data.ActivityTime),
                y: data.AvgPx,
            };
        });

        // The following code is only pulling important values from
        // the data.

        let onlyX = data.map(dataList => {
            return moment(dataList.x);
        });

        let earliestTime = _.min(onlyX);
        let latestTime = _.max(onlyX);

        let onlyY = data.map(dataList => {
            return dataList.y;
        });

        let smallestPrice = _.min(onlyY);
        let largestPrice =  _.max(onlyY);

        let lineGraphHtml = (
            <LineGraph
                graphName="graph1"
                data={data}
                width="1200"
                height="200"
                margin="35"

                smallestYAxisValue={smallestPrice}
                smallestXAxisValue={earliestTime}

                largestYAxisValue={largestPrice}
                largestXAxisValue={latestTime}

            />
        );

        // *************************************************************************************************************


        let multiTrackTestData = [
            [
                {"SentDate": "10/8/2018", "ActivityTime": "09:01:06.779", "AvgPx": "62.534466"},
                {"SentDate": "10/8/2018", "ActivityTime": "10:07:42.641", "AvgPx": "42.515943"},
                {"SentDate": "10/8/2018", "ActivityTime": "11:27:06.612", "AvgPx": "43.512464"},
                {"SentDate": "10/8/2018", "ActivityTime": "11:37:22.341", "AvgPx": "40.432153"},
                {"SentDate": "10/8/2018", "ActivityTime": "12:27:46.642", "AvgPx": "45.513453"},
                {"SentDate": "10/8/2018", "ActivityTime": "13:37:41.441", "AvgPx": "31.132943"},
                {"SentDate": "10/8/2018", "ActivityTime": "14:47:46.631", "AvgPx": "82.515943"},
                {"SentDate": "10/8/2018", "ActivityTime": "15:37:56.548", "AvgPx": "28.515343"},
                {"SentDate": "10/8/2018", "ActivityTime": "15:40:41.843", "AvgPx": "13.225943"},
                {"SentDate": "10/8/2018", "ActivityTime": "16:57:76.341", "AvgPx": "62.534466"},
            ],
            [
                {"SentDate": "10/8/2018", "ActivityTime": "09:01:06.779", "AvgPx": "60.534466"},
                {"SentDate": "10/8/2018", "ActivityTime": "09:07:42.641", "AvgPx": "44.515943"},
                {"SentDate": "10/8/2018", "ActivityTime": "10:27:06.612", "AvgPx": "41.512464"},
                {"SentDate": "10/8/2018", "ActivityTime": "11:12:22.341", "AvgPx": "47.432153"},
                {"SentDate": "10/8/2018", "ActivityTime": "11:27:46.642", "AvgPx": "25.513453"},
                {"SentDate": "10/8/2018", "ActivityTime": "12:27:41.441", "AvgPx": "37.132943"},
                {"SentDate": "10/8/2018", "ActivityTime": "13:17:46.631", "AvgPx": "22.515943"},
                {"SentDate": "10/8/2018", "ActivityTime": "13:37:56.548", "AvgPx": "23.515343"},
                {"SentDate": "10/8/2018", "ActivityTime": "15:05:41.843", "AvgPx": "34.225943"},
                {"SentDate": "10/8/2018", "ActivityTime": "16:17:76.341", "AvgPx": "67.534466"},
            ],
        ];


        // *************************************************************************************************************


        let multiData = multiTrackTestData.map(arrayOfData => {   // use the test data above.

            let oneData = arrayOfData.map(data => {   // use the test data above.
                return {
                    x: moment(moment(data.SentDate).format("YYYY-MM-DD") + "T" + data.ActivityTime),
                    y: data.AvgPx,
                };
            });

            return oneData;

        });

        // console.log("multiData : ", multiData);

        // The following code is only pulling important values from
        // the data.

        let multiOnlyX = [];
        let multiOnlyY = [];

        for( let aPathOfData in multiData) {

            let returnedData = multiData[aPathOfData].map(dataList => {
                return moment(dataList.x);
            });

            multiOnlyX = multiOnlyX.concat(returnedData);


            let returnedDataY = multiData[aPathOfData].map(dataList => {
                return dataList.y;
            });

            multiOnlyY = multiOnlyY.concat(returnedDataY);
        }

        // console.log("multiOnlyX : ", multiOnlyX);

        let multiEarliestTime = _.min(multiOnlyX);
        let multiLatestTime = _.max(multiOnlyX);



        // console.log("multiOnlyY : ", multiOnlyY);

        let multiSmallestPrice = _.min(multiOnlyY);
        let multiLargestPrice =  _.max(multiOnlyY);

        let multiLineGraphHtml = (
            <MultiLineGraph
                graphName="MultiGraph1"
                data={multiData}
                width="1200"
                height="200"
                margin="35"

                smallestYAxisValue={multiSmallestPrice}
                smallestXAxisValue={multiEarliestTime}

                largestYAxisValue={multiLargestPrice}
                largestXAxisValue={multiLatestTime}

            />
        );

        // *************************************************************************************************************




        return (
            <div className="App">
                <div className="graph-container"> {/* It would be great if the dimensions of this container was passed to the graph. */}
                    {multiLineGraphHtml}
                </div>
                <div className="graph-container"> {/* It would be great if the dimensions of this container was passed to the graph. */}
                    {lineGraphHtml}
                </div>
            </div>
        );
    }
}

export default App;
