"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { RatingStar } from "@/components/RatingStar";
import {
  BookOpenIcon,
  BuildingLibraryIcon,
  CreditCardIcon,
  IdentificationIcon,
  MegaphoneIcon,
  PencilIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { DialogDelete, DialogEditSeller } from "@/components/dialog";
import { Textarea } from "@material-tailwind/react";
import { Rate } from "antd";
import { Seller } from "../../../../types/type";
import { getBanks } from "@/services/server/user/api";
import toast from "react-hot-toast";
import { DeleteSeller, UpdateSeller } from "@/services/client/seller/api";

type User = {
  name: string;
  email: string;
};

interface ProfileSellerProps extends Seller {
  user: User[];
  _count: number;
  ratingSeller: number;
  reviewser: number;
}

type Banks = {
  id: string;
  name: string;
};

const handleDelete = async () => {
  toast.loading("Deleting request... 🚀👩🏾‍🚀", { id: "1" });
  const res = await DeleteSeller();
  if (res.message !== "Success") {
    toast.error("Error occurred during deletion: Delete Seller", { id: "1" });
  } else {
    toast.success("Deleted! 🚀✔️", { id: "1" });
    setTimeout(() => {
      window.location.href = "/admin/monitor-seller";
    }, 1000);
  }
};

export default function Profile({ seller }: { seller: ProfileSellerProps }) {
  const [dataSeller, setDataSeller] = useState<ProfileSellerProps>();
  const [showForm, setShowForm] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const [banks, setBank] = useState<Banks[]>([]);
  const [confirmDelete, setConfirmDelete] = useState<boolean>(false);
  // console.log(confirmDelete)

  const uploadAboutMe = async () => {
    setLoading(true);
    if (!dataSeller)
      return toast.error("Error DataSeller is null", { id: "1" });
    const res = await UpdateSeller(dataSeller);
    if (res.message !== "Success")
      return toast.error("Error occured during upload", { id: "1" });
    setLoading(false);
    setShowForm(false);
  };

  useEffect(() => {
    const fetchBank = async () => {
      const res = await getBanks();
      if (!res) return;
      setBank(res);
    };
    fetchBank();
    setDataSeller(seller);
  }, []);

  useEffect(() => {
    if (!confirmDelete) return;
    const deleteNow = async () => {
      await handleDelete();
      setConfirmDelete(false);
    };
    deleteNow();
  }, [confirmDelete]);

  return (
    <div className=" flex flex-col px-6 py-3">
      <div
        id="profile-background"
        className=" min-w-full  z-0 p-0 flex justify-center md:justify-start md:pl-8"
      >
        <Image
          src={dataSeller?.image || "/images/bg1.jpg"}
          width={1000}
          height={1000}
          alt="Profile-seller"
          className="w-44 h-44 rounded-full border-2 border-white p-2"
        />
      </div>
      <div
        id="profile-header"
        className=" mt-[-5.6rem] md:ml-[7.5rem] bg-white rounded-2xl shadow-md p-4"
      >
        <div className=" md:pl-[6rem] pt-[5rem]  md:pt-0 flex flex-col lg:flex-row justify-between gap-y-3">
          <div
            id="show-name-point"
            className=" flex flex-col md:flex-row gap-y-3 gap-x-8 text-slate-900"
          >
            <p className="flex items-center justify-center md:mt-[-1rem] text-3xl font-sans font-bold text-center">
              {dataSeller?.pen_name}
            </p>
            <div className=" flex flex-col md:flex-row justify-center gap-x-2 gap-1 items-center md:mt-[-1rem]">
              <Rate allowHalf disabled defaultValue={seller.ratingSeller} />
              <span className="sm:pt-2 text-sm text-gray-500">{`(${seller.ratingSeller})  ${seller.reviewser} reviews`}</span>
            </div>
          </div>
          <div
            id="button-edit-delete"
            className=" z-10  flex flex-col sm:flex-row gap-3 items-center justify-center md:justify-start"
          >
            <button
              className="btn bg-slate-800 hover:bg-slate-700 text-white flex items-center gap-3"
              onClick={() =>
                (
                  document.getElementById(
                    `Edit_profile_${dataSeller?.id}`
                  ) as HTMLDialogElement
                ).showModal()
              }
            >
              <PencilSquareIcon className="h-4 w-4" />
              Edit profile
            </button>
            <DialogEditSeller
              name_id={`Edit_profile_${dataSeller?.id}`}
              banks={banks}
              data_seller={seller}
            />
            <button
              className="btn bg-white hover:bg-gray-100 border border-slate-500  flex items-center gap-3"
              onClick={() =>
                (
                  document.getElementById(
                    `delete_profile_${dataSeller?.id}`
                  ) as HTMLDialogElement
                ).showModal()
              }
            >
              <TrashIcon className="h-4 w-4" />
              Delete
            </button>
            <DialogDelete
              name_id={`delete_profile_${dataSeller?.id}`}
              title="Account"
              setDeleted={setConfirmDelete}
            />
          </div>
        </div>
      </div>
      <div
        id="Description"
        className=" mt-[-1.5rem] bg-white  min-h-[10rem] pt-[3rem] px-8 rounded-2xl pb- shadow-sm"
      >
        <h1 className=" flex items-center pb-2 gap-2 border-b border-gray-100 uppercase text-sm font-semibold text-gray-600">
          <MegaphoneIcon className=" h-5 w-5" />
          About me
          <div className=" flex items-center gap-3  lowercase font-thin text-gray-500 border-l border-gray-200 ml-6 pl-6">
            <button
              type="submit"
              className={`${
                dataSeller?.about_me && showForm ? "block" : "hidden"
              } flex items-center px-3 py-1 no-underline bg-sky-500 text-white rounded-lg`}
              onClick={() => uploadAboutMe()}
            >
              {loading ? (
                <span className="loading loading-dots loading-xs hover:cursor-pointer"></span>
              ) : (
                "sumbit"
              )}
            </button>
            <button
              className="flex items-center underline gap-1 "
              onClick={() => setShowForm((prev) => !prev)}
            >
              <PencilIcon className="w-3 h-3" />
              {!showForm ? "write" : "cancel"}
            </button>
          </div>
        </h1>
        {showForm ? (
          <div className=" mt-4">
            <Textarea
              label="message"
              name="about_me"
              value={dataSeller?.about_me}
              color="blue"
              onChange={(e) => {
                setDataSeller(
                  (prevValue) =>
                    ({
                      ...prevValue,
                      about_me: e.target.value,
                    } as ProfileSellerProps)
                );
              }}
            />
          </div>
        ) : (
          <p className=" px-3 sm:px-6 py-4 text-sm text-gray-500 font-light whitespace-pre-line">
            {dataSeller?.about_me || ""}
          </p>
        )}
      </div>

      <div
        id="content"
        className=" pt-[2rem] pb-10 flex flex-col gap-3 md:flex-row  mt-3 bg-white rounded-2xl shadow-sm p-4"
      >
        <div
          id="detail-account"
          className=" flex flex-col border border-stone-200 shadow-md flex-1  pb-4 gap-y-4 rounded-xl"
        >
          <div className="flex items-center gap-x-2 p-2 text-base  font-medium text-gray-800 bg-gray-200 rounded-t-md">
            <IdentificationIcon className=" w-5 h-5" />
            Personal information
          </div>
          <div className=" flex flex-col px-2 sm:px-4  gap-y-4">
            <div className=" flex flex-col gap-x-2 ">
              <label className=" text-sm font-normal text-gray-600">
                {" "}
                Fullname:
              </label>
              <div className="  bg-stone-50 border border-gray-100 rounded-lg py-1 px-3 text-sm ">
                {dataSeller?.full_name}
              </div>
            </div>
            <div className=" flex flex-col  gap-x-2 ">
              <label className=" text-sm font-normal text-gray-600">
                {" "}
                Account name:
              </label>
              <div className=" bg-gray-50 border border-gray-100  rounded-lg py-1 px-3 text-sm ">
                {dataSeller?.user && dataSeller.user.length !== 0
                  ? dataSeller.user[0].email
                  : ""}
              </div>
            </div>
            <div className=" flex flex-col  gap-x-2 ">
              <label className=" text-sm font-normal text-gray-600">
                {" "}
                Email:
              </label>
              <div className=" bg-gray-50 border border-gray-100  rounded-lg py-1 px-3 text-sm ">
                {dataSeller?.user && dataSeller.user.length !== 0
                  ? dataSeller.user[0].email
                  : ""}
              </div>
            </div>
            <div className=" flex flex-col  gap-x-2 ">
              <label className=" text-sm font-normal text-gray-600">
                {" "}
                Phone:
              </label>{" "}
              text-sm
              <div className=" bg-gray-50 border border-gray-100  rounded-lg py-1 px-3 ">
                {dataSeller?.phone}
              </div>
            </div>
            <div className=" flex flex-col  gap-x-2 ">
              <label className=" text-sm font-normal text-gray-600">
                {" "}
                Address:
              </label>
              <div className=" bg-gray-50 border border-gray-100  rounded-lg py-1 px-3 text-sm ">
                {dataSeller?.address as string}
              </div>
            </div>
          </div>
        </div>
        <div className=" flex flex-1 flex-col gap-y-3 ">
          <div className="flex gap-3 flex-col sm:flex-row">
            <div className="stats shadow-md bg-white flex-1 border border-gray-200">
              <div className="stat">
                <div className="stat-title  text-gray-500">
                  Total Sheet Upload
                </div>
                <div className="stat-value flex items-center">
                  {dataSeller?._count}
                  <BookOpenIcon className=" w-9 h-9 text-pink-600 ml-5" />
                </div>
                <div className="stat-desc">21% more than last month</div>
              </div>
            </div>
            <div className="stats shadow-md bg-white flex-1 border border-gray-200">
              <div className="stat">
                <div className="stat-title text-gray-500">Number of trades</div>
                <div className="stat-value flex items-center">
                  {234}
                  <CreditCardIcon className=" w-9 h-9 text-pink-600 ml-5" />
                </div>
                <div className="stat-desc">21% more than last month</div>
              </div>
            </div>
          </div>

          <div
            id="bank-account"
            className=" flex flex-col border border-gray-200 shadow-md flex-1   rounded-xl"
          >
            <div className="flex items-center gap-x-1 p-2 text-base font-medium text-gray-800 bg-gray-200 rounded-t-md">
              <BuildingLibraryIcon className=" w-5 h-5" />
              Bank account
            </div>
            <div className="flex flex-col px-2 sm:px-4   py-4 gap-y-4 ">
              <Image
                src={"/Icons/all-bank.png"}
                width={150}
                height={150}
                alt="all-bank"
              />
              <div className=" flex flex-col gap-x-2 ">
                <label className=" text-sm font-normal text-gray-600">
                  {" "}
                  Bank name:
                </label>
                <div className="  bg-stone-50 border border-gray-100 rounded-lg py-1 px-3 ">
                  {dataSeller?.bank_name}
                </div>
              </div>
              <div className=" flex flex-col  gap-x-2 ">
                <label className=" text-sm font-normal text-gray-600">
                  {" "}
                  Bank ID:
                </label>
                <div className=" bg-gray-50 border border-gray-100  rounded-lg py-1 px-3 ">
                  {dataSeller?.bank_id}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
