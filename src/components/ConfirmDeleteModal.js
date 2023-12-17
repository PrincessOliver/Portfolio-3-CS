import { toast } from 'react-toastify';

export const ConfirmDeleteModal = ({ shown, setShown, endpoint, message, getData }) => {
    
    const remove = async () => {
        const res = await fetch(`${endpoint}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const json = await res.json();

        if (json) {
            toast.success(message);
            setShown(false)
            getData()
        }
    }

    return (
        <>
            <div onClick={() => setShown(false)} className="background" style={{ display: shown ? 'block' : 'none' }}>
                <div onClick={(e) => e.stopPropagation()} className="confirm-modal center">
                    <button onClick={() => setShown(false)} type="button" className="btn-close" aria-label="Close"></button>
                    <div className="center">
                        <div>Are you sure?</div>
                        <div className="confirm-modal-btns">
                            <button onClick={() => setShown(false)}>No</button>
                            <button onClick={remove}>Yes</button>
                        </div>
                    </div>
                </div>
            </div>
        </>                     
    )
}