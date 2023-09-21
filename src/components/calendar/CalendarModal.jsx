import { addHours } from "date-fns"
import es from "date-fns/locale/es"
import { useState } from "react"
import ReactDatePicker, { registerLocale } from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import Modal from "react-modal"


registerLocale('es', es)

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
}

Modal.setAppElement('#root')

export const CalendarModal = () => {
    const [ handleModal, setHandleModal ] = useState({ isOpen: true })
    
    const [ formValues, setFormValues ] = useState({
        title: "César",
        notes: "Rincón",
        start: new Date(),
        end: addHours( new Date(), 2 ),
    })

    const onInputChange = ({ target }) => {
        setFormValues((last) => ({
           ...last,
           [target.name]: target.value 
        }))
    }

    const onDateChange = ( event, changin ) => {
        console.log(event, changin)
        setFormValues((last) => ({
            ...last,
            [changin]: event 
        }))
    }
    
    const onCloseModal = () => {
        setHandleModal(last => ({ ...last, isOpen: false}))
    }

    return (
        <Modal
            isOpen={ handleModal.isOpen }
            onRequestClose={ onCloseModal }
            style={ customStyles }
            className="modal"
            overlayClassName="modal-fondo"
            closeTimeoutMS={ 400 } 
        >
            <h1> Nuevo evento </h1>
            <hr />
            <form className="container">

                <div className="form-group mb-4">
                    <label>Fecha y hora inicio</label>
                    <ReactDatePicker 
                        className="form-control"
                        selected={ formValues.start}
                        value={ formValues.start}
                        onChange={ (event) => onDateChange(event, 'start') }
                        dateFormat="Pp"
                        showTimeSelect
                        locale="es"
                        timeCaption="Hora"
                        />
                </div>

                <div className="form-group mb-2">
                    <label>Fecha y hora fin</label>
                    <ReactDatePicker
                        minDate={ formValues.start}
                        className="form-control"
                        selected={ formValues.end}
                        onChange={ (event) => onDateChange(event, 'end') }
                        dateFormat="Pp"
                        showTimeSelect
                        locale="es"
                        timeCaption="Hora"
                    />
                </div>

                <hr />
                <div className="form-group mb-2">
                    <label>Titulo y notas</label>
                    <input 
                        type="text" 
                        className="form-control"
                        placeholder="Título del evento"
                        name="title"
                        autoComplete="off"
                        value={ formValues.title }
                        onChange={ onInputChange }
                    />
                    <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
                </div>

                <div className="form-group mb-2">
                    <textarea 
                        type="text" 
                        className="form-control"
                        placeholder="Notas"
                        rows="5"
                        name="notes"
                        value={ formValues.notes }
                        onChange={ onInputChange }
                    ></textarea>
                    <small id="emailHelp" className="form-text text-muted">Información adicional</small>
                </div>

                <button
                    type="submit"
                    className="btn btn-outline-primary btn-block"
                >
                    <i className="far fa-save"></i>
                    <span> Guardar</span>
                </button>

            </form>
        </Modal>
    )
}
