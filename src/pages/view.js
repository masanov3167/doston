import React, { useEffect, useState } from "react";


const View = () =>{
    const [data, setData] = useState({
        isFetched: false,
        error: false,
        data:{}
    });

    useEffect(() =>{
        fetch('https://doston-back.herokuapp.com/data')
        .then(res => res.json())
        .then(data => setData({isFetched:true, data: data.data}))
    }, []);


    console.log(data);

    const handleDown = () =>{
        fetch('https://doston-back.herokuapp.com/download/bb4ed5e3-1391-417c-a1fb-fd8dc0326a20')
        .then((res) => { return res.blob(); })
        .then((data) => {
        var a = document.createElement("a");
        a.href = window.URL.createObjectURL(data);
        a.download = "FILENAME";
        a.click();
        });
    }

    return (
        <div className="container">
            <h2>this is wiew page</h2>

            <button onClick={handleDown}>meni bos</button>
        </div>
    )
}

export default View;


