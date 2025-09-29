import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ShoppingCart, Plus, Minus, Search, Package, CreditCard } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Medicine {
  id: string;
  name: string;
  genericName: string;
  price: number;
  unit: string;
  inStock: boolean;
  description: string;
  manufacturer: string;
  category: string;
}

interface CartItem extends Medicine {
  quantity: number;
}

const mockMedicines: Medicine[] = [
  {
    id: '1',
    name: 'Paracetamol 500mg',
    genericName: 'Acetaminophen',
    price: 25,
    unit: 'strip of 10 tablets',
    inStock: true,
    description: 'Pain reliever and fever reducer',
    manufacturer: 'Cipla Ltd',
    category: 'Pain Relief'
  },
  {
    id: '2',
    name: 'Amoxicillin 250mg',
    genericName: 'Amoxicillin',
    price: 45,
    unit: 'strip of 10 capsules',
    inStock: true,
    description: 'Antibiotic for bacterial infections',
    manufacturer: 'Sun Pharma',
    category: 'Antibiotics'
  },
  {
    id: '3',
    name: 'Vitamin D3',
    genericName: 'Cholecalciferol',
    price: 120,
    unit: 'bottle of 30 tablets',
    inStock: false,
    description: 'Vitamin D supplement',
    manufacturer: 'Dr. Reddy\'s',
    category: 'Vitamins'
  },
  {
    id: '4',
    name: 'Cough Syrup',
    genericName: 'Dextromethorphan',
    price: 80,
    unit: '100ml bottle',
    inStock: true,
    description: 'Cough suppressant syrup',
    manufacturer: 'Lupin Ltd',
    category: 'Cough & Cold'
  }
];

interface MedicineOrderProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MedicineOrder: React.FC<MedicineOrderProps> = ({ isOpen, onClose }) => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [medicines] = useState<Medicine[]>(mockMedicines);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('browse');

  const filteredMedicines = medicines.filter(medicine =>
    medicine.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    medicine.genericName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    medicine.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const addToCart = (medicine: Medicine) => {
    const existingItem = cart.find(item => item.id === medicine.id);
    if (existingItem) {
      setCart(cart.map(item =>
        item.id === medicine.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...medicine, quantity: 1 }]);
    }
    toast({
      title: "Medicine added to cart",
      description: `${medicine.name} has been added to your cart.`,
    });
  };

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity === 0) {
      setCart(cart.filter(item => item.id !== id));
    } else {
      setCart(cart.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      ));
    }
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const handleCheckout = () => {
    if (cart.length === 0) {
      toast({
        title: "Cart is empty",
        description: "Please add medicines to your cart before checkout.",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Order placed successfully!",
      description: `Your order of ₹${getTotalPrice()} has been placed. You will receive a confirmation SMS.`,
    });
    setCart([]);
    setActiveTab('browse');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5 text-patient" />
            {t('patient.orderMedicines')}
          </DialogTitle>
          <DialogDescription>
            Browse and order medicines online
          </DialogDescription>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="browse" className="flex items-center gap-2">
              <Package className="h-4 w-4" />
              Browse Medicines
            </TabsTrigger>
            <TabsTrigger value="cart" className="flex items-center gap-2">
              <ShoppingCart className="h-4 w-4" />
              Cart ({cart.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="browse" className="space-y-4 mt-4">
            {/* Search */}
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search medicines..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Medicine List */}
            <div className="max-h-96 overflow-y-auto space-y-3">
              {filteredMedicines.map((medicine) => (
                <Card key={medicine.id} className="healthcare-card">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-semibold">{medicine.name}</h3>
                          <Badge className={medicine.inStock ? 'bg-secondary text-secondary-foreground' : 'bg-muted text-muted-foreground'}>
                            {medicine.inStock ? 'In Stock' : 'Out of Stock'}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-1">{medicine.genericName}</p>
                        <p className="text-sm text-muted-foreground mb-1">{medicine.manufacturer}</p>
                        <p className="text-sm text-muted-foreground mb-2">{medicine.description}</p>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-semibold text-patient">₹{medicine.price}</p>
                            <p className="text-xs text-muted-foreground">{medicine.unit}</p>
                          </div>
                          <Button
                            size="sm"
                            variant="patient"
                            onClick={() => addToCart(medicine)}
                            disabled={!medicine.inStock}
                          >
                            <Plus className="h-4 w-4 mr-1" />
                            Add to Cart
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="cart" className="space-y-4 mt-4">
            {cart.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <ShoppingCart className="h-12 w-12 mx-auto mb-4" />
                <p>Your cart is empty</p>
                <p className="text-sm">Add medicines to get started</p>
              </div>
            ) : (
              <>
                <div className="max-h-64 overflow-y-auto space-y-3">
                  {cart.map((item) => (
                    <Card key={item.id} className="healthcare-card">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <h3 className="font-semibold">{item.name}</h3>
                            <p className="text-sm text-muted-foreground">₹{item.price} per {item.unit}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            >
                              <Minus className="h-4 w-4" />
                            </Button>
                            <span className="w-8 text-center">{item.quantity}</span>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                            <div className="ml-4 text-right">
                              <p className="font-semibold">₹{item.price * item.quantity}</p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <div className="border-t pt-4">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-lg font-semibold">Total: ₹{getTotalPrice()}</span>
                  </div>
                  <Button
                    className="w-full"
                    variant="patient"
                    size="lg"
                    onClick={handleCheckout}
                  >
                    <CreditCard className="h-5 w-5 mr-2" />
                    Proceed to Checkout
                  </Button>
                </div>
              </>
            )}
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};