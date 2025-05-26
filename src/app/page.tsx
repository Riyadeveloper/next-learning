import { columns, Payment } from "@/components/home/columns";
import Contact from "@/components/home/contact-form";
import { DataTable } from "@/components/home/data-table";

export default async function DemoPage() {
  return (
    <div className="container mx-auto py-10">
      <Contact />
    </div>
  );
}
