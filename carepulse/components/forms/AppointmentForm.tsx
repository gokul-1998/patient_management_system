"use client"
 
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
 
import { Button } from "@/components/ui/button"
import {
  Form} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import CustomFormField from "../CustomFormField"
import SubmitButton from "../SubmitButton"
import { useState } from "react"
import { UserFormValidation } from "@/lib/validation"
import { useRouter } from "next/navigation"
import { createUser } from "@/lib/actions/patient.actions"
import { FormFieldType } from "./PatientForm"
import { Doctors } from "@/constants"
import { SelectItem } from "../ui/select"
import Image from "next/image"




 
const   AppointmentForm = ({
  userId,patientId,type
}:{
  userId:string,
  patientId:string,
  type:"create"|"cancel"|
  "schedule"
}) => {

    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)

  // 1. Define your form.
  const form = useForm<z.infer<typeof UserFormValidation>>({
    resolver: zodResolver(UserFormValidation),
    defaultValues: {
      name: "",
      email:"",
      phone:""
    },
  })
 
  // 2. Define a submit handler.
  async function onSubmit({name,email,phone}: z.infer<typeof UserFormValidation>) {
    setIsLoading(true)
    try{
        const userData={name,email,phone}

        const user= await createUser(userData)

        if(user) router.push(`/patients/${user.$id}/register`)

    }catch(error){
        console.log(error)
    }
    setIsLoading(false);

  }

  let buttonLabel;
  switch(type){
    case 'cancel':
      buttonLabel="Cancel Appointment"
      break;
    case 'create':
      buttonLabel="Create Appointment"
      break;
    case 'schedule':
      buttonLabel="Schedule Appointment"
      break;
    default:
      break;

  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
        <section className="mb-12 space-y-4">
    <h1 className="header">New Appointment</h1>
        <p className="text-dark-700">Request a new appointment in 10 secs</p>
        </section>
        {
          type!=="cancel"&&(
            <>
            <CustomFormField
            fieldType={FormFieldType.SELECT}
            control={form.control}
            name="primaryPhysician"
            label="Doctor"
            placeholder="Select a Doctor"
          >
            {Doctors.map((doctor, i) => (
              <SelectItem key={doctor.name + i} value={doctor.name}>
                <div className="flex cursor-pointer items-center gap-2">
                  <Image
                    src={doctor.image}
                    width={32}
                    height={32}
                    alt="doctor"
                    className="rounded-full border border-dark-500"
                  />
                  <p>{doctor.name}</p>
                </div>
              </SelectItem>
            ))}
          </CustomFormField>

          <CustomFormField
            fieldType={FormFieldType.DATE_PICKER}
            control={form.control}
            name="schedule"
            label="Expected appointment date"
            showTimeSelect
            dateFormat="MM/dd/yyyy - h:mm aa"
            />
            <div className="flex flex-col gap-6 xl:flex-row ">
              <CustomFormField
                fieldType={FormFieldType.TEXTAREA}
                control={form.control}
                name="reason"
                label="Reason for appointment"
                placeholder="enter reason for appointment"
              />
              <CustomFormField
                fieldType={FormFieldType.TEXTAREA}
                control={form.control}
                name="notes"
                label="Additional Notrs"
                placeholder="E.g. Bring your medical history"
              />
            </div>
            </>
          )
        }

        {
          type==="cancel"&&(
            <CustomFormField
            fieldType={FormFieldType.TEXTAREA}
            control={form.control}
            name="cancellationReason"
            label="Reason for cancellation"
            placeholder="enter reason for cancellation"
          />
          )
        }
        <SubmitButton isLoading={isLoading} className={`${type==='cancel'?'shad-danger-btn':'shad-primary-btn'} w-full`}>`
        {buttonLabel}
            

        </SubmitButton>
      </form>
    </Form>
  )
}


export default AppointmentForm
 