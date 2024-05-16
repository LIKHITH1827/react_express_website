import axios from "axios";
import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";

const Mypopup = (props) => {

    const closepopupmodal = async () => {
    
        await axios.post("/item/putnew", {
            item_name, item_image,
             item_quantity,
            item_Id: props.updateset.item_Id
        })
        console.log("update");
        await props.fetchmeitems();
        console.log("get all");
        props.closepopup();
    }

    const [item_image, setTheImage] = useState(props.updateset.item_image)


    const [item_quantity, setTheQty] = useState(props.updateset.item_quantity)
    
    
    
    const [item_name, settheItem] = useState(props.updateset.item_name)
   

    return (
        <>


            <Modal show={props.popup} onHide={props.closepopup}>

                <Modal.Body>

                    <div className="boxer container">
                        <div className="myrow row">
                            <div className="box col form-control">
                           <label className="test form-control"> item Name:</label> 
                            <input type="text" enterKeyHint="name"
                             value={item_name} className="form-control"
                              onChange={function(fn) 
                               { settheItem(fn.target.value) }} />
                               <label className="test form-control"> item quantity </label>
                                <input type="text" enterKeyHint="qty val"
                                 value={item_quantity} className=" test form-control"
                                  onChange={function(fn)  { setTheQty(fn.target.value) }} />
                                  <label className="form-control">item image</label>
                                
                                <input type="text" enterKeyHint="afddress of image"
                                 value={item_image} 
                                 className="test form-control"
                                  onChange={function(fn) { setTheImage(fn.target.value) }} />
                            </div>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                     onClick={props.closepopup}>
                        cancel
                    </Button>
                    <Button
                     onClick={closepopupmodal}>
                        update
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default Mypopup;