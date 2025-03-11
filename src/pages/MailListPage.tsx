import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import MailTable from "@/components/mail/MailTable";
import { Mail } from "@/types/mail";
import { useToast } from "@/components/ui/use-toast";

const MailListPage = () => {
  const [mails, setMails] = useState<Mail[]>([]);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Charger les données depuis le localStorage
    const storedMails = localStorage.getItem("mails");
    if (storedMails) {
      setMails(JSON.parse(storedMails));
    }
  }, []);

  const handleDelete = (id: string) => {
    const updatedMails = mails.filter((mail) => mail.id !== id);
    setMails(updatedMails);
    localStorage.setItem("mails", JSON.stringify(updatedMails));

    toast({
      title: "Courrier supprimé",
      description: "Le courrier a été supprimé avec succès.",
    });
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Gestion de Courrier</h1>
        <Button
          onClick={() => navigate("/mail/new")}
          className="flex items-center gap-2"
        >
          <Plus className="h-4 w-4" /> Nouveau courrier
        </Button>
      </div>

      <MailTable mails={mails} onDelete={handleDelete} />
    </div>
  );
};

export default MailListPage;
