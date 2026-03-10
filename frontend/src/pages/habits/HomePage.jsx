import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';
import { useEffect, useState } from 'react';
import API from "../../api/axiosInstance.js"

const HomePage = () => {
    const [completions, setCompletions] = useState([])

    const startDate = new Date()
    startDate.setFullYear(startDate.getFullYear() - 1)
    const endDate = new Date()

    const fetchCompletions = async () => {
        try{
            const res = await API.get("/api/habits")
            const habits = res.data

            for(let i = 0; i < habits.length; i++){
                const res2 = await API.get(`/api/habits/${habits[i]._id}/completions`)
                setCompletions(prev => prev.concat(res2.data))
            }
        } catch (err){
            if (err.response && err.response.status){
                console.log(err.response.status)
            }else{
                console.log(err)
            }
        }
    }

    useEffect(() => {
        fetchCompletions()
    }, [])

    const heatmapData = Object.values(
        completions.reduce((acc, completion) => {

            const date = new Date(completion.completedOn)
            .toISOString()
            .split("T")[0];

            if (!acc[date]) acc[date] = { date, count: 0 };

            acc[date].count += 1;

            return acc;

        }, {})
    )
    return (
        <div className='flex min-h-screen shrink bg-slate-900'>
            <CalendarHeatmap
                startDate={startDate}
                endDate={endDate}
                values={heatmapData}
                classForValue={(value) => {
                    if (!value) {
                        return 'color-empty';
                    }
                    return `color-scale-${value.count}`;
                }}
            />
        </div>
    )
}

export default HomePage