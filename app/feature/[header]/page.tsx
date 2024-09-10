"use client";

import React,{useState,useEffect} from "react";
import Image from "next/image";
import client from "@/lib/contentfulClient";
import { useRouter } from "next/navigation";

import { convertToHtml } from "@/app/page";
import { head, header } from "framer-motion/client";


// const getFeature = async (id:any) => {
//   const entry = await client.getEntry(id);
//   return entry;
// }


export const getFeature = async (name :string) => {
  const response = await client.getEntries({ content_type: "featureContent" , 'fields.header': name});
  return response.items;
};

// const getFeature = async (id: string) => {
//   try {
//     const entry = await client.getEntry(
//       { content_type: contentType },
      
//     );
//     return entry;
//   } catch (error) {
//     throw new Error("Failed to fetch feature");
//   }
// };

function FeatureComponent({ params }: { params: { header: string } }) {
  const [feature, setFeature] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  useEffect(() => {
    const fetchFeature = async () => {
      try {
        // const query = ;
        // console.log("Query: ", query);

        const feature = await getFeature(params.header);
        
        setFeature(feature[0].fields);
      } catch (error: any) {
        console.error("Error: ", error.message);
        setError("Failed to load feature");
      } finally {
        setLoading(false);
      }
    };

    fetchFeature();
  }, []);

 

  return (
    <div>
          <div className="w-full h-screen px-8">
     <div>
         <div className="bg-gray-50 w-full rounded-lg p-6 shadow-md flex flex-col">
          <div className="flex justify-start mb-4">
            {/* Icon */}
             {feature?.icon &&  <div className="bg-gray-300 h-12 w-12 rounded-lg flex items-center justify-center">
               <Image src={`https:${feature?.icon?.fields?.file?.url}`} alt="Logo" width={20} height={20} />
             </div>}
           </div>
           <h3 className="text-lg font-semibold text-gray-800">{feature?.header}</h3>
     {feature?.description && <p className="text-sm text-gray-600 mt-2">{convertToHtml(feature?.description)}</p>}
      {feature?.image && (
        <div className="mt-4">
          <Image src={ `https:${feature?.image?.fields?.file?.url}`} alt="" layout="intrinsic" width={100} height={100} />
          </div>
          )}
       </div>
     </div>
    </div>
    </div>
  );
}


// function feature() {

//   const [feature, setFeature] = useState<any>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     getFeature("2IuyKHnJanlQ7lXW9DevdU").then((feature) => {
//       console.log("Feature: ", feature);
//       setFeature(feature);
//       setLoading(false);
//     }).catch((error) => {
//       console.log("Error: ", error);
//       setLoading(false);
//     }
//     );
//   }, []);

//   return (
//     <div className="w-full h-screen px-8">
//       <div>
//         <div className="bg-gray-50 w-full rounded-lg p-6 shadow-md flex flex-col">
//           <div className="flex justify-start mb-4">
//             {/* Icon */}
//             <div className="bg-gray-300 h-12 w-12 rounded-lg flex items-center justify-center">
//               {/* <Image src={icon} alt="Logo" width={20} height={20} /> */}
//             </div>
//           </div>
//           {/* <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
//       <p className="text-sm text-gray-600 mt-2">{description}</p>
//       {img && (
//         <div className="mt-4">
//           <Image src={img} alt="" layout="intrinsic" width={100} height={100} /> */}
//           {/* </div> */}
//           {/* )} */}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default feature;

export default FeatureComponent;
