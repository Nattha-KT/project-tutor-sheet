
import { Toaster } from 'react-hot-toast'
import EditFaq from '../../app/admin/manage-faq/_components/EditFaq'

export  function DialogFaqEdit({id}:{id:string}) {
    return (
      <dialog id={ `modal_faq_edit_${id}`} className="modal">
          <Toaster/>
          <div className='modal-box p-0 w-auto min-w-[340px] md:min-w-[740px] bg-opacity-0 m-0 shadow-none  bg-gray-50'>
              <EditFaq id={id}/>
          </div>
          <form method="dialog" className="modal-backdrop">
          <button>close</button>
          </form>
      </dialog>

    )
  }