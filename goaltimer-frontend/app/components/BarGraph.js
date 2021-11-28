import React from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import { BarChart } from "react-native-chart-kit";
import { ScrollView } from 'react-native-gesture-handler';

function BarGraph({ data, dataCount, daily, weekly, monthly, backgroundColor }) {
    //sample data

    const chartConfig = {
        backgroundGradientFrom: (backgroundColor != null) ? backgroundColor : 'white',
        backgroundGradientTo: "white",
        color: (opacity = 1) => `black`,
        labelColor: (opacity = 1) => `black`,
        barPercentage: 0.3,
        useShadowColorFromDataset: false, // optional
        fillShadowGradient: '#85AAE6',
        fillShadowGradientOpacity: 1,
        style: {
            borderRadius: 100,
            fontFamily: 'Avenir-Book',
        },
        barRadius: 5,
    };
    var BAR_WIDTH = 0;
    if (daily) {
        BAR_WIDTH = dataCount * 70;
    }
    if (weekly) {
        BAR_WIDTH = dataCount * 60;
    }
    if (monthly) {
        BAR_WIDTH = dataCount * 14;
    }
    if (!weekly && !monthly) {
        BAR_WIDTH = dataCount * 60;
    }

    return (
        <ScrollView style={{ borderRadius: 20, alignSelf: 'flex-start', backgroundColor: (backgroundColor != null) ? backgroundColor : 'white' }} horizontal={true}>
            <BarChart
                data={data}
                width={BAR_WIDTH}
                height={220}
                showBarTops={false}
                chartConfig={chartConfig}
                yAxisLabel=""
                withInnerLines={false}
                withVerticalLabels={(weekly || daily) ? true : false}
            />
        </ScrollView>

    );
}

export default BarGraph;