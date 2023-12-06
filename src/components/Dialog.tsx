'use client'

import EditSheet from "@/app/seller/_components/EditSheet"
import { PropSheet } from "../../types/type"


export default function Dialog({name_id}:{name_id:string}) {
    return (
      <dialog id={`${name_id}`} className="modal">
        <div className='modal-box p-0 w-auto sm:min-w-[740px] m-0'>
            {/* something  */}
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    )
  }


  export  function DialogEditSheet({name_id,sheet}:{name_id:string,sheet:PropSheet}) {

  
    return (
      <dialog id={`${name_id}`} className="modal">
        <div className='modal-box p-0 w-auto sm:min-w-[440px] m-0'>
           <EditSheet sheet= {sheet} id={name_id}/>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    )
  }