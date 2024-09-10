import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"



export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

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
