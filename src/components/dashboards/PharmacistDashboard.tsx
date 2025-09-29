import React from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Package, 
  ShoppingCart, 
  MapPin, 
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Clock,
  Truck,
  Pill
} from 'lucide-react';

// Mock data
const mockOrders = [
  {
    id: '1',
    customerName: 'Rajesh Kumar',
    items: ['Paracetamol 500mg x2', 'Vitamin D3 x1'],
    total: '₹180',
    status: 'pending',
    orderTime: '10:30 AM',
    prescriptionId: 'RX001'
  },
  {
    id: '2',
    customerName: 'Priya Singh',
    items: ['Insulin Glargine x1', 'Test Strips x1'],
    total: '₹1,200',
    status: 'preparing',
    orderTime: '11:15 AM',
    prescriptionId: 'RX002'
  },
  {
    id: '3',
    customerName: 'Amit Sharma',
    items: ['Amoxicillin 250mg x1'],
    total: '₹85',
    status: 'ready',
    orderTime: '9:45 AM',
    prescriptionId: 'RX003'
  }
];

const mockInventory = [
  {
    id: '1',
    name: 'Paracetamol 500mg',
    stock: 150,
    minStock: 20,
    category: 'Pain Relief',
    price: '₹2.50',
    status: 'good'
  },
  {
    id: '2',
    name: 'Insulin Glargine',
    stock: 8,
    minStock: 10,
    category: 'Diabetes',
    price: '₹850.00',
    status: 'low'
  },
  {
    id: '3',
    name: 'Amoxicillin 250mg',
    stock: 2,
    minStock: 15,
    category: 'Antibiotic',
    price: '₹15.00',
    status: 'critical'
  },
  {
    id: '4',
    name: 'Vitamin D3',
    stock: 75,
    minStock: 25,
    category: 'Vitamins',
    price: '₹12.00',
    status: 'good'
  }
];

const stats = [
  {
    title: 'Pending Orders',
    value: '12',
    icon: ShoppingCart,
    color: 'text-accent'
  },
  {
    title: 'Low Stock Items',
    value: '7',
    icon: AlertTriangle,
    color: 'text-destructive'
  },
  {
    title: 'Today\'s Sales',
    value: '₹15,430',
    icon: TrendingUp,
    color: 'text-secondary'
  },
  {
    title: 'Orders Fulfilled',
    value: '28',
    icon: CheckCircle,
    color: 'text-pharmacist'
  }
];

