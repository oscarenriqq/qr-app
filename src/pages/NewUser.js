import { useRef, useState } from "react"

function NewUser() {

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [gender, setGender] = useState("F")
    const [userAdded, setUserAdded] = useState(false)

    const onChangeName = (e) => setName(e.target.value)
    const onChangeEmail = (e) => setEmail(e.target.value)
    const onChangePhone = (e) => setPhone(e.target.value)
    const onChangeGender = (e) => setGender(e.target.value)

    const formRef = useRef()

    const handleSubmit = (e) => {
        e.preventDefault()

        const userBody = {
            name,
            email,
            phone,
            gender
        }

        fetch('http://localhost:3001/api/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userBody)
        })
        .then(response => response.json())
        .then(user => {
            setName("")
            setEmail("")
            setPhone("")
            setGender("F")

            setUserAdded(true)
        })

    }

    return (
        <>
            {
                userAdded && (
                    <div className="alert alert-success alert-dismissible fade show mt-4" role="alert">
                        Usuario agregado correctamente!
                        <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                    </div>
                )
            }
            
            <form onSubmit={handleSubmit} ref={formRef}>
                <div className="mb-3">
                    <label className="form-label">Nombre</label>
                    <input 
                        type="text"
                        className="form-control"
                        value={name}
                        onChange={onChangeName}
                        placeholder="Nombre del usuario" 
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input 
                        type="email"
                        className="form-control"
                        value={email}
                        onChange={onChangeEmail}
                        placeholder="Email" 
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Teléfono</label>
                    <input 
                        type="text"
                        value={phone}
                        onChange={onChangePhone}
                        className="form-control"
                        placeholder="Teléfono" 
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Género</label>
                    <select 
                        className="form-select"
                        onChange={onChangeGender}
                        value={gender}
                        required
                    >
                        <option value="F">Femenino</option>
                        <option value="M">Masculino</option>
                    </select>
                </div>
                <button className="btn btn-primary" type="submit">Registrar</button>
            </form>
        </>
    )
}

export default NewUser