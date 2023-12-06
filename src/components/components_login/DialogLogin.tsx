import LoginPage from "./LoginPage";


export default function DialogLogin({name_id}:{name_id:string}) {
  return (
    <dialog id={`${name_id}`} className="modal">
      <div className='modal-box p-0 w-auto sm:min-w-[740px] m-0'>
          <LoginPage/>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  )
}