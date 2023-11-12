import LoginPage from "./LoginPage";


export default function DialogLogin() {
  return (
    <dialog id="modal_login" className="modal">
              <div className='modal-box p-0 w-auto sm:min-w-[740px] m-0'>
                <LoginPage/>
              </div>
                <form method="dialog" className="modal-backdrop">
                  <button>close</button>
                </form>
    </dialog>
  )
}