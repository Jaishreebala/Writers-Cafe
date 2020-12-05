import React, { useState } from 'react'

function Error({ error }) {
    return (
        <div className="error">
            {error}
        </div>
    )
}

export default Error
