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
  ComputerDesktopIcon,
  CheckBadgeIcon,
  QuestionMarkCircleIcon,
  RectangleStackIcon
} from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";

export function AdminSpeedDial() {
  const router = useRouter();
  
  return (
    <div className="relative min-h-full w-full">
      <div className="fixed bottom-6 right-4 z-50">
        <SpeedDial>
          <SpeedDialHandler>
            <IconButton size="lg" className="rounded-full">
              <PlusIcon className="h-5 w-5 transition-transform group-hover:rotate-45" />
            </IconButton>
          </SpeedDialHandler>
          <SpeedDialContent>
            <Tooltip content="Admin Dashboard" placement="left" >
              <SpeedDialAction onClick={() => router.push("/admin")}>
                <HomeIcon className="h-5 w-5" />
              </SpeedDialAction>
            </Tooltip>
            <Tooltip content={"Transation"} placement="left">
              <SpeedDialAction onClick={() => router.push("/admin")}>
                <PresentationChartBarIcon className="h-5 w-5" />
              </SpeedDialAction>
            </Tooltip>
            <Tooltip content={"Manage question"} placement="left">
              <SpeedDialAction onClick={() => router.push("/admin/manage-faq")}>
                <QuestionMarkCircleIcon className="h-5 w-5" />
              </SpeedDialAction>
            </Tooltip>
            <Tooltip content={"Monitor Seller"} placement="left">
              <SpeedDialAction
                onClick={() => router.push("/admin/monitor-seller")}
              >
                <ComputerDesktopIcon className="h-5 w-5" />
              </SpeedDialAction>
            </Tooltip>
            <Tooltip content={"Approve Sheet"} placement="left">
              <SpeedDialAction onClick={() => router.push("/admin/approvals")}>
                <CheckBadgeIcon className="h-5 w-5" />
              </SpeedDialAction>
            </Tooltip>
            <Tooltip content={"Complain management"} placement="left">
              <SpeedDialAction onClick={() => router.push("/admin/complaint")}>
                <RectangleStackIcon className="h-5 w-5" />
              </SpeedDialAction>
            </Tooltip>
          </SpeedDialContent>
        </SpeedDial>
      </div>
    </div>
  );
}
