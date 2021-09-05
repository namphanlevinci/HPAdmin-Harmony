import React from 'react';
import Popup from 'reactjs-popup';
import close_white from "@/assets/images/close_white.png";
import "./service.style.scss";
import 'reactjs-popup/dist/index.css';

const Popupconfirm = ({ isVisible , close = () =>{} , onDelete = () =>{} }) => {
    return (
        <div>
            <Popup
                show={isVisible}
                aria-labelledby="contained-modal-title-vcenter"
                centered
                contentClassName="confirmModal"
                size={"large"}
            >
                <div className="confirmModal__header">
                    Confirmation
                    <img onClick={close} src={close_white} alt="imgclose" />
                </div>
                <div className="confirmModal__body">
                    <div>
                        Are you sure you want to Delete this Extra?
                    </div>
                    <div>
                        <div onClick={onDelete} style={{ marginRight: 45 }} className="btn_popup_confirm btn_popup_confirm_no">
                            Yes
                        </div>
                        <div onClick={close} style={{ marginLeft: 45 }} className="btn_popup_confirm">
                            No
                        </div>
                    </div>
                </div>
            </Popup>
        </div>
    )
}



export default Popupconfirm;