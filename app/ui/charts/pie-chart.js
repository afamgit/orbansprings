'use client'


import { useEffect } from "react"
import Chart from 'chart.js/auto'



 function Example() {
    useEffect(() => {
        let ctx = document.getElementById('myChart2').getContext('2d');
        let myChart = ''
         myChart = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: ["Accepted", "Pending", "Rejected"],
                datasets: [{
                    data: [70, 10, 6],
                    borderColor: [
                        "rgb(75, 192, 192)",
                        "rgb(255, 205, 86)",
                        "rgb(255, 99, 132)",
                    ],
                    backgroundColor: [
                        "rgb(75, 192, 192 )",
                        "rgb(255, 205, 86)",
                        "rgb(255, 99, 132)",
                    ],
                    borderWidth: 2,
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
    }, [])


    return (
        <>
            {/* Doughnut chart */}
            <h1 className="w-[150px] mx-auto mt-10 text-xl font-semibold capitalize ">Pie Chart</h1>
            <div className="w-[300px] h-[300px] flex mx-auto my-auto">
                <div className='border border-gray-400 pt-0 rounded-xl w-[250px] h-[250px] my-auto  shadow-xl pb-2'>
                    <canvas id='myChart2'></canvas>
                </div>
            </div>
        </>
    )
}

export default Example;