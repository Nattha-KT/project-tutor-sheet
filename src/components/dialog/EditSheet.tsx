
import EditSheet from "@/app/seller/_components/EditSheet"
import { PropSheet } from "../../../types/type"
import { Toaster } from "react-hot-toast"


export default function DialogEditSheet({name_id,sheet}:{name_id:string,sheet:PropSheet}) {

    return (
      <dialog id={`${name_id}`} className="modal"> 
      <Toaster/>
        <div className='modal-box p-0 w-auto sm:min-w-[440px] m-0'>
           <EditSheet sheet= {sheet}/>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    )
}