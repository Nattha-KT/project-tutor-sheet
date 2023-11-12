import React from 'react'
import AddFaq from './AddFaq'
import EditFaq from './EditFaq'

export  function DialogFaqAdd() {
  return (
   <>
    <dialog id="modal_faq_add" className="modal">
        <div className='modal-box p-0 w-auto sm:min-w-[540px] m-0 bg-slate-50'>
            <AddFaq/>
        </div>
        <form method="dialog" className="modal-backdrop">
        <button>close</button>
        </form>
    </dialog>

   </>
  )
}


export  function DialogFaqEdit({id}:{id:string}) {
    return (
     <>
      <dialog id={ `modal_faq_edit_${id}`} className="modal">
          <div className='modal-box p-0 w-auto sm:min-w-[540px] m-0 bg-slate-50'>
              <EditFaq id={id}/>
          </div>
          <form method="dialog" className="modal-backdrop">
          <button>close</button>
          </form>
      </dialog>
     </>
    )
  }