"use client";
import {
  IconButton,
  SpeedDial,
  SpeedDialHandler,
  SpeedDialContent,
  SpeedDialAction,
} from "@material-tailwind/react";
import {
  PlusIcon,
  HomeIcon,
  CogIcon,
  Square3Stack3DIcon,
  EnvelopeOpenIcon,
  EnvelopeIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";
import { UseCommentType } from "@/hooks/useComment";
import CommentForm from "./CommentForm";

export function SpeedDialCustom({ state }: { state: UseCommentType }) {
  const [showContent, setShowContent] = useState<boolean>(true);

  return (
 
        <SpeedDial
          placement="right"
          open={showContent}
          className="flex flex-row items-center pt-0"
        >
          <SpeedDialHandler className="">
            <IconButton
              size="lg"
              className="rounded-full"
              onClick={() => setShowContent((prev) => !prev)}
            >
              {showContent ? (
                <EnvelopeOpenIcon className="h-5 w-5" />
              ) : (
                <EnvelopeIcon className="h-5 w-5" />
              )}
            </IconButton>
          </SpeedDialHandler>
          { showContent &&
            <div className=" w-full">
                {/* <CommentForm state={state} /> */}
            </div>
          }
        </SpeedDial>
   
  );
}
