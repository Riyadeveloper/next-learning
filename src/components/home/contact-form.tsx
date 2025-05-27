"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { columns } from "./columns";
import { DataTable } from "./data-table";
const Contact = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const [data, setData] = useState<any[]>([]);

  const onSubmit = (formData: any) => {
    setData((prev) => [...prev, formData]);
  };
  console.log(data);
  return (
    <div>
      <div className="max-w-[700px] mx-auto pb-16">
        <h2 className="text-3xl uppercase text-center py-7">Contact Form</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-2 gap-5">
            <div>
              <input
                className={`border ${
                  errors.name ? "border-red-500" : "border-[#454545]"
                } w-full rounded-[10px] p-3 sm:text-sm text-xs font-normal`}
                {...register("name", { required: true })}
                placeholder="Name"
              />{" "}
              {errors.name && (
                <span className="pt-1 text-red-500">
                  This field is required
                </span>
              )}
            </div>
            <div>
              <input
                className={`border ${
                  errors.email ? "border-red-500" : "border-[#454545]"
                } w-full rounded-[10px] p-3 sm:text-sm text-xs font-normal`}
                {...register("email", { required: true })}
                placeholder="Email"
              />{" "}
              {errors.email && (
                <span className="pt-1 text-red-500">
                  This field is required
                </span>
              )}
            </div>
            <div>
              <input
                className={`border ${
                  errors.phoneNumber ? "border-red-500" : "border-[#454545]"
                } w-full rounded-[10px] p-3 sm:text-sm text-xs font-normal`}
                {...register("phoneNumber", { required: true })}
                placeholder="Phone Number"
              />{" "}
              {errors.phoneNumber && (
                <span className="pt-1 text-red-500">
                  This field is required
                </span>
              )}
            </div>
            <div>
              <input
                className={`border ${
                  errors.address ? "border-red-500" : "border-[#454545]"
                } w-full rounded-[10px] p-3 sm:text-sm text-xs font-normal`}
                {...register("address", { required: true })}
                placeholder="Address"
              />
              {errors.address && (
                <span className="pt-1 text-red-500">
                  This field is required
                </span>
              )}
            </div>
            <div>
              <select
                {...register("region", { required: true })}
                className={`border ${
                  errors.region ? "border-red-500" : "border-[#454545]"
                } w-full rounded-[10px] p-3 sm:text-sm text-xs font-normal `}
              >
                <option value="">Rigion</option>
                <option value="A">Option A</option>
                <option value="B">Option B</option>
              </select>{" "}
              {errors.region && (
                <span className="pt-1 text-red-500">
                  This field is required
                </span>
              )}
            </div>
            <div>
              <select
                {...register("state", { required: true })}
                className={`border ${
                  errors.state ? "border-red-500" : "border-[#454545]"
                } w-full rounded-[10px] p-3 sm:text-sm text-xs font-normal `}
              >
                <option value="">State</option>
                <option value="A">Option A</option>
                <option value="B">Option B</option>
              </select>{" "}
              {errors.state && (
                <span className="pt-1 text-red-500">
                  This field is required
                </span>
              )}
            </div>
            <div>
              <select
                {...register("city", { required: true })}
                className={`border ${
                  errors.city ? "border-red-500" : "border-[#454545]"
                } w-full rounded-[10px] p-3 sm:text-sm text-xs font-normal `}
              >
                <option value="">City</option>
                <option value="A">Option A</option>
                <option value="B">Option B</option>
              </select>{" "}
              {errors.city && (
                <span className="pt-1 text-red-500">
                  This field is required
                </span>
              )}
            </div>
            <div>
              <input
                className={`border ${
                  errors.zipcode ? "border-red-500" : "border-[#454545]"
                } w-full rounded-[10px] p-3 sm:text-sm text-xs font-normal`}
                {...register("zipcode", { required: true })}
                placeholder="Zipcode"
              />
              {errors.zipcode && (
                <span className="pt-1 text-red-500">
                  This field is required
                </span>
              )}
            </div>
          </div>

          <div className="text-center pt-5">
            <Button size="lg" type="submit">
              Submit
            </Button>
          </div>
        </form>
      </div>
      {data.length > 0 && <DataTable columns={columns} data={data} />}
    </div>
  );
};

export default Contact;
