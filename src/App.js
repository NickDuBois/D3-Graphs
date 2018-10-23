import React, {Component} from 'react';
import './App.css';

import _ from 'underscore';

//import myData from './JsonData/DS1 Execution'; // <--- use this to import data.

import LineGraph from "./components/LineGraph/LineGraph";
import moment from "moment";

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


        // if you want to use real world data you have to un comment the import above as well!
        // if you want to use real world data you have to un comment the import above as well!
        // if you want to use real world data you have to un comment the import above as well!

        // let data = myData.map(data => {  // This is "real world" data provided from client!

        let data = testData.map(data => {   // use the test data above.
            return {
                x: moment(moment(data.SentDate).format("YYYY-MM-DD") + "T" + data.ActivityTime),
                y: data.AvgPx,
            };
        });

        console.log("data : ", data);



        // The following code is only pulling important values from
        // the data.

        let onlyX = data.map(dataList => {
            return moment(dataList.x);
        });

        let earliestTime = _.min(onlyX);
        let latestTime = _.max(onlyX);

        console.log("onlyX : ", onlyX);
        console.log("earliestTime : ", earliestTime);
        console.log("latestTime : ", latestTime);




        let onlyY = data.map(dataList => {
            return dataList.y;
        });


        let smallestPrice = _.min(onlyY);
        let largestPrice =  _.max(onlyY);

        console.log("onlyY : ", onlyY);
        console.log("smallestPrice : ", smallestPrice);
        console.log("LargestPrice : ", largestPrice);




        return (
            <div className="App">
                <div className="graph-container">
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
                </div>
            </div>
        );
    }
}

export default App;
