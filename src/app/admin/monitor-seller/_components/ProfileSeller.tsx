'use client'
import { RatingStar } from '@/components/RatingStar';
import { DialogDelete,DialogEditSeller } from '@/components/dialog';
import useProfileSeller from '@/hooks/useProfileSeller';
import { PencilSquareIcon, TrashIcon, BookOpenIcon,CreditCardIcon,BuildingLibraryIcon,IdentificationIcon} from '@heroicons/react/24/outline';
import { Rate } from 'antd';
import Image from 'next/image';


export default function ProfileSeller({seller}:{seller:any}) {

  const {banks,setConfirmDelete} = useProfileSeller(seller)

  return (
  <div className=' container min-w-full bg-slate-200/60 rounded-lg min-h-screen '>
    <div className=' flex flex-col px-6 py-3'>
      <div id="profile-background" className=' min-w-full  z-0 p-0 flex justify-center md:justify-start md:pl-8'>
          <Image src={`${seller.image}`} width={600} height={600} alt='Profile-seller' 
          className='w-44 h-44 rounded-full border-2 border-white p-2'/>
      </div>
      <div id="profile-header" className=' mt-[-5.6rem] md:ml-[7.5rem] bg-gray-50 rounded-lg shadow-md p-4'>
          <div className=' md:pl-[6rem] pt-[5rem]  md:pt-0 flex flex-col lg:flex-row justify-between gap-y-3'>
              <div id="show-name-point" className=' flex flex-col md:flex-row gap-y-3 gap-x-8 text-slate-900'>
                  <p className='flex items-center justify-center md:mt-[-1rem] text-3xl font-extrabold text-center'>
                      {seller.pen_name}
                  </p>
                   <div className=' flex justify-center items-center md:mt-[-1rem] gap-2'>
                    <Rate allowHalf value={seller.ratingSeller} className=' pb-1' disabled/>
                    <span className=' text-sm text-gray-500 font-light'>{`(${seller.ratingSeller})  ${seller.reviewser} reviews`}</span>
                   </div>
              </div>
              <div id="button-edit-delete" className=' z-10  flex flex-col sm:flex-row gap-3 items-center justify-center md:justify-start'>
                  <button className="btn bg-slate-800 hover:bg-slate-700 text-white flex items-center gap-3"
                      onClick={() => (document.getElementById(`edit_${seller.id}`) as HTMLDialogElement).showModal()}
                  >
                      <PencilSquareIcon  className="h-4 w-4" />
                      Edit profile
                  </button>
                  <DialogEditSeller name_id={`edit_${seller.id}`} banks={banks} data_seller={seller} />
                  <button className="btn bg-white hover:bg-gray-100 border border-slate-500  flex items-center gap-3"
                     onClick={() => (document.getElementById(`delete_${seller.id}`) as HTMLDialogElement).showModal()}
                  >
                      <TrashIcon  className="h-4 w-4" />
                          Delete
                  </button>
                  <DialogDelete name_id={`delete_${seller.id}`} title='Account' setDeleted={setConfirmDelete}/>
              </div>
          </div>
      </div>
      <div id="content" className=' pt-[2rem] pb-10 flex flex-col gap-3 md:flex-row md:mt-[-0.65rem] mt-3  bg-gray-50 rounded-lg shadow-md p-4'>
          <div id="detail-account" className=' flex flex-col border border-stone-200 flex-1  pb-4 gap-y-4 rounded-xl'>
           <div className='flex items-center gap-x-2 p-2 text-base font-medium text-white bg-slate-800 rounded-t-md'>
              <IdentificationIcon className=' w-5 h-5'/>
              Personal information
           </div>
           <div className=' flex flex-col px-2 sm:px-4  gap-y-4'>
              <div className=' flex flex-col gap-x-2 '>
                  <label className=' text-sm font-normal text-gray-600'> Fullname:</label>
                  <div className='  bg-stone-50 border border-gray-100 rounded-lg py-1 px-3 '>{seller.full_name}</div>
              </div>
              <div className=' flex flex-col  gap-x-2 '>
                  <label className=' text-sm font-normal text-gray-600'>  Account name:</label>
                  <div className=' bg-gray-50 border border-gray-100  rounded-lg py-1 px-3 '>{seller.length > 0 ?  seller.user[0]?.name :""}</div>
              </div>
              <div className=' flex flex-col  gap-x-2 '>
                  <label className=' text-sm font-normal text-gray-600'> Email:</label>
                  <div className=' bg-gray-50 border border-gray-100  rounded-lg py-1 px-3 '>{ seller.length > 0 ? seller.user[0]?.email :""}</div>
              </div>
              <div className=' flex flex-col  gap-x-2 '>
                  <label className=' text-sm font-normal text-gray-600'> Phone:</label>
                  <div className=' bg-gray-50 border border-gray-100  rounded-lg py-1 px-3 '>{seller.phone}</div>
              </div>
              <div className=' flex flex-col  gap-x-2 '>
                  <label className=' text-sm font-normal text-gray-600'> Address:</label>
                  <div className=' bg-gray-50 border border-gray-100  rounded-lg py-1 px-3 '>{seller.address}</div>
              </div>
           </div> 
          </div>
          <div className=' flex flex-1 flex-col gap-y-3 '>
              <div className='flex gap-3 flex-col sm:flex-row'>
                  <div className="stats shadow-lg bg-white flex-1">
                      <div className="stat">
                          <div className="stat-title  text-gray-500">Total Sheet Upload</div>
                          <div className="stat-value flex items-center">{seller.sheetCount}
                              <BookOpenIcon className=' w-9 h-9 text-pink-600 ml-5'/>
                          </div>
                          <div className="stat-desc">21% more than last month</div>
                      </div>
                  </div>
                  <div className="stats shadow-lg bg-white flex-1">
                      <div className="stat">
                          <div className="stat-title text-gray-500">Number of trades</div>
                          <div className="stat-value flex items-center">{234}
                              <CreditCardIcon className=' w-9 h-9 text-pink-600 ml-5'/>
                          </div>
                          <div className="stat-desc">21% more than last month</div>
                      </div>
                  </div>
              </div>
        
              <div id="detail-account" className=' flex flex-col border border-stone-200 flex-1   rounded-xl'>
                  <div className='flex items-center gap-x-1 p-2 text-base font-medium text-white bg-stone-700 rounded-t-md'>
                      <BuildingLibraryIcon className=' w-5 h-5'/>
                      Bank account 
                  </div>
                  <div className='flex flex-col px-2 sm:px-4   py-4 gap-y-4 '>
                      <Image src={"/Icons/all-bank.png"} width={150} height={150} alt='all-bank'/>
                      <div className=' flex flex-col gap-x-2 '>
                          <label className=' text-sm font-normal text-gray-600'> Bank name:</label>
                          <div className='  bg-stone-50 border border-gray-100 rounded-lg py-1 px-3 '>{seller.bank_name}</div>
                      </div>
                      <div className=' flex flex-col  gap-x-2 '>
                          <label className=' text-sm font-normal text-gray-600'>  Bank ID:</label>
                          <div className=' bg-gray-50 border border-gray-100  rounded-lg py-1 px-3 '>{seller.bank_id}</div>
                      </div>
                  </div>
              </div>
          </div>
      </div>
    </div>
  </div>
  )
}