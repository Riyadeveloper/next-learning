"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { columns } from "./columns";
import { DataTable } from "./data-table";

// Types
type Country = { iso2: string; name: string };
type State = { iso2: string; name: string };
type City = { id: number; name: string };
type CountryCode = keyof typeof dummyStates;
type StateCode = keyof typeof dummyCities;

type FormData = {
  name: string;
  email: string;
  phoneNumber: string;
  address: string;
  country: string;
  state: string;
  city: string;
  zipcode: string;
};

// Dummy data arrays
const dummyCountries: Country[] = [
  { iso2: "US", name: "United States" },
  { iso2: "CA", name: "Canada" },
  { iso2: "IN", name: "India" },
];

const dummyStates: Record<string, State[]> = {
  US: [
    { iso2: "NY", name: "New York" },
    { iso2: "CA", name: "California" },
  ],
  CA: [
    { iso2: "ON", name: "Ontario" },
    { iso2: "BC", name: "British Columbia" },
  ],
  IN: [
    { iso2: "MH", name: "Maharashtra" },
    { iso2: "DL", name: "Delhi" },
  ],
};

const dummyCities: Record<string, City[]> = {
  NY: [
    { id: 1, name: "New York City" },
    { id: 2, name: "Buffalo" },
  ],
  CA: [
    { id: 3, name: "Los Angeles" },
    { id: 4, name: "San Francisco" },
  ],
  ON: [
    { id: 5, name: "Toronto" },
    { id: 6, name: "Ottawa" },
  ],
  BC: [
    { id: 7, name: "Vancouver" },
    { id: 8, name: "Victoria" },
  ],
  MH: [
    { id: 9, name: "Mumbai" },
    { id: 10, name: "Pune" },
  ],
  DL: [{ id: 11, name: "New Delhi" }],
};

const Contact = () => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  const [data, setData] = useState<FormData[]>([]);
  const [countries] = useState<Country[]>(dummyCountries);
  const [states, setStates] = useState<State[]>([]);
  const [cities, setCities] = useState<City[]>([]);

  const selectedCountry = watch("country") as CountryCode | undefined;
  const selectedState = watch("state") as StateCode | undefined;

  useEffect(() => {
    if (selectedCountry && dummyStates[selectedCountry]) {
      setStates(dummyStates[selectedCountry]);
    } else {
      setStates([]);
    }
    setCities([]);
  }, [selectedCountry]);

  useEffect(() => {
    if (selectedState && dummyCities[selectedState]) {
      setCities(dummyCities[selectedState]);
    } else {
      setCities([]);
    }
  }, [selectedState]);

  const onSubmit = (formData: FormData) => {
    setData((prev) => [...prev, formData]);
    reset();
  };

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
              />
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
              />
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
              />
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
                {...register("country", { required: true })}
                className={`border ${
                  errors.country ? "border-red-500" : "border-[#454545]"
                } w-full rounded-[10px] p-3 sm:text-sm text-xs font-normal`}
              >
                <option value="">Country</option>
                {countries.map((country) => (
                  <option key={country.iso2} value={country.iso2}>
                    {country.name}
                  </option>
                ))}
              </select>
              {errors.country && (
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
                } w-full rounded-[10px] p-3 sm:text-sm text-xs font-normal`}
              >
                <option value="">State</option>
                {states.map((state) => (
                  <option key={state.iso2} value={state.iso2}>
                    {state.name}
                  </option>
                ))}
              </select>
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
                } w-full rounded-[10px] p-3 sm:text-sm text-xs font-normal`}
              >
                <option value="">City</option>
                {cities.map((city) => (
                  <option key={city.id} value={city.name}>
                    {city.name}
                  </option>
                ))}
              </select>
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

      <div className="max-w-[1200px] mx-auto">
        {data.length > 0 && <DataTable columns={columns} data={data} />}
      </div>
    </div>
  );
};

export default Contact;
