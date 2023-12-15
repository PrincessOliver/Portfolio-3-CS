export const ConfirmDeleteModal = ({ shown, setShown, removeItem, removeAllItems, id, request }) => {
    return (
        <div onClick={() => setShown(false)} className="background" style={{ display: shown ? 'block' : 'none' }}>
            <div onClick={(e) => e.stopPropagation()} className="confirm-modal center">
                <button onClick={() => setShown(false)} type="button" className="btn-close" aria-label="Close"></button>
                <div className="center">
                    <div>Are you sure?</div>
                    <div className="confirm-modal-btns">
                        <button onClick={() => setShown(false)}>No</button>
                        <button
                            onClick={() => {
                                if (request === 'all') {
                                    removeAllItems()
                                } else if (request === 'one') {
                                    removeItem(id)
                                }
                                setShown(false)
                            }}
                         >
                            Yes
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}