"use client";

import * as z from "zod";

import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "react-query";
import { useFieldArray, useForm } from "react-hook-form";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { createPollService } from "@/services/poll-service";

const formSchema = z.object({
  question: z
    .string({
      required_error: "Enter a valid question",
    })
    .min(2),
  options: z
    .array(
      z.object({
        value: z.string(),
      })
    )
    .min(2),
});

type FormCreatePollProps = {
  onClose: () => void;
};

export function FormCreatePoll(props: FormCreatePollProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      question: "",
      options: [{ value: "" }, { value: "" }],
    },
  });

  const { fields, append } = useFieldArray({
    name: "options",
    control: form.control,
  });

  const mutation = useMutation(createPollService);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const pollOptions = values.options.map(({ value }) => {
      return value;
    });
    try {
      mutation.mutate(
        {
          options: pollOptions,
          title: form.getValues().question,
        },
        {
          onSuccess: (data) => {
            props.onClose();
            toast("Poll has been created");
          },
        }
      );
    } catch (E) {
      console.log(E);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="question"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Question</FormLabel>
              <FormControl>
                <Input placeholder="Enter your question" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div>
          {fields.map((field, index) => (
            <FormField
              control={form.control}
              key={field.id}
              name={`options.${index}.value`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={cn(index !== 0 && "sr-only")}>
                    options
                  </FormLabel>
                  <FormControl>
                    <Input placeholder={`Options ${index + 1}`} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="mt-2"
            onClick={() => append({ value: "" })}
          >
            Add Options
          </Button>
        </div>

        <Button disabled={mutation.isLoading} className="w-full" type="submit">
          Submit
        </Button>
      </form>
    </Form>
  );
}
