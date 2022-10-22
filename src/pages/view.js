import React, { useEffect, useState } from "react";


const View = () =>{
    const [data, setData] = useState({
        isFetched: false,
        error: false,
        data:{}
    });

    useEffect(() =>{
        fetch('http://localhost:8000/data')
        .then(res => res.json())
        .then(data => setData({isFetched:true, data: data.data}))
    }, []);


    const handleDown = () =>{
        fetch('http://localhost:8000/download/fc99b4dc-dc21-4820-aa49-1426a2a4169f')
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