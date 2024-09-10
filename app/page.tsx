"use client";
import Image from "next/image";
import Marquee from "@/components/magicui/marquee";
import client from "@/lib/contentfulClient";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
  img: string;
}

const ThemeToggle = () => {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-2 bg-gray-200 dark:bg-gray-800 rounded-md"
    >
      {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
    </button>
  );
};

export const convertToHtml = (description: any) => {
  let str = "";

  description.content.forEach((content: any) => {
    content.content.forEach((content: any) => {
      if (content.nodeType === "text") {
        str += content.value;
      } else if (content.nodeType === "hyperlink") {
        str += `<a href="${content.data.uri}">${content.content[0].value}</a>`;
      }
    });
    // if (content.nodeType === "paragraph") {
    //   str += content.value;
    // } else if (content.nodeType === "hyperlink") {
    //   str += `<a href="${content.data.uri}">${content.content[0].value}</a>`;
    // }
  });
  return str;
};

export const getContentByType = async (contentType: string) => {
  const response = await client.getEntries({ content_type: contentType });
  return response.items;
};

const FeatureCard: React.FC<FeatureCardProps> = ({
  icon,
  title = "",
  description = "",
  img = "",
}) => {
  const router = useRouter();
  return (
    <div className="cursor-pointer" onClick={()=>{
      router.push(`/feature/${title}`)
    }} >
      <div className="bg-gray-50 shrink-1 rounded-lg p-6 shadow-md flex flex-col">
        <div className="flex justify-start mb-4">
          {/* Icon */}
          <div className="bg-gray-300 h-12 w-12 rounded-lg flex items-center justify-center">
            <Image src={icon} alt="Logo" width={20} height={20} />
          </div>
        </div>
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        <p className="text-sm text-gray-600 mt-2">{description}</p>
        {img && (
          <div className="mt-4">
            <Image
              src={img}
              alt=""
              layout="intrinsic"
              width={100}
              height={100}
            />
          </div>
        )}
        
      </div>
    </div>
  );
};

const VideoEmbed = () => {
  return (
    <div className="perspective-[1200px] aspect-[4/3] max-w-[600px] w-[60vw]">
      <article className="relative w-full h-full rounded-[19px] cursor-pointer overflow-hidden">
        <link rel="preconnect" href="https://www.youtube.com" />
        <link rel="preconnect" href="https://www.google.com" />
        <div className="absolute top-0 left-0 w-full h-full"></div>
        <iframe
          className="absolute top-0 left-0 w-full h-full"
          src="https://www.youtube.com/embed/-y_KrosGWaU?iv_load_policy=3&rel=0&modestbranding=1&playsinline=1"
          frameBorder="0"
          allow="presentation; fullscreen; accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        ></iframe>
      </article>
    </div>
  );
};

const Footer: React.FC = () => {
  return (
    <footer className="bg-backgroundCover py-4 flex mt-10 w-screen flex-col sm:flex-row items-center justify-between px-6 border-t border-gray-200">
      <p className="text-sm text-gray-500">
        © Singularity Corp Pvt. Ltd. 2024. All rights reserved.{" "}
        <a href="#" className="text-gray-600 underline">
          Privacy Policy
        </a>
        .
      </p>
      <a
        href="https://www.linkedin.com/company/pype-ai/"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center"
      >
        <div className="bg-gray-300 h-8 w-8 rounded-full flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 24 24"
            className="h-5 w-5 text-gray-600"
          >
            <path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-9h3v9zm-1.5-10.29c-.97 0-1.75-.79-1.75-1.75s.79-1.75 1.75-1.75c.97 0 1.75.79 1.75 1.75s-.79 1.75-1.75 1.75zm13.5 10.29h-3v-4.5c0-1.07-.86-1.93-1.93-1.93h-.14c-1.07 0-1.93.86-1.93 1.93v4.5h-3v-9h3v1.25c.63-.94 1.74-1.55 2.95-1.55h.14c2.07 0 3.75 1.68 3.75 3.75v5.55z" />
          </svg>
        </div>
      </a>
    </footer>
  );
};

export default function Home() {
  const [entries, setEntries] = useState<any>([]);
  const [features, setFeatures] = useState<any>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await getContentByType("patner");
        setEntries(response); // Store the retrieved entries
        setLoading(false);
      } catch (error) {
        console.error("Error fetching content:", error);

        setLoading(false);
      }
      try {
        const response = await getContentByType("featureContent");
        setFeatures(response); // Store the retrieved entries
        setLoading(false);
      } catch (error) {
        console.error("Error fetching content:", error);
        alert("Error fetching content");
        setLoading(false);
      }
    };

    fetchContent();
  }, []); // Empty array ensures this runs only once on mount

  return (
    <div className="flex flex-col w-[100vw] px-8 min-h-screen bg-backgroundCover items-center">
      {/* Navbar */}
      <div className=" h-20 w-full px-[12vw] flex justify-between items-center  ">
        <div className="flex justify-between sm:g-5 items-center  sm:w-auto font-semibold text-xl text-primary">
          <Image src="/logo.png" alt="Logo" width={100} height={40} /> <span className="hidden sm:block" >Pype AI</span>
        </div>
        <div className=" flex gap-12 items-center">
          <div className=" hidden sm:block text-[#111111]"> Faetures </div>
          <div className=" hidden sm:block px-4 text-white py-1.5 h-[40px] border border-solid border-gray-800 rounded-lg shadow-[0_2px_6px_1px_rgba(0,0,0,0.2),0_0_0_1px_rgb(28,28,28)] bg-gradient-to-b from-[rgba(28,28,28,0.9)] to-[rgb(28,28,28)] opacity-100">
            {" "}
            Launch App{" "}
          </div>
          <ThemeToggle />
        </div>
      </div>
      {/* 
      
      Headers
      
      */}
      <h1 className="text-center text-gray-900 mt-8 sm:mt-5 text-3xl md:text-5xl font-semibold">
        Build, Evaluate and <br />
        Improve Prompts
        <br />
        10x faster
      </h1>
      <div className="max-w-[600px] text-[#53535c] mt-6 sm:mt-4 mb-16 text-medium text-center ">
        Empower your team to build, evaluate, and deploy high-performing prompts
        for LLM-based applications. Pype streamlines collaboration, version
        control, and performance analysis, helping you deliver reliable AI
        solutions faster.
      </div>
      <VideoEmbed />
      <div className="flex mt-20 gap-12 flex-col sm:flex-row items-center">
        <div className="px-12 text-white py-1 h-[40px] border border-solid border-gray-800 rounded-lg shadow-[0_2px_6px_1px_rgba(0,0,0,0.2),0_0_0_1px_rgb(28,28,28)] bg-gradient-to-b from-[rgba(28,28,28,0.9)] to-[rgb(28,28,28)] opacity-100 flex justify-center items-center">
          Launch App
        </div>
        <div className="px-12 text-white py-1  h-[40px]  rounded-lg shadow-[0_2px_6px_1px_rgba(0,0,0,0.2),0_0_0_1px_rgb(28,28,28)] bg-[#0763eb] from-[rgba(28,28,28,0.9)] to-[rgb(28,28,28)] opacity-100 flex justify-center items-center">
          Book Demo
        </div>
      </div>
      <div className="mt-12 text-[#53535c] text-medium text-center">
        Helping individuals and teams at the world's best companies
      </div>

      <div className="relative flex w-[90%] mt-4 flex-col items-center justify-center overflow-hidden rounded-lg border-0 bg-background ">
        <Marquee pauseOnHover className="[--duration:10s]">
          {entries?.map((entry: any) => {
            return (
              <div className="h-[45px] relative w-[220px]">
                <Image
                  src={`https:${entry?.fields?.icon?.fields?.file?.url}`}
                  // width={100} height={100}
                  layout="fill"
                  alt={entry?.fields?.name}
                />
              </div>
            );
          })}
        </Marquee>

        <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-white dark:from-background"></div>
        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-white dark:from-background"></div>
      </div>
      <div className="container mx-auto px-4 mt-8 py-12">
        <div className="flex justify-center mb-8">
          <button className="px-2 py-1 flex text-xs gap-2 bg-gray-100 rounded-full shadow-md">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
              data-slot="icon"
              color="var(--token-1010e306-6ee2-47e5-bffe-788055bd3b08, rgb(83, 83, 92))"
              style={{ width: "1rem", height: "1rem" }}
            >
              <path
                fill-rule="evenodd"
                d="M9 4.5a.75.75 0 0 1 .721.544l.813 2.846a3.75 3.75 0 0 0 2.576 2.576l2.846.813a.75.75 0 0 1 0 1.442l-2.846.813a3.75 3.75 0 0 0-2.576 2.576l-.813 2.846a.75.75 0 0 1-1.442 0l-.813-2.846a3.75 3.75 0 0 0-2.576-2.576l-2.846-.813a.75.75 0 0 1 0-1.442l2.846-.813A3.75 3.75 0 0 0 7.466 7.89l.813-2.846A.75.75 0 0 1 9 4.5ZM18 1.5a.75.75 0 0 1 .728.568l.258 1.036c.236.94.97 1.674 1.91 1.91l1.036.258a.75.75 0 0 1 0 1.456l-1.036.258c-.94.236-1.674.97-1.91 1.91l-.258 1.036a.75.75 0 0 1-1.456 0l-.258-1.036a2.625 2.625 0 0 0-1.91-1.91l-1.036-.258a.75.75 0 0 1 0-1.456l1.036-.258a2.625 2.625 0 0 0 1.91-1.91l.258-1.036A.75.75 0 0 1 18 1.5ZM16.5 15a.75.75 0 0 1 .712.513l.394 1.183c.15.447.5.799.948.948l1.183.395a.75.75 0 0 1 0 1.422l-1.183.395c-.447.15-.799.5-.948.948l-.395 1.183a.75.75 0 0 1-1.422 0l-.395-1.183a1.5 1.5 0 0 0-.948-.948l-1.183-.395a.75.75 0 0 1 0-1.422l1.183-.395c.447-.15.799-.5.948-.948l.395-1.183A.75.75 0 0 1 16.5 15Z"
                clip-rule="evenodd"
              ></path>
            </svg>
            Features
          </button>
        </div>
        <h2 className="text-3xl font-normal text-center mb-8">
          Turbocharge your LLM apps development
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
          {features?.map((feature: any) => {
            // console.log(feature?.fields,convertToHtml(feature?.fields?.description?.content));
          
            return (
              <FeatureCard
                icon={`https:${feature?.fields?.icon?.fields?.file?.url}`}
                title={feature?.fields?.header}
                description={convertToHtml(feature?.fields?.description)}
                // description="description"
                // {feature?.fields?.description}
                img={
                  feature?.fields?.image?.fields?.file?.url
                    ? `https:${feature?.fields?.image?.fields?.file?.url}`
                    : ""
                }
              />
            );
          })}
          {features?.map((feature: any) => {
            // console.log(feature?.fields,convertToHtml(feature?.fields?.description?.content));
     
            return (
              <FeatureCard
                icon={`https:${feature?.fields?.icon?.fields?.file?.url}`}
                title={feature?.fields?.header}
                description={convertToHtml(feature?.fields?.description)}
                img={
                  feature?.fields?.image?.fields?.file?.url
                    ? `https:${feature?.fields?.image?.fields?.file?.url}`
                    : ""
                }
              />
            );
          })}
        </div>
      </div>
      <Footer />
      {/* <div className="bg-white py-16 px-4 sm:px-6 lg:px-8"></div> */}
    </div>
  );
}
