import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Layout } from '@/components/Layout';
import { PatientDashboard } from '@/components/dashboards/PatientDashboard';
import { DoctorDashboard } from '@/components/dashboards/DoctorDashboard';
import { PharmacistDashboard } from '@/components/dashboards/PharmacistDashboard';

export const Dashboard: React.FC = () => {
  const { user } = useAuth();

  if (!user) {
    return null; // This should be handled by the routing logic
  }

  const getDashboardComponent = () => {
    switch (user.role) {
      case 'patient':
        return <PatientDashboard />;
      case 'doctor':
        return <DoctorDashboard />;
      case 'pharmacist':
        return <PharmacistDashboard />;
      default:
        return <PatientDashboard />;
    }
  };

  return (
    <Layout>
      {getDashboardComponent()}
    </Layout>
  );
};