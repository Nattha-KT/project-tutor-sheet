
import SellerDashboard from "@/app/seller/_components/SellerDashboard";
import { fetchSheetSid } from "@/services/server/seller/api";
import StatDashboardSeller from "./_components/StatDashboardSeller";
import StateBalance from "@/components/transaction/StateBalance";
import SomethingWrong from "@/components/error-page/SomethingWrong";

export default async function Seller() {

  const results = await fetchSheetSid();

  if (!results) return <SomethingWrong />;

  return (
    <div
      id="dashbard-seller"
      className=" container min-w-full px-6 flex flex-col gap-5 mb-10"
    >
      <div className=" flex flex-col gap-y-2  items-center justify-center mb-4 uppercase">
        <h1 className="text-gray-700  font-extrabold text-3xl">
          Dashboard 
        </h1>
        <p className=" text-xs  text-gray-500">
          A dashboard page for you to manage yourself in the role of a salesperson, giving you easy access to managing your product sales.
        </p>
      </div>
      <div
        id="head-state"
        className=" flex flex-col-reverse md:flex-col lg:flex-row itemcenter md:justify-between gap-4 "
      >
        <StatDashboardSeller dataSheets={results} />
        <div className="flex-1 flex justify-center lg:justify-end">
          <StateBalance />
        </div>
      </div>
      <SellerDashboard dataSheets={results} />
    </div>
  );
}
