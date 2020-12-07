import React, { useEffect } from 'react'
import { useParams } from 'react-router';


function ReadWrittenWork() {
    const { id } = useParams();
    useEffect(() => {
        // readWrittenWorkHandler();
    }, [])
    // const loadWrittenWork = async () => {
    //     try {
    //         const response = await fetch(query)
    //         const data = await response.json();
    //         setWrittenWorkData(data.data);
    //     } catch (err) {
    //         console.log(err)
    //     }
    //     console.log(query)
    // }
    return (

        <div>
            Read Written Work {id}
        </div>
    )
}

export default ReadWrittenWork
