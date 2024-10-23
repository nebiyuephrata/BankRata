"use client"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"

import CustomInput from "./CustomInput"
import { authFormSchema } from "@/lib/utils"
import { Loader2 } from "lucide-react"

const AuthForm = ({ type }: { type: string }) => {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const formSchema = authFormSchema(type);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  // 2. Define a submit handler.
  const  onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true)
   
    try {
      //signup with appwrite & create plaid token
      
      console.log(values)
    } catch (error) {
      console.log(error);
    }finally{
      setIsLoading(false)
    }

  
  }

  return (
    <section className="auth-form">
      <header className="flex flex-col gap-5 md:gap-8">
        <Link href="/" className=" flex cursor-pointer items-center gap-1 px-4">
          <Image alt="logo" src="/icons/logo.svg" width={35} height={34} />
          <h1 className="text-26 font-ibm-plex-serif font-bold text-black-1">
            BankRata
          </h1>
        </Link>
        <div className="flex flex-col gap-1 md:gap-3">
          <h1 className="text-24 font-semibold text-gray-900 lg:text-36"></h1>
          {user ? "Link Account" : type === "sign-in" ? "Sign In" : "Sign Up"}
          <p className="text-16 font-normal text-gray-600">
            {user
              ? "Link your account to get started"
              : "Please enter your details"}
          </p>
        </div>
      </header>
      {user ? (
        <div className="flex flex-col gap-4">{/* plaid link component */}</div>
      ) : (
        <>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {type === "sign-up" && (
                <>
                  <div className="flex gap-4">
                    <CustomInput
                      name="firstName"
                      control={form.control}
                      placeholder="ex: Jhon"
                      label="First Name"
                    />
                    <CustomInput
                      name="lastName"
                      control={form.control}
                      placeholder="ex: Doe"
                      label="Last Name"
                    />
                  </div>
                  <CustomInput
                    name="address1"
                    control={form.control}
                    placeholder="Enter your specific address"
                    label="Address"
                  />

                  <div className="flex gap-4">
                    <CustomInput
                      name="state"
                      control={form.control}
                      placeholder="ex: NY"
                      label="State"
                    />
                    <CustomInput
                      name="postalCode"
                      control={form.control}
                      placeholder="ex: 1000"
                      label="Postal Code"
                    />
                  </div>
                  <div className="flex gap-4">
                    <CustomInput
                      name="dob"
                      control={form.control}
                      placeholder="yyyy-mm-dd"
                      label="Date of Birth"
                    />
                    <CustomInput
                      name="ssn"
                      control={form.control}
                      placeholder="ex: 1234"
                      label="SSN"
                    />
                  </div>
                </>
              )}
              <CustomInput
                name="email"
                control={form.control}
                placeholder="Enter your email"
                label="Email"
              />
              <CustomInput
                name="password"
                control={form.control}
                type="password"
                placeholder="Enter your password"
                label="Password"
              />
              <div className="flex flex-col gap-4">
                <Button className="form-btn" type="submit" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="animate-spin" size={20} />
                      &nbsp; Loading ...
                    </>
                  ) : type === "sign-in" ? (
                    "Sign In"
                  ) : (
                    "Sign Up"
                  )}
                </Button>
              </div>
            </form>
          </Form>
          <footer className="flex justify-center gap-1">
            <p className="text-14 font-normal">
              {type === "sign-in"
                ? "Don't have an account?"
                : "Already have an account?"}
            </p>
            <Link
              className="form-link"
              href={type === "sign-in" ? "/sign-up" : "/sign-in"}
            >
              {type === "sign-in" ? "Sign up" : "Sign in"}
            </Link>
          </footer>
        </>
      )}
    </section>
  )
}

export default AuthForm
