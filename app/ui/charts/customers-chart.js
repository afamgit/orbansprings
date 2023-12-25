'use client'


import { useState, useEffect, useRef } from "react"
import Chart from 'chart.js/auto'


 function CustomersChart({dataLabels, dataValues}) {
    const ctx = useRef(null);

    const [chartData, setChartData] = useState(dataValues);

    useEffect(() => {
      setChartData(dataValues);
    }, []);

    useEffect(() => {
        // let ctx = document.getElementById('customers').getContext('2d');

        let myChart1 = ''

        const chart = new Chart(ctx.current, {
            type: 'pie',
            data: {
                datasets: [{
                    data: chartData,
                    backgroundColor: [
                        "rgb(64, 164, 222)",
                        "rgb(25, 176, 35)",
                    ],
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

export default CustomersChart;