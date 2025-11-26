import s from './Goal.module.scss';
import { useEffect, useState, useRef } from 'react';
//components
import Tooltip2 from 'components/General/Tooltip2/Tooltip2';

const Goal = ({ text }) => {
    const [hiddenComment, setHiddenComment] = useState(false);
    const [openTooltip, setOpenTooltip] = useState(false);
    const [commentWidth, setCommentWidth] = useState(256)
    const commentRef = useRef();
    const overlayRef = useRef();

    const handleCommentHidden = () => {
        const result = commentRef.current.offsetWidth + 2 < overlayRef.current.offsetWidth
        setHiddenComment(result)
        result && setCommentWidth(commentRef.current.offsetWidth + 2)
    }

    const handleOpenTooltip = () => {
        setOpenTooltip(true)
    }

    const handleCloseTooltip = () => {
        setOpenTooltip(false)
    }

    useEffect(() => {
        if (commentRef.current && overlayRef.current) {
            handleCommentHidden()
        }

    }, [commentRef, overlayRef])


    useEffect(() => {
        window.addEventListener('resize', handleCommentHidden);
        return () => window.removeEventListener('resize', handleCommentHidden);
    }, []);


    return (
        <>
            <div className={s.root}>
                <div onMouseEnter={handleOpenTooltip} onMouseLeave={handleCloseTooltip} className={s.container}>
                    <p ref={commentRef}>{text}</p>
                </div>
                {hiddenComment && <Tooltip2 open={openTooltip} text={text} maxWidth={commentWidth > 300 ? commentWidth : 300} left={false} bottom={false} />}
            </div>


            <p ref={overlayRef} className={s.over}>{text}</p>
        </>

    )
};

export default Goal;