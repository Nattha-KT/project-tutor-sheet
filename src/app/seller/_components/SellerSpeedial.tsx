"use client"
import {
  IconButton,
  SpeedDial,
  SpeedDialHandler,
  SpeedDialContent,
  SpeedDialAction,
  Tooltip,
} from "@material-tailwind/react";
import {
  HomeIcon,
  PlusIcon,
  PresentationChartBarIcon,
  PencilSquareIcon,
  DocumentPlusIcon,
  UserCircleIcon
} from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export function SellerSpeedDial() {
  const router = useRouter();
  const {data:session} = useSession()
  
  return (
    <div className="relative min-h-full w-full">
      <div className="fixed bottom-6 right-4 z-50">
        <SpeedDial>
          <SpeedDialHandler>
            <IconButton  placeholder={undefined} size="lg" className="rounded-full">
              <PlusIcon className="h-5 w-5 transition-transform group-hover:rotate-45" />
            </IconButton>
          </SpeedDialHandler>
          <SpeedDialContent  placeholder={undefined}>
            <Tooltip content="Seller Dashboard" placement="left" >
              <SpeedDialAction  onClick={() => router.push("/seller")}  placeholder={undefined}>
                <HomeIcon className="h-5 w-5" />
              </SpeedDialAction>
            </Tooltip>
            <Tooltip content={"Transation"} placement="left">
              <SpeedDialAction onClick={() => router.push("#")}  placeholder={undefined}>
                <PresentationChartBarIcon className="h-5 w-5" />
              </SpeedDialAction>
            </Tooltip>
            <Tooltip content={"Profile Seller"} placement="left">
              <SpeedDialAction onClick={() => window.location.href =`/seller/profile`}  placeholder={undefined}>
                <UserCircleIcon className="h-5 w-5" />
              </SpeedDialAction>
            </Tooltip>
            <Tooltip content={"Edit Prosile Seller"} placement="left">
              <SpeedDialAction onClick={() => window.location.href =`/seller/edit-seller/${session!.user.sid}`}  placeholder={undefined}>
                <PencilSquareIcon className="h-5 w-5" />
              </SpeedDialAction>
            </Tooltip>
            <Tooltip content={"Add new sheet"} placement="left">
              <SpeedDialAction onClick={() => window.location.href =`/seller/new-sheet`}  placeholder={undefined}>
                <DocumentPlusIcon className="h-5 w-5" />
              </SpeedDialAction>
            </Tooltip>
          </SpeedDialContent>
        </SpeedDial>
      </div>
    </div>
  );
}
