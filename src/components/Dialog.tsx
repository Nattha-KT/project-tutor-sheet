'use client'

import EditSheet from "@/app/seller/_components/EditSheet"
import { PropSheet } from "../../types/type"
import { Button } from "@material-tailwind/react"
import { Toaster } from "react-hot-toast"


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
           <EditSheet sheet= {sheet}/>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    )
  }

  export  function DialogDeleteSheet({name_id,handleDelete}:{name_id:string,handleDelete:()=>void}) {
    return (
      <dialog id={`${name_id}`} className="modal modal-bottom sm:modal-middle">
        <div className='modal-box w-auto sm:min-w-[740px] m-0'>
          <h3 className="font-bold text-[25px]">Delete!</h3>
          <p className="py-4">Once you delete it, it cannot be recovered. If you don't want to delete, press close. If you want to delete it, press confirm.</p>
          <div className="modal-action">
            <form method="dialog" className="flex gap-5">
              {/* if there is a button in form, it will close the modal */}
              <button color="green" className='btn bg-green-500 text-white hover:bg-green-400'
              onClick={handleDelete}
              >confirm</button>
              <button className="btn">Close</button>
            </form>
         </div>
        </div>
      </dialog>
    )
  }