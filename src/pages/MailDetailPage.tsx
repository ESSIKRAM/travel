import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import MailDetail from "@/components/mail/MailDetail";
import { Mail } from "@/types/mail";

const MailDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [mail, setMail] = useState<Mail | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Charger les données depuis le localStorage
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
  }, [id, navigate]);

  if (loading) {
    return (
      <div className="container mx-auto py-8 px-4 flex justify-center">
        <p>Chargement...</p>
      </div>
    );
  }

  if (!mail) {
    return (
      <div className="container mx-auto py-8 px-4 flex justify-center">
        <p>Courrier non trouvé</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <MailDetail mail={mail} />
    </div>
  );
};

export default MailDetailPage;
