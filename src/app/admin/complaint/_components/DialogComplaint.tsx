import { Toaster } from "react-hot-toast";

export function DialogComplaint({ id ,content}: { id: string ,content:string }) {
  return (
    <dialog id={`${id}`} className="modal">
      <Toaster />
      <div className="modal-box  w-auto min-w-[340px] md:min-w-[740px] m-0 shadow-none p-5 bg-gray-50/70 ">
        <div className="  flex flex-col items-center gap-y-2">
          <h1 className=" text-2xl font-semibold text-gray-600">Content</h1>
          <div className=" border border-gray-200 p-4 rounded-xl text-sm text-gray-500 font-light bg-white">
           {content}
          </div>
        </div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
}
