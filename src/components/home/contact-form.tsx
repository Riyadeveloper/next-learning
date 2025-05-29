"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Button } from "../ui/button";
import { columns } from "./columns";
import { DataTable } from "./data-table";

type Country = { iso2: string; name: string };
type State = { iso2: string; name: string };
type City = { name: string };

// Zod Schema
const contactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  phoneNumber: z.string().min(10, "Phone number is too short"),
  address: z.string().min(1, "Address is required"),
  country: z.string().min(1, "Country is required"),
  state: z.string().min(1, "State is required"),
  city: z.string().min(1, "City is required"),
  zipcode: z.string().min(5, "Zipcode is too short"),
});

type ContactFormData = z.infer<typeof contactSchema>;

const API_KEY = "dGR4Q3h3ZzVDZlpBSUdWajFEeTlNNWQ1d3dwbGVQUVV0b0k0ZWpBUA==";
const BASE_URL = "https://api.countrystatecity.in/v1";

const Contact = () => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const [data, setData] = useState<ContactFormData[]>([]);
  const [countries, setCountries] = useState<Country[]>([]);
  const [states, setStates] = useState<State[]>([]);
  const [cities, setCities] = useState<City[]>([]);

  const selectedCountry = watch("country");
  const selectedState = watch("state");

  const headers = { "X-CSCAPI-KEY": API_KEY };

  useEffect(() => {
    fetch(`${BASE_URL}/countries`, { headers })
      .then((res) => res.json())
      .then(setCountries)
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (!selectedCountry) {
      setStates([]);
      return;
    }

    fetch(`${BASE_URL}/countries/${selectedCountry}/states`, { headers })
      .then((res) => res.json())
      .then(setStates)
      .catch(console.error);

    setCities([]);
  }, [selectedCountry]);

  useEffect(() => {
    if (!selectedCountry || !selectedState) {
      setCities([]);
      return;
    }

    fetch(
      `${BASE_URL}/countries/${selectedCountry}/states/${selectedState}/cities`,
      { headers }
    )
      .then((res) => res.json())
      .then(setCities)
      .catch(console.error);
  }, [selectedState, selectedCountry]);

  const onSubmit = (formData: ContactFormData) => {
    setData((prev) => [...prev, formData]);
    reset();
  };

  return (
    <div>
      <div className="max-w-[700px] mx-auto pb-16">
        <h2 className="text-3xl uppercase text-center py-7">Contact Form</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-2 gap-5">
            <input
              {...register("name")}
              placeholder="Name"
              className={`border ${
                errors.name ? "border-red-500" : "border-[#454545]"
              } w-full rounded-[10px] p-3 text-xs`}
            />
            <input
              {...register("email")}
              placeholder="Email"
              className={`border ${
                errors.email ? "border-red-500" : "border-[#454545]"
              } w-full rounded-[10px] p-3 text-xs`}
            />
            <input
              {...register("phoneNumber")}
              placeholder="Phone Number"
              className={`border ${
                errors.phoneNumber ? "border-red-500" : "border-[#454545]"
              } w-full rounded-[10px] p-3 text-xs`}
            />
            <input
              {...register("address")}
              placeholder="Address"
              className={`border ${
                errors.address ? "border-red-500" : "border-[#454545]"
              } w-full rounded-[10px] p-3 text-xs`}
            />

            <select
              {...register("country")}
              className={`border ${
                errors.country ? "border-red-500" : "border-[#454545]"
              } w-full rounded-[10px] p-3 text-xs`}
            >
              <option value="">Country</option>
              {countries.map((c) => (
                <option key={c.iso2} value={c.iso2}>
                  {c.name}
                </option>
              ))}
            </select>

            <select
              {...register("state")}
              className={`border ${
                errors.state ? "border-red-500" : "border-[#454545]"
              } w-full rounded-[10px] p-3 text-xs`}
            >
              <option value="">State</option>
              {states.map((s) => (
                <option key={s.iso2} value={s.iso2}>
                  {s.name}
                </option>
              ))}
            </select>

            <select
              {...register("city")}
              className={`border ${
                errors.city ? "border-red-500" : "border-[#454545]"
              } w-full rounded-[10px] p-3 text-xs`}
            >
              <option value="">City</option>
              {cities.map((city, idx) => (
                <option key={idx} value={city.name}>
                  {city.name}
                </option>
              ))}
            </select>

            <input
              {...register("zipcode")}
              placeholder="Zipcode"
              className={`border ${
                errors.zipcode ? "border-red-500" : "border-[#454545]"
              } w-full rounded-[10px] p-3 text-xs`}
            />
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
