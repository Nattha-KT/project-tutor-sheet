"use client";
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
  RectangleStackIcon,
} from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import Link from "next/link";

export function AdminSpeedDial() {
  const router = useRouter();

  return (
    <div className="relative min-h-full w-full">
      <div className="fixed bottom-6 right-4 z-50">
        <SpeedDial>
          <SpeedDialHandler>
            <IconButton
              placeholder={undefined}
              size="lg"
              className="rounded-full"
            >
              <PlusIcon className="h-5 w-5 transition-transform group-hover:rotate-45" />
            </IconButton>
          </SpeedDialHandler>
          <SpeedDialContent placeholder={undefined}>
            <Tooltip content="Admin Dashboard" placement="left">
              <Link href={"/admin"} prefetch={true}>
                <SpeedDialAction placeholder={undefined}>
                  <HomeIcon className="h-5 w-5" />
                </SpeedDialAction>
              </Link>
            </Tooltip>
            <Tooltip content={"Transaction"} placement="left">
              <Link href={"/admin"} prefetch={true}>
                <SpeedDialAction placeholder={undefined}>
                  <PresentationChartBarIcon className="h-5 w-5" />
                </SpeedDialAction>
              </Link>
            </Tooltip>
            <Tooltip content={"Manage question"} placement="left">
              <Link href={"/admin/manage-faq"} prefetch={true}>
                <SpeedDialAction placeholder={undefined}>
                  <QuestionMarkCircleIcon className="h-5 w-5" />
                </SpeedDialAction>
              </Link>
            </Tooltip>
            <Tooltip content={"Monitor Seller"} placement="left">
              <Link href={"/admin/monitor-seller"} prefetch={true}>
                <SpeedDialAction placeholder={undefined}>
                  <ComputerDesktopIcon className="h-5 w-5" />
                </SpeedDialAction>
              </Link>
            </Tooltip>
            <Tooltip content={"Approve Sheet"} placement="left">
              <Link href={"/admin/approvals"} prefetch={true}>
                <SpeedDialAction placeholder={undefined}>
                  <CheckBadgeIcon className="h-5 w-5" />
                </SpeedDialAction>
              </Link>
            </Tooltip>
            <Tooltip content={"Complain management"} placement="left">
              <Link href={"/admin/complaint"} prefetch={true}>
                <SpeedDialAction placeholder={undefined}>
                  <RectangleStackIcon className="h-5 w-5" />
                </SpeedDialAction>
              </Link>
            </Tooltip>
          </SpeedDialContent>
        </SpeedDial>
      </div>
    </div>
  );
}
