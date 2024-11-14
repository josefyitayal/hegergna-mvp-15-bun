"use client"

import StepFour from "@/components/auth/StepFour"
import StepOne from "@/components/auth/StepOne"
import StepThree from "@/components/auth/StepThree"
import StepTwo from "@/components/auth/StepTwo"
import { createUser, hasAccessToOnboarding } from "@/lib/actions/user.action"
import { handleStatus } from "@/lib/utils"
import { useUser } from "@clerk/nextjs"
import { useMutation, useQuery } from "@tanstack/react-query"
import { Loader2 } from "lucide-react"
import { redirect, useRouter } from "next/navigation"
import { useEffect, useState } from "react"

const hasAccess = () => {
  const { data, isLoading, error } = useMutation({
    mutationKey: ["userHaveAccessToOnboarding"],
    mutationFn: async () => {
      const { status, data } = await hasAccessToOnboarding()
      handleStatus(status)
      if (data) {
        return data
      }
    }
  })

  return { data, isLoading, error }
}

function page() {
  const { data, isLoading, error } = hasAccess()
  const [userHasAccess, setUserHasAccess] = useState(false)

  useEffect(() => {
    if (!isLoading && !error) {
      setUserHasAccess(!!data)
    }
  }, [isLoading, data, error])

  if (isLoading) {
    return <Loading />
  }

  if (error) {
    return <div>{error.message}</div>
  }

  if (userHasAccess) return redirect("/")

  // if user have access this code is the l.lsadmflasmdf

  const [step, setStep] = useState(1)
  const [submitLoading, setSubmitLoading] = useState(false)
  const [form, setForm] = useState([])
  const router = useRouter()

  const { data: createUserData, isLoading: creatingUserLoading, error: createUserError, mutate } = useMutation({
    mutationKey: ["createUser"],
    mutationFn: async () => {
      const { status, data } = await createUser(form)
      handleStatus(status)
      return data
    },
    onSuccess: (data) => {
      setSubmitLoading(false)
      console.log(data)
      router.push(`/dashboard/${data.id}/${data.stores[0].id}`)
    },
    onError: (error) => {
      setSubmitLoading(false)
      console.log(error)
    }
  })

  useEffect(() => {
    console.log(form)
  }, [form])

  function handleSubmit() {
    setSubmitLoading(true)
    mutate()
  }

  function nextStep(value) {
    setForm((prev) => [...prev, value])
    if (step === 3 && form[1] === "later") {
      handleSubmit()
    }
    if (step === 4) {
      handleSubmit()
    }
    setStep((prev) => prev + 1)
  }

  function prevStep() {
    setStep((prev) => prev - 1)
  }

  return (
    <div className="relative min-h-screen w-full flex justify-center pt-20">
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"><div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-fuchsia-400 opacity-20 blur-[100px]"></div></div>
      {submitLoading && (
        <div className="p-5 flex flex-col items-center justify-center rounded-md shadow-md bg-white lg:w-2/4 sm:w-full md:w-3/4 h-fit border border-gray-300 w-fit gap-5">
          <Loader2 className="animate-spin" />
        </div>
      )}
      {step === 1 && (
        <StepOne onNext={nextStep} />
      )}
      {step === 2 && (
        <StepTwo onNext={nextStep} onPrev={prevStep} />
      )}
      {step === 3 && (
        <StepThree onNext={nextStep} onPrev={prevStep} />
      )}
      {step === 4 && form[1] !== "later" && (
        <StepFour onNext={nextStep} onPrev={prevStep} storeName={form[2].storeName} splitValue={form[1].splitValue} />
      )}
    </div>
  )
}

export default page