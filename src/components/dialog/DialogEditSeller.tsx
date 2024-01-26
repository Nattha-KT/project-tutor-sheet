import EditSeller from "@/app/seller/_components/EditSeller"
import { Toaster } from "react-hot-toast"

type Banks = {
    id: string
    name: string
  }

type EditSellerProps={
    name_id: string,
    banks:Banks[],
    data_seller:any
}

export default function DialogEditSeller({name_id,banks,data_seller}:EditSellerProps) {

    return (
      <dialog id={`${name_id}`} className="modal"> 
      <Toaster/>
        <div className='modal-box p-0 w-auto sm:min-w-[26rem] m-0 bg-transparent shadow-none'>
            <EditSeller banks={banks} data_seller={data_seller} />
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    )
}