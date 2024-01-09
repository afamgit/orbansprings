'use client'


import { useState, useEffect, useRef } from "react"
import Chart from 'chart.js/auto'


 function DriversChart({dataLabels, dataValues}) {
    const ctx = useRef(null);

    const [chartData, setChartData] = useState(dataValues);

    useEffect(() => {
      setChartData(dataValues);
    }, []);


    useEffect(() => {

        // let ctx = document.getElementById('drivers').getContext('2d');
        let myChart = ''

        const chart = new Chart(ctx.current, {
            type: 'pie',
            data: {
                datasets: [{
                    data: chartData,
                    borderColor: [
                        "rgb(25, 176, 35)",
                        "rgb(64, 164, 222)",
                    ],
                    backgroundColor: [
                        "rgb(25, 176, 35)",
                        "rgb(64, 164, 222)",
                    ],
                    borderWidth: 1,
                }]
            },
            options: {
                scales: {
                    xAxes: [{
                        display: false,
                    }],
                    yAxes: [{
                        display: false,
                    }],
                }
            },

        });
        return () => {
            // need cleanup because React runs useEffect callback twice in dev env
            chart.destroy();
          };
    }, [])


    return (
        <>
            <div className="w-[300px] h-[300px] flex justify-center items-center">
                <div className='w-[250px] h-[250px]'>
                      <canvas ref={ctx} />
                </div>
            </div>
        </>
    )
}

export default DriversChart;