import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import MailForm, { MailFormData } from "@/components/mail/MailForm";
import { Mail } from "@/types/mail";
import { useToast } from "@/components/ui/use-toast";

const MailFormPage = () => {
  const { id } = useParams<{ id: string }>();
  const [mail, setMail] = useState<Mail | null>(null);
  const [loading, setLoading] = useState(id ? true : false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const isEditMode = !!id;

  useEffect(() => {
    if (isEditMode) {
      // Charger les données depuis le localStorage pour l'édition
      const storedMails = localStorage.getItem("mails");
      if (storedMails) {
        const parsedMails: Mail[] = JSON.parse(storedMails);
        const foundMail = parsedMails.find((m) => m.id === id);
        if (foundMail) {
          setMail(foundMail);
        } else {
          navigate("/mail", { replace: true });
        }
      } else {
        navigate("/mail", { replace: true });
      }
      setLoading(false);
    }
  }, [id, isEditMode, navigate]);

  const handleSubmit = (data: MailFormData) => {
    // Récupérer les courriers existants
    const storedMails = localStorage.getItem("mails");
    let mails: Mail[] = storedMails ? JSON.parse(storedMails) : [];

    if (isEditMode && mail) {
      // Mode édition
      mails = mails.map((m) => (m.id === id ? { ...data, id: m.id } : m));
      toast({
        title: "Courrier mis à jour",
        description: "Le courrier a été mis à jour avec succès.",
      });
    } else {
      // Mode création
      const newMail: Mail = {
        ...data,
        id: `mail-${Date.now()}`,
      };
      mails.push(newMail);
      toast({
        title: "Courrier créé",
        description: "Le courrier a été créé avec succès.",
      });
    }

    // Sauvegarder dans le localStorage
    localStorage.setItem("mails", JSON.stringify(mails));
    navigate("/mail");
  };

  const handleCancel = () => {
    navigate("/mail");
  };

  if (loading) {
    return (
      <div className="container mx-auto py-8 px-4 flex justify-center">
        <p>Chargement...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">
        {isEditMode ? "Modifier le courrier" : "Nouveau courrier"}
      </h1>
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <MailForm
          initialData={mail || undefined}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
      </div>
    </div>
  );
};

export default MailFormPage;
