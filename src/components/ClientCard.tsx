
import { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Archive, Clock } from 'lucide-react';
import { ClientType } from '@/types/client';
import { useToast } from '@/hooks/use-toast';
import { Link } from 'react-router-dom';

interface ClientCardProps {
  client: ClientType;
  onArchive?: (id: string) => void;
  onUnarchive?: (id: string) => void;
  onMarkDelivered?: (id: string) => void;
}

const ClientCard = ({ 
  client, 
  onArchive, 
  onUnarchive,
  onMarkDelivered 
}: ClientCardProps) => {
  const { toast } = useToast();
  const [isHovered, setIsHovered] = useState(false);

  const handleArchive = () => {
    if (onArchive) {
      onArchive(client.id);
      toast({
        description: `${client.name} a été archivé`,
      });
    }
  };

  const handleUnarchive = () => {
    if (onUnarchive) {
      onUnarchive(client.id);
      toast({
        description: `${client.name} a été désarchivé`,
      });
    }
  };

  const handleMarkDelivered = () => {
    if (onMarkDelivered) {
      onMarkDelivered(client.id);
      toast({
        description: `${client.name} marqué comme livré`,
      });
    }
  };

  return (
    <Card 
      className={`overflow-hidden card-shadow transition-all duration-300 ${
        isHovered ? 'border-gold/50' : 'border-border'
      } hover-lift`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardHeader className="pb-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-playfair font-semibold text-lg">{client.name}</h3>
            <p className="text-sm text-muted-foreground">{client.phone}</p>
          </div>
          <div>
            {client.delivered ? (
              <Badge className="gold-gradient text-white">
                <CheckCircle className="h-3 w-3 mr-1" />
                Livré
              </Badge>
            ) : (
              <Badge variant="outline" className="border-gold/30 text-gold">
                <Clock className="h-3 w-3 mr-1" />
                En cours
              </Badge>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Description:</span>
            <span className="font-medium truncate max-w-[60%]">{client.description}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Prix:</span>
            <span className="font-medium">{client.price} FCFA</span>
          </div>
          {client.fabricPhoto && (
            <div className="mt-3">
              <p className="text-xs text-muted-foreground mb-1">Tissus:</p>
              <div className="h-24 w-full rounded-md bg-muted overflow-hidden">
                <img
                  src={client.fabricPhoto}
                  alt="Tissus"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between pt-2 border-t border-border">
        <Link to={`/clients/${client.id}`}>
          <Button variant="outline" size="sm" className="text-xs hover:text-gold hover:border-gold">
            Détails
          </Button>
        </Link>
        <div className="flex gap-2">
          {!client.delivered && !client.archived && (
            <Button variant="outline" size="sm" className="text-xs bg-green-50 hover:bg-green-100 border-green-200 text-green-700" onClick={handleMarkDelivered}>
              <CheckCircle className="h-3 w-3 mr-1" />
              Livré
            </Button>
          )}
          
          {client.archived ? (
            <Button variant="outline" size="sm" className="text-xs hover:text-gold hover:border-gold" onClick={handleUnarchive}>
              Désarchiver
            </Button>
          ) : (
            <Button variant="outline" size="sm" className="text-xs hover:text-gold hover:border-gold" onClick={handleArchive}>
              <Archive className="h-3 w-3 mr-1" />
              Archiver
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};

export default ClientCard;
