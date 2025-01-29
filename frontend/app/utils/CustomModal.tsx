import React, { Component } from 'react'
import {Modal,Box} from '@mui/material'
type Props = {
    open:boolean,
    setOpen:(open:boolean)=>void,
    activeItem:any,
    component:any,
    setRoute?:(route:string)=>void,
}

const CustomModal: React.FC<Props> = ({ open, setOpen, setRoute, component: Component }) => {
    return (
    <Modal
    open={open}
    onClose={()=>setOpen(false)}
    aria-labelledby='modal-modal-title'
    aria-describedby='modal-modal-description'
    >
        <Box
        className="overflow-hidden absolute top-[20%] left-[50%] -translate-x-1/2 w-[450px] p-6 md-[450px] border-none  bg-white dark:bg-slate-900 rounded-[8px]"
        >
            <Component setOpen={setOpen} setRoute={setRoute}/>
        </Box>
    </Modal>
  )
}

export default CustomModal