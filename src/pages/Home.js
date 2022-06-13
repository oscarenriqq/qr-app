import { useState } from "react";
import Scanner from "../components/Scanner";

function Home() {
    
    const [scanError, setScanError] = useState(false)

    return (
        <>
            <Scanner scanError={setScanError} />
            {
                scanError && <>
                    <div className="alert alert-danger alert-dismissible fade show mt-4" role="alert">
                        <strong>Upsss!</strong> Ha ocurrido un error registrando la nueva entrada.
                        <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                    </div>
                </>
            }
        </>
    )
    
}

export default Home