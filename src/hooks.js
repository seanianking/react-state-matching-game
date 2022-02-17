import { useState, useRef, useEffect } from 'react';

const useHover = () => {
    const ref = useRef()
    const [hovered, setHovered] = useState(false);
    const enter = () => {
        setHovered(true)
    }
    const leave = () => {
        setHovered(false)
    }
    useEffect(() => {
        const refCopy = ref;
        //listeners for entering/leaving the tile
        refCopy.current.addEventListener("mouseenter", () => { enter() })
        refCopy.current.addEventListener("mouseleave", () => { leave() })
        //remove event listeners
        refCopy.current.removeEventListener("mouseenter", () => { enter() })
        refCopy.current.removeEventListener("mouseleave", () => { leave() })

    })
    return [ref, hovered]
}

export default useHover;