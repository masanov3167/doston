import React, { useContext, useState } from "react";
import { Context } from "../context/provider";
import Joi from 'joi-browser'


const Form = () =>{

    const {nameRegex,liveaddress,education,shakl1,turi1, til1, schema,  phoneRegex,info1, district1, numberRegex, paswordRegex, malaka1} = useContext(Context);
    const [region1, setRegion1] = useState(1);
    const handleSubmit = e =>{
        e.preventDefault();
        const { malaka, studyaddress, fish, number, pass, region , district , tashkilot , info, expert , level , sport , shakl , turi , sportturi, til , pasport, rasm , diplom , inn , buyruq , unvon} =  e.target
         
        const {error, value} = Joi.validate({
            malaka: malaka1.find(a => a.value === malaka.value).label,
            studyaddress: studyaddress.value,
            fish: fish.value,
            number: number.value,
            pass: pass.value,
            region: liveaddress.find(a => a.id === region.value).name_uz,
            district: district1.find(e => e.id === district.value).name_uz,
            tashkilot: tashkilot.value,
            info: info1.find(e => e.value === info.value).label,
            expert: expert.value,
            level: level.value,
            sport: education.find(e => e.value === sport.value).label,
            shakl: shakl1.find(e => e.value === shakl.value).label,
            turi: turi1.find(e => e.value === turi.value).label,
            sportturi: sportturi.value,
            til: til1.find(e => e.value === til.value).label,
            pasport: pasport.files[0],
            rasm: rasm.files[0],
            diplom: diplom.files[0],
            inn: inn.files[0],
            buyruq: buyruq.files[0],
            unvon: unvon.files[0],
        }, schema)

        if(error){
            alert(`Ma'lumotlaringizni kiritshda xatolikga yo'l qo'ydingiz :(`)
        }
        if(!error){
           if(!number.value.match(phoneRegex)){
            alert(`Raqamingizni xato kiritdingiz :( iltimos namunadagidek raqam kiriting!`)
           }

            let formdata = new FormData();

            for(let key in value){
                formdata.append(key, value[key])
            }

            fetch('http://localhost:8000/data',{
                method:'POST',
                body: formdata
            })
            .then(res => res.json())
            .then(() => console.log('ok'))
            .catch(err => alert(err))
        }
    }
    return (
        <div className="container mt-5">
            <h3 className="text-center fw-bold">Sample Page</h3>
            <form onSubmit={handleSubmit} className="form" encType="multipart/form-data">
                <div className="mb-3">
                    <span>Qisqa muddatli malaka oshirish kurslari:</span>
                    <select name="malaka" className="form-select" aria-label="Default select example" required>
                        {
                            malaka1.map((e, index) =>(
                                <option key={index} value={e.value}>{e.label}</option>
                            ))
                        }
                    </select>
                </div>

                <div className="mb-3">
                    <span>Qayerda o'qimoqchisiz</span>
                    <select name="studyaddress" className="form-select" aria-label="Default select example" required>
                        <option value="Toshkent">Toshkent</option>
                    </select>
                </div>

                <div className="mb-3">
                    <span>Familiya ism sharifingiz: </span>
                        <input name="fish" onInput={nameRegex} className="form-control" minLength='10' maxLength='60'  type="text" placeholder="ism sharifingizni yozing" required/>
                </div>

                <div className="mb-3">
                    <span>Telefon raqamingiz: Namuna - 998991234567</span>
                        <input name="number" maxLength='12' onInput={numberRegex} className="form-control" type="text" placeholder="Telefon raqamingizni yozing" required/>
                </div>

                <div className="mb-3">
                    <span>Pasword seriyasi va raqami:</span>
                        <input maxLength='9' minLength='9' name="pass" onInput={paswordRegex} onPaste={(e)=>e.preventDefault()} onCopy={(e)=>e.preventDefault()} className="form-control" type="text" placeholder="Passport seriyasi va raqamini yozing" required/>
                </div>

                <div className="mb-3">
                    <span>Yashash hududi</span>
                    <select name="region" onChange={e => setRegion1(e.target.value)} className="form-select" aria-label="Default select example" required>
                        {
                            liveaddress.map((e, index) =>(
                                <option key={index} value={e.id}>{e.name_uz}</option>
                            ))
                        }
                    </select>
                </div>

                <div className="mb-3">
                    <span>Shahar/tuman</span>
                    <select name="district" className="form-select" aria-label="Default select example" required>
                        {
                           district1.filter(e => Number(e.region_id) === Number(region1)).map((e, index) =>(
                            <option key={index} value={e.id}>{e.name_uz}</option>
                           ))
                        }
                    </select>
                </div>

                <div className="mb-3">
                    <span>Tashkilot nomi</span>
                        <input name="tashkilot" onInput={nameRegex} className="form-control" type="text" placeholder="tashkilot nomini yozing" required/>
                </div>

                <div className="mb-3">
                    <span>Ma'lumoti </span>
                    <select name="info" className="form-select" aria-label="Default select example" required>
                        {
                            info1.map((e, index) =>(
                                <option key={index} value={e.value}>{e.label}</option>
                            ))
                        }
                    </select>
                </div>

                <div className="mb-3">
                    <span>Mutaxassisligi</span>
                        <input name="expert" onInput={nameRegex} className="form-control" type="text" placeholder="Mutaxassisligingizni yozing" required/>
                </div>

                <div className="mb-3">
                    <span>Lavozim darajasini </span>
                        <input name="level" onInput={nameRegex} className="form-control" type="text" placeholder="Lavozim/darajangizni yozing" required/>
                </div>

                <div className="mb-3">
                    <span>Sport razryadi va unvoni:</span>
                    <select name="sport" className="form-select" aria-label="Default select example" required>
                        {
                            education.map((e, index) =>(
                                <option key={index} value={e.value}>{e.label}</option>
                            ))
                        }
                    </select>
                </div>

                <div className="mb-3">
                    <span>O'quv shakli:</span>
                    <select name="shakl" className="form-select" aria-label="Default select example" required>
                        {
                            shakl1.map((e, index) =>(
                                <option key={index} value={e.value}>{e.label}</option>
                            ))
                        }
                    </select>
                </div>

                <div className="mb-3">
                    <span>O'qish turi:</span>
                    <select name="turi" className="form-select" aria-label="Default select example" required>
                         {
                            turi1.map((e, index) =>(
                                <option key={index} value={e.value}>{e.label}</option>
                            ))
                        }
                    </select>
                </div>

                <div className="mb-3">
                    <span>Sport turi yoki sportning tarkibiy qismi:</span>
                        <input name='sportturi' onInput={nameRegex} className="form-control" type="text" required/>
                </div>

                <div className="mb-3">
                    <span>Ta'lim tili:</span>
                    <select name="til" className="form-select" aria-label="Default select example" required> 
                        {
                            til1.map((e, index) =>(
                                <option key={index} value={e.value}>{e.label}</option>
                            ))
                        }
                    </select>
                </div>

                <div className="mb-3">
                    <label htmlFor="formFile" className="form-label">Pasport nusxasi:</label>
                    <input name="pasport" className="form-control" type="file" id="formFile" accept=".pdf, image/*" required />
                </div>

                <div className="mb-3">
                    <label htmlFor="formFile2" className="form-label">Rasm(3x4):</label>
                    <input name="rasm" className="form-control" type="file" id="formFile2" accept=".pdf, image/*" required />
                </div>

                <div className="mb-3">
                    <label htmlFor="formFile3" className="form-label">Diplom nusxasi:</label>
                    <input name="diplom" className="form-control" type="file" id="formFile3" accept=".pdf, image/*" required/>
                </div>

                <div className="mb-3">
                    <label htmlFor="formFile4" className="form-label">STIR nusxasi (INN):</label>
                    <input name="inn" className="form-control" type="file" id="formFile4" accept=".pdf, image/*" required/>
                </div>

                <div className="mb-3">
                    <label htmlFor="formFile5" className="form-label">Buyruq yoki yo'llanma xatidan ko'chirma:</label>
                    <input name="buyruq" className="form-control" type="file" id="formFile5" accept=".pdf, image/*" required/>
                </div>

                <div className="mb-3">
                    <label htmlFor="formFile6" className="form-label">Sport razryadi va unvoni nusxasi:</label>
                    <input name="unvon" className="form-control" type="file" id="formFile6" accept=".pdf, image/*"  required/>
                </div>
                <div className="mb-3">
                    <input id="checkga" type="checkbox" />
                    <label className="ms-2" htmlFor="checkga">Kiritilgan ma'lumotlar haqiqiyligini tasdiqlayman</label>
                </div>

                <button type="submit" className="btn btn-success">Ariza yuborish</button>
            </form>
        </div>
    )
}

export default Form;