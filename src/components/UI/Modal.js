import React from 'react'
import ReactDOM from 'react-dom'
import Card from './Card'

import styles from './Modal.module.css';

const Backdrop = props => {
    return (
        <div className={styles.backdrop} onClick={props.onConfirm}></div>
    )
}

const ModalOverlay = props => {
    return (
        <Card className={styles.modal}>
            <div className={styles.content}>
                {props.children}
            </div>
        </Card>
    )
}


const Modal = props => {
    return (
        <>
            {ReactDOM.createPortal(<Backdrop onConfirm={props.onConfirm} />, document.getElementById('backdrop-root'))}
            {ReactDOM.createPortal(<ModalOverlay>{props.children}</ModalOverlay>, document.getElementById('modal-root'))}
        </>
    )
}

export default Modal