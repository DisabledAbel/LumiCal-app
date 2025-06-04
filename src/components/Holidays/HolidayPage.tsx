
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Search, Calendar } from 'lucide-react';

const HolidayPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('United States');
  const [selectedHolidays, setSelectedHolidays] = useState<string[]>([]);

  const countries = [
    'United States', 'Canada', 'United Kingdom', 'Australia', 'Germany',
    'France', 'Japan', 'China', 'India', 'Brazil', 'Mexico', 'Italy'
  ];

  const holidays = [
    // US Holidays
    { id: 'new-year', name: 'New Year\'s Day', date: 'January 1', country: 'United States', category: 'National' },
    { id: 'mlk-day', name: 'Martin Luther King Jr. Day', date: 'Third Monday in January', country: 'United States', category: 'National' },
    { id: 'presidents-day', name: 'Presidents\' Day', date: 'Third Monday in February', country: 'United States', category: 'National' },
    { id: 'memorial-day', name: 'Memorial Day', date: 'Last Monday in May', country: 'United States', category: 'National' },
    { id: 'independence-day', name: 'Independence Day', date: 'July 4', country: 'United States', category: 'National' },
    { id: 'labor-day', name: 'Labor Day', date: 'First Monday in September', country: 'United States', category: 'National' },
    { id: 'columbus-day', name: 'Columbus Day', date: 'Second Monday in October', country: 'United States', category: 'National' },
    { id: 'veterans-day', name: 'Veterans Day', date: 'November 11', country: 'United States', category: 'National' },
    { id: 'thanksgiving', name: 'Thanksgiving', date: 'Fourth Thursday in November', country: 'United States', category: 'National' },
    { id: 'christmas', name: 'Christmas Day', date: 'December 25', country: 'United States', category: 'National' },
    
    // Religious Holidays
    { id: 'easter', name: 'Easter Sunday', date: 'Varies (March/April)', country: 'United States', category: 'Religious' },
    { id: 'good-friday', name: 'Good Friday', date: 'Friday before Easter', country: 'United States', category: 'Religious' },
    { id: 'palm-sunday', name: 'Palm Sunday', date: 'Sunday before Easter', country: 'United States', category: 'Religious' },
    { id: 'ash-wednesday', name: 'Ash Wednesday', date: 'Varies (February/March)', country: 'United States', category: 'Religious' },
    { id: 'rosh-hashanah', name: 'Rosh Hashanah', date: 'Varies (September/October)', country: 'United States', category: 'Religious' },
    { id: 'yom-kippur', name: 'Yom Kippur', date: 'Varies (September/October)', country: 'United States', category: 'Religious' },
    { id: 'ramadan', name: 'Ramadan', date: 'Varies (lunar calendar)', country: 'United States', category: 'Religious' },
    { id: 'eid-al-fitr', name: 'Eid al-Fitr', date: 'End of Ramadan', country: 'United States', category: 'Religious' },
    
    // Cultural/Other
    { id: 'valentines', name: 'Valentine\'s Day', date: 'February 14', country: 'United States', category: 'Cultural' },
    { id: 'st-patricks', name: 'St. Patrick\'s Day', date: 'March 17', country: 'United States', category: 'Cultural' },
    { id: 'mothers-day', name: 'Mother\'s Day', date: 'Second Sunday in May', country: 'United States', category: 'Cultural' },
    { id: 'fathers-day', name: 'Father\'s Day', date: 'Third Sunday in June', country: 'United States', category: 'Cultural' },
    { id: 'halloween', name: 'Halloween', date: 'October 31', country: 'United States', category: 'Cultural' },
    { id: 'black-friday', name: 'Black Friday', date: 'Day after Thanksgiving', country: 'United States', category: 'Cultural' },
    
    // International
    { id: 'boxing-day', name: 'Boxing Day', date: 'December 26', country: 'Canada', category: 'National' },
    { id: 'canada-day', name: 'Canada Day', date: 'July 1', country: 'Canada', category: 'National' },
    { id: 'queens-birthday', name: 'Queen\'s Birthday', date: 'Varies', country: 'United Kingdom', category: 'National' },
    { id: 'australia-day', name: 'Australia Day', date: 'January 26', country: 'Australia', category: 'National' },
    { id: 'bastille-day', name: 'Bastille Day', date: 'July 14', country: 'France', category: 'National' },
    { id: 'german-unity', name: 'German Unity Day', date: 'October 3', country: 'Germany', category: 'National' },
    { id: 'golden-week', name: 'Golden Week', date: 'Late April to Early May', country: 'Japan', category: 'National' },
    { id: 'chinese-new-year', name: 'Chinese New Year', date: 'Varies (January/February)', country: 'China', category: 'National' },
    { id: 'diwali', name: 'Diwali', date: 'Varies (October/November)', country: 'India', category: 'Religious' },
    { id: 'carnival', name: 'Carnival', date: 'Varies (February/March)', country: 'Brazil', category: 'Cultural' }
  ];

  const categories = ['National', 'Religious', 'Cultural'];

  const filteredHolidays = holidays.filter(holiday => 
    holiday.country === selectedCountry &&
    holiday.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const groupedHolidays = categories.reduce((acc, category) => {
    acc[category] = filteredHolidays.filter(holiday => holiday.category === category);
    return acc;
  }, {} as Record<string, typeof holidays>);

  const handleHolidayToggle = (holidayId: string, checked: boolean) => {
    if (checked) {
      setSelectedHolidays(prev => [...prev, holidayId]);
    } else {
      setSelectedHolidays(prev => prev.filter(id => id !== holidayId));
    }
  };

  const handleAddToCalendar = () => {
    console.log('Adding holidays to calendar:', selectedHolidays);
    // Here you would implement the actual calendar integration
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <Calendar className="h-8 w-8 text-blue-600" />
            <h2 className="text-2xl font-semibold text-gray-900">Holiday Calendar</h2>
          </div>
          <Button 
            onClick={handleAddToCalendar}
            disabled={selectedHolidays.length === 0}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            Add {selectedHolidays.length} Holidays to Calendar
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <Card className="p-6 sticky top-6">
              <h3 className="font-semibold text-gray-900 mb-4">Filters</h3>
              
              {/* Search */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Search Holidays
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search holidays..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Country Selection */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Country/Region
                </label>
                <select
                  value={selectedCountry}
                  onChange={(e) => setSelectedCountry(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {countries.map(country => (
                    <option key={country} value={country}>{country}</option>
                  ))}
                </select>
              </div>

              {/* Quick Select */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Quick Select
                </label>
                <div className="space-y-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full justify-start"
                    onClick={() => setSelectedHolidays(filteredHolidays.filter(h => h.category === 'National').map(h => h.id))}
                  >
                    All National Holidays
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full justify-start"
                    onClick={() => setSelectedHolidays(filteredHolidays.filter(h => h.category === 'Religious').map(h => h.id))}
                  >
                    All Religious Holidays
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full justify-start"
                    onClick={() => setSelectedHolidays([])}
                  >
                    Clear All
                  </Button>
                </div>
              </div>
            </Card>
          </div>

          {/* Holiday Lists */}
          <div className="lg:col-span-3 space-y-6">
            {categories.map(category => (
              groupedHolidays[category]?.length > 0 && (
                <Card key={category} className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    {category} Holidays
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {groupedHolidays[category].map(holiday => (
                      <div key={holiday.id} className="flex items-start space-x-3 p-3 border rounded-lg hover:bg-gray-50">
                        <Checkbox
                          checked={selectedHolidays.includes(holiday.id)}
                          onCheckedChange={(checked) => handleHolidayToggle(holiday.id, checked as boolean)}
                          className="mt-1"
                        />
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">{holiday.name}</h4>
                          <p className="text-sm text-gray-600">{holiday.date}</p>
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium mt-1 ${
                            category === 'National' ? 'bg-blue-100 text-blue-800' :
                            category === 'Religious' ? 'bg-purple-100 text-purple-800' :
                            'bg-green-100 text-green-800'
                          }`}>
                            {category}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              )
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HolidayPage;
