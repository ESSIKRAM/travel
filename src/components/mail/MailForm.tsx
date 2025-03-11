import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
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
import { Textarea } from "@/components/ui/textarea";
import { Mail } from "@/types/mail";

interface MailFormProps {
  initialData?: Mail;
  onSubmit: (data: MailFormData) => void;
  onCancel: () => void;
}

export type MailFormData = Omit<Mail, "id">;

const formSchema = z.object({
  reference: z.string().min(1, "La référence est requise"),
  sender: z.string().min(1, "L'expéditeur est requis"),
  recipient: z.string().min(1, "Le destinataire est requis"),
  date: z.string().min(1, "La date est requise"),
  subject: z.string().min(1, "L'objet est requis"),
  content: z.string().min(1, "Le contenu est requis"),
});

const MailForm = ({ initialData, onSubmit, onCancel }: MailFormProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData
      ? {
          ...initialData,
          date: new Date(initialData.date).toISOString().split("T")[0],
        }
      : {
          reference: "",
          sender: "",
          recipient: "",
          date: new Date().toISOString().split("T")[0],
          subject: "",
          content: "",
        },
  });

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    onSubmit({
      ...values,
      date: new Date(values.date).toISOString(),
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="reference"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Référence</FormLabel>
                <FormControl>
                  <Input placeholder="REF-2023-001" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Date</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="sender"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Expéditeur</FormLabel>
                <FormControl>
                  <Input placeholder="Nom de l'expéditeur" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="recipient"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Destinataire</FormLabel>
                <FormControl>
                  <Input placeholder="Nom du destinataire" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="subject"
            render={({ field }) => (
              <FormItem className="md:col-span-2">
                <FormLabel>Objet</FormLabel>
                <FormControl>
                  <Input placeholder="Objet du courrier" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem className="md:col-span-2">
                <FormLabel>Contenu</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Contenu du courrier"
                    className="min-h-[150px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline" onClick={onCancel}>
            Annuler
          </Button>
          <Button type="submit">
            {initialData ? "Mettre à jour" : "Enregistrer"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default MailForm;
