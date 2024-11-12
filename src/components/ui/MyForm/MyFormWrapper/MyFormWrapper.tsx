import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import { FieldValues, FormProvider, SubmitHandler, useForm, UseFormReset } from "react-hook-form";

// Define the type for the props
interface MyFormWrapperProps<T extends FieldValues> {
  children: ReactNode; // for the form fields passed as children
  onSubmit: (data: T, reset: UseFormReset<T>) => void; // Updated to handle reset function
  className?: string; // optional class name for styling
}

const MyFormWrapper = <T extends FieldValues>({
  children,
  onSubmit,
  className,

}: MyFormWrapperProps<T>) => {
  const methods = useForm<T>();

  const submit: SubmitHandler<T> = (data) => {
    onSubmit(data, methods.reset); // Pass data and reset function to onSubmit
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(submit)} className={cn("", className)}>
        {children}
      </form>
    </FormProvider>
  );
};

export default MyFormWrapper;