export const PharmacistDashboard: React.FC = () => {
  const { t } = useTranslation();
  const { user } = useAuth();

  const getOrderStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-accent text-accent-foreground';
      case 'preparing': return 'bg-primary text-primary-foreground';
      case 'ready': return 'bg-secondary text-secondary-foreground';
      case 'dispatched': return 'bg-pharmacist text-pharmacist-foreground';
      case 'delivered': return 'bg-muted text-muted-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getStockStatusColor = (status: string) => {
    switch (status) {
      case 'good': return 'text-secondary';
      case 'low': return 'text-accent';
      case 'critical': return 'text-destructive';
      default: return 'text-muted-foreground';
    }
  };

  const getStockIcon = (status: string) => {
    switch (status) {
      case 'good': return CheckCircle;
      case 'low': return AlertTriangle;
      case 'critical': return AlertTriangle;
      default: return Package;
    }
  };

  const getStockPercentage = (current: number, min: number) => {
    const percentage = (current / (min * 3)) * 100;
    return Math.min(percentage, 100);
  };

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="healthcare-card gradient-pharmacist text-pharmacist-foreground p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2">
              {t('common.welcome')}, {user?.fullName}!
            </h1>
            <p className="text-pharmacist-foreground/80">
              {t('pharmacist.dashboard')} - Manage your pharmacy operations
            </p>
          </div>
          <Pill className="h-12 w-12 text-pharmacist-foreground/60" />
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
        <Button variant="pharmacist" size="lg" className="h-20 flex-col gap-2">
          <Package className="h-6 w-6" />
          <span>{t('pharmacist.manageInventory')}</span>
        </Button>
        
        <Button variant="outline" size="lg" className="h-20 flex-col gap-2 hover:bg-pharmacist/10">
          <ShoppingCart className="h-6 w-6" />
          <span>{t('pharmacist.incomingOrders')}</span>
        </Button>
        
        <Button variant="outline" size="lg" className="h-20 flex-col gap-2 hover:bg-pharmacist/10">
          <MapPin className="h-6 w-6" />
          <span>{t('pharmacist.updateLocation')}</span>
        </Button>
        
        <Button variant="outline" size="lg" className="h-20 flex-col gap-2 hover:bg-pharmacist/10">
          <TrendingUp className="h-6 w-6" />
          <span>Analytics</span>
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Incoming Orders */}
        <Card className="healthcare-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShoppingCart className="h-5 w-5 text-pharmacist" />
              Incoming Orders
            </CardTitle>
            <CardDescription>
              Orders requiring your attention
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {mockOrders.map((order) => (
              <div key={order.id} className="p-4 rounded-lg border border-border bg-muted/30">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h4 className="font-semibold">{order.customerName}</h4>
                    <p className="text-sm text-muted-foreground">
                      {order.prescriptionId} • {order.orderTime}
                    </p>
                  </div>
                  <Badge className={getOrderStatusColor(order.status)}>
                    {order.status}
                  </Badge>
                </div>
                <div className="space-y-1 mb-3">
                  {order.items.map((item, index) => (
                    <p key={index} className="text-sm text-muted-foreground">
                      • {item}
                    </p>
                  ))}
                </div>
                <div className="flex items-center justify-between">
                  <p className="font-semibold text-accent">{order.total}</p>
                  <div className="flex gap-2">
                    {order.status === 'pending' && (
                      <Button size="sm" variant="pharmacist">
                        <Package className="h-4 w-4 mr-1" />
                        Start Preparing
                      </Button>
                    )}
                    {order.status === 'ready' && (
                      <Button size="sm" variant="secondary">
                        <Truck className="h-4 w-4 mr-1" />
                        Mark Dispatched
                      </Button>
                    )}
                    <Button size="sm" variant="outline">
                      View Details
                    </Button>
                  </div>
                </div>
              </div>
            ))}
            <Button variant="outline" className="w-full">
              View All Orders
            </Button>
          </CardContent>
        </Card>

        {/* Inventory Management */}
        <Card className="healthcare-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5 text-secondary" />
              Inventory Status
            </CardTitle>
            <CardDescription>
              Stock levels and alerts
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {mockInventory.map((item) => {
              const StockIcon = getStockIcon(item.status);
              const stockPercentage = getStockPercentage(item.stock, item.minStock);
              
              return (
                <div key={item.id} className="p-4 rounded-lg border border-border bg-muted/30">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold">{item.name}</h4>
                        <StockIcon className={`h-4 w-4 ${getStockStatusColor(item.status)}`} />
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {item.category} • {item.price}
                      </p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Stock: {item.stock} units</span>
                      <span className="text-muted-foreground">Min: {item.minStock}</span>
                    </div>
                    <Progress 
                      value={stockPercentage} 
                      className="h-2"
                    />
                  </div>
                  {item.status !== 'good' && (
                    <div className="flex gap-2 mt-3">
                      <Button size="sm" variant="outline">
                        <Package className="h-4 w-4 mr-1" />
                        Reorder
                      </Button>
                      <Button size="sm" variant="pharmacist">
                        Update Stock
                      </Button>
                    </div>
                  )}
                </div>
              );
            })}
            <Button variant="outline" className="w-full">
              {t('pharmacist.stockManagement')}
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Performance Metrics */}
      <Card className="healthcare-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-secondary" />
            Pharmacy Performance
          </CardTitle>
          <CardDescription>
            Your pharmacy insights and metrics
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center p-4">
              <div className="text-2xl font-bold text-pharmacist mb-1">94%</div>
              <div className="text-sm text-muted-foreground">Order Fulfillment Rate</div>
            </div>
            <div className="text-center p-4">
              <div className="text-2xl font-bold text-secondary mb-1">3.2</div>
              <div className="text-sm text-muted-foreground">Avg. Processing Time (hrs)</div>
            </div>
            <div className="text-center p-4">
              <div className="text-2xl font-bold text-accent mb-1">98%</div>
              <div className="text-sm text-muted-foreground">Customer Satisfaction</div>
            </div>
            <div className="text-center p-4">
              <div className="text-2xl font-bold text-primary mb-1">₹1.2L</div>
              <div className="text-sm text-muted-foreground">Monthly Revenue</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};