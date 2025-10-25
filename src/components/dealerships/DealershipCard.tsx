type Props = {
  name: string;
  company: string;
  mobile_phone: string;
  email_address: string;
  postcode: string;
};

import { formatPhoneUK, toTitleCase } from "@/lib/formatters";

export default function DealershipCard({
  name,
  company,
  mobile_phone,
  email_address,
  postcode,
}: Props) {
  return (
    <div className="bg-white rounded-[20px] md:rounded-[30px] p-4 md:p-8">
      <div
        className="font-inter text-[18px] leading-[28px] md:text-[21px] md:leading-8 font-extrabold text-text pb-3 border-b"
        style={{ borderColor: "#CDD2DC" }}
      >
        {toTitleCase(name)}
      </div>
      <div className="mt-0">
        <div
          className="grid grid-cols-[140px_1fr] md:grid-cols-[200px_1fr] items-center py-3 border-b"
          style={{ borderColor: "#CDD2DC" }}
        >
          <div className="text-text text-[16px] leading-6 font-extrabold">
            Company
          </div>
          <div className="text-text text-[16px] leading-6 font-normal">
            {toTitleCase(company)}
          </div>
        </div>
        <div
          className="grid grid-cols-[140px_1fr] md:grid-cols-[200px_1fr] items-center py-3 border-b"
          style={{ borderColor: "#CDD2DC" }}
        >
          <div className="text-text text-[16px] leading-6 font-extrabold">
            Mobile phone number
          </div>
          <div className="text-text text-[16px] leading-6 font-normal">
            {formatPhoneUK(mobile_phone)}
          </div>
        </div>
        <div
          className="grid grid-cols-[140px_1fr] md:grid-cols-[200px_1fr] items-center py-3 border-b"
          style={{ borderColor: "#CDD2DC" }}
        >
          <div className="text-text text-[16px] leading-6 font-extrabold">
            Email address
          </div>
          <div className="text-text text-[16px] leading-6 font-normal">
            {email_address}
          </div>
        </div>
        <div
          className="grid grid-cols-[140px_1fr] md:grid-cols-[200px_1fr] items-center py-3 border-b"
          style={{ borderColor: "#CDD2DC" }}
        >
          <div className="text-text text-[16px] leading-6 font-extrabold">
            Postcode
          </div>
          <div className="text-text text-[16px] leading-6 font-normal">
            {postcode}
          </div>
        </div>
      </div>
    </div>
  );
}
