import React from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Calendar, 
  Video, 
  FileText, 
  Users, 
  Clock,
  Stethoscope,
  ClipboardList,
  TrendingUp,
  AlertCircle
} from 'lucide-react';

// Mock data
const mockTodayAppointments = [
  {
    id: '1',
    patientName: 'Rajesh Kumar',
    time: '10:00 AM',
    type: 'video',
    status: 'confirmed',
    symptoms: 'Fever, headache',
    duration: '30 min'
  },
  {
    id: '2',
    patientName: 'Priya Singh',
    time: '11:30 AM',
    type: 'follow-up',
    status: 'confirmed',
    symptoms: 'Diabetes check-up',
    duration: '20 min'
  },
  {
    id: '3',
    patientName: 'Amit Sharma',
    time: '2:00 PM',
    type: 'consultation',
    status: 'pending',
    symptoms: 'Chest pain',
    duration: '30 min'
  }
];

const mockPatients = [
  {
    id: '1',
    name: 'Rajesh Kumar',
    age: 45,
    lastVisit: '2024-01-20',
    condition: 'Hypertension',
    status: 'stable'
  },
  {
    id: '2',
    name: 'Priya Singh',
    age: 38,
    lastVisit: '2024-01-18',
    condition: 'Diabetes Type 2',
    status: 'needs_attention'
  },
  {
    id: '3',
    name: 'Amit Sharma',
    age: 32,
    lastVisit: '2024-01-22',
    condition: 'Anxiety',
    status: 'improving'
  }
];

const stats = [
  {
    title: 'Today\'s Appointments',
    value: '8',
    icon: Calendar,
    color: 'text-doctor'
  },
  {
    title: 'Total Patients',
    value: '142',
    icon: Users,
    color: 'text-patient'
  },
  {
    title: 'Pending Reports',
    value: '5',
    icon: FileText,
    color: 'text-accent'
  },
  {
    title: 'This Month',
    value: '89',
    icon: TrendingUp,
    color: 'text-secondary'
  }
];

export const DoctorDashboard: React.FC = () => {
  const { t } = useTranslation();
  const { user } = useAuth();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-secondary text-secondary-foreground';
      case 'pending': return 'bg-accent text-accent-foreground';
      case 'stable': return 'bg-secondary text-secondary-foreground';
      case 'needs_attention': return 'bg-destructive text-destructive-foreground';
      case 'improving': return 'bg-doctor text-doctor-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getUrgencyIcon = (symptoms: string) => {
    const urgentKeywords = ['chest pain', 'difficulty breathing', 'severe'];
    const isUrgent = urgentKeywords.some(keyword => 
      symptoms.toLowerCase().includes(keyword)
    );
    return isUrgent ? <AlertCircle className="h-4 w-4 text-destructive" /> : null;
  };

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="healthcare-card gradient-doctor text-doctor-foreground p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2">
              {t('common.welcome')}, {user?.fullName}!
            </h1>
            <p className="text-doctor-foreground/80">
              {t('doctor.dashboard')} - Your medical practice hub
            </p>
          </div>
          <Stethoscope className="h-12 w-12 text-doctor-foreground/60" />
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={index} className="healthcare-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    {stat.title}
                  </p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </div>
                <stat.icon className={`h-8 w-8 ${stat.color}`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Button variant="doctor" size="lg" className="h-20 flex-col gap-2">
          <Calendar className="h-6 w-6" />
          <span>{t('doctor.scheduleSlots')}</span>
        </Button>
        
        <Button variant="outline" size="lg" className="h-20 flex-col gap-2 hover:bg-doctor/10">
          <FileText className="h-6 w-6" />
          <span>{t('doctor.writePrescription')}</span>
        </Button>
        
        <Button variant="outline" size="lg" className="h-20 flex-col gap-2 hover:bg-doctor/10">
          <Users className="h-6 w-6" />
          <span>{t('doctor.patientRecords')}</span>
        </Button>
        
        <Button variant="outline" size="lg" className="h-20 flex-col gap-2 hover:bg-doctor/10">
          <ClipboardList className="h-6 w-6" />
          <span>{t('doctor.generateReport')}</span>
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Today's Appointments */}
        <Card className="healthcare-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-doctor" />
              Today's Schedule
            </CardTitle>
            <CardDescription>
              Your appointments for today
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {mockTodayAppointments.map((appointment) => (
              <div key={appointment.id} className="p-4 rounded-lg border border-border bg-muted/30">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div>
                      <h4 className="font-semibold">{appointment.patientName}</h4>
                      <p className="text-sm text-muted-foreground">{appointment.symptoms}</p>
                    </div>
                    {getUrgencyIcon(appointment.symptoms)}
                  </div>
                  <Badge className={getStatusColor(appointment.status)}>
                    {appointment.status}
                  </Badge>
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {appointment.time}
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {appointment.duration}
                  </div>
                </div>
                <div className="flex gap-2">
                  {appointment.type === 'video' && (
                    <Button size="sm" variant="doctor">
                      <Video className="h-4 w-4 mr-1" />
                      {t('doctor.startConsultation')}
                    </Button>
                  )}
                  <Button size="sm" variant="outline">
                    <FileText className="h-4 w-4 mr-1" />
                    View History
                  </Button>
                </div>
              </div>
            ))}
            <Button variant="outline" className="w-full">
              View All Appointments
            </Button>
          </CardContent>
        </Card>

        {/* Patient Management */}
        <Card className="healthcare-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-patient" />
              Recent Patients
            </CardTitle>
            <CardDescription>
              Patients requiring attention
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {mockPatients.map((patient) => (
              <div key={patient.id} className="p-4 rounded-lg border border-border bg-muted/30">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h4 className="font-semibold">{patient.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      Age: {patient.age} • Last visit: {patient.lastVisit}
                    </p>
                    <p className="text-sm font-medium mt-1">{patient.condition}</p>
                  </div>
                  <Badge className={getStatusColor(patient.status)}>
                    {patient.status.replace('_', ' ')}
                  </Badge>
                </div>
                <div className="flex gap-2 mt-3">
                  <Button size="sm" variant="outline">
                    <FileText className="h-4 w-4 mr-1" />
                    {t('doctor.patientHistory')}
                  </Button>
                  <Button size="sm" variant="doctor">
                    <ClipboardList className="h-4 w-4 mr-1" />
                    Update Records
                  </Button>
                </div>
              </div>
            ))}
            <Button variant="outline" className="w-full">
              View All Patients
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Quick Stats */}
      <Card className="healthcare-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-secondary" />
            Practice Overview
          </CardTitle>
          <CardDescription>
            Your medical practice insights
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4">
              <div className="text-2xl font-bold text-doctor mb-1">95%</div>
              <div className="text-sm text-muted-foreground">Patient Satisfaction</div>
            </div>
            <div className="text-center p-4">
              <div className="text-2xl font-bold text-secondary mb-1">18</div>
              <div className="text-sm text-muted-foreground">Avg. Consultations/Day</div>
            </div>
            <div className="text-center p-4">
              <div className="text-2xl font-bold text-accent mb-1">4.8</div>
              <div className="text-sm text-muted-foreground">Rating</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};