import SidebarLink from "@/components/Docs/SidebarLink";
import FAQ from "@/components/FAQ";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ page ",
  description: "FAQ",
  // other metadata
};

export default function faq() {
  return (
    <>
     <FAQ/>
    </>
  );
}
