import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Eye, Pencil, Trash2 } from "lucide-react";
import { Mail } from "@/types/mail";
import { useNavigate } from "react-router-dom";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface MailTableProps {
  mails: Mail[];
  onDelete: (id: string) => void;
}

const MailTable = ({ mails, onDelete }: MailTableProps) => {
  const navigate = useNavigate();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [mailToDelete, setMailToDelete] = useState<string | null>(null);

  const handleViewDetails = (id: string) => {
    navigate(`/mail/${id}`);
  };

  const handleEdit = (id: string) => {
    navigate(`/mail/edit/${id}`);
  };

  const handleDeleteClick = (id: string) => {
    setMailToDelete(id);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (mailToDelete) {
      onDelete(mailToDelete);
      setMailToDelete(null);
    }
    setDeleteDialogOpen(false);
  };

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Référence</TableHead>
              <TableHead>Expéditeur</TableHead>
              <TableHead>Destinataire</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Objet</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mails.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-6">
                  Aucun courrier trouvé
                </TableCell>
              </TableRow>
            ) : (
              mails.map((mail) => (
                <TableRow key={mail.id}>
                  <TableCell>{mail.reference}</TableCell>
                  <TableCell>{mail.sender}</TableCell>
                  <TableCell>{mail.recipient}</TableCell>
                  <TableCell>
                    {new Date(mail.date).toLocaleDateString()}
                  </TableCell>
                  <TableCell>{mail.subject}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleViewDetails(mail.id)}
                        title="Détail"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleEdit(mail.id)}
                        title="Modifier"
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleDeleteClick(mail.id)}
                        title="Supprimer"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmer la suppression</AlertDialogTitle>
            <AlertDialogDescription>
              Êtes-vous sûr de vouloir supprimer ce courrier ? Cette action est
              irréversible.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete}>
              Supprimer
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default MailTable;
