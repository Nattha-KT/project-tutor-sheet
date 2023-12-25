import { cn } from "@/lib/utils";
import { Toaster } from "react-hot-toast";

interface DialogProps extends React.HTMLAttributes<HTMLElement>{
  name_id: string;
  component: () => React.ReactElement; // กำหนดให้รับ element ของ React
}

export default function Dialog({ name_id, component, className }: DialogProps) {
    return (
      <dialog id={`${name_id}`} className="modal">
        <Toaster/>
        <div className={cn("modal-box p-0 w-auto md:min-w-[740px] m-0",className
        )}>
          {component()}
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    )
  }
