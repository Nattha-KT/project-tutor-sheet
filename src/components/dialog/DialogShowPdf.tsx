import { cn } from "@/lib/utils";
import { Toaster } from "react-hot-toast";

interface DialogProps extends React.HTMLAttributes<HTMLElement>{
  name_id: string;
  pdfUrl:string
}

export default function ViewerPDF({ name_id,pdfUrl, className }: DialogProps) {
  // console.log(pdfUrl);
    return (
      <dialog id={`${name_id}`} className="modal">
        <Toaster/>
        <div className={cn("modal-box p-0 w-auto md:min-w-[60%] h-auto m-0",className)}>
          <iframe src={pdfUrl} width="100%" height="800px" />
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    )
  }
