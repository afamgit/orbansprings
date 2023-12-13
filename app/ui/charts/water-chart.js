'use client'


import { useState, useEffect, useRef } from "react"
import Chart from 'chart.js/auto'
import {areas} from '../../utils/data'
import { fetchCustomersPerArea } from "../../utils/data"


 function WaterChart({dataLabels, dataValues}) {
    const ctx = useRef(null);


    useEffect(() => {

        const chart = new Chart(ctx.current, {
            type: 'pie',
            data: {
                datasets: [{
                    data: [70, 10, 6,14],
                    backgroundColor: [
                        "rgb(118, 135, 62",
                        "rgb(255, 205, 86)",
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

export default WaterChart;