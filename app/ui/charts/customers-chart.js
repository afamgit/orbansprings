'use client'


import { useState, useEffect, useRef } from "react"
import Chart from 'chart.js/auto'
import {areas} from '../../utils/data'
import { fetchCustomersPerArea } from "../../utils/data"


 function CustomersChart({dataLabels, dataValues}) {
    const ctx = useRef(null);

    useEffect(() => {
        // let ctx = document.getElementById('customers').getContext('2d');

        let myChart1 = ''

        const chart = new Chart(ctx.current, {
            type: 'pie',
            data: {
                datasets: [{
                    data: dataValues,
                    backgroundColor: [
                        "rgb(219, 213, 213)",
                        "rgb(110, 96, 96)",
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