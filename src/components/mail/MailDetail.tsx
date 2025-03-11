import { Mail } from "@/types/mail";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowLeft, Pencil } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface MailDetailProps {
  mail: Mail;
}

const MailDetail = ({ mail }: MailDetailProps) => {
  const navigate = useNavigate();

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">Détails du courrier</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="text-sm font-medium text-gray-500">Référence</h3>
            <p className="mt-1">{mail.reference}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500">Date</h3>
            <p className="mt-1">{new Date(mail.date).toLocaleDateString()}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500">Expéditeur</h3>
            <p className="mt-1">{mail.sender}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500">Destinataire</h3>
            <p className="mt-1">{mail.recipient}</p>
          </div>
          <div className="md:col-span-2">
            <h3 className="text-sm font-medium text-gray-500">Objet</h3>
            <p className="mt-1">{mail.subject}</p>
          </div>
          <div className="md:col-span-2">
            <h3 className="text-sm font-medium text-gray-500">Contenu</h3>
            <div className="mt-1 p-4 bg-gray-50 rounded-md min-h-[150px]">
              {mail.content}
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button
          variant="outline"
          onClick={() => navigate("/mail")}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" /> Retour
        </Button>
        <Button
          onClick={() => navigate(`/mail/edit/${mail.id}`)}
          className="flex items-center gap-2"
        >
          <Pencil className="h-4 w-4" /> Modifier
        </Button>
      </CardFooter>
    </Card>
  );
};

export default MailDetail;
