"use client";
import React from "react";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import {
  Square3Stack3DIcon,
  SunIcon,
  BuildingLibraryIcon,
} from "@heroicons/react/24/outline";

const AccordionCustomDetails: React.FC<{ data: string[] }> = ({ data }) => {
  const [openAcc1, setOpenAcc1] = React.useState(true);
  const [openAcc2, setOpenAcc2] = React.useState(true);
  const [openAcc3, setOpenAcc3] = React.useState(true);

  const handleOpenAcc1 = () => setOpenAcc1((cur) => !cur);
  const handleOpenAcc2 = () => setOpenAcc2((cur) => !cur);
  const handleOpenAcc3 = () => setOpenAcc3((cur) => !cur);

  return (
    <>
      <Accordion open={openAcc1} placeholder={undefined}>
        <AccordionHeader
          className="flex gap-x-4 justify-start"
          onClick={handleOpenAcc1}
          placeholder={undefined}
        >
          <SunIcon className="w-6 h-6" />
          Guidance
        </AccordionHeader>
        <AccordionBody>
          <div className="whitespace-pre-line">{data[0]}</div>
        </AccordionBody>
      </Accordion>
      <Accordion open={openAcc2} placeholder={undefined}>
        <AccordionHeader
          className="flex gap-x-4 justify-start"
          onClick={handleOpenAcc2}
          placeholder={undefined}
        >
          <BuildingLibraryIcon className="w-6 h-6" />
          Class Details
        </AccordionHeader>
        <AccordionBody>
          <div className="whitespace-pre-line">{data[1]}</div>
        </AccordionBody>
      </Accordion>
      <Accordion open={openAcc3} placeholder={undefined}>
        <AccordionHeader
          className="flex gap-x-4 justify-start"
          onClick={handleOpenAcc3}
          placeholder={undefined}
        >
          <Square3Stack3DIcon className="w-6 h-6" />
          More Details
        </AccordionHeader>
        <AccordionBody>
          <div className="whitespace-pre-line">{data[2]}</div>
        </AccordionBody>
      </Accordion>
    </>
  );
};

export default AccordionCustomDetails;
