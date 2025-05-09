
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { ClientType } from '@/types/client';
import { Plus } from 'lucide-react';

const formSchema = z.object({
  name: z.string().min(2, { message: 'Le nom doit contenir au moins 2 caractères' }),
  phone: z.string().min(8, { message: 'Numéro de téléphone invalide' }),
  description: z.string().min(3, { message: 'Description requise' }),
  price: z.string().refine((val) => !isNaN(Number(val)), { message: 'Le prix doit être un nombre' }),
  measurements: z.string(),
});

type FormValues = z.infer<typeof formSchema>;

interface ClientFormProps {
  onSave: (client: Omit<ClientType, 'id'>) => void;
  initialData?: ClientType;
  buttonText?: string;
}

const ClientForm = ({ onSave, initialData, buttonText = "Enregistrer" }: ClientFormProps) => {
  const { toast } = useToast();
  const [fabricPhoto, setFabricPhoto] = useState<string | null>(initialData?.fabricPhoto || null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: initialData?.name || '',
      phone: initialData?.phone || '',
      description: initialData?.description || '',
      price: initialData?.price ? String(initialData.price) : '',
      measurements: initialData?.measurements || '',
    },
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast({
        variant: "destructive",
        description: "L'image est trop volumineuse. La taille maximale est de 5Mo.",
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        setFabricPhoto(event.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    try {
      const clientData = {
        ...data,
        price: Number(data.price),
        fabricPhoto: fabricPhoto || undefined,
        delivered: initialData?.delivered || false,
        archived: initialData?.archived || false,
        date: initialData?.date || new Date().toISOString(),
      };
      
      onSave(clientData);
      
      if (!initialData) {
        form.reset();
        setFabricPhoto(null);
      }
      
      toast({
        description: `Client ${initialData ? 'modifié' : 'ajouté'} avec succès`,
      });
    } catch (error) {
      toast({
        variant: "destructive",
        description: "Une erreur est survenue",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nom du client</FormLabel>
                <FormControl>
                  <Input placeholder="Nom complet" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Numéro de téléphone</FormLabel>
                <FormControl>
                  <Input placeholder="Numéro de téléphone" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description de la commande</FormLabel>
              <FormControl>
                <Textarea placeholder="Description de la tenue..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="measurements"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mesures</FormLabel>
              <FormControl>
                <Textarea placeholder="Détails des mesures..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Prix (FCFA)</FormLabel>
              <FormControl>
                <Input type="number" placeholder="Prix" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="space-y-2">
          <FormLabel>Photo du tissu</FormLabel>
          <div className="flex flex-col items-center justify-center border-2 border-dashed border-gold/20 rounded-md p-4 hover:border-gold/40 transition-colors">
            {fabricPhoto ? (
              <div className="relative w-full">
                <img src={fabricPhoto} alt="Aperçu du tissu" className="w-full h-48 object-cover rounded-md" />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="absolute top-2 right-2 bg-white"
                  onClick={() => setFabricPhoto(null)}
                >
                  Changer
                </Button>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-6">
                <Plus className="h-10 w-10 text-gold/40 mb-2" />
                <p className="text-sm text-muted-foreground mb-2">Cliquez pour ajouter une photo du tissu</p>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="fabric-photo"
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => document.getElementById("fabric-photo")?.click()}
                >
                  Télécharger une image
                </Button>
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-end">
          <Button 
            type="submit" 
            className="gold-gradient hover:opacity-90 text-white"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Enregistrement..." : buttonText}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ClientForm;
