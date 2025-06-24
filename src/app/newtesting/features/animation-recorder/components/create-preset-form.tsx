"use client";
import { availableDifficulties } from "@/app/newtesting/types2";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";

import { useForm } from "react-hook-form";

import { TagSelector } from "@/components/ui/tag-selector";
import { z } from "zod";

const formSchema = z.object({
  name: z.string().min(2).max(50),
  desc: z.string().max(100).optional(),
  difficulty: z.enum(availableDifficulties as [string, ...string[]]),
  tags: z
    .array(z.string())
    .max(10)
    .transform((tags) =>
      Array.from(
        new Set(
          tags
            .map((tag) => tag.toLowerCase().trim())
            .filter((tag) => tag !== "")
        )
      )
    )
    .refine((tags) => tags.length <= 10, {
      message: "You can select up to 10 unique tags.",
    }),
  recommendedSteps: z.number().min(1).max(30),
});

type FormValues = z.infer<typeof formSchema>;

// TODO : unsaved changes indicator
interface SomethingFormProps {
  defaultValues?: Partial<FormValues>;
  onSubmit?: (data: FormValues) => void;
  mode?: "create" | "edit";
}

export const CreatePresetForm = ({
  defaultValues,
  onSubmit = (data: FormValues) => console.log(data),
  mode = "create",
}: SomethingFormProps) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      desc: "",
      difficulty: "medium",
      tags: [],
      recommendedSteps: 6,
      ...defaultValues, // Merge default values if provided
    },
  });

  function onSubmitForm(values: FormValues) {
    console.log(values);
    onSubmit(values);
  }

  const availableTags = ["camera moves", "object moves", "object rotates"];

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmitForm)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>This is name.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="desc"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Desc</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormDescription>This is desc.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="recommendedSteps"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Recommended steps</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  {...field}
                  onChange={(e) => {
                    const value = parseInt(e.target.value, 10);
                    if (!isNaN(value)) {
                      field.onChange(value);
                    }
                  }}
                />
              </FormControl>
              <FormDescription>This is rec steps.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tags</FormLabel>
              <FormControl>
                <TagSelector
                  className="max-w-[400px]"
                  availableTags={availableTags}
                  selectedTags={field.value}
                  onChange={field.onChange}
                  getValue={(tag) => tag}
                  getLabel={(tag) => tag}
                  createTag={(label) => label.toLocaleLowerCase()}
                />
              </FormControl>
              <FormDescription>This is tags.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="difficulty"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Difficulty</FormLabel>
              <FormControl>
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger
                    className="w-[180px]"
                    onBlur={() => field.onBlur()}
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {availableDifficulties.map((difficulty) => (
                      <SelectItem key={difficulty} value={difficulty}>
                        {difficulty.charAt(0).toUpperCase() +
                          difficulty.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormDescription>This is difficulty.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">{mode === "edit" ? "Update" : "Save"}</Button>
      </form>
    </Form>
  );
};
