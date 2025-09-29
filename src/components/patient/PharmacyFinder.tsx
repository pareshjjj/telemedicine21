import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { MapPin, Phone, Clock, Navigation, Star } from 'lucide-react';

interface Pharmacy {
  id: string;
  name: string;
  address: string;
  phone: string;
  distance: string;
  rating: number;
  isOpen: boolean;
  openHours: string;
  coordinates: [number, number];
}

const mockPharmacies: Pharmacy[] = [
  {
    id: '1',
    name: 'MedPlus Pharmacy',
    address: 'Sector 17, Chandigarh, Punjab 160017',
    phone: '+91 98765 43210',
    distance: '0.8 km',
    rating: 4.5,
    isOpen: true,
    openHours: '8:00 AM - 10:00 PM',
    coordinates: [76.7794, 30.7333]
  },
  {
    id: '2',
    name: 'Apollo Pharmacy',
    address: 'SCO 123, Sector 22, Chandigarh 160022',
    phone: '+91 98765 43211',
    distance: '1.2 km',
    rating: 4.3,
    isOpen: true,
    openHours: '24 Hours',
    coordinates: [76.7753, 30.7267]
  },
  {
    id: '3',
    name: 'Guardian Pharmacy',
    address: 'Main Market, Village Manimajra, Chandigarh',
    phone: '+91 98765 43212',
    distance: '2.1 km',
    rating: 4.0,
    isOpen: false,
    openHours: '9:00 AM - 9:00 PM',
    coordinates: [76.8206, 30.7614]
  },
  {
    id: '4',
    name: 'Jan Aushadhi Store',
    address: 'Sector 34, Chandigarh 160034',
    phone: '+91 98765 43213',
    distance: '2.8 km',
    rating: 4.2,
    isOpen: true,
    openHours: '8:00 AM - 8:00 PM',
    coordinates: [76.7631, 30.7194]
  }
];

interface PharmacyFinderProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PharmacyFinder: React.FC<PharmacyFinderProps> = ({ isOpen, onClose }) => {
  const { t } = useTranslation();
  const [searchLocation, setSearchLocation] = useState('');
  const [pharmacies] = useState<Pharmacy[]>(mockPharmacies);

  const handleGetDirections = (pharmacy: Pharmacy) => {
    const [lng, lat] = pharmacy.coordinates;
    const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
    window.open(url, '_blank');
  };

  const handleCall = (phone: string) => {
    window.open(`tel:${phone}`, '_self');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-patient" />
            {t('patient.findPharmacy')}
          </DialogTitle>
          <DialogDescription>
            Find nearby pharmacies and get directions
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Search Location */}
          <div className="flex gap-2">
            <Input
              placeholder="Enter your location..."
              value={searchLocation}
              onChange={(e) => setSearchLocation(e.target.value)}
              className="flex-1"
            />
            <Button variant="patient">
              <Navigation className="h-4 w-4 mr-2" />
              Search
            </Button>
          </div>

          {/* Map Placeholder */}
          <div className="h-64 bg-muted rounded-lg flex items-center justify-center border-2 border-dashed border-border">
            <div className="text-center text-muted-foreground">
              <MapPin className="h-12 w-12 mx-auto mb-2" />
              <p>Interactive Map View</p>
              <p className="text-sm">Map integration will be added here</p>
            </div>
          </div>

          {/* Pharmacy List */}
          <div className="max-h-64 overflow-y-auto space-y-3">
            {pharmacies.map((pharmacy) => (
              <Card key={pharmacy.id} className="healthcare-card">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold">{pharmacy.name}</h3>
                        <Badge className={pharmacy.isOpen ? 'bg-secondary text-secondary-foreground' : 'bg-muted text-muted-foreground'}>
                          {pharmacy.isOpen ? 'Open' : 'Closed'}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-1">{pharmacy.address}</p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          {pharmacy.rating}
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {pharmacy.distance}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {pharmacy.openHours}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      variant="patient"
                      onClick={() => handleGetDirections(pharmacy)}
                    >
                      <Navigation className="h-4 w-4 mr-1" />
                      Directions
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleCall(pharmacy.phone)}
                    >
                      <Phone className="h-4 w-4 mr-1" />
                      Call
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};