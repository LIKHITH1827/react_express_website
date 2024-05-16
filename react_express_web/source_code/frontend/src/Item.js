import { useState, useEffect } from 'react';
import axios from 'axios';
import Mypopup from './Popup';
import { Button, Modal } from "react-bootstrap";



const Item = () => {
    const [response, setResponse] = useState([]);

    const closepopup = () => setpopup1(false);

    const [popup, setpopup] = useState(false);
   
   
    const [thirdparty, setThirdParty] = useState();
   
   
   
    const [item_quantity, setTheQty] = useState("")

   
   
    const [chosenitem, setchosenitem] = useState(null);
    const [updateset, setupdateset] = useState();

    const [popup1, setpopup1] = useState(true);



    const [item_image, setTheImage] = useState("")

    useEffect(() => {
        console.log("fetched all");
        fetchmeitems();
        console.log("fetched api");
        thirdpartydata();
    }, []);



    const [item_name, settheItem] = useState("")




    const pushthecard = async (e) => {
        console.log("invoked create");
        await axios.post("/item/insert", { item_name, item_image, item_quantity });
        console.log("fetch all items");
        await fetchmeitems();
    }
    const fetchmeitems = async (e) => {
        let cards = await axios.get("/item/fetchevery");
        if (cards.data.length >= 1) {
            setpopup1(true);
        }
        console.log("invoked");
        setResponse(cards.data);

    }
    const popthecard = async (e, item) => {
        console.log("delete");
        await axios.post("/item//popall/" + item);
        console.log("fetch all");
        await fetchmeitems();
    }

    const puthecard = async (e, card) => {
        console.log("update ");
        setupdateset(card)
        setpopup(true);
        console.log("set item");

        setchosenitem(card.item_Id);
    }

    const thirdpartydata = async () => {

        const reqconfig = {
            method: 'GET',
            url: 'https://vaccovid-coronavirus-vaccine-and-treatment-tracker.p.rapidapi.com/api/npm-covid-data/',
            headers: {
                'X-RapidAPI-Key': 'd16102dbdfmshd481c8aee28d825p189fa5jsn406f2be7d922',
                'X-RapidAPI-Host': 'vaccovid-coronavirus-vaccine-and-treatment-tracker.p.rapidapi.com'
            }
        };

        axios.request(reqconfig).then(response => {
            console.log(response.data);
            setThirdParty(response.data);
        }).catch(error => {
            console.error(error);
        });

    }




    return (<>

        <div className="container mt-5">
            <div className='container'>

                <div className='row'>
                    <div className='col'>

                        {popup && (
                            <Mypopup
                                popup={popup}
                                chosenitem={chosenitem}
                                closepopup={() => setpopup(false)}
                                fetchmeitems={fetchmeitems}
                                updateset={updateset}
                            />
                        )}
                    </div>
                </div>
            </div>

            <div className='row mb-3'>
                <div className='col'> <h1> List of items </h1> </div>

            </div>
            <div className="row">
                <div className="col">
                    <h2>create an item</h2>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <div className="form-group">
                        <label className='form-control'> item name</label>
                        <input type="text" value={item_name}
                            onChange={function (fn) { settheItem(fn.target.value) }
                            }
                            enterKeyHint='name of item'
                            className="form-control"
                        />
                        <label className='form-control'> item quantity</label>
                        <input type="text"
                            enterKeyHint='quantity'
                            onChange={function (fn) {
                                setTheQty(fn.target.value)

                            }}
                            className="form-control"
                        />
                        <label className='form-control'>  item image</label>
                        <input type="text"
                            onChange={function (fn) {
                                setTheImage(fn.target.value)
                            }}
                            placeholder='enter address of image'
                            className="form-control" />

                        <div className='col offset-4 mt-4'>
                            <button className="btn btn-danger" onClick={
                                function (fn) { pushthecard(fn) }

                            } >Create</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className='container'>
                <div className="row mt-5">

                    {response && 
                    response.length > 0 
                    ? response.map(itemob => <div key={itemob.item_Id} className='boxer col-lg-10 mt-5'>
                        <div className='row text align'>
                            <div className="col mp md">
                                <img
                                    src={itemob.item_image}
                                    alt="item image"
                                    style={{ width: 400, height: 300 }}
                                >
                                </img>
                            </div>
                            <div className="col md pp">
                                <h3 className='text'>{itemob.item_name}</h3>
                                <p className='text'>item number: {itemob.item_quantity}</p>
                                <button
                                    onClick={(e) => { puthecard(e, itemob) }}
                                    className='btn btn-warning'
                                >update item</button>

                                <button
                                    onClick={(e) => { popthecard(e, itemob.item_Id) }}
                                    className='mybtn btn btn-secondary'>
                                    remove
                                </button>
                            </div>
                        </div>
                    </div>) : <div>
                        <Modal show={popup1} onHide={closepopup}>
                            <Modal.Body>
                                <span
                                    className='text text-center'>
                                    <h2>Empty inventory</h2>
                                </span>
                                <br></br>
                                <Button className='btn btn-sm' aria-label='close' onClick={closepopup}>Close</Button>
                            </Modal.Body>
                        </Modal>
                    </div>}

                </div>



            </div>

        </div>
        <hr></hr>
        <div className='container mt-5'>
            <div className='row'>
                <div className='col'>

                    <h2>API DATA</h2>

                </div>
            </div>

            <div className='row'>
                <div className="col">
                    <table border={2}>
                        <thead>
                            <tr>
                                <th>ActiveCases</th>
                                <th>Continent</th>
                                <th>Country</th>
                                <th>Deaths_1M_pop</th>
                                <th>Infection_Risk</th>
                                <th>Population</th>
                                <th>TotalRecovered</th>
                            </tr>
                        </thead>
                        <tbody>
                            {thirdparty && thirdparty.map((dat, i) =>
                                <tr key={i}>
                                    <td>{dat.ActiveCases}</td>
                                    <td>{dat.Continent}</td>
                                    <td> {dat.Country}</td>
                                    <td>{dat.Deaths_1M_pop}</td>
                                    <td> {dat.Infection_Risk}   </td>
                                    <td> {dat.Population}   </td>
                                    <td> {dat.TotalRecovered}   </td>
                                </tr>


                            )}
                        </tbody>
                    </table>
                </div>

            </div>

        </div >



    </>)
}

export default Item;