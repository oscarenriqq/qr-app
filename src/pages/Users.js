import { useEffect, useState } from "react"
import QRCode from "react-qr-code";

function Users() {

    const [users, setUsers] = useState([])
    const [modal, setModal] = useState()
    const [qrValue, setQrValue] = useState("")
    const [qrToImage, setQrToImage] = useState(null)

    useEffect(() => {
        // eslint-disable-next-line no-undef
        setModal(new bootstrap.Modal(document.getElementById('generateQrModal'), {
            keyboard: false,
            backdrop: 'static'
        }))

        fetch('http://localhost:3001/api/users', {
        method: 'GET',
        })
        .then(response => response.json())
        .then(data => setUsers(data))
    }, [])

    const handleToggleModal = ({ id }) => {
        modal.show()

        setQrValue(id)

        // const el = document.querySelectorAll(".modal-body.text-center svg")[0]
        // const xml = new XMLSerializer().serializeToString(el);
        // const svg64 = btoa(xml); //for utf8: btoa(unescape(encodeURIComponent(xml)))
        // const b64start = 'data:image/svg+xml;base64,';
        // const image64 = b64start + svg64;
        // setQrToImage(image64)
        // console.log(image64)
    }
    
    return (
        <>
            {/* <img src={qrToImage} alt="test"/> */}
            <table className="table table-bordered mt-2">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Email</th>
                        <th>Teléfono</th>
                        <th>Género</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users.map(user => (
                            <tr key={user.id}>
                                <td> { user.name } </td>
                                <td> { user.email } </td>
                                <td> { user.phone } </td>
                                <td> { user.gender === "F" ? "Femenino" : "Masculino" } </td>
                                <td align="center">
                                    <button className="btn btn-dark" onClick={() => handleToggleModal(user)}>Generar QR</button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>

            <div className="modal fade" id="generateQrModal" tabIndex="-1" aria-labelledby="generateQrModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <section>
                                <h5 className="modal-title" id="exampleModalLabel">Generando Qr</h5>
                                <small>Genera un código Qr de acceso.</small>
                            </section>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => modal.hide()}></button>
                        </div>
                        <div className="modal-body text-center">
                            {
                                <QRCode value={qrValue} level="H" />    
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}

export default Users