
type DialogDeleteProps={
  name_id:string
  title ?:string
  setDeleted?: React.Dispatch<React.SetStateAction<boolean>>
}
export default  function DialogDelete({name_id,title,setDeleted}:DialogDeleteProps) {
    return (
      <dialog id={`${name_id}`} className="modal modal-bottom sm:modal-middle">
        <div className='modal-box w-auto sm:min-w-[340px] m-0'>
          <h3 className="font-bold text-[25px]">{`Delete ${title}!`}</h3>
          <p className="py-4">Once you delete it, it cannot be recovered. If you don&apos;t want to delete, press close. If you want to delete it, press confirm.</p>
          <div className="modal-action">
            <form method="dialog" className="flex gap-5">
              {/* if there is a button in form, it will close the modal */}
              <button color="green" className='btn bg-green-500 text-white hover:bg-green-400'
              onClick={()=>setDeleted && setDeleted(true)}
              >confirm</button>
              <button className="btn">Close</button>
            </form>
         </div>
        </div>
      </dialog>
    )
  }