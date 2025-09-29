import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { PharmacyFinder } from '@/components/patient/PharmacyFinder';
import { MedicineOrder } from '@/components/patient/MedicineOrder';
import { HealthAssistant } from '@/components/patient/HealthAssistant';
import { 
  Calendar, 
  Video, 
  FileText, 
  MapPin, 
  ShoppingCart, 
  MessageCircle,
  Clock,
  Download,
  Phone,
  Heart
} from 'lucide-react';

// Mock data
const mockAppointments = [
  {
    id: '1',
    doctorName: 'Dr. Priya Sharma',
    specialty: 'General Medicine',
    date: '2024-01-25',
    time: '10:00 AM',
    status: 'confirmed',
    type: 'video'
  },
  {
    id: '2',
    doctorName: 'Dr. Rajesh Kumar',
    specialty: 'Cardiology',
    date: '2024-01-28',
    time: '2:30 PM',
    status: 'pending',
    type: 'consultation'
  }
];

const mockPrescriptions = [
  {
    id: '1',
    doctorName: 'Dr. Priya Sharma',
    date: '2024-01-20',
    medicines: ['Paracetamol 500mg', 'Vitamin D3'],
    status: 'active'
  },
  {
    id: '2',
    doctorName: 'Dr. Amit Singh',
    date: '2024-01-15',
    medicines: ['Amoxicillin 250mg', 'Cough Syrup'],
    status: 'completed'
  }
];

const mockOrders = [
  {
    id: '1',
    pharmacyName: 'MedPlus Pharmacy',
    items: ['Paracetamol 500mg', 'Vitamin D3'],
    total: '₹180',
    status: 'delivered',
    date: '2024-01-22'
  },
  {
    id: '2',
    pharmacyName: 'Apollo Pharmacy',
    items: ['Blood Pressure Monitor'],
    total: '₹1,200',
    status: 'shipped',
    date: '2024-01-24'
  }
];

export const PatientDashboard: React.FC = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [isPharmacyFinderOpen, setIsPharmacyFinderOpen] = useState(false);
  const [isMedicineOrderOpen, setIsMedicineOrderOpen] = useState(false);
  const [isHealthAssistantOpen, setIsHealthAssistantOpen] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-secondary text-secondary-foreground';
      case 'pending': return 'bg-accent text-accent-foreground';
      case 'active': return 'bg-secondary text-secondary-foreground';
      case 'completed': return 'bg-muted text-muted-foreground';
      case 'delivered': return 'bg-secondary text-secondary-foreground';
      case 'shipped': return 'bg-accent text-accent-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="healthcare-card gradient-patient text-patient-foreground p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2">
              {t('common.welcome')}, {user?.fullName}!
            </h1>
            <p className="text-patient-foreground/80">
              {t('patient.dashboard')} - Manage your health journey
            </p>
          </div>
          <Heart className="h-12 w-12 text-patient-foreground/60" />
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Button variant="patient" size="lg" className="h-20 flex-col gap-2">
          <Calendar className="h-6 w-6" />
          <span>{t('patient.bookAppointment')}</span>
        </Button>
        
        <Button 
          variant="outline" 
          size="lg" 
          className="h-20 flex-col gap-2 hover:bg-patient/10"
          onClick={() => setIsPharmacyFinderOpen(true)}
        >
          <MapPin className="h-6 w-6" />
          <span>{t('patient.findPharmacy')}</span>
        </Button>
        
        <Button 
          variant="outline" 
          size="lg" 
          className="h-20 flex-col gap-2 hover:bg-patient/10"
          onClick={() => setIsMedicineOrderOpen(true)}
        >
          <ShoppingCart className="h-6 w-6" />
          <span>{t('patient.orderMedicines')}</span>
        </Button>
        
        <Button 
          variant="outline" 
          size="lg" 
          className="h-20 flex-col gap-2 hover:bg-patient/10"
          onClick={() => setIsHealthAssistantOpen(true)}
        >
          <MessageCircle className="h-6 w-6" />
          <span>{t('patient.chatbot')}</span>
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming Appointments */}
        <Card className="healthcare-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-patient" />
              {t('patient.upcomingAppointments')}
            </CardTitle>
            <CardDescription>
              Your scheduled consultations
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {mockAppointments.map((appointment) => (
              <div key={appointment.id} className="p-4 rounded-lg border border-border bg-muted/30">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h4 className="font-semibold">{appointment.doctorName}</h4>
                    <p className="text-sm text-muted-foreground">{appointment.specialty}</p>
                  </div>
                  <Badge className={getStatusColor(appointment.status)}>
                    {appointment.status}
                  </Badge>
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {appointment.date}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {appointment.time}
                  </div>
                </div>
                <div className="flex gap-2 mt-3">
                  {appointment.type === 'video' && (
                    <Button size="sm" variant="patient">
                      <Video className="h-4 w-4 mr-1" />
                      Join Call
                    </Button>
                  )}
                  <Button size="sm" variant="outline">
                    <Phone className="h-4 w-4 mr-1" />
                    Contact
                  </Button>
                </div>
              </div>
            ))}
            <Button variant="outline" className="w-full">
              {t('appointments.bookNew')}
            </Button>
          </CardContent>
        </Card>

        {/* Recent Prescriptions */}
        <Card className="healthcare-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-secondary" />
              {t('patient.healthRecords')}
            </CardTitle>
            <CardDescription>
              Your prescriptions and reports
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {mockPrescriptions.map((prescription) => (
              <div key={prescription.id} className="p-4 rounded-lg border border-border bg-muted/30">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h4 className="font-semibold">{prescription.doctorName}</h4>
                    <p className="text-sm text-muted-foreground">{prescription.date}</p>
                  </div>
                  <Badge className={getStatusColor(prescription.status)}>
                    {prescription.status}
                  </Badge>
                </div>
                <div className="space-y-1">
                  {prescription.medicines.map((medicine, index) => (
                    <p key={index} className="text-sm text-muted-foreground">
                      • {medicine}
                    </p>
                  ))}
                </div>
                <div className="flex gap-2 mt-3">
                  <Button size="sm" variant="outline">
                    <Download className="h-4 w-4 mr-1" />
                    {t('patient.downloadPrescription')}
                  </Button>
                  <Button size="sm" variant="secondary">
                    <ShoppingCart className="h-4 w-4 mr-1" />
                    Order Medicines
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Order History */}
      <Card className="healthcare-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5 text-accent" />
            {t('patient.orderStatus')}
          </CardTitle>
          <CardDescription>
            Track your medicine orders
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockOrders.map((order) => (
              <div key={order.id} className="flex items-center justify-between p-4 rounded-lg border border-border bg-muted/30">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold">{order.pharmacyName}</h4>
                    <Badge className={getStatusColor(order.status)}>
                      {order.status}
                    </Badge>
                  </div>
                  <div className="space-y-1">
                    {order.items.map((item, index) => (
                      <p key={index} className="text-sm text-muted-foreground">
                        • {item}
                      </p>
                    ))}
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <p className="text-sm text-muted-foreground">{order.date}</p>
                    <p className="font-semibold text-accent">{order.total}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Modals */}
      <PharmacyFinder 
        isOpen={isPharmacyFinderOpen} 
        onClose={() => setIsPharmacyFinderOpen(false)} 
      />
      <MedicineOrder 
        isOpen={isMedicineOrderOpen} 
        onClose={() => setIsMedicineOrderOpen(false)} 
      />
      <HealthAssistant 
        isOpen={isHealthAssistantOpen} 
        onClose={() => setIsHealthAssistantOpen(false)} 
      />
    </div>
  );
};