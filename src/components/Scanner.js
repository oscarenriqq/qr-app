import QrReader from 'modern-react-qr-reader'
import { useEffect, useState } from 'react'
import Loading from './Loading'

function Scanner (props) {

    const [showQr, setShowQr] = useState(false)
    const [showEntryDetails, setShowEntryDetails] = useState(false)
    const [scanning, setScanning] = useState(false)
    const [entryInfo, setEntryInfo] = useState({
        id: "",
        name: "",
        email: "",
        phone: "",
        gender: ""
    })
    const [modal, setModal] = useState()
    
    useEffect(() => {
        // eslint-disable-next-line no-undef
        setModal(new bootstrap.Modal(document.getElementById('scannerModal'), {
            keyboard: false
        }))
    }, [])

    const handleShowModal = () => {
        setShowQr(true)
        modal.show()
    }

    const handleHideModal = () => {
        modal.hide()
    }

    const handleCloseQr = () => {
        setShowQr(false)
        setShowEntryDetails(false)
    }

    //Función que se ejecuta cuando se lee el contenido del código QR
    const handleScan = data => {
        if (data) {
            setShowQr(false)
            setScanning(true)

            fetch('http://localhost:3001/api/entry', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    user_id: data
                })
            })
            .then(response => {
                if (!response.ok) {

                    props.scanError(true)
                    handleHideModal()
                    handleCloseQr()

                    const err = new Error("HTTP status code: " + response.status)
                    throw err
                }
                else {
                    return response.json()
                }
            })
            .then(user => {

                setScanning(false)

                setEntryInfo({
                    ...entryInfo,
                    name: user.name,
                    email: user.email,
                    phone: user.phone,
                    gender: user.gender
                })

                setShowEntryDetails(true)
            })
            .catch(err => {
                console.log(err)
            })

        }
    }
      
    const handleError = err => {
        console.error(err)
    }

    return (
        <>
            <div className='d-grid gap-2 mt-4'>
                <button className='btn btn-info btn-lg' onClick={handleShowModal}>Nuevo ingreso</button>
            </div>

            <div className="modal fade" id="scannerModal" tabIndex="-1" aria-labelledby="scannerModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <section>
                                <h5 className="modal-title" id="exampleModalLabel">Nuevo ingreso</h5>
                                <small>Escanea el QR del usuario</small>
                            </section>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={handleCloseQr}></button>
                        </div>
                        <div className="modal-body">
                        { scanning && <Loading /> }
                        {showQr && <QrReader
                            delay={300}
                            facingMode={"environment"}
                            onError={handleError}
                            onScan={handleScan}
                            style={{ width: '100%' }}
                        />}
                        {
                            showEntryDetails && (
                                <>
                                    <h1 className='display-6 text-center'>Bienvenido {entryInfo.name}!</h1>
                                </>
                            )
                        }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Scanner